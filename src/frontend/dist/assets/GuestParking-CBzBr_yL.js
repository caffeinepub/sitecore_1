import { r as reactExports, j as jsxRuntimeExports, a4 as Car, B as Button, P as Plus, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, v as MapPin, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-huPFjtKr.js";
const SPOTS = ["Z-01", "Z-02", "Z-03", "Z-04", "Z-05", "Z-06", "Z-07", "Z-08"];
const INITIAL_RECORDS = [
  {
    id: "1",
    plate: "34 ABC 123",
    ownerApartment: "A-101",
    guestName: "Mehmet Yılmaz",
    spotNo: "Z-03",
    checkIn: "2026-03-25 09:30",
    checkOut: "2026-03-25 18:00",
    duration: 8,
    status: "aktif",
    accessCode: "MZ8K4"
  },
  {
    id: "2",
    plate: "06 DEF 456",
    ownerApartment: "B-205",
    guestName: "Ayşe Kara",
    spotNo: "Z-05",
    checkIn: "2026-03-25 10:00",
    checkOut: "2026-03-25 14:00",
    duration: 4,
    status: "aktif",
    accessCode: "AK3R9"
  },
  {
    id: "3",
    plate: "35 GHI 789",
    ownerApartment: "C-302",
    guestName: "Fatih Arslan",
    spotNo: "Z-01",
    checkIn: "2026-03-24 11:00",
    checkOut: "2026-03-24 16:00",
    duration: 5,
    status: "tamamlandı",
    accessCode: "FA5T2"
  },
  {
    id: "4",
    plate: "41 JKL 321",
    ownerApartment: "A-203",
    guestName: "Zeynep Demir",
    spotNo: "Z-02",
    checkIn: "2026-03-26 08:00",
    checkOut: "2026-03-26 20:00",
    duration: 12,
    status: "bekleniyor",
    accessCode: "ZD7P1"
  }
];
function GuestParking({
  buildingId: _buildingId,
  isOwner,
  t: _t
}) {
  const [records, setRecords] = reactExports.useState(INITIAL_RECORDS);
  const [showModal, setShowModal] = reactExports.useState(false);
  const [showCode, setShowCode] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    plate: "",
    ownerApartment: "",
    guestName: "",
    spotNo: "Z-01",
    checkIn: "",
    checkOut: "",
    duration: "4"
  });
  const activeRecords = records.filter((r) => r.status === "aktif");
  const usedSpots = activeRecords.map((r) => r.spotNo);
  const availableSpots = SPOTS.filter((s) => !usedSpots.includes(s));
  const handleSave = () => {
    if (!form.plate || !form.ownerApartment || !form.guestName) return;
    const code = Math.random().toString(36).substring(2, 7).toUpperCase();
    const newRecord = {
      id: Date.now().toString(),
      plate: form.plate.toUpperCase(),
      ownerApartment: form.ownerApartment,
      guestName: form.guestName,
      spotNo: form.spotNo,
      checkIn: form.checkIn || (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").substring(0, 16),
      checkOut: form.checkOut,
      duration: Number(form.duration),
      status: "bekleniyor",
      accessCode: code
    };
    setRecords((prev) => [newRecord, ...prev]);
    setShowCode(code);
    setShowModal(false);
  };
  const complete = (id) => setRecords(
    (prev) => prev.map((r) => r.id === id ? { ...r, status: "tamamlandı" } : r)
  );
  const activate = (id) => setRecords(
    (prev) => prev.map((r) => r.id === id ? { ...r, status: "aktif" } : r)
  );
  const statusColor = (status) => status === "aktif" ? "bg-green-100 text-green-800" : status === "bekleniyor" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-600";
  const spotOccupancy = SPOTS.map((spot) => ({
    spot,
    status: activeRecords.find((r) => r.spotNo === spot) ? "dolu" : "boş",
    record: activeRecords.find((r) => r.spotNo === spot)
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-gray-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-7 h-7 text-blue-600" }),
          " Misafir Otopark Yönetimi"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mt-1", children: "Ziyaretçi araç giriş takibi, geçici park tahsisi ve erişim kodları" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowModal(true),
          className: "bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Misafir Kaydı"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-blue-600", children: activeRecords.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Aktif Park" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-green-600", children: availableSpots.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Boş Yer" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-orange-600", children: SPOTS.length - availableSpots.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Dolu Yer" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-gray-700", children: records.filter((r) => r.status === "tamamlandı").length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Bugün Tamamlanan" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "grid", children: "Park Haritası" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "list", children: "Kayıt Listesi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "history", children: "Geçmiş" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "grid", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-6 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-gray-900 mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-blue-500" }),
          " Misafir Park Alanları"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-3 mb-4", children: spotOccupancy.map(({ spot, status, record }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `rounded-xl p-3 border-2 transition ${status === "dolu" ? "border-red-300 bg-red-50" : "border-green-300 bg-green-50"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Car,
                {
                  className: `w-6 h-6 mx-auto mb-1 ${status === "dolu" ? "text-red-500" : "text-green-400"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-sm text-gray-900", children: spot }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `text-xs font-medium mt-0.5 ${status === "dolu" ? "text-red-600" : "text-green-600"}`,
                  children: status
                }
              ),
              record && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 mt-1 truncate", children: record.plate })
            ] })
          },
          spot
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full bg-green-400 inline-block" }),
            "Boş (",
            availableSpots.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full bg-red-400 inline-block" }),
            "Dolu (",
            usedSpots.length,
            ")"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "list", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 border-b border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Plaka" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Ziyaretçi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Daire" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Yer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Giriş" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Çıkış" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Durum" }),
          isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-gray-50", children: records.filter((r) => r.status !== "tamamlandı").map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono font-bold text-gray-900", children: r.plate }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-700", children: r.guestName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-600", children: r.ownerApartment }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono text-sm", children: r.spotNo }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-600 text-sm", children: r.checkIn }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-600 text-sm", children: r.checkOut || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(r.status)}`,
              children: r.status
            }
          ) }),
          isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            r.status === "bekleniyor" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => activate(r.id),
                className: "text-xs text-green-600 hover:underline",
                children: "Giriş Yaptı"
              }
            ),
            r.status === "aktif" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => complete(r.id),
                className: "text-xs text-red-500 hover:underline",
                children: "Çıkış Yaptı"
              }
            )
          ] })
        ] }, r.id)) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "history", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 border-b border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Plaka" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Ziyaretçi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Daire" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Süre" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Tarih" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-gray-50", children: records.filter((r) => r.status === "tamamlandı").map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono font-bold text-gray-900", children: r.plate }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-700", children: r.guestName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-600", children: r.ownerApartment }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-gray-600", children: [
            r.duration,
            " saat"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-600 text-sm", children: r.checkIn.split(" ")[0] })
        ] }, r.id)) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showModal, onOpenChange: setShowModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Misafir Park Kaydı" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "gp-plate",
                className: "text-xs font-medium text-gray-600",
                children: "Plaka"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "gp-plate",
                value: form.plate,
                onChange: (e) => setForm((f) => ({ ...f, plate: e.target.value })),
                placeholder: "34 ABC 123",
                className: "mt-1 font-mono"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "gp-guest-name",
                className: "text-xs font-medium text-gray-600",
                children: "Ziyaretçi Adı"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "gp-guest-name",
                value: form.guestName,
                onChange: (e) => setForm((f) => ({ ...f, guestName: e.target.value })),
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
                htmlFor: "gp-owner-apt",
                className: "text-xs font-medium text-gray-600",
                children: "Ev Sahibi Daire"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "gp-owner-apt",
                value: form.ownerApartment,
                onChange: (e) => setForm((f) => ({ ...f, ownerApartment: e.target.value })),
                placeholder: "A-101",
                className: "mt-1"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "gp-spot-no",
                className: "text-xs font-medium text-gray-600",
                children: "Park Yeri"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "gp-spot-no",
                value: form.spotNo,
                onChange: (e) => setForm((f) => ({ ...f, spotNo: e.target.value })),
                className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1",
                children: [
                  availableSpots.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: s, children: [
                    s,
                    " (Boş)"
                  ] }, s)),
                  usedSpots.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: s, disabled: true, children: [
                    s,
                    " (Dolu)"
                  ] }, s))
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "gp-check-in",
                className: "text-xs font-medium text-gray-600",
                children: "Giriş Zamanı"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "gp-check-in",
                type: "datetime-local",
                value: form.checkIn,
                onChange: (e) => setForm((f) => ({ ...f, checkIn: e.target.value })),
                className: "mt-1"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "gp-check-out",
                className: "text-xs font-medium text-gray-600",
                children: "Tahmini Çıkış"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "gp-check-out",
                type: "datetime-local",
                value: form.checkOut,
                onChange: (e) => setForm((f) => ({ ...f, checkOut: e.target.value })),
                className: "mt-1"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSave,
              className: "flex-1 bg-blue-600 hover:bg-blue-700 text-white",
              children: "Kaydet & Kod Üret"
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
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!showCode, onOpenChange: () => setShowCode(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Erişim Kodu Oluşturuldu" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl font-bold font-mono tracking-widest text-blue-700 bg-blue-50 rounded-xl py-6 px-4 mb-4", children: showCode }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600", children: "Bu kodu ziyaretçinizle paylaşın. Güvenlik görevlisi giriş için bu kodu kullanacak." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setShowCode(null), className: "w-full", children: "Tamam" })
    ] }) })
  ] });
}
export {
  GuestParking as default
};
