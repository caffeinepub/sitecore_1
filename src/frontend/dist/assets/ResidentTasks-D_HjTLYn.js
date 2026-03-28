import { r as reactExports, j as jsxRuntimeExports, P as Plus, U as Users, az as SquareCheckBig, at as Award } from "./index-DOWBo6uK.js";
import { F as Funnel } from "./funnel-DvPU3PIG.js";
import { S as Star } from "./star-CGMJnKZa.js";
import { C as Clock } from "./clock-CTiRGnN-.js";
const MOCK_TASKS = [
  {
    id: 1,
    title: "Giriş Katı Temizlik Nöbeti",
    description: "Her Pazartesi sabah giriş katı ve merdiven temizliği",
    category: "Nöbet",
    date: "2026-04-07",
    slots: 2,
    volunteers: ["Daire 3", "Daire 7"],
    status: "open",
    points: 10
  },
  {
    id: 2,
    title: "Bahçe Sulama Görevi",
    description: "Hafta içi bahçe ve çiçek sulaması",
    category: "Bahçe",
    date: "2026-04-08",
    slots: 1,
    volunteers: ["Daire 12"],
    status: "full",
    points: 8
  },
  {
    id: 3,
    title: "Bahar Şenliği Organizasyonu",
    description: "Nisan ayı bahar etkinliği planlama ve hazırlık",
    category: "Etkinlik",
    date: "2026-04-15",
    slots: 5,
    volunteers: ["Daire 1", "Daire 5"],
    status: "open",
    points: 20
  },
  {
    id: 4,
    title: "Güvenlik Nöbeti - Hafta Sonu",
    description: "Hafta sonu giriş kapısı güvenlik nöbeti",
    category: "Nöbet",
    date: "2026-04-12",
    slots: 3,
    volunteers: ["Daire 8", "Daire 14", "Daire 2"],
    status: "full",
    points: 15
  },
  {
    id: 5,
    title: "Çocuk Oyun Alanı Bakımı",
    description: "Oyun alanı ekipman kontrolü ve temizliği",
    category: "Bakım",
    date: "2026-04-10",
    slots: 2,
    volunteers: [],
    status: "open",
    points: 12
  },
  {
    id: 6,
    title: "Bülten Panosu Güncelleme",
    description: "Giriş holündeki bülten panosunu güncel tutmak",
    category: "Yönetim",
    date: "2026-04-09",
    slots: 1,
    volunteers: [],
    status: "open",
    points: 5
  }
];
const MOCK_LEADERBOARD = [
  { rank: 1, apartment: "Daire 5", resident: "Ali Kaya", points: 85, tasks: 7 },
  {
    rank: 2,
    apartment: "Daire 12",
    resident: "Ayşe Demir",
    points: 72,
    tasks: 6
  },
  {
    rank: 3,
    apartment: "Daire 3",
    resident: "Mehmet Yıldız",
    points: 60,
    tasks: 5
  },
  {
    rank: 4,
    apartment: "Daire 8",
    resident: "Fatma Şahin",
    points: 45,
    tasks: 4
  },
  {
    rank: 5,
    apartment: "Daire 1",
    resident: "Hasan Öztürk",
    points: 38,
    tasks: 3
  }
];
const categoryColors = {
  Nöbet: "bg-blue-100 text-blue-800",
  Bahçe: "bg-green-100 text-green-800",
  Etkinlik: "bg-purple-100 text-purple-800",
  Bakım: "bg-orange-100 text-orange-800",
  Yönetim: "bg-gray-100 text-gray-800"
};
function ResidentTasks({
  buildingId: _buildingId,
  isOwner,
  t: _t
}) {
  const [activeTab, setActiveTab] = reactExports.useState("tasks");
  const [filterCategory, setFilterCategory] = reactExports.useState("all");
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [joinedTasks, setJoinedTasks] = reactExports.useState([]);
  const [newTask, setNewTask] = reactExports.useState({
    title: "",
    description: "",
    category: "Nöbet",
    date: "",
    slots: 2,
    points: 10
  });
  const categories = ["all", "Nöbet", "Bahçe", "Etkinlik", "Bakım", "Yönetim"];
  const filtered = MOCK_TASKS.filter((task) => {
    if (filterCategory !== "all" && task.category !== filterCategory)
      return false;
    if (filterStatus !== "all" && task.status !== filterStatus) return false;
    return true;
  });
  const myTasks = MOCK_TASKS.filter((t) => joinedTasks.includes(t.id));
  const totalPoints = myTasks.reduce((sum, t) => sum + t.points, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-[#1a2332]", children: "Sakin Görev & Gönüllü Çalışma" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Bina görevlerine gönüllü katılın, puan kazanın" })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setShowAddModal(true),
          className: "flex items-center gap-2 bg-[#4F8EF7] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3a7de8]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
            " Görev Ekle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[#4F8EF7]", children: MOCK_TASKS.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Aktif Görev" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-green-600", children: MOCK_TASKS.filter((t) => t.status === "open").length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Katılım Açık" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-purple-600", children: joinedTasks.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Görevlerim" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-orange-500", children: totalPoints }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Puanım" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-gray-100 rounded-lg p-1 w-fit", children: ["tasks", "myTasks", "leaderboard"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(tab),
        className: `px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === tab ? "bg-white text-[#4F8EF7] shadow-sm" : "text-gray-600 hover:text-gray-900"}`,
        children: tab === "tasks" ? "Tüm Görevler" : tab === "myTasks" ? "Görevlerim" : "Sıralama"
      },
      tab
    )) }),
    activeTab === "tasks" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { size: 16, className: "text-gray-400" }),
        categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setFilterCategory(cat),
            className: `px-3 py-1 rounded-full text-xs font-medium transition-all ${filterCategory === cat ? "bg-[#4F8EF7] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
            children: cat === "all" ? "Tümü" : cat
          },
          cat
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-2 flex gap-2", children: ["all", "open", "full"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setFilterStatus(s),
            className: `px-3 py-1 rounded-full text-xs font-medium transition-all ${filterStatus === s ? "bg-[#1a2332] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
            children: s === "all" ? "Tüm Durum" : s === "open" ? "Açık" : "Dolu"
          },
          s
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-4", children: filtered.map((task) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-white rounded-xl p-5 border border-gray-100 shadow-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[task.category] || "bg-gray-100 text-gray-800"}`,
                    children: task.category
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#1a2332] mt-1", children: task.title })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    size: 12,
                    className: "text-yellow-500 fill-yellow-500"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-yellow-700", children: task.points })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mb-3", children: task.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-gray-400 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 }),
                " ",
                task.date
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 12 }),
                " ",
                task.volunteers.length,
                "/",
                task.slots,
                " ",
                "katılımcı"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-100 rounded-full h-1.5 mr-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "bg-[#4F8EF7] h-1.5 rounded-full",
                  style: {
                    width: `${task.volunteers.length / task.slots * 100}%`
                  }
                }
              ) }),
              task.status === "open" && !joinedTasks.includes(task.id) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setJoinedTasks((p) => [...p, task.id]),
                  className: "shrink-0 text-xs bg-[#4F8EF7] text-white px-3 py-1.5 rounded-lg hover:bg-[#3a7de8] font-medium",
                  children: "Katıl"
                }
              ) : joinedTasks.includes(task.id) ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-medium", children: "Katıldın ✓" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-xs bg-gray-100 text-gray-500 px-3 py-1.5 rounded-lg", children: "Dolu" })
            ] })
          ]
        },
        task.id
      )) })
    ] }),
    activeTab === "myTasks" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: myTasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-12 text-center border border-gray-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "mx-auto mb-3 text-gray-300", size: 48 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Henüz bir göreve katılmadınız." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 mt-1", children: '"Tüm Görevler" sekmesinden katılabilirsiniz.' })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-4", children: myTasks.map((task) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-white rounded-xl p-5 border-2 border-green-200 shadow-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[task.category] || ""}`,
                children: task.category
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium", children: "Katıldın ✓" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#1a2332] mt-1", children: task.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-1", children: task.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 }),
              task.date
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-yellow-600 font-bold text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14, className: "fill-yellow-500" }),
              task.points,
              " puan"
            ] })
          ] })
        ]
      },
      task.id
    )) }) }),
    activeTab === "leaderboard" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b bg-gradient-to-r from-yellow-50 to-orange-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-[#1a2332] flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { size: 18, className: "text-yellow-500" }),
        " Aylık Puan Sıralaması"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 text-xs text-gray-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Sıra" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Daire" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Sakin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "Görev" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "Puan" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y", children: MOCK_LEADERBOARD.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${entry.rank === 1 ? "bg-yellow-100 text-yellow-700" : entry.rank === 2 ? "bg-gray-100 text-gray-600" : entry.rank === 3 ? "bg-orange-100 text-orange-600" : "text-gray-500"}`,
              children: entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : entry.rank
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-[#1a2332]", children: entry.apartment }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-600", children: entry.resident }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-gray-600", children: entry.tasks }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-bold text-[#4F8EF7]", children: entry.points })
        ] }, entry.rank)) })
      ] })
    ] }),
    showAddModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6 w-full max-w-md shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-[#1a2332] mb-4", children: "Yeni Görev Ekle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "w-full border rounded-lg px-3 py-2 text-sm",
            placeholder: "Görev başlığı",
            value: newTask.title,
            onChange: (e) => setNewTask((p) => ({ ...p, title: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            className: "w-full border rounded-lg px-3 py-2 text-sm",
            rows: 2,
            placeholder: "Açıklama",
            value: newTask.description,
            onChange: (e) => setNewTask((p) => ({ ...p, description: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              className: "border rounded-lg px-3 py-2 text-sm",
              value: newTask.category,
              onChange: (e) => setNewTask((p) => ({ ...p, category: e.target.value })),
              children: ["Nöbet", "Bahçe", "Etkinlik", "Bakım", "Yönetim"].map(
                (c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c)
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              className: "border rounded-lg px-3 py-2 text-sm",
              value: newTask.date,
              onChange: (e) => setNewTask((p) => ({ ...p, date: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Kapasite" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                min: 1,
                max: 20,
                className: "w-full border rounded-lg px-3 py-2 text-sm",
                value: newTask.slots,
                onChange: (e) => setNewTask((p) => ({
                  ...p,
                  slots: Number(e.target.value)
                }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Puan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                min: 1,
                max: 100,
                className: "w-full border rounded-lg px-3 py-2 text-sm",
                value: newTask.points,
                onChange: (e) => setNewTask((p) => ({
                  ...p,
                  points: Number(e.target.value)
                }))
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowAddModal(false),
            className: "flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50",
            children: "İptal"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowAddModal(false),
            className: "flex-1 bg-[#4F8EF7] text-white rounded-lg py-2 text-sm font-medium hover:bg-[#3a7de8]",
            children: "Kaydet"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  ResidentTasks as default
};
