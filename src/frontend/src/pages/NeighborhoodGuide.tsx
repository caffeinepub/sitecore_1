import {
  Bus,
  Clock,
  Dumbbell,
  Fuel,
  GraduationCap,
  Hospital,
  MapPin,
  Navigation,
  Phone,
  Search,
  ShoppingCart,
  Star,
  TreePine,
  Utensils,
} from "lucide-react";
import { useState } from "react";

interface Props {
  buildingId: string;
  isOwner: boolean;
  t: Record<string, string>;
}

const categories = [
  {
    key: "all",
    label: "Tümü",
    icon: MapPin,
    color: "bg-gray-100 text-gray-700",
  },
  {
    key: "health",
    label: "Sağlık",
    icon: Hospital,
    color: "bg-red-100 text-red-700",
  },
  {
    key: "market",
    label: "Market & AVM",
    icon: ShoppingCart,
    color: "bg-green-100 text-green-700",
  },
  {
    key: "transport",
    label: "Ulaşım",
    icon: Bus,
    color: "bg-blue-100 text-blue-700",
  },
  {
    key: "education",
    label: "Eğitim",
    icon: GraduationCap,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    key: "restaurant",
    label: "Yeme & İçme",
    icon: Utensils,
    color: "bg-orange-100 text-orange-700",
  },
  {
    key: "park",
    label: "Park & Doğa",
    icon: TreePine,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    key: "sport",
    label: "Spor",
    icon: Dumbbell,
    color: "bg-purple-100 text-purple-700",
  },
  {
    key: "fuel",
    label: "Akaryakıt",
    icon: Fuel,
    color: "bg-slate-100 text-slate-700",
  },
];

const places = [
  {
    id: 1,
    category: "health",
    name: "Acıbadem Hastanesi",
    type: "Özel Hastane",
    distance: "1.2 km",
    duration: "4 dk (araç)",
    phone: "0212 304 44 44",
    hours: "7/24",
    rating: 4.5,
    address: "Bağlarbaşı Mah. Çeçen Sok. No:5",
    note: "Acil servis ve poliklinikler mevcut",
  },
  {
    id: 2,
    category: "health",
    name: "Devlet Hastanesi",
    type: "Devlet Hastanesi",
    distance: "2.1 km",
    duration: "7 dk (araç)",
    phone: "0212 555 10 20",
    hours: "7/24",
    rating: 3.8,
    address: "Cumhuriyet Cad. No:42",
    note: "Devlet hastanesi, tüm branşlar",
  },
  {
    id: 3,
    category: "health",
    name: "Eczane Çelik",
    type: "Eczane",
    distance: "0.3 km",
    duration: "4 dk (yürüyüş)",
    phone: "0212 444 55 66",
    hours: "08:00–22:00",
    rating: 4.7,
    address: "Yıldız Sok. No:8",
    note: "Nöbetçi eczane bilgisi için 182'yi arayın",
  },
  {
    id: 4,
    category: "market",
    name: "Migros 3M",
    type: "Süpermarket",
    distance: "0.8 km",
    duration: "10 dk (yürüyüş)",
    phone: "0212 333 44 55",
    hours: "08:00–22:00",
    rating: 4.2,
    address: "Bağdat Cad. No:120",
    note: "Büyük alışveriş merkezi katı",
  },
  {
    id: 5,
    category: "market",
    name: "Carrefour AVM",
    type: "Alışveriş Merkezi",
    distance: "3.5 km",
    duration: "10 dk (araç)",
    phone: "0212 600 70 80",
    hours: "10:00–22:00",
    rating: 4.0,
    address: "Merkez Mah. AVM Cad. No:1",
    note: "200+ mağaza, otopark ücretsiz",
  },
  {
    id: 6,
    category: "transport",
    name: "Metro İstasyonu",
    type: "Metro",
    distance: "0.5 km",
    duration: "6 dk (yürüyüş)",
    phone: "-",
    hours: "06:30–00:00",
    rating: 4.3,
    address: "Cumhuriyet Meydanı",
    note: "M2 hattı, 5 dk'da bir sefer",
  },
  {
    id: 7,
    category: "transport",
    name: "Otobüs Durağı",
    type: "Otobüs",
    distance: "0.1 km",
    duration: "1 dk (yürüyüş)",
    phone: "-",
    hours: "06:00–00:30",
    rating: 4.0,
    address: "Bina önü",
    note: "45, 46E, 47 numaralı hatlar",
  },
  {
    id: 8,
    category: "transport",
    name: "Taksi Durağı",
    type: "Taksi",
    distance: "0.2 km",
    duration: "2 dk (yürüyüş)",
    phone: "0212 999 00 11",
    hours: "7/24",
    rating: 4.1,
    address: "Atatürk Bulvarı No:55 önü",
    note: "7/24 hizmet, telefon rezervasyonu",
  },
  {
    id: 9,
    category: "education",
    name: "İlköğretim Okulu",
    type: "İlkokul & Ortaokul",
    distance: "0.6 km",
    duration: "8 dk (yürüyüş)",
    phone: "0212 222 33 44",
    hours: "08:00–17:00",
    rating: 4.4,
    address: "Çiçek Sok. No:12",
    note: "Devlet okulu, kayıt için okul müdürlüğüne başvurun",
  },
  {
    id: 10,
    category: "education",
    name: "Özel Kolej",
    type: "Özel Okul",
    distance: "1.8 km",
    duration: "6 dk (araç)",
    phone: "0212 777 88 99",
    hours: "08:00–17:30",
    rating: 4.8,
    address: "Eğitim Cad. No:5",
    note: "K-12 eğitim, Türkçe-İngilizce",
  },
  {
    id: 11,
    category: "restaurant",
    name: "Pasta & Kafe Güneş",
    type: "Kafe",
    distance: "0.2 km",
    duration: "3 dk (yürüyüş)",
    phone: "0212 111 22 33",
    hours: "08:00–23:00",
    rating: 4.6,
    address: "Yıldız Sok. No:3",
    note: "Sabah kahvaltısı ve öğle yemeği popüler",
  },
  {
    id: 12,
    category: "restaurant",
    name: "Balıkçı Mehmet",
    type: "Balık Restoranı",
    distance: "1.1 km",
    duration: "4 dk (araç)",
    phone: "0212 456 78 90",
    hours: "12:00–00:00",
    rating: 4.9,
    address: "Sahil Cad. No:28",
    note: "Rezervasyon önerilir, deniz manzarası",
  },
  {
    id: 13,
    category: "park",
    name: "Şehir Parkı",
    type: "Park",
    distance: "0.4 km",
    duration: "5 dk (yürüyüş)",
    phone: "-",
    hours: "07:00–22:00",
    rating: 4.5,
    address: "Park Cad. No:1",
    note: "Koşu parkuru, çocuk oyun alanı, piknik alanları",
  },
  {
    id: 14,
    category: "park",
    name: "Millet Bahçesi",
    type: "Botanik Bahçe",
    distance: "2.3 km",
    duration: "8 dk (araç)",
    phone: "-",
    hours: "08:00–20:00",
    rating: 4.7,
    address: "Yeşil Vadi, Kadıköy",
    note: "500 bitki türü, yürüyüş yolu 5 km",
  },
  {
    id: 15,
    category: "sport",
    name: "Spor Merkezi",
    type: "Fitness",
    distance: "0.9 km",
    duration: "12 dk (yürüyüş)",
    phone: "0212 888 77 66",
    hours: "06:00–23:00",
    rating: 4.3,
    address: "Spor Cad. No:10",
    note: "Yüzme havuzu, fitness salonu, grup dersleri",
  },
  {
    id: 16,
    category: "fuel",
    name: "Shell İstasyonu",
    type: "Akaryakıt",
    distance: "0.7 km",
    duration: "3 dk (araç)",
    phone: "0212 100 20 30",
    hours: "7/24",
    rating: 4.1,
    address: "Çevre Yolu No:88",
    note: "Benzin, motorin, LPG; market mevcut",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
      <span className="text-xs font-semibold text-gray-700">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function NeighborhoodGuide({
  buildingId: _buildingId,
  isOwner: _isOwner,
  t: _t,
}: Props) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<(typeof places)[0] | null>(null);

  const filtered = places.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const getCategoryInfo = (key: string) =>
    categories.find((c) => c.key === key) || categories[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0E1116]">
            Mahalle & Çevre Rehberi
          </h2>
          <p className="text-sm text-[#6B7A8D] mt-1">
            Yakın çevredeki hizmetler, ulaşım ve ilgi noktaları
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 text-center">
          <p className="text-2xl font-bold text-blue-700">{places.length}</p>
          <p className="text-xs text-blue-600">Konum</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A8D]" />
        <input
          type="text"
          placeholder="Yer veya kategori ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-[#D7DEE9] rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.key;
          return (
            <button
              type="button"
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                isActive
                  ? "bg-[#0B1B2E] text-white border-[#0B1B2E]"
                  : "bg-white text-[#3A4654] border-[#D7DEE9] hover:border-[#0B1B2E]"
              }`}
            >
              <Icon className="w-3 h-3" />
              {cat.label}
              <span
                className={`text-xs rounded-full px-1.5 ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {cat.key === "all"
                  ? places.length
                  : places.filter((p) => p.category === cat.key).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-[#6B7A8D]">
          <MapPin className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>Sonuç bulunamadı</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((place) => {
            const catInfo = getCategoryInfo(place.category);
            const Icon = catInfo.icon;
            return (
              <button
                type="button"
                key={place.id}
                onClick={() =>
                  setSelected(selected?.id === place.id ? null : place)
                }
                className={`bg-white rounded-2xl border p-4 cursor-pointer transition-all hover:shadow-md ${
                  selected?.id === place.id
                    ? "border-[#0B1B2E] shadow-md"
                    : "border-[#E8EDF5]"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${catInfo.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0E1116] text-sm leading-tight">
                        {place.name}
                      </h3>
                      <p className="text-xs text-[#6B7A8D]">{place.type}</p>
                    </div>
                  </div>
                  <StarRating rating={place.rating} />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-[#3A4654]">
                    <Navigation className="w-3 h-3 text-[#6B7A8D]" />
                    <span>
                      {place.distance} · {place.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#3A4654]">
                    <Clock className="w-3 h-3 text-[#6B7A8D]" />
                    <span>{place.hours}</span>
                  </div>
                  {place.phone !== "-" && (
                    <div className="flex items-center gap-2 text-xs text-[#3A4654]">
                      <Phone className="w-3 h-3 text-[#6B7A8D]" />
                      <a
                        href={`tel:${place.phone}`}
                        className="text-blue-600 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {place.phone}
                      </a>
                    </div>
                  )}
                </div>

                {selected?.id === place.id && (
                  <div className="mt-3 pt-3 border-t border-[#E8EDF5] space-y-2">
                    <div className="flex items-start gap-2 text-xs text-[#3A4654]">
                      <MapPin className="w-3 h-3 text-[#6B7A8D] mt-0.5 shrink-0" />
                      <span>{place.address}</span>
                    </div>
                    {place.note && (
                      <div className="bg-blue-50 rounded-lg px-3 py-2">
                        <p className="text-xs text-blue-700">{place.note}</p>
                      </div>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Quick Emergency Numbers */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
        <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Acil Durum Hatları
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: "Yangın", number: "110" },
            { name: "Polis", number: "155" },
            { name: "Ambulans", number: "112" },
            { name: "Gaz Acil", number: "187" },
          ].map((item) => (
            <a
              key={item.name}
              href={`tel:${item.number}`}
              className="flex flex-col items-center bg-white border border-red-200 rounded-xl p-3 hover:bg-red-100 transition-colors"
            >
              <span className="text-xl font-bold text-red-700">
                {item.number}
              </span>
              <span className="text-xs text-red-600 mt-0.5">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
