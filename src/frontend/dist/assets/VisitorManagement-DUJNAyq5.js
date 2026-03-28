import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, e as Badge, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input, aB as UserCheck } from "./index-huPFjtKr.js";
import { S as Star } from "./star-BlEaAjXm.js";
const APT_KEY = (id) => `sitecore_apartments_${id}`;
const VIS_KEY = (id) => `sitecore_visitors_${id}`;
function VisitorManagement({
  buildingId,
  isOwner: _isOwner,
  t
}) {
  const [apartments, setApartments] = reactExports.useState([]);
  const [visitors, setVisitors] = reactExports.useState([]);
  const [showDialog, setShowDialog] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    name: "",
    apartmentId: "",
    expectedDate: "",
    description: ""
  });
  reactExports.useEffect(() => {
    const raw = localStorage.getItem(APT_KEY(buildingId));
    if (raw) setApartments(JSON.parse(raw));
    const vRaw = localStorage.getItem(VIS_KEY(buildingId));
    if (vRaw) setVisitors(JSON.parse(vRaw));
  }, [buildingId]);
  const save = (updated) => {
    setVisitors(updated);
    localStorage.setItem(VIS_KEY(buildingId), JSON.stringify(updated));
  };
  const resetForm = () => setForm({ name: "", apartmentId: "", expectedDate: "", description: "" });
  const handleAdd = () => {
    if (!form.name.trim()) return;
    const v = {
      id: crypto.randomUUID(),
      buildingId,
      name: form.name.trim(),
      apartmentId: form.apartmentId,
      expectedDate: form.expectedDate,
      description: form.description.trim(),
      status: "expected",
      createdAt: Date.now()
    };
    save([...visitors, v]);
    setShowDialog(false);
    resetForm();
  };
  const updateStatus = (id, status) => {
    save(
      visitors.map(
        (v) => v.id === id ? {
          ...v,
          status,
          arrivedAt: status === "arrived" ? Date.now() : v.arrivedAt,
          leftAt: status === "left" ? Date.now() : v.leftAt
        } : v
      )
    );
  };
  const getAptLabel = (aptId) => {
    const apt = apartments.find((a) => a.id === aptId);
    if (!apt) return aptId;
    return `${apt.block ? `${apt.block}-` : ""}${apt.number}`;
  };
  const getDuration = (v) => {
    if (v.arrivedAt && v.leftAt) {
      const mins = Math.round((v.leftAt - v.arrivedAt) / 6e4);
      if (mins < 60) return `${mins} dk`;
      return `${Math.floor(mins / 60)}s ${mins % 60}dk`;
    }
    return null;
  };
  const statusBadge = (status) => {
    if (status === "arrived")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-100 text-blue-700 border-blue-200", children: t.markArrived });
    if (status === "left")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gray-100 text-gray-600 border-gray-200", children: t.markLeft });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-100 text-yellow-700 border-yellow-200", children: t.expectedVisitors });
  };
  const visitorCounts = {};
  for (const v of visitors) {
    visitorCounts[v.name] = (visitorCounts[v.name] || 0) + 1;
  }
  const frequent = Object.entries(visitorCounts).filter(([, c]) => c >= 2).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const today = (/* @__PURE__ */ new Date()).toDateString();
  const todayCount = visitors.filter(
    (v) => new Date(v.createdAt).toDateString() === today
  ).length;
  const weekAgo = Date.now() - 7 * 864e5;
  const weekCount = visitors.filter((v) => v.createdAt > weekAgo).length;
  const completed = visitors.filter((v) => v.arrivedAt && v.leftAt);
  const avgDuration = completed.length > 0 ? Math.round(
    completed.reduce(
      (acc, v) => acc + (v.leftAt - v.arrivedAt) / 6e4,
      0
    ) / completed.length
  ) : 0;
  const expected = visitors.filter((v) => v.status === "expected");
  const active = visitors.filter((v) => v.status === "arrived");
  const past = visitors.filter((v) => v.status === "left");
  const VisitorCard = ({ v, idx }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `visitors.item.${idx + 1}`,
      className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#0E1116]", children: v.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#3A4654] mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3 h-3 inline mr-1" }),
              t.visitingApartment,
              ": ",
              getAptLabel(v.apartmentId) || "-"
            ] }),
            v.expectedDate && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654]/60 mt-0.5", children: new Date(v.expectedDate).toLocaleString() }),
            v.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1", children: v.description }),
            getDuration(v) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-green-600 mt-1", children: [
              "Süre: ",
              getDuration(v)
            ] })
          ] }),
          statusBadge(v.status)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3", children: [
          v.status === "expected" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": `visitors.toggle.${idx + 1}`,
              onClick: () => updateStatus(v.id, "arrived"),
              size: "sm",
              className: "bg-blue-500 hover:bg-blue-600 text-white rounded-full text-xs",
              children: t.markArrived
            }
          ),
          v.status === "arrived" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => updateStatus(v.id, "left"),
              size: "sm",
              variant: "outline",
              className: "rounded-full text-xs",
              children: t.markLeft
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: t.visitors }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "visitors.primary_button",
          onClick: () => setShowDialog(true),
          className: "bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            t.addVisitor
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-yellow-600", children: expected.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654] text-xs mt-1", children: t.expectedVisitors })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-blue-600", children: active.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654] text-xs mt-1", children: t.activeVisitors })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0E1116]", children: todayCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654] text-xs mt-1", children: "Bugün" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-purple-600", children: avgDuration > 0 ? `${avgDuration}dk` : "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654] text-xs mt-1", children: "Ort. Süre" })
      ] })
    ] }),
    frequent.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-[#0E1116] mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-yellow-500" }),
        " Sık Ziyaretçiler"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: frequent.map(([name, count]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-1 bg-[#F3F6FB] rounded-full px-3 py-1 text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-yellow-100 text-yellow-700 border-0 text-xs ml-1", children: [
              count,
              "x"
            ] })
          ]
        },
        name
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "expected", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { "data-ocid": "visitors.tab", value: "expected", children: [
          t.expectedVisitors,
          " (",
          expected.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "active", children: [
          t.activeVisitors,
          " (",
          active.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "past", children: [
          t.visitHistory,
          " (",
          past.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "stats", children: [
          "Bu Hafta (",
          weekCount,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "expected", children: expected.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "visitors.empty_state",
          className: "py-10 text-center text-[#3A4654]",
          children: t.noVisitors
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: expected.map((v, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(VisitorCard, { v, idx }, v.id)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "active", children: active.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-10 text-center text-[#3A4654]", children: t.noVisitors }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: active.map((v, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(VisitorCard, { v, idx }, v.id)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "past", children: past.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-10 text-center text-[#3A4654]", children: t.noVisitors }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: past.map((v, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(VisitorCard, { v, idx }, v.id)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "stats", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#0E1116] mb-4", children: "Bu Haftaki Ziyaretçiler" }),
        visitors.filter((v) => v.createdAt > weekAgo).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[#3A4654] py-6", children: "Bu hafta ziyaretçi yok." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: visitors.filter((v) => v.createdAt > weekAgo).map((v, _idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex justify-between items-center border-b border-[#E5EAF2] pb-2 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: v.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                getDuration(v) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-600", children: getDuration(v) }),
                statusBadge(v.status)
              ] })
            ]
          },
          v.id
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showDialog, onOpenChange: setShowDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t.addVisitor }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: [
            t.visitorName,
            " *"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "visitors.input",
              value: form.name,
              onChange: (e) => setForm((p) => ({ ...p, name: e.target.value })),
              placeholder: "Ad Soyad"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.visitingApartment }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.apartmentId,
              onChange: (e) => setForm((p) => ({ ...p, apartmentId: e.target.value })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "-" }),
                apartments.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: a.id, children: [
                  a.block ? `${a.block}-` : "",
                  a.number,
                  " ",
                  a.residentName ? `(${a.residentName})` : ""
                ] }, a.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.expectedDate }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "datetime-local",
              value: form.expectedDate,
              onChange: (e) => setForm((p) => ({ ...p, expectedDate: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.description,
              onChange: (e) => setForm((p) => ({ ...p, description: e.target.value })),
              placeholder: "Ziyaret amacı..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "visitors.submit_button",
            onClick: handleAdd,
            disabled: !form.name.trim(),
            className: "w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full",
            children: t.addVisitor
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  VisitorManagement as default
};
