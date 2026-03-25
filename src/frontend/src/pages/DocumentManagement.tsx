import {
  Download,
  ExternalLink,
  FileText,
  Grid,
  Search,
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

const DOC_TYPES = [
  { value: "management_plan", labelKey: "docTypeManagementPlan" },
  { value: "insurance", labelKey: "docTypeInsurance" },
  { value: "meeting_minutes", labelKey: "docTypeMeetingMinutes" },
  { value: "other", labelKey: "docTypeOther" },
];

const TYPE_COLORS: Record<string, string> = {
  management_plan: "bg-blue-100 text-blue-700 border-blue-200",
  insurance: "bg-green-100 text-green-700 border-green-200",
  meeting_minutes: "bg-purple-100 text-purple-700 border-purple-200",
  other: "bg-gray-100 text-gray-600 border-gray-200",
};

const CATEGORY_TABS = [
  { key: "all", label: "Tümü" },
  { key: "management", label: "Yönetim" },
  { key: "insurance", label: "Sigorta" },
  { key: "meeting", label: "Toplantı" },
  { key: "financial", label: "Mali" },
  { key: "other", label: "Diğer" },
];

const DOC_TYPE_TO_CATEGORY: Record<string, string> = {
  management_plan: "management",
  insurance: "insurance",
  meeting_minutes: "meeting",
  other: "other",
};

// Check if doc expires within 30 days
function isExpiringSoon(expiresAt?: string): boolean {
  if (!expiresAt) return false;
  const diff = new Date(expiresAt).getTime() - Date.now();
  return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
}

function isExpired(expiresAt?: string): boolean {
  if (!expiresAt) return false;
  return new Date(expiresAt).getTime() < Date.now();
}

// Generate a QR-like pattern (decorative grid)
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
  const [pendingCategory, setPendingCategory] = useState("other");
  const [pendingExpiry, setPendingExpiry] = useState("");
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [qrDoc, setQrDoc] = useState<Doc | null>(null);
  const [versionDoc, setVersionDoc] = useState<Doc | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const saveDocs = (updated: Doc[]) => {
    setDocs(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
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
      setPendingCategory("other");
      setPendingExpiry("");
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUploadConfirm = () => {
    if (!pendingFile) return;
    // check if a version of this doc already exists
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
      const newVersion = `v${major}.0`;
      const updatedDoc: Doc = {
        ...existing,
        base64: pendingFile.base64,
        size: `${(pendingFile.file.size / 1024).toFixed(1)} KB`,
        uploadDate: new Date().toLocaleDateString(),
        expiresAt: pendingExpiry || existing.expiresAt,
        versions: [
          ...versions,
          {
            version: newVersion,
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
        category:
          pendingCategory || DOC_TYPE_TO_CATEGORY[pendingType] || "other",
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
    setPendingCategory("other");
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

  const filteredDocs = docs.filter((doc) => {
    const matchesCategory =
      activeCategory === "all" ||
      (doc.category || DOC_TYPE_TO_CATEGORY[doc.type] || "other") ===
        activeCategory;
    const matchesSearch =
      !searchQuery ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
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

      {error && (
        <div
          data-ocid="documents.error_state"
          className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4"
        >
          {error}
        </div>
      )}

      {/* Category Filter Tabs */}
      <div className="flex gap-2 flex-wrap mb-4">
        {CATEGORY_TABS.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setActiveCategory(cat.key)}
            data-ocid="documents.tab"
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.key
                ? "bg-[#4A90D9] text-white"
                : "bg-[#F3F6FB] text-[#3A4654] hover:bg-[#E5EAF2]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7A8D]" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Belge ara..."
          className="pl-9"
          data-ocid="documents.search_input"
        />
      </div>

      {/* Upload Form */}
      {pendingFile && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2] mb-6">
          <h3 className="font-semibold text-[#0E1116] mb-4">
            {t.uploadDocument}
          </h3>
          <div className="space-y-4">
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
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium text-[#3A4654] mb-1 block">
                  {t.documentType}
                </Label>
                <select
                  data-ocid="documents.select"
                  value={pendingType}
                  onChange={(e) => setPendingType(e.target.value)}
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116] bg-white"
                >
                  {DOC_TYPES.map((dt) => (
                    <option key={dt.value} value={dt.value}>
                      {t[dt.labelKey]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-sm font-medium text-[#3A4654] mb-1 block">
                  Kategori
                </Label>
                <select
                  value={pendingCategory}
                  onChange={(e) => setPendingCategory(e.target.value)}
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116] bg-white"
                >
                  {CATEGORY_TABS.filter((c) => c.key !== "all").map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-[#3A4654] mb-1 block">
                Son Kullanma Tarihi (isteğe bağlı)
              </Label>
              <input
                type="date"
                value={pendingExpiry}
                onChange={(e) => setPendingExpiry(e.target.value)}
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
              />
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#3A4654] uppercase tracking-wide">
                  {t.documentType}
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#3A4654] uppercase tracking-wide hidden sm:table-cell">
                  Versiyon
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#3A4654] uppercase tracking-wide hidden sm:table-cell">
                  {t.uploadDate}
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
                const currentVersion = doc.versions?.at(-1)?.version || "v1.0";
                return (
                  <tr
                    key={doc.id}
                    data-ocid={`documents.item.${idx + 1}`}
                    className="border-t border-[#F3F6FB] hover:bg-[#FAFBFD] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#4A90D9] flex-shrink-0" />
                        <span className="text-sm font-medium text-[#0E1116] truncate max-w-[160px]">
                          {doc.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={`text-xs border ${TYPE_COLORS[doc.type] || TYPE_COLORS.other}`}
                      >
                        {
                          t[
                            DOC_TYPES.find((d) => d.value === doc.type)
                              ?.labelKey || "docTypeOther"
                          ]
                        }
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#3A4654] hidden sm:table-cell">
                      <button
                        type="button"
                        onClick={() => setVersionDoc(doc)}
                        className="text-xs px-2 py-0.5 rounded bg-[#EEF3FA] text-[#4A90D9] font-medium hover:bg-blue-100"
                      >
                        {currentVersion} ({doc.versions?.length || 1} versiyon)
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#3A4654] hidden sm:table-cell">
                      {doc.uploadDate}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {doc.expiresAt ? (
                        <span
                          className={`text-xs font-medium ${
                            expired
                              ? "text-red-600"
                              : expSoon
                                ? "text-yellow-600"
                                : "text-[#6B7A8D]"
                          }`}
                        >
                          {expired ? "❌" : expSoon ? "⚠️" : ""} {doc.expiresAt}
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
                          className="text-[#4A90D9] hover:text-[#2A70B9] text-xs flex items-center gap-1"
                          title={t.downloadDoc}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setQrDoc(doc)}
                          className="text-[#6B7A8D] hover:text-[#0B1B2E] text-xs flex items-center gap-1"
                          title="QR Kod"
                        >
                          <Grid className="w-4 h-4" />
                        </button>
                        {isOwner && (
                          <button
                            type="button"
                            data-ocid={`documents.delete_button.${idx + 1}`}
                            onClick={() => handleDelete(doc.id)}
                            className="text-red-400 hover:text-red-600 text-xs flex items-center gap-1"
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
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      i === arr.length - 1
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-[#F3F6FB]"
                    }`}
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
