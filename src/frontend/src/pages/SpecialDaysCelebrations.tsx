import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface SpecialDay {
  id: string;
  residentName: string;
  apartment: string;
  type: "birthday" | "anniversary" | "movein" | "graduation" | "other";
  date: string; // MM-DD format
  year?: number;
  note?: string;
  notifyDaysBefore: number;
  isPublic: boolean;
}

const TYPE_LABELS: Record<string, string> = {
  birthday: "🎂 Doğum Günü",
  anniversary: "💍 Yıl Dönümü",
  movein: "🏠 Taşınma Yıldönümü",
  graduation: "🎓 Mezuniyet",
  other: "🎉 Özel Gün",
};

const TYPE_COLORS: Record<string, string> = {
  birthday: "bg-pink-100 text-pink-800",
  anniversary: "bg-purple-100 text-purple-800",
  movein: "bg-blue-100 text-blue-800",
  graduation: "bg-green-100 text-green-800",
  other: "bg-yellow-100 text-yellow-800",
};

const MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const SAMPLE_DAYS: SpecialDay[] = [
  {
    id: "1",
    residentName: "Ahmet Yılmaz",
    apartment: "D:3",
    type: "birthday",
    date: "03-15",
    notifyDaysBefore: 3,
    isPublic: true,
    note: "Küçük bir sürpriz organize edilebilir!",
  },
  {
    id: "2",
    residentName: "Fatma Kaya",
    apartment: "D:7",
    type: "birthday",
    date: "03-28",
    notifyDaysBefore: 1,
    isPublic: true,
  },
  {
    id: "3",
    residentName: "Mehmet & Ayşe Demir",
    apartment: "D:12",
    type: "anniversary",
    date: "04-02",
    year: 2010,
    notifyDaysBefore: 3,
    isPublic: true,
    note: "15. yıl dönümleri",
  },
  {
    id: "4",
    residentName: "Zeynep Arslan",
    apartment: "D:5",
    type: "graduation",
    date: "06-20",
    year: 2025,
    notifyDaysBefore: 1,
    isPublic: true,
    note: "Doktora tezi savunması",
  },
  {
    id: "5",
    residentName: "Can Öztürk",
    apartment: "D:1",
    type: "movein",
    date: "09-01",
    year: 2020,
    notifyDaysBefore: 1,
    isPublic: false,
    note: "Binaya taşınalı 5 yıl oluyor",
  },
  {
    id: "6",
    residentName: "Elif & Burak Şahin",
    apartment: "D:9",
    type: "birthday",
    date: "04-10",
    notifyDaysBefore: 3,
    isPublic: true,
    note: "Çocukları Bora'nın doğum günü",
  },
  {
    id: "7",
    residentName: "Hasan Çelik",
    apartment: "D:11",
    type: "other",
    date: "05-05",
    notifyDaysBefore: 1,
    isPublic: true,
    note: "İş yıldönümü - 20. yıl",
  },
  {
    id: "8",
    residentName: "Selin Yıldız",
    apartment: "D:4",
    type: "birthday",
    date: "07-19",
    notifyDaysBefore: 3,
    isPublic: true,
  },
  {
    id: "9",
    residentName: "Orhan & Nuray Aydın",
    apartment: "D:6",
    type: "anniversary",
    date: "08-14",
    year: 2005,
    notifyDaysBefore: 7,
    isPublic: true,
    note: "Gümüş düğün (25 yıl)",
  },
  {
    id: "10",
    residentName: "Gülay Erdoğan",
    apartment: "D:8",
    type: "birthday",
    date: "11-03",
    notifyDaysBefore: 3,
    isPublic: true,
  },
];

function getMonthFromDate(date: string) {
  return Number.parseInt(date.split("-")[0], 10);
}

function getDayFromDate(date: string) {
  return Number.parseInt(date.split("-")[1], 10);
}

function getDaysUntil(dateStr: string): number {
  const now = new Date();
  const [month, day] = dateStr.split("-").map(Number);
  let next = new Date(now.getFullYear(), month - 1, day);
  if (next < now) next = new Date(now.getFullYear() + 1, month - 1, day);
  return Math.ceil((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

interface Props {
  buildingId: string;
  t: Record<string, string>;
}

export default function SpecialDaysCelebrations({
  buildingId: _buildingId,
  t: _t,
}: Props) {
  const [days, setDays] = useState<SpecialDay[]>(SAMPLE_DAYS);
  const [activeTab, setActiveTab] = useState<"upcoming" | "calendar" | "add">(
    "upcoming",
  );
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const [newDay, setNewDay] = useState<Partial<SpecialDay>>({
    type: "birthday",
    notifyDaysBefore: 3,
    isPublic: true,
  });

  const upcomingDays = [...days]
    .filter((d) => d.isPublic || true)
    .map((d) => ({ ...d, daysUntil: getDaysUntil(d.date) }))
    .sort((a, b) => a.daysUntil - b.daysUntil);

  const filtered = upcomingDays.filter((d) => {
    if (filterType !== "all" && d.type !== filterType) return false;
    if (
      searchQuery &&
      !d.residentName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !d.apartment.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const thisMonthDays = days
    .filter((d) => getMonthFromDate(d.date) === selectedMonth)
    .sort((a, b) => getDayFromDate(a.date) - getDayFromDate(b.date));

  const today = days.filter((d) => getDaysUntil(d.date) === 0);
  const thisWeek = upcomingDays.filter(
    (d) => d.daysUntil > 0 && d.daysUntil <= 7,
  );

  function addDay() {
    if (!newDay.residentName || !newDay.apartment || !newDay.date) return;
    const entry: SpecialDay = {
      id: Date.now().toString(),
      residentName: newDay.residentName!,
      apartment: newDay.apartment!,
      type: newDay.type as SpecialDay["type"],
      date: newDay.date!,
      year: newDay.year,
      note: newDay.note,
      notifyDaysBefore: newDay.notifyDaysBefore || 3,
      isPublic: newDay.isPublic ?? true,
    };
    setDays((prev) => [...prev, entry]);
    setShowAddModal(false);
    setNewDay({ type: "birthday", notifyDaysBefore: 3, isPublic: true });
    setActiveTab("upcoming");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            🎉 Sakin Özel Gün & Kutlama
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Doğum günleri, yıl dönümleri ve özel anlar
          </p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-pink-600 hover:bg-pink-700 text-white"
        >
          + Özel Gün Ekle
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-pink-700">{today.length}</div>
          <div className="text-xs text-pink-600 mt-1">Bugün Kutlanan</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-orange-700">
            {thisWeek.length}
          </div>
          <div className="text-xs text-orange-600 mt-1">Bu Hafta</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-700">
            {days.filter((d) => d.type === "birthday").length}
          </div>
          <div className="text-xs text-purple-600 mt-1">Doğum Günü Kayıtlı</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">{days.length}</div>
          <div className="text-xs text-blue-600 mt-1">Toplam Kayıt</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-2">
        {(["upcoming", "calendar", "add"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-pink-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab === "upcoming"
              ? "📋 Yaklaşan Günler"
              : tab === "calendar"
                ? "📅 Aylık Takvim"
                : "➕ Yeni Ekle"}
          </button>
        ))}
      </div>

      {/* Upcoming tab */}
      {activeTab === "upcoming" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Sakin veya daire ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option value="all">Tüm Türler</option>
              <option value="birthday">🎂 Doğum Günü</option>
              <option value="anniversary">💍 Yıl Dönümü</option>
              <option value="movein">🏠 Taşınma Yıldönümü</option>
              <option value="graduation">🎓 Mezuniyet</option>
              <option value="other">🎉 Diğer</option>
            </select>
          </div>

          {today.length > 0 && (
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-4 text-white">
              <div className="font-bold text-lg mb-2">
                🎊 Bugün Kutlama Var!
              </div>
              {today.map((d) => (
                <div key={d.id} className="bg-white/20 rounded-lg p-3 mb-2">
                  <span className="font-semibold">{d.residentName}</span>
                  <span className="mx-2 text-white/70">—</span>
                  <span>{TYPE_LABELS[d.type]}</span>
                  {d.note && (
                    <p className="text-sm text-white/80 mt-1">{d.note}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                Kayıt bulunamadı.
              </div>
            ) : (
              filtered.map((d) => (
                <div
                  key={d.id}
                  className="bg-white rounded-xl border p-4 flex items-start justify-between gap-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900">
                        {d.residentName}
                      </span>
                      <span className="text-sm text-gray-500">
                        {d.apartment}
                      </span>
                      <Badge className={TYPE_COLORS[d.type]}>
                        {TYPE_LABELS[d.type]}
                      </Badge>
                      {!d.isPublic && (
                        <Badge className="bg-gray-100 text-gray-600">
                          🔒 Gizli
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {MONTHS[getMonthFromDate(d.date) - 1]}{" "}
                      {getDayFromDate(d.date)}
                      {d.year && (
                        <span className="text-gray-400">
                          {" "}
                          ({new Date().getFullYear() - d.year}. yıl)
                        </span>
                      )}
                    </div>
                    {d.note && (
                      <p className="text-sm text-gray-500 mt-1 italic">
                        {d.note}
                      </p>
                    )}
                  </div>
                  <div className="text-center shrink-0">
                    {d.daysUntil === 0 ? (
                      <div className="bg-pink-100 text-pink-700 font-bold text-sm px-3 py-1 rounded-full">
                        Bugün!
                      </div>
                    ) : (
                      <div className="text-center">
                        <div
                          className={`text-2xl font-bold ${
                            d.daysUntil <= 3
                              ? "text-red-600"
                              : d.daysUntil <= 7
                                ? "text-orange-500"
                                : "text-gray-500"
                          }`}
                        >
                          {d.daysUntil}
                        </div>
                        <div className="text-xs text-gray-400">gün kaldı</div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Calendar tab */}
      {activeTab === "calendar" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="border rounded-lg px-3 py-2 text-sm bg-white font-medium"
            >
              {MONTHS.map((m, i) => (
                <option key={m} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-500">
              {thisMonthDays.length} etkinlik
            </span>
          </div>

          {thisMonthDays.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              Bu ayda kayıtlı özel gün yok.
            </div>
          ) : (
            <div className="space-y-3">
              {thisMonthDays.map((d) => (
                <div
                  key={d.id}
                  className="bg-white rounded-xl border p-4 flex items-center gap-4"
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-bold shrink-0 ${
                      d.type === "birthday"
                        ? "bg-pink-100 text-pink-700"
                        : d.type === "anniversary"
                          ? "bg-purple-100 text-purple-700"
                          : d.type === "movein"
                            ? "bg-blue-100 text-blue-700"
                            : d.type === "graduation"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    <div className="text-xl">{getDayFromDate(d.date)}</div>
                    <div className="text-xs">
                      {MONTHS[selectedMonth - 1].slice(0, 3)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900">
                        {d.residentName}
                      </span>
                      <span className="text-sm text-gray-500">
                        {d.apartment}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={TYPE_COLORS[d.type]}>
                        {TYPE_LABELS[d.type]}
                      </Badge>
                      {d.year && (
                        <span className="text-xs text-gray-400">
                          {new Date().getFullYear() - d.year}. yıl
                        </span>
                      )}
                    </div>
                    {d.note && (
                      <p className="text-sm text-gray-500 mt-1">{d.note}</p>
                    )}
                  </div>
                  <div className="text-sm font-medium text-orange-500 shrink-0">
                    {getDaysUntil(d.date) === 0
                      ? "🎊 Bugün"
                      : `${getDaysUntil(d.date)} gün`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add form tab */}
      {activeTab === "add" && (
        <div className="bg-white rounded-2xl border p-6 max-w-lg space-y-4">
          <h3 className="font-bold text-gray-900">Yeni Özel Gün Ekle</h3>
          <div>
            <label
              htmlFor="add-name"
              className="text-sm font-medium text-gray-700"
            >
              Sakin Adı *
            </label>
            <Input
              id="add-name"
              placeholder="Örn: Ahmet Yılmaz"
              value={newDay.residentName || ""}
              onChange={(e) =>
                setNewDay((p) => ({ ...p, residentName: e.target.value }))
              }
              className="mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="add-apt"
              className="text-sm font-medium text-gray-700"
            >
              Daire *
            </label>
            <Input
              id="add-apt"
              placeholder="Örn: D:5"
              value={newDay.apartment || ""}
              onChange={(e) =>
                setNewDay((p) => ({ ...p, apartment: e.target.value }))
              }
              className="mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="add-type"
              className="text-sm font-medium text-gray-700"
            >
              Tür *
            </label>
            <select
              id="add-type"
              value={newDay.type}
              onChange={(e) =>
                setNewDay((p) => ({
                  ...p,
                  type: e.target.value as SpecialDay["type"],
                }))
              }
              className="mt-1 block w-full border rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option value="birthday">🎂 Doğum Günü</option>
              <option value="anniversary">💍 Yıl Dönümü</option>
              <option value="movein">🏠 Taşınma Yıldönümü</option>
              <option value="graduation">🎓 Mezuniyet</option>
              <option value="other">🎉 Diğer Özel Gün</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="add-date"
                className="text-sm font-medium text-gray-700"
              >
                Tarih (AA-GG) *
              </label>
              <Input
                id="add-date"
                placeholder="Örn: 03-15"
                value={newDay.date || ""}
                onChange={(e) =>
                  setNewDay((p) => ({ ...p, date: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="add-year"
                className="text-sm font-medium text-gray-700"
              >
                Yıl (opsiyonel)
              </label>
              <Input
                id="add-year"
                type="number"
                placeholder="Örn: 2010"
                value={newDay.year || ""}
                onChange={(e) =>
                  setNewDay((p) => ({ ...p, year: Number(e.target.value) }))
                }
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="add-note"
              className="text-sm font-medium text-gray-700"
            >
              Not (opsiyonel)
            </label>
            <Input
              id="add-note"
              placeholder="Örn: Sürpriz organize edilebilir"
              value={newDay.note || ""}
              onChange={(e) =>
                setNewDay((p) => ({ ...p, note: e.target.value }))
              }
              className="mt-1"
            />
          </div>
          <div className="flex items-center gap-3">
            <label
              htmlFor="add-public"
              className="text-sm font-medium text-gray-700"
            >
              Herkese Görünür:
            </label>
            <input
              id="add-public"
              type="checkbox"
              checked={newDay.isPublic ?? true}
              onChange={(e) =>
                setNewDay((p) => ({ ...p, isPublic: e.target.checked }))
              }
              className="w-4 h-4"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              onClick={addDay}
              className="bg-pink-600 hover:bg-pink-700 text-white flex-1"
            >
              Kaydet
            </Button>
            <Button
              variant="outline"
              onClick={() => setActiveTab("upcoming")}
              className="flex-1"
            >
              İptal
            </Button>
          </div>
        </div>
      )}

      {/* Add modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="font-bold text-gray-900 text-lg">
              Yeni Özel Gün Ekle
            </h3>
            <div>
              <label
                htmlFor="m-name"
                className="text-sm font-medium text-gray-700"
              >
                Sakin Adı *
              </label>
              <Input
                id="m-name"
                placeholder="Örn: Ahmet Yılmaz"
                value={newDay.residentName || ""}
                onChange={(e) =>
                  setNewDay((p) => ({ ...p, residentName: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="m-apt"
                  className="text-sm font-medium text-gray-700"
                >
                  Daire *
                </label>
                <Input
                  id="m-apt"
                  placeholder="Örn: D:5"
                  value={newDay.apartment || ""}
                  onChange={(e) =>
                    setNewDay((p) => ({ ...p, apartment: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="m-date"
                  className="text-sm font-medium text-gray-700"
                >
                  Tarih (AA-GG) *
                </label>
                <Input
                  id="m-date"
                  placeholder="03-15"
                  value={newDay.date || ""}
                  onChange={(e) =>
                    setNewDay((p) => ({ ...p, date: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="m-type"
                className="text-sm font-medium text-gray-700"
              >
                Tür
              </label>
              <select
                id="m-type"
                value={newDay.type}
                onChange={(e) =>
                  setNewDay((p) => ({
                    ...p,
                    type: e.target.value as SpecialDay["type"],
                  }))
                }
                className="mt-1 block w-full border rounded-lg px-3 py-2 text-sm bg-white"
              >
                <option value="birthday">🎂 Doğum Günü</option>
                <option value="anniversary">💍 Yıl Dönümü</option>
                <option value="movein">🏠 Taşınma Yıldönümü</option>
                <option value="graduation">🎓 Mezuniyet</option>
                <option value="other">🎉 Diğer</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                onClick={addDay}
                className="bg-pink-600 hover:bg-pink-700 text-white flex-1"
              >
                Ekle
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddModal(false)}
                className="flex-1"
              >
                İptal
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
