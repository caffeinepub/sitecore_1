import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, ax as ClipboardList, F as FileText, S as Search, I as Input, T as TriangleAlert, e as Badge, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle } from "./index-DrmT2NwI.js";
import { C as Card, a as CardContent } from "./card-Bc19n7vK.js";
import { C as Circle } from "./circle-f86RntAB.js";
import { C as CircleCheck } from "./circle-check-D4Ni48Rm.js";
import { C as Clock } from "./clock-npxEKmqV.js";
import { P as Printer } from "./printer-BMLIyU-9.js";
import { R as RefreshCw } from "./refresh-cw-D6EPw4tE.js";
import { C as CircleX } from "./circle-x-B0w_KxRH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
];
const Timer = createLucideIcon("timer", __iconNode);
const STAFF_LIST = [
  "Ahmet Yılmaz",
  "Fatma Kaya",
  "Mehmet Demir",
  "Ali Rıza",
  "Mustafa Şahin",
  "Hasan Çelik",
  "Güvenlik A.Ş.",
  "Teknik Servis Ltd."
];
const TEMPLATES = [
  {
    id: "t1",
    title: "Aylık Asansör Bakımı",
    period: "Aylık",
    category: "Bakım",
    estimatedHours: 2,
    description: "Aylık periyodik asansör yağlama, kontrol ve test işlemleri"
  },
  {
    id: "t2",
    title: "Çeyreklik Yangın Sistemi Kontrolü",
    period: "3 Aylık",
    category: "Bakım",
    estimatedHours: 3,
    description: "Yangın söndürücü, duman dedektörü ve alarm sistemleri kontrolü"
  },
  {
    id: "t3",
    title: "Haftalık Ortak Alan Temizliği",
    period: "Haftalık",
    category: "Temizlik",
    estimatedHours: 4,
    description: "Giriş, koridor, merdiven ve ortak alanların haftalık genel temizliği"
  },
  {
    id: "t4",
    title: "Yıllık Çatı İncelemesi",
    period: "Yıllık",
    category: "Genel",
    estimatedHours: 6,
    description: "Çatı su yalıtımı, oluklar, baca ve çatı örtüsünün yıllık incelemesi"
  },
  {
    id: "t5",
    title: "Aylık Jeneratör Testi",
    period: "Aylık",
    category: "Bakım",
    estimatedHours: 1,
    description: "Jeneratör devreye alma testi, yağ ve yakıt kontrolü"
  },
  {
    id: "t6",
    title: "Haftalık Havuz Bakımı",
    period: "Haftalık",
    category: "Bakım",
    estimatedHours: 2,
    description: "Havuz suyu kimyasal dengesi, filtre temizliği ve yüzey bakımı"
  }
];
const PERIOD_COLORS = {
  Haftalık: "bg-green-100 text-green-700 border-green-200",
  Aylık: "bg-blue-100 text-blue-700 border-blue-200",
  "3 Aylık": "bg-purple-100 text-purple-700 border-purple-200",
  Yıllık: "bg-orange-100 text-orange-700 border-orange-200"
};
const TEMPLATE_CATEGORY_ICONS = {
  Bakım: "🔧",
  Temizlik: "🧹",
  Genel: "📋",
  Arıza: "⚠️"
};
const INITIAL_ORDERS = [
  {
    id: "1",
    orderNo: "IE-2026-001",
    title: "Asansör Yağlama ve Bakımı",
    type: "Bakım",
    source: "Planlı Bakım",
    description: "Aylık periyodik asansör yağlama ve kontrol işlemi",
    priority: "Normal",
    status: "Tamamlandı",
    assignee: "Teknik Servis Ltd.",
    estimatedHours: 3,
    createdAt: "2026-03-01",
    completedAt: "2026-03-02"
  },
  {
    id: "2",
    orderNo: "IE-2026-002",
    title: "Bodrum Kat Su Borusu Sızıntısı",
    type: "Arıza",
    source: "Arıza Bildirimi",
    description: "B-04 bodrum katında su borusu sızıntısı tespit edildi",
    priority: "Kritik",
    status: "Devam Ediyor",
    assignee: "Ahmet Yılmaz",
    estimatedHours: 5,
    createdAt: "2026-03-10",
    completedAt: null
  },
  {
    id: "3",
    orderNo: "IE-2026-003",
    title: "Koridor Ampul Değişimi",
    type: "Arıza",
    source: "Manuel",
    description: "3. ve 4. kat koridorlarında ampul değişimi yapılacak",
    priority: "Düşük",
    status: "Atandı",
    assignee: "Mehmet Demir",
    estimatedHours: 2,
    createdAt: "2026-03-12",
    completedAt: null
  },
  {
    id: "4",
    orderNo: "IE-2026-004",
    title: "Bahçe Sulama Sistemi Kontrolü",
    type: "Bakım",
    source: "Planlı Bakım",
    description: "Sulama sisteminin yaz öncesi genel kontrolü",
    priority: "Normal",
    status: "Açık",
    assignee: "",
    estimatedHours: 4,
    createdAt: "2026-03-14",
    completedAt: null
  },
  {
    id: "5",
    orderNo: "IE-2026-005",
    title: "Jeneratör Periyodik Bakımı",
    type: "Bakım",
    source: "Planlı Bakım",
    description: "6 aylık jeneratör bakımı ve yağ değişimi",
    priority: "Yüksek",
    status: "Tamamlandı",
    assignee: "Teknik Servis Ltd.",
    estimatedHours: 6,
    createdAt: "2026-03-03",
    completedAt: "2026-03-05"
  },
  {
    id: "6",
    orderNo: "IE-2026-006",
    title: "Giriş Kapısı Kilit Tamiri",
    type: "Arıza",
    source: "Arıza Bildirimi",
    description: "Ana giriş kapısının elektronik kilidi bozuldu",
    priority: "Yüksek",
    status: "Tamamlandı",
    assignee: "Ali Rıza",
    estimatedHours: 1,
    createdAt: "2026-03-08",
    completedAt: "2026-03-08"
  },
  {
    id: "7",
    orderNo: "IE-2026-007",
    title: "Çatı Yağmur Olukları Temizliği",
    type: "Temizlik",
    source: "Planlı Bakım",
    description: "İlkbahar öncesi çatı olukları temizlenmesi",
    priority: "Normal",
    status: "Devam Ediyor",
    assignee: "Mustafa Şahin",
    estimatedHours: 8,
    createdAt: "2026-03-15",
    completedAt: null
  },
  {
    id: "8",
    orderNo: "IE-2026-008",
    title: "Otopark Zemin Boyası",
    type: "Genel",
    source: "Manuel",
    description: "Otopark zemin çizgilerinin yenilenmesi",
    priority: "Düşük",
    status: "Açık",
    assignee: "",
    estimatedHours: 12,
    createdAt: "2026-03-16",
    completedAt: null
  },
  {
    id: "9",
    orderNo: "IE-2026-009",
    title: "Havuz Filtre Sistemi Değişimi",
    type: "Bakım",
    source: "Planlı Bakım",
    description: "Yüzme havuzu filtre pompasının değiştirilmesi",
    priority: "Yüksek",
    status: "Atandı",
    assignee: "Teknik Servis Ltd.",
    estimatedHours: 10,
    createdAt: "2026-03-17",
    completedAt: null
  },
  {
    id: "10",
    orderNo: "IE-2026-010",
    title: "Yangın Söndürücü Dolumu",
    type: "Bakım",
    source: "Planlı Bakım",
    description: "Tüm katlardaki yangın söndürücülerin yıllık dolumu",
    priority: "Kritik",
    status: "Tamamlandı",
    assignee: "Güvenlik A.Ş.",
    estimatedHours: 4,
    createdAt: "2026-02-20",
    completedAt: "2026-02-22"
  },
  {
    id: "11",
    orderNo: "IE-2026-011",
    title: "Zemin Kat Tuvalet Tamiri",
    type: "Arıza",
    source: "Arıza Bildirimi",
    description: "Ortak kullanım tuvaletinde su kesme vanası arızası",
    priority: "Normal",
    status: "İptal",
    assignee: "Ahmet Yılmaz",
    estimatedHours: 2,
    createdAt: "2026-03-09",
    completedAt: null
  },
  {
    id: "12",
    orderNo: "IE-2026-012",
    title: "Toplantı Salonu Klima Bakımı",
    type: "Bakım",
    source: "Planlı Bakım",
    description: "Yaz öncesi klima filtre temizliği ve gaz kontrolü",
    priority: "Normal",
    status: "Açık",
    assignee: "",
    estimatedHours: 3,
    createdAt: "2026-03-20",
    completedAt: null
  }
];
const STATUS_CONFIG = {
  Açık: {
    label: "Açık",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-3 h-3" })
  },
  Atandı: {
    label: "Atandı",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-3 h-3" })
  },
  "Devam Ediyor": {
    label: "Devam Ediyor",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3" })
  },
  Tamamlandı: {
    label: "Tamamlandı",
    color: "bg-green-100 text-green-700 border-green-200",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" })
  },
  İptal: {
    label: "İptal",
    color: "bg-gray-100 text-gray-500 border-gray-200",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" })
  }
};
const PRIORITY_CONFIG = {
  Düşük: { color: "bg-gray-100 text-gray-500 border-gray-200" },
  Normal: { color: "bg-blue-100 text-blue-600 border-blue-200" },
  Yüksek: { color: "bg-orange-100 text-orange-600 border-orange-200" },
  Kritik: { color: "bg-red-100 text-red-600 border-red-200" }
};
function WorkOrderManagement({
  buildingId: _buildingId,
  isOwner
}) {
  const [orders, setOrders] = reactExports.useState(INITIAL_ORDERS);
  const [search, setSearch] = reactExports.useState("");
  const [filterStatus, setFilterStatus] = reactExports.useState("Tümü");
  const [filterType, setFilterType] = reactExports.useState("Tümü");
  const [filterPriority, setFilterPriority] = reactExports.useState("Tümü");
  const [showForm, setShowForm] = reactExports.useState(false);
  const [selectedOrder, setSelectedOrder] = reactExports.useState(null);
  const [printOrder, setPrintOrder] = reactExports.useState(null);
  const [activeTab, setActiveTab] = reactExports.useState("liste");
  const [form, setForm] = reactExports.useState({
    title: "",
    type: "Arıza",
    source: "Manuel",
    description: "",
    priority: "Normal",
    assignee: "",
    estimatedHours: ""
  });
  const stats = {
    total: orders.length,
    open: orders.filter((o) => o.status === "Açık").length,
    inProgress: orders.filter(
      (o) => o.status === "Devam Ediyor" || o.status === "Atandı"
    ).length,
    completed: orders.filter((o) => o.status === "Tamamlandı").length,
    avgHours: (() => {
      const done = orders.filter((o) => o.status === "Tamamlandı");
      return done.length ? Math.round(
        done.reduce((s, o) => s + o.estimatedHours, 0) / done.length
      ) : 0;
    })()
  };
  const filtered = orders.filter((o) => {
    const matchSearch = o.title.toLowerCase().includes(search.toLowerCase()) || o.orderNo.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Tümü" || o.status === filterStatus;
    const matchType = filterType === "Tümü" || o.type === filterType;
    const matchPriority = filterPriority === "Tümü" || o.priority === filterPriority;
    return matchSearch && matchStatus && matchType && matchPriority;
  });
  function handleCreate() {
    if (!form.title) return;
    const newOrder = {
      id: Date.now().toString(),
      orderNo: `IE-2026-${String(orders.length + 1).padStart(3, "0")}`,
      title: form.title,
      type: form.type,
      source: form.source,
      description: form.description,
      priority: form.priority,
      status: form.assignee ? "Atandı" : "Açık",
      assignee: form.assignee,
      estimatedHours: Number(form.estimatedHours) || 1,
      createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      completedAt: null
    };
    setOrders((prev) => [newOrder, ...prev]);
    setShowForm(false);
    setForm({
      title: "",
      type: "Arıza",
      source: "Manuel",
      description: "",
      priority: "Normal",
      assignee: "",
      estimatedHours: ""
    });
  }
  function handleStatusChange(id, status) {
    setOrders(
      (prev) => prev.map(
        (o) => o.id === id ? {
          ...o,
          status,
          completedAt: status === "Tamamlandı" ? (/* @__PURE__ */ new Date()).toISOString().split("T")[0] : o.completedAt
        } : o
      )
    );
    setSelectedOrder(null);
  }
  function handleUseTemplate(template) {
    setForm({
      title: template.title,
      type: template.category,
      source: "Planlı Bakım",
      description: template.description,
      priority: "Normal",
      assignee: "",
      estimatedHours: String(template.estimatedHours)
    });
    setActiveTab("liste");
    setShowForm(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-[#0E1116]", children: "İş Emri Yönetimi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: "Planlı ve arıza kaynaklı iş emirlerini takip edin" })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowForm(true),
          className: "bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full gap-2",
          "data-ocid": "workorder.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Yeni İş Emri"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: [
      {
        label: "Toplam İş Emri",
        value: stats.total,
        color: "bg-blue-100",
        iconColor: "text-blue-600",
        Icon: ClipboardList
      },
      {
        label: "Açık",
        value: stats.open,
        color: "bg-sky-100",
        iconColor: "text-sky-600",
        Icon: Circle
      },
      {
        label: "Devam Eden",
        value: stats.inProgress,
        color: "bg-yellow-100",
        iconColor: "text-yellow-600",
        Icon: LoaderCircle
      },
      {
        label: "Tamamlanan",
        value: stats.completed,
        color: "bg-green-100",
        iconColor: "text-green-600",
        Icon: CircleCheck
      },
      {
        label: "Ort. Süre (saat)",
        value: stats.avgHours,
        color: "bg-purple-100",
        iconColor: "text-purple-600",
        Icon: Timer
      }
    ].map(({ label, value, color, iconColor, Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white border-none shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-10 h-10 rounded-xl ${color} flex items-center justify-center`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${iconColor}` })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0E1116]", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: label })
      ] })
    ] }) }) }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 border-b border-[#E5EAF2]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab("liste"),
          className: `px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${activeTab === "liste" ? "bg-white border border-b-white border-[#E5EAF2] text-[#0B1B2E] -mb-px" : "text-[#6B7A8D] hover:text-[#0E1116]"}`,
          "data-ocid": "workorder.tab",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-4 h-4" }),
            "İş Emirleri",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-[#F1F4F8] text-[#6B7A8D] text-xs px-1.5 py-0.5 rounded-full", children: orders.length })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab("sablonlar"),
          className: `px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${activeTab === "sablonlar" ? "bg-white border border-b-white border-[#E5EAF2] text-[#0B1B2E] -mb-px" : "text-[#6B7A8D] hover:text-[#0E1116]"}`,
          "data-ocid": "workorder.tab",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
            "Şablonlar",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-[#F1F4F8] text-[#6B7A8D] text-xs px-1.5 py-0.5 rounded-full", children: TEMPLATES.length })
          ] })
        }
      )
    ] }),
    activeTab === "liste" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A8D]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "İş emri ara...",
              className: "pl-9",
              "data-ocid": "workorder.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: filterStatus,
            onChange: (e) => setFilterStatus(e.target.value),
            className: "border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]",
            "data-ocid": "workorder.select",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Tümü" }),
              [
                "Açık",
                "Atandı",
                "Devam Ediyor",
                "Tamamlandı",
                "İptal"
              ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: s }, s))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: filterType,
            onChange: (e) => setFilterType(e.target.value),
            className: "border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Tümü" }),
              ["Arıza", "Bakım", "Temizlik", "Genel"].map(
                (t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: t }, t)
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: filterPriority,
            onChange: (e) => setFilterPriority(e.target.value),
            className: "border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Tümü" }),
              ["Düşük", "Normal", "Yüksek", "Kritik"].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: p }, p))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-white rounded-xl shadow-sm overflow-hidden",
          "data-ocid": "workorder.table",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F1F4F8]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
                "İş Emri No",
                "Başlık",
                "Tür",
                "Öncelik",
                "Durum",
                "Atanan Kişi",
                "Oluşturma",
                "Tamamlanma",
                "İşlem"
              ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "px-4 py-3 text-left text-xs font-semibold text-[#6B7A8D] uppercase tracking-wide",
                  children: h
                },
                h
              )) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-[#F1F4F8]", children: filtered.map((order, idx) => {
                const sc = STATUS_CONFIG[order.status];
                const pc = PRIORITY_CONFIG[order.priority];
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "hover:bg-[#F8FAFC] transition-colors",
                    "data-ocid": `workorder.item.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-[#4A90D9] font-semibold", children: order.orderNo }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-[#0E1116]", children: order.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-0.5", children: order.source })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-[#F1F4F8] text-[#3A4654] rounded text-xs", children: order.type }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${pc.color}`,
                          children: [
                            order.priority === "Kritik" && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
                            order.priority
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${sc.color}`,
                          children: [
                            sc.icon,
                            sc.label
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#3A4654]", children: order.assignee || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#B0BAC7]", children: "—" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#6B7A8D]", children: order.createdAt }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#6B7A8D]", children: order.completedAt || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#B0BAC7]", children: "—" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "sm",
                            variant: "outline",
                            className: "rounded-full text-xs gap-1 h-7",
                            onClick: () => setSelectedOrder(order),
                            "data-ocid": `workorder.edit_button.${idx + 1}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                              " Durum"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            size: "sm",
                            variant: "ghost",
                            className: "rounded-full h-7 w-7 p-0 text-[#6B7A8D] hover:text-[#0B1B2E]",
                            onClick: () => setPrintOrder(order),
                            title: "Yazdır",
                            "data-ocid": `workorder.button.${idx + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-3.5 h-3.5" })
                          }
                        )
                      ] }) })
                    ]
                  },
                  order.id
                );
              }) })
            ] }),
            filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-12 text-[#6B7A8D]",
                "data-ocid": "workorder.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-8 h-8 mx-auto mb-2 text-[#B0BAC7]" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Kayıt bulunamadı" })
                ]
              }
            )
          ] })
        }
      )
    ] }),
    activeTab === "sablonlar" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: 'Tekrarlayan iş emirleri için hazır şablonlar. "Şablondan Oluştur" butonuna tıklayarak otomatik doldurulmuş form açılır.' }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: TEMPLATES.map((template) => {
        const periodColor = PERIOD_COLORS[template.period] ?? "bg-gray-100 text-gray-600 border-gray-200";
        const emoji = TEMPLATE_CATEGORY_ICONS[template.category] ?? "📋";
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "bg-white border border-[#E5EAF2] shadow-sm hover:shadow-md transition-shadow",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: emoji }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] text-sm leading-snug", children: template.title })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    className: `text-xs border shrink-0 ${periodColor}`,
                    variant: "outline",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-2.5 h-2.5 mr-1" }),
                      template.period
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] leading-relaxed", children: template.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-[#6B7A8D]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 bg-[#F1F4F8] rounded text-[#3A4654]", children: template.category }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "w-3 h-3" }),
                  template.estimatedHours,
                  " saat"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "w-full bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full text-xs gap-1.5 mt-1",
                  onClick: () => handleUseTemplate(template),
                  "data-ocid": "workorder.primary_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                    " Şablondan Oluştur"
                  ]
                }
              )
            ] }) })
          },
          template.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showForm, onOpenChange: setShowForm, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "workorder.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni İş Emri Oluştur" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "İş emri başlığı",
            value: form.title,
            onChange: (e) => setForm((p) => ({ ...p, title: e.target.value })),
            "data-ocid": "workorder.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1 block", children: "Tür" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: form.type,
                onChange: (e) => setForm((p) => ({
                  ...p,
                  type: e.target.value
                })),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                children: ["Arıza", "Bakım", "Temizlik", "Genel"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: t }, t))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1 block", children: "Kaynak" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: form.source,
                onChange: (e) => setForm((p) => ({
                  ...p,
                  source: e.target.value
                })),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                children: [
                  "Arıza Bildirimi",
                  "Planlı Bakım",
                  "Manuel"
                ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: s }, s))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1 block", children: "Öncelik" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: form.priority,
                onChange: (e) => setForm((p) => ({
                  ...p,
                  priority: e.target.value
                })),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                children: [
                  "Düşük",
                  "Normal",
                  "Yüksek",
                  "Kritik"
                ].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: p }, p))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1 block", children: "Tahmini Süre (saat)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                placeholder: "örn. 4",
                value: form.estimatedHours,
                onChange: (e) => setForm((p) => ({ ...p, estimatedHours: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1 block", children: "Atanan Kişi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.assignee,
              onChange: (e) => setForm((p) => ({ ...p, assignee: e.target.value })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Atanmadı" }),
                STAFF_LIST.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: s }, s))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1 block", children: "Açıklama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              placeholder: "İş emri detayı...",
              value: form.description,
              onChange: (e) => setForm((p) => ({ ...p, description: e.target.value })),
              rows: 3,
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm resize-none",
              "data-ocid": "workorder.textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleCreate,
            disabled: !form.title,
            className: "w-full bg-[#0B1B2E] text-white rounded-full",
            "data-ocid": "workorder.submit_button",
            children: "İş Emri Oluştur"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!selectedOrder,
        onOpenChange: () => setSelectedOrder(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", "data-ocid": "workorder.modal", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Durum Güncelle" }) }),
          selectedOrder && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#0E1116]", children: selectedOrder.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: selectedOrder.orderNo }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
              "Açık",
              "Atandı",
              "Devam Ediyor",
              "Tamamlandı",
              "İptal"
            ].map((s) => {
              const sc = STATUS_CONFIG[s];
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleStatusChange(selectedOrder.id, s),
                  className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${selectedOrder.status === s ? `${sc.color} border-current` : "border-[#E5EAF2] hover:bg-[#F1F4F8] text-[#3A4654]"}`,
                  "data-ocid": "workorder.toggle",
                  children: [
                    sc.icon,
                    " ",
                    s,
                    selectedOrder.status === s && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 ml-auto" })
                  ]
                },
                s
              );
            }) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!printOrder, onOpenChange: () => setPrintOrder(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "workorder.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4" }),
        "İş Emri Yazdır"
      ] }) }),
      printOrder && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            id: "print-work-order",
            className: "border border-[#E5EAF2] rounded-xl p-5 space-y-4 bg-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-[#E5EAF2] pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] uppercase tracking-wider font-semibold", children: "SiteCore — İş Emri" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-[#0E1116] mt-0.5", children: printOrder.orderNo })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs border font-medium ${STATUS_CONFIG[printOrder.status].color}`,
                    children: [
                      STATUS_CONFIG[printOrder.status].icon,
                      printOrder.status
                    ]
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] text-base", children: printOrder.title }),
                printOrder.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1 leading-relaxed", children: printOrder.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
                { label: "Tür", value: printOrder.type },
                { label: "Kaynak", value: printOrder.source },
                {
                  label: "Öncelik",
                  value: printOrder.priority
                },
                {
                  label: "Tahmini Süre",
                  value: `${printOrder.estimatedHours} saat`
                },
                {
                  label: "Atanan Kişi",
                  value: printOrder.assignee || "Atanmadı"
                },
                { label: "Oluşturma Tarihi", value: printOrder.createdAt },
                {
                  label: "Tamamlanma Tarihi",
                  value: printOrder.completedAt ?? "—"
                }
              ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F8FAFC] rounded-lg p-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-0.5", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#0E1116]", children: value })
              ] }, label)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-[#E5EAF2] pt-3 text-xs text-[#B0BAC7] flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "SiteCore Konut Yönetim Platformu" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: (/* @__PURE__ */ new Date()).toLocaleDateString("tr-TR") })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "rounded-full",
              onClick: () => setPrintOrder(null),
              "data-ocid": "workorder.cancel_button",
              children: "Kapat"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full gap-2",
              onClick: () => window.print(),
              "data-ocid": "workorder.primary_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4" }),
                " Yazdır"
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  WorkOrderManagement as default
};
