import { r as reactExports, j as jsxRuntimeExports, B as Button, I as Input, e as Badge } from "./index-CC-G2BYq.js";
const TYPE_LABELS = {
  birthday: "🎂 Doğum Günü",
  anniversary: "💍 Yıl Dönümü",
  movein: "🏠 Taşınma Yıldönümü",
  graduation: "🎓 Mezuniyet",
  other: "🎉 Özel Gün"
};
const TYPE_COLORS = {
  birthday: "bg-pink-100 text-pink-800",
  anniversary: "bg-purple-100 text-purple-800",
  movein: "bg-blue-100 text-blue-800",
  graduation: "bg-green-100 text-green-800",
  other: "bg-yellow-100 text-yellow-800"
};
const MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık"
];
const SAMPLE_DAYS = [
  {
    id: "1",
    residentName: "Ahmet Yılmaz",
    apartment: "D:3",
    type: "birthday",
    date: "03-15",
    notifyDaysBefore: 3,
    isPublic: true,
    note: "Küçük bir sürpriz organize edilebilir!"
  },
  {
    id: "2",
    residentName: "Fatma Kaya",
    apartment: "D:7",
    type: "birthday",
    date: "03-28",
    notifyDaysBefore: 1,
    isPublic: true
  },
  {
    id: "3",
    residentName: "Mehmet & Ayşe Demir",
    apartment: "D:12",
    type: "anniversary",
    date: "04-02",
    year: 2010,
    notifyDaysBefore: 3,
    isPublic: true,
    note: "15. yıl dönümleri"
  },
  {
    id: "4",
    residentName: "Zeynep Arslan",
    apartment: "D:5",
    type: "graduation",
    date: "06-20",
    year: 2025,
    notifyDaysBefore: 1,
    isPublic: true,
    note: "Doktora tezi savunması"
  },
  {
    id: "5",
    residentName: "Can Öztürk",
    apartment: "D:1",
    type: "movein",
    date: "09-01",
    year: 2020,
    notifyDaysBefore: 1,
    isPublic: false,
    note: "Binaya taşınalı 5 yıl oluyor"
  },
  {
    id: "6",
    residentName: "Elif & Burak Şahin",
    apartment: "D:9",
    type: "birthday",
    date: "04-10",
    notifyDaysBefore: 3,
    isPublic: true,
    note: "Çocukları Bora'nın doğum günü"
  },
  {
    id: "7",
    residentName: "Hasan Çelik",
    apartment: "D:11",
    type: "other",
    date: "05-05",
    notifyDaysBefore: 1,
    isPublic: true,
    note: "İş yıldönümü - 20. yıl"
  },
  {
    id: "8",
    residentName: "Selin Yıldız",
    apartment: "D:4",
    type: "birthday",
    date: "07-19",
    notifyDaysBefore: 3,
    isPublic: true
  },
  {
    id: "9",
    residentName: "Orhan & Nuray Aydın",
    apartment: "D:6",
    type: "anniversary",
    date: "08-14",
    year: 2005,
    notifyDaysBefore: 7,
    isPublic: true,
    note: "Gümüş düğün (25 yıl)"
  },
  {
    id: "10",
    residentName: "Gülay Erdoğan",
    apartment: "D:8",
    type: "birthday",
    date: "11-03",
    notifyDaysBefore: 3,
    isPublic: true
  }
];
function getMonthFromDate(date) {
  return Number.parseInt(date.split("-")[0], 10);
}
function getDayFromDate(date) {
  return Number.parseInt(date.split("-")[1], 10);
}
function getDaysUntil(dateStr) {
  const now = /* @__PURE__ */ new Date();
  const [month, day] = dateStr.split("-").map(Number);
  let next = new Date(now.getFullYear(), month - 1, day);
  if (next < now) next = new Date(now.getFullYear() + 1, month - 1, day);
  return Math.ceil((next.getTime() - now.getTime()) / (1e3 * 60 * 60 * 24));
}
function SpecialDaysCelebrations({
  buildingId: _buildingId,
  t: _t
}) {
  const [days, setDays] = reactExports.useState(SAMPLE_DAYS);
  const [activeTab, setActiveTab] = reactExports.useState(
    "upcoming"
  );
  const [filterType, setFilterType] = reactExports.useState("all");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [selectedMonth, setSelectedMonth] = reactExports.useState((/* @__PURE__ */ new Date()).getMonth() + 1);
  const [newDay, setNewDay] = reactExports.useState({
    type: "birthday",
    notifyDaysBefore: 3,
    isPublic: true
  });
  const upcomingDays = [...days].filter((d) => d.isPublic || true).map((d) => ({ ...d, daysUntil: getDaysUntil(d.date) })).sort((a, b) => a.daysUntil - b.daysUntil);
  const filtered = upcomingDays.filter((d) => {
    if (filterType !== "all" && d.type !== filterType) return false;
    if (searchQuery && !d.residentName.toLowerCase().includes(searchQuery.toLowerCase()) && !d.apartment.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;
    return true;
  });
  const thisMonthDays = days.filter((d) => getMonthFromDate(d.date) === selectedMonth).sort((a, b) => getDayFromDate(a.date) - getDayFromDate(b.date));
  const today = days.filter((d) => getDaysUntil(d.date) === 0);
  const thisWeek = upcomingDays.filter(
    (d) => d.daysUntil > 0 && d.daysUntil <= 7
  );
  function addDay() {
    if (!newDay.residentName || !newDay.apartment || !newDay.date) return;
    const entry = {
      id: Date.now().toString(),
      residentName: newDay.residentName,
      apartment: newDay.apartment,
      type: newDay.type,
      date: newDay.date,
      year: newDay.year,
      note: newDay.note,
      notifyDaysBefore: newDay.notifyDaysBefore || 3,
      isPublic: newDay.isPublic ?? true
    };
    setDays((prev) => [...prev, entry]);
    setShowAddModal(false);
    setNewDay({ type: "birthday", notifyDaysBefore: 3, isPublic: true });
    setActiveTab("upcoming");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "🎉 Sakin Özel Gün & Kutlama" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Doğum günleri, yıl dönümleri ve özel anlar" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => setShowAddModal(true),
          className: "bg-pink-600 hover:bg-pink-700 text-white",
          children: "+ Özel Gün Ekle"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-pink-50 border border-pink-200 rounded-xl p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-pink-700", children: today.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-pink-600 mt-1", children: "Bugün Kutlanan" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-orange-50 border border-orange-200 rounded-xl p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-orange-700", children: thisWeek.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-orange-600 mt-1", children: "Bu Hafta" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-purple-50 border border-purple-200 rounded-xl p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-purple-700", children: days.filter((d) => d.type === "birthday").length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-purple-600 mt-1", children: "Doğum Günü Kayıtlı" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-xl p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-blue-700", children: days.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-blue-600 mt-1", children: "Toplam Kayıt" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 border-b pb-2", children: ["upcoming", "calendar", "add"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(tab),
        className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? "bg-pink-600 text-white" : "text-gray-600 hover:bg-gray-100"}`,
        children: tab === "upcoming" ? "📋 Yaklaşan Günler" : tab === "calendar" ? "📅 Aylık Takvim" : "➕ Yeni Ekle"
      },
      tab
    )) }),
    activeTab === "upcoming" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Sakin veya daire ara...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "flex-1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: filterType,
            onChange: (e) => setFilterType(e.target.value),
            className: "border rounded-lg px-3 py-2 text-sm bg-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Tüm Türler" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "birthday", children: "🎂 Doğum Günü" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "anniversary", children: "💍 Yıl Dönümü" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "movein", children: "🏠 Taşınma Yıldönümü" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "graduation", children: "🎓 Mezuniyet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "other", children: "🎉 Diğer" })
            ]
          }
        )
      ] }),
      today.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-4 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-lg mb-2", children: "🎊 Bugün Kutlama Var!" }),
        today.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/20 rounded-lg p-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: d.residentName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2 text-white/70", children: "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: TYPE_LABELS[d.type] }),
          d.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/80 mt-1", children: d.note })
        ] }, d.id))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-gray-400", children: "Kayıt bulunamadı." }) : filtered.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-white rounded-xl border p-4 flex items-start justify-between gap-4 hover:shadow-sm transition-shadow",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-900", children: d.residentName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500", children: d.apartment }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: TYPE_COLORS[d.type], children: TYPE_LABELS[d.type] }),
                !d.isPublic && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gray-100 text-gray-600", children: "🔒 Gizli" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gray-600 mt-1", children: [
                MONTHS[getMonthFromDate(d.date) - 1],
                " ",
                getDayFromDate(d.date),
                d.year && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-400", children: [
                  " ",
                  "(",
                  (/* @__PURE__ */ new Date()).getFullYear() - d.year,
                  ". yıl)"
                ] })
              ] }),
              d.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-1 italic", children: d.note })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center shrink-0", children: d.daysUntil === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-pink-100 text-pink-700 font-bold text-sm px-3 py-1 rounded-full", children: "Bugün!" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `text-2xl font-bold ${d.daysUntil <= 3 ? "text-red-600" : d.daysUntil <= 7 ? "text-orange-500" : "text-gray-500"}`,
                  children: d.daysUntil
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: "gün kaldı" })
            ] }) })
          ]
        },
        d.id
      )) })
    ] }),
    activeTab === "calendar" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: selectedMonth,
            onChange: (e) => setSelectedMonth(Number(e.target.value)),
            className: "border rounded-lg px-3 py-2 text-sm bg-white font-medium",
            children: MONTHS.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: i + 1, children: m }, m))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-500", children: [
          thisMonthDays.length,
          " etkinlik"
        ] })
      ] }),
      thisMonthDays.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-gray-400", children: "Bu ayda kayıtlı özel gün yok." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: thisMonthDays.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-white rounded-xl border p-4 flex items-center gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `w-14 h-14 rounded-xl flex flex-col items-center justify-center font-bold shrink-0 ${d.type === "birthday" ? "bg-pink-100 text-pink-700" : d.type === "anniversary" ? "bg-purple-100 text-purple-700" : d.type === "movein" ? "bg-blue-100 text-blue-700" : d.type === "graduation" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl", children: getDayFromDate(d.date) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs", children: MONTHS[selectedMonth - 1].slice(0, 3) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-900", children: d.residentName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500", children: d.apartment })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: TYPE_COLORS[d.type], children: TYPE_LABELS[d.type] }),
                d.year && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
                  (/* @__PURE__ */ new Date()).getFullYear() - d.year,
                  ". yıl"
                ] })
              ] }),
              d.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-1", children: d.note })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-orange-500 shrink-0", children: getDaysUntil(d.date) === 0 ? "🎊 Bugün" : `${getDaysUntil(d.date)} gün` })
          ]
        },
        d.id
      )) })
    ] }),
    activeTab === "add" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-6 max-w-lg space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900", children: "Yeni Özel Gün Ekle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "add-name",
            className: "text-sm font-medium text-gray-700",
            children: "Sakin Adı *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "add-name",
            placeholder: "Örn: Ahmet Yılmaz",
            value: newDay.residentName || "",
            onChange: (e) => setNewDay((p) => ({ ...p, residentName: e.target.value })),
            className: "mt-1"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "add-apt",
            className: "text-sm font-medium text-gray-700",
            children: "Daire *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "add-apt",
            placeholder: "Örn: D:5",
            value: newDay.apartment || "",
            onChange: (e) => setNewDay((p) => ({ ...p, apartment: e.target.value })),
            className: "mt-1"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "add-type",
            className: "text-sm font-medium text-gray-700",
            children: "Tür *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            id: "add-type",
            value: newDay.type,
            onChange: (e) => setNewDay((p) => ({
              ...p,
              type: e.target.value
            })),
            className: "mt-1 block w-full border rounded-lg px-3 py-2 text-sm bg-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "birthday", children: "🎂 Doğum Günü" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "anniversary", children: "💍 Yıl Dönümü" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "movein", children: "🏠 Taşınma Yıldönümü" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "graduation", children: "🎓 Mezuniyet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "other", children: "🎉 Diğer Özel Gün" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "add-date",
              className: "text-sm font-medium text-gray-700",
              children: "Tarih (AA-GG) *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "add-date",
              placeholder: "Örn: 03-15",
              value: newDay.date || "",
              onChange: (e) => setNewDay((p) => ({ ...p, date: e.target.value })),
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "add-year",
              className: "text-sm font-medium text-gray-700",
              children: "Yıl (opsiyonel)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "add-year",
              type: "number",
              placeholder: "Örn: 2010",
              value: newDay.year || "",
              onChange: (e) => setNewDay((p) => ({ ...p, year: Number(e.target.value) })),
              className: "mt-1"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "add-note",
            className: "text-sm font-medium text-gray-700",
            children: "Not (opsiyonel)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "add-note",
            placeholder: "Örn: Sürpriz organize edilebilir",
            value: newDay.note || "",
            onChange: (e) => setNewDay((p) => ({ ...p, note: e.target.value })),
            className: "mt-1"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "add-public",
            className: "text-sm font-medium text-gray-700",
            children: "Herkese Görünür:"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "add-public",
            type: "checkbox",
            checked: newDay.isPublic ?? true,
            onChange: (e) => setNewDay((p) => ({ ...p, isPublic: e.target.checked })),
            className: "w-4 h-4"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: addDay,
            className: "bg-pink-600 hover:bg-pink-700 text-white flex-1",
            children: "Kaydet"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setActiveTab("upcoming"),
            className: "flex-1",
            children: "İptal"
          }
        )
      ] })
    ] }),
    showAddModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6 w-full max-w-md space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900 text-lg", children: "Yeni Özel Gün Ekle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "m-name",
            className: "text-sm font-medium text-gray-700",
            children: "Sakin Adı *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "m-name",
            placeholder: "Örn: Ahmet Yılmaz",
            value: newDay.residentName || "",
            onChange: (e) => setNewDay((p) => ({ ...p, residentName: e.target.value })),
            className: "mt-1"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "m-apt",
              className: "text-sm font-medium text-gray-700",
              children: "Daire *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "m-apt",
              placeholder: "Örn: D:5",
              value: newDay.apartment || "",
              onChange: (e) => setNewDay((p) => ({ ...p, apartment: e.target.value })),
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "m-date",
              className: "text-sm font-medium text-gray-700",
              children: "Tarih (AA-GG) *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "m-date",
              placeholder: "03-15",
              value: newDay.date || "",
              onChange: (e) => setNewDay((p) => ({ ...p, date: e.target.value })),
              className: "mt-1"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "m-type",
            className: "text-sm font-medium text-gray-700",
            children: "Tür"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            id: "m-type",
            value: newDay.type,
            onChange: (e) => setNewDay((p) => ({
              ...p,
              type: e.target.value
            })),
            className: "mt-1 block w-full border rounded-lg px-3 py-2 text-sm bg-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "birthday", children: "🎂 Doğum Günü" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "anniversary", children: "💍 Yıl Dönümü" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "movein", children: "🏠 Taşınma Yıldönümü" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "graduation", children: "🎓 Mezuniyet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "other", children: "🎉 Diğer" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: addDay,
            className: "bg-pink-600 hover:bg-pink-700 text-white flex-1",
            children: "Ekle"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setShowAddModal(false),
            className: "flex-1",
            children: "İptal"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  SpecialDaysCelebrations as default
};
