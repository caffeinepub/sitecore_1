import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, au as PawPrint, B as Button, P as Plus, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, I as Input, T as TriangleAlert, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle } from "./index-huPFjtKr.js";
import { P as Pen } from "./pen-DWQ5WCba.js";
import { T as Trash2 } from "./trash-2-B-7knzjU.js";
import { C as CircleCheckBig } from "./circle-check-big-DBoDJ1Xt.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m18 2 4 4", key: "22kx64" }],
  ["path", { d: "m17 7 3-3", key: "1w1zoj" }],
  ["path", { d: "M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5", key: "1exhtz" }],
  ["path", { d: "m9 11 4 4", key: "rovt3i" }],
  ["path", { d: "m5 19-3 3", key: "59f2uf" }],
  ["path", { d: "m14 4 6 6", key: "yqp9t2" }]
];
const Syringe = createLucideIcon("syringe", __iconNode);
const INITIAL_PETS = [
  {
    id: "1",
    apartmentNo: "A-101",
    ownerName: "Ahmet Yılmaz",
    petName: "Karamel",
    petType: "Kedi",
    breed: "British Shorthair",
    age: 3,
    vaccineStatus: "güncel",
    nextVaccineDate: "2026-08-15",
    registeredAt: "2024-03-10",
    notes: "Kısırlaştırılmış"
  },
  {
    id: "2",
    apartmentNo: "B-203",
    ownerName: "Fatma Kaya",
    petName: "Aslan",
    petType: "Köpek",
    breed: "Golden Retriever",
    age: 5,
    vaccineStatus: "güncel",
    nextVaccineDate: "2026-06-20",
    registeredAt: "2023-11-05",
    notes: "Tasmalı, eğitimli"
  },
  {
    id: "3",
    apartmentNo: "A-305",
    ownerName: "Mehmet Demir",
    petName: "Boncuk",
    petType: "Kedi",
    breed: "Tekir",
    age: 1,
    vaccineStatus: "eksik",
    nextVaccineDate: "",
    registeredAt: "2025-01-20",
    notes: ""
  },
  {
    id: "4",
    apartmentNo: "C-102",
    ownerName: "Zeynep Ak",
    petName: "Pamuk",
    petType: "Tavşan",
    breed: "Angora",
    age: 2,
    vaccineStatus: "bilinmiyor",
    nextVaccineDate: "",
    registeredAt: "2024-07-12",
    notes: "Balkondan çıkmaz"
  },
  {
    id: "5",
    apartmentNo: "B-401",
    ownerName: "Emre Çelik",
    petName: "Duman",
    petType: "Kedi",
    breed: "Van Kedisi",
    age: 4,
    vaccineStatus: "güncel",
    nextVaccineDate: "2026-09-01",
    registeredAt: "2023-06-18",
    notes: ""
  }
];
const INITIAL_COMPLAINTS = [
  {
    id: "1",
    apartmentNo: "A-102",
    subject: "Gürültü şikayeti",
    description: "Gece geç saatlerde B-203 dairesindeki köpek sürekli havlıyor.",
    date: "2026-03-10",
    status: "inceleniyor"
  },
  {
    id: "2",
    apartmentNo: "C-201",
    subject: "Ortak alan temizliği",
    description: "A-305 sahibi evcil hayvanını ortak bahçede gezdirdikten sonra temizlik yapmıyor.",
    date: "2026-03-18",
    status: "açık"
  },
  {
    id: "3",
    apartmentNo: "B-105",
    subject: "Asansörde evcil hayvan",
    description: "Tasmasız köpek asansörde çocuğumuzu korkuttu.",
    date: "2026-03-20",
    status: "açık"
  }
];
function PetManagement({
  buildingId: _buildingId,
  isOwner,
  t: _t
}) {
  const [pets, setPets] = reactExports.useState(INITIAL_PETS);
  const [complaints, setComplaints] = reactExports.useState(INITIAL_COMPLAINTS);
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editPet, setEditPet] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [filterType, setFilterType] = reactExports.useState("hepsi");
  const [form, setForm] = reactExports.useState({
    apartmentNo: "",
    ownerName: "",
    petName: "",
    petType: "Kedi",
    breed: "",
    age: "",
    vaccineStatus: "güncel",
    nextVaccineDate: "",
    notes: ""
  });
  const filteredPets = pets.filter((p) => {
    const matchSearch = p.petName.toLowerCase().includes(search.toLowerCase()) || p.apartmentNo.toLowerCase().includes(search.toLowerCase()) || p.ownerName.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "hepsi" || p.petType === filterType;
    return matchSearch && matchType;
  });
  const vaccineStats = {
    güncel: pets.filter((p) => p.vaccineStatus === "güncel").length,
    eksik: pets.filter((p) => p.vaccineStatus === "eksik").length,
    bilinmiyor: pets.filter((p) => p.vaccineStatus === "bilinmiyor").length
  };
  const typeStats = ["Kedi", "Köpek", "Tavşan", "Kuş", "Diğer"].map((type) => ({
    type,
    count: pets.filter((p) => p.petType === type).length
  })).filter((s) => s.count > 0);
  const openAdd = () => {
    setEditPet(null);
    setForm({
      apartmentNo: "",
      ownerName: "",
      petName: "",
      petType: "Kedi",
      breed: "",
      age: "",
      vaccineStatus: "güncel",
      nextVaccineDate: "",
      notes: ""
    });
    setShowModal(true);
  };
  const openEdit = (pet) => {
    setEditPet(pet);
    setForm({
      apartmentNo: pet.apartmentNo,
      ownerName: pet.ownerName,
      petName: pet.petName,
      petType: pet.petType,
      breed: pet.breed,
      age: String(pet.age),
      vaccineStatus: pet.vaccineStatus,
      nextVaccineDate: pet.nextVaccineDate,
      notes: pet.notes
    });
    setShowModal(true);
  };
  const handleSave = () => {
    if (!form.apartmentNo || !form.petName || !form.ownerName) return;
    if (editPet) {
      setPets(
        (prev) => prev.map(
          (p) => p.id === editPet.id ? { ...editPet, ...form, age: Number(form.age) } : p
        )
      );
    } else {
      const newPet = {
        id: Date.now().toString(),
        ...form,
        age: Number(form.age),
        registeredAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      };
      setPets((prev) => [newPet, ...prev]);
    }
    setShowModal(false);
  };
  const deletePet = (id) => setPets((prev) => prev.filter((p) => p.id !== id));
  const vaccineColor = (status) => status === "güncel" ? "bg-green-100 text-green-800" : status === "eksik" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800";
  const complaintStatusColor = (status) => status === "kapatıldı" ? "bg-green-100 text-green-800" : status === "inceleniyor" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-gray-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PawPrint, { className: "w-7 h-7 text-orange-500" }),
          " Evcil Hayvan Yönetimi"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mt-1", children: "Bina sakinlerinin kayıtlı evcil hayvanları ve sağlık takibi" })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: openAdd,
          className: "bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Yeni Kayıt"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-gray-900", children: pets.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Toplam Evcil Hayvan" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-green-600", children: vaccineStats.güncel }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Aşı Güncel" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-red-600", children: vaccineStats.eksik }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Aşı Eksik" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-orange-600", children: complaints.filter((c) => c.status !== "kapatıldı").length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Açık Şikayet" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "pets", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "pets", children: "Kayıtlı Hayvanlar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "complaints", children: "Şikayetler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "stats", children: "İstatistikler" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pets", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-gray-100 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Hayvan adı, daire veya sakin ara...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "max-w-xs"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: filterType,
              onChange: (e) => setFilterType(e.target.value),
              className: "border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "hepsi", children: "Tüm Türler" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Kedi", children: "Kedi" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Köpek", children: "Köpek" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Tavşan", children: "Tavşan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Kuş", children: "Kuş" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Diğer", children: "Diğer" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100 bg-gray-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Daire" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Sakin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Hayvan Adı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Tür / Cins" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Yaş" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Aşı Durumu" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Sonraki Aşı" }),
            isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            filteredPets.map((pet) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-gray-50 hover:bg-gray-50 transition",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-gray-900", children: pet.apartmentNo }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-700", children: pet.ownerName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-gray-900", children: pet.petName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-gray-600", children: [
                    pet.petType,
                    " / ",
                    pet.breed || "—"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-gray-600", children: [
                    pet.age,
                    " yaş"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs font-semibold px-2 py-1 rounded-full ${vaccineColor(pet.vaccineStatus)}`,
                      children: pet.vaccineStatus === "güncel" ? "✓ Güncel" : pet.vaccineStatus === "eksik" ? "⚠ Eksik" : "? Bilinmiyor"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-600 text-sm", children: pet.nextVaccineDate || "—" }),
                  isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => openEdit(pet),
                        className: "text-blue-500 hover:text-blue-700",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => deletePet(pet.id),
                        className: "text-red-400 hover:text-red-600",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                      }
                    )
                  ] }) })
                ]
              },
              pet.id
            )),
            filteredPets.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                colSpan: 8,
                className: "text-center py-8 text-gray-400",
                children: "Kayıt bulunamadı"
              }
            ) })
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "complaints", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: complaints.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-orange-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-900", children: c.subject }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs px-2 py-0.5 rounded-full font-medium ${complaintStatusColor(c.status)}`,
                    children: c.status
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-1", children: c.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
                "Daire ",
                c.apartmentNo,
                " · ",
                c.date
              ] })
            ] }),
            isOwner && c.status !== "kapatıldı" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setComplaints(
                  (prev) => prev.map(
                    (item) => item.id === c.id ? {
                      ...item,
                      status: item.status === "açık" ? "inceleniyor" : "kapatıldı"
                    } : item
                  )
                ),
                className: "text-sm text-blue-600 hover:underline whitespace-nowrap",
                children: c.status === "açık" ? "İncele" : "Kapat"
              }
            )
          ] })
        },
        c.id
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "stats", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-6 border border-gray-100 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-4", children: "Tür Dağılımı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: typeStats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-700 w-20", children: s.type }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-gray-100 rounded-full h-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-orange-400 h-3 rounded-full transition-all",
                style: { width: `${s.count / pets.length * 100}%` }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-gray-900 w-6 text-right", children: s.count })
          ] }, s.type)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-6 border border-gray-100 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-4", children: "Aşı Durumu Özeti" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-3 bg-green-50 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-green-600" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-green-800", children: "Aşı Güncel" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-green-700", children: vaccineStats.güncel })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-3 bg-red-50 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-red-600" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-red-800", children: "Aşı Eksik" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-red-700", children: vaccineStats.eksik })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-3 bg-yellow-50 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Syringe, { className: "w-5 h-5 text-yellow-600" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-yellow-800", children: "Bilinmiyor" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-yellow-700", children: vaccineStats.bilinmiyor })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showModal, onOpenChange: setShowModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editPet ? "Kaydı Düzenle" : "Yeni Evcil Hayvan Kaydı" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "pm-apt-no",
                className: "text-xs font-medium text-gray-600",
                children: "Daire No"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pm-apt-no",
                value: form.apartmentNo,
                onChange: (e) => setForm((f) => ({ ...f, apartmentNo: e.target.value })),
                placeholder: "A-101",
                className: "mt-1"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "pm-owner-name",
                className: "text-xs font-medium text-gray-600",
                children: "Sakin Adı"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pm-owner-name",
                value: form.ownerName,
                onChange: (e) => setForm((f) => ({ ...f, ownerName: e.target.value })),
                placeholder: "Ad Soyad",
                className: "mt-1"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "pm-pet-name",
                className: "text-xs font-medium text-gray-600",
                children: "Hayvan Adı"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pm-pet-name",
                value: form.petName,
                onChange: (e) => setForm((f) => ({ ...f, petName: e.target.value })),
                placeholder: "Karamel",
                className: "mt-1"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "pm-pet-type",
                className: "text-xs font-medium text-gray-600",
                children: "Tür"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "pm-pet-type",
                value: form.petType,
                onChange: (e) => setForm((f) => ({ ...f, petType: e.target.value })),
                className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1",
                children: ["Kedi", "Köpek", "Kuş", "Tavşan", "Balık", "Diğer"].map(
                  (t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, children: t }, t)
                )
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "pm-breed",
                className: "text-xs font-medium text-gray-600",
                children: "Cins"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pm-breed",
                value: form.breed,
                onChange: (e) => setForm((f) => ({ ...f, breed: e.target.value })),
                placeholder: "British Shorthair",
                className: "mt-1"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "pm-age",
                className: "text-xs font-medium text-gray-600",
                children: "Yaş"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pm-age",
                type: "number",
                value: form.age,
                onChange: (e) => setForm((f) => ({ ...f, age: e.target.value })),
                placeholder: "3",
                className: "mt-1"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "pm-vaccine-status",
                className: "text-xs font-medium text-gray-600",
                children: "Aşı Durumu"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "pm-vaccine-status",
                value: form.vaccineStatus,
                onChange: (e) => setForm((f) => ({
                  ...f,
                  vaccineStatus: e.target.value
                })),
                className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "güncel", children: "Güncel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "eksik", children: "Eksik" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "bilinmiyor", children: "Bilinmiyor" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "pm-next-vaccine",
                className: "text-xs font-medium text-gray-600",
                children: "Sonraki Aşı Tarihi"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pm-next-vaccine",
                type: "date",
                value: form.nextVaccineDate,
                onChange: (e) => setForm((f) => ({ ...f, nextVaccineDate: e.target.value })),
                className: "mt-1"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "pm-notes",
              className: "text-xs font-medium text-gray-600",
              children: "Notlar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "pm-notes",
              value: form.notes,
              onChange: (e) => setForm((f) => ({ ...f, notes: e.target.value })),
              placeholder: "Ek bilgiler...",
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSave,
              className: "flex-1 bg-orange-500 hover:bg-orange-600 text-white",
              children: "Kaydet"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowModal(false),
              className: "flex-1",
              children: "İptal"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  PetManagement as default
};
