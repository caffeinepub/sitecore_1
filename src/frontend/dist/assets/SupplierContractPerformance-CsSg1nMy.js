import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, e as Badge, X, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input, at as Award, F as FileText } from "./index-DrmT2NwI.js";
import { T as TrendingDown } from "./trending-down-DtD-YQ8c.js";
import { S as Star } from "./star-CBS86Ck3.js";
import { T as ThumbsUp } from "./thumbs-up-D6vakZ4S.js";
import { T as ThumbsDown } from "./thumbs-down-DP5GoKhH.js";
const DEFAULT_CONTRACTS = [
  {
    id: "1",
    supplierName: "Güneş Temizlik",
    category: "Temizlik",
    contractTitle: "Ortak Alan Temizlik Hizmet Sözleşmesi",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    contractValue: 36e3,
    status: "Yenilenecek",
    autoRenew: false,
    performanceRecords: [
      {
        id: "p1",
        date: "2026-02-01",
        jobDescription: "Şubat ayı ortak alan temizliği",
        score: 5,
        comment: "Zamanında, titiz çalışma."
      },
      {
        id: "p2",
        date: "2026-01-01",
        jobDescription: "Ocak ayı temizliği",
        score: 4,
        comment: "Bodrum kat eksik kaldı."
      }
    ],
    avgScore: 4.5,
    blacklisted: false,
    notes: "Sözleşme Aralık sonunda bitiyor, yenileme görüşmesi yapılacak."
  },
  {
    id: "2",
    supplierName: "Yılmaz Tesisat",
    category: "Tesisatçı",
    contractTitle: "Yıllık Bakım & Acil Servis Sözleşmesi",
    startDate: "2025-03-01",
    endDate: "2026-02-28",
    contractValue: 18e3,
    status: "Aktif",
    autoRenew: true,
    performanceRecords: [
      {
        id: "p3",
        date: "2026-03-10",
        jobDescription: "Bodrum su borusu tamiri",
        score: 5,
        comment: "Hızlı müdahale, 2 saatte tamamladı."
      }
    ],
    avgScore: 5,
    blacklisted: false,
    notes: ""
  },
  {
    id: "3",
    supplierName: "Hızlı Asansör A.Ş.",
    category: "Asansör Bakım",
    contractTitle: "Asansör Bakım & Onarım Sözleşmesi",
    startDate: "2024-06-01",
    endDate: "2025-05-31",
    contractValue: 24e3,
    status: "Sona Erdi",
    autoRenew: false,
    performanceRecords: [
      {
        id: "p4",
        date: "2025-04-15",
        jobDescription: "Yıllık bakım",
        score: 2,
        comment: "Bakım 3 gün gecikti, iletişim zayıf."
      },
      {
        id: "p5",
        date: "2024-11-20",
        jobDescription: "Acil arıza müdahalesi",
        score: 1,
        comment: "4 saat beklettiler, kabul edilemez."
      }
    ],
    avgScore: 1.5,
    blacklisted: true,
    notes: "Sözleşme yenilenmedi. Alternatif tedarikçi aranıyor."
  }
];
const STATUS_COLORS = {
  Aktif: "bg-green-100 text-green-700",
  Yenilenecek: "bg-yellow-100 text-yellow-700",
  "Sona Erdi": "bg-gray-100 text-gray-600",
  İptal: "bg-red-100 text-red-700"
};
function getPerformanceLevel(avg) {
  if (avg === 0) return "Orta";
  if (avg >= 4.5) return "Mükemmel";
  if (avg >= 3.5) return "İyi";
  if (avg >= 2.5) return "Orta";
  if (avg >= 1.5) return "Kötü";
  return "Kara Liste";
}
const PERF_COLORS = {
  Mükemmel: "bg-green-100 text-green-700",
  İyi: "bg-blue-100 text-blue-700",
  Orta: "bg-yellow-100 text-yellow-700",
  Kötü: "bg-orange-100 text-orange-700",
  "Kara Liste": "bg-red-100 text-red-700"
};
function SupplierContractPerformance({
  buildingId,
  isOwner
}) {
  const key = `sitecore_supplier_contracts_${buildingId}`;
  const load = () => {
    try {
      const d = localStorage.getItem(key);
      return d ? JSON.parse(d) : DEFAULT_CONTRACTS;
    } catch {
      return DEFAULT_CONTRACTS;
    }
  };
  const [contracts, setContracts] = reactExports.useState(load);
  const [filterStatus, setFilterStatus] = reactExports.useState("Tümü");
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [showDetail, setShowDetail] = reactExports.useState(null);
  const [perfForm, setPerfForm] = reactExports.useState({
    date: "",
    jobDescription: "",
    score: 5,
    comment: ""
  });
  const [form, setForm] = reactExports.useState({
    supplierName: "",
    category: "Temizlik",
    contractTitle: "",
    startDate: "",
    endDate: "",
    contractValue: "",
    status: "Aktif",
    autoRenew: false,
    notes: ""
  });
  const save = (data) => {
    setContracts(data);
    localStorage.setItem(key, JSON.stringify(data));
  };
  const filtered = filterStatus === "Tümü" ? contracts : filterStatus === "Kara Liste" ? contracts.filter((c) => c.blacklisted) : contracts.filter((c) => c.status === filterStatus);
  const detail = contracts.find((c) => c.id === showDetail);
  const handleAdd = () => {
    if (!form.supplierName.trim() || !form.contractTitle.trim()) return;
    save([
      ...contracts,
      {
        id: Date.now().toString(),
        ...form,
        contractValue: Number.parseFloat(form.contractValue) || 0,
        performanceRecords: [],
        avgScore: 0,
        blacklisted: false
      }
    ]);
    setShowAdd(false);
    setForm({
      supplierName: "",
      category: "Temizlik",
      contractTitle: "",
      startDate: "",
      endDate: "",
      contractValue: "",
      status: "Aktif",
      autoRenew: false,
      notes: ""
    });
  };
  const handleAddPerf = (id) => {
    if (!perfForm.date || !perfForm.jobDescription) return;
    const updated = contracts.map((c) => {
      if (c.id !== id) return c;
      const records = [
        { id: Date.now().toString(), ...perfForm },
        ...c.performanceRecords
      ];
      const avg = records.reduce((acc, r) => acc + r.score, 0) / records.length;
      return { ...c, performanceRecords: records, avgScore: avg };
    });
    save(updated);
    setPerfForm({ date: "", jobDescription: "", score: 5, comment: "" });
  };
  const handleBlacklist = (id) => {
    save(
      contracts.map(
        (c) => c.id === id ? { ...c, blacklisted: !c.blacklisted } : c
      )
    );
  };
  const handleDelete = (id) => save(contracts.filter((c) => c.id !== id));
  const activeCount = contracts.filter((c) => c.status === "Aktif").length;
  const renewCount = contracts.filter((c) => c.status === "Yenilenecek").length;
  const blacklistCount = contracts.filter((c) => c.blacklisted).length;
  const avgPerf = contracts.filter((c) => c.avgScore > 0).length > 0 ? (contracts.filter((c) => c.avgScore > 0).reduce((acc, c) => acc + c.avgScore, 0) / contracts.filter((c) => c.avgScore > 0).length).toFixed(1) : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Tedarikçi Sözleşme & Performans" }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowAdd(true),
          className: "bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "Sözleşme Ekle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-green-600", children: activeCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1", children: "Aktif Sözleşme" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-yellow-500", children: renewCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1", children: "Yenilenecek" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-[#4A90D9]", children: avgPerf }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1", children: "Ort. Performans" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-red-500", children: blacklistCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1", children: "Kara Listede" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: [
      "Tümü",
      "Aktif",
      "Yenilenecek",
      "Sona Erdi",
      "İptal",
      "Kara Liste"
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setFilterStatus(s),
        className: `px-3 py-1 rounded-full text-sm font-medium transition-colors ${filterStatus === s ? "bg-[#0B1B2E] text-white" : "bg-white text-[#3A4654] border border-[#D7DEE9] hover:bg-[#F1F4F8]"}`,
        children: s
      },
      s
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      filtered.map((c) => {
        const perfLevel = getPerformanceLevel(c.avgScore);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `bg-white rounded-2xl p-5 shadow-sm border ${c.blacklisted ? "border-red-200 bg-red-50" : "border-[#E5EAF2]"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#0E1116]", children: c.supplierName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[#EEF3FA] text-[#4A90D9] border-0 text-xs", children: c.category }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-xs border-0 ${STATUS_COLORS[c.status]}`,
                      children: c.status
                    }
                  ),
                  c.blacklisted && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-red-100 text-red-700 border-0 text-xs flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3 h-3" }),
                    " Kara Liste"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mb-1", children: c.contractTitle }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 text-sm text-[#6B7A8D]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    c.startDate,
                    " → ",
                    c.endDate
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    c.contractValue.toLocaleString("tr-TR"),
                    " ₺/yıl"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Star,
                      {
                        className: `w-3 h-3 ${s <= Math.round(c.avgScore) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`
                      },
                      s
                    )),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D] ml-1", children: c.avgScore > 0 ? c.avgScore.toFixed(1) : "Puansız" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-xs border-0 ${PERF_COLORS[perfLevel]}`,
                      children: perfLevel
                    }
                  )
                ] }),
                c.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1 italic", children: c.notes })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 ml-3 flex-col items-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => setShowDetail(c.id),
                    variant: "outline",
                    size: "sm",
                    className: "rounded-full text-xs",
                    children: "Detay"
                  }
                ),
                isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      onClick: () => handleBlacklist(c.id),
                      variant: "ghost",
                      size: "sm",
                      className: `rounded-full text-xs ${c.blacklisted ? "text-green-600 hover:text-green-700" : "text-red-400 hover:text-red-600"}`,
                      children: c.blacklisted ? /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsDown, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      onClick: () => handleDelete(c.id),
                      variant: "ghost",
                      size: "sm",
                      className: "text-red-400 hover:text-red-600 rounded-full",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] })
            ] })
          },
          c.id
        );
      }),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[#3A4654] py-10", children: "Kayıt bulunamadı." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAdd, onOpenChange: setShowAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md max-h-[80vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Sözleşme Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Tedarikçi Adı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.supplierName,
              onChange: (e) => setForm((f) => ({ ...f, supplierName: e.target.value })),
              placeholder: "Tedarikçi / Firma"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Kategori" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: form.category,
                onChange: (e) => setForm((f) => ({ ...f, category: e.target.value })),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                children: [
                  "Temizlik",
                  "Tesisatçı",
                  "Elektrikçi",
                  "Asansör Bakım",
                  "Güvenlik",
                  "Peyzaj",
                  "Diğer"
                ].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Durum" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: form.status,
                onChange: (e) => setForm((f) => ({
                  ...f,
                  status: e.target.value
                })),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Aktif" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Yenilenecek" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Sona Erdi" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "İptal" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Sözleşme Başlığı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.contractTitle,
              onChange: (e) => setForm((f) => ({ ...f, contractTitle: e.target.value })),
              placeholder: "Sözleşme adı"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Başlangıç" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: form.startDate,
                onChange: (e) => setForm((f) => ({ ...f, startDate: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Bitiş" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: form.endDate,
                onChange: (e) => setForm((f) => ({ ...f, endDate: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Yıllık Değer (₺)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              value: form.contractValue,
              onChange: (e) => setForm((f) => ({ ...f, contractValue: e.target.value })),
              placeholder: "0"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: form.autoRenew,
              onChange: (e) => setForm((f) => ({ ...f, autoRenew: e.target.checked }))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Otomatik Yenileme" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Notlar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.notes,
              onChange: (e) => setForm((f) => ({ ...f, notes: e.target.value })),
              placeholder: "Ek bilgi..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleAdd,
            disabled: !form.supplierName.trim() || !form.contractTitle.trim(),
            className: "w-full bg-[#4A90D9] text-white rounded-full",
            children: "Kaydet"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!showDetail, onOpenChange: () => setShowDetail(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md max-h-[80vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5 text-[#4A90D9]" }),
        detail == null ? void 0 : detail.supplierName,
        " — Performans"
      ] }) }) }),
      detail && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: "Sözleşme" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: detail.contractTitle })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: "Süre" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
              detail.startDate,
              " → ",
              detail.endDate
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: "Yıllık Değer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
              detail.contractValue.toLocaleString("tr-TR"),
              " ₺"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: "Ort. Puan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: detail.avgScore > 0 ? `${detail.avgScore.toFixed(1)} / 5` : "Puansız" })
          ] })
        ] }),
        isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F3F6FB] rounded-xl p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
            "Performans Kaydı Ekle"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: perfForm.date,
              onChange: (e) => setPerfForm((f) => ({ ...f, date: e.target.value }))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: perfForm.jobDescription,
              onChange: (e) => setPerfForm((f) => ({
                ...f,
                jobDescription: e.target.value
              })),
              placeholder: "Yapılan iş açıklaması"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-1", children: "Puan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setPerfForm((f) => ({ ...f, score: s })),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: `w-6 h-6 cursor-pointer ${s <= perfForm.score ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`
                  }
                )
              },
              s
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: perfForm.comment,
              onChange: (e) => setPerfForm((f) => ({ ...f, comment: e.target.value })),
              placeholder: "Yorum (opsiyonel)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => handleAddPerf(detail.id),
              disabled: !perfForm.date || !perfForm.jobDescription,
              className: "w-full bg-[#4A90D9] text-white rounded-full text-sm",
              children: "Kaydet"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-2", children: "Performans Geçmişi" }),
          detail.performanceRecords.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: "Kayıt yok." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-48 overflow-y-auto", children: detail.performanceRecords.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F3F6FB] rounded-xl p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: r.date }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  className: `w-3 h-3 ${s <= r.score ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`
                },
                s
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#0E1116]", children: r.jobDescription }),
            r.comment && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] italic", children: r.comment })
          ] }, r.id)) })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  SupplierContractPerformance as default
};
