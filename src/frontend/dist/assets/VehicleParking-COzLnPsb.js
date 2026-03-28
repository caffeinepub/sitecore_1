import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, I as Input, e as Badge, S as Search, a4 as Car, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle } from "./index-5GfTJQeF.js";
import { P as Pen } from "./pen-R-4RaXgb.js";
import { T as Trash2 } from "./trash-2-Bx-JrzAk.js";
const KEY = (id) => `sitecore_vehicles_${id}`;
const LOG_KEY = (id) => `sitecore_vehicle_log_${id}`;
function generateLogs(vehicles) {
  const logs = [];
  const now = /* @__PURE__ */ new Date("2026-03-25T10:00:00");
  const plates = vehicles.map((v) => v.licensePlate);
  const extraPlates = [
    "34 DEF 789",
    "34 GHI 012",
    "06 JKL 345",
    "35 MNO 678",
    "34 PQR 901"
  ];
  const allPlates = [...plates, ...extraPlates];
  const actions = [
    "Giriş",
    "Giriş",
    "Çıkış",
    "Giriş",
    "Çıkış",
    "Giriş",
    "Çıkış",
    "Çıkış"
  ];
  const apts = ["101", "202", "301", "102", "203", "304", "401", "103", "205"];
  for (let i = 0; i < 32; i++) {
    const d = new Date(
      now.getTime() - i * 45 * 60 * 1e3 - Math.random() * 6e5
    );
    const action = actions[i % actions.length];
    const plate = allPlates[i % allPlates.length];
    logs.push({
      id: `log_${i}`,
      timestamp: d.toLocaleString("tr-TR"),
      licensePlate: plate,
      apartmentNo: apts[i % apts.length],
      vehicleType: i % 5 === 0 ? "Motosiklet" : "Otomobil",
      action,
      duration: action === "Çıkış" ? `${Math.floor(30 + Math.random() * 240)} dk` : void 0
    });
  }
  return logs;
}
function VehicleParking({ buildingId, isOwner, t }) {
  const [vehicles, setVehicles] = reactExports.useState([]);
  const [logs, setLogs] = reactExports.useState([]);
  const [showDialog, setShowDialog] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [logSearch, setLogSearch] = reactExports.useState("");
  const [capacity, setCapacity] = reactExports.useState(20);
  const [form, setForm] = reactExports.useState({
    licensePlate: "",
    vehicleType: "car",
    color: "",
    ownerName: "",
    apartmentNo: "",
    parkingSpot: "",
    isVisitor: false,
    visitorUntil: ""
  });
  reactExports.useEffect(() => {
    const raw = localStorage.getItem(KEY(buildingId));
    let vehicleData;
    if (raw) {
      vehicleData = JSON.parse(raw);
    } else {
      vehicleData = [
        {
          id: "v1",
          licensePlate: "34 ABC 123",
          vehicleType: "car",
          color: "Siyah",
          ownerName: "Ahmet Yılmaz",
          apartmentNo: "101",
          parkingSpot: "A-1",
          isVisitor: false,
          addedAt: (/* @__PURE__ */ new Date()).toISOString()
        },
        {
          id: "v2",
          licensePlate: "34 XYZ 456",
          vehicleType: "car",
          color: "Beyaz",
          ownerName: "Fatma Kaya",
          apartmentNo: "202",
          parkingSpot: "A-2",
          isVisitor: false,
          addedAt: (/* @__PURE__ */ new Date()).toISOString()
        },
        {
          id: "v3",
          licensePlate: "34 ZZZ 789",
          vehicleType: "motorcycle",
          color: "Kırmızı",
          ownerName: "Ziyaretçi",
          apartmentNo: "301",
          parkingSpot: "Z-1",
          isVisitor: true,
          visitorUntil: new Date(Date.now() + 864e5).toISOString().split("T")[0],
          addedAt: (/* @__PURE__ */ new Date()).toISOString()
        },
        {
          id: "v4",
          licensePlate: "34 DEF 111",
          vehicleType: "car",
          color: "Gri",
          ownerName: "Mehmet Demir",
          apartmentNo: "401",
          parkingSpot: "B-1",
          isVisitor: false,
          addedAt: (/* @__PURE__ */ new Date()).toISOString()
        },
        {
          id: "v5",
          licensePlate: "06 GHI 222",
          vehicleType: "car",
          color: "Mavi",
          ownerName: "Zeynep Şahin",
          apartmentNo: "302",
          parkingSpot: "B-2",
          isVisitor: false,
          addedAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      ];
      setVehicles(vehicleData);
      localStorage.setItem(KEY(buildingId), JSON.stringify(vehicleData));
    }
    setVehicles(vehicleData);
    const logRaw = localStorage.getItem(LOG_KEY(buildingId));
    if (logRaw) {
      setLogs(JSON.parse(logRaw));
    } else {
      const generated = generateLogs(vehicleData);
      setLogs(generated);
      localStorage.setItem(LOG_KEY(buildingId), JSON.stringify(generated));
    }
  }, [buildingId]);
  const save = (updated) => {
    setVehicles(updated);
    localStorage.setItem(KEY(buildingId), JSON.stringify(updated));
  };
  const openAdd = () => {
    setEditTarget(null);
    setForm({
      licensePlate: "",
      vehicleType: "car",
      color: "",
      ownerName: "",
      apartmentNo: "",
      parkingSpot: "",
      isVisitor: false,
      visitorUntil: ""
    });
    setShowDialog(true);
  };
  const openEdit = (v) => {
    setEditTarget(v);
    setForm({
      licensePlate: v.licensePlate,
      vehicleType: v.vehicleType,
      color: v.color,
      ownerName: v.ownerName,
      apartmentNo: v.apartmentNo,
      parkingSpot: v.parkingSpot,
      isVisitor: v.isVisitor,
      visitorUntil: v.visitorUntil || ""
    });
    setShowDialog(true);
  };
  const handleSubmit = () => {
    if (!form.licensePlate.trim()) return;
    if (editTarget) {
      save(
        vehicles.map((v) => v.id === editTarget.id ? { ...v, ...form } : v)
      );
    } else {
      save([
        ...vehicles,
        {
          id: Date.now().toString(),
          ...form,
          addedAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      ]);
    }
    setShowDialog(false);
  };
  const handleDelete = (id) => save(vehicles.filter((v) => v.id !== id));
  const occupied = vehicles.filter((v) => v.parkingSpot).length;
  const filteredVehicles = searchQuery.trim() ? vehicles.filter(
    (v) => v.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())
  ) : vehicles;
  const filteredLogs = logSearch.trim() ? logs.filter(
    (l) => l.licensePlate.toLowerCase().includes(logSearch.toLowerCase())
  ) : logs;
  const todayEntries = reactExports.useMemo(() => {
    const todayStr = (/* @__PURE__ */ new Date()).toLocaleDateString("tr-TR");
    return logs.filter(
      (l) => l.timestamp.startsWith(
        todayStr.split(".").reverse().slice(1).join(".")
      ) || l.action === "Giriş"
    ).length;
  }, [logs]);
  const insideNow = reactExports.useMemo(() => {
    const inside = /* @__PURE__ */ new Set();
    for (const log of [...logs].reverse()) {
      if (log.action === "Giriş") inside.add(log.licensePlate);
      else inside.delete(log.licensePlate);
    }
    return inside.size;
  }, [logs]);
  const logSearchVehicle = logSearch.trim() ? vehicles.find(
    (v) => v.licensePlate.toLowerCase().includes(logSearch.toLowerCase())
  ) : null;
  const typeBadge = (type) => {
    if (type === "car")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-100 text-blue-700", children: t.carType || "Otomobil" });
    if (type === "motorcycle")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-orange-100 text-orange-700", children: t.motorcycleType || "Motosiklet" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-purple-100 text-purple-700", children: t.truckType || "Kamyon/Van" });
  };
  const occupiedSpots = {};
  for (const v of vehicles) {
    if (v.parkingSpot) occupiedSpots[v.parkingSpot] = v;
  }
  const totalSlots = Math.max(capacity, Object.keys(occupiedSpots).length);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: t.vehicleParking || "Araç & Otopark" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: openAdd,
          className: "bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full",
          "data-ocid": "vehicles.primary_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            t.addVehicle || "Araç Ekle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "vehicles", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-[#F3F6FB]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "vehicles", "data-ocid": "vehicles.tab", children: "Kayıtlı Araçlar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "map", "data-ocid": "vehicles.tab", children: "Park Haritası" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "log", "data-ocid": "vehicles.tab", children: "Giriş-Çıkış Logu" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "vehicles", className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              placeholder: "Plakaya göre ara... (ör. 34 ABC)",
              className: "max-w-xs",
              "data-ocid": "vehicles.search_input"
            }
          ),
          searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSearchQuery(""),
              className: "text-sm text-[#6B7A8D] hover:text-[#0E1116]",
              children: "Temizle"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 border border-[#E8EDF5]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: t.registeredVehicles || "Kayıtlı Araçlar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0E1116]", children: vehicles.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 border border-[#E8EDF5]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: t.occupiedSpots || "Dolu Spot" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-red-600", children: occupied })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 border border-[#E8EDF5]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: t.visitorVehicle || "Ziyaretçi Araçları" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-amber-600", children: vehicles.filter((v) => v.isVisitor).length })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-[#E8EDF5] overflow-hidden", children: filteredVehicles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-center text-[#6B7A8D] py-12",
            "data-ocid": "vehicles.empty_state",
            children: searchQuery ? "Araç bulunamadı." : t.noVehicles || "Kayıtlı araç yok."
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F3F6FB]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: t.licensePlate || "Plaka" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: t.vehicleType || "Tür" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: t.vehicleColor || "Renk" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: t.apartmentNo || "Daire" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: t.parkingSpot || "Park Yeri" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredVehicles.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-t border-[#F0F3F8] hover:bg-[#FAFBFD]",
              "data-ocid": `vehicles.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono font-semibold text-[#0E1116]", children: v.licensePlate }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: typeBadge(v.vehicleType) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#3A4654]", children: v.color }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-[#3A4654]", children: [
                  v.apartmentNo,
                  v.isVisitor && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-2 bg-amber-100 text-amber-700 text-xs", children: "Ziyaretçi" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: v.parkingSpot ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700", children: v.parkingSpot }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#9CA8B4]", children: "—" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      onClick: () => openEdit(v),
                      "data-ocid": `vehicles.edit_button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3 w-3" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      onClick: () => handleDelete(v.id),
                      className: "text-red-500",
                      "data-ocid": `vehicles.delete_button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" })
                    }
                  )
                ] }) })
              ]
            },
            v.id
          )) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "map", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-[#E8EDF5] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116]", children: "🅿️ Park Yeri Haritası" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-[#6B7A8D]", children: "Kapasite:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                min: 1,
                max: 200,
                value: capacity,
                onChange: (e) => setCapacity(Math.max(1, Number(e.target.value))),
                className: "w-16 border border-[#D7DEE9] rounded-lg px-2 py-1 text-sm text-center"
              }
            )
          ] })
        ] }),
        (() => {
          const vehiclesWithSpots = vehicles.filter((v) => v.parkingSpot);
          const parkingSlots = Array.from({ length: totalSlots }).map(
            (_, idx) => ({
              slotNum: idx + 1,
              vehicle: vehiclesWithSpots[idx] ?? null
            })
          );
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-2", children: parkingSlots.map((slot) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `rounded-lg p-2 text-xs text-center border transition-colors ${slot.vehicle ? "bg-red-100 border-red-300 text-red-700" : "bg-green-50 border-green-200 text-green-700"}`,
              title: slot.vehicle ? `${slot.vehicle.licensePlate} - Daire ${slot.vehicle.apartmentNo}` : "Boş",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: slot.vehicle ? slot.vehicle.parkingSpot || String(slot.slotNum) : String(slot.slotNum) }),
                slot.vehicle && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate mt-0.5 text-[10px]", children: slot.vehicle.licensePlate })
              ]
            },
            `parking-${slot.slotNum}`
          )) });
        })(),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-3 text-xs text-[#6B7A8D]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded bg-red-200 inline-block" }),
            " ",
            "Dolu (",
            occupied,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded bg-green-100 inline-block" }),
            " ",
            "Boş (",
            totalSlots - occupied,
            ")"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "log", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 border border-[#E8EDF5]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: "Bugün Giriş" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#4A90D9]", children: Math.min(todayEntries, 14) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 border border-[#E8EDF5]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: "Şu An İçeride" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-green-600", children: insideNow })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 border border-[#E8EDF5]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: "Günlük Ortalama" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-amber-600", children: "12" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A8D]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: logSearch,
                onChange: (e) => setLogSearch(e.target.value),
                placeholder: "Plaka Ara...",
                className: "pl-9 max-w-xs",
                "data-ocid": "vehicles.search_input"
              }
            )
          ] }),
          logSearch && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setLogSearch(""),
              className: "text-sm text-[#6B7A8D] hover:text-[#0E1116]",
              children: "Temizle"
            }
          )
        ] }),
        logSearchVehicle && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#EEF3FA] border border-[#C5D5EA] rounded-xl p-3 mb-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-5 h-5 text-[#4A90D9]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#0E1116]", children: logSearchVehicle.licensePlate }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2 text-[#6B7A8D]", children: "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]", children: logSearchVehicle.ownerName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mx-2 text-[#6B7A8D]", children: [
              "• Daire ",
              logSearchVehicle.apartmentNo
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-2 bg-white border-[#C5D5EA] text-[#4A90D9] text-xs", children: logSearchVehicle.parkingSpot || "Park yeri yok" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-[#E8EDF5] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F3F6FB]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-[#6B7A8D] font-medium", children: "#" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-[#6B7A8D] font-medium", children: "Tarih/Saat" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-[#6B7A8D] font-medium", children: "Plaka" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-[#6B7A8D] font-medium", children: "Daire" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-[#6B7A8D] font-medium", children: "Araç Türü" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-[#6B7A8D] font-medium", children: "İşlem" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-[#6B7A8D] font-medium", children: "Süre" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredLogs.slice(0, 30).map((log, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              "data-ocid": `vehicles.item.${i + 1}`,
              className: "border-t border-[#F0F3F8] hover:bg-[#FAFBFD]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-[#9CA8B4] text-xs", children: i + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-[#3A4654] text-xs", children: log.timestamp }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono font-semibold text-[#0E1116]", children: log.licensePlate }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-[#3A4654]", children: log.apartmentNo }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-[#3A4654]", children: log.vehicleType }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: log.action === "Giriş" ? "bg-green-100 text-green-700 border-0" : "bg-red-100 text-red-700 border-0",
                    children: log.action
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-[#6B7A8D] text-xs", children: log.duration || "—" })
              ]
            },
            log.id
          )) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showDialog, onOpenChange: setShowDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "vehicles.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editTarget ? t.editVehicle || "Araç Düzenle" : t.addVehicle || "Araç Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.licensePlate || "Plaka" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.licensePlate,
              onChange: (e) => setForm((p) => ({ ...p, licensePlate: e.target.value })),
              placeholder: "34 ABC 123",
              "data-ocid": "vehicles.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.vehicleType || "Araç Türü" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.vehicleType,
              onChange: (e) => setForm((p) => ({
                ...p,
                vehicleType: e.target.value
              })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              "data-ocid": "vehicles.select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "car", children: t.carType || "Otomobil" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "motorcycle", children: t.motorcycleType || "Motosiklet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "truck", children: t.truckType || "Kamyon/Van" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.vehicleColor || "Renk" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.color,
              onChange: (e) => setForm((p) => ({ ...p, color: e.target.value })),
              placeholder: "Siyah"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.ownerName || "Sahip Adı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.ownerName,
              onChange: (e) => setForm((p) => ({ ...p, ownerName: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.apartmentNo || "Daire No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.apartmentNo,
              onChange: (e) => setForm((p) => ({ ...p, apartmentNo: e.target.value })),
              placeholder: "101"
            }
          )
        ] }),
        isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.parkingSpot || "Park Yeri" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.parkingSpot,
              onChange: (e) => setForm((p) => ({ ...p, parkingSpot: e.target.value })),
              placeholder: "A-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              id: "isVisitor",
              checked: form.isVisitor,
              onChange: (e) => setForm((p) => ({ ...p, isVisitor: e.target.checked })),
              className: "rounded"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "isVisitor", className: "text-sm text-[#3A4654]", children: t.visitorVehicle || "Ziyaretçi Aracı" })
        ] }),
        form.isVisitor && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.visitorUntil || "Çıkış Tarihi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: form.visitorUntil,
              onChange: (e) => setForm((p) => ({ ...p, visitorUntil: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSubmit,
              className: "flex-1 bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full",
              "data-ocid": "vehicles.submit_button",
              children: editTarget ? t.save || "Kaydet" : t.addVehicle || "Ekle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowDialog(false),
              className: "flex-1 rounded-full",
              "data-ocid": "vehicles.cancel_button",
              children: t.cancel || "İptal"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  VehicleParking as default
};
