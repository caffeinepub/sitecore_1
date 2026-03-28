import { u as useTranslation, r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, v as MapPin, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-5GfTJQeF.js";
import { T as Trash2 } from "./trash-2-Bx-JrzAk.js";
import { C as Clock } from "./clock-DZCCrSDd.js";
import { C as CircleCheckBig } from "./circle-check-big-D0ItIWGR.js";
import { C as CircleX } from "./circle-x-Dv3wZD8_.js";
function CommonAreaReservation({
  userId,
  isOwnerOrManager
}) {
  const { t } = useTranslation();
  const [areas, setAreas] = reactExports.useState([
    {
      id: "1",
      name: t.areaGym || "Spor Salonu",
      description: "",
      capacity: 10
    },
    {
      id: "2",
      name: t.areaMeetingRoom || "Toplantı Odası",
      description: "",
      capacity: 20
    },
    {
      id: "3",
      name: t.areaGarden || "Bahçe / Teras",
      description: "",
      capacity: 50
    }
  ]);
  const [reservations, setReservations] = reactExports.useState([]);
  const [showReserveModal, setShowReserveModal] = reactExports.useState(false);
  const [showAreaModal, setShowAreaModal] = reactExports.useState(false);
  const [conflictWarning, setConflictWarning] = reactExports.useState(false);
  const [pendingReservation, setPendingReservation] = reactExports.useState(null);
  const [selectedArea, setSelectedArea] = reactExports.useState("");
  const [resDate, setResDate] = reactExports.useState("");
  const [resStart, setResStart] = reactExports.useState("");
  const [resEnd, setResEnd] = reactExports.useState("");
  const [resPurpose, setResPurpose] = reactExports.useState("");
  const [newAreaName, setNewAreaName] = reactExports.useState("");
  const [newAreaCapacity, setNewAreaCapacity] = reactExports.useState("");
  const [calMonth, setCalMonth] = reactExports.useState(() => {
    const n = /* @__PURE__ */ new Date();
    return { year: n.getFullYear(), month: n.getMonth() };
  });
  const checkConflict = (areaId, date, start, end, excludeId) => {
    return reservations.some((r) => {
      if (r.id === excludeId || r.areaId !== areaId || r.date !== date || r.status === "rejected")
        return false;
      if (r.status !== "approved") return false;
      return start < r.endTime && end > r.startTime;
    });
  };
  const handleReserve = () => {
    if (!selectedArea || !resDate || !resStart || !resEnd) return;
    const newRes = {
      id: Date.now().toString(),
      areaId: selectedArea,
      userId,
      date: resDate,
      startTime: resStart,
      endTime: resEnd,
      purpose: resPurpose,
      status: "pending",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const hasConflict = checkConflict(selectedArea, resDate, resStart, resEnd);
    if (hasConflict) {
      setPendingReservation(newRes);
      setConflictWarning(true);
      return;
    }
    confirmReservation(newRes);
  };
  const confirmReservation = (res) => {
    setReservations([res, ...reservations]);
    setShowReserveModal(false);
    setConflictWarning(false);
    setPendingReservation(null);
    setResDate("");
    setResStart("");
    setResEnd("");
    setResPurpose("");
  };
  const handleAddArea = () => {
    if (!newAreaName) return;
    setAreas([
      ...areas,
      {
        id: Date.now().toString(),
        name: newAreaName,
        description: "",
        capacity: Number(newAreaCapacity) || 0
      }
    ]);
    setNewAreaName("");
    setNewAreaCapacity("");
    setShowAreaModal(false);
  };
  const handleDeleteArea = (areaId) => {
    setAreas(areas.filter((a) => a.id !== areaId));
    setReservations(reservations.filter((r) => r.areaId !== areaId));
  };
  const handleApprove = (resId) => setReservations(
    reservations.map(
      (r) => r.id === resId ? { ...r, status: "approved" } : r
    )
  );
  const handleReject = (resId) => setReservations(
    reservations.map(
      (r) => r.id === resId ? { ...r, status: "rejected" } : r
    )
  );
  const handleDeleteRes = (resId) => setReservations(reservations.filter((r) => r.id !== resId));
  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
    }
  };
  const statusLabel = (status) => {
    switch (status) {
      case "pending":
        return t.resPending || "Onay Bekliyor";
      case "approved":
        return t.resApproved || "Onayandı";
      case "rejected":
        return t.resRejected || "Reddedildi";
    }
  };
  const myReservations = reservations.filter((r) => r.userId === userId);
  const pendingReservations = reservations.filter(
    (r) => r.status === "pending"
  );
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  const getReservationsOnDay = (day) => {
    const dateStr = `${calMonth.year}-${String(calMonth.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return reservations.filter((r) => r.date === dateStr);
  };
  const monthNames = [
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
  const dayNames = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
  const AREA_COLORS = [
    "bg-blue-400",
    "bg-green-400",
    "bg-purple-400",
    "bg-orange-400",
    "bg-pink-400"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-[#0B1B2E]", children: t.commonAreas || "Ortak Alan Rezervasyonu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#6B7A8D] mt-1", children: [
          areas.length,
          " ",
          t.areasAvailable || "alan mevcut"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        isOwnerOrManager && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowAreaModal(true),
            variant: "outline",
            className: "gap-2 border-[#1A3A5C] text-[#1A3A5C]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              t.addArea || "Alan Ekle"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowReserveModal(true),
            className: "bg-[#1A3A5C] hover:bg-[#0B1B2E] text-white gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              t.makeReservation || "Rezervasyon Yap"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: areas.map((area) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-white rounded-xl border border-[#E2E8F0] p-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-[#1A3A5C]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#0B1B2E]", children: area.name })
              ] }),
              area.capacity > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D] mt-1", children: [
                t.capacity || "Kapasite",
                ": ",
                area.capacity
              ] })
            ] }),
            isOwnerOrManager && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "text-red-400 hover:text-red-600 hover:bg-red-50 p-1",
                onClick: () => handleDeleteArea(area.id),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full mt-3 bg-[#F3F6FB] hover:bg-[#E2E8F0] text-[#1A3A5C] text-sm",
              variant: "outline",
              onClick: () => {
                setSelectedArea(area.id);
                setShowReserveModal(true);
              },
              children: t.makeReservation || "Rezervasyon Yap"
            }
          )
        ]
      },
      area.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "list", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-[#F3F6FB]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "list", "data-ocid": "reservations.tab", children: "Liste Görünümü" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "calendar", "data-ocid": "reservations.tab", children: "Takvim Görünümü" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "list", className: "mt-4 space-y-4", children: [
        isOwnerOrManager && pendingReservations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-[#3A4654] uppercase tracking-wide", children: [
            t.pendingApprovals || "Onay Bekleyen Rezervasyonlar",
            " (",
            pendingReservations.length,
            ")"
          ] }),
          pendingReservations.map((res) => {
            const area = areas.find((a) => a.id === res.areaId);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-white rounded-xl border border-yellow-200 p-4",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[#0B1B2E]", children: area == null ? void 0 : area.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-sm text-[#6B7A8D] mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: res.date }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                        res.startTime,
                        " - ",
                        res.endTime
                      ] }),
                      res.purpose && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: res.purpose })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        className: "bg-green-600 hover:bg-green-700 text-white gap-1",
                        onClick: () => handleApprove(res.id),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
                          t.approve || "Onayla"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "border-red-300 text-red-600 hover:bg-red-50 gap-1",
                        onClick: () => handleReject(res.id),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" }),
                          t.reject || "Reddet"
                        ]
                      }
                    )
                  ] })
                ] })
              },
              res.id
            );
          })
        ] }),
        myReservations.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-[#3A4654] uppercase tracking-wide", children: t.myReservations || "Rezervasyonlarım" }),
          myReservations.map((res) => {
            const area = areas.find((a) => a.id === res.areaId);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-white rounded-xl border border-[#E2E8F0] p-4",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[#0B1B2E]", children: area == null ? void 0 : area.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(res.status)}`,
                          children: statusLabel(res.status)
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-sm text-[#6B7A8D] mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: res.date }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                        res.startTime,
                        " - ",
                        res.endTime
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "border-red-300 text-red-600 hover:bg-red-50",
                      onClick: () => handleDeleteRes(res.id),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] })
              },
              res.id
            );
          })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E2E8F0] p-10 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-10 h-10 text-[#B0BAC6] mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: t.noReservations || "Henüz rezervasyon yapılmadı." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "calendar", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E2E8F0] p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setCalMonth((p) => {
                const d = new Date(p.year, p.month - 1, 1);
                return { year: d.getFullYear(), month: d.getMonth() };
              }),
              className: "px-3 py-1 rounded-lg bg-[#F3F6FB] hover:bg-[#E2E8F0] text-sm",
              children: "<"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-[#0B1B2E]", children: [
            monthNames[calMonth.month],
            " ",
            calMonth.year
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setCalMonth((p) => {
                const d = new Date(p.year, p.month + 1, 1);
                return { year: d.getFullYear(), month: d.getMonth() };
              }),
              className: "px-3 py-1 rounded-lg bg-[#F3F6FB] hover:bg-[#E2E8F0] text-sm",
              children: ">"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1 mb-2", children: dayNames.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center text-xs font-semibold text-[#6B7A8D] py-1",
            children: d
          },
          d
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-7 gap-1", children: [
          Array.from({
            length: getFirstDayOfMonth(calMonth.year, calMonth.month)
          }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: grid placeholders
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, `empty-${i}`)
          )),
          Array.from(
            { length: getDaysInMonth(calMonth.year, calMonth.month) },
            (_, i) => i + 1
          ).map((day) => {
            const dayRes = getReservationsOnDay(day);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "min-h-[52px] border border-[#F0F3F8] rounded-lg p-1 hover:bg-[#F9FAFB]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#3A4654] font-medium mb-1", children: day }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5", children: dayRes.slice(0, 3).map((r, ri) => {
                    var _a;
                    const area = areas.find((a) => a.id === r.areaId);
                    const colorIdx = areas.findIndex(
                      (a) => a.id === r.areaId
                    );
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `text-white text-xs px-1 rounded truncate ${AREA_COLORS[colorIdx % AREA_COLORS.length]}`,
                        title: `${area == null ? void 0 : area.name} ${r.startTime}-${r.endTime}`,
                        children: ri < 2 ? `${r.startTime} ${(_a = area == null ? void 0 : area.name) == null ? void 0 : _a.slice(0, 6)}` : `+${dayRes.length - 2}`
                      },
                      r.id
                    );
                  }) })
                ]
              },
              day
            );
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 mt-4 pt-4 border-t border-[#F0F3F8]", children: areas.map((area, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-3 h-3 rounded-full ${AREA_COLORS[i % AREA_COLORS.length]}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: area.name })
        ] }, area.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: conflictWarning,
        onOpenChange: () => setConflictWarning(false),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Çakışma Uyarısı" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654]", children: "Seçtiğiniz tarih ve saatte bu alan için onaylanmış bir rezervasyon mevcut. Yine de devam etmek istiyor musunuz?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1 bg-[#1A3A5C] text-white",
                onClick: () => pendingReservation && confirmReservation(pendingReservation),
                children: "Devam Et"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => {
                  setConflictWarning(false);
                  setPendingReservation(null);
                },
                children: "İptal"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showReserveModal, onOpenChange: setShowReserveModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t.makeReservation || "Rezervasyon Yap" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "area-1",
              className: "text-sm font-medium text-[#3A4654] mb-1 block",
              children: t.selectArea || "Alan Seçin"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "area-1",
              className: "w-full border border-[#E2E8F0] rounded-lg p-2.5 text-sm text-[#0B1B2E] focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]",
              value: selectedArea,
              onChange: (e) => setSelectedArea(e.target.value),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: t.selectArea || "Alan Seçin" }),
                areas.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: a.id, children: a.name }, a.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "area-2",
              className: "text-sm font-medium text-[#3A4654] mb-1 block",
              children: t.meetingDate || "Tarih"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "area-2",
              type: "date",
              value: resDate,
              onChange: (e) => setResDate(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "area-3",
                className: "text-sm font-medium text-[#3A4654] mb-1 block",
                children: t.startTime || "Başlangıç"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "area-3",
                type: "time",
                value: resStart,
                onChange: (e) => setResStart(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "area-4",
                className: "text-sm font-medium text-[#3A4654] mb-1 block",
                children: t.endTime || "Bitiş"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "area-4",
                type: "time",
                value: resEnd,
                onChange: (e) => setResEnd(e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "area-5",
              className: "text-sm font-medium text-[#3A4654] mb-1 block",
              children: t.resPurpose || "Kullanım Amacı"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "area-5",
              value: resPurpose,
              onChange: (e) => setResPurpose(e.target.value),
              placeholder: t.resPurposePlaceholder || "Spor, Toplantı"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: t.reservationNote || "Rezervasyonunuz yönetici onayından sonra aktif olacaktır." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowReserveModal(false),
              children: t.cancel || "İptal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "bg-[#1A3A5C] hover:bg-[#0B1B2E] text-white",
              onClick: handleReserve,
              children: t.sendRequest || "Talep Gönder"
            }
          )
        ] })
      ] })
    ] }) }),
    isOwnerOrManager && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAreaModal, onOpenChange: setShowAreaModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t.addArea || "Yeni Alan Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "area-6",
              className: "text-sm font-medium text-[#3A4654] mb-1 block",
              children: t.areaName || "Alan Adı"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "area-6",
              value: newAreaName,
              onChange: (e) => setNewAreaName(e.target.value),
              placeholder: t.areaNamePlaceholder || "Yüzme Havuzu"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "area-7",
              className: "text-sm font-medium text-[#3A4654] mb-1 block",
              children: t.capacity || "Kapasite"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "area-7",
              type: "number",
              value: newAreaCapacity,
              onChange: (e) => setNewAreaCapacity(e.target.value),
              placeholder: "0"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowAreaModal(false),
              children: t.cancel || "İptal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "bg-[#1A3A5C] hover:bg-[#0B1B2E] text-white",
              onClick: handleAddArea,
              children: t.save || "Kaydet"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  CommonAreaReservation as default
};
