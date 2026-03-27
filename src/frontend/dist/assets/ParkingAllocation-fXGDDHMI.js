import { r as reactExports, j as jsxRuntimeExports, P as Plus, v as MapPin, a2 as Car } from "./index-sLqKzs0M.js";
import { R as RefreshCw } from "./refresh-cw-CFzNhQwG.js";
import { C as CircleCheckBig } from "./circle-check-big-C4SLFK0l.js";
import { C as CircleX } from "./circle-x-BvwStZB-.js";
const MOCK_SPOTS = [
  {
    id: "P-01",
    type: "Kapalı",
    floor: "B1",
    size: "Normal",
    assignedTo: "Daire 3",
    resident: "Ali Kaya",
    since: "2024-01-15",
    status: "assigned"
  },
  {
    id: "P-02",
    type: "Kapalı",
    floor: "B1",
    size: "Normal",
    assignedTo: "Daire 7",
    resident: "Ayşe Demir",
    since: "2023-06-20",
    status: "assigned"
  },
  {
    id: "P-03",
    type: "Kapalı",
    floor: "B1",
    size: "Geniş",
    assignedTo: null,
    resident: null,
    since: null,
    status: "free"
  },
  {
    id: "P-04",
    type: "Açık",
    floor: "Z",
    size: "Normal",
    assignedTo: "Daire 12",
    resident: "Mehmet Şahin",
    since: "2024-03-01",
    status: "assigned"
  },
  {
    id: "P-05",
    type: "Açık",
    floor: "Z",
    size: "Normal",
    assignedTo: null,
    resident: null,
    since: null,
    status: "free"
  },
  {
    id: "P-06",
    type: "Kapalı",
    floor: "B2",
    size: "Normal",
    assignedTo: "Daire 5",
    resident: "Fatma Yıldız",
    since: "2022-11-10",
    status: "assigned"
  },
  {
    id: "P-07",
    type: "Kapalı",
    floor: "B2",
    size: "Motosiklet",
    assignedTo: null,
    resident: null,
    since: null,
    status: "free"
  },
  {
    id: "P-08",
    type: "Açık",
    floor: "Z",
    size: "Normal",
    assignedTo: "Daire 1",
    resident: "Hasan Öztürk",
    since: "2025-01-05",
    status: "assigned"
  },
  {
    id: "P-09",
    type: "Kapalı",
    floor: "B1",
    size: "Normal",
    assignedTo: null,
    resident: null,
    since: null,
    status: "maintenance"
  },
  {
    id: "P-10",
    type: "Açık",
    floor: "Z",
    size: "Geniş",
    assignedTo: "Daire 9",
    resident: "Zeynep Arslan",
    since: "2024-08-22",
    status: "assigned"
  }
];
const MOCK_WAITLIST = [
  {
    id: 1,
    apartment: "Daire 4",
    resident: "Burak Çelik",
    requestDate: "2026-01-10",
    type: "Kapalı",
    priority: "normal"
  },
  {
    id: 2,
    apartment: "Daire 6",
    resident: "Selin Kara",
    requestDate: "2026-02-05",
    type: "Kapalı",
    priority: "urgent"
  },
  {
    id: 3,
    apartment: "Daire 11",
    resident: "Murat Boz",
    requestDate: "2026-03-01",
    type: "Açık",
    priority: "normal"
  }
];
const statusColors = {
  assigned: "bg-blue-100 text-blue-800",
  free: "bg-green-100 text-green-800",
  maintenance: "bg-yellow-100 text-yellow-800"
};
const statusLabels = {
  assigned: "Tahsisli",
  free: "Boş",
  maintenance: "Bakımda"
};
function ParkingAllocation({
  buildingId: _buildingId,
  isOwner,
  t: _t
}) {
  const [activeTab, setActiveTab] = reactExports.useState("spots");
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const [filterType, setFilterType] = reactExports.useState("all");
  const [showAssignModal, setShowAssignModal] = reactExports.useState(null);
  const [spots, setSpots] = reactExports.useState(MOCK_SPOTS);
  const [waitlist, setWaitlist] = reactExports.useState(MOCK_WAITLIST);
  const assigned = spots.filter((s) => s.status === "assigned").length;
  const free = spots.filter((s) => s.status === "free").length;
  spots.filter((s) => s.status === "maintenance").length;
  const filtered = spots.filter((s) => {
    if (filterStatus !== "all" && s.status !== filterStatus) return false;
    if (filterType !== "all" && s.type !== filterType) return false;
    return true;
  });
  const handleFree = (spotId) => {
    setSpots(
      (prev) => prev.map(
        (s) => s.id === spotId ? {
          ...s,
          status: "free",
          assignedTo: null,
          resident: null,
          since: null
        } : s
      )
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-[#1a2332]", children: "Park Yeri Tahsis Yönetimi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Sakinlere park yeri tahsisi, bekleme listesi ve devir yönetimi" })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "flex items-center gap-2 bg-[#4F8EF7] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3a7de8]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
            " Spot Ekle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[#1a2332]", children: spots.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Toplam Spot" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-blue-600", children: assigned }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Tahsisli" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-green-600", children: free }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Boş" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-orange-500", children: waitlist.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Bekleme Listesi" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-gray-100 rounded-lg p-1 w-fit", children: ["spots", "waitlist", "transfers"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(tab),
        className: `px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === tab ? "bg-white text-[#4F8EF7] shadow-sm" : "text-gray-600 hover:text-gray-900"}`,
        children: tab === "spots" ? "Park Noktaları" : tab === "waitlist" ? `Bekleme Listesi (${waitlist.length})` : "Devir & Transfer"
      },
      tab
    )) }),
    activeTab === "spots" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        ["all", "free", "assigned", "maintenance"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setFilterStatus(s),
            className: `px-3 py-1 rounded-full text-xs font-medium transition-all ${filterStatus === s ? "bg-[#4F8EF7] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
            children: s === "all" ? "Tümü" : statusLabels[s]
          },
          s
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px bg-gray-200 mx-1" }),
        ["all", "Kapalı", "Açık"].map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setFilterType(type),
            className: `px-3 py-1 rounded-full text-xs font-medium transition-all ${filterType === type ? "bg-[#1a2332] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
            children: type === "all" ? "Tüm Tip" : type
          },
          type
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-5 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, className: "text-[#4F8EF7]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#1a2332]", children: "Park Haritası" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 md:grid-cols-10 gap-2", children: filtered.map((spot) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `rounded-lg p-2 text-center cursor-pointer transition-all hover:scale-105 ${spot.status === "free" ? "bg-green-100 border-2 border-green-300" : spot.status === "maintenance" ? "bg-yellow-100 border-2 border-yellow-300" : "bg-blue-100 border-2 border-blue-300"}`,
            title: spot.assignedTo || "Boş",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Car,
                {
                  size: 16,
                  className: `mx-auto ${spot.status === "free" ? "text-green-600" : spot.status === "maintenance" ? "text-yellow-600" : "text-blue-600"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold mt-1 text-gray-700", children: spot.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500", children: spot.floor })
            ]
          },
          spot.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-4 text-xs text-gray-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded bg-green-300 inline-block" }),
            " ",
            "Boş"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded bg-blue-300 inline-block" }),
            " ",
            "Tahsisli"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded bg-yellow-300 inline-block" }),
            " ",
            "Bakımda"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 text-xs text-gray-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Spot No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Tip / Kat" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Tahsis" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Sakin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Tarih" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Durum" }),
          isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "İşlem" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y", children: filtered.map((spot) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-bold text-[#4F8EF7]", children: spot.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-gray-600", children: [
            spot.type,
            " / ",
            spot.floor,
            " - ",
            spot.size
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: spot.assignedTo || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-500", children: spot.resident || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-500", children: spot.since || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs px-2 py-1 rounded-full font-medium ${statusColors[spot.status]}`,
              children: statusLabels[spot.status]
            }
          ) }),
          isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: spot.status === "free" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowAssignModal(spot.id),
              className: "text-xs bg-[#4F8EF7] text-white px-3 py-1 rounded-lg hover:bg-[#3a7de8]",
              children: "Tahsis Et"
            }
          ) : spot.status === "assigned" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleFree(spot.id),
              className: "text-xs bg-red-50 text-red-600 px-3 py-1 rounded-lg hover:bg-red-100",
              children: "Boşalt"
            }
          ) : null })
        ] }, spot.id)) })
      ] }) })
    ] }),
    activeTab === "waitlist" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#1a2332]", children: "Park Yeri Bekleme Listesi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Boş spot oluştuğunda sırayla tahsis yapılır" })
      ] }),
      waitlist.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400", children: "Bekleme listesi boş" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 text-xs text-gray-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Sıra" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Daire" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Sakin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Talep Tarihi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Tip Tercihi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Öncelik" }),
          isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "İşlem" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y", children: waitlist.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-bold text-gray-500", children: index + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: entry.apartment }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-600", children: entry.resident }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-500", children: entry.requestDate }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-500", children: entry.type }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs px-2 py-1 rounded-full font-medium ${entry.priority === "urgent" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}`,
              children: entry.priority === "urgent" ? "Acil" : "Normal"
            }
          ) }),
          isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setWaitlist(
                (prev) => prev.filter((w) => w.id !== entry.id)
              ),
              className: "text-xs text-red-500 hover:text-red-700",
              children: "Çıkar"
            }
          ) })
        ] }, entry.id)) })
      ] })
    ] }),
    activeTab === "transfers" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-5 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-[#1a2332] mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 16, className: "text-[#4F8EF7]" }),
          " Devir & Transfer Talebi"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Mevcut Spot" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "w-full border rounded-lg px-3 py-2 text-sm", children: spots.filter((s) => s.status === "assigned").map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { children: [
              s.id,
              " - ",
              s.assignedTo
            ] }, s.id)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Hedef Spot (Boş)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "w-full border rounded-lg px-3 py-2 text-sm", children: spots.filter((s) => s.status === "free").map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { children: [
              s.id,
              " - ",
              s.type,
              " / ",
              s.floor
            ] }, s.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Transfer Nedeni" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              className: "w-full border rounded-lg px-3 py-2 text-sm",
              rows: 2,
              placeholder: "Transfer talebinin gerekçesi..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "mt-3 bg-[#4F8EF7] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#3a7de8]",
            children: "Transfer Talebi Gönder"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#1a2332]", children: "Geçmiş Transferler" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y", children: [
          {
            from: "P-03",
            to: "P-06",
            apartment: "Daire 7",
            date: "2026-02-15",
            status: "approved"
          },
          {
            from: "P-08",
            to: "P-01",
            apartment: "Daire 2",
            date: "2026-01-20",
            status: "rejected"
          }
        ].map((tr) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-4 py-3 flex items-center justify-between",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: tr.apartment }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-400 text-xs ml-2", children: [
                  tr.from,
                  " → ",
                  tr.to
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: tr.date }),
                tr.status === "approved" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-green-600 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 12 }),
                  "Onaylandı"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-red-500 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 12 }),
                  "Reddedildi"
                ] })
              ] })
            ]
          },
          tr.from + tr.to
        )) })
      ] })
    ] }),
    showAssignModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-[#1a2332] mb-4", children: [
        showAssignModal,
        " - Tahsis Et"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Daire" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "w-full border rounded-lg px-3 py-2 text-sm", children: [
            "Daire 2",
            "Daire 4",
            "Daire 6",
            "Daire 10",
            "Daire 11"
          ].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: d }, d)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Tahsis Tarihi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              className: "w-full border rounded-lg px-3 py-2 text-sm"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowAssignModal(null),
            className: "flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600",
            children: "İptal"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowAssignModal(null),
            className: "flex-1 bg-[#4F8EF7] text-white rounded-lg py-2 text-sm font-medium",
            children: "Tahsis Et"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  ParkingAllocation as default
};
