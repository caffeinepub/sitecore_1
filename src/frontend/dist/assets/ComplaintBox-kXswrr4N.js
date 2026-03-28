import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, f as Tabs, g as TabsList, h as TabsTrigger, w as ChartNoAxesColumn, i as TabsContent, M as MessageSquare, e as Badge, T as TriangleAlert, t as User, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-CC-G2BYq.js";
import { T as Textarea } from "./textarea-BxfU_AZz.js";
import { C as Clock } from "./clock-DpT6s-PI.js";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, b as Cell } from "./BarChart-BC7wWHQy.js";
const KEY = (id) => `sitecore_complaints_${id}`;
const PRIORITY_COLORS = {
  low: "bg-gray-100 text-gray-600 border-gray-200",
  medium: "bg-blue-100 text-blue-700 border-blue-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  urgent: "bg-red-100 text-red-700 border-red-200"
};
const PRIORITY_LABELS = {
  low: "Düşük",
  medium: "Orta",
  high: "Yüksek",
  urgent: "Acil"
};
const CAT_COLORS = {
  noise: "#F59E0B",
  cleanliness: "#22C55E",
  security: "#EF4444",
  suggestion: "#4A90D9",
  other: "#8B5CF6"
};
function daysSince(dateStr) {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 864e5);
}
function ComplaintBox({
  buildingId,
  userId,
  isOwner,
  t
}) {
  const [items, setItems] = reactExports.useState([]);
  const [showDialog, setShowDialog] = reactExports.useState(false);
  const [replyTarget, setReplyTarget] = reactExports.useState(null);
  const [replyText, setReplyText] = reactExports.useState("");
  const [replyAssignee, setReplyAssignee] = reactExports.useState("");
  const [form, setForm] = reactExports.useState({
    title: "",
    description: "",
    category: "noise",
    priority: "medium",
    anonymous: false
  });
  reactExports.useEffect(() => {
    const raw = localStorage.getItem(KEY(buildingId));
    if (raw) {
      const parsed = JSON.parse(raw);
      setItems(
        parsed.map((c) => ({ priority: "medium", ...c }))
      );
    } else {
      const seed = [
        {
          id: "c1",
          title: "Gece Gürültüsü",
          description: "3. kattan gece geç saatte müzik sesi geliyor.",
          category: "noise",
          priority: "high",
          anonymous: false,
          submittedBy: "resident1",
          status: "investigating",
          assignedTo: "Yönetici Ali",
          createdAt: new Date(Date.now() - 864e5).toISOString()
        },
        {
          id: "c2",
          title: "Asansör Temizliği",
          description: "Asansör içi uzun süredir temizlenmedi.",
          category: "cleanliness",
          priority: "medium",
          anonymous: true,
          submittedBy: "anon",
          status: "resolved",
          adminReply: "Temizlik ekibi bilgilendirildi.",
          createdAt: new Date(Date.now() - 1728e5).toISOString(),
          resolvedAt: new Date(Date.now() - 864e5).toISOString()
        },
        {
          id: "c3",
          title: "Otopark Güvenliği",
          description: "Otopark kameraları çalışmıyor.",
          category: "security",
          priority: "urgent",
          anonymous: false,
          submittedBy: "resident2",
          status: "pending",
          createdAt: new Date(Date.now() - 2592e5).toISOString()
        }
      ];
      setItems(seed);
      localStorage.setItem(KEY(buildingId), JSON.stringify(seed));
    }
  }, [buildingId]);
  const save = (updated) => {
    setItems(updated);
    localStorage.setItem(KEY(buildingId), JSON.stringify(updated));
  };
  const handleSubmit = () => {
    if (!form.title.trim() || !form.description.trim()) return;
    save([
      ...items,
      {
        id: Date.now().toString(),
        ...form,
        submittedBy: form.anonymous ? "anon" : userId,
        status: "pending",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    ]);
    setShowDialog(false);
    setForm({
      title: "",
      description: "",
      category: "noise",
      priority: "medium",
      anonymous: false
    });
  };
  const handleReply = () => {
    if (!replyTarget) return;
    save(
      items.map(
        (i) => i.id === replyTarget.id ? {
          ...i,
          adminReply: replyText,
          assignedTo: replyAssignee || i.assignedTo,
          status: "resolved",
          resolvedAt: (/* @__PURE__ */ new Date()).toISOString()
        } : i
      )
    );
    setReplyTarget(null);
    setReplyText("");
    setReplyAssignee("");
  };
  const handleAdvanceStatus = (id) => {
    save(
      items.map((i) => {
        if (i.id !== id) return i;
        const next = i.status === "pending" ? "investigating" : i.status === "investigating" ? "resolved" : "pending";
        return {
          ...i,
          status: next,
          resolvedAt: next === "resolved" ? (/* @__PURE__ */ new Date()).toISOString() : void 0
        };
      })
    );
  };
  const statusBadge = (status) => {
    if (status === "resolved")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700", children: "Çözümlendi" });
    if (status === "investigating")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-100 text-blue-700", children: "İnceleniyor" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-100 text-amber-700", children: t.pending || "Bekliyor" });
  };
  const categoryLabel = (cat) => {
    const map = {
      noise: t.catNoise || "Gürültü",
      cleanliness: t.catCleanliness || "Temizlik",
      security: t.catSecurity || "Güvenlik",
      suggestion: t.catSuggestion || "Öneri",
      other: t.other || "Diğer"
    };
    return map[cat] || cat;
  };
  const myItems = isOwner ? items : items.filter((c) => c.submittedBy === userId || c.anonymous);
  const statusNextLabel = (s) => {
    if (s === "pending") return "İncele";
    if (s === "investigating") return "Çözümlendi";
    return "Yeniden Aç";
  };
  const catStats = reactExports.useMemo(() => {
    const map = {};
    for (const c of items) {
      map[c.category] = (map[c.category] || 0) + 1;
    }
    const catLabelMap = {
      noise: t.catNoise || "Gürültü",
      cleanliness: t.catCleanliness || "Temizlik",
      security: t.catSecurity || "Güvenlik",
      suggestion: t.catSuggestion || "Öneri",
      other: t.other || "Diğer"
    };
    return Object.entries(map).map(([cat, count]) => ({
      name: catLabelMap[cat] || cat,
      count,
      fill: CAT_COLORS[cat] || "#8B5CF6"
    }));
  }, [items, t]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: t.complaintBox || "Şikayet & Öneri Kutusu" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowDialog(true),
          className: "bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full",
          "data-ocid": "complaints.primary_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            t.submitComplaint || "Şikayet Ekle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 border border-[#E8EDF5]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: t.pendingComplaints || "Bekleyen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-amber-600", children: items.filter((c) => c.status === "pending").length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 border border-[#E8EDF5]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: "İnceleniyor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-blue-600", children: items.filter((c) => c.status === "investigating").length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 border border-[#E8EDF5]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: t.resolvedComplaints || "Çözümlenen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-green-600", children: items.filter((c) => c.status === "resolved").length })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "list", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-[#F3F6FB]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "list", children: "Listele" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "stats", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-3.5 h-3.5 mr-1" }),
          " İstatistikler"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "list", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: myItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-white rounded-2xl border border-[#E8EDF5] p-12 text-center",
          "data-ocid": "complaints.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-10 w-10 text-[#D7DEE9] mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: t.noComplaints || "Şikayet bulunamadı." })
          ]
        }
      ) : myItems.map((c, i) => {
        const since = daysSince(c.createdAt);
        const resolutionDays = c.resolvedAt ? Math.floor(
          (new Date(c.resolvedAt).getTime() - new Date(c.createdAt).getTime()) / 864e5
        ) : null;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-white rounded-2xl border border-[#E8EDF5] p-4",
            "data-ocid": `complaints.item.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116]", children: c.title }),
                  statusBadge(c.status),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      className: `border text-xs ${PRIORITY_COLORS[c.priority]}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3 mr-1 inline" }),
                        PRIORITY_LABELS[c.priority]
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[#F1F4F8] text-[#6B7A8D]", children: categoryLabel(c.category) }),
                  c.anonymous && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gray-100 text-gray-600", children: t.anonymous || "Anonim" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654]", children: c.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-2 text-xs text-[#6B7A8D]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                    since === 0 ? "Bugün" : `${since} gün önce`
                  ] }),
                  c.assignedTo && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3" }),
                    c.assignedTo
                  ] }),
                  resolutionDays !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-600", children: [
                    "✓ ",
                    resolutionDays,
                    " günde çözümlendi"
                  ] })
                ] }),
                c.adminReply && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 bg-[#F3F6FB] rounded-lg p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-[#6B7A8D] mb-1", children: [
                    t.adminReply || "Yönetici Yanıtı",
                    ":"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#0E1116]", children: c.adminReply })
                ] })
              ] }),
              isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: () => {
                      setReplyTarget(c);
                      setReplyText(c.adminReply || "");
                      setReplyAssignee(c.assignedTo || "");
                    },
                    className: "text-xs rounded-full",
                    "data-ocid": `complaints.edit_button.${i + 1}`,
                    children: t.adminReply || "Yanıtla"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: () => handleAdvanceStatus(c.id),
                    className: "text-xs rounded-full",
                    "data-ocid": `complaints.toggle.${i + 1}`,
                    children: statusNextLabel(c.status)
                  }
                )
              ] })
            ] })
          },
          c.id
        );
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "stats", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-[#E8EDF5] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Kategori Dağılımı" }),
        catStats.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D] text-sm text-center py-6", children: "Şikayet bulunamadı." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          BarChart,
          {
            data: catStats,
            margin: { top: 5, right: 10, left: 0, bottom: 5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#F0F3F8" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "name",
                  tick: { fontSize: 12, fill: "#6B7A8D" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  tick: { fontSize: 11, fill: "#6B7A8D" },
                  allowDecimals: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  contentStyle: {
                    borderRadius: 8,
                    border: "1px solid #E5EAF2"
                  },
                  formatter: (v) => [`${v} Şikayet`]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "count", radius: [4, 4, 0, 0], children: catStats.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.fill }, entry.name)) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-[#3A4654]", children: "Açık Şikayet Geçmişi" }),
          items.filter((c) => c.status !== "resolved").map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0E1116]", children: c.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#6B7A8D]", children: [
                    daysSince(c.createdAt),
                    " gündür açık"
                  ] }),
                  statusBadge(c.status)
                ] })
              ]
            },
            c.id
          )),
          items.filter((c) => c.status !== "resolved").length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-green-600", children: "✓ Tüm şikayetler çözümlendi." })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showDialog, onOpenChange: setShowDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "complaints.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t.submitComplaint || "Şikayet / Öneri Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.complaintTitle || "Başlık" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.title,
              onChange: (e) => setForm((p) => ({ ...p, title: e.target.value })),
              "data-ocid": "complaints.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.complaintCategory || "Kategori" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: form.category,
                onChange: (e) => setForm((p) => ({
                  ...p,
                  category: e.target.value
                })),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                "data-ocid": "complaints.select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "noise", children: t.catNoise || "Gürültü" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cleanliness", children: t.catCleanliness || "Temizlik" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "security", children: t.catSecurity || "Güvenlik" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "suggestion", children: t.catSuggestion || "Öneri" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "other", children: t.other || "Diğer" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Aciliyet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: form.priority,
                onChange: (e) => setForm((p) => ({
                  ...p,
                  priority: e.target.value
                })),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "low", children: "Düşük" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "medium", children: "Orta" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "high", children: "Yüksek" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "urgent", children: "Acil" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.complaintDesc || "Açıklama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: form.description,
              onChange: (e) => setForm((p) => ({ ...p, description: e.target.value })),
              rows: 4,
              "data-ocid": "complaints.textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              id: "anon",
              checked: form.anonymous,
              onChange: (e) => setForm((p) => ({ ...p, anonymous: e.target.checked })),
              "data-ocid": "complaints.checkbox"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "anon", className: "text-sm text-[#3A4654]", children: t.anonymous || "Anonim Gönder" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSubmit,
              className: "flex-1 bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full",
              "data-ocid": "complaints.submit_button",
              children: t.submitComplaint || "Gönder"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowDialog(false),
              className: "flex-1 rounded-full",
              "data-ocid": "complaints.cancel_button",
              children: t.cancel || "İptal"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!replyTarget, onOpenChange: () => setReplyTarget(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "complaints.modal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t.adminReply || "Yanıt Yaz" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Atanan Kişi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: replyAssignee,
              onChange: (e) => setReplyAssignee(e.target.value),
              placeholder: "Örn. Yönetici Ali"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Yanıt" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: replyText,
              onChange: (e) => setReplyText(e.target.value),
              rows: 4,
              placeholder: t.adminReply || "Yanıtınızı yazın..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleReply,
              className: "flex-1 bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full",
              "data-ocid": "complaints.confirm_button",
              children: t.send || "Gönder"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setReplyTarget(null),
              className: "flex-1 rounded-full",
              "data-ocid": "complaints.close_button",
              children: t.cancel || "İptal"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ComplaintBox as default
};
