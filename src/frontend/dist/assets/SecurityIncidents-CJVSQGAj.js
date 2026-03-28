import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, t as User, P as Plus, T as TriangleAlert, aA as ShieldCheck, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, O as Shield, e as Badge, aB as UserCheck, v as MapPin, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-DrmT2NwI.js";
import { T as Textarea } from "./textarea-BURed9T_.js";
import { C as Clock } from "./clock-npxEKmqV.js";
import { G as Grid3x3 } from "./grid-3x3-CmBgP6YJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode);
const INC_KEY = (id) => `sitecore_incidents_${id}`;
const VIS_KEY = (id) => `sitecore_security_visitors_${id}`;
const INCIDENT_TYPES = [
  { value: "theft", label: "Hırsızlık", color: "bg-red-100 text-red-700" },
  { value: "noise", label: "Gürültü", color: "bg-yellow-100 text-yellow-700" },
  {
    value: "vandalism",
    label: "Vandalizm",
    color: "bg-orange-100 text-orange-700"
  },
  { value: "fire", label: "Yangın", color: "bg-red-200 text-red-800" },
  { value: "other", label: "Diğer", color: "bg-gray-100 text-gray-600" }
];
const ZONES = [
  "Giriş",
  "Otopark",
  "Bahçe",
  "1. Kat",
  "2. Kat",
  "3. Kat",
  "4. Kat",
  "5. Kat",
  "Çatı",
  "Asansör"
];
const SEED_SHIFT_LOGS = [
  {
    id: "sl1",
    date: "2026-03-25",
    time: "08:00",
    incoming: "Kadir Şahin",
    outgoing: "Murat Acar",
    notes: "Gece sakin geçti, bir ziyaretçi girişi kaydedildi."
  },
  {
    id: "sl2",
    date: "2026-03-24",
    time: "16:00",
    incoming: "Murat Acar",
    outgoing: "Serhat Kaya",
    notes: "Asansör arızası teknisyene bildirildi."
  },
  {
    id: "sl3",
    date: "2026-03-24",
    time: "08:00",
    incoming: "Serhat Kaya",
    outgoing: "Kadir Şahin",
    notes: "Normal devir, ek not yok."
  },
  {
    id: "sl4",
    date: "2026-03-23",
    time: "16:00",
    incoming: "Kadir Şahin",
    outgoing: "Murat Acar",
    notes: "Otopark B-12 boş bırakıldı, sakin bilgilendirildi."
  }
];
const SEED_CAMERAS = [
  { id: "cz1", zone: "Giriş", cameraCount: 3, status: "Aktif" },
  { id: "cz2", zone: "Asansör", cameraCount: 2, status: "Aktif" },
  { id: "cz3", zone: "Otopark", cameraCount: 4, status: "Aktif" },
  { id: "cz4", zone: "Bahçe", cameraCount: 2, status: "Bakımda" },
  { id: "cz5", zone: "1. Kat Koridor", cameraCount: 2, status: "Aktif" },
  { id: "cz6", zone: "2. Kat Koridor", cameraCount: 2, status: "Aktif" },
  { id: "cz7", zone: "3. Kat Koridor", cameraCount: 2, status: "Arızalı" },
  { id: "cz8", zone: "Çatı", cameraCount: 1, status: "Aktif" }
];
const PATROL_ZONES = [
  "Giriş",
  "Asansör",
  "Otopark",
  "Bahçe",
  "1. Kat Koridor",
  "2. Kat Koridor",
  "3. Kat Koridor",
  "Çatı"
];
const SEED_PATROLS = [
  {
    id: "p1",
    date: "2026-03-25",
    time: "09:00",
    personnel: "Kadir Şahin",
    zones: ["Giriş", "Otopark", "Bahçe"],
    duration: 25,
    notes: "Her şey normal."
  },
  {
    id: "p2",
    date: "2026-03-25",
    time: "15:00",
    personnel: "Murat Acar",
    zones: ["Giriş", "Asansör", "1. Kat Koridor", "2. Kat Koridor"],
    duration: 30,
    notes: "2. katta açık kapı tespit edildi, kapatıldı."
  },
  {
    id: "p3",
    date: "2026-03-24",
    time: "10:00",
    personnel: "Serhat Kaya",
    zones: ["Giriş", "Otopark", "Çatı"],
    duration: 20,
    notes: "Çatı kapısı kilitli kontrol edildi."
  },
  {
    id: "p4",
    date: "2026-03-24",
    time: "18:00",
    personnel: "Kadir Şahin",
    zones: ["Giriş", "Bahçe", "3. Kat Koridor"],
    duration: 22,
    notes: "Bahçede yabancı şahıs görüldü, gözetlendi, ayrıldı."
  }
];
const SHIFT_KEY = (id) => `sitecore_shift_log_${id}`;
const CAM_KEY = (id) => `sitecore_cameras_${id}`;
const PATROL_KEY = (id) => `sitecore_patrols_${id}`;
const SEED_INCIDENTS = [
  {
    id: "i1",
    type: "noise",
    date: "2026-03-20",
    time: "23:15",
    location: "3. Kat",
    description: "Gece geç saatte müzik sesi şikayeti",
    status: "closed",
    reportedBy: "Daire 301",
    resolutionNote: "Sakinle görüşüldü.",
    createdAt: Date.now() - 1728e5
  },
  {
    id: "i2",
    type: "vandalism",
    date: "2026-03-21",
    time: "14:30",
    location: "Otopark",
    description: "Araçta çizik tespit edildi",
    status: "investigating",
    reportedBy: "Güvenlik",
    createdAt: Date.now() - 864e5
  },
  {
    id: "i3",
    type: "other",
    date: "2026-03-22",
    time: "09:00",
    location: "Giriş",
    description: "Kapı kilidi arızalandı",
    status: "open",
    reportedBy: "Kapıcı",
    createdAt: Date.now() - 36e5
  }
];
function SecurityIncidents({
  buildingId,
  userId,
  isOwner,
  isOwnerOrManager,
  t
}) {
  const [incidents, setIncidents] = reactExports.useState([]);
  const [visitorLogs, setVisitorLogs] = reactExports.useState([]);
  const [showDialog, setShowDialog] = reactExports.useState(false);
  const [showVisitorDialog, setShowVisitorDialog] = reactExports.useState(false);
  const [resolveTarget, setResolveTarget] = reactExports.useState(null);
  const [resolveNote, setResolveNote] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [form, setForm] = reactExports.useState({
    type: "other",
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    time: "",
    location: "",
    description: ""
  });
  const [visitorForm, setVisitorForm] = reactExports.useState({
    name: "",
    apartment: "",
    entryTime: "",
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  });
  const [shiftLogs, setShiftLogs] = reactExports.useState([]);
  const [showShiftDialog, setShowShiftDialog] = reactExports.useState(false);
  const [shiftForm, setShiftForm] = reactExports.useState({
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    time: "08:00",
    incoming: "",
    outgoing: "",
    notes: ""
  });
  const [cameraZones, setCameraZones] = reactExports.useState([]);
  const [patrolLogs, setPatrolLogs] = reactExports.useState([]);
  const [showPatrolDialog, setShowPatrolDialog] = reactExports.useState(false);
  const [patrolForm, setPatrolForm] = reactExports.useState({
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    time: "09:00",
    personnel: "",
    zones: [],
    duration: 20,
    notes: ""
  });
  reactExports.useEffect(() => {
    const raw = localStorage.getItem(INC_KEY(buildingId));
    if (raw) setIncidents(JSON.parse(raw));
    else {
      setIncidents(SEED_INCIDENTS);
      localStorage.setItem(INC_KEY(buildingId), JSON.stringify(SEED_INCIDENTS));
    }
    const vRaw = localStorage.getItem(VIS_KEY(buildingId));
    if (vRaw) setVisitorLogs(JSON.parse(vRaw));
    try {
      const slRaw = localStorage.getItem(SHIFT_KEY(buildingId));
      if (slRaw) setShiftLogs(JSON.parse(slRaw));
      else {
        setShiftLogs(SEED_SHIFT_LOGS);
        localStorage.setItem(
          SHIFT_KEY(buildingId),
          JSON.stringify(SEED_SHIFT_LOGS)
        );
      }
    } catch {
      setShiftLogs(SEED_SHIFT_LOGS);
    }
    try {
      const camRaw = localStorage.getItem(CAM_KEY(buildingId));
      if (camRaw) setCameraZones(JSON.parse(camRaw));
      else {
        setCameraZones(SEED_CAMERAS);
        localStorage.setItem(CAM_KEY(buildingId), JSON.stringify(SEED_CAMERAS));
      }
    } catch {
      setCameraZones(SEED_CAMERAS);
    }
    try {
      const patRaw = localStorage.getItem(PATROL_KEY(buildingId));
      if (patRaw) setPatrolLogs(JSON.parse(patRaw));
      else {
        setPatrolLogs(SEED_PATROLS);
        localStorage.setItem(
          PATROL_KEY(buildingId),
          JSON.stringify(SEED_PATROLS)
        );
      }
    } catch {
      setPatrolLogs(SEED_PATROLS);
    }
  }, [buildingId]);
  const saveInc = (u) => {
    setIncidents(u);
    localStorage.setItem(INC_KEY(buildingId), JSON.stringify(u));
  };
  const saveVis = (u) => {
    setVisitorLogs(u);
    localStorage.setItem(VIS_KEY(buildingId), JSON.stringify(u));
  };
  const handleSubmit = () => {
    if (!form.description.trim() || !form.location.trim()) return;
    const inc = {
      id: crypto.randomUUID(),
      ...form,
      status: "open",
      reportedBy: userId,
      createdAt: Date.now()
    };
    saveInc([inc, ...incidents]);
    setShowDialog(false);
    setForm({
      type: "other",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      time: "",
      location: "",
      description: ""
    });
  };
  const handleResolve = () => {
    if (!resolveTarget) return;
    saveInc(
      incidents.map(
        (i) => i.id === resolveTarget.id ? { ...i, status: "closed", resolutionNote: resolveNote } : i
      )
    );
    setResolveTarget(null);
    setResolveNote("");
  };
  const handleAddVisitor = () => {
    if (!visitorForm.name.trim()) return;
    const vl = { id: crypto.randomUUID(), ...visitorForm };
    saveVis([vl, ...visitorLogs]);
    setShowVisitorDialog(false);
    setVisitorForm({
      name: "",
      apartment: "",
      entryTime: "",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
  };
  const handleExit = (id) => {
    saveVis(
      visitorLogs.map(
        (v) => v.id === id ? { ...v, exitTime: (/* @__PURE__ */ new Date()).toTimeString().slice(0, 5) } : v
      )
    );
  };
  const saveShifts = (u) => {
    setShiftLogs(u);
    localStorage.setItem(SHIFT_KEY(buildingId), JSON.stringify(u));
  };
  const handleAddShift = () => {
    if (!shiftForm.incoming.trim() || !shiftForm.outgoing.trim()) return;
    const sl = { id: crypto.randomUUID(), ...shiftForm };
    saveShifts([sl, ...shiftLogs]);
    setShowShiftDialog(false);
    setShiftForm({
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      time: "08:00",
      incoming: "",
      outgoing: "",
      notes: ""
    });
  };
  const saveCameras = (u) => {
    setCameraZones(u);
    localStorage.setItem(CAM_KEY(buildingId), JSON.stringify(u));
  };
  const cycleCameraStatus = (id) => {
    const cycle = ["Aktif", "Bakımda", "Arızalı"];
    saveCameras(
      cameraZones.map(
        (c) => c.id === id ? { ...c, status: cycle[(cycle.indexOf(c.status) + 1) % 3] } : c
      )
    );
  };
  const savePatrols = (u) => {
    setPatrolLogs(u);
    localStorage.setItem(PATROL_KEY(buildingId), JSON.stringify(u));
  };
  const handleAddPatrol = () => {
    if (!patrolForm.personnel.trim()) return;
    const pl = { id: crypto.randomUUID(), ...patrolForm };
    savePatrols([pl, ...patrolLogs]);
    setShowPatrolDialog(false);
    setPatrolForm({
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      time: "09:00",
      personnel: "",
      zones: [],
      duration: 20,
      notes: ""
    });
  };
  const togglePatrolZone = (zone) => {
    setPatrolForm((prev) => ({
      ...prev,
      zones: prev.zones.includes(zone) ? prev.zones.filter((z) => z !== zone) : [...prev.zones, zone]
    }));
  };
  const typeInfo = (type) => INCIDENT_TYPES.find((it) => it.value === type) || INCIDENT_TYPES[4];
  const statusBadge = (status) => {
    if (status === "open")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700 border-0", children: "Açık" });
    if (status === "investigating")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-100 text-yellow-700 border-0", children: "İnceleniyor" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700 border-0", children: "Kapalı" });
  };
  const filteredInc = statusFilter === "all" ? incidents : incidents.filter((i) => i.status === statusFilter);
  const openCount = incidents.filter((i) => i.status === "open").length;
  const investigatingCount = incidents.filter(
    (i) => i.status === "investigating"
  ).length;
  const closedCount = incidents.filter((i) => i.status === "closed").length;
  const typeCounts = {};
  for (const i of incidents) {
    typeCounts[i.type] = (typeCounts[i.type] || 0) + 1;
  }
  const zoneCounts = {};
  for (const i of incidents) {
    const matched = ZONES.find((z) => i.location.includes(z));
    if (matched) zoneCounts[matched] = (zoneCounts[matched] || 0) + 1;
  }
  const maxZone = Math.max(...Object.values(zoneCounts), 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: t.security || "Güvenlik & Olay Yönetimi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowVisitorDialog(true),
            variant: "outline",
            className: "rounded-full gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
              "Ziyaretçi"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowDialog(true),
            className: "bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full gap-2",
            "data-ocid": "security.primary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Olay Bildir"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0B1B2E]", children: incidents.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654] mt-1", children: "Toplam Olay" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-red-100 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-red-600", children: openCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#3A4654] mt-1 flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
          " Açık"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-yellow-100 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-yellow-600", children: investigatingCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#3A4654] mt-1 flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
          " İnceleniyor"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-green-100 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-green-600", children: closedCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#3A4654] mt-1 flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3 h-3" }),
          " Kapalı"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "incidents", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4 flex flex-wrap gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "incidents", children: "Olaylar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "map", children: "Bölge Haritası" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "visitors", children: [
          "Ziyaretçi Logu (",
          visitorLogs.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "shifts", children: "Nöbet Logu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "cameras", children: "Kamera Haritası" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "patrols", children: "Tur Kaydı" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "incidents", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-4", children: ["all", "open", "investigating", "closed"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: statusFilter === s ? "default" : "outline",
            onClick: () => setStatusFilter(s),
            className: statusFilter === s ? "bg-[#0B1B2E] text-white rounded-full" : "rounded-full",
            children: s === "all" ? "Tümü" : s === "open" ? "Açık" : s === "investigating" ? "İnceleniyor" : "Kapalı"
          },
          s
        )) }),
        filteredInc.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "security.empty_state",
            className: "bg-white rounded-2xl p-10 text-center border border-[#E5EAF2]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-10 h-10 text-[#B0BAC6] mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: "Olay kaydı bulunamadı." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filteredInc.map((inc, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": `security.item.${idx + 1}`,
            className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2]",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `${typeInfo(inc.type).color} border-0`,
                      children: typeInfo(inc.type).label
                    }
                  ),
                  statusBadge(inc.status)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-[#0E1116]", children: inc.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#3A4654] mt-0.5", children: [
                  inc.location,
                  " — ",
                  inc.date,
                  " ",
                  inc.time
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D] mt-0.5", children: [
                  "Bildiren: ",
                  inc.reportedBy
                ] }),
                inc.resolutionNote && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-green-600 mt-1", children: [
                  "✓ ",
                  inc.resolutionNote
                ] })
              ] }),
              (isOwner || isOwnerOrManager) && inc.status !== "closed" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => setResolveTarget(inc),
                  size: "sm",
                  variant: "outline",
                  className: "rounded-full text-xs",
                  children: "Kapat"
                }
              )
            ] })
          },
          inc.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "map", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-[#E5EAF2] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-[#0E1116] mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Grid3x3, { className: "w-4 h-4" }),
          " Bölge Bazlı Olay Dağılımı"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: ZONES.map((zone) => {
          const count = zoneCounts[zone] || 0;
          const intensity = count > 0 ? Math.max(count / maxZone, 0.2) : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl p-4 border text-center",
              style: {
                backgroundColor: count > 0 ? `rgba(239, 68, 68, ${intensity * 0.3})` : "#F9FAFB",
                borderColor: count > 0 ? "#FCA5A5" : "#E5EAF2"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-[#0E1116]", children: zone }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-2xl font-bold mt-1 ${count > 0 ? "text-red-600" : "text-[#3A4654]/30"}`,
                    children: count
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: count > 0 ? "olay" : "temiz" })
              ]
            },
            zone
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-[#0E1116] mb-2", children: "Tür Bazlı Dağılım" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: INCIDENT_TYPES.map(({ value, label, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex items-center gap-1 px-3 py-1 rounded-full text-sm ${color}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: typeCounts[value] || 0 })
              ]
            },
            value
          )) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "visitors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: visitorLogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-10 text-center border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-10 h-10 text-[#B0BAC6] mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: "Ziyaretçi logu boş." })
      ] }) : visitorLogs.map((v, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `security.visitor.${idx + 1}`,
          className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] flex items-center justify-between",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-[#0E1116]", children: v.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#3A4654]", children: [
                "Daire ",
                v.apartment,
                " — ",
                v.date
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D]", children: [
                "Giriş: ",
                v.entryTime,
                v.exitTime ? ` — Çıkış: ${v.exitTime}` : " — İçeride"
              ] })
            ] }),
            !v.exitTime && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => handleExit(v.id),
                size: "sm",
                variant: "outline",
                className: "rounded-full text-xs",
                children: "Çıkış"
              }
            )
          ]
        },
        v.id
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "shifts", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-[#0E1116] flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4" }),
            " Nöbet Devir Logu"
          ] }),
          isOwnerOrManager && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => setShowShiftDialog(true),
              size: "sm",
              className: "bg-[#0B1B2E] text-white rounded-full gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                " Devir Ekle"
              ]
            }
          )
        ] }),
        shiftLogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-10 text-center border border-[#E5EAF2]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-10 h-10 text-[#B0BAC6] mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: "Nöbet logu boş." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: shiftLogs.map((sl, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": `security.shift.item.${idx + 1}`,
            className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2]",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-[#0E1116]", children: [
                sl.date,
                " — ",
                sl.time
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mt-1 text-sm text-[#3A4654]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "⬆️ Gelen: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: sl.incoming })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "⬇️ Giden: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: sl.outgoing })
                ] })
              ] }),
              sl.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-1 italic", children: sl.notes })
            ] }) })
          },
          sl.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "cameras", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-[#0E1116] flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
            " Kamera Bölge Haritası"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-green-500 inline-block" }),
              " ",
              "Aktif"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" }),
              " ",
              "Bakımda"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-red-500 inline-block" }),
              " ",
              "Arızalı"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: cameraZones.map((cz) => {
          const statusColor = cz.status === "Aktif" ? "border-green-200 bg-green-50" : cz.status === "Bakımda" ? "border-yellow-200 bg-yellow-50" : "border-red-200 bg-red-50";
          const dotColor = cz.status === "Aktif" ? "bg-green-500" : cz.status === "Bakımda" ? "bg-yellow-500" : "bg-red-500";
          const badgeColor = cz.status === "Aktif" ? "bg-green-100 text-green-700" : cz.status === "Bakımda" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `rounded-2xl p-4 border ${statusColor}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4 text-[#4A90D9]" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-2.5 h-2.5 rounded-full ${dotColor}` })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-[#0E1116]", children: cz.zone }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D] mt-0.5", children: [
                  cz.cameraCount,
                  " kamera"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `mt-2 text-xs border-0 ${badgeColor}`, children: cz.status }),
                isOwnerOrManager && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => cycleCameraStatus(cz.id),
                    className: "mt-2 text-xs text-[#4A90D9] hover:underline block",
                    children: "Durum Değiştir"
                  }
                )
              ]
            },
            cz.id
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 bg-white rounded-2xl p-4 border border-[#E5EAF2]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-2", children: "Özet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-700", children: [
              "✅ Aktif:",
              " ",
              cameraZones.filter((c) => c.status === "Aktif").reduce((s, c) => s + c.cameraCount, 0),
              " ",
              "kamera"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-yellow-700", children: [
              "⚠️ Bakımda:",
              " ",
              cameraZones.filter((c) => c.status === "Bakımda").reduce((s, c) => s + c.cameraCount, 0),
              " ",
              "kamera"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-red-700", children: [
              "❌ Arızalı:",
              " ",
              cameraZones.filter((c) => c.status === "Arızalı").reduce((s, c) => s + c.cameraCount, 0),
              " ",
              "kamera"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "patrols", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-[#0E1116] flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
            " Güvenlik Tur Kayıtları"
          ] }),
          isOwnerOrManager && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => setShowPatrolDialog(true),
              size: "sm",
              className: "bg-[#0B1B2E] text-white rounded-full gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                " Tur Ekle"
              ]
            }
          )
        ] }),
        patrolLogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-10 text-center border border-[#E5EAF2]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-10 h-10 text-[#B0BAC6] mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: "Tur kaydı bulunamadı." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: patrolLogs.map((pl, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": `security.patrol.item.${idx + 1}`,
            className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2]",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-[#0E1116]", children: [
                  pl.date,
                  " ",
                  pl.time
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-[#EEF3FA] text-[#4A90D9] border-0 text-xs", children: [
                  pl.duration,
                  " dk"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#3A4654] mt-0.5", children: [
                "Personel: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: pl.personnel })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-2", children: pl.zones.map((z) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: "bg-[#F3F6FB] text-[#3A4654] border-0 text-xs",
                  children: z
                },
                z
              )) }),
              pl.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-1 italic", children: pl.notes })
            ] }) })
          },
          pl.id
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showShiftDialog, onOpenChange: setShowShiftDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Nöbet Devri Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Tarih" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: shiftForm.date,
                onChange: (e) => setShiftForm((p) => ({ ...p, date: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Saat" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "time",
                value: shiftForm.time,
                onChange: (e) => setShiftForm((p) => ({ ...p, time: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Gelen Nöbetçi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Ad Soyad",
              value: shiftForm.incoming,
              onChange: (e) => setShiftForm((p) => ({ ...p, incoming: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Giden Nöbetçi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Ad Soyad",
              value: shiftForm.outgoing,
              onChange: (e) => setShiftForm((p) => ({ ...p, outgoing: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Notlar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              placeholder: "Devir notu...",
              value: shiftForm.notes,
              onChange: (e) => setShiftForm((p) => ({ ...p, notes: e.target.value })),
              rows: 2
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleAddShift,
              className: "flex-1 bg-[#0B1B2E] text-white rounded-full",
              children: "Ekle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowShiftDialog(false),
              className: "flex-1 rounded-full",
              children: "İptal"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showPatrolDialog, onOpenChange: setShowPatrolDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Güvenlik Turu Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Tarih" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: patrolForm.date,
                onChange: (e) => setPatrolForm((p) => ({ ...p, date: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Saat" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "time",
                value: patrolForm.time,
                onChange: (e) => setPatrolForm((p) => ({ ...p, time: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Personel Adı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Ad Soyad",
              value: patrolForm.personnel,
              onChange: (e) => setPatrolForm((p) => ({ ...p, personnel: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Ziyaret Edilen Bölgeler" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: PATROL_ZONES.map((zone) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: "flex items-center gap-2 text-sm cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: patrolForm.zones.includes(zone),
                    onChange: () => togglePatrolZone(zone)
                  }
                ),
                zone
              ]
            },
            zone
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Süre (dakika)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              value: patrolForm.duration,
              onChange: (e) => setPatrolForm((p) => ({
                ...p,
                duration: Number(e.target.value)
              })),
              min: 1
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Notlar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              placeholder: "Tur notu...",
              value: patrolForm.notes,
              onChange: (e) => setPatrolForm((p) => ({ ...p, notes: e.target.value })),
              rows: 2
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleAddPatrol,
              className: "flex-1 bg-[#0B1B2E] text-white rounded-full",
              children: "Ekle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowPatrolDialog(false),
              className: "flex-1 rounded-full",
              children: "İptal"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showDialog, onOpenChange: setShowDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Olay Bildir" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Olay Türü" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: form.type,
              onChange: (e) => setForm((p) => ({
                ...p,
                type: e.target.value
              })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              "data-ocid": "security.select",
              children: INCIDENT_TYPES.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: it.value, children: it.label }, it.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Tarih" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: form.date,
                onChange: (e) => setForm((p) => ({ ...p, date: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Saat" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "time",
                value: form.time,
                onChange: (e) => setForm((p) => ({ ...p, time: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Konum" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.location,
              onChange: (e) => setForm((p) => ({ ...p, location: e.target.value })),
              placeholder: "Örn: 3. Kat, Otopark, Giriş",
              "data-ocid": "security.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Açıklama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: form.description,
              onChange: (e) => setForm((p) => ({ ...p, description: e.target.value })),
              rows: 3,
              "data-ocid": "security.textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSubmit,
              disabled: !form.description.trim() || !form.location.trim(),
              className: "flex-1 bg-[#0B1B2E] text-white rounded-full",
              "data-ocid": "security.submit_button",
              children: "Gönder"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowDialog(false),
              className: "flex-1 rounded-full",
              "data-ocid": "security.cancel_button",
              children: "İptal"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!resolveTarget,
        onOpenChange: () => setResolveTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Olayı Kapat" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654]", children: "Çözüm Notu (isteğe bağlı)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                value: resolveNote,
                onChange: (e) => setResolveNote(e.target.value),
                rows: 3,
                placeholder: "Alınan önlemler, çözüm yöntemi..."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleResolve,
                  className: "flex-1 bg-green-700 text-white rounded-full",
                  "data-ocid": "security.confirm_button",
                  children: "Kapat"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => setResolveTarget(null),
                  className: "flex-1 rounded-full",
                  "data-ocid": "security.close_button",
                  children: "İptal"
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showVisitorDialog, onOpenChange: setShowVisitorDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Ziyaretçi Girişi" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Ziyaretçi Adı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: visitorForm.name,
              onChange: (e) => setVisitorForm((p) => ({ ...p, name: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Ziyaret Edilen Daire" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: visitorForm.apartment,
              onChange: (e) => setVisitorForm((p) => ({ ...p, apartment: e.target.value })),
              placeholder: "101"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Tarih" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: visitorForm.date,
                onChange: (e) => setVisitorForm((p) => ({ ...p, date: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Giriş Saati" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "time",
                value: visitorForm.entryTime,
                onChange: (e) => setVisitorForm((p) => ({ ...p, entryTime: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleAddVisitor,
              className: "flex-1 bg-[#0B1B2E] text-white rounded-full",
              children: "Ekle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowVisitorDialog(false),
              className: "flex-1 rounded-full",
              children: "İptal"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  SecurityIncidents as default
};
