import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, ax as ClipboardList, e as Badge, ay as HardHat, m as Calendar, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, F as FileText, I as Input, W as Wrench } from "./index-DOWBo6uK.js";
import { P as Progress } from "./progress-CkhTFwzx.js";
import { T as Textarea } from "./textarea-C_GrROuA.js";
import { C as CircleCheck } from "./circle-check-DP0xdjv4.js";
import { D as DollarSign } from "./dollar-sign-DfYvG_gS.js";
import { F as Funnel } from "./funnel-DvPU3PIG.js";
import { R as ResponsiveContainer, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, L as Legend, B as Bar } from "./generateCategoricalChart-C_VCRMet.js";
import { B as BarChart } from "./BarChart-CaT4iaZP.js";
import { C as CircleAlert } from "./circle-alert-DqTIyr-z.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2", key: "76otgf" }],
  ["path", { d: "M9 22v-4h6v4", key: "r93iot" }],
  ["path", { d: "M8 6h.01", key: "1dz90k" }],
  ["path", { d: "M16 6h.01", key: "1x0f13" }],
  ["path", { d: "M12 6h.01", key: "1vi96p" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }]
];
const Building = createLucideIcon("building", __iconNode);
const SAMPLE_PROJECTS = [
  {
    id: "p1",
    name: "Asansör Modernizasyonu",
    description: "Binadaki iki asansörün komple yenilenmesi ve modern sistemlere geçiş.",
    category: "Mekanik",
    contractor: "ElevaTek A.Ş.",
    startDate: "2026-02-01",
    endDate: "2026-05-30",
    budget: 48e4,
    spent: 21e4,
    phase: "Uygulama",
    priority: "Yüksek",
    notes: "Asansör 1 tamamlandı, asansör 2 devam ediyor."
  },
  {
    id: "p2",
    name: "Çatı Yenileme Projesi",
    description: "Tüm bina çatısının yeniden kaplanması ve su yalıtımının güçlendirilmesi.",
    category: "Yapısal",
    contractor: "Yapı İnşaat Ltd.",
    startDate: "2026-04-15",
    endDate: "2026-08-31",
    budget: 72e4,
    spent: 0,
    phase: "İhale",
    priority: "Kritik",
    notes: "3 farklı firmadan teklif alındı, değerlendirme sürecinde."
  },
  {
    id: "p3",
    name: "Bahçe Düzenleme & Peyzaj",
    description: "Ortak bahçe alanının yeniden düzenlenmesi, sulama sistemi ve aydınlatma.",
    category: "Peyzaj",
    contractor: "YeşilBahçe Peyzaj",
    startDate: "2025-10-01",
    endDate: "2025-12-31",
    budget: 95e3,
    spent: 95e3,
    phase: "Tamamlandı",
    priority: "Orta",
    notes: "Proje başarıyla tamamlandı. Sakinlerden olumlu geri bildirim alındı."
  },
  {
    id: "p4",
    name: "Güneş Paneli Kurulumu",
    description: "Çatıya 50 adet güneş paneli kurulumu ve ortak alan elektrik tasarrufu.",
    category: "Elektrik",
    contractor: "SolarTürk Enerji",
    startDate: "2026-06-01",
    endDate: "2026-09-30",
    budget: 34e4,
    spent: 0,
    phase: "Planlama",
    priority: "Orta",
    notes: "Fizibilite çalışması devam ediyor. Belediye izinleri için başvuru yapıldı."
  }
];
const PHASES = [
  "Planlama",
  "İhale",
  "Uygulama",
  "Tamamlandı"
];
const CATEGORIES = [
  "Yapısal",
  "Mekanik",
  "Elektrik",
  "Peyzaj"
];
const PRIORITIES = ["Düşük", "Orta", "Yüksek", "Kritik"];
function phaseBadge(phase) {
  const map = {
    Planlama: "bg-blue-100 text-blue-700 border-blue-200",
    İhale: "bg-amber-100 text-amber-700 border-amber-200",
    Uygulama: "bg-orange-100 text-orange-700 border-orange-200",
    Tamamlandı: "bg-green-100 text-green-700 border-green-200"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `${map[phase] || ""} text-xs`, children: phase });
}
function priorityBadge(p) {
  const map = {
    Düşük: "bg-gray-100 text-gray-600",
    Orta: "bg-blue-100 text-blue-700",
    Yüksek: "bg-orange-100 text-orange-700",
    Kritik: "bg-red-100 text-red-700"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `${map[p] || ""} text-xs border-0`, children: p });
}
function categoryIcon(cat) {
  if (cat === "Yapısal") return /* @__PURE__ */ jsxRuntimeExports.jsx(Building, { className: "w-4 h-4" });
  if (cat === "Mekanik") return /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-4 h-4" });
  if (cat === "Elektrik") return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(HardHat, { className: "w-4 h-4" });
}
const EMPTY_FORM = {
  name: "",
  description: "",
  category: "Yapısal",
  contractor: "",
  startDate: "",
  endDate: "",
  budget: 0,
  spent: 0,
  phase: "Planlama",
  priority: "Orta",
  notes: ""
};
function ProjectManagement({ buildingId, isOwner }) {
  const storageKey = `sitecore_projects_${buildingId}`;
  const [projects, setProjects] = reactExports.useState(() => {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : SAMPLE_PROJECTS;
  });
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [detailProject, setDetailProject] = reactExports.useState(null);
  const [filterPhase, setFilterPhase] = reactExports.useState("all");
  const [filterCategory, setFilterCategory] = reactExports.useState("all");
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const save = (updated) => {
    setProjects(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };
  const handleAdd = () => {
    if (!form.name.trim()) return;
    save([...projects, { ...form, id: crypto.randomUUID() }]);
    setShowAddModal(false);
    setForm(EMPTY_FORM);
  };
  const activeCount = projects.filter((p) => p.phase !== "Tamamlandı").length;
  const doneCount = projects.filter((p) => p.phase === "Tamamlandı").length;
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
  const filtered = projects.filter((p) => {
    if (filterPhase !== "all" && p.phase !== filterPhase) return false;
    if (filterCategory !== "all" && p.category !== filterCategory) return false;
    return true;
  });
  const budgetChartData = filtered.map((p) => ({
    name: p.name.length > 14 ? `${p.name.slice(0, 14)}…` : p.name,
    Bütçe: p.budget / 1e3,
    Harcanan: p.spent / 1e3
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Proje & Büyük Tadilat Yönetimi" }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "projects.primary_button",
          onClick: () => {
            setForm(EMPTY_FORM);
            setShowAddModal(true);
          },
          className: "bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Yeni Proje"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 border border-[#E5EAF2] shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-[#4A90D9]", children: activeCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[#6B7A8D] text-sm mt-1 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-3 h-3" }),
          " Aktif Projeler"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 border border-[#E5EAF2] shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-green-600", children: doneCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[#6B7A8D] text-sm mt-1 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
          " Tamamlanan"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 border border-[#E5EAF2] shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-[#0B1B2E]", children: [
          (totalBudget / 1e3).toFixed(0),
          "K ₺"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[#6B7A8D] text-sm mt-1 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-3 h-3" }),
          " Toplam Bütçe"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 border border-[#E5EAF2] shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-orange-600", children: [
          (totalSpent / 1e3).toFixed(0),
          "K ₺"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[#6B7A8D] text-sm mt-1 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-3 h-3" }),
          " Harcanan"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4 text-[#6B7A8D]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-[#6B7A8D]", children: "Aşama:" })
      ] }),
      ["all", ...PHASES].map((phase) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: filterPhase === phase ? "default" : "outline",
          onClick: () => setFilterPhase(phase),
          className: filterPhase === phase ? "bg-[#4A90D9] text-white rounded-full" : "rounded-full",
          children: phase === "all" ? "Tümü" : phase
        },
        phase
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 ml-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-[#6B7A8D]", children: "Kategori:" }) }),
      ["all", ...CATEGORIES].map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: filterCategory === cat ? "default" : "outline",
          onClick: () => setFilterCategory(cat),
          className: filterCategory === cat ? "bg-[#0B1B2E] text-white rounded-full" : "rounded-full",
          children: cat === "all" ? "Tümü" : cat
        },
        cat
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "projects.empty_state",
        className: "bg-white rounded-2xl border border-[#E5EAF2] p-12 text-center text-[#6B7A8D]",
        children: "Filtre kriterlerine uygun proje bulunamadı."
      }
    ) : filtered.map((project, idx) => {
      const pct = project.budget > 0 ? Math.round(project.spent / project.budget * 100) : 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `projects.item.${idx + 1}`,
          className: "bg-white rounded-2xl border border-[#E5EAF2] shadow-sm p-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-[#F3F6FB] rounded-xl text-[#4A90D9]", children: categoryIcon(project.category) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116]", children: project.name }),
                    phaseBadge(project.phase),
                    priorityBadge(project.priority),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[#EEF3FA] text-[#4A90D9] border-0 text-xs", children: project.category })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: project.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-2 text-xs text-[#6B7A8D]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(HardHat, { className: "w-3 h-3" }),
                      " ",
                      project.contractor
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                      " ",
                      project.startDate,
                      " –",
                      " ",
                      project.endDate
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": `projects.edit_button.${idx + 1}`,
                  variant: "outline",
                  size: "sm",
                  className: "rounded-full text-xs",
                  onClick: () => setDetailProject(project),
                  children: "Detay"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-[#6B7A8D] mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Harcanan: ",
                  project.spent.toLocaleString(),
                  " ₺"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Bütçe: ",
                  project.budget.toLocaleString(),
                  " ₺ (",
                  pct,
                  "%)"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct, className: "h-2" })
            ] })
          ]
        },
        project.id
      );
    }) }),
    detailProject && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!detailProject,
        onOpenChange: () => setDetailProject(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
            categoryIcon(detailProject.category),
            detailProject.name
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "detail", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "detail", children: "Genel Bilgi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "budget", children: "Bütçe Analizi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "timeline", children: "Aşama Takibi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "files", children: "Dosyalar" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "detail", className: "space-y-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654]", children: detailProject.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F3F6FB] rounded-xl p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D] text-xs", children: "Kategori" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mt-0.5", children: detailProject.category })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F3F6FB] rounded-xl p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D] text-xs", children: "Yüklenici" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mt-0.5", children: detailProject.contractor })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F3F6FB] rounded-xl p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D] text-xs", children: "Başlangıç" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mt-0.5", children: detailProject.startDate })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F3F6FB] rounded-xl p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D] text-xs", children: "Bitiş" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mt-0.5", children: detailProject.endDate })
                ] })
              ] }),
              detailProject.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-xl p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700 font-semibold mb-1", children: "Notlar" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-amber-900", children: detailProject.notes })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "budget", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-xl p-3 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-600", children: "Toplam Bütçe" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-blue-700", children: [
                    detailProject.budget.toLocaleString(),
                    " ₺"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-orange-50 border border-orange-200 rounded-xl p-3 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-orange-600", children: "Harcanan" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-orange-700", children: [
                    detailProject.spent.toLocaleString(),
                    " ₺"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                BarChart,
                {
                  data: [
                    {
                      name: detailProject.name.slice(0, 12),
                      Bütçe: detailProject.budget,
                      Harcanan: detailProject.spent
                    }
                  ],
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#F0F3F8" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 11 } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11 } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Tooltip,
                      {
                        formatter: (v) => [`${Number(v).toLocaleString()} ₺`]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Bütçe", fill: "#4A90D9", radius: [4, 4, 0, 0] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Bar,
                      {
                        dataKey: "Harcanan",
                        fill: "#F2A23A",
                        radius: [4, 4, 0, 0]
                      }
                    )
                  ]
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "timeline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mt-2", children: PHASES.map((ph, i) => {
              const phaseIdx = PHASES.indexOf(detailProject.phase);
              const done = i <= phaseIdx;
              const active = ph === detailProject.phase;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${active ? "bg-[#4A90D9] text-white" : done ? "bg-green-500 text-white" : "bg-[#E5EAF2] text-[#6B7A8D]"}`,
                    children: done && !active ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : i + 1
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 pb-4 border-b border-[#F0F3F8]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: `font-medium text-sm ${active ? "text-[#4A90D9]" : done ? "text-green-700" : "text-[#6B7A8D]"}`,
                      children: ph
                    }
                  ),
                  active && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-0.5", children: "Mevcut aşama" })
                ] })
              ] }, ph);
            }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "files", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              [
                "Proje Sözleşmesi.pdf",
                "Keşif Raporu.docx",
                "Teknik Çizimler.zip",
                "İzin Belgeleri.pdf"
              ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between bg-[#F3F6FB] rounded-xl px-4 py-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-[#4A90D9]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-[#0E1116]", children: f })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "ghost",
                        className: "text-[#4A90D9] text-xs rounded-full",
                        children: "İndir"
                      }
                    )
                  ]
                },
                f
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  className: "w-full rounded-full mt-2 border-dashed",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
                    " Dosya Ekle"
                  ]
                }
              )
            ] }) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAddModal, onOpenChange: setShowAddModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Proje Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 max-h-[70vh] overflow-y-auto pr-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Proje Adı *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "projects.input",
              value: form.name,
              onChange: (e) => setForm((p) => ({ ...p, name: e.target.value })),
              placeholder: "Asansör Modernizasyonu"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Açıklama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: form.description,
              onChange: (e) => setForm((p) => ({ ...p, description: e.target.value })),
              rows: 2,
              placeholder: "Proje detayları..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Kategori" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: form.category,
                onChange: (e) => setForm((p) => ({
                  ...p,
                  category: e.target.value
                })),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Öncelik" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: form.priority,
                onChange: (e) => setForm((p) => ({
                  ...p,
                  priority: e.target.value
                })),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                children: PRIORITIES.map((pr) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: pr }, pr))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Yüklenici / Firma" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.contractor,
              onChange: (e) => setForm((p) => ({ ...p, contractor: e.target.value })),
              placeholder: "Firma adı"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Başlangıç Tarihi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: form.startDate,
                onChange: (e) => setForm((p) => ({ ...p, startDate: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Bitiş Tarihi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: form.endDate,
                onChange: (e) => setForm((p) => ({ ...p, endDate: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Bütçe (₺)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              value: form.budget || "",
              onChange: (e) => setForm((p) => ({ ...p, budget: Number(e.target.value) })),
              placeholder: "500000"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Aşama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: form.phase,
              onChange: (e) => setForm((p) => ({
                ...p,
                phase: e.target.value
              })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              children: PHASES.map((ph) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: ph }, ph))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Notlar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: form.notes,
              onChange: (e) => setForm((p) => ({ ...p, notes: e.target.value })),
              rows: 2
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "projects.submit_button",
            onClick: handleAdd,
            disabled: !form.name.trim(),
            className: "w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full",
            children: "Projeyi Kaydet"
          }
        )
      ] })
    ] }) }),
    projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-[#E5EAF2] p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-[#0E1116] mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-4 h-4" }),
        " Proje Bütçe Karşılaştırması (Bin ₺)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        BarChart,
        {
          data: budgetChartData,
          margin: { top: 5, right: 10, left: 0, bottom: 5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#F0F3F8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 11, fill: "#6B7A8D" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11, fill: "#6B7A8D" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                contentStyle: { borderRadius: 8, border: "1px solid #E5EAF2" },
                formatter: (v) => [`${Number(v).toFixed(0)}K ₺`]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 12 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Bütçe", fill: "#4A90D9", radius: [4, 4, 0, 0] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Harcanan", fill: "#F2A23A", radius: [4, 4, 0, 0] })
          ]
        }
      ) })
    ] })
  ] });
}
export {
  ProjectManagement as default
};
