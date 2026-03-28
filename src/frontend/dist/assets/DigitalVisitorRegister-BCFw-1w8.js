import { r as reactExports, j as jsxRuntimeExports, D as Dialog, s as DialogTrigger, B as Button, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input, U as Users, aI as LogOut, S as Search, y as BookOpen, e as Badge } from "./index-B-5F0xzF.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-DJO9oBoQ.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CQddtzWA.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-D5rfkHG5.js";
import { U as UserPlus } from "./user-plus-C7JSeL3G.js";
import { C as CircleCheckBig } from "./circle-check-big-CdQV3eGb.js";
import { C as CircleAlert } from "./circle-alert-CspZijb-.js";
import { F as Funnel } from "./funnel-IQus0c0m.js";
import { C as Clock } from "./clock-B4H-dEI6.js";
import "./index-BHZaq3-H.js";
const sampleVisitors = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    tcOrPassport: "123****890",
    visitedApartment: "D:12",
    residentName: "Ayşe Kaya",
    purpose: "Aile ziyareti",
    checkIn: "2026-03-28 09:15",
    checkOut: "2026-03-28 11:30",
    status: "left"
  },
  {
    id: "2",
    name: "Zeynep Arslan",
    tcOrPassport: "234****901",
    visitedApartment: "B:5",
    residentName: "Mehmet Demir",
    purpose: "Kargo teslimi",
    checkIn: "2026-03-28 10:00",
    status: "inside"
  },
  {
    id: "3",
    name: "Mustafa Çelik",
    tcOrPassport: "345****012",
    visitedApartment: "A:3",
    residentName: "Fatma Şahin",
    purpose: "Tamir & Servis",
    vehiclePlate: "34 XYZ 123",
    checkIn: "2026-03-28 08:45",
    checkOut: "2026-03-28 10:15",
    status: "left"
  },
  {
    id: "4",
    name: "Elif Koç",
    tcOrPassport: "456****123",
    visitedApartment: "C:8",
    residentName: "Ali Yıldız",
    purpose: "İş görüşmesi",
    checkIn: "2026-03-28 13:00",
    status: "inside"
  },
  {
    id: "5",
    name: "Hasan Öztürk",
    tcOrPassport: "567****234",
    visitedApartment: "D:7",
    residentName: "Hatice Çelik",
    purpose: "Ziyaret",
    vehiclePlate: "06 ABC 456",
    checkIn: "2026-03-27 15:30",
    checkOut: "2026-03-27 17:00",
    status: "left"
  },
  {
    id: "6",
    name: "Bilinmeyen Kişi",
    tcOrPassport: "-",
    visitedApartment: "B:2",
    residentName: "Sakin mevcut değil",
    purpose: "Tespit edilemedi",
    checkIn: "2026-03-27 22:10",
    status: "denied",
    note: "Sakin onaylamaması üzerine giriş reddedildi."
  },
  {
    id: "7",
    name: "Selin Güneş",
    tcOrPassport: "678****345",
    visitedApartment: "A:6",
    residentName: "Emre Kılıç",
    purpose: "Arkadaş ziyareti",
    checkIn: "2026-03-27 18:00",
    checkOut: "2026-03-27 21:30",
    status: "left"
  }
];
const purposeOptions = [
  "Aile ziyareti",
  "Arkadaş ziyareti",
  "Kargo teslimi",
  "Tamir & Servis",
  "İş görüşmesi",
  "Temizlik hizmeti",
  "Diğer"
];
function DigitalVisitorRegister({
  buildingId: _buildingId,
  t: _t
}) {
  const [visitors, setVisitors] = reactExports.useState(sampleVisitors);
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [dateFilter, setDateFilter] = reactExports.useState("today");
  const [showForm, setShowForm] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    name: "",
    tcOrPassport: "",
    visitedApartment: "",
    residentName: "",
    purpose: "",
    vehiclePlate: "",
    note: ""
  });
  const filtered = visitors.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.visitedApartment.toLowerCase().includes(search.toLowerCase()) || v.residentName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || v.status === statusFilter;
    const isToday = v.checkIn.startsWith("2026-03-28");
    const matchDate = dateFilter === "all" || dateFilter === "today" && isToday || dateFilter === "yesterday" && !isToday;
    return matchSearch && matchStatus && matchDate;
  });
  const insideCount = visitors.filter((v) => v.status === "inside").length;
  const todayTotal = visitors.filter(
    (v) => v.checkIn.startsWith("2026-03-28")
  ).length;
  const deniedCount = visitors.filter((v) => v.status === "denied").length;
  const handleCheckOut = (id) => {
    setVisitors(
      (prev) => prev.map(
        (v) => v.id === id ? {
          ...v,
          status: "left",
          checkOut: `2026-03-28 ${(/* @__PURE__ */ new Date()).toTimeString().slice(0, 5)}`
        } : v
      )
    );
  };
  const handleAdd = () => {
    if (!form.name || !form.visitedApartment || !form.purpose) return;
    const newVisitor = {
      id: String(visitors.length + 1),
      name: form.name,
      tcOrPassport: form.tcOrPassport || "-",
      visitedApartment: form.visitedApartment,
      residentName: form.residentName,
      purpose: form.purpose,
      vehiclePlate: form.vehiclePlate || void 0,
      note: form.note || void 0,
      checkIn: `2026-03-28 ${(/* @__PURE__ */ new Date()).toTimeString().slice(0, 5)}`,
      status: "inside"
    };
    setVisitors((prev) => [newVisitor, ...prev]);
    setForm({
      name: "",
      tcOrPassport: "",
      visitedApartment: "",
      residentName: "",
      purpose: "",
      vehiclePlate: "",
      note: ""
    });
    setShowForm(false);
  };
  const statusBadge = (status) => {
    if (status === "inside")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700 border-green-200", children: "İçeride" });
    if (status === "left")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gray-100 text-gray-600 border-gray-200", children: "Ayrıldı" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700 border-red-200", children: "Reddedildi" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-[#1A2341]", children: "Dijital Ziyaretçi Defteri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Bina giriş-çıkış ziyaretçi kayıtları" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: showForm, onOpenChange: setShowForm, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-[#3A6BFF] hover:bg-[#2A5BEF] text-white gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
          " Ziyaretçi Kaydet"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Ziyaretçi Girişi" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-700 mb-1", children: "Ad Soyad *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Ziyaretçi adı",
                  value: form.name,
                  onChange: (e) => setForm({ ...form, name: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-700 mb-1", children: "TC / Pasaport No" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Kimlik numarası (isteğe bağlı)",
                  value: form.tcOrPassport,
                  onChange: (e) => setForm({ ...form, tcOrPassport: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-700 mb-1", children: "Ziyaret Edilen Daire *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Örn: D:12",
                    value: form.visitedApartment,
                    onChange: (e) => setForm({ ...form, visitedApartment: e.target.value })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-700 mb-1", children: "Sakin Adı" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Sakin adı",
                    value: form.residentName,
                    onChange: (e) => setForm({ ...form, residentName: e.target.value })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-700 mb-1", children: "Ziyaret Amacı *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.purpose,
                  onValueChange: (v) => setForm({ ...form, purpose: v }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Amaç seçin" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: purposeOptions.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, children: p }, p)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-700 mb-1", children: "Araç Plakası" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "34 ABC 123 (isteğe bağlı)",
                  value: form.vehiclePlate,
                  onChange: (e) => setForm({ ...form, vehiclePlate: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-700 mb-1", children: "Not" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Ek not (isteğe bağlı)",
                  value: form.note,
                  onChange: (e) => setForm({ ...form, note: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full bg-[#3A6BFF] hover:bg-[#2A5BEF] text-white",
                onClick: handleAdd,
                children: "Giriş Kaydı Oluştur"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-blue-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#1A2341]", children: todayTotal }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Bugünkü Ziyaret" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-green-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-green-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#1A2341]", children: insideCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Şu An İçeride" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-5 h-5 text-gray-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#1A2341]", children: visitors.filter((v) => v.status === "left").length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Ayrılan" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-red-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-red-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#1A2341]", children: deniedCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Reddedilen" })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Ziyaretçi adı, daire veya sakin ara...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectTrigger, { className: "w-full sm:w-44", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4 mr-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Durum" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Tümü" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inside", children: "İçeride" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "left", children: "Ayrıldı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "denied", children: "Reddedildi" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: dateFilter, onValueChange: setDateFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectTrigger, { className: "w-full sm:w-44", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 mr-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Tarih" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "today", children: "Bugün" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "yesterday", children: "Dün" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Tümü" })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-[#3A6BFF]" }),
        "Ziyaretçi Kayıtları (",
        filtered.length,
        ")"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Ziyaretçi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Daire / Sakin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Amaç" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Araç" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Giriş" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Çıkış" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Durum" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, {})
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TableCell,
            {
              colSpan: 8,
              className: "text-center text-gray-400 py-10",
              children: "Kayıt bulunamadı"
            }
          ) }) : filtered.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-[#1A2341]", children: v.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: v.tcOrPassport })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: v.visitedApartment }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: v.residentName })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: v.purpose }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-gray-500", children: v.vehiclePlate || "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: v.checkIn.split(" ")[1] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-gray-500", children: v.checkOut ? v.checkOut.split(" ")[1] : "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: statusBadge(v.status) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: v.status === "inside" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "text-xs h-7 gap-1",
                onClick: () => handleCheckOut(v.id),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3 h-3" }),
                  " Çıkış Yap"
                ]
              }
            ) })
          ] }, v.id)) })
        ] }) }),
        filtered.some((v) => v.note) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: filtered.filter((v) => v.note).map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-2 p-3 bg-red-50 rounded-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-red-500 mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-red-700", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                  v.name,
                  ":"
                ] }),
                " ",
                v.note
              ] })
            ]
          },
          v.id
        )) })
      ] })
    ] })
  ] });
}
export {
  DigitalVisitorRegister as default
};
