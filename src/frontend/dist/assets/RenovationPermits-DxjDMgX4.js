import { r as reactExports, j as jsxRuntimeExports, ay as HardHat, B as Button, P as Plus, e as Badge, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-CC-G2BYq.js";
import { T as Textarea } from "./textarea-BxfU_AZz.js";
import { C as CircleCheckBig } from "./circle-check-big-BNsB4jU7.js";
import { C as CircleX } from "./circle-x-CGL-aMSd.js";
const KEY = (id) => `sitecore_renovation_${id}`;
const WORK_TYPES = ["Elektrik", "Su Tesisatı", "Tadilat", "Boyama", "Diğer"];
const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  approved: "bg-green-100 text-green-700 border-green-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
  completed: "bg-gray-100 text-gray-600 border-gray-200"
};
const STATUS_LABELS = {
  pending: "Beklemede",
  approved: "Onaylandı",
  rejected: "Reddedildi",
  completed: "Tamamlandı"
};
function RenovationPermits({
  buildingId,
  userId: _userId,
  isOwner,
  t: _t
}) {
  const [permits, setPermits] = reactExports.useState(() => {
    try {
      const raw = localStorage.getItem(KEY(buildingId));
      if (raw) return JSON.parse(raw);
    } catch {
    }
    return [
      {
        id: "rp1",
        applicantName: "Ahmet Yılmaz",
        apartmentNo: "A-12",
        workType: "Tadilat",
        startDate: "2026-04-01",
        endDate: "2026-04-07",
        workHours: "09:00-17:00",
        affectedFloors: "4",
        description: "Mutfak dolap yenileme ve zemin kaplaması değişimi.",
        neighborNote: "4. kat komşular bilgilendirildi.",
        status: "approved",
        reviewNote: "Saatler uygun, onaylandı.",
        createdAt: "2026-03-20T10:00:00Z"
      },
      {
        id: "rp2",
        applicantName: "Sevda Kaya",
        apartmentNo: "B-7",
        workType: "Su Tesisatı",
        startDate: "2026-04-05",
        endDate: "2026-04-06",
        workHours: "10:00-16:00",
        affectedFloors: "3",
        description: "Banyo musluğu ve duş armatürü değişimi.",
        neighborNote: "Kısa süreli su kesintisi olabilir.",
        status: "pending",
        createdAt: "2026-03-22T14:30:00Z"
      },
      {
        id: "rp3",
        applicantName: "Murat Demir",
        apartmentNo: "C-3",
        workType: "Boyama",
        startDate: "2026-03-15",
        endDate: "2026-03-18",
        workHours: "08:00-18:00",
        affectedFloors: "1",
        description: "Tüm iç mekân boyama.",
        neighborNote: "",
        status: "completed",
        createdAt: "2026-03-10T09:00:00Z"
      }
    ];
  });
  const [showForm, setShowForm] = reactExports.useState(false);
  const [reviewTarget, setReviewTarget] = reactExports.useState(null);
  const [reviewNote, setReviewNote] = reactExports.useState("");
  const [form, setForm] = reactExports.useState({
    applicantName: "",
    apartmentNo: "",
    workType: "Tadilat",
    startDate: "",
    endDate: "",
    workHours: "08:00-18:00",
    affectedFloors: "",
    description: "",
    neighborNote: ""
  });
  const save = (list) => {
    setPermits(list);
    localStorage.setItem(KEY(buildingId), JSON.stringify(list));
  };
  const handleSubmit = () => {
    if (!form.applicantName || !form.apartmentNo || !form.startDate) return;
    const p = {
      id: Date.now().toString(),
      ...form,
      status: "pending",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    save([p, ...permits]);
    setShowForm(false);
    setForm({
      applicantName: "",
      apartmentNo: "",
      workType: "Tadilat",
      startDate: "",
      endDate: "",
      workHours: "08:00-18:00",
      affectedFloors: "",
      description: "",
      neighborNote: ""
    });
  };
  const handleReview = (action) => {
    if (!reviewTarget) return;
    save(
      permits.map(
        (p) => p.id === reviewTarget.id ? { ...p, status: action, reviewNote } : p
      )
    );
    setReviewTarget(null);
    setReviewNote("");
  };
  const handleComplete = (id) => {
    save(permits.map((p) => p.id === id ? { ...p, status: "completed" } : p));
  };
  const total = permits.length;
  const approved = permits.filter((p) => p.status === "approved").length;
  const pending = permits.filter((p) => p.status === "pending").length;
  const completed = permits.filter((p) => p.status === "completed").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HardHat, { className: "w-6 h-6 text-[#0B1B2E]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "İzin & Tadilat Yönetimi" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowForm(true),
          className: "bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Başvuru Oluştur"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
      { label: "Toplam", val: total, color: "text-[#0B1B2E]" },
      { label: "Onaylı", val: approved, color: "text-green-600" },
      { label: "Bekleyen", val: pending, color: "text-yellow-600" },
      { label: "Tamamlanan", val: completed, color: "text-gray-500" }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-3xl font-bold ${s.color}`, children: s.val }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: s.label })
        ]
      },
      s.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      permits.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-[#0E1116]", children: p.applicantName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[#EEF3FA] text-[#4A90D9] border-0 text-xs", children: p.apartmentNo }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-purple-50 text-purple-700 border-0 text-xs", children: p.workType }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `border text-xs ${STATUS_COLORS[p.status]}`,
                    children: STATUS_LABELS[p.status]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654]", children: p.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-2 text-xs text-[#6B7A8D]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "📅 ",
                  p.startDate,
                  " → ",
                  p.endDate
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "⏰ ",
                  p.workHours
                ] }),
                p.affectedFloors && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "🏢 ",
                  p.affectedFloors,
                  ". kat"
                ] })
              ] }),
              p.reviewNote && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D] mt-1 italic", children: [
                "Not: ",
                p.reviewNote
              ] })
            ] }) }),
            isOwner && p.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "bg-green-500 hover:bg-green-600 text-white rounded-full text-xs gap-1",
                onClick: () => setReviewTarget(p),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
                  " İncele"
                ]
              }
            ) }),
            isOwner && p.status === "approved" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "mt-2 text-xs rounded-full",
                onClick: () => handleComplete(p.id),
                children: "Tamamlandı İşaretle"
              }
            )
          ]
        },
        p.id
      )),
      permits.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654] text-center py-10", children: "Henüz başvuru bulunmuyor." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showForm, onOpenChange: setShowForm, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Tadilat İzin Başvurusu" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 max-h-[70vh] overflow-y-auto pr-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Başvuran Ad Soyad" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.applicantName,
                onChange: (e) => setForm((f) => ({ ...f, applicantName: e.target.value })),
                placeholder: "Ad Soyad"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Daire No" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.apartmentNo,
                onChange: (e) => setForm((f) => ({ ...f, apartmentNo: e.target.value })),
                placeholder: "A-12"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "İş Türü" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: form.workType,
              onChange: (e) => setForm((f) => ({ ...f, workType: e.target.value })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              children: WORK_TYPES.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: w }, w))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Başlangıç" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: form.startDate,
                onChange: (e) => setForm((f) => ({ ...f, startDate: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Bitiş" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: form.endDate,
                onChange: (e) => setForm((f) => ({ ...f, endDate: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Çalışma Saatleri" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.workHours,
                onChange: (e) => setForm((f) => ({ ...f, workHours: e.target.value })),
                placeholder: "08:00-18:00"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Etkilenen Kat(lar)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.affectedFloors,
                onChange: (e) => setForm((f) => ({ ...f, affectedFloors: e.target.value })),
                placeholder: "3, 4"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "İş Açıklaması" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: form.description,
              onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
              rows: 3,
              placeholder: "Yapılacak işleri açıklayın..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Komşu Bilgilendirme Notu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.neighborNote,
              onChange: (e) => setForm((f) => ({ ...f, neighborNote: e.target.value })),
              placeholder: "Komşulara iletilecek not (isteğe bağlı)"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleSubmit,
            disabled: !form.applicantName || !form.apartmentNo || !form.startDate,
            className: "w-full bg-[#4A90D9] text-white rounded-full",
            children: "Başvuru Gönder"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!reviewTarget,
        onOpenChange: () => {
          setReviewTarget(null);
          setReviewNote("");
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Başvuruyu İncele" }) }),
          reviewTarget && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#3A4654]", children: [
              reviewTarget.applicantName,
              " – ",
              reviewTarget.apartmentNo,
              " –",
              " ",
              reviewTarget.workType
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#0E1116]", children: reviewTarget.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "İnceleme Notu" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: reviewNote,
                  onChange: (e) => setReviewNote(e.target.value),
                  rows: 2,
                  placeholder: "İsteğe bağlı not..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "flex-1 bg-green-500 text-white rounded-full",
                  onClick: () => handleReview("approved"),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 mr-1" }),
                    " Onayla"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "flex-1 bg-red-500 text-white rounded-full",
                  onClick: () => handleReview("rejected"),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 mr-1" }),
                    " Reddet"
                  ]
                }
              )
            ] })
          ] })
        ] })
      }
    )
  ] });
}
export {
  RenovationPermits as default
};
