import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, H as House, F as FileText, I as Input } from "./index-CC-G2BYq.js";
import { C as Card, a as CardContent } from "./card-klDLrOsd.js";
import { U as UserPlus } from "./user-plus-C-iTM30Q.js";
import { K as Key } from "./key-CGh9fIMt.js";
import { C as CheckCheck } from "./check-check-8LBXQxRO.js";
import { C as CircleCheck } from "./circle-check-DpdVvFPB.js";
import { C as Circle } from "./circle-BLVUYu6D.js";
const INITIAL = [
  {
    id: "1",
    residentName: "Ayşe Demir",
    apartment: "A-5",
    moveInDate: "2026-03-15",
    status: "completed",
    keyHandover: true,
    cardHandover: true,
    remoteHandover: true,
    buildingGuideShared: true,
    emergencyContactCollected: true,
    parkingAssigned: true,
    rulesAcknowledged: true,
    welcomePackageSent: true,
    notes: "Tüm teslim tamamlandı.",
    createdBy: "Yönetici"
  },
  {
    id: "2",
    residentName: "Can Kaya",
    apartment: "B-12",
    moveInDate: "2026-03-22",
    status: "in_progress",
    keyHandover: true,
    cardHandover: true,
    remoteHandover: false,
    buildingGuideShared: true,
    emergencyContactCollected: false,
    parkingAssigned: false,
    rulesAcknowledged: false,
    welcomePackageSent: false,
    notes: "Uzaktan kumanda temin ediliyor.",
    createdBy: "Yönetici"
  },
  {
    id: "3",
    residentName: "Zeynep Arslan",
    apartment: "C-3",
    moveInDate: "2026-04-01",
    status: "pending",
    keyHandover: false,
    cardHandover: false,
    remoteHandover: false,
    buildingGuideShared: false,
    emergencyContactCollected: false,
    parkingAssigned: false,
    rulesAcknowledged: false,
    welcomePackageSent: false,
    notes: "",
    createdBy: "Yönetici"
  }
];
const CHECKLIST_ITEMS = [
  { key: "keyHandover", label: "Anahtar Teslimi", icon: Key },
  { key: "cardHandover", label: "Giriş Kartı Teslimi", icon: Key },
  { key: "remoteHandover", label: "Uzaktan Kumanda Teslimi", icon: House },
  {
    key: "buildingGuideShared",
    label: "Bina Rehberi Paylaşıldı",
    icon: FileText
  },
  {
    key: "emergencyContactCollected",
    label: "Acil İletişim Bilgisi Alındı",
    icon: UserPlus
  },
  { key: "parkingAssigned", label: "Park Yeri Atandı", icon: House },
  {
    key: "rulesAcknowledged",
    label: "Bina Kuralları Onaylandı",
    icon: FileText
  },
  {
    key: "welcomePackageSent",
    label: "Hoş Geldin Paketi Gönderildi",
    icon: CheckCheck
  }
];
function getProgress(record) {
  const keys = CHECKLIST_ITEMS.map((i) => i.key);
  const done = keys.filter((k) => record[k] === true).length;
  return Math.round(done / keys.length * 100);
}
function statusLabel(status) {
  if (status === "completed")
    return { label: "Tamamlandı", color: "bg-green-100 text-green-700" };
  if (status === "in_progress")
    return { label: "Devam Ediyor", color: "bg-blue-100 text-blue-700" };
  return { label: "Bekliyor", color: "bg-gray-100 text-gray-700" };
}
function ResidentOnboarding({
  buildingId: _buildingId,
  isOwner
}) {
  const [records, setRecords] = reactExports.useState(INITIAL);
  const [selected, setSelected] = reactExports.useState(null);
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [newForm, setNewForm] = reactExports.useState({
    residentName: "",
    apartment: "",
    moveInDate: "",
    notes: ""
  });
  function toggleCheck(id, key) {
    setRecords(
      (prev) => prev.map((r) => {
        if (r.id !== id) return r;
        const updated = { ...r, [key]: !r[key] };
        const prog = getProgress(updated);
        updated.status = prog === 100 ? "completed" : prog > 0 ? "in_progress" : "pending";
        return updated;
      })
    );
    if ((selected == null ? void 0 : selected.id) === id) {
      setSelected((prev) => {
        if (!prev) return null;
        const updated = { ...prev, [key]: !prev[key] };
        const prog = getProgress(updated);
        updated.status = prog === 100 ? "completed" : prog > 0 ? "in_progress" : "pending";
        return updated;
      });
    }
  }
  function handleAdd() {
    if (!newForm.residentName || !newForm.apartment) return;
    const r = {
      id: Date.now().toString(),
      residentName: newForm.residentName,
      apartment: newForm.apartment,
      moveInDate: newForm.moveInDate,
      status: "pending",
      keyHandover: false,
      cardHandover: false,
      remoteHandover: false,
      buildingGuideShared: false,
      emergencyContactCollected: false,
      parkingAssigned: false,
      rulesAcknowledged: false,
      welcomePackageSent: false,
      notes: newForm.notes,
      createdBy: "Yönetici"
    };
    setRecords((prev) => [...prev, r]);
    setShowAdd(false);
    setNewForm({ residentName: "", apartment: "", moveInDate: "", notes: "" });
  }
  const completed = records.filter((r) => r.status === "completed").length;
  const inProgress = records.filter((r) => r.status === "in_progress").length;
  const pending = records.filter((r) => r.status === "pending").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-[#0E1116]", children: "Sakin Onboarding & Karşılama" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: "Yeni taşınan sakinler için dijital teslim ve karşılama sürecini yönetin" })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowAdd(true),
          className: "bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Yeni Sakin"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: [
      {
        label: "Tamamlandı",
        value: completed,
        color: "bg-green-100",
        textColor: "text-green-700"
      },
      {
        label: "Devam Ediyor",
        value: inProgress,
        color: "bg-blue-100",
        textColor: "text-blue-700"
      },
      {
        label: "Bekliyor",
        value: pending,
        color: "bg-gray-100",
        textColor: "text-gray-700"
      }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white border-none shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-2`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-bold text-lg ${s.textColor}`, children: s.value })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: s.label })
    ] }) }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: records.map((record) => {
      const progress = getProgress(record);
      const st = statusLabel(record.status);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "bg-white border-none shadow-sm cursor-pointer hover:shadow-md transition-shadow",
          onClick: () => setSelected(record),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[#F1F4F8] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-5 h-5 text-[#4A90D9]" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#0E1116]", children: record.residentName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D]", children: [
                    "Daire ",
                    record.apartment,
                    " • Taşınma:",
                    " ",
                    record.moveInDate || "—"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-medium px-3 py-1 rounded-full ${st.color}`,
                  children: st.label
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-[#6B7A8D] mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "İlerleme" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  progress,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-[#E5EAF2] rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `h-2 rounded-full transition-all ${progress === 100 ? "bg-green-500" : "bg-[#4A90D9]"}`,
                  style: { width: `${progress}%` }
                }
              ) })
            ] })
          ] })
        },
        record.id
      );
    }) }),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selected, onOpenChange: () => setSelected(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        selected.residentName,
        " — Daire ",
        selected.apartment
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-[#6B7A8D]", children: [
            "Taşınma Tarihi: ",
            selected.moveInDate || "—"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs font-medium px-2 py-1 rounded-full ${statusLabel(selected.status).color}`,
              children: statusLabel(selected.status).label
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-[#E5EAF2] rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-2 rounded-full bg-[#4A90D9] transition-all",
            style: { width: `${getProgress(selected)}%` }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: CHECKLIST_ITEMS.map(({ key, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg cursor-pointer hover:bg-[#F1F4F8] text-left",
            onKeyDown: (e) => e.key === "Enter" && toggleCheck(selected.id, key),
            onClick: () => toggleCheck(selected.id, key),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-[#6B7A8D]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-sm ${selected[key] ? "text-green-700 line-through" : "text-[#0E1116]"}`,
                    children: label
                  }
                )
              ] }),
              selected[key] ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-5 h-5 text-[#D7DEE9]" })
            ]
          },
          key
        )) }),
        selected.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-yellow-800", children: selected.notes }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAdd, onOpenChange: setShowAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Sakin Onboarding" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Sakin adı soyadı",
            value: newForm.residentName,
            onChange: (e) => setNewForm((p) => ({ ...p, residentName: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Daire (örn. A-5)",
            value: newForm.apartment,
            onChange: (e) => setNewForm((p) => ({ ...p, apartment: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: newForm.moveInDate,
            onChange: (e) => setNewForm((p) => ({ ...p, moveInDate: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            placeholder: "Notlar (isteğe bağlı)",
            value: newForm.notes,
            onChange: (e) => setNewForm((p) => ({ ...p, notes: e.target.value })),
            className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm min-h-[80px] resize-none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleAdd,
            disabled: !newForm.residentName || !newForm.apartment,
            className: "w-full bg-[#0B1B2E] text-white rounded-full",
            children: "Oluştur"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  ResidentOnboarding as default
};
