import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Droplets,
  Flame,
  Lock,
  MapPin,
  Phone,
  Plus,
  Star,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface Props {
  buildingId: string;
  isOwner: boolean;
  t: Record<string, string>;
}

const categories = [
  { id: "plumber", label: "Tesisatçı", icon: Droplets, color: "#3B82F6" },
  { id: "electrician", label: "Elektrikçi", icon: Zap, color: "#F59E0B" },
  { id: "locksmith", label: "Çilingir", icon: Lock, color: "#8B5CF6" },
  { id: "hvac", label: "Isıtma/Soğutma", icon: Wind, color: "#10B981" },
  { id: "gas", label: "Doğalgaz", icon: Flame, color: "#EF4444" },
  { id: "general", label: "Genel Tadilat", icon: Wrench, color: "#6B7280" },
];

const initialServices = [
  {
    id: 1,
    name: "Ahmet Usta Tesisat",
    category: "plumber",
    phone: "0532 111 2233",
    available247: true,
    rating: 4.8,
    callCount: 12,
    lastCalled: "2024-01-15",
    notes: "Hızlı müdahale, güvenilir",
    address: "Kadıköy, İstanbul",
  },
  {
    id: 2,
    name: "Elektrik Master",
    category: "electrician",
    phone: "0535 444 5566",
    available247: true,
    rating: 4.6,
    callCount: 8,
    lastCalled: "2024-01-10",
    notes: "Panel ve sigorta uzmanı",
    address: "Üsküdar, İstanbul",
  },
  {
    id: 3,
    name: "Hızlı Çilingir",
    category: "locksmith",
    phone: "0544 777 8899",
    available247: true,
    rating: 4.9,
    callCount: 5,
    lastCalled: "2023-12-20",
    notes: "7/24 kapı açma",
    address: "Beşiktaş, İstanbul",
  },
  {
    id: 4,
    name: "Klima & Kombi Servis",
    category: "hvac",
    phone: "0541 222 3344",
    available247: false,
    rating: 4.5,
    callCount: 6,
    lastCalled: "2024-01-08",
    notes: "Tüm marka kombi bakımı",
    address: "Şişli, İstanbul",
  },
  {
    id: 5,
    name: "Doğalgaz Teknik",
    category: "gas",
    phone: "0533 555 6677",
    available247: true,
    rating: 4.7,
    callCount: 3,
    lastCalled: "2023-11-15",
    notes: "Sertifikalı doğalgaz ustası",
    address: "Maltepe, İstanbul",
  },
  {
    id: 6,
    name: "Mehmet Usta Tesisat",
    category: "plumber",
    phone: "0530 888 9900",
    available247: false,
    rating: 4.3,
    callCount: 4,
    lastCalled: "2023-12-05",
    notes: "Ucuz ve kaliteli iş",
    address: "Ataşehir, İstanbul",
  },
  {
    id: 7,
    name: "Güvenilir Elektrik",
    category: "electrician",
    phone: "0546 333 4455",
    available247: false,
    rating: 4.4,
    callCount: 2,
    lastCalled: "2023-10-20",
    notes: "Aydınlatma ve kablo uzmanı",
    address: "Bakırköy, İstanbul",
  },
  {
    id: 8,
    name: "Genel Tadilat A.Ş.",
    category: "general",
    phone: "0537 666 7788",
    available247: false,
    rating: 4.2,
    callCount: 7,
    lastCalled: "2024-01-12",
    notes: "Boya, alçı, genel tadilat",
    address: "Sarıyer, İstanbul",
  },
];

const callHistory = [
  {
    id: 1,
    serviceId: 1,
    serviceName: "Ahmet Usta Tesisat",
    date: "2024-01-15",
    time: "23:45",
    issue: "Su borusu patladı",
    resolved: true,
    duration: "1.5 saat",
    cost: "350₺",
  },
  {
    id: 2,
    serviceId: 2,
    serviceName: "Elektrik Master",
    date: "2024-01-10",
    time: "02:30",
    issue: "Ana sigorta attı",
    resolved: true,
    duration: "45 dk",
    cost: "200₺",
  },
  {
    id: 3,
    serviceId: 3,
    serviceName: "Hızlı Çilingir",
    date: "2023-12-20",
    time: "22:15",
    issue: "Kapı kilidi bozuldu",
    resolved: true,
    duration: "30 dk",
    cost: "150₺",
  },
  {
    id: 4,
    serviceId: 5,
    serviceName: "Doğalgaz Teknik",
    date: "2023-11-15",
    time: "08:00",
    issue: "Doğalgaz kokusu",
    resolved: true,
    duration: "2 saat",
    cost: "500₺",
  },
  {
    id: 5,
    serviceId: 4,
    serviceName: "Klima & Kombi Servis",
    date: "2024-01-08",
    time: "10:00",
    issue: "Kombi ısınmıyor",
    resolved: true,
    duration: "2.5 saat",
    cost: "800₺",
  },
];

export default function EmergencyServiceGuide({ isOwner }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"services" | "history">(
    "services",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filter247, setFilter247] = useState(false);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [services, setServices] = useState(initialServices);
  const [newService, setNewService] = useState({
    name: "",
    category: "plumber",
    phone: "",
    available247: false,
    notes: "",
    address: "",
  });

  const filtered = services.filter((s) => {
    const matchCat =
      selectedCategory === "all" || s.category === selectedCategory;
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.includes(searchTerm);
    const match247 = !filter247 || s.available247;
    return matchCat && matchSearch && match247;
  });

  const getCategoryInfo = (catId: string) =>
    categories.find((c) => c.id === catId) || categories[5];

  const handleAdd = () => {
    if (!newService.name || !newService.phone) return;
    setServices((prev) => [
      ...prev,
      {
        ...newService,
        id: prev.length + 1,
        rating: 0,
        callCount: 0,
        lastCalled: "-",
      },
    ]);
    setNewService({
      name: "",
      category: "plumber",
      phone: "",
      available247: false,
      notes: "",
      address: "",
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0E1116]">
            Acil Bakım & 7/24 Servis Rehberi
          </h2>
          <p className="text-sm text-[#3A4654] mt-1">
            Gece ve hafta sonu çağrılabilecek acil servis hizmetleri
          </p>
        </div>
        {isOwner && (
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#1B3A5C] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#16324f] transition"
          >
            <Plus size={16} /> Servis Ekle
          </button>
        )}
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle size={20} className="text-red-500 mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-red-800 text-sm">Acil Durumda</p>
          <p className="text-red-700 text-sm mt-0.5">
            Yangın: <strong>110</strong> &nbsp;|&nbsp; Gaz kaçağı:{" "}
            <strong>187</strong> &nbsp;|&nbsp; Elektrik arıza:{" "}
            <strong>186</strong> &nbsp;|&nbsp; Su arıza: <strong>185</strong>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#D7DEE9]">
        {(["services", "history"] as const).map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
              activeTab === tab
                ? "border-[#1B3A5C] text-[#1B3A5C]"
                : "border-transparent text-[#3A4654] hover:text-[#0E1116]"
            }`}
          >
            {tab === "services" ? "Servisler" : "Çağrı Geçmişi"}
          </button>
        ))}
      </div>

      {activeTab === "services" && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Servis adı veya telefon ara..."
              className="border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm w-64"
            />
            <label className="flex items-center gap-2 text-sm text-[#3A4654] cursor-pointer">
              <input
                type="checkbox"
                checked={filter247}
                onChange={(e) => setFilter247(e.target.checked)}
                className="rounded"
              />
              <Clock size={14} /> Sadece 7/24
            </label>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                selectedCategory === "all"
                  ? "bg-[#1B3A5C] text-white"
                  : "bg-white border border-[#D7DEE9] text-[#3A4654] hover:border-[#1B3A5C]"
              }`}
            >
              Tümü ({services.length})
            </button>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const count = services.filter(
                (s) => s.category === cat.id,
              ).length;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    selectedCategory === cat.id
                      ? "text-white"
                      : "bg-white border border-[#D7DEE9] text-[#3A4654] hover:border-[#1B3A5C]"
                  }`}
                  style={
                    selectedCategory === cat.id
                      ? { backgroundColor: cat.color }
                      : {}
                  }
                >
                  <Icon size={12} />
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Services List */}
          <div className="grid gap-3">
            {filtered.map((service) => {
              const cat = getCategoryInfo(service.category);
              const Icon = cat.icon;
              const isExpanded = expandedService === service.id;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-xl border border-[#D7DEE9] overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${cat.color}20` }}
                        >
                          <Icon size={18} style={{ color: cat.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-[#0E1116]">
                              {service.name}
                            </span>
                            {service.available247 && (
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Clock size={10} /> 7/24
                              </span>
                            )}
                            <span
                              className="text-xs px-2 py-0.5 rounded-full text-white"
                              style={{ backgroundColor: cat.color }}
                            >
                              {cat.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-1">
                            <a
                              href={`tel:${service.phone.replace(/\s/g, "")}`}
                              className="text-[#1B3A5C] font-semibold text-sm hover:underline flex items-center gap-1"
                            >
                              <Phone size={13} /> {service.phone}
                            </a>
                            {service.rating > 0 && (
                              <span className="flex items-center gap-1 text-xs text-[#3A4654]">
                                <Star
                                  size={12}
                                  className="text-yellow-400 fill-yellow-400"
                                />
                                {service.rating}
                              </span>
                            )}
                            <span className="text-xs text-[#3A4654]">
                              {service.callCount} çağrı
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedService(isExpanded ? null : service.id)
                        }
                        className="text-[#3A4654] hover:text-[#0E1116] mt-1"
                      >
                        {isExpanded ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-[#F3F6FB] grid grid-cols-2 gap-3 text-sm text-[#3A4654]">
                        {service.address && (
                          <div className="flex items-start gap-2">
                            <MapPin size={13} className="mt-0.5 shrink-0" />
                            <span>{service.address}</span>
                          </div>
                        )}
                        {service.lastCalled !== "-" && (
                          <div>
                            Son çağrı:{" "}
                            <span className="text-[#0E1116] font-medium">
                              {service.lastCalled}
                            </span>
                          </div>
                        )}
                        {service.notes && (
                          <div className="col-span-2 bg-[#F3F6FB] rounded-lg p-2 text-xs">
                            {service.notes}
                          </div>
                        )}
                        <div className="col-span-2">
                          <a
                            href={`tel:${service.phone.replace(/\s/g, "")}`}
                            className="w-full flex items-center justify-center gap-2 bg-[#1B3A5C] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#16324f] transition"
                          >
                            <Phone size={14} /> Şimdi Ara
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {activeTab === "history" && (
        <div className="space-y-3">
          <div className="bg-white rounded-xl border border-[#D7DEE9] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#F3F6FB]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#3A4654]">
                    Tarih/Saat
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#3A4654]">
                    Servis
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#3A4654]">
                    Sorun
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#3A4654]">
                    Süre
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#3A4654]">
                    Ücret
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#3A4654]">
                    Durum
                  </th>
                </tr>
              </thead>
              <tbody>
                {callHistory.map((call, i) => (
                  <tr
                    key={call.id}
                    className={i % 2 === 0 ? "" : "bg-[#F3F6FB]/50"}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-[#0E1116]">
                        {call.date}
                      </div>
                      <div className="text-xs text-[#3A4654]">{call.time}</div>
                    </td>
                    <td className="px-4 py-3 text-[#0E1116]">
                      {call.serviceName}
                    </td>
                    <td className="px-4 py-3 text-[#3A4654]">{call.issue}</td>
                    <td className="px-4 py-3 text-[#3A4654]">
                      {call.duration}
                    </td>
                    <td className="px-4 py-3 font-medium text-[#0E1116]">
                      {call.cost}
                    </td>
                    <td className="px-4 py-3">
                      {call.resolved && (
                        <span className="flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full w-fit">
                          <CheckCircle size={10} /> Çözüldü
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-[#D7DEE9] p-4 text-center">
              <div className="text-2xl font-bold text-[#1B3A5C]">
                {callHistory.length}
              </div>
              <div className="text-xs text-[#3A4654] mt-1">Toplam Çağrı</div>
            </div>
            <div className="bg-white rounded-xl border border-[#D7DEE9] p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {callHistory.filter((c) => c.resolved).length}
              </div>
              <div className="text-xs text-[#3A4654] mt-1">Çözülen</div>
            </div>
            <div className="bg-white rounded-xl border border-[#D7DEE9] p-4 text-center">
              <div className="text-2xl font-bold text-[#1B3A5C]">
                {callHistory
                  .reduce((sum, c) => sum + Number.parseInt(c.cost), 0)
                  .toLocaleString("tr-TR")}
                ₺
              </div>
              <div className="text-xs text-[#3A4654] mt-1">Toplam Harcama</div>
            </div>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-bold text-[#0E1116] mb-4">Yeni Servis Ekle</h3>
            <div className="space-y-3">
              <input
                value={newService.name}
                onChange={(e) =>
                  setNewService((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Servis adı *"
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
              />
              <select
                value={newService.category}
                onChange={(e) =>
                  setNewService((p) => ({ ...p, category: e.target.value }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
              <input
                value={newService.phone}
                onChange={(e) =>
                  setNewService((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="Telefon numarası *"
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
              />
              <input
                value={newService.address}
                onChange={(e) =>
                  setNewService((p) => ({ ...p, address: e.target.value }))
                }
                placeholder="Adres/Bölge"
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
              />
              <textarea
                value={newService.notes}
                onChange={(e) =>
                  setNewService((p) => ({ ...p, notes: e.target.value }))
                }
                placeholder="Notlar"
                rows={2}
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm resize-none"
              />
              <label className="flex items-center gap-2 text-sm text-[#3A4654] cursor-pointer">
                <input
                  type="checkbox"
                  checked={newService.available247}
                  onChange={(e) =>
                    setNewService((p) => ({
                      ...p,
                      available247: e.target.checked,
                    }))
                  }
                />
                7/24 hizmet veriyor
              </label>
            </div>
            <div className="flex gap-2 mt-5">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 border border-[#D7DEE9] text-[#3A4654] py-2 rounded-lg text-sm"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 bg-[#1B3A5C] text-white py-2 rounded-lg text-sm font-medium"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
