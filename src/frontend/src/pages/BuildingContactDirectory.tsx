import React, { useState } from "react";

interface Contact {
  id: number;
  name: string;
  title: string;
  category: string;
  phone: string;
  email: string;
  availability: string;
  notes: string;
}

const sampleContacts: Contact[] = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    title: "Site Yöneticisi",
    category: "Yönetim",
    phone: "0532 111 22 33",
    email: "ahmet@sitecore.com",
    availability: "Hf. içi 09:00-18:00",
    notes: "Genel yönetim işleri",
  },
  {
    id: 2,
    name: "Fatma Kaya",
    title: "Muhasebe Sorumlusu",
    category: "Yönetim",
    phone: "0533 222 33 44",
    email: "fatma@sitecore.com",
    availability: "Hf. içi 09:00-17:00",
    notes: "Aidat ve ödeme işlemleri",
  },
  {
    id: 3,
    name: "Mehmet Demir",
    title: "Güvenlik Görevlisi (Gündüz)",
    category: "Güvenlik",
    phone: "0534 333 44 55",
    email: "",
    availability: "07:00-19:00",
    notes: "Ana kapı güvenlik",
  },
  {
    id: 4,
    name: "Ali Çelik",
    title: "Güvenlik Görevlisi (Gece)",
    category: "Güvenlik",
    phone: "0535 444 55 66",
    email: "",
    availability: "19:00-07:00",
    notes: "Gece nöbet",
  },
  {
    id: 5,
    name: "Ayşe Şahin",
    title: "Temizlik Personeli",
    category: "Teknik",
    phone: "0536 555 66 77",
    email: "",
    availability: "08:00-16:00",
    notes: "Ortak alan temizliği",
  },
  {
    id: 6,
    name: "Hasan Arslan",
    title: "Kapıcı / Bakım Görevlisi",
    category: "Teknik",
    phone: "0537 666 77 88",
    email: "",
    availability: "07:00-20:00",
    notes: "Bina bakım ve onarım",
  },
  {
    id: 7,
    name: "Zeynep Koç",
    title: "Asansör Bakım Teknisyeni",
    category: "Teknik",
    phone: "0538 777 88 99",
    email: "zeynep@asansorservis.com",
    availability: "Hf. içi 08:00-17:00",
    notes: "Asansör bakım sözleşmesi",
  },
  {
    id: 8,
    name: "Mustafa Aydın",
    title: "Elektrik Teknisyeni",
    category: "Teknik",
    phone: "0539 888 99 00",
    email: "",
    availability: "Mesai saatleri",
    notes: "Elektrik arızaları",
  },
  {
    id: 9,
    name: "Yönetim Kurulu Başkanı",
    title: "Daire 12 - K. Çetin",
    category: "Yönetim Kurulu",
    phone: "0530 000 11 22",
    email: "kcetin@email.com",
    availability: "Akşam 19:00 sonrası",
    notes: "Yönetim kurulu kararları",
  },
  {
    id: 10,
    name: "Denetçi",
    title: "Daire 8 - S. Özdemir",
    category: "Yönetim Kurulu",
    phone: "0531 111 22 33",
    email: "",
    availability: "Hafta sonu",
    notes: "Bina denetim işleri",
  },
  {
    id: 11,
    name: "Belediye Hizmet Hattı",
    title: "Belediye",
    category: "Resmi Kurumlar",
    phone: "153",
    email: "",
    availability: "7/24",
    notes: "Şikayet ve talepler",
  },
  {
    id: 12,
    name: "İtfaiye",
    title: "Acil Durum",
    category: "Acil",
    phone: "110",
    email: "",
    availability: "7/24",
    notes: "Yangın ve kurtarma",
  },
  {
    id: 13,
    name: "Ambulans",
    title: "Acil Durum",
    category: "Acil",
    phone: "112",
    email: "",
    availability: "7/24",
    notes: "Sağlık acil",
  },
  {
    id: 14,
    name: "Polis",
    title: "Acil Durum",
    category: "Acil",
    phone: "155",
    email: "",
    availability: "7/24",
    notes: "Güvenlik acil",
  },
];

const categories = [
  "Tümü",
  "Yönetim",
  "Güvenlik",
  "Teknik",
  "Yönetim Kurulu",
  "Resmi Kurumlar",
  "Acil",
];

const categoryColors: Record<string, string> = {
  Yönetim: "bg-blue-100 text-blue-700",
  Güvenlik: "bg-red-100 text-red-700",
  Teknik: "bg-orange-100 text-orange-700",
  "Yönetim Kurulu": "bg-purple-100 text-purple-700",
  "Resmi Kurumlar": "bg-green-100 text-green-700",
  Acil: "bg-rose-100 text-rose-800",
};

export default function BuildingContactDirectory({
  buildingId: _buildingId,
  t: _t,
}: { buildingId: string; t: Record<string, string> }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    title: "",
    category: "Yönetim",
    phone: "",
    email: "",
    availability: "",
    notes: "",
  });
  const [contacts, setContacts] = useState(sampleContacts);

  const filtered = contacts.filter((c) => {
    const matchCat =
      selectedCategory === "Tümü" || c.category === selectedCategory;
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
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
      notes: "",
    });
    setShowForm(false);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Bina İletişim Rehberi
          </h2>
          <p className="text-sm text-gray-500">
            Yönetici, personel ve acil iletişim bilgileri
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          + Kişi Ekle
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {["Yönetim", "Teknik", "Acil"].map((cat) => (
          <div key={cat} className="bg-white rounded-lg border p-3 text-center">
            <div className="text-2xl font-bold text-gray-800">
              {contacts.filter((c) => c.category === cat).length}
            </div>
            <div className="text-xs text-gray-500">{cat}</div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="İsim, ünvan veya telefon ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              selectedCategory === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
          <h3 className="font-semibold text-blue-800">Yeni Kişi Ekle</h3>
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="Ad Soyad *"
              value={newContact.name}
              onChange={(e) =>
                setNewContact({ ...newContact, name: e.target.value })
              }
              className="border rounded px-2 py-1 text-sm"
            />
            <input
              placeholder="Ünvan / Görev"
              value={newContact.title}
              onChange={(e) =>
                setNewContact({ ...newContact, title: e.target.value })
              }
              className="border rounded px-2 py-1 text-sm"
            />
            <select
              value={newContact.category}
              onChange={(e) =>
                setNewContact({ ...newContact, category: e.target.value })
              }
              className="border rounded px-2 py-1 text-sm"
            >
              {categories
                .filter((c) => c !== "Tümü")
                .map((c) => (
                  <option key={c}>{c}</option>
                ))}
            </select>
            <input
              placeholder="Telefon *"
              value={newContact.phone}
              onChange={(e) =>
                setNewContact({ ...newContact, phone: e.target.value })
              }
              className="border rounded px-2 py-1 text-sm"
            />
            <input
              placeholder="E-posta"
              value={newContact.email}
              onChange={(e) =>
                setNewContact({ ...newContact, email: e.target.value })
              }
              className="border rounded px-2 py-1 text-sm"
            />
            <input
              placeholder="Uygunluk saatleri"
              value={newContact.availability}
              onChange={(e) =>
                setNewContact({ ...newContact, availability: e.target.value })
              }
              className="border rounded px-2 py-1 text-sm"
            />
          </div>
          <input
            placeholder="Notlar"
            value={newContact.notes}
            onChange={(e) =>
              setNewContact({ ...newContact, notes: e.target.value })
            }
            className="w-full border rounded px-2 py-1 text-sm"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700"
            >
              Kaydet
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded text-sm hover:bg-gray-200"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Contact Cards */}
      <div className="grid grid-cols-1 gap-3">
        {filtered.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    {contact.name}
                  </div>
                  <div className="text-sm text-gray-500">{contact.title}</div>
                </div>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${categoryColors[contact.category] || "bg-gray-100 text-gray-600"}`}
              >
                {contact.category}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1 text-gray-700">
                <span className="text-blue-500">📞</span>
                <a
                  href={`tel:${contact.phone}`}
                  className="hover:text-blue-600 font-medium"
                >
                  {contact.phone}
                </a>
              </div>
              {contact.email && (
                <div className="flex items-center gap-1 text-gray-600 truncate">
                  <span>✉️</span>
                  <span className="truncate">{contact.email}</span>
                </div>
              )}
              {contact.availability && (
                <div className="flex items-center gap-1 text-gray-500">
                  <span>🕐</span>
                  <span>{contact.availability}</span>
                </div>
              )}
              {contact.notes && (
                <div className="flex items-center gap-1 text-gray-500 col-span-2">
                  <span>📝</span>
                  <span>{contact.notes}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-400 py-10">Kişi bulunamadı.</div>
      )}
    </div>
  );
}
