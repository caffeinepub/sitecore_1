import {
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  FolderOpen,
  Grid,
  Search,
  Tag,
  Trash2,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

interface DocVersion {
  version: string;
  uploadDate: string;
  size: string;
  base64: string;
}

interface Doc {
  id: string;
  name: string;
  type: string;
  category: string;
  subCategory?: string;
  tags?: string[];
  description?: string;
  uploadDate: string;
  size: string;
  base64: string;
  mimeType: string;
  expiresAt?: string;
  versions?: DocVersion[];
}

interface DocumentManagementProps {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const CATEGORY_TREE: {
  key: string;
  label: string;
  icon: string;
  sub: { key: string; label: string }[];
}[] = [
  {
    key: "legal",
    label: "Hukuki",
    icon: "⚖️",
    sub: [
      { key: "legal_contracts", label: "Sözleşmeler" },
      { key: "legal_cases", label: "Dava Dosyaları" },
      { key: "legal_notices", label: "İhtar & Tebligat" },
    ],
  },
  {
    key: "technical",
    label: "Teknik",
    icon: "🔧",
    sub: [
      { key: "technical_maintenance", label: "Bakım Raporları" },
      { key: "technical_equipment", label: "Ekipman Belgeleri" },
      { key: "technical_plans", label: "Teknik Çizimler" },
    ],
  },
  {
    key: "administrative",
    label: "İdari",
    icon: "📋",
    sub: [
      { key: "admin_management", label: "Yönetim Planı" },
      { key: "admin_meetings", label: "Toplantı Tutanakları" },
      { key: "admin_decisions", label: "Karar Defteri" },
    ],
  },
  {
    key: "insurance",
    label: "Sigorta",
    icon: "🛡️",
    sub: [
      { key: "insurance_dask", label: "DASK" },
      { key: "insurance_fire", label: "Yangın Sigortası" },
      { key: "insurance_liability", label: "Sorumluluk Sigortası" },
    ],
  },
  {
    key: "financial",
    label: "Mali",
    icon: "💰",
    sub: [
      { key: "financial_budget", label: "Bütçe Belgeleri" },
      { key: "financial_invoices", label: "Faturalar" },
      { key: "financial_reports", label: "Mali Raporlar" },
    ],
  },
];

function isExpiringSoon(expiresAt?: string): boolean {
  if (!expiresAt) return false;
  const diff = new Date(expiresAt).getTime() - Date.now();
  return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
}

function isExpired(expiresAt?: string): boolean {
  if (!expiresAt) return false;
  return new Date(expiresAt).getTime() < Date.now();
}

function QRPattern() {
  const size = 10;
  const cells = Array.from({ length: size * size }, () => Math.random() > 0.5);
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        width: 120,
        height: 120,
      }}
    >
      {cells.map((filled, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static QR pattern
        <div key={i} className={`${filled ? "bg-[#0B1B2E]" : "bg-white"}`} />
      ))}
    </div>
  );
}

export default function DocumentManagement({
  buildingId,
  isOwner,
  t,
}: DocumentManagementProps) {
  const storageKey = `sitecore_docs_${buildingId}`;

  const loadDocs = (): Doc[] => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "[]");
    } catch {
      return [];
    }
  };

  const [docs, setDocs] = useState<Doc[]>(loadDocs);
  const [pendingFile, setPendingFile] = useState<{
    file: File;
    base64: string;
  } | null>(null);
  const [pendingName, setPendingName] = useState("");
  const [pendingType, setPendingType] = useState("other");
  const [pendingCategory, setPendingCategory] = useState("administrative");
  const [pendingSubCategory, setPendingSubCategory] = useState("");
  const [pendingTags, setPendingTags] = useState("");
  const [pendingDescription, setPendingDescription] = useState("");
  const [pendingExpiry, setPendingExpiry] = useState("");
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "administrative",
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [qrDoc, setQrDoc] = useState<Doc | null>(null);
  const [versionDoc, setVersionDoc] = useState<Doc | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const saveDocs = (updated: Doc[]) => {
    setDocs(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const toggleCategory = (key: string) => {
    setExpandedCategories((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError(`${t.fileTooLarge}. ${t.maxFileSize}`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = (ev.target?.result as string).split(",")[1];
      setPendingFile({ file, base64 });
      setPendingName(file.name);
      setPendingType("other");
      setPendingCategory("administrative");
      setPendingSubCategory("");
      setPendingTags("");
      setPendingDescription("");
      setPendingExpiry("");
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUploadConfirm = () => {
    if (!pendingFile) return;
    const tags = pendingTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const existingIdx = docs.findIndex((d) => d.name === pendingName);
    if (existingIdx >= 0) {
      const existing = docs[existingIdx];
      const versions = existing.versions || [
        {
          version: "v1.0",
          uploadDate: existing.uploadDate,
          size: existing.size,
          base64: existing.base64,
        },
      ];
      const major = versions.length + 1;
      const updatedDoc: Doc = {
        ...existing,
        base64: pendingFile.base64,
        size: `${(pendingFile.file.size / 1024).toFixed(1)} KB`,
        uploadDate: new Date().toLocaleDateString(),
        expiresAt: pendingExpiry || existing.expiresAt,
        subCategory: pendingSubCategory || existing.subCategory,
        tags: tags.length ? tags : existing.tags,
        description: pendingDescription || existing.description,
        versions: [
          ...versions,
          {
            version: `v${major}.0`,
            uploadDate: new Date().toLocaleDateString(),
            size: `${(pendingFile.file.size / 1024).toFixed(1)} KB`,
            base64: pendingFile.base64,
          },
        ],
      };
      const updated = [...docs];
      updated[existingIdx] = updatedDoc;
      saveDocs(updated);
    } else {
      const doc: Doc = {
        id: Date.now().toString(),
        name: pendingName || pendingFile.file.name,
        type: pendingType,
        category: pendingCategory,
        subCategory: pendingSubCategory || undefined,
        tags: tags.length ? tags : undefined,
        description: pendingDescription || undefined,
        uploadDate: new Date().toLocaleDateString(),
        size: `${(pendingFile.file.size / 1024).toFixed(1)} KB`,
        base64: pendingFile.base64,
        mimeType: pendingFile.file.type,
        expiresAt: pendingExpiry || undefined,
        versions: [
          {
            version: "v1.0",
            uploadDate: new Date().toLocaleDateString(),
            size: `${(pendingFile.file.size / 1024).toFixed(1)} KB`,
            base64: pendingFile.base64,
          },
        ],
      };
      saveDocs([doc, ...docs]);
    }
    setPendingFile(null);
    setPendingName("");
    setPendingType("other");
    setPendingCategory("administrative");
    setPendingSubCategory("");
    setPendingTags("");
    setPendingDescription("");
    setPendingExpiry("");
  };

  const handleDownload = (doc: Doc) => {
    const bytes = atob(doc.base64);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    const blob = new Blob([arr], { type: doc.mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = doc.name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleDelete = (id: string) =>
    saveDocs(docs.filter((d) => d.id !== id));

  // Full-text search: name + tags + description
  const filteredDocs = docs.filter((doc) => {
    const matchesCategory =
      activeCategory === "all" ||
      doc.category === activeCategory ||
      doc.subCategory === activeCategory;
    if (!matchesCategory) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      doc.name.toLowerCase().includes(q) ||
      (doc.description || "").toLowerCase().includes(q) ||
      (doc.tags || []).some((tag) => tag.toLowerCase().includes(q)) ||
      (doc.subCategory || "").toLowerCase().includes(q)
    );
  });

  const expiringCount = docs.filter((d) => isExpiringSoon(d.expiresAt)).length;
  const expiredCount = docs.filter((d) => isExpired(d.expiresAt)).length;

  const currentSubCats =
    CATEGORY_TREE.find((c) => c.key === pendingCategory)?.sub || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#0E1116]">{t.documents}</h2>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            data-ocid="documents.upload_button"
          />
          <Button
            data-ocid="documents.primary_button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-[#4A90D9] hover:bg-[#3A80C9] text-white rounded-full px-5 flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            {t.uploadDocument}
          </Button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white rounded-xl p-3 border border-[#E5EAF2] text-center">
          <p className="text-xl font-bold text-[#4A90D9]">{docs.length}</p>
          <p className="text-xs text-[#6B7A8D]">Toplam Belge</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-yellow-200 text-center">
          <p className="text-xl font-bold text-yellow-600">{expiringCount}</p>
          <p className="text-xs text-[#6B7A8D]">Yakında Sona Erecek</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-red-200 text-center">
          <p className="text-xl font-bold text-red-500">{expiredCount}</p>
          <p className="text-xs text-[#6B7A8D]">Süresi Dolmuş</p>
        </div>
      </div>

      {error && (
        <div
          data-ocid="documents.error_state"
          className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4"
        >
          {error}
        </div>
      )}

      <div className="flex gap-4">
        {/* Category Tree Sidebar */}
        <div className="w-52 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-[#E5EAF2] overflow-hidden">
            <div className="px-3 py-2 bg-[#F3F6FB] border-b border-[#E5EAF2]">
              <p className="text-xs font-semibold text-[#3A4654] uppercase tracking-wide flex items-center gap-1">
                <FolderOpen className="w-3.5 h-3.5" /> Kategoriler
              </p>
            </div>
            <div className="p-2">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-sm mb-1 font-medium transition-colors ${
                  activeCategory === "all"
                    ? "bg-[#4A90D9] text-white"
                    : "text-[#3A4654] hover:bg-[#F3F6FB]"
                }`}
              >
                Tüm Belgeler
              </button>
              {CATEGORY_TREE.map((cat) => (
                <div key={cat.key}>
                  <button
                    type="button"
                    onClick={() => {
                      toggleCategory(cat.key);
                      setActiveCategory(cat.key);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                      activeCategory === cat.key
                        ? "bg-[#4A90D9] text-white"
                        : "text-[#3A4654] hover:bg-[#F3F6FB]"
                    }`}
                  >
                    <span>
                      {cat.icon} {cat.label}
                    </span>
                    {expandedCategories.includes(cat.key) ? (
                      <ChevronDown className="w-3 h-3" />
                    ) : (
                      <ChevronRight className="w-3 h-3" />
                    )}
                  </button>
                  {expandedCategories.includes(cat.key) && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {cat.sub.map((sub) => (
                        <button
                          key={sub.key}
                          type="button"
                          onClick={() => setActiveCategory(sub.key)}
                          className={`w-full text-left px-3 py-1 rounded-lg text-xs transition-colors ${
                            activeCategory === sub.key
                              ? "bg-blue-100 text-blue-700 font-medium"
                              : "text-[#6B7A8D] hover:bg-[#F3F6FB]"
                          }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Full-text search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7A8D]" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Belge adı, etiket veya açıklamada ara..."
              className="pl-9"
              data-ocid="documents.search_input"
            />
          </div>

          {/* Upload Form */}
          {pendingFile && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2] mb-5">
              <h3 className="font-semibold text-[#0E1116] mb-4">
                {t.uploadDocument}
              </h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-[#3A4654] mb-1 block">
                    {t.documentName}
                  </Label>
                  <Input
                    data-ocid="documents.input"
                    value={pendingName}
                    onChange={(e) => setPendingName(e.target.value)}
                    className="border-[#D7DEE9]"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-[#3A4654] mb-1 block">
                    Açıklama
                  </Label>
                  <Input
                    value={pendingDescription}
                    onChange={(e) => setPendingDescription(e.target.value)}
                    placeholder="Belge hakkında kısa açıklama..."
                    className="border-[#D7DEE9]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm font-medium text-[#3A4654] mb-1 block">
                      Kategori
                    </Label>
                    <select
                      value={pendingCategory}
                      onChange={(e) => {
                        setPendingCategory(e.target.value);
                        setPendingSubCategory("");
                      }}
                      className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm bg-white"
                    >
                      {CATEGORY_TREE.map((c) => (
                        <option key={c.key} value={c.key}>
                          {c.icon} {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-[#3A4654] mb-1 block">
                      Alt Kategori
                    </Label>
                    <select
                      value={pendingSubCategory}
                      onChange={(e) => setPendingSubCategory(e.target.value)}
                      className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm bg-white"
                    >
                      <option value="">Seçiniz...</option>
                      {currentSubCats.map((s) => (
                        <option key={s.key} value={s.key}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm font-medium text-[#3A4654] mb-1 block">
                      Etiketler (virgülle ayır)
                    </Label>
                    <Input
                      value={pendingTags}
                      onChange={(e) => setPendingTags(e.target.value)}
                      placeholder="aidat, 2024, yönetim..."
                      className="border-[#D7DEE9]"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-[#3A4654] mb-1 block">
                      Son Kullanma Tarihi
                    </Label>
                    <input
                      type="date"
                      value={pendingExpiry}
                      onChange={(e) => setPendingExpiry(e.target.value)}
                      className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-1">
                  <Button
                    data-ocid="documents.confirm_button"
                    onClick={handleUploadConfirm}
                    className="bg-[#4A90D9] hover:bg-[#3A80C9] text-white rounded-full px-5"
                  >
                    {t.uploadDocument}
                  </Button>
                  <Button
                    data-ocid="documents.cancel_button"
                    variant="outline"
                    onClick={() => setPendingFile(null)}
                    className="rounded-full px-5 border-[#D7DEE9]"
                  >
                    {t.cancel}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Document List */}
          {filteredDocs.length === 0 ? (
            <div
              data-ocid="documents.empty_state"
              className="bg-white rounded-2xl p-12 shadow-sm border border-[#E5EAF2] flex flex-col items-center justify-center gap-3 text-center"
            >
              <FileText className="w-12 h-12 text-[#D7DEE9]" />
              <p className="text-[#3A4654]">
                {searchQuery ? "Arama sonucu bulunamadı." : t.noDocuments}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-[#E5EAF2] overflow-hidden">
              <table className="w-full" data-ocid="documents.table">
                <thead className="bg-[#F3F6FB]">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#3A4654] uppercase tracking-wide">
                      {t.documentName}
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#3A4654] uppercase tracking-wide hidden sm:table-cell">
                      Kategori
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#3A4654] uppercase tracking-wide hidden md:table-cell">
                      Etiketler
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#3A4654] uppercase tracking-wide hidden sm:table-cell">
                      Versiyon
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#3A4654] uppercase tracking-wide hidden md:table-cell">
                      Son Kullanma
                    </th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filteredDocs.map((doc, idx) => {
                    const expSoon = isExpiringSoon(doc.expiresAt);
                    const expired = isExpired(doc.expiresAt);
                    const currentVersion =
                      doc.versions?.at(-1)?.version || "v1.0";
                    const catInfo = CATEGORY_TREE.find(
                      (c) => c.key === doc.category,
                    );
                    const subLabel = catInfo?.sub.find(
                      (s) => s.key === doc.subCategory,
                    )?.label;
                    return (
                      <tr
                        key={doc.id}
                        data-ocid={`documents.item.${idx + 1}`}
                        className="border-t border-[#F3F6FB] hover:bg-[#FAFBFD] transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-start gap-2">
                            <FileText className="w-4 h-4 text-[#4A90D9] flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-[#0E1116] truncate max-w-[160px]">
                                {doc.name}
                              </p>
                              {doc.description && (
                                <p className="text-xs text-[#6B7A8D] truncate max-w-[160px]">
                                  {doc.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <div className="text-xs">
                            <span className="font-medium text-[#3A4654]">
                              {catInfo?.icon} {catInfo?.label}
                            </span>
                            {subLabel && (
                              <p className="text-[#6B7A8D]">{subLabel}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          {doc.tags && doc.tags.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {doc.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#EEF3FA] text-[#4A90D9] text-xs"
                                >
                                  <Tag className="w-2.5 h-2.5" />
                                  {tag}
                                </span>
                              ))}
                              {doc.tags.length > 2 && (
                                <span className="text-xs text-[#6B7A8D]">
                                  +{doc.tags.length - 2}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-[#D7DEE9]">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#3A4654] hidden sm:table-cell">
                          <button
                            type="button"
                            onClick={() => setVersionDoc(doc)}
                            className="text-xs px-2 py-0.5 rounded bg-[#EEF3FA] text-[#4A90D9] font-medium hover:bg-blue-100"
                          >
                            {currentVersion} ({doc.versions?.length || 1})
                          </button>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          {doc.expiresAt ? (
                            <span
                              className={`text-xs font-medium ${expired ? "text-red-600" : expSoon ? "text-yellow-600" : "text-[#6B7A8D]"}`}
                            >
                              {expired ? "❌" : expSoon ? "⚠️" : ""}{" "}
                              {doc.expiresAt}
                            </span>
                          ) : (
                            <span className="text-xs text-[#6B7A8D]">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              type="button"
                              data-ocid={`documents.item.${idx + 1}`}
                              onClick={() => handleDownload(doc)}
                              className="text-[#4A90D9] hover:text-[#2A70B9]"
                              title={t.downloadDoc}
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setQrDoc(doc)}
                              className="text-[#6B7A8D] hover:text-[#0B1B2E]"
                              title="QR Kod"
                            >
                              <Grid className="w-4 h-4" />
                            </button>
                            {isOwner && (
                              <button
                                type="button"
                                data-ocid={`documents.delete_button.${idx + 1}`}
                                onClick={() => handleDelete(doc.id)}
                                className="text-red-400 hover:text-red-600"
                                title={t.deleteDoc}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* QR Modal */}
      <Dialog open={!!qrDoc} onOpenChange={() => setQrDoc(null)}>
        <DialogContent className="max-w-xs" data-ocid="documents.dialog">
          <DialogHeader>
            <DialogTitle>Belge QR Kodu</DialogTitle>
          </DialogHeader>
          {qrDoc && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-[#3A4654] text-center">{qrDoc.name}</p>
              <div className="p-3 bg-white border-2 border-[#0B1B2E] rounded-xl">
                <QRPattern />
              </div>
              <p className="text-xs text-[#6B7A8D] text-center">
                Belge referans kodu: DOC-{qrDoc.id.slice(-6).toUpperCase()}
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setQrDoc(null)}
                data-ocid="documents.close_button"
              >
                Kapat
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Version History Modal */}
      <Dialog open={!!versionDoc} onOpenChange={() => setVersionDoc(null)}>
        <DialogContent className="max-w-md" data-ocid="documents.dialog">
          <DialogHeader>
            <DialogTitle>Versiyon Geçmişi</DialogTitle>
          </DialogHeader>
          {versionDoc && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-[#0E1116]">
                {versionDoc.name}
              </p>
              <div className="space-y-2">
                {(
                  versionDoc.versions || [
                    {
                      version: "v1.0",
                      uploadDate: versionDoc.uploadDate,
                      size: versionDoc.size,
                      base64: versionDoc.base64,
                    },
                  ]
                ).map((v, i, arr) => (
                  <div
                    key={v.version}
                    className={`flex items-center justify-between p-3 rounded-lg ${i === arr.length - 1 ? "bg-blue-50 border border-blue-200" : "bg-[#F3F6FB]"}`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#0E1116]">
                        {v.version}
                      </p>
                      <p className="text-xs text-[#6B7A8D]">
                        {v.uploadDate} · {v.size}
                      </p>
                    </div>
                    {i === arr.length - 1 && (
                      <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">
                        Güncel
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setVersionDoc(null)}
                data-ocid="documents.close_button"
              >
                Kapat
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
