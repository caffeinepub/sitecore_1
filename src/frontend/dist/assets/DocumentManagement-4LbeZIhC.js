import { r as reactExports, j as jsxRuntimeExports, B as Button, G as ChevronDown, S as Search, I as Input, F as FileText, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, e as Badge } from "./index-Cr-31AJ2.js";
import { L as Label } from "./label-BBWPCpCz.js";
import { U as Upload } from "./upload-BjCR_cVE.js";
import { F as FolderOpen } from "./folder-open-Cn6-LSSv.js";
import { C as ChevronRight } from "./chevron-right-BeRiyz_y.js";
import { T as Tag } from "./tag-DT-OjDf4.js";
import { D as Download } from "./download-BIWit2-m.js";
import { G as Grid3x3 } from "./grid-3x3-Do0nM5_Y.js";
import { T as Trash2 } from "./trash-2-CJz5iMWr.js";
const CATEGORY_TREE = [
  {
    key: "legal",
    label: "Hukuki",
    icon: "⚖️",
    sub: [
      { key: "legal_contracts", label: "Sözleşmeler" },
      { key: "legal_cases", label: "Dava Dosyaları" },
      { key: "legal_notices", label: "İhtar & Tebligat" }
    ]
  },
  {
    key: "technical",
    label: "Teknik",
    icon: "🔧",
    sub: [
      { key: "technical_maintenance", label: "Bakım Raporları" },
      { key: "technical_equipment", label: "Ekipman Belgeleri" },
      { key: "technical_plans", label: "Teknik Çizimler" }
    ]
  },
  {
    key: "administrative",
    label: "İdari",
    icon: "📋",
    sub: [
      { key: "admin_management", label: "Yönetim Planı" },
      { key: "admin_meetings", label: "Toplantı Tutanakları" },
      { key: "admin_decisions", label: "Karar Defteri" }
    ]
  },
  {
    key: "insurance",
    label: "Sigorta",
    icon: "🛡️",
    sub: [
      { key: "insurance_dask", label: "DASK" },
      { key: "insurance_fire", label: "Yangın Sigortası" },
      { key: "insurance_liability", label: "Sorumluluk Sigortası" }
    ]
  },
  {
    key: "financial",
    label: "Mali",
    icon: "💰",
    sub: [
      { key: "financial_budget", label: "Bütçe Belgeleri" },
      { key: "financial_invoices", label: "Faturalar" },
      { key: "financial_reports", label: "Mali Raporlar" }
    ]
  }
];
function isExpiringSoon(expiresAt) {
  if (!expiresAt) return false;
  const diff = new Date(expiresAt).getTime() - Date.now();
  return diff > 0 && diff < 30 * 24 * 60 * 60 * 1e3;
}
function isExpired(expiresAt) {
  if (!expiresAt) return false;
  return new Date(expiresAt).getTime() < Date.now();
}
function QRPattern() {
  const size = 10;
  const cells = Array.from({ length: size * size }, () => Math.random() > 0.5);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid",
      style: {
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        width: 120,
        height: 120
      },
      children: cells.map((filled, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static QR pattern
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${filled ? "bg-[#0B1B2E]" : "bg-white"}` }, i)
      ))
    }
  );
}
function DocumentManagement({
  buildingId,
  isOwner,
  t
}) {
  var _a;
  const storageKey = `sitecore_docs_${buildingId}`;
  const loadDocs = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "[]");
    } catch {
      return [];
    }
  };
  const [docs, setDocs] = reactExports.useState(loadDocs);
  const [pendingFile, setPendingFile] = reactExports.useState(null);
  const [pendingName, setPendingName] = reactExports.useState("");
  const [pendingType, setPendingType] = reactExports.useState("other");
  const [pendingCategory, setPendingCategory] = reactExports.useState("administrative");
  const [pendingSubCategory, setPendingSubCategory] = reactExports.useState("");
  const [pendingTags, setPendingTags] = reactExports.useState("");
  const [pendingDescription, setPendingDescription] = reactExports.useState("");
  const [pendingExpiry, setPendingExpiry] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("all");
  const [expandedCategories, setExpandedCategories] = reactExports.useState([
    "administrative"
  ]);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [qrDoc, setQrDoc] = reactExports.useState(null);
  const [versionDoc, setVersionDoc] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const saveDocs = (updated) => {
    setDocs(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };
  const toggleCategory = (key) => {
    setExpandedCategories(
      (prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };
  const handleFileChange = (e) => {
    var _a2;
    const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError(`${t.fileTooLarge}. ${t.maxFileSize}`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a3;
      const base64 = ((_a3 = ev.target) == null ? void 0 : _a3.result).split(",")[1];
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
    const tags = pendingTags.split(",").map((t2) => t2.trim()).filter(Boolean);
    const existingIdx = docs.findIndex((d) => d.name === pendingName);
    if (existingIdx >= 0) {
      const existing = docs[existingIdx];
      const versions = existing.versions || [
        {
          version: "v1.0",
          uploadDate: existing.uploadDate,
          size: existing.size,
          base64: existing.base64
        }
      ];
      const major = versions.length + 1;
      const updatedDoc = {
        ...existing,
        base64: pendingFile.base64,
        size: `${(pendingFile.file.size / 1024).toFixed(1)} KB`,
        uploadDate: (/* @__PURE__ */ new Date()).toLocaleDateString(),
        expiresAt: pendingExpiry || existing.expiresAt,
        subCategory: pendingSubCategory || existing.subCategory,
        tags: tags.length ? tags : existing.tags,
        description: pendingDescription || existing.description,
        versions: [
          ...versions,
          {
            version: `v${major}.0`,
            uploadDate: (/* @__PURE__ */ new Date()).toLocaleDateString(),
            size: `${(pendingFile.file.size / 1024).toFixed(1)} KB`,
            base64: pendingFile.base64
          }
        ]
      };
      const updated = [...docs];
      updated[existingIdx] = updatedDoc;
      saveDocs(updated);
    } else {
      const doc = {
        id: Date.now().toString(),
        name: pendingName || pendingFile.file.name,
        type: pendingType,
        category: pendingCategory,
        subCategory: pendingSubCategory || void 0,
        tags: tags.length ? tags : void 0,
        description: pendingDescription || void 0,
        uploadDate: (/* @__PURE__ */ new Date()).toLocaleDateString(),
        size: `${(pendingFile.file.size / 1024).toFixed(1)} KB`,
        base64: pendingFile.base64,
        mimeType: pendingFile.file.type,
        expiresAt: pendingExpiry || void 0,
        versions: [
          {
            version: "v1.0",
            uploadDate: (/* @__PURE__ */ new Date()).toLocaleDateString(),
            size: `${(pendingFile.file.size / 1024).toFixed(1)} KB`,
            base64: pendingFile.base64
          }
        ]
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
  const handleDownload = (doc) => {
    const bytes = atob(doc.base64);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    const blob = new Blob([arr], { type: doc.mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = doc.name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  };
  const handleDelete = (id) => saveDocs(docs.filter((d) => d.id !== id));
  const filteredDocs = docs.filter((doc) => {
    const matchesCategory = activeCategory === "all" || doc.category === activeCategory || doc.subCategory === activeCategory;
    if (!matchesCategory) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return doc.name.toLowerCase().includes(q) || (doc.description || "").toLowerCase().includes(q) || (doc.tags || []).some((tag) => tag.toLowerCase().includes(q)) || (doc.subCategory || "").toLowerCase().includes(q);
  });
  const expiringCount = docs.filter((d) => isExpiringSoon(d.expiresAt)).length;
  const expiredCount = docs.filter((d) => isExpired(d.expiresAt)).length;
  const currentSubCats = ((_a = CATEGORY_TREE.find((c) => c.key === pendingCategory)) == null ? void 0 : _a.sub) || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: t.documents }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            className: "hidden",
            onChange: handleFileChange,
            "data-ocid": "documents.upload_button"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "documents.primary_button",
            onClick: () => {
              var _a2;
              return (_a2 = fileInputRef.current) == null ? void 0 : _a2.click();
            },
            className: "bg-[#4A90D9] hover:bg-[#3A80C9] text-white rounded-full px-5 flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
              t.uploadDocument
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-3 border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-[#4A90D9]", children: docs.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "Toplam Belge" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-3 border border-yellow-200 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-yellow-600", children: expiringCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "Yakında Sona Erecek" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-3 border border-red-200 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-red-500", children: expiredCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "Süresi Dolmuş" })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "documents.error_state",
        className: "bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4",
        children: error
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-52 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-[#E5EAF2] overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2 bg-[#F3F6FB] border-b border-[#E5EAF2]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-[#3A4654] uppercase tracking-wide flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-3.5 h-3.5" }),
          " Kategoriler"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveCategory("all"),
              className: `w-full text-left px-3 py-1.5 rounded-lg text-sm mb-1 font-medium transition-colors ${activeCategory === "all" ? "bg-[#4A90D9] text-white" : "text-[#3A4654] hover:bg-[#F3F6FB]"}`,
              children: "Tüm Belgeler"
            }
          ),
          CATEGORY_TREE.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  toggleCategory(cat.key);
                  setActiveCategory(cat.key);
                },
                className: `w-full text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${activeCategory === cat.key ? "bg-[#4A90D9] text-white" : "text-[#3A4654] hover:bg-[#F3F6FB]"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    cat.icon,
                    " ",
                    cat.label
                  ] }),
                  expandedCategories.includes(cat.key) ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
                ]
              }
            ),
            expandedCategories.includes(cat.key) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-3 mt-0.5 space-y-0.5", children: cat.sub.map((sub) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActiveCategory(sub.key),
                className: `w-full text-left px-3 py-1 rounded-lg text-xs transition-colors ${activeCategory === sub.key ? "bg-blue-100 text-blue-700 font-medium" : "text-[#6B7A8D] hover:bg-[#F3F6FB]"}`,
                children: sub.label
              },
              sub.key
            )) })
          ] }, cat.key))
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7A8D]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              placeholder: "Belge adı, etiket veya açıklamada ara...",
              className: "pl-9",
              "data-ocid": "documents.search_input"
            }
          )
        ] }),
        pendingFile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2] mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: t.uploadDocument }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-[#3A4654] mb-1 block", children: t.documentName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "documents.input",
                  value: pendingName,
                  onChange: (e) => setPendingName(e.target.value),
                  className: "border-[#D7DEE9]"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-[#3A4654] mb-1 block", children: "Açıklama" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: pendingDescription,
                  onChange: (e) => setPendingDescription(e.target.value),
                  placeholder: "Belge hakkında kısa açıklama...",
                  className: "border-[#D7DEE9]"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-[#3A4654] mb-1 block", children: "Kategori" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    value: pendingCategory,
                    onChange: (e) => {
                      setPendingCategory(e.target.value);
                      setPendingSubCategory("");
                    },
                    className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm bg-white",
                    children: CATEGORY_TREE.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: c.key, children: [
                      c.icon,
                      " ",
                      c.label
                    ] }, c.key))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-[#3A4654] mb-1 block", children: "Alt Kategori" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: pendingSubCategory,
                    onChange: (e) => setPendingSubCategory(e.target.value),
                    className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm bg-white",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Seçiniz..." }),
                      currentSubCats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.key, children: s.label }, s.key))
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-[#3A4654] mb-1 block", children: "Etiketler (virgülle ayır)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: pendingTags,
                    onChange: (e) => setPendingTags(e.target.value),
                    placeholder: "aidat, 2024, yönetim...",
                    className: "border-[#D7DEE9]"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-[#3A4654] mb-1 block", children: "Son Kullanma Tarihi" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "date",
                    value: pendingExpiry,
                    onChange: (e) => setPendingExpiry(e.target.value),
                    className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": "documents.confirm_button",
                  onClick: handleUploadConfirm,
                  className: "bg-[#4A90D9] hover:bg-[#3A80C9] text-white rounded-full px-5",
                  children: t.uploadDocument
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": "documents.cancel_button",
                  variant: "outline",
                  onClick: () => setPendingFile(null),
                  className: "rounded-full px-5 border-[#D7DEE9]",
                  children: t.cancel
                }
              )
            ] })
          ] })
        ] }),
        filteredDocs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "documents.empty_state",
            className: "bg-white rounded-2xl p-12 shadow-sm border border-[#E5EAF2] flex flex-col items-center justify-center gap-3 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 text-[#D7DEE9]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654]", children: searchQuery ? "Arama sonucu bulunamadı." : t.noDocuments })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl shadow-sm border border-[#E5EAF2] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", "data-ocid": "documents.table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F3F6FB]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-[#3A4654] uppercase tracking-wide", children: t.documentName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-[#3A4654] uppercase tracking-wide hidden sm:table-cell", children: "Kategori" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-[#3A4654] uppercase tracking-wide hidden md:table-cell", children: "Etiketler" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-[#3A4654] uppercase tracking-wide hidden sm:table-cell", children: "Versiyon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-[#3A4654] uppercase tracking-wide hidden md:table-cell", children: "Son Kullanma" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredDocs.map((doc, idx) => {
            var _a2, _b, _c, _d;
            const expSoon = isExpiringSoon(doc.expiresAt);
            const expired = isExpired(doc.expiresAt);
            const currentVersion = ((_b = (_a2 = doc.versions) == null ? void 0 : _a2.at(-1)) == null ? void 0 : _b.version) || "v1.0";
            const catInfo = CATEGORY_TREE.find(
              (c) => c.key === doc.category
            );
            const subLabel = (_c = catInfo == null ? void 0 : catInfo.sub.find(
              (s) => s.key === doc.subCategory
            )) == null ? void 0 : _c.label;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": `documents.item.${idx + 1}`,
                className: "border-t border-[#F3F6FB] hover:bg-[#FAFBFD] transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-[#4A90D9] flex-shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#0E1116] truncate max-w-[160px]", children: doc.name }),
                      doc.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] truncate max-w-[160px]", children: doc.description })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-[#3A4654]", children: [
                      catInfo == null ? void 0 : catInfo.icon,
                      " ",
                      catInfo == null ? void 0 : catInfo.label
                    ] }),
                    subLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: subLabel })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell", children: doc.tags && doc.tags.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
                    doc.tags.slice(0, 2).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#EEF3FA] text-[#4A90D9] text-xs",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-2.5 h-2.5" }),
                          tag
                        ]
                      },
                      tag
                    )),
                    doc.tags.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#6B7A8D]", children: [
                      "+",
                      doc.tags.length - 2
                    ] })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#D7DEE9]", children: "-" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-[#3A4654] hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setVersionDoc(doc),
                      className: "text-xs px-2 py-0.5 rounded bg-[#EEF3FA] text-[#4A90D9] font-medium hover:bg-blue-100",
                      children: [
                        currentVersion,
                        " (",
                        ((_d = doc.versions) == null ? void 0 : _d.length) || 1,
                        ")"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell", children: doc.expiresAt ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `text-xs font-medium ${expired ? "text-red-600" : expSoon ? "text-yellow-600" : "text-[#6B7A8D]"}`,
                      children: [
                        expired ? "❌" : expSoon ? "⚠️" : "",
                        " ",
                        doc.expiresAt
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: "-" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-end", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `documents.item.${idx + 1}`,
                        onClick: () => handleDownload(doc),
                        className: "text-[#4A90D9] hover:text-[#2A70B9]",
                        title: t.downloadDoc,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setQrDoc(doc),
                        className: "text-[#6B7A8D] hover:text-[#0B1B2E]",
                        title: "QR Kod",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Grid3x3, { className: "w-4 h-4" })
                      }
                    ),
                    isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `documents.delete_button.${idx + 1}`,
                        onClick: () => handleDelete(doc.id),
                        className: "text-red-400 hover:text-red-600",
                        title: t.deleteDoc,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                      }
                    )
                  ] }) })
                ]
              },
              doc.id
            );
          }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!qrDoc, onOpenChange: () => setQrDoc(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-xs", "data-ocid": "documents.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Belge QR Kodu" }) }),
      qrDoc && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] text-center", children: qrDoc.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-white border-2 border-[#0B1B2E] rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QRPattern, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D] text-center", children: [
          "Belge referans kodu: DOC-",
          qrDoc.id.slice(-6).toUpperCase()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "w-full",
            onClick: () => setQrDoc(null),
            "data-ocid": "documents.close_button",
            children: "Kapat"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!versionDoc, onOpenChange: () => setVersionDoc(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "documents.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Versiyon Geçmişi" }) }),
      versionDoc && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#0E1116]", children: versionDoc.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: (versionDoc.versions || [
          {
            version: "v1.0",
            uploadDate: versionDoc.uploadDate,
            size: versionDoc.size,
            base64: versionDoc.base64
          }
        ]).map((v, i, arr) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center justify-between p-3 rounded-lg ${i === arr.length - 1 ? "bg-blue-50 border border-blue-200" : "bg-[#F3F6FB]"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-[#0E1116]", children: v.version }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D]", children: [
                  v.uploadDate,
                  " · ",
                  v.size
                ] })
              ] }),
              i === arr.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-100 text-blue-700 border-0 text-xs", children: "Güncel" })
            ]
          },
          v.version
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "w-full",
            onClick: () => setVersionDoc(null),
            "data-ocid": "documents.close_button",
            children: "Kapat"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  DocumentManagement as default
};
