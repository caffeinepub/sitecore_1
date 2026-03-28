import { r as reactExports, j as jsxRuntimeExports } from "./index-DrmT2NwI.js";
const sampleContacts = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    title: "Site Yöneticisi",
    category: "Yönetim",
    phone: "0532 111 22 33",
    email: "ahmet@sitecore.com",
    availability: "Hf. içi 09:00-18:00",
    notes: "Genel yönetim işleri"
  },
  {
    id: 2,
    name: "Fatma Kaya",
    title: "Muhasebe Sorumlusu",
    category: "Yönetim",
    phone: "0533 222 33 44",
    email: "fatma@sitecore.com",
    availability: "Hf. içi 09:00-17:00",
    notes: "Aidat ve ödeme işlemleri"
  },
  {
    id: 3,
    name: "Mehmet Demir",
    title: "Güvenlik Görevlisi (Gündüz)",
    category: "Güvenlik",
    phone: "0534 333 44 55",
    email: "",
    availability: "07:00-19:00",
    notes: "Ana kapı güvenlik"
  },
  {
    id: 4,
    name: "Ali Çelik",
    title: "Güvenlik Görevlisi (Gece)",
    category: "Güvenlik",
    phone: "0535 444 55 66",
    email: "",
    availability: "19:00-07:00",
    notes: "Gece nöbet"
  },
  {
    id: 5,
    name: "Ayşe Şahin",
    title: "Temizlik Personeli",
    category: "Teknik",
    phone: "0536 555 66 77",
    email: "",
    availability: "08:00-16:00",
    notes: "Ortak alan temizliği"
  },
  {
    id: 6,
    name: "Hasan Arslan",
    title: "Kapıcı / Bakım Görevlisi",
    category: "Teknik",
    phone: "0537 666 77 88",
    email: "",
    availability: "07:00-20:00",
    notes: "Bina bakım ve onarım"
  },
  {
    id: 7,
    name: "Zeynep Koç",
    title: "Asansör Bakım Teknisyeni",
    category: "Teknik",
    phone: "0538 777 88 99",
    email: "zeynep@asansorservis.com",
    availability: "Hf. içi 08:00-17:00",
    notes: "Asansör bakım sözleşmesi"
  },
  {
    id: 8,
    name: "Mustafa Aydın",
    title: "Elektrik Teknisyeni",
    category: "Teknik",
    phone: "0539 888 99 00",
    email: "",
    availability: "Mesai saatleri",
    notes: "Elektrik arızaları"
  },
  {
    id: 9,
    name: "Yönetim Kurulu Başkanı",
    title: "Daire 12 - K. Çetin",
    category: "Yönetim Kurulu",
    phone: "0530 000 11 22",
    email: "kcetin@email.com",
    availability: "Akşam 19:00 sonrası",
    notes: "Yönetim kurulu kararları"
  },
  {
    id: 10,
    name: "Denetçi",
    title: "Daire 8 - S. Özdemir",
    category: "Yönetim Kurulu",
    phone: "0531 111 22 33",
    email: "",
    availability: "Hafta sonu",
    notes: "Bina denetim işleri"
  },
  {
    id: 11,
    name: "Belediye Hizmet Hattı",
    title: "Belediye",
    category: "Resmi Kurumlar",
    phone: "153",
    email: "",
    availability: "7/24",
    notes: "Şikayet ve talepler"
  },
  {
    id: 12,
    name: "İtfaiye",
    title: "Acil Durum",
    category: "Acil",
    phone: "110",
    email: "",
    availability: "7/24",
    notes: "Yangın ve kurtarma"
  },
  {
    id: 13,
    name: "Ambulans",
    title: "Acil Durum",
    category: "Acil",
    phone: "112",
    email: "",
    availability: "7/24",
    notes: "Sağlık acil"
  },
  {
    id: 14,
    name: "Polis",
    title: "Acil Durum",
    category: "Acil",
    phone: "155",
    email: "",
    availability: "7/24",
    notes: "Güvenlik acil"
  }
];
const categories = [
  "Tümü",
  "Yönetim",
  "Güvenlik",
  "Teknik",
  "Yönetim Kurulu",
  "Resmi Kurumlar",
  "Acil"
];
const categoryColors = {
  Yönetim: "bg-blue-100 text-blue-700",
  Güvenlik: "bg-red-100 text-red-700",
  Teknik: "bg-orange-100 text-orange-700",
  "Yönetim Kurulu": "bg-purple-100 text-purple-700",
  "Resmi Kurumlar": "bg-green-100 text-green-700",
  Acil: "bg-rose-100 text-rose-800"
};
function BuildingContactDirectory({
  buildingId: _buildingId,
  t: _t
}) {
  const [search, setSearch] = reactExports.useState("");
  const [selectedCategory, setSelectedCategory] = reactExports.useState("Tümü");
  const [showForm, setShowForm] = reactExports.useState(false);
  const [newContact, setNewContact] = reactExports.useState({
    name: "",
    title: "",
    category: "Yönetim",
    phone: "",
    email: "",
    availability: "",
    notes: ""
  });
  const [contacts, setContacts] = reactExports.useState(sampleContacts);
  const filtered = contacts.filter((c) => {
    const matchCat = selectedCategory === "Tümü" || c.category === selectedCategory;
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.title.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search);
    return matchCat && matchSearch;
  });
  const handleAdd = () => {
    if (!newContact.name || !newContact.phone) return;
    setContacts((prev) => [...prev, { ...newContact, id: Date.now() }]);
    setNewContact({
      name: "",
      title: "",
      category: "Yönetim",
      phone: "",
      email: "",
      availability: "",
      notes: ""
    });
    setShowForm(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-gray-800", children: "Bina İletişim Rehberi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Yönetici, personel ve acil iletişim bilgileri" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setShowForm(!showForm),
          className: "bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700",
          children: "+ Kişi Ekle"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: ["Yönetim", "Teknik", "Acil"].map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg border p-3 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-gray-800", children: contacts.filter((c) => c.category === cat).length }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500", children: cat })
    ] }, cat)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "text",
        placeholder: "İsim, ünvan veya telefon ara...",
        value: search,
        onChange: (e) => setSearch(e.target.value),
        className: "flex-1 border rounded-lg px-3 py-2 text-sm"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setSelectedCategory(cat),
        className: `px-3 py-1 rounded-full text-xs font-medium border ${selectedCategory === cat ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`,
        children: cat
      },
      cat
    )) }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-blue-800", children: "Yeni Kişi Ekle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            placeholder: "Ad Soyad *",
            value: newContact.name,
            onChange: (e) => setNewContact({ ...newContact, name: e.target.value }),
            className: "border rounded px-2 py-1 text-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            placeholder: "Ünvan / Görev",
            value: newContact.title,
            onChange: (e) => setNewContact({ ...newContact, title: e.target.value }),
            className: "border rounded px-2 py-1 text-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: newContact.category,
            onChange: (e) => setNewContact({ ...newContact, category: e.target.value }),
            className: "border rounded px-2 py-1 text-sm",
            children: categories.filter((c) => c !== "Tümü").map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            placeholder: "Telefon *",
            value: newContact.phone,
            onChange: (e) => setNewContact({ ...newContact, phone: e.target.value }),
            className: "border rounded px-2 py-1 text-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            placeholder: "E-posta",
            value: newContact.email,
            onChange: (e) => setNewContact({ ...newContact, email: e.target.value }),
            className: "border rounded px-2 py-1 text-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            placeholder: "Uygunluk saatleri",
            value: newContact.availability,
            onChange: (e) => setNewContact({ ...newContact, availability: e.target.value }),
            className: "border rounded px-2 py-1 text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          placeholder: "Notlar",
          value: newContact.notes,
          onChange: (e) => setNewContact({ ...newContact, notes: e.target.value }),
          className: "w-full border rounded px-2 py-1 text-sm"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleAdd,
            className: "bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700",
            children: "Kaydet"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowForm(false),
            className: "bg-gray-100 text-gray-600 px-4 py-1.5 rounded text-sm hover:bg-gray-200",
            children: "İptal"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3", children: filtered.map((contact) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-white rounded-xl border border-gray-100 shadow-sm p-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm", children: contact.name.charAt(0) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-gray-800", children: contact.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: contact.title })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs px-2 py-1 rounded-full font-medium ${categoryColors[contact.category] || "bg-gray-100 text-gray-600"}`,
                children: contact.category
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500", children: "📞" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `tel:${contact.phone}`,
                  className: "hover:text-blue-600 font-medium",
                  children: contact.phone
                }
              )
            ] }),
            contact.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-gray-600 truncate", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✉️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: contact.email })
            ] }),
            contact.availability && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-gray-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🕐" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: contact.availability })
            ] }),
            contact.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-gray-500 col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📝" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: contact.notes })
            ] })
          ] })
        ]
      },
      contact.id
    )) }),
    filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-gray-400 py-10", children: "Kişi bulunamadı." })
  ] });
}
export {
  BuildingContactDirectory as default
};
