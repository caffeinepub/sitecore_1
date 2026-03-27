import { r as reactExports, j as jsxRuntimeExports, P as Plus, a3 as Car, W as Wrench, T as TriangleAlert } from "./index-W9zdyH4f.js";
import { C as CircleCheckBig } from "./circle-check-big-wvETTYld.js";
import { C as Clock } from "./clock-54B5Fbhc.js";
import { F as Fuel } from "./fuel-BE_P4MC-.js";
const vehicles = [
  {
    id: "v1",
    name: "Bakım Aracı",
    plate: "34 ABC 123",
    type: "Kamyonet",
    year: 2019,
    brand: "Ford Transit",
    inspectionDate: "2024-08-15",
    insuranceDate: "2024-12-31",
    lastMaintenance: "2024-10-01",
    nextMaintenance: "2025-04-01",
    mileage: 87500,
    status: "active",
    fuelType: "Dizel"
  },
  {
    id: "v2",
    name: "Temizlik Aracı",
    plate: "34 DEF 456",
    type: "Minivan",
    year: 2021,
    brand: "Renault Trafic",
    inspectionDate: "2025-03-20",
    insuranceDate: "2025-06-15",
    lastMaintenance: "2025-01-15",
    nextMaintenance: "2025-07-15",
    mileage: 32e3,
    status: "active",
    fuelType: "Dizel"
  },
  {
    id: "v3",
    name: "Güvenlik Aracı",
    plate: "34 GHI 789",
    type: "Sedan",
    year: 2018,
    brand: "Toyota Corolla",
    inspectionDate: "2024-06-10",
    insuranceDate: "2024-11-30",
    lastMaintenance: "2024-09-20",
    nextMaintenance: "2025-03-20",
    mileage: 124300,
    status: "maintenance",
    fuelType: "Benzin"
  }
];
const maintenanceRecords = [
  {
    id: "m1",
    vehicleId: "v1",
    date: "2024-10-01",
    type: "Periyodik Bakım",
    description: "Yağ değişimi, filtre değişimi, fren kontrolü",
    cost: 3200,
    technician: "Oto Servis A.Ş.",
    status: "completed"
  },
  {
    id: "m2",
    vehicleId: "v2",
    date: "2025-01-15",
    type: "Periyodik Bakım",
    description: "Yağ değişimi, triger kayışı kontrolü",
    cost: 2800,
    technician: "Yetkili Servis",
    status: "completed"
  },
  {
    id: "m3",
    vehicleId: "v3",
    date: "2025-03-27",
    type: "Arıza Onarımı",
    description: "Fren balatası değişimi, rot-balans",
    cost: 1900,
    technician: "Oto Servis A.Ş.",
    status: "pending"
  },
  {
    id: "m4",
    vehicleId: "v1",
    date: "2025-04-01",
    type: "Periyodik Bakım",
    description: "Planlı 6 aylık bakım",
    cost: 0,
    technician: "-",
    status: "scheduled"
  },
  {
    id: "m5",
    vehicleId: "v3",
    date: "2025-04-10",
    type: "Muayene Hazırlık",
    description: "Muayene öncesi genel kontrol",
    cost: 0,
    technician: "-",
    status: "scheduled"
  },
  {
    id: "m6",
    vehicleId: "v2",
    date: "2024-08-20",
    type: "Lastik Değişimi",
    description: "4 adet lastik yenilendi",
    cost: 4600,
    technician: "Lastikçi",
    status: "completed"
  }
];
const fuelRecords = [
  {
    id: "f1",
    vehicleId: "v1",
    date: "2025-03-25",
    liters: 45,
    cost: 2250,
    mileage: 87500,
    station: "Shell - Levent"
  },
  {
    id: "f2",
    vehicleId: "v2",
    date: "2025-03-24",
    liters: 38,
    cost: 1900,
    mileage: 32e3,
    station: "BP - Maslak"
  },
  {
    id: "f3",
    vehicleId: "v1",
    date: "2025-03-10",
    liters: 50,
    cost: 2500,
    mileage: 87100,
    station: "Total - Şişli"
  },
  {
    id: "f4",
    vehicleId: "v3",
    date: "2025-02-28",
    liters: 40,
    cost: 2e3,
    mileage: 124100,
    station: "Opet - Beşiktaş"
  },
  {
    id: "f5",
    vehicleId: "v2",
    date: "2025-02-15",
    liters: 35,
    cost: 1750,
    mileage: 31600,
    station: "Shell - Levent"
  }
];
const statusColors = {
  active: "bg-green-100 text-green-700",
  maintenance: "bg-orange-100 text-orange-700",
  inactive: "bg-gray-100 text-gray-500"
};
const statusLabels = {
  active: "Aktif",
  maintenance: "Bakımda",
  inactive: "Pasif"
};
const maintenanceStatusColors = {
  completed: "bg-green-100 text-green-700",
  pending: "bg-orange-100 text-orange-700",
  scheduled: "bg-blue-100 text-blue-700"
};
const maintenanceStatusLabels = {
  completed: "Tamamlandı",
  pending: "Devam Ediyor",
  scheduled: "Planlandı"
};
function isExpiringSoon(dateStr) {
  const date = new Date(dateStr);
  const now = /* @__PURE__ */ new Date();
  const diff = (date.getTime() - now.getTime()) / (1e3 * 60 * 60 * 24);
  return diff <= 30 && diff >= 0;
}
function isExpired(dateStr) {
  const date = new Date(dateStr);
  const now = /* @__PURE__ */ new Date();
  return date < now;
}
function VehicleMaintenanceTracking({ t: _t }) {
  const [activeTab, setActiveTab] = reactExports.useState("vehicles");
  const [selectedVehicle, setSelectedVehicle] = reactExports.useState(null);
  const filteredMaintenance = selectedVehicle ? maintenanceRecords.filter((r) => r.vehicleId === selectedVehicle) : maintenanceRecords;
  const filteredFuel = selectedVehicle ? fuelRecords.filter((r) => r.vehicleId === selectedVehicle) : fuelRecords;
  const totalFuelCost = filteredFuel.reduce((sum, r) => sum + r.cost, 0);
  const totalMaintenanceCost = maintenanceRecords.filter((r) => r.status === "completed").reduce((sum, r) => sum + r.cost, 0);
  const alerts = vehicles.filter(
    (v) => isExpired(v.inspectionDate) || isExpired(v.insuranceDate) || isExpiringSoon(v.inspectionDate) || isExpiringSoon(v.insuranceDate)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-800", children: "Araç Bakım & Muayene Takibi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mt-1", children: "Bina araçlarının bakım, muayene ve yakıt yönetimi" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Yeni Araç Ekle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl p-4 shadow-sm border border-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-blue-100 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-5 h-5 text-blue-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Toplam Araç" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-gray-800", children: vehicles.length })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl p-4 shadow-sm border border-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-green-100 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-green-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Aktif Araç" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-gray-800", children: vehicles.filter((v) => v.status === "active").length })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl p-4 shadow-sm border border-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-orange-100 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-5 h-5 text-orange-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Toplam Bakım" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-gray-800", children: [
            totalMaintenanceCost.toLocaleString("tr-TR"),
            " ₺"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl p-4 shadow-sm border border-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-red-100 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-red-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Uyarı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-gray-800", children: alerts.length })
        ] })
      ] }) })
    ] }),
    alerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-red-700 flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
        " Dikkat Gerektiren Durumlar"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: alerts.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-red-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
          v.name,
          " (",
          v.plate,
          ")"
        ] }),
        ":",
        isExpired(v.inspectionDate) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1", children: [
          "Muayene süresi dolmuş (",
          v.inspectionDate,
          ")"
        ] }),
        !isExpired(v.inspectionDate) && isExpiringSoon(v.inspectionDate) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1", children: [
          "Muayene yakında doluyor (",
          v.inspectionDate,
          ")"
        ] }),
        isExpired(v.insuranceDate) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 ml-2", children: [
          "Sigorta süresi dolmuş (",
          v.insuranceDate,
          ")"
        ] }),
        !isExpired(v.insuranceDate) && isExpiringSoon(v.insuranceDate) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1", children: [
          "Sigorta yakında doluyor (",
          v.insuranceDate,
          ")"
        ] })
      ] }, v.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex border-b border-gray-100", children: ["vehicles", "maintenance", "fuel"].map((tab) => {
        const labels = {
          vehicles: "Araçlar",
          maintenance: "Bakım Geçmişi",
          fuel: "Yakıt Kaydı"
        };
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab(tab),
            className: `px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
            children: labels[tab]
          },
          tab
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
        (activeTab === "maintenance" || activeTab === "fuel") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedVehicle(null),
              className: `px-3 py-1 rounded-full text-xs font-medium ${selectedVehicle === null ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`,
              children: "Tümü"
            }
          ),
          vehicles.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedVehicle(v.id),
              className: `px-3 py-1 rounded-full text-xs font-medium ${selectedVehicle === v.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`,
              children: v.name
            },
            v.id
          ))
        ] }),
        activeTab === "vehicles" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: vehicles.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "border border-gray-100 rounded-xl p-4 hover:bg-gray-50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-blue-50 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-5 h-5 text-blue-600" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-800", children: v.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500", children: [
                      v.brand,
                      " · ",
                      v.plate,
                      " · ",
                      v.year
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `px-2 py-1 rounded-full text-xs font-medium ${statusColors[v.status]}`,
                    children: statusLabels[v.status]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-lg p-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mb-0.5", children: "Yakıt" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-700", children: v.fuelType })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-lg p-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mb-0.5", children: "Kilometre" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-gray-700", children: [
                    v.mileage.toLocaleString("tr-TR"),
                    " km"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `rounded-lg p-2 ${isExpired(v.inspectionDate) ? "bg-red-50" : isExpiringSoon(v.inspectionDate) ? "bg-yellow-50" : "bg-gray-50"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mb-0.5", children: "Muayene" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: `font-medium text-sm ${isExpired(v.inspectionDate) ? "text-red-600" : isExpiringSoon(v.inspectionDate) ? "text-yellow-600" : "text-gray-700"}`,
                          children: v.inspectionDate
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `rounded-lg p-2 ${isExpired(v.insuranceDate) ? "bg-red-50" : isExpiringSoon(v.insuranceDate) ? "bg-yellow-50" : "bg-gray-50"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mb-0.5", children: "Sigorta" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: `font-medium text-sm ${isExpired(v.insuranceDate) ? "text-red-600" : isExpiringSoon(v.insuranceDate) ? "text-yellow-600" : "text-gray-700"}`,
                          children: v.insuranceDate
                        }
                      )
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-3 text-xs text-gray-500", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                  "Son bakım: ",
                  v.lastMaintenance
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-3 h-3" }),
                  "Sonraki bakım: ",
                  v.nextMaintenance
                ] })
              ] })
            ]
          },
          v.id
        )) }),
        activeTab === "maintenance" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                " Bakım Kaydı Ekle"
              ]
            }
          ) }),
          filteredMaintenance.map((r) => {
            const vehicle = vehicles.find((v) => v.id === r.vehicleId);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "border border-gray-100 rounded-xl p-4 flex items-start justify-between",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-orange-50 rounded-lg mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-4 h-4 text-orange-500" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-800", children: r.type }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `px-2 py-0.5 rounded-full text-xs font-medium ${maintenanceStatusColors[r.status]}`,
                            children: maintenanceStatusLabels[r.status]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500 mt-0.5", children: [
                        vehicle == null ? void 0 : vehicle.name,
                        " · ",
                        r.description
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 mt-1", children: [
                        r.date,
                        " · ",
                        r.technician
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-700 whitespace-nowrap", children: r.cost > 0 ? `${r.cost.toLocaleString("tr-TR")} ₺` : "-" })
                ]
              },
              r.id
            );
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 rounded-xl p-3 flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-blue-700", children: "Toplam Bakım Gideri" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-blue-700", children: [
              filteredMaintenance.filter((r) => r.status === "completed").reduce((s, r) => s + r.cost, 0).toLocaleString("tr-TR"),
              " ",
              "₺"
            ] })
          ] })
        ] }),
        activeTab === "fuel" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                " Yakıt Kaydı Ekle"
              ]
            }
          ) }),
          filteredFuel.map((r) => {
            const vehicle = vehicles.find((v) => v.id === r.vehicleId);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "border border-gray-100 rounded-xl p-4 flex items-start justify-between",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-green-50 rounded-lg mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Fuel, { className: "w-4 h-4 text-green-500" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-800", children: vehicle == null ? void 0 : vehicle.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500", children: [
                        r.liters,
                        " litre · ",
                        r.station
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 mt-1", children: [
                        r.date,
                        " · ",
                        r.mileage.toLocaleString("tr-TR"),
                        " km"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-gray-700", children: [
                    r.cost.toLocaleString("tr-TR"),
                    " ₺"
                  ] })
                ]
              },
              r.id
            );
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 rounded-xl p-3 flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-green-700", children: "Toplam Yakıt Gideri" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-green-700", children: [
              totalFuelCost.toLocaleString("tr-TR"),
              " ₺"
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  VehicleMaintenanceTracking as default
};
