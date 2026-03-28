import { r as reactExports, j as jsxRuntimeExports, aG as PartyPopper, D as Dialog, s as DialogTrigger, B as Button, P as Plus, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, e as Badge, v as MapPin, U as Users } from "./index-huPFjtKr.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BNzburN1.js";
import { L as Label } from "./label-C8xbp7_u.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BNo0-bwN.js";
import { C as CalendarDays } from "./calendar-days-bhTOHc_O.js";
import { C as ChevronLeft } from "./chevron-left-yUyPTF1L.js";
import { C as ChevronRight } from "./chevron-right-Cz3-e6vM.js";
import { C as Clock } from "./clock-CTDtSScP.js";
import "./index-BeimOfld.js";
const SAMPLE_EVENTS = [
  {
    id: 1,
    title: "Yaz Barbeku Partisi",
    description: "Tüm sakinlerin katılımına açık yıllık yaz barbeku etkinliği. Müzik ve eğlence sizi bekliyor!",
    date: "2026-04-05",
    time: "17:00",
    location: "Bina Bahçesi",
    organizer: "Ahmet Yılmaz",
    category: "Eğlence",
    capacity: 80,
    attendees: [
      "Mehmet K.",
      "Ayşe T.",
      "Fatma D.",
      "Ali R.",
      "Zeynep S.",
      "Burak Ö.",
      "Hale M.",
      "Deniz A."
    ],
    status: "Planlandı"
  },
  {
    id: 2,
    title: "Yoga & Meditasyon Sabahı",
    description: "Her hafta Cumartesi sabahı 7:30'da çatı terasında yoga seansı. Tüm seviyeler için uygun.",
    date: "2026-03-28",
    time: "07:30",
    location: "Çatı Terası",
    organizer: "Selin Aydın",
    category: "Spor",
    capacity: 20,
    attendees: ["Zeynep S.", "Hale M.", "Nur E.", "Berna T.", "Cansu K."],
    status: "Planlandı"
  },
  {
    id: 3,
    title: "Kitap Kulübü Toplantısı",
    description: "Bu ayki kitabımız 'Tutunamayanlar'. Birlikte okuyup tartışacağız.",
    date: "2026-03-30",
    time: "19:00",
    location: "Toplantı Salonu",
    organizer: "Figen Kaya",
    category: "Kültür",
    capacity: 15,
    attendees: ["Ahmet Y.", "Mehmet K.", "Figen K.", "Serdar B."],
    status: "Planlandı"
  },
  {
    id: 4,
    title: "Olağan Genel Kurul",
    description: "2026 yılı bütçe ve yönetim planlaması için olağan genel kurul toplantısı.",
    date: "2026-04-10",
    time: "20:00",
    location: "Toplantı Salonu",
    organizer: "Site Yönetimi",
    category: "Toplantı",
    capacity: 120,
    attendees: ["Tüm Sakinler"],
    status: "Planlandı"
  },
  {
    id: 5,
    title: "Çocuk Sinema Gecesi",
    description: "Çocuklar için animasyon film gösterimi. Popcorn ücretsiz!",
    date: "2026-03-27",
    time: "18:30",
    location: "Konferans Salonu",
    organizer: "Ayşe Demir",
    category: "Eğlence",
    capacity: 40,
    attendees: [
      "Kadir Ö.",
      "Merve B.",
      "Tolga S.",
      "İpek Y.",
      "Kemal A.",
      "Sude T."
    ],
    status: "Devam Ediyor"
  },
  {
    id: 6,
    title: "Futbol Turnuvası",
    description: "Bina sakinleri arası 5'er kişilik takımlar halinde futbol turnuvası.",
    date: "2026-03-15",
    time: "10:00",
    location: "Spor Alanı",
    organizer: "Burak Öztürk",
    category: "Spor",
    capacity: 30,
    attendees: [
      "Ahmet Y.",
      "Mehmet K.",
      "Ali R.",
      "Burak Ö.",
      "Serdar B.",
      "Tolga S.",
      "Kemal A.",
      "Kadir Ö."
    ],
    status: "Tamamlandı"
  },
  {
    id: 7,
    title: "Resim Atölyesi",
    description: "Yetişkinler için suluboya tekniğine giriş atölyesi. Malzemeler sağlanacaktır.",
    date: "2026-03-10",
    time: "14:00",
    location: "Hobi Odası",
    organizer: "Sibel Arslan",
    category: "Kültür",
    capacity: 12,
    attendees: ["Zeynep S.", "Hale M.", "Nur E.", "Figen K.", "Berna T."],
    status: "Tamamlandı"
  },
  {
    id: 8,
    title: "Komşu Tanışma Kahvaltısı",
    description: "Yeni taşınan komşularımızı tanımak için açık büfe kahvaltı organizasyonu.",
    date: "2026-02-20",
    time: "10:00",
    location: "Bina Bahçesi",
    organizer: "Site Yönetimi",
    category: "Sosyal",
    capacity: 50,
    attendees: [
      "Ahmet Y.",
      "Selin A.",
      "Figen K.",
      "Sibel A.",
      "Cansu K.",
      "İpek Y.",
      "Merve B.",
      "Deniz A.",
      "Serdar B.",
      "Berna T."
    ],
    status: "Tamamlandı"
  },
  {
    id: 9,
    title: "Bahçe Sulama Nöbet Toplantısı",
    description: "Yaz sezonu bahçe sulama nöbet çizelgesinin belirlenmesi.",
    date: "2026-04-15",
    time: "19:30",
    location: "Toplantı Salonu",
    organizer: "Hüseyin Çelik",
    category: "Toplantı",
    capacity: 25,
    attendees: [],
    status: "Planlandı"
  },
  {
    id: 10,
    title: "Gece Koşusu",
    description: "Her Çarşamba akşamı bina çevresinde 5km'lik organize koşu.",
    date: "2026-04-02",
    time: "20:00",
    location: "Bina Çevresi",
    organizer: "Murat Şahin",
    category: "Spor",
    capacity: 30,
    attendees: ["Burak Ö.", "Serdar B.", "Kemal A.", "Murat Ş."],
    status: "Planlandı"
  }
];
const CATEGORY_COLORS = {
  Spor: "bg-green-100 text-green-700 border-green-200",
  Sosyal: "bg-orange-100 text-orange-700 border-orange-200",
  Kültür: "bg-purple-100 text-purple-700 border-purple-200",
  Toplantı: "bg-blue-100 text-blue-700 border-blue-200",
  Eğlence: "bg-yellow-100 text-yellow-700 border-yellow-200"
};
const STATUS_COLORS = {
  Planlandı: "bg-sky-100 text-sky-700 border-sky-200",
  "Devam Ediyor": "bg-emerald-100 text-emerald-700 border-emerald-200",
  Tamamlandı: "bg-gray-100 text-gray-600 border-gray-200",
  İptal: "bg-red-100 text-red-700 border-red-200"
};
const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
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
function SocialEvents({ isOwner }) {
  const [events, setEvents] = reactExports.useState(SAMPLE_EVENTS);
  const [filterCategory, setFilterCategory] = reactExports.useState("Tümü");
  const [filterStatus, setFilterStatus] = reactExports.useState("Tümü");
  const [selectedEvent, setSelectedEvent] = reactExports.useState(null);
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const [calendarDate, setCalendarDate] = reactExports.useState(new Date(2026, 2, 27));
  const [joinedEvents, setJoinedEvents] = reactExports.useState(
    /* @__PURE__ */ new Set([2, 3])
  );
  const [newEvent, setNewEvent] = reactExports.useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "Sosyal",
    capacity: 30
  });
  const filtered = events.filter((e) => {
    if (filterCategory !== "Tümü" && e.category !== filterCategory)
      return false;
    if (filterStatus !== "Tümü" && e.status !== filterStatus) return false;
    return true;
  });
  const now = new Date(2026, 2, 27);
  const upcoming = events.filter(
    (e) => new Date(e.date) >= now && e.status !== "İptal"
  );
  const thisMonth = events.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const totalParticipants = events.reduce(
    (sum, e) => sum + e.attendees.length,
    0
  );
  function handleJoin(eventId) {
    setJoinedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) next.delete(eventId);
      else next.add(eventId);
      return next;
    });
  }
  function handleCreate() {
    if (!newEvent.title || !newEvent.date) return;
    const created = {
      id: events.length + 1,
      ...newEvent,
      organizer: "Yönetici",
      attendees: [],
      status: "Planlandı"
    };
    setEvents((prev) => [...prev, created]);
    setCreateOpen(false);
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "Sosyal",
      capacity: 30
    });
  }
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const eventsByDate = {};
  for (const e of events) {
    if (!eventsByDate[e.date]) eventsByDate[e.date] = [];
    eventsByDate[e.date].push(e);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-orange-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PartyPopper, { className: "w-6 h-6 text-orange-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Sosyal Etkinlik & Organizasyon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Bina etkinliklerini görüntüle, katıl ve organize et" })
        ] })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: createOpen, onOpenChange: setCreateOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "bg-orange-500 hover:bg-orange-600 text-white gap-2",
            "data-ocid": "social_events.open_modal_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Etkinlik Oluştur"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-lg",
            "data-ocid": "social_events.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Etkinlik Oluştur" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Etkinlik Adı" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      placeholder: "Etkinlik adını girin",
                      value: newEvent.title,
                      onChange: (e) => setNewEvent((p) => ({ ...p, title: e.target.value })),
                      className: "mt-1",
                      "data-ocid": "social_events.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Açıklama" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      className: "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400",
                      rows: 3,
                      placeholder: "Etkinlik hakkında kısa açıklama",
                      value: newEvent.description,
                      onChange: (e) => setNewEvent((p) => ({
                        ...p,
                        description: e.target.value
                      })),
                      "data-ocid": "social_events.textarea"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tarih" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "date",
                        value: newEvent.date,
                        onChange: (e) => setNewEvent((p) => ({ ...p, date: e.target.value })),
                        className: "mt-1"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Saat" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "time",
                        value: newEvent.time,
                        onChange: (e) => setNewEvent((p) => ({ ...p, time: e.target.value })),
                        className: "mt-1"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Konum" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      placeholder: "Etkinlik yeri",
                      value: newEvent.location,
                      onChange: (e) => setNewEvent((p) => ({ ...p, location: e.target.value })),
                      className: "mt-1"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Kategori" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: newEvent.category,
                        onValueChange: (v) => setNewEvent((p) => ({
                          ...p,
                          category: v
                        })),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            SelectTrigger,
                            {
                              className: "mt-1",
                              "data-ocid": "social_events.select",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [
                            "Spor",
                            "Sosyal",
                            "Kültür",
                            "Toplantı",
                            "Eğlence"
                          ].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Kapasite" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        value: newEvent.capacity,
                        onChange: (e) => setNewEvent((p) => ({
                          ...p,
                          capacity: Number(e.target.value)
                        })),
                        className: "mt-1"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      onClick: () => setCreateOpen(false),
                      "data-ocid": "social_events.cancel_button",
                      children: "İptal"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "bg-orange-500 hover:bg-orange-600 text-white",
                      onClick: handleCreate,
                      "data-ocid": "social_events.submit_button",
                      children: "Oluştur"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      {
        label: "Toplam Etkinlik",
        value: events.length,
        color: "text-orange-600",
        bg: "bg-orange-50"
      },
      {
        label: "Bu Ay",
        value: thisMonth.length,
        color: "text-green-600",
        bg: "bg-green-50"
      },
      {
        label: "Toplam Katılım",
        value: totalParticipants,
        color: "text-purple-600",
        bg: "bg-purple-50"
      },
      {
        label: "Yaklaşan",
        value: upcoming.length,
        color: "text-blue-600",
        bg: "bg-blue-50"
      }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `${s.bg} border-0 shadow-sm`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold ${s.color}`, children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-1", children: s.label })
    ] }) }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "list", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-white border", "data-ocid": "social_events.tab", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "list", children: "Etkinlik Listesi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "calendar", children: "Takvim" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "list", className: "mt-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterCategory, onValueChange: setFilterCategory, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-36 bg-white",
                "data-ocid": "social_events.select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Kategori" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [
              "Tümü",
              "Spor",
              "Sosyal",
              "Kültür",
              "Toplantı",
              "Eğlence"
            ].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterStatus, onValueChange: setFilterStatus, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-40 bg-white",
                "data-ocid": "social_events.select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Durum" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [
              "Tümü",
              "Planlandı",
              "Devam Ediyor",
              "Tamamlandı",
              "İptal"
            ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4", children: [
          filtered.map((event, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "hover:shadow-md transition-shadow cursor-pointer border-l-4 bg-white",
              style: {
                borderLeftColor: event.status === "İptal" ? "#ef4444" : event.status === "Tamamlandı" ? "#9ca3af" : event.status === "Devam Ediyor" ? "#10b981" : "#f97316"
              },
              onClick: () => setSelectedEvent(event),
              "data-ocid": `social_events.item.${idx + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-800", children: event.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: `text-xs border ${CATEGORY_COLORS[event.category]}`,
                          variant: "outline",
                          children: event.category
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: `text-xs border ${STATUS_COLORS[event.status]}`,
                          variant: "outline",
                          children: event.status
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 line-clamp-1", children: event.description }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-2 text-xs text-gray-500 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3 h-3" }),
                        event.date,
                        " ",
                        event.time && `· ${event.time}`
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                        event.location
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
                        event.attendees.length,
                        "/",
                        event.capacity,
                        " katılımcı"
                      ] })
                    ] })
                  ] }),
                  event.status === "Planlandı" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      onClick: (e) => {
                        e.stopPropagation();
                        handleJoin(event.id);
                      },
                      className: joinedEvents.has(event.id) ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-orange-500 hover:bg-orange-600 text-white",
                      "data-ocid": `social_events.toggle.${idx + 1}`,
                      children: joinedEvents.has(event.id) ? "Ayrıl" : "Katıl"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-100 rounded-full h-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-1.5 rounded-full bg-orange-400 transition-all",
                    style: {
                      width: `${Math.min(100, event.attendees.length / event.capacity * 100)}%`
                    }
                  }
                ) }) })
              ] })
            },
            event.id
          )),
          filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-16 text-gray-400",
              "data-ocid": "social_events.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PartyPopper, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Filtreyle eşleşen etkinlik bulunamadı." })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "calendar", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-white shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg", children: [
            MONTHS[month],
            " ",
            year
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                onClick: () => setCalendarDate(new Date(year, month - 1, 1)),
                "data-ocid": "social_events.pagination_prev",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                onClick: () => setCalendarDate(new Date(year, month + 1, 1)),
                "data-ocid": "social_events.pagination_next",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1 mb-2", children: DAYS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-center text-xs font-medium text-gray-500 py-1",
              children: d
            },
            d
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-7 gap-1", children: [
            Array.from({ length: offset }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: offset cells have no stable id
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, `empty-${i}`)
            )),
            Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const dayEvents = eventsByDate[dateStr] || [];
              const isToday = day === 27 && month === 2 && year === 2026;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `min-h-[64px] rounded-lg p-1 border transition-colors ${isToday ? "border-orange-400 bg-orange-50" : "border-gray-100 hover:bg-gray-50"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `text-xs font-medium mb-1 ${isToday ? "text-orange-600" : "text-gray-700"}`,
                        children: day
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
                      dayEvents.slice(0, 2).map((ev) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setSelectedEvent(ev),
                          className: `w-full text-left text-[10px] font-medium px-1 py-0.5 rounded truncate block ${ev.category === "Spor" ? "bg-green-100 text-green-700" : ev.category === "Sosyal" ? "bg-orange-100 text-orange-700" : ev.category === "Kültür" ? "bg-purple-100 text-purple-700" : ev.category === "Toplantı" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`,
                          children: ev.title
                        },
                        ev.id
                      )),
                      dayEvents.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-gray-400 px-1", children: [
                        "+",
                        dayEvents.length - 2,
                        " daha"
                      ] })
                    ] })
                  ]
                },
                day
              );
            })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!selectedEvent,
        onOpenChange: (o) => !o && setSelectedEvent(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-lg", "data-ocid": "social_events.modal", children: selectedEvent && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
            selectedEvent.title,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-xs border ${CATEGORY_COLORS[selectedEvent.category]}`,
                variant: "outline",
                children: selectedEvent.category
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600", children: selectedEvent.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-gray-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4 text-orange-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedEvent.date })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-gray-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-orange-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedEvent.time || "Belirtilmedi" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-gray-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-orange-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedEvent.location })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-gray-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-orange-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  selectedEvent.attendees.length,
                  "/",
                  selectedEvent.capacity,
                  " ",
                  "katılımcı"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-700 mb-2", children: "Katılımcılar" }),
              selectedEvent.attendees.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: selectedEvent.attendees.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs bg-gray-50",
                  children: a
                },
                a
              )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "Henüz katılımcı yok." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `border ${STATUS_COLORS[selectedEvent.status]}`,
                  variant: "outline",
                  children: selectedEvent.status
                }
              ),
              selectedEvent.status === "Planlandı" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => handleJoin(selectedEvent.id),
                  className: joinedEvents.has(selectedEvent.id) ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-orange-500 hover:bg-orange-600 text-white",
                  "data-ocid": "social_events.button",
                  children: joinedEvents.has(selectedEvent.id) ? "Etkinlikten Ayrıl" : "Etkinliğe Katıl"
                }
              )
            ] })
          ] })
        ] }) })
      }
    )
  ] });
}
export {
  SocialEvents as default
};
