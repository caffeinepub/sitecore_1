import {
  Award,
  CheckSquare,
  Clock,
  Filter,
  Plus,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";

interface ResidentTasksProps {
  buildingId: string;
  isOwner: boolean;
  t: any;
}

const MOCK_TASKS = [
  {
    id: 1,
    title: "Giriş Katı Temizlik Nöbeti",
    description: "Her Pazartesi sabah giriş katı ve merdiven temizliği",
    category: "Nöbet",
    date: "2026-04-07",
    slots: 2,
    volunteers: ["Daire 3", "Daire 7"],
    status: "open",
    points: 10,
  },
  {
    id: 2,
    title: "Bahçe Sulama Görevi",
    description: "Hafta içi bahçe ve çiçek sulaması",
    category: "Bahçe",
    date: "2026-04-08",
    slots: 1,
    volunteers: ["Daire 12"],
    status: "full",
    points: 8,
  },
  {
    id: 3,
    title: "Bahar Şenliği Organizasyonu",
    description: "Nisan ayı bahar etkinliği planlama ve hazırlık",
    category: "Etkinlik",
    date: "2026-04-15",
    slots: 5,
    volunteers: ["Daire 1", "Daire 5"],
    status: "open",
    points: 20,
  },
  {
    id: 4,
    title: "Güvenlik Nöbeti - Hafta Sonu",
    description: "Hafta sonu giriş kapısı güvenlik nöbeti",
    category: "Nöbet",
    date: "2026-04-12",
    slots: 3,
    volunteers: ["Daire 8", "Daire 14", "Daire 2"],
    status: "full",
    points: 15,
  },
  {
    id: 5,
    title: "Çocuk Oyun Alanı Bakımı",
    description: "Oyun alanı ekipman kontrolü ve temizliği",
    category: "Bakım",
    date: "2026-04-10",
    slots: 2,
    volunteers: [],
    status: "open",
    points: 12,
  },
  {
    id: 6,
    title: "Bülten Panosu Güncelleme",
    description: "Giriş holündeki bülten panosunu güncel tutmak",
    category: "Yönetim",
    date: "2026-04-09",
    slots: 1,
    volunteers: [],
    status: "open",
    points: 5,
  },
];

const MOCK_LEADERBOARD = [
  { rank: 1, apartment: "Daire 5", resident: "Ali Kaya", points: 85, tasks: 7 },
  {
    rank: 2,
    apartment: "Daire 12",
    resident: "Ayşe Demir",
    points: 72,
    tasks: 6,
  },
  {
    rank: 3,
    apartment: "Daire 3",
    resident: "Mehmet Yıldız",
    points: 60,
    tasks: 5,
  },
  {
    rank: 4,
    apartment: "Daire 8",
    resident: "Fatma Şahin",
    points: 45,
    tasks: 4,
  },
  {
    rank: 5,
    apartment: "Daire 1",
    resident: "Hasan Öztürk",
    points: 38,
    tasks: 3,
  },
];

const categoryColors: Record<string, string> = {
  Nöbet: "bg-blue-100 text-blue-800",
  Bahçe: "bg-green-100 text-green-800",
  Etkinlik: "bg-purple-100 text-purple-800",
  Bakım: "bg-orange-100 text-orange-800",
  Yönetim: "bg-gray-100 text-gray-800",
};

export default function ResidentTasks({
  buildingId: _buildingId,
  isOwner,
  t: _t,
}: ResidentTasksProps) {
  const [activeTab, setActiveTab] = useState<
    "tasks" | "myTasks" | "leaderboard"
  >("tasks");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [joinedTasks, setJoinedTasks] = useState<number[]>([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "Nöbet",
    date: "",
    slots: 2,
    points: 10,
  });

  const categories = ["all", "Nöbet", "Bahçe", "Etkinlik", "Bakım", "Yönetim"];

  const filtered = MOCK_TASKS.filter((task) => {
    if (filterCategory !== "all" && task.category !== filterCategory)
      return false;
    if (filterStatus !== "all" && task.status !== filterStatus) return false;
    return true;
  });

  const myTasks = MOCK_TASKS.filter((t) => joinedTasks.includes(t.id));
  const totalPoints = myTasks.reduce((sum, t) => sum + t.points, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2332]">
            Sakin Görev & Gönüllü Çalışma
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Bina görevlerine gönüllü katılın, puan kazanın
          </p>
        </div>
        {isOwner && (
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#4F8EF7] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3a7de8]"
          >
            <Plus size={16} /> Görev Ekle
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-[#4F8EF7]">
            {MOCK_TASKS.length}
          </div>
          <div className="text-sm text-gray-500">Aktif Görev</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-green-600">
            {MOCK_TASKS.filter((t) => t.status === "open").length}
          </div>
          <div className="text-sm text-gray-500">Katılım Açık</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-purple-600">
            {joinedTasks.length}
          </div>
          <div className="text-sm text-gray-500">Görevlerim</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-orange-500">
            {totalPoints}
          </div>
          <div className="text-sm text-gray-500">Puanım</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {(["tasks", "myTasks", "leaderboard"] as const).map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-white text-[#4F8EF7] shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab === "tasks"
              ? "Tüm Görevler"
              : tab === "myTasks"
                ? "Görevlerim"
                : "Sıralama"}
          </button>
        ))}
      </div>

      {activeTab === "tasks" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <Filter size={16} className="text-gray-400" />
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filterCategory === cat
                    ? "bg-[#4F8EF7] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat === "all" ? "Tümü" : cat}
              </button>
            ))}
            <div className="ml-2 flex gap-2">
              {["all", "open", "full"].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    filterStatus === s
                      ? "bg-[#1a2332] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {s === "all" ? "Tüm Durum" : s === "open" ? "Açık" : "Dolu"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[task.category] || "bg-gray-100 text-gray-800"}`}
                    >
                      {task.category}
                    </span>
                    <h3 className="font-semibold text-[#1a2332] mt-1">
                      {task.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star
                      size={12}
                      className="text-yellow-500 fill-yellow-500"
                    />
                    <span className="text-xs font-bold text-yellow-700">
                      {task.points}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-3">{task.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {task.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} /> {task.volunteers.length}/{task.slots}{" "}
                    katılımcı
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mr-3">
                    <div
                      className="bg-[#4F8EF7] h-1.5 rounded-full"
                      style={{
                        width: `${(task.volunteers.length / task.slots) * 100}%`,
                      }}
                    />
                  </div>
                  {task.status === "open" && !joinedTasks.includes(task.id) ? (
                    <button
                      type="button"
                      onClick={() => setJoinedTasks((p) => [...p, task.id])}
                      className="shrink-0 text-xs bg-[#4F8EF7] text-white px-3 py-1.5 rounded-lg hover:bg-[#3a7de8] font-medium"
                    >
                      Katıl
                    </button>
                  ) : joinedTasks.includes(task.id) ? (
                    <span className="shrink-0 text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-medium">
                      Katıldın ✓
                    </span>
                  ) : (
                    <span className="shrink-0 text-xs bg-gray-100 text-gray-500 px-3 py-1.5 rounded-lg">
                      Dolu
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "myTasks" && (
        <div className="space-y-4">
          {myTasks.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
              <CheckSquare className="mx-auto mb-3 text-gray-300" size={48} />
              <p className="text-gray-500">Henüz bir göreve katılmadınız.</p>
              <p className="text-sm text-gray-400 mt-1">
                "Tüm Görevler" sekmesinden katılabilirsiniz.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {myTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-xl p-5 border-2 border-green-200 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[task.category] || ""}`}
                    >
                      {task.category}
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      Katıldın ✓
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#1a2332] mt-1">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {task.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={12} />
                      {task.date}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-600 font-bold text-sm">
                      <Star size={14} className="fill-yellow-500" />
                      {task.points} puan
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "leaderboard" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gradient-to-r from-yellow-50 to-orange-50">
            <h3 className="font-semibold text-[#1a2332] flex items-center gap-2">
              <Award size={18} className="text-yellow-500" /> Aylık Puan
              Sıralaması
            </h3>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left">Sıra</th>
                <th className="px-4 py-3 text-left">Daire</th>
                <th className="px-4 py-3 text-left">Sakin</th>
                <th className="px-4 py-3 text-right">Görev</th>
                <th className="px-4 py-3 text-right">Puan</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {MOCK_LEADERBOARD.map((entry) => (
                <tr key={entry.rank} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                        entry.rank === 1
                          ? "bg-yellow-100 text-yellow-700"
                          : entry.rank === 2
                            ? "bg-gray-100 text-gray-600"
                            : entry.rank === 3
                              ? "bg-orange-100 text-orange-600"
                              : "text-gray-500"
                      }`}
                    >
                      {entry.rank === 1
                        ? "🥇"
                        : entry.rank === 2
                          ? "🥈"
                          : entry.rank === 3
                            ? "🥉"
                            : entry.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-[#1a2332]">
                    {entry.apartment}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{entry.resident}</td>
                  <td className="px-4 py-3 text-right text-gray-600">
                    {entry.tasks}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-[#4F8EF7]">
                    {entry.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold text-[#1a2332] mb-4">
              Yeni Görev Ekle
            </h3>
            <div className="space-y-3">
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Görev başlığı"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask((p) => ({ ...p, title: e.target.value }))
                }
              />
              <textarea
                className="w-full border rounded-lg px-3 py-2 text-sm"
                rows={2}
                placeholder="Açıklama"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask((p) => ({ ...p, description: e.target.value }))
                }
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  className="border rounded-lg px-3 py-2 text-sm"
                  value={newTask.category}
                  onChange={(e) =>
                    setNewTask((p) => ({ ...p, category: e.target.value }))
                  }
                >
                  {["Nöbet", "Bahçe", "Etkinlik", "Bakım", "Yönetim"].map(
                    (c) => (
                      <option key={c}>{c}</option>
                    ),
                  )}
                </select>
                <input
                  type="date"
                  className="border rounded-lg px-3 py-2 text-sm"
                  value={newTask.date}
                  onChange={(e) =>
                    setNewTask((p) => ({ ...p, date: e.target.value }))
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Kapasite</p>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    value={newTask.slots}
                    onChange={(e) =>
                      setNewTask((p) => ({
                        ...p,
                        slots: Number(e.target.value),
                      }))
                    }
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Puan</p>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    value={newTask.points}
                    onChange={(e) =>
                      setNewTask((p) => ({
                        ...p,
                        points: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-[#4F8EF7] text-white rounded-lg py-2 text-sm font-medium hover:bg-[#3a7de8]"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
