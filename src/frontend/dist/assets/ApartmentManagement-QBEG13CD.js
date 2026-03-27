import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, H as House, U as Users, W as Wrench, e as Badge, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, I as Input } from "./index-Gmz9ZzBN.js";
import { E as Eye } from "./eye-zb6SThZI.js";
import { P as Pen } from "./pen-DjyoHW3w.js";
import { T as Trash2 } from "./trash-2-DAeM7uDy.js";
const STORAGE_KEY = (id) => `sitecore_apartments_${id}`;
const DUES_KEY = (id) => `sitecore_dues_${id}`;
const MAINT_KEY = (id) => `sitecore_maintenance_${id}`;
const APT_TYPES = ["Stüdyo", "1+1", "2+1", "3+1", "4+1", "Diğer"];
const STATUSES = [
  { value: "occupied", label: "Dolu", color: "bg-green-100 text-green-700" },
  { value: "empty", label: "Boş", color: "bg-gray-100 text-gray-600" },
  {
    value: "maintenance",
    label: "Bakımda",
    color: "bg-orange-100 text-orange-700"
  }
];
const EMPTY_TENANT = {
  ownerName: "",
  ownerPhone: "",
  ownerTc: "",
  ownerEmail: "",
  tenantName: "",
  tenantPhone: "",
  tenantTc: "",
  tenantEmail: "",
  leaseStart: "",
  leaseEnd: "",
  monthlyRent: "",
  deposit: ""
};
function ApartmentManagement({
  buildingId,
  userId: _userId,
  isOwner,
  t
}) {
  const [apartments, setApartments] = reactExports.useState([]);
  const [dues, setDues] = reactExports.useState([]);
  const [maintenance, setMaintenance] = reactExports.useState([]);
  const [showDialog, setShowDialog] = reactExports.useState(false);
  const [detailApt, setDetailApt] = reactExports.useState(null);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const [tenantInfoMap, setTenantInfoMap] = reactExports.useState({});
  const [editingTenant, setEditingTenant] = reactExports.useState(EMPTY_TENANT);
  const [form, setForm] = reactExports.useState({
    number: "",
    floor: "",
    block: "",
    type: "2+1",
    residentName: "",
    residentUserId: "",
    status: "occupied"
  });
  reactExports.useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY(buildingId));
    if (raw) {
      const apts = JSON.parse(raw);
      setApartments(apts);
      const map = {};
      for (const apt of apts) {
        const tRaw = localStorage.getItem(
          `sitecore_tenant_${buildingId}_${apt.id}`
        );
        if (tRaw) map[apt.id] = JSON.parse(tRaw);
      }
      setTenantInfoMap(map);
    }
    const dRaw = localStorage.getItem(DUES_KEY(buildingId));
    if (dRaw) setDues(JSON.parse(dRaw));
    const mRaw = localStorage.getItem(MAINT_KEY(buildingId));
    if (mRaw) setMaintenance(JSON.parse(mRaw));
  }, [buildingId]);
  const save = (updated) => {
    setApartments(updated);
    localStorage.setItem(STORAGE_KEY(buildingId), JSON.stringify(updated));
  };
  const saveTenantInfo = (aptId, info) => {
    const updated = { ...tenantInfoMap, [aptId]: info };
    setTenantInfoMap(updated);
    localStorage.setItem(
      `sitecore_tenant_${buildingId}_${aptId}`,
      JSON.stringify(info)
    );
  };
  const resetForm = () => setForm({
    number: "",
    floor: "",
    block: "",
    type: "2+1",
    residentName: "",
    residentUserId: "",
    status: "occupied"
  });
  const openAdd = () => {
    setEditTarget(null);
    resetForm();
    setShowDialog(true);
  };
  const openEdit = (apt) => {
    setEditTarget(apt);
    setForm({
      number: apt.number,
      floor: String(apt.floor),
      block: apt.block,
      type: apt.type,
      residentName: apt.residentName,
      residentUserId: apt.residentUserId,
      status: apt.status || "occupied"
    });
    setShowDialog(true);
  };
  const handleSubmit = () => {
    if (!form.number.trim()) return;
    if (editTarget) {
      const updated = apartments.map(
        (a) => a.id === editTarget.id ? {
          ...a,
          number: form.number.trim(),
          floor: Number(form.floor) || 0,
          block: form.block.trim(),
          type: form.type,
          residentName: form.residentName.trim(),
          residentUserId: form.residentUserId.trim(),
          status: form.status
        } : a
      );
      save(updated);
    } else {
      const newApt = {
        id: crypto.randomUUID(),
        buildingId,
        number: form.number.trim(),
        floor: Number(form.floor) || 0,
        block: form.block.trim(),
        type: form.type,
        residentName: form.residentName.trim(),
        residentUserId: form.residentUserId.trim(),
        status: form.status,
        createdAt: Date.now()
      };
      save([...apartments, newApt]);
    }
    setShowDialog(false);
    resetForm();
  };
  const handleDelete = (id) => save(apartments.filter((a) => a.id !== id));
  const getStatus = (apt) => apt.status || (apt.residentName ? "occupied" : "empty");
  const statusInfo = (val) => STATUSES.find((s) => s.value === val) || STATUSES[0];
  const filtered = filterStatus === "all" ? apartments : apartments.filter((a) => getStatus(a) === filterStatus);
  const occupied = apartments.filter((a) => getStatus(a) === "occupied").length;
  const empty = apartments.filter((a) => getStatus(a) === "empty").length;
  const inMaint = apartments.filter(
    (a) => getStatus(a) === "maintenance"
  ).length;
  const aptDues = (aptNo) => dues.filter(
    (d) => d.apartmentNumber === aptNo || d.apartmentNo === aptNo
  );
  const aptMaint = (aptId) => maintenance.filter((m) => m.apartmentId === aptId);
  const hasTenant = (aptId) => {
    var _a;
    return !!((_a = tenantInfoMap[aptId]) == null ? void 0 : _a.tenantName);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: t.apartments }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "apartments.primary_button",
          onClick: openAdd,
          className: "bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            t.addApartment
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-[#0B1B2E]", children: apartments.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[#3A4654] text-sm mt-1 flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-3 h-3" }),
          " ",
          t.totalApartments
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-green-600", children: occupied }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[#3A4654] text-sm mt-1 flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
          " Dolu"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-[#F2A23A]", children: empty }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654] text-sm mt-1", children: t.emptyApartments })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-orange-500", children: inMaint }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[#3A4654] text-sm mt-1 flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-3 h-3" }),
          " Bakımda"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-4", children: ["all", "occupied", "empty", "maintenance"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        size: "sm",
        variant: filterStatus === s ? "default" : "outline",
        onClick: () => setFilterStatus(s),
        className: filterStatus === s ? "bg-[#4A90D9] text-white rounded-full" : "rounded-full",
        children: s === "all" ? "Tümü" : statusInfo(s).label
      },
      s
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl shadow-sm border border-[#E5EAF2] overflow-hidden", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "apartments.empty_state",
        className: "py-12 text-center text-[#3A4654]",
        children: t.noApartments
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F3F6FB] border-b border-[#E5EAF2]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-sm font-semibold text-[#3A4654]", children: t.apartmentNumber }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-sm font-semibold text-[#3A4654]", children: t.floor }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-sm font-semibold text-[#3A4654]", children: t.block }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-sm font-semibold text-[#3A4654]", children: t.apartmentType }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-sm font-semibold text-[#3A4654]", children: t.resident }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-sm font-semibold text-[#3A4654]", children: "Durum" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-sm font-semibold text-[#3A4654]", children: "Kiracı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((apt, idx) => {
        const st = statusInfo(getStatus(apt));
        const tenant = hasTenant(apt.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            "data-ocid": `apartments.item.${idx + 1}`,
            className: "border-b border-[#E5EAF2] last:border-0 hover:bg-[#F9FAFB]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-[#0E1116]", children: apt.number }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#3A4654]", children: apt.floor }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#3A4654]", children: apt.block || "-" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[#EEF3FA] text-[#4A90D9] border-0 text-xs", children: apt.type }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: apt.residentName ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0E1116]", children: apt.residentName }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]/50 text-sm", children: t.noResident }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `${st.color} border-0 text-xs`, children: st.label }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: tenant ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-purple-100 text-purple-700 border-0 text-xs", children: "Kiracı Var" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gray-100 text-gray-500 border-0 text-xs", children: "Malik" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => {
                      setDetailApt(apt);
                      setEditingTenant(
                        tenantInfoMap[apt.id] || EMPTY_TENANT
                      );
                    },
                    variant: "ghost",
                    size: "sm",
                    className: "text-[#4A90D9] hover:text-[#3B82C4] h-7 w-7 p-0",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
                  }
                ),
                isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      "data-ocid": `apartments.edit_button.${idx + 1}`,
                      onClick: () => openEdit(apt),
                      variant: "ghost",
                      size: "sm",
                      className: "text-[#4A90D9] hover:text-[#3B82C4] h-7 w-7 p-0",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      "data-ocid": `apartments.delete_button.${idx + 1}`,
                      onClick: () => handleDelete(apt.id),
                      variant: "ghost",
                      size: "sm",
                      className: "text-red-400 hover:text-red-600 h-7 w-7 p-0",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] })
              ] }) })
            ]
          },
          apt.id
        );
      }) })
    ] }) }),
    detailApt && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!detailApt, onOpenChange: () => setDetailApt(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", "data-ocid": "apartments.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "Daire ",
        detailApt.number,
        " - Detay"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "info", children: "Genel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "owner", children: "Mal Sahibi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "tenant", children: "Kiracı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "lease", children: "Kira Sözleşmesi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "dues", children: "Aidat Özeti" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "maint", children: "Bakım Kayıtları" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "info", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]", children: "Daire No:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: detailApt.number })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]", children: "Kat:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: detailApt.floor })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]", children: "Blok:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: detailApt.block || "-" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]", children: "Tip:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: detailApt.type })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]", children: "Sakin:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: detailApt.residentName || "Boş" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]", children: "Durum:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `${statusInfo(getStatus(detailApt)).color} border-0 text-xs`,
                children: statusInfo(getStatus(detailApt)).label
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "owner", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-sm text-[#0E1116] flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
            " Mal Sahibi Bilgileri"
          ] }),
          [
            ["ownerName", "Ad Soyad"],
            ["ownerPhone", "Telefon"],
            ["ownerTc", "TC Kimlik No"],
            ["ownerEmail", "E-posta"]
          ].map(([field, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: editingTenant[field],
                onChange: (e) => setEditingTenant((p) => ({
                  ...p,
                  [field]: e.target.value
                })),
                placeholder: label
              }
            )
          ] }, field)),
          isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => {
                saveTenantInfo(detailApt.id, editingTenant);
              },
              className: "w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full",
              "data-ocid": "apartments.save_button",
              children: "Kaydet"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "tenant", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-sm text-[#0E1116] flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
            " Kiracı Bilgileri"
          ] }),
          [
            ["tenantName", "Ad Soyad"],
            ["tenantPhone", "Telefon"],
            ["tenantTc", "TC Kimlik No"],
            ["tenantEmail", "E-posta"]
          ].map(([field, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: editingTenant[field],
                onChange: (e) => setEditingTenant((p) => ({
                  ...p,
                  [field]: e.target.value
                })),
                placeholder: label
              }
            )
          ] }, field)),
          !editingTenant.tenantName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#9CA8B4] italic", children: "Kiracı bilgisi girilmemiş. Daire mal sahibi tarafından kullanılıyor." }),
          isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => {
                saveTenantInfo(detailApt.id, editingTenant);
              },
              className: "w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full",
              "data-ocid": "apartments.save_button",
              children: "Kaydet"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "lease", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-[#0E1116]", children: "Kira Sözleşmesi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1", children: "Başlangıç Tarihi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: editingTenant.leaseStart,
                  onChange: (e) => setEditingTenant((p) => ({
                    ...p,
                    leaseStart: e.target.value
                  }))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1", children: "Bitiş Tarihi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: editingTenant.leaseEnd,
                  onChange: (e) => setEditingTenant((p) => ({
                    ...p,
                    leaseEnd: e.target.value
                  }))
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1", children: "Aylık Kira Tutarı (₺)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                value: editingTenant.monthlyRent,
                onChange: (e) => setEditingTenant((p) => ({
                  ...p,
                  monthlyRent: e.target.value
                })),
                placeholder: "5000"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1", children: "Depozito (₺)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                value: editingTenant.deposit,
                onChange: (e) => setEditingTenant((p) => ({
                  ...p,
                  deposit: e.target.value
                })),
                placeholder: "10000"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1", children: "Sözleşme Belgesi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer border border-dashed border-[#D7DEE9] rounded-xl p-3 hover:bg-[#F3F6FB] transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "file",
                  accept: ".pdf,.doc,.docx",
                  className: "hidden",
                  onChange: () => {
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-[#4A90D9]", children: "Dosya seç veya sürükle bırak" })
            ] })
          ] }),
          isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => {
                saveTenantInfo(detailApt.id, editingTenant);
              },
              className: "w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full",
              "data-ocid": "apartments.save_button",
              children: "Sözleşmeyi Kaydet"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "dues", children: aptDues(detailApt.number).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[#3A4654] py-6 text-sm", children: "Aidat kaydı bulunamadı." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: aptDues(detailApt.number).slice(0, 8).map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex justify-between text-sm border-b border-[#E5EAF2] pb-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: d.month || d.period }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: d.status === "paid" ? "bg-green-100 text-green-700 border-0" : "bg-red-100 text-red-700 border-0",
                  children: d.status === "paid" ? "Ödendi" : "Bekliyor"
                }
              )
            ]
          },
          d.month || d.period || i
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "maint", children: aptMaint(detailApt.id).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[#3A4654] py-6 text-sm", children: "Bakım kaydı bulunamadı." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: aptMaint(detailApt.id).slice(0, 5).map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-sm border-b border-[#E5EAF2] pb-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: m.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654]", children: m.date })
            ]
          },
          m.title || i
        )) }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showDialog, onOpenChange: setShowDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editTarget ? t.editApartment : t.addApartment }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: [
            t.apartmentNumber,
            " *"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "apartments.input",
              value: form.number,
              onChange: (e) => setForm((p) => ({ ...p, number: e.target.value })),
              placeholder: "12 / 3A"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.floor }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                value: form.floor,
                onChange: (e) => setForm((p) => ({ ...p, floor: e.target.value })),
                placeholder: "1"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.block }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.block,
                onChange: (e) => setForm((p) => ({ ...p, block: e.target.value })),
                placeholder: "A"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.apartmentType }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: form.type,
              onChange: (e) => setForm((p) => ({ ...p, type: e.target.value })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]",
              children: APT_TYPES.map((tp) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: tp, children: tp }, tp))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Durum" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: form.status,
              onChange: (e) => setForm((p) => ({ ...p, status: e.target.value })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]",
              children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.value, children: s.label }, s.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.resident }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.residentName,
              onChange: (e) => setForm((p) => ({ ...p, residentName: e.target.value })),
              placeholder: "Ad Soyad"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "apartments.submit_button",
            onClick: handleSubmit,
            disabled: !form.number.trim(),
            className: "w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full",
            children: editTarget ? t.save : t.addApartment
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  ApartmentManagement as default
};
