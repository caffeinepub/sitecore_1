import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, e as Badge, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-xOs1ph1v.js";
import { C as ChevronLeft } from "./chevron-left-Seqmd7Gm.js";
import { C as ChevronRight } from "./chevron-right-CWfj9I4K.js";
import { C as CircleCheckBig } from "./circle-check-big-7Z2Ce4Ly.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "m9 14 2 2 4-4", key: "df797q" }]
];
const ClipboardCheck = createLucideIcon("clipboard-check", __iconNode);
const CHECKLIST_ITEMS = [
  "Boya durumu",
  "Kapılar",
  "Pencereler",
  "Mutfak",
  "Banyo",
  "Elektrik prizleri",
  "Su tesisatı",
  "Sayaçlar",
  "Genel temizlik"
];
const DEFAULT_RECORDS = [
  {
    id: "1",
    apartmentNo: "5",
    residentName: "Ahmet Yıldız",
    date: "2026-04-01",
    timeSlot: "09:00-12:00",
    type: "Giriş",
    status: "Onaylandı",
    keyCount: 2,
    checklist: CHECKLIST_ITEMS.map((l) => ({
      label: l,
      status: "Tamam",
      note: ""
    })),
    notes: "Nakliye firması ile gelecek.",
    createdBy: "yönetici"
  },
  {
    id: "2",
    apartmentNo: "12",
    residentName: "Ayşe Demir",
    date: "2026-04-05",
    timeSlot: "13:00-17:00",
    type: "Çıkış",
    status: "Bekliyor",
    keyCount: 3,
    checklist: CHECKLIST_ITEMS.map((l) => ({
      label: l,
      status: "N/A",
      note: ""
    })),
    notes: "",
    createdBy: "yönetici"
  }
];
const KEY = (id) => `sitecore_moving_${id}`;
function MovingManagement({
  buildingId,
  userId,
  isOwner,
  t
}) {
  const [records, setRecords] = reactExports.useState(() => {
    const raw = localStorage.getItem(KEY(buildingId));
    return raw ? JSON.parse(raw) : DEFAULT_RECORDS;
  });
  const [showWizard, setShowWizard] = reactExports.useState(false);
  const [step, setStep] = reactExports.useState(0);
  const [detailRecord, setDetailRecord] = reactExports.useState(null);
  const [calMonth, setCalMonth] = reactExports.useState(
    (/* @__PURE__ */ new Date()).toISOString().slice(0, 7)
  );
  const [wizardForm, setWizardForm] = reactExports.useState({
    apartmentNo: "",
    residentName: "",
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    timeSlot: "09:00-12:00",
    type: "Giriş",
    keyCount: 1,
    notes: "",
    checklist: CHECKLIST_ITEMS.map((l) => ({
      label: l,
      status: "N/A",
      note: ""
    }))
  });
  const save = (u) => {
    setRecords(u);
    localStorage.setItem(KEY(buildingId), JSON.stringify(u));
  };
  const handleWizardNext = () => setStep((s) => Math.min(s + 1, 2));
  const handleWizardBack = () => setStep((s) => Math.max(s - 1, 0));
  const handleWizardSubmit = () => {
    if (!wizardForm.apartmentNo.trim()) return;
    const record = {
      id: crypto.randomUUID(),
      ...wizardForm,
      status: "Bekliyor",
      createdBy: userId
    };
    save([record, ...records]);
    setShowWizard(false);
    setStep(0);
    setWizardForm({
      apartmentNo: "",
      residentName: "",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      timeSlot: "09:00-12:00",
      type: "Giriş",
      keyCount: 1,
      notes: "",
      checklist: CHECKLIST_ITEMS.map((l) => ({
        label: l,
        status: "N/A",
        note: ""
      }))
    });
  };
  const handleStatusChange = (id, status) => {
    save(records.map((r) => r.id === id ? { ...r, status } : r));
  };
  const statusBadge = (status) => {
    if (status === "Bekliyor")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-100 text-yellow-700 border-0", children: "Bekliyor" });
    if (status === "Onaylandı")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-100 text-blue-700 border-0", children: "Onaylandı" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700 border-0", children: "Tamamlandı" });
  };
  const checklistDone = (checklist) => checklist.filter((c) => c.status !== "N/A").length;
  const checklistPct = (checklist) => Math.round(checklistDone(checklist) / checklist.length * 100);
  const calDates = records.filter((r) => r.date.startsWith(calMonth));
  const daysInMonth = new Date(
    Number(calMonth.slice(0, 4)),
    Number(calMonth.slice(5, 7)),
    0
  ).getDate();
  const firstDay = new Date(
    Number(calMonth.slice(0, 4)),
    Number(calMonth.slice(5, 7)) - 1,
    1
  ).getDay();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: t.moving || "Taşınma & Teslim Yönetimi" }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => {
            setStep(0);
            setShowWizard(true);
          },
          className: "bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full gap-2",
          "data-ocid": "moving.primary_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCheck, { className: "w-4 h-4" }),
            " Yeni Taşınma"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-yellow-600", children: records.filter((r) => r.status === "Bekliyor").length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654] mt-1", children: "Bekliyor" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-blue-600", children: records.filter((r) => r.status === "Onaylandı").length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654] mt-1", children: "Onaylandı" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-green-600", children: records.filter((r) => r.status === "Tamamlandı").length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654] mt-1", children: "Tamamlandı" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "list", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "list", children: "Liste" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "calendar", children: "Takvim" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "list", children: records.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "moving.empty_state",
          className: "py-10 text-center text-[#3A4654] bg-white rounded-2xl border border-[#E5EAF2]",
          children: "Kayıt bulunamadı."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: records.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `moving.item.${idx + 1}`,
          className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-[#0E1116]", children: [
                    "Daire ",
                    r.apartmentNo
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `border-0 text-xs ${r.type === "Giriş" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`,
                      children: r.type
                    }
                  ),
                  statusBadge(r.status)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#3A4654]", children: [
                  r.residentName,
                  " — ",
                  r.date,
                  " ",
                  r.timeSlot
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D]", children: [
                  r.keyCount,
                  " anahtar"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => setDetailRecord(r),
                    size: "sm",
                    variant: "outline",
                    className: "rounded-full text-xs",
                    children: "Detay"
                  }
                ),
                isOwner && r.status === "Bekliyor" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => handleStatusChange(r.id, "Onaylandı"),
                    size: "sm",
                    className: "bg-blue-500 text-white rounded-full text-xs",
                    children: "Onayla"
                  }
                ),
                isOwner && r.status === "Onaylandı" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => handleStatusChange(r.id, "Tamamlandı"),
                    size: "sm",
                    className: "bg-green-600 text-white rounded-full text-xs",
                    children: "Tamamla"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-[#6B7A8D] mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kontrol Listesi" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  checklistDone(r.checklist),
                  "/",
                  r.checklist.length,
                  " (",
                  checklistPct(r.checklist),
                  "%)"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-[#F3F6FB] rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full bg-[#4A90D9] rounded-full",
                  style: { width: `${checklistPct(r.checklist)}%` }
                }
              ) })
            ] })
          ]
        },
        r.id
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "calendar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-[#E5EAF2] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => {
                const d = /* @__PURE__ */ new Date(`${calMonth}-01`);
                d.setMonth(d.getMonth() - 1);
                setCalMonth(d.toISOString().slice(0, 7));
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#0E1116]", children: calMonth }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => {
                const d = /* @__PURE__ */ new Date(`${calMonth}-01`);
                d.setMonth(d.getMonth() + 1);
                setCalMonth(d.toISOString().slice(0, 7));
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1 text-center text-xs text-[#6B7A8D] mb-2", children: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: d }, d)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-7 gap-1", children: [
          Array.from({ length: firstDay }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: placeholder empty cells
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, `e${i}`)
          )),
          Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${calMonth}-${String(day).padStart(2, "0")}`;
            const dayRecords = calDates.filter((r) => r.date === dateStr);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `rounded-lg p-1 text-center text-xs ${dayRecords.length > 0 ? "bg-[#4A90D9]/10 border border-[#4A90D9]/30" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: day }),
                  dayRecords.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `mt-0.5 rounded text-xs px-0.5 truncate ${r.type === "Giriş" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`,
                      children: r.apartmentNo
                    },
                    r.id
                  ))
                ]
              },
              day
            );
          })
        ] })
      ] }) })
    ] }),
    detailRecord && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!detailRecord,
        onOpenChange: () => setDetailRecord(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
            "Daire ",
            detailRecord.apartmentNo,
            " - ",
            detailRecord.type,
            " Detayı"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]", children: "Sakin:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: detailRecord.residentName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]", children: "Tarih:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  detailRecord.date,
                  " ",
                  detailRecord.timeSlot
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]", children: "Anahtar:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  detailRecord.keyCount,
                  " adet"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]", children: "Durum:" }),
                statusBadge(detailRecord.status)
              ] }),
              detailRecord.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]", children: "Not:" }),
                " ",
                detailRecord.notes
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm mb-2", children: [
                "Kontrol Listesi (",
                checklistDone(detailRecord.checklist),
                "/",
                detailRecord.checklist.length,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: detailRecord.checklist.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between text-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `border-0 text-xs ${item.status === "Tamam" ? "bg-green-100 text-green-700" : item.status === "Sorunlu" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-500"}`,
                        children: item.status
                      }
                    )
                  ]
                },
                item.label
              )) })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: showWizard,
        onOpenChange: (v) => {
          if (!v) {
            setShowWizard(false);
            setStep(0);
          }
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Taşınma Kayıtı" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-4", children: ["Daire Seçimi", "Kontrol Listesi", "Onay"].map((label, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i <= step ? "bg-[#4A90D9] text-white" : "bg-[#E5EAF2] text-[#3A4654]"}`,
                children: i < step ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }) : i + 1
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs ${i <= step ? "text-[#0E1116]" : "text-[#3A4654]/50"}`,
                children: label
              }
            ),
            i < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `flex-1 h-0.5 ${i < step ? "bg-[#4A90D9]" : "bg-[#E5EAF2]"}`
              }
            )
          ] }, label)) }),
          step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Daire No *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: wizardForm.apartmentNo,
                    onChange: (e) => setWizardForm((p) => ({
                      ...p,
                      apartmentNo: e.target.value
                    })),
                    placeholder: "101",
                    "data-ocid": "moving.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Tip" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: wizardForm.type,
                    onChange: (e) => setWizardForm((p) => ({
                      ...p,
                      type: e.target.value
                    })),
                    className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Giriş", children: "Giriş" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Çıkış", children: "Çıkış" })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Sakin Adı" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: wizardForm.residentName,
                  onChange: (e) => setWizardForm((p) => ({
                    ...p,
                    residentName: e.target.value
                  })),
                  placeholder: "Ad Soyad"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Tarih" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "date",
                    value: wizardForm.date,
                    onChange: (e) => setWizardForm((p) => ({ ...p, date: e.target.value }))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Saat Aralığı" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    value: wizardForm.timeSlot,
                    onChange: (e) => setWizardForm((p) => ({ ...p, timeSlot: e.target.value })),
                    className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                    children: [
                      "09:00-12:00",
                      "13:00-17:00",
                      "10:00-14:00",
                      "14:00-18:00"
                    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Teslim Edilen Anahtar Sayısı" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: 1,
                  value: wizardForm.keyCount,
                  onChange: (e) => setWizardForm((p) => ({
                    ...p,
                    keyCount: Number(e.target.value)
                  }))
                }
              )
            ] })
          ] }),
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mb-2", children: "Her madde için durumu belirleyin:" }),
            wizardForm.checklist.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm flex-1", children: item.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: ["Tamam", "Sorunlu", "N/A"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: item.status === s ? "default" : "outline",
                      onClick: () => setWizardForm((p) => ({
                        ...p,
                        checklist: p.checklist.map(
                          (c, j) => j === i ? { ...c, status: s } : c
                        )
                      })),
                      className: `text-xs h-7 rounded-full ${item.status === s ? s === "Tamam" ? "bg-green-600 text-white" : s === "Sorunlu" ? "bg-red-500 text-white" : "bg-gray-400 text-white" : ""}`,
                      children: s
                    },
                    s
                  )) })
                ]
              },
              item.label
            ))
          ] }),
          step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F3F6FB] rounded-xl p-4 text-sm space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]", children: "Daire:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: wizardForm.apartmentNo })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]", children: "Tip:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: wizardForm.type })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]", children: "Tarih:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  wizardForm.date,
                  " ",
                  wizardForm.timeSlot
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]", children: "Kontrol:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  checklistDone(wizardForm.checklist),
                  "/",
                  wizardForm.checklist.length,
                  " tamamlandı"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Notlar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  value: wizardForm.notes,
                  onChange: (e) => setWizardForm((p) => ({ ...p, notes: e.target.value })),
                  className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm resize-none",
                  rows: 3,
                  placeholder: "Ek notlar..."
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
            step > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                onClick: handleWizardBack,
                className: "rounded-full gap-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                  " Geri"
                ]
              }
            ),
            step < 2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: handleWizardNext,
                disabled: step === 0 && !wizardForm.apartmentNo.trim(),
                className: "flex-1 bg-[#4A90D9] text-white rounded-full gap-1",
                children: [
                  "Devam ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleWizardSubmit,
                className: "flex-1 bg-green-600 text-white rounded-full",
                "data-ocid": "moving.submit_button",
                children: "Kaydet"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  MovingManagement as default
};
