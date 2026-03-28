import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, m as Calendar, F as FileText, k as TrendingUp, t as User, e as Badge, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-CC-G2BYq.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-klDLrOsd.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-4Y-aM0V_.js";
import { C as Clock } from "./clock-DpT6s-PI.js";
import { C as CircleCheckBig } from "./circle-check-big-BNsB4jU7.js";
import { C as CircleX } from "./circle-x-CGL-aMSd.js";
import "./index-DALdMlsI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode);
const leaveTypes = [
  "Yıllık İzin",
  "Hastalık İzni",
  "Ücretsiz İzin",
  "Mazeret İzni",
  "Doğum İzni",
  "Ölüm İzni"
];
const staffList = [
  { name: "Ahmet Kaya", role: "Kapıcı" },
  { name: "Fatma Demir", role: "Temizlik Görevlisi" },
  { name: "Mehmet Yılmaz", role: "Güvenlik" },
  { name: "Ayşe Çelik", role: "Bahçıvan" },
  { name: "Hasan Arslan", role: "Teknik Görevli" }
];
const initialLeaves = [
  {
    id: 1,
    staff: "Ahmet Kaya",
    role: "Kapıcı",
    type: "Yıllık İzin",
    startDate: "2026-04-01",
    endDate: "2026-04-07",
    days: 7,
    reason: "Ailevi ziyaret",
    status: "onaylandi",
    approvedBy: "Yönetici"
  },
  {
    id: 2,
    staff: "Fatma Demir",
    role: "Temizlik Görevlisi",
    type: "Hastalık İzni",
    startDate: "2026-03-20",
    endDate: "2026-03-22",
    days: 3,
    reason: "Grip tedavisi",
    status: "onaylandi",
    approvedBy: "Yönetici"
  },
  {
    id: 3,
    staff: "Mehmet Yılmaz",
    role: "Güvenlik",
    type: "Mazeret İzni",
    startDate: "2026-04-10",
    endDate: "2026-04-10",
    days: 1,
    reason: "Resmi işlem",
    status: "bekliyor"
  },
  {
    id: 4,
    staff: "Ayşe Çelik",
    role: "Bahçıvan",
    type: "Yıllık İzin",
    startDate: "2026-05-15",
    endDate: "2026-05-22",
    days: 8,
    reason: "Tatil",
    status: "bekliyor"
  },
  {
    id: 5,
    staff: "Hasan Arslan",
    role: "Teknik Görevli",
    type: "Ücretsiz İzin",
    startDate: "2026-03-01",
    endDate: "2026-03-05",
    days: 5,
    reason: "Kişisel nedenler",
    status: "reddedildi"
  }
];
const initialOvertimes = [
  {
    id: 1,
    staff: "Mehmet Yılmaz",
    role: "Güvenlik",
    date: "2026-03-15",
    hours: 4,
    reason: "Bina denetimi",
    status: "onaylandi"
  },
  {
    id: 2,
    staff: "Hasan Arslan",
    role: "Teknik Görevli",
    date: "2026-03-20",
    hours: 3,
    reason: "Asansör arızası acil onarım",
    status: "odendi"
  },
  {
    id: 3,
    staff: "Ahmet Kaya",
    role: "Kapıcı",
    date: "2026-03-22",
    hours: 2,
    reason: "Teslimat beklemek",
    status: "bekliyor"
  },
  {
    id: 4,
    staff: "Fatma Demir",
    role: "Temizlik Görevlisi",
    date: "2026-03-25",
    hours: 5,
    reason: "Genel temizlik sonrası ek çalışma",
    status: "onaylandi"
  }
];
function StaffLeaveManagement({ isOwner }) {
  const [activeTab, setActiveTab] = reactExports.useState("izinler");
  const [leaves, setLeaves] = reactExports.useState(initialLeaves);
  const [overtimes, setOvertimes] = reactExports.useState(initialOvertimes);
  const [showLeaveModal, setShowLeaveModal] = reactExports.useState(false);
  const [showOvertimeModal, setShowOvertimeModal] = reactExports.useState(false);
  const [filterStaff, setFilterStaff] = reactExports.useState("all");
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const [newLeave, setNewLeave] = reactExports.useState({
    staff: "",
    type: "",
    startDate: "",
    endDate: "",
    reason: ""
  });
  const [newOvertime, setNewOvertime] = reactExports.useState({
    staff: "",
    date: "",
    hours: "",
    reason: ""
  });
  const statusColor = {
    onaylandi: "bg-green-100 text-green-700",
    bekliyor: "bg-yellow-100 text-yellow-700",
    reddedildi: "bg-red-100 text-red-700",
    odendi: "bg-blue-100 text-blue-700"
  };
  const statusLabel = {
    onaylandi: "Onaylandı",
    bekliyor: "Bekliyor",
    reddedildi: "Reddedildi",
    odendi: "Ödendi"
  };
  const filteredLeaves = leaves.filter((l) => {
    const matchStaff = filterStaff === "all" || l.staff === filterStaff;
    const matchStatus = filterStatus === "all" || l.status === filterStatus;
    return matchStaff && matchStatus;
  });
  const handleApproveLeave = (id) => {
    setLeaves(
      (prev) => prev.map(
        (l) => l.id === id ? { ...l, status: "onaylandi", approvedBy: "Yönetici" } : l
      )
    );
  };
  const handleRejectLeave = (id) => {
    setLeaves(
      (prev) => prev.map((l) => l.id === id ? { ...l, status: "reddedildi" } : l)
    );
  };
  const handleApproveOvertime = (id) => {
    setOvertimes(
      (prev) => prev.map((o) => o.id === id ? { ...o, status: "onaylandi" } : o)
    );
  };
  const handleAddLeave = () => {
    if (!newLeave.staff || !newLeave.type || !newLeave.startDate || !newLeave.endDate)
      return;
    const start = new Date(newLeave.startDate);
    const end = new Date(newLeave.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)) + 1;
    const staffInfo = staffList.find((s) => s.name === newLeave.staff);
    setLeaves((prev) => [
      ...prev,
      {
        id: Date.now(),
        staff: newLeave.staff,
        role: (staffInfo == null ? void 0 : staffInfo.role) ?? "-",
        type: newLeave.type,
        startDate: newLeave.startDate,
        endDate: newLeave.endDate,
        days,
        reason: newLeave.reason,
        status: "bekliyor"
      }
    ]);
    setNewLeave({
      staff: "",
      type: "",
      startDate: "",
      endDate: "",
      reason: ""
    });
    setShowLeaveModal(false);
  };
  const handleAddOvertime = () => {
    if (!newOvertime.staff || !newOvertime.date || !newOvertime.hours) return;
    const staffInfo = staffList.find((s) => s.name === newOvertime.staff);
    setOvertimes((prev) => [
      ...prev,
      {
        id: Date.now(),
        staff: newOvertime.staff,
        role: (staffInfo == null ? void 0 : staffInfo.role) ?? "-",
        date: newOvertime.date,
        hours: Number(newOvertime.hours),
        reason: newOvertime.reason,
        status: "bekliyor"
      }
    ]);
    setNewOvertime({ staff: "", date: "", hours: "", reason: "" });
    setShowOvertimeModal(false);
  };
  const totalLeavedays = leaves.filter((l) => l.status === "onaylandi").reduce((sum, l) => sum + l.days, 0);
  const totalOvertimeHours = overtimes.filter((o) => o.status !== "reddedildi").reduce((sum, o) => sum + o.hours, 0);
  const pendingLeaves = leaves.filter((l) => l.status === "bekliyor").length;
  const pendingOvertimes = overtimes.filter(
    (o) => o.status === "bekliyor"
  ).length;
  const currentMonth = "Nisan 2026";
  const calendarEvents = [
    {
      day: 1,
      staff: "Ahmet Kaya",
      type: "Yıllık İzin",
      color: "bg-blue-200 text-blue-800"
    },
    {
      day: 2,
      staff: "Ahmet Kaya",
      type: "Yıllık İzin",
      color: "bg-blue-200 text-blue-800"
    },
    {
      day: 3,
      staff: "Ahmet Kaya",
      type: "Yıllık İzin",
      color: "bg-blue-200 text-blue-800"
    },
    {
      day: 10,
      staff: "Mehmet Yılmaz",
      type: "Mazeret İzni",
      color: "bg-orange-200 text-orange-800"
    },
    {
      day: 15,
      staff: "Ayşe Çelik",
      type: "Yıllık İzin",
      color: "bg-green-200 text-green-800"
    }
  ];
  const staffSummary = staffList.map((s) => {
    const staffLeaves = leaves.filter(
      (l) => l.staff === s.name && l.status === "onaylandi"
    );
    const staffOvertimes = overtimes.filter(
      (o) => o.staff === s.name && o.status !== "reddedildi"
    );
    return {
      ...s,
      totalLeaveDays: staffLeaves.reduce((sum, l) => sum + l.days, 0),
      totalOvertimeHours: staffOvertimes.reduce((sum, o) => sum + o.hours, 0),
      pendingLeaves: leaves.filter(
        (l) => l.staff === s.name && l.status === "bekliyor"
      ).length
    };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-[#1A2433]", children: "Personel İzin & Mesai Takibi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D] mt-1", children: "İzin talepleri ve fazla mesai yönetimi" })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowLeaveModal(true),
            className: "bg-[#3B5BDB] hover:bg-[#2F4CC0] text-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
              " İzin Ekle"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowOvertimeModal(true),
            variant: "outline",
            className: "border-[#3B5BDB] text-[#3B5BDB]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 mr-2" }),
              " Mesai Ekle"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-l-4 border-blue-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-8 h-8 text-blue-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[#1A2433]", children: totalLeavedays }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#6B7A8D]", children: "Onaylı İzin Günü" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-l-4 border-purple-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-8 h-8 text-purple-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[#1A2433]", children: totalOvertimeHours }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#6B7A8D]", children: "Toplam Mesai Saati" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-l-4 border-yellow-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-8 h-8 text-yellow-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[#1A2433]", children: pendingLeaves }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#6B7A8D]", children: "Bekleyen İzin" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-l-4 border-green-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8 text-green-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[#1A2433]", children: pendingOvertimes }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#6B7A8D]", children: "Bekleyen Mesai" })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 border-b border-gray-200", children: ["izinler", "mesai", "takvim", "ozet"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(tab),
        className: `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? "border-[#3B5BDB] text-[#3B5BDB]" : "border-transparent text-[#6B7A8D] hover:text-[#1A2433]"}`,
        children: tab === "izinler" ? "İzin Talepleri" : tab === "mesai" ? "Fazla Mesai" : tab === "takvim" ? "İzin Takvimi" : "Personel Özeti"
      },
      tab
    )) }),
    activeTab === "izinler" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterStaff, onValueChange: setFilterStaff, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full md:w-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Personel filtrele" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Tüm Personel" }),
            staffList.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.name, children: s.name }, s.name))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterStatus, onValueChange: setFilterStatus, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full md:w-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Durum filtrele" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Tüm Durumlar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "bekliyor", children: "Bekliyor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "onaylandi", children: "Onaylandı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "reddedildi", children: "Reddedildi" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filteredLeaves.map((leave) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-start md:justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[#3B5BDB]/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-[#3B5BDB]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-[#1A2433]", children: leave.staff }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#6B7A8D]", children: leave.role }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-[#3B5BDB]", children: leave.type }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: "•" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#6B7A8D]", children: [
                leave.days,
                " gün"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-[#6B7A8D] mt-1", children: [
              leave.startDate,
              " – ",
              leave.endDate
            ] }),
            leave.reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-[#6B7A8D] mt-1", children: [
              "Neden: ",
              leave.reason
            ] }),
            leave.approvedBy && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-green-600 mt-1", children: [
              "Onaylayan: ",
              leave.approvedBy
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: statusColor[leave.status], children: statusLabel[leave.status] }),
          isOwner && leave.status === "bekliyor" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                onClick: () => handleApproveLeave(leave.id),
                className: "bg-green-600 hover:bg-green-700 text-white h-7 px-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
                  " Onayla"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => handleRejectLeave(leave.id),
                className: "border-red-400 text-red-600 hover:bg-red-50 h-7 px-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3 mr-1" }),
                  " Reddet"
                ]
              }
            )
          ] })
        ] })
      ] }) }) }, leave.id)) })
    ] }),
    activeTab === "mesai" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: overtimes.map((ot) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-purple-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-[#1A2433]", children: ot.staff }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#6B7A8D]", children: ot.role }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-purple-700 font-medium mt-1", children: [
            ot.hours,
            " saat fazla mesai"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#6B7A8D]", children: ot.date }),
          ot.reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-[#6B7A8D] mt-1", children: [
            "Neden: ",
            ot.reason
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: statusColor[ot.status], children: statusLabel[ot.status] }),
        isOwner && ot.status === "bekliyor" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => handleApproveOvertime(ot.id),
            className: "bg-green-600 hover:bg-green-700 text-white h-7 px-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
              " Onayla"
            ]
          }
        )
      ] })
    ] }) }) }, ot.id)) }),
    activeTab === "takvim" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-[#1A2433]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5 text-[#3B5BDB]" }),
        currentMonth,
        " İzin Takvimi"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1 mb-2", children: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center text-xs font-medium text-[#6B7A8D] py-2",
            children: d
          },
          d
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-7 gap-1", children: [
          [0, 1].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, `empty-${i}`)),
          Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const events = calendarEvents.filter((e) => e.day === day);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `min-h-[60px] p-1 border border-gray-100 rounded ${events.length > 0 ? "bg-blue-50" : "bg-white"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-[#1A2433] mb-1", children: day }),
                  events.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `text-xs px-1 rounded mb-0.5 truncate ${e.color}`,
                      children: e.staff.split(" ")[0]
                    },
                    `${e.staff}-${e.day}`
                  ))
                ]
              },
              day
            );
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded bg-blue-200" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: "Yıllık İzin" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded bg-orange-200" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: "Mazeret İzni" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded bg-green-200" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: "Diğer İzin" })
          ] })
        ] })
      ] })
    ] }),
    activeTab === "ozet" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: staffSummary.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[#3B5BDB]/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-5 h-5 text-[#3B5BDB]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-[#1A2433]", children: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#6B7A8D]", children: s.role })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold text-[#3B5BDB]", children: s.totalLeaveDays }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#6B7A8D]", children: "İzin Günü" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold text-purple-600", children: s.totalOvertimeHours }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#6B7A8D]", children: "Mesai Saati" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold text-yellow-600", children: s.pendingLeaves }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#6B7A8D]", children: "Bekleyen" })
        ] })
      ] })
    ] }) }) }, s.name)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showLeaveModal, onOpenChange: setShowLeaveModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "İzin Talebi Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: newLeave.staff,
            onValueChange: (v) => setNewLeave((p) => ({ ...p, staff: v })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Personel seçin" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: staffList.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: s.name, children: [
                s.name,
                " (",
                s.role,
                ")"
              ] }, s.name)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: newLeave.type,
            onValueChange: (v) => setNewLeave((p) => ({ ...p, type: v })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "İzin türü seçin" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: leaveTypes.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t }, t)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D] mb-1 block", children: "Başlangıç" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: newLeave.startDate,
                onChange: (e) => setNewLeave((p) => ({ ...p, startDate: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D] mb-1 block", children: "Bitiş" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: newLeave.endDate,
                onChange: (e) => setNewLeave((p) => ({ ...p, endDate: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Neden (opsiyonel)",
            value: newLeave.reason,
            onChange: (e) => setNewLeave((p) => ({ ...p, reason: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowLeaveModal(false),
              children: "İptal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleAddLeave,
              className: "bg-[#3B5BDB] text-white hover:bg-[#2F4CC0]",
              children: "Ekle"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showOvertimeModal, onOpenChange: setShowOvertimeModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Fazla Mesai Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: newOvertime.staff,
            onValueChange: (v) => setNewOvertime((p) => ({ ...p, staff: v })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Personel seçin" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: staffList.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: s.name, children: [
                s.name,
                " (",
                s.role,
                ")"
              ] }, s.name)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: newOvertime.date,
            onChange: (e) => setNewOvertime((p) => ({ ...p, date: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            placeholder: "Mesai saat sayısı",
            value: newOvertime.hours,
            onChange: (e) => setNewOvertime((p) => ({ ...p, hours: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Neden",
            value: newOvertime.reason,
            onChange: (e) => setNewOvertime((p) => ({ ...p, reason: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowOvertimeModal(false),
              children: "İptal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleAddOvertime,
              className: "bg-[#3B5BDB] text-white hover:bg-[#2F4CC0]",
              children: "Ekle"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  StaffLeaveManagement as default
};
