import { c as createLucideIcon, u as useTranslation, r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, n as Calendar, I as Input, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, Y as Check, F as FileText, v as MapPin, U as Users, e as Badge } from "./index-Bfd22_yy.js";
import { T as Textarea } from "./textarea-fxTKNUxG.js";
import { C as Clock } from "./clock-BHYbK5oy.js";
import { P as Printer } from "./printer-DWh_7vP9.js";
import { T as Trash2 } from "./trash-2-BLfMSVIr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode);
function MeetingManagement({ userId, isOwnerOrManager }) {
  const { t } = useTranslation();
  const [meetings, setMeetings] = reactExports.useState([
    {
      id: "1",
      title: "Ocak Ayı Olağan Toplantısı",
      date: "2026-02-15",
      time: "19:00",
      location: "Lobi / Toplantı Salonu",
      agenda: "Aidat artışı ve ortak alan bakımı görüşülecek.",
      agendaItems: [
        { id: "a1", text: "2026 yılı aidat artış oranlarının belirlenmesi" },
        { id: "a2", text: "Bahçe renovasyonu teklifi değerlendirilmesi" },
        { id: "a3", text: "Asansör bakım sözleşmesi uzatma" }
      ],
      meetingNotes: "",
      decisions: "",
      attendees: [userId],
      attendeeList: [
        { name: "Ahmet Yılmaz (D:101)", attended: false },
        { name: "Fatma Kaya (D:202)", attended: false },
        { name: "Mehmet Demir (D:301)", attended: false }
      ],
      status: "upcoming",
      createdBy: userId,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  ]);
  const [showModal, setShowModal] = reactExports.useState(false);
  const [detailMeeting, setDetailMeeting] = reactExports.useState(null);
  const [printMeeting, setPrintMeeting] = reactExports.useState(null);
  const [title, setTitle] = reactExports.useState("");
  const [date, setDate] = reactExports.useState("");
  const [time, setTime] = reactExports.useState("");
  const [location, setLocation] = reactExports.useState("");
  const [agenda, setAgenda] = reactExports.useState("");
  const [agendaItems, setAgendaItems] = reactExports.useState([""]);
  const [editNotes, setEditNotes] = reactExports.useState("");
  const [editDecisions, setEditDecisions] = reactExports.useState("");
  const [detailTab, setDetailTab] = reactExports.useState("notes");
  const [decisions, setDecisions] = reactExports.useState(
    {}
  );
  const [showDecisionForm, setShowDecisionForm] = reactExports.useState(false);
  const [decisionForm, setDecisionForm] = reactExports.useState({
    text: "",
    votesFor: 0,
    votesAgainst: 0,
    votesAbstain: 0,
    status: "Kabul Edildi"
  });
  const [agendaChecked, setAgendaChecked] = reactExports.useState(
    {}
  );
  const [calendarMonth, setCalendarMonth] = reactExports.useState(() => {
    const d = /* @__PURE__ */ new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });
  const handleCreate = () => {
    if (!title || !date || !time) return;
    const newMeeting = {
      id: Date.now().toString(),
      title,
      date,
      time,
      location,
      agenda,
      agendaItems: agendaItems.filter((a) => a.trim()).map((text) => ({ id: crypto.randomUUID(), text })),
      meetingNotes: "",
      decisions: "",
      attendees: [userId],
      attendeeList: [],
      status: "upcoming",
      createdBy: userId,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setMeetings([newMeeting, ...meetings]);
    setTitle("");
    setDate("");
    setTime("");
    setLocation("");
    setAgenda("");
    setAgendaItems([""]);
    setShowModal(false);
  };
  const handleAttend = (meetingId) => {
    setMeetings(
      meetings.map((m) => {
        if (m.id !== meetingId) return m;
        const already = m.attendees.includes(userId);
        return {
          ...m,
          attendees: already ? m.attendees.filter((a) => a !== userId) : [...m.attendees, userId]
        };
      })
    );
  };
  const handleDelete = (meetingId) => setMeetings(meetings.filter((m) => m.id !== meetingId));
  const handleComplete = (meetingId) => setMeetings(
    meetings.map(
      (m) => m.id === meetingId ? { ...m, status: "completed" } : m
    )
  );
  const handleSaveNotes = () => {
    if (!detailMeeting) return;
    setMeetings(
      meetings.map(
        (m) => m.id === detailMeeting.id ? { ...m, meetingNotes: editNotes, decisions: editDecisions } : m
      )
    );
    setDetailMeeting(null);
  };
  const toggleAttendee = (meetingId, name) => {
    setMeetings(
      meetings.map(
        (m) => m.id === meetingId ? {
          ...m,
          attendeeList: m.attendeeList.map(
            (a) => a.name === name ? { ...a, attended: !a.attended } : a
          )
        } : m
      )
    );
  };
  const openDetail = (meeting) => {
    setDetailMeeting(meeting);
    setEditNotes(meeting.meetingNotes);
    setEditDecisions(meeting.decisions);
    setDetailTab("notes");
    setShowDecisionForm(false);
    try {
      const raw = localStorage.getItem(`sitecore_decisions_${meeting.id}`);
      if (raw) {
        setDecisions((prev) => ({ ...prev, [meeting.id]: JSON.parse(raw) }));
      } else {
        const seed = [
          {
            id: crypto.randomUUID(),
            no: 1,
            text: "2026 yılı aidat miktarı %15 artırılmasına karar verildi.",
            votesFor: 8,
            votesAgainst: 2,
            votesAbstain: 1,
            status: "Kabul Edildi"
          },
          {
            id: crypto.randomUUID(),
            no: 2,
            text: "Bahçe renovasyonu teklifinin önümüzdeki toplantıya ertelenmesi kararlaştırıldı.",
            votesFor: 6,
            votesAgainst: 3,
            votesAbstain: 2,
            status: "Ertelendi"
          }
        ];
        localStorage.setItem(
          `sitecore_decisions_${meeting.id}`,
          JSON.stringify(seed)
        );
        setDecisions((prev) => ({ ...prev, [meeting.id]: seed }));
      }
    } catch {
    }
    try {
      const acRaw = localStorage.getItem(
        `sitecore_agenda_checked_${meeting.id}`
      );
      if (acRaw) setAgendaChecked(JSON.parse(acRaw));
    } catch {
    }
  };
  const saveDecisions = (meetingId, updated) => {
    setDecisions((prev) => ({ ...prev, [meetingId]: updated }));
    localStorage.setItem(
      `sitecore_decisions_${meetingId}`,
      JSON.stringify(updated)
    );
  };
  const handleAddDecision = (meetingId) => {
    if (!decisionForm.text.trim()) return;
    const existing = decisions[meetingId] || [];
    const nd = {
      id: crypto.randomUUID(),
      no: existing.length + 1,
      ...decisionForm
    };
    saveDecisions(meetingId, [...existing, nd]);
    setDecisionForm({
      text: "",
      votesFor: 0,
      votesAgainst: 0,
      votesAbstain: 0,
      status: "Kabul Edildi"
    });
    setShowDecisionForm(false);
  };
  const toggleAgendaCheck = (meetingId, itemId) => {
    const key = `${meetingId}_${itemId}`;
    const updated = { ...agendaChecked, [key]: !agendaChecked[key] };
    setAgendaChecked(updated);
    try {
      localStorage.setItem(
        `sitecore_agenda_checked_${meetingId}`,
        JSON.stringify(updated)
      );
    } catch {
    }
  };
  const statusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-700";
      case "ongoing":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-gray-100 text-gray-600";
      case "cancelled":
        return "bg-red-100 text-red-700";
    }
  };
  const statusLabel = (status) => {
    switch (status) {
      case "upcoming":
        return t.meetingUpcoming || "Yaklaşan";
      case "ongoing":
        return t.meetingOngoing || "Devam Ediyor";
      case "completed":
        return t.meetingCompleted || "Tamamlandı";
      case "cancelled":
        return t.meetingCancelled || "İptal";
    }
  };
  const upcoming = meetings.filter(
    (m) => m.status === "upcoming" || m.status === "ongoing"
  );
  const past = meetings.filter(
    (m) => m.status === "completed" || m.status === "cancelled"
  );
  const calendarMeetings = reactExports.useMemo(() => {
    return meetings.filter((m) => m.date.startsWith(calendarMonth));
  }, [meetings, calendarMonth]);
  const calendarDays = reactExports.useMemo(() => {
    const [yr, mo] = calendarMonth.split("-").map(Number);
    const daysInMonth = new Date(yr, mo, 0).getDate();
    const firstDay = new Date(yr, mo - 1, 1).getDay();
    return { daysInMonth, firstDay };
  }, [calendarMonth]);
  const meetingsByDay = reactExports.useMemo(() => {
    const map = {};
    for (const m of calendarMeetings) {
      const day = Number(m.date.split("-")[2]);
      if (!map[day]) map[day] = [];
      map[day].push(m);
    }
    return map;
  }, [calendarMeetings]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-[#0B1B2E]", children: t.meetings || "Toplantı Yönetimi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#6B7A8D] mt-1", children: [
          upcoming.length,
          " ",
          t.meetingUpcoming || "yaklaşan toplantı"
        ] })
      ] }),
      isOwnerOrManager && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowModal(true),
          className: "bg-[#1A3A5C] hover:bg-[#0B1B2E] text-white gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            t.createMeeting || "Toplantı Oluştur"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "list", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-[#F3F6FB]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "list", children: "Liste" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "calendar", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3.5 h-3.5 mr-1" }),
          " Takvim"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "list", className: "mt-4", children: upcoming.length === 0 && past.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E2E8F0] p-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-10 h-10 text-[#B0BAC6] mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: t.noMeetings || "Henüz toplantı planlanmadı." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        upcoming.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-[#3A4654] uppercase tracking-wide", children: t.upcomingMeetings || "Yaklaşan Toplantılar" }),
          upcoming.map((meeting) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            MeetingCard,
            {
              meeting,
              userId,
              isOwnerOrManager,
              statusColor,
              statusLabel,
              onAttend: handleAttend,
              onComplete: handleComplete,
              onDelete: handleDelete,
              onOpenDetail: openDetail,
              onPrint: setPrintMeeting,
              t
            },
            meeting.id
          ))
        ] }),
        past.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-[#3A4654] uppercase tracking-wide", children: t.pastMeetings || "Geçmiş Toplantılar" }),
          past.map((meeting) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            MeetingCard,
            {
              meeting,
              userId,
              isOwnerOrManager,
              statusColor,
              statusLabel,
              onAttend: handleAttend,
              onComplete: handleComplete,
              onDelete: handleDelete,
              onOpenDetail: openDetail,
              onPrint: setPrintMeeting,
              t
            },
            meeting.id
          ))
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "calendar", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E2E8F0] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0B1B2E]", children: (/* @__PURE__ */ new Date(`${calendarMonth}-01`)).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "month",
              value: calendarMonth,
              onChange: (e) => setCalendarMonth(e.target.value),
              className: "w-44 text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1 text-xs font-medium text-[#6B7A8D] mb-2", children: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-1", children: d }, d)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-7 gap-1", children: [
          Array.from({ length: calendarDays.firstDay }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: calendar empty cells
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, `empty-${i}`)
          )),
          Array.from(
            { length: calendarDays.daysInMonth },
            (_, i) => i + 1
          ).map((day) => {
            const dayMeetings = meetingsByDay[day] || [];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `min-h-[56px] rounded-lg p-1 text-xs ${dayMeetings.length > 0 ? "bg-blue-50 border border-blue-200" : "bg-[#F8FAFC] border border-transparent"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `font-medium ${dayMeetings.length > 0 ? "text-blue-700" : "text-[#3A4654]"}`,
                      children: day
                    }
                  ),
                  dayMeetings.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "mt-1 bg-blue-600 text-white rounded px-1 py-0.5 truncate",
                      children: [
                        m.time,
                        " ",
                        m.title.slice(0, 12)
                      ]
                    },
                    m.id
                  ))
                ]
              },
              day
            );
          })
        ] }),
        calendarMeetings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-[#6B7A8D] mt-4", children: "Bu ay toplantı bulunmuyor." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showModal, onOpenChange: setShowModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t.createMeeting || "Toplantı Oluştur" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "meeting-1",
              className: "text-sm font-medium text-[#3A4654] mb-1 block",
              children: t.meetingTitle || "Toplantı Başlığı"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "meeting-1",
              value: title,
              onChange: (e) => setTitle(e.target.value),
              placeholder: t.meetingTitle || "Toplantı Başlığı"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "meeting-2",
                className: "text-sm font-medium text-[#3A4654] mb-1 block",
                children: t.meetingDate || "Tarih"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "meeting-2",
                type: "date",
                value: date,
                onChange: (e) => setDate(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "meeting-3",
                className: "text-sm font-medium text-[#3A4654] mb-1 block",
                children: t.meetingTime || "Saat"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "meeting-3",
                type: "time",
                value: time,
                onChange: (e) => setTime(e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "meeting-4",
              className: "text-sm font-medium text-[#3A4654] mb-1 block",
              children: t.meetingLocation || "Yer"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "meeting-4",
              value: location,
              onChange: (e) => setLocation(e.target.value),
              placeholder: t.meetingLocationPlaceholder || "Lobi, Toplantı Salonu"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "meeting-5",
              className: "text-sm font-medium text-[#3A4654] mb-1 block",
              children: t.meetingAgenda || "Gündem (genel)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "meeting-5",
              className: "w-full border border-[#E2E8F0] rounded-lg p-2.5 text-sm text-[#0B1B2E] min-h-[60px] resize-none focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]",
              value: agenda,
              onChange: (e) => setAgenda(e.target.value),
              placeholder: "Toplantı gündemini yazın..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Gündem Maddeleri" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            agendaItems.map((item, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: positional
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: item,
                    onChange: (e) => setAgendaItems(
                      (prev) => prev.map((a, i) => i === idx ? e.target.value : a)
                    ),
                    placeholder: `Madde ${idx + 1}`
                  }
                ),
                idx > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "px-2 text-red-400",
                    onClick: () => setAgendaItems(
                      (prev) => prev.filter((_, i) => i !== idx)
                    ),
                    children: "-"
                  }
                )
              ] }, `agenda-${idx}`)
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "w-full text-xs rounded-full",
                onClick: () => setAgendaItems((prev) => [...prev, ""]),
                children: "+ Madde Ekle"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowModal(false), children: t.cancel || "İptal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "bg-[#1A3A5C] hover:bg-[#0B1B2E] text-white",
              onClick: handleCreate,
              children: t.save || "Kaydet"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!detailMeeting,
        onOpenChange: () => setDetailMeeting(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
            detailMeeting == null ? void 0 : detailMeeting.title,
            " — Notlar & Kararlar"
          ] }) }),
          detailMeeting && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-4 bg-[#F3F6FB] rounded-lg p-1", children: ["notes", "agenda", "decisions"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setDetailTab(tab),
                className: `flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${detailTab === tab ? "bg-white shadow text-[#0B1B2E]" : "text-[#6B7A8D] hover:text-[#0B1B2E]"}`,
                children: tab === "notes" ? "Notlar & Yoklama" : tab === "agenda" ? "Gündem" : "Kararlar"
              },
              tab
            )) }),
            detailTab === "notes" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              detailMeeting.attendeeList.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-2", children: "Katılımcı Yoklaması" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: detailMeeting.attendeeList.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    className: "flex items-center gap-2 text-sm cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "checkbox",
                          checked: a.attended,
                          onChange: () => toggleAttendee(detailMeeting.id, a.name)
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: a.attended ? "text-green-700 font-medium" : "text-[#3A4654]",
                          children: a.name
                        }
                      ),
                      a.attended && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-green-500" })
                    ]
                  },
                  a.name
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Toplantı Notları" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    value: editNotes,
                    onChange: (e) => setEditNotes(e.target.value),
                    rows: 3,
                    placeholder: "Toplantı sırasında alınan notlar..."
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Genel Kararlar (Serbest Metin)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    value: editDecisions,
                    onChange: (e) => setEditDecisions(e.target.value),
                    rows: 2,
                    placeholder: "Kısa karar özeti..."
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    onClick: () => setDetailMeeting(null),
                    children: t.cancel || "İptal"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    className: "bg-[#1A3A5C] hover:bg-[#0B1B2E] text-white",
                    onClick: handleSaveNotes,
                    children: "Kaydet"
                  }
                )
              ] })
            ] }),
            detailTab === "agenda" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-3", children: "Görüşülen maddeleri işaretleyin." }),
              detailMeeting.agendaItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] text-center py-6", children: "Gündem maddesi eklenmemiş." }) : detailMeeting.agendaItems.map((item, idx) => {
                const key = `${detailMeeting.id}_${item.id}`;
                const checked = !!agendaChecked[key];
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    className: `flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${checked ? "bg-green-50 border-green-200" : "bg-white border-[#E5EAF2]"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "checkbox",
                          checked,
                          onChange: () => toggleAgendaCheck(detailMeeting.id, item.id),
                          className: "mt-0.5"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-[#4A90D9] mr-2", children: [
                          idx + 1,
                          "."
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `text-sm ${checked ? "line-through text-[#6B7A8D]" : "text-[#0E1116]"}`,
                            children: item.text
                          }
                        )
                      ] }),
                      checked && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" })
                    ]
                  },
                  item.id
                );
              })
            ] }),
            detailTab === "decisions" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              isOwnerOrManager && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  onClick: () => setShowDecisionForm((v) => !v),
                  className: "bg-[#0B1B2E] text-white rounded-full gap-1 text-xs",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
                    " Karar Ekle"
                  ]
                }
              ) }),
              showDecisionForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F3F6FB] rounded-xl p-4 space-y-3 border border-[#E5EAF2]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-[#3A4654] mb-1", children: "Karar Metni" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      placeholder: "Karar içeriğini yazın...",
                      value: decisionForm.text,
                      onChange: (e) => setDecisionForm((p) => ({
                        ...p,
                        text: e.target.value
                      })),
                      rows: 2
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-[#3A4654] mb-1", children: "Lehte" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "number",
                        min: 0,
                        value: decisionForm.votesFor,
                        onChange: (e) => setDecisionForm((p) => ({
                          ...p,
                          votesFor: Number(e.target.value)
                        })),
                        className: "w-full border border-[#E5EAF2] rounded-lg px-2 py-1.5 text-sm"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-[#3A4654] mb-1", children: "Aleyhte" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "number",
                        min: 0,
                        value: decisionForm.votesAgainst,
                        onChange: (e) => setDecisionForm((p) => ({
                          ...p,
                          votesAgainst: Number(e.target.value)
                        })),
                        className: "w-full border border-[#E5EAF2] rounded-lg px-2 py-1.5 text-sm"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-[#3A4654] mb-1", children: "Çekimser" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "number",
                        min: 0,
                        value: decisionForm.votesAbstain,
                        onChange: (e) => setDecisionForm((p) => ({
                          ...p,
                          votesAbstain: Number(e.target.value)
                        })),
                        className: "w-full border border-[#E5EAF2] rounded-lg px-2 py-1.5 text-sm"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-[#3A4654] mb-1", children: "Durum" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      value: decisionForm.status,
                      onChange: (e) => setDecisionForm((p) => ({
                        ...p,
                        status: e.target.value
                      })),
                      className: "w-full border border-[#E5EAF2] rounded-lg px-2 py-1.5 text-sm",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Kabul Edildi" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Reddedildi" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Ertelendi" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      onClick: () => handleAddDecision(detailMeeting.id),
                      className: "bg-[#0B1B2E] text-white rounded-full text-xs",
                      children: "Kaydet"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      onClick: () => setShowDecisionForm(false),
                      className: "rounded-full text-xs",
                      children: "İptal"
                    }
                  )
                ] })
              ] }),
              (decisions[detailMeeting.id] || []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] text-center py-6", children: "Henüz resmi karar eklenmedi." }) : (decisions[detailMeeting.id] || []).map((dec) => {
                const statusColor2 = dec.status === "Kabul Edildi" ? "bg-green-100 text-green-700" : dec.status === "Reddedildi" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700";
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "bg-white rounded-xl p-4 border border-[#E5EAF2]",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-[#4A90D9]", children: [
                          "Karar #",
                          dec.no
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `text-xs px-2 py-0.5 rounded-full font-medium ${statusColor2}`,
                            children: dec.status
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#0E1116]", children: dec.text }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-2 text-xs text-[#6B7A8D]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-600", children: [
                          "✅ Lehte: ",
                          dec.votesFor
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-red-600", children: [
                          "❌ Aleyhte: ",
                          dec.votesAgainst
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-500", children: [
                          "➖ Çekimser: ",
                          dec.votesAbstain
                        ] })
                      ] })
                    ] }) })
                  },
                  dec.id
                );
              })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!printMeeting, onOpenChange: () => setPrintMeeting(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 inline mr-2" }),
        "Toplantı Tutanağı"
      ] }) }),
      printMeeting && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[#E2E8F0] rounded-xl p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-[#E2E8F0] pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-[#0B1B2E]", children: printMeeting.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 text-sm text-[#6B7A8D] mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
                printMeeting.date
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                printMeeting.time
              ] }),
              printMeeting.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5" }),
                printMeeting.location
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
                printMeeting.attendees.length,
                " katılımcı"
              ] })
            ] })
          ] }),
          printMeeting.agendaItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-[#3A4654] uppercase mb-1", children: "GÜNDEM" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "list-decimal list-inside space-y-0.5", children: printMeeting.agendaItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-sm text-[#3A4654]", children: item.text }, item.id)) })
          ] }),
          printMeeting.attendeeList.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-[#3A4654] uppercase mb-1", children: "YOKLAMA" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: printMeeting.attendeeList.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                className: a.attended ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600",
                children: [
                  a.attended ? "✓" : "✕",
                  " ",
                  a.name
                ]
              },
              a.name
            )) })
          ] }),
          printMeeting.meetingNotes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-[#3A4654] uppercase mb-1", children: "TOPLANTI NOTLARI" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] bg-amber-50 rounded p-2", children: printMeeting.meetingNotes })
          ] }),
          printMeeting.decisions && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-[#3A4654] uppercase mb-1", children: "ALINAN KARARLAR" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] bg-green-50 rounded p-2", children: printMeeting.decisions })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "w-full gap-2",
            variant: "outline",
            onClick: () => window.print(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4" }),
              " Yazdır"
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
function MeetingCard({
  meeting,
  userId,
  isOwnerOrManager,
  statusColor,
  statusLabel,
  onAttend,
  onComplete,
  onDelete,
  onOpenDetail,
  onPrint,
  t
}) {
  const isPast = meeting.status === "completed" || meeting.status === "cancelled";
  const attendedCount = meeting.attendeeList.filter((a) => a.attended).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `bg-white rounded-xl border border-[#E2E8F0] p-5 ${isPast ? "opacity-75" : ""}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#0B1B2E]", children: meeting.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(meeting.status)}`,
                children: statusLabel(meeting.status)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 text-sm text-[#6B7A8D] mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
              meeting.date
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
              meeting.time
            ] }),
            meeting.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5" }),
              meeting.location
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
              meeting.attendees.length,
              " ",
              t.attendees || "katılımcı"
            ] }),
            meeting.attendeeList.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-green-600", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
              attendedCount,
              "/",
              meeting.attendeeList.length,
              " yoklama"
            ] })
          ] }),
          meeting.agendaItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 bg-[#F3F6FB] rounded p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-[#3A4654] mb-1", children: "Gündem Maddeleri:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc list-inside space-y-0.5", children: meeting.agendaItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-xs text-[#3A4654]", children: item.text }, item.id)) })
          ] }),
          (meeting.meetingNotes || meeting.decisions) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-1", children: [
            meeting.meetingNotes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 rounded p-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-amber-700 mb-0.5", children: "Toplantı Notları:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-800", children: meeting.meetingNotes })
            ] }),
            meeting.decisions && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 rounded p-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-green-700 mb-0.5", children: "Alınan Kararlar:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-800", children: meeting.decisions })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          !isPast && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: meeting.attendees.includes(userId) ? "outline" : "default",
              className: meeting.attendees.includes(userId) ? "border-green-500 text-green-700 hover:bg-green-50" : "bg-[#1A3A5C] hover:bg-[#0B1B2E] text-white",
              onClick: () => onAttend(meeting.id),
              children: meeting.attendees.includes(userId) ? t.meetingAttending || "Katılıyorum ✓" : t.meetingAttend || "Katılacağım"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "text-xs gap-1",
              onClick: () => onPrint(meeting),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3" }),
                " Tutanak"
              ]
            }
          ),
          isOwnerOrManager && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "text-xs",
                onClick: () => onOpenDetail(meeting),
                children: "Notlar / Kararlar"
              }
            ),
            !isPast && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "text-xs",
                onClick: () => onComplete(meeting.id),
                children: t.meetingMarkDone || "Tamamlandı"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "border-red-300 text-red-600 hover:bg-red-50",
                onClick: () => onDelete(meeting.id),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
export {
  MeetingManagement as default
};
