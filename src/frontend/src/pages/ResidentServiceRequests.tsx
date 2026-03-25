import {
  Accessibility,
  Bike,
  Camera,
  CheckCircle,
  Clock,
  Filter,
  Lightbulb,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  ShoppingCart,
  ThumbsUp,
  TreePine,
  Wifi,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";

interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  submittedBy: string;
  apartment: string;
  date: string;
  status: "pending" | "under_review" | "approved" | "rejected" | "completed";
  votes: number;
  voted: boolean;
  comments: number;
  priority: "low" | "medium" | "high";
  managerNote?: string;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Beklemede",
    color: "bg-gray-100 text-gray-600",
    icon: <Clock className="w-3 h-3" />,
  },
  under_review: {
    label: "İnceleniyor",
    color: "bg-blue-100 text-blue-700",
    icon: <Filter className="w-3 h-3" />,
  },
  approved: {
    label: "Onaylandı",
    color: "bg-green-100 text-green-700",
    icon: <CheckCircle className="w-3 h-3" />,
  },
  rejected: {
    label: "Reddedildi",
    color: "bg-red-100 text-red-700",
    icon: <XCircle className="w-3 h-3" />,
  },
  completed: {
    label: "Tamamlandı",
    color: "bg-purple-100 text-purple-700",
    icon: <CheckCircle className="w-3 h-3" />,
  },
};

const CATEGORIES = [
  { key: "all", label: "Tümü" },
  { key: "guvenlik", label: "Güvenlik" },
  { key: "ulasim", label: "Ulaşım" },
  { key: "erisilebilirlik", label: "Erişilebilirlik" },
  { key: "cevre", label: "Çevre" },
  { key: "teknoloji", label: "Teknoloji" },
  { key: "sosyal", label: "Sosyal Alan" },
  { key: "diger", label: "Diğer" },
];

const MOCK_REQUESTS: ServiceRequest[] = [
  {
    id: "1",
    title: "Bisiklet Park Yeri Eklenmesi",
    description:
      "Binanın girişine veya otopark alanına sakinler için kilitli bisiklet park yeri yapılmasını talep ediyorum. Bisiklet kullananların sayısı giderek artıyor.",
    category: "ulasim",
    submittedBy: "Ahmet Yılmaz",
    apartment: "D:12",
    date: "2026-03-10",
    status: "under_review",
    votes: 18,
    voted: true,
    comments: 5,
    priority: "medium",
    managerNote:
      "Otopark komisyonuyla görüşülüyor, 2 hafta içinde karar verilecek.",
  },
  {
    id: "2",
    title: "Ana Giriş Engelli Rampası",
    description:
      "Ana giriş kapısı basamaklı olduğundan tekerlekli sandalye kullanıcıları ve bebek arabası olan aileler ciddi güçlük yaşıyor. Rampa eklenmesini talep ediyoruz.",
    category: "erisilebilirlik",
    submittedBy: "Fatma Demir",
    apartment: "B:3",
    date: "2026-03-05",
    status: "approved",
    votes: 34,
    voted: false,
    comments: 12,
    priority: "high",
    managerNote: "Proje onaylandı. Nisan ayında çalışma başlıyor.",
  },
  {
    id: "3",
    title: "Çocuk Oyun Alanı Yenilenmesi",
    description:
      "Mevcut çocuk oyun alanındaki ekipmanlar eskimiş ve bazıları güvensiz. Modern, güvenli ekipmanlarla yenilenmesini istiyoruz.",
    category: "sosyal",
    submittedBy: "Mehmet Kaya",
    apartment: "C:7",
    date: "2026-02-28",
    status: "pending",
    votes: 25,
    voted: false,
    comments: 8,
    priority: "high",
  },
  {
    id: "4",
    title: "Ortak Alanda WiFi Erişim Noktası",
    description:
      "Bahçe ve ortak oturma alanlarında ücretsiz WiFi olması sakinlerin dışarıda vakit geçirmesini kolaylaştıracak.",
    category: "teknoloji",
    submittedBy: "Ayşe Çelik",
    apartment: "A:15",
    date: "2026-02-20",
    status: "rejected",
    votes: 11,
    voted: false,
    comments: 3,
    priority: "low",
    managerNote:
      "Güvenlik ve altyapı maliyeti nedeniyle şu an için bütçe karşılanamıyor.",
  },
  {
    id: "5",
    title: "Kapı Önü Güvenlik Kamerası",
    description:
      "A ve B blok arka kapılarında kamera bulunmuyor. Bu alanlarda zaman zaman güvensiz durumlar yaşanıyor. Kamera eklenmesini talep ediyorum.",
    category: "guvenlik",
    submittedBy: "Hasan Özdemir",
    apartment: "A:4",
    date: "2026-02-15",
    status: "completed",
    votes: 29,
    voted: true,
    comments: 6,
    priority: "high",
    managerNote: "Kameralar Mart başında kuruldu.",
  },
  {
    id: "6",
    title: "Otopark Aydınlatma İyileştirmesi",
    description:
      "Otopark giriş ve çıkışı çok karanlık. Özellikle kış aylarında görüş mesafesi çok kısalıyor.",
    category: "guvenlik",
    submittedBy: "Zeynep Aydın",
    apartment: "D:2",
    date: "2026-03-18",
    status: "pending",
    votes: 7,
    voted: false,
    comments: 2,
    priority: "medium",
  },
  {
    id: "7",
    title: "Bahçeye Kompost Kutusu Eklenmesi",
    description:
      "Mutfak atıklarını kompost haline getirmek için bahçeye uygun bir kompost kutusu konulabilir. Hem atığı azaltır hem de bahçe gübresi üretir.",
    category: "cevre",
    submittedBy: "Burak Şahin",
    apartment: "C:11",
    date: "2026-03-20",
    status: "pending",
    votes: 5,
    voted: false,
    comments: 1,
    priority: "low",
  },
];

interface Props {
  buildingId: string;
  isOwner: boolean;
  t: Record<string, string>;
}

export default function ResidentServiceRequests({ isOwner }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [selectedReq, setSelectedReq] = useState<ServiceRequest | null>(null);
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [sortBy, setSortBy] = useState<"date" | "votes">("votes");

  // New request form state
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCat, setNewCat] = useState("diger");

  const filtered = requests
    .filter((r) => {
      const matchSearch =
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "all" || r.category === category;
      const matchStatus = statusFilter === "all" || r.status === statusFilter;
      return matchSearch && matchCat && matchStatus;
    })
    .sort((a, b) =>
      sortBy === "votes"
        ? b.votes - a.votes
        : new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    completed: requests.filter((r) => r.status === "completed").length,
  };

  const toggleVote = (id: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              votes: r.voted ? r.votes - 1 : r.votes + 1,
              voted: !r.voted,
            }
          : r,
      ),
    );
  };

  const handleSubmit = () => {
    if (!newTitle.trim()) return;
    const newReq: ServiceRequest = {
      id: String(Date.now()),
      title: newTitle,
      description: newDesc,
      category: newCat,
      submittedBy: "Siz",
      apartment: "D:1",
      date: new Date().toISOString().slice(0, 10),
      status: "pending",
      votes: 0,
      voted: false,
      comments: 0,
      priority: "medium",
    };
    setRequests((prev) => [newReq, ...prev]);
    setNewTitle("");
    setNewDesc("");
    setNewCat("diger");
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1B2E]">
            Hizmet Talebi & Bina Geliştirme Önerileri
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Yönetime öneri ve iyileştirme talebi gönderin
          </p>
        </div>
        <Button
          onClick={() => setShowAdd(true)}
          className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Öneri Gönder
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
          <div className="text-2xl font-bold text-[#0B1B2E]">{stats.total}</div>
          <div className="text-sm text-gray-500">Toplam Öneri</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {stats.pending}
          </div>
          <div className="text-sm text-gray-500">Beklemede</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
          <div className="text-2xl font-bold text-green-600">
            {stats.approved}
          </div>
          <div className="text-sm text-gray-500">Onaylandı</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {stats.completed}
          </div>
          <div className="text-sm text-gray-500">Tamamlandı</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Öneri ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="pending">Beklemede</option>
            <option value="under_review">İnceleniyor</option>
            <option value="approved">Onaylandı</option>
            <option value="rejected">Reddedildi</option>
            <option value="completed">Tamamlandı</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "date" | "votes")}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
          >
            <option value="votes">En Çok Oy Alan</option>
            <option value="date">En Yeni</option>
          </select>
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setCategory(cat.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                category === cat.key
                  ? "bg-[#2563EB] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Request List */}
      <div className="space-y-4">
        {filtered.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-start gap-4">
                {/* Vote Button */}
                <button
                  type="button"
                  onClick={() => toggleVote(req.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl border-2 transition-all flex-shrink-0 ${
                    req.voted
                      ? "border-[#2563EB] bg-blue-50 text-[#2563EB]"
                      : "border-gray-200 text-gray-400 hover:border-blue-300"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="font-bold text-sm">{req.votes}</span>
                </button>

                {/* Content */}
                <button
                  type="button"
                  className="flex-1 text-left"
                  onClick={() => setSelectedReq(req)}
                >
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-[#0B1B2E]">
                      {req.title}
                    </h3>
                    <Badge
                      className={`text-xs ${STATUS_CONFIG[req.status].color} border-0 flex items-center gap-1`}
                    >
                      {STATUS_CONFIG[req.status].icon}{" "}
                      {STATUS_CONFIG[req.status].label}
                    </Badge>
                    {req.priority === "high" && (
                      <Badge className="text-xs bg-red-100 text-red-700 border-0">
                        Yüksek Öncelik
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {req.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span>
                      👤 {req.submittedBy} ({req.apartment})
                    </span>
                    <span>📅 {req.date}</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> {req.comments} yorum
                    </span>
                  </div>
                  {req.managerNote && (
                    <div className="mt-2 text-sm bg-blue-50 text-blue-800 px-3 py-2 rounded-lg">
                      💬 Yönetici: {req.managerNote}
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
            <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Henüz öneri bulunmuyor</p>
            <Button
              onClick={() => setShowAdd(true)}
              className="mt-3 bg-[#2563EB] text-white"
            >
              İlk Öneriyi Gönder
            </Button>
          </div>
        )}
      </div>

      {/* Add Request Modal */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Yeni Hizmet Talebi / Öneri</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="req-title" className="text-sm font-medium">
                Başlık *
              </label>
              <Input
                id="req-title"
                placeholder="Kısa ve açıklayıcı bir başlık"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="req-desc" className="text-sm font-medium">
                Açıklama
              </label>
              <textarea
                id="req-desc"
                placeholder="Önerinizi veya talebinizi detaylı açıklayın..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows={4}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="req-cat" className="text-sm font-medium">
                Kategori
              </label>
              <select
                id="req-cat"
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
              >
                {CATEGORIES.filter((c) => c.key !== "all").map((cat) => (
                  <option key={cat.key} value={cat.key}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                className="flex-1 bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
                onClick={handleSubmit}
                disabled={!newTitle.trim()}
              >
                Gönder
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAdd(false)}
              >
                İptal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detail Modal */}
      {selectedReq && (
        <Dialog open={!!selectedReq} onOpenChange={() => setSelectedReq(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedReq.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge
                  className={`text-xs ${STATUS_CONFIG[selectedReq.status].color} border-0 flex items-center gap-1`}
                >
                  {STATUS_CONFIG[selectedReq.status].icon}{" "}
                  {STATUS_CONFIG[selectedReq.status].label}
                </Badge>
                {selectedReq.priority === "high" && (
                  <Badge className="text-xs bg-red-100 text-red-700 border-0">
                    Yüksek Öncelik
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {selectedReq.description}
              </p>
              <div className="text-sm text-gray-500 space-y-1">
                <div>
                  👤 {selectedReq.submittedBy} ({selectedReq.apartment})
                </div>
                <div>📅 {selectedReq.date}</div>
                <div>
                  👍 {selectedReq.votes} oy • 💬 {selectedReq.comments} yorum
                </div>
              </div>
              {selectedReq.managerNote && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <div className="text-xs font-medium text-blue-600 mb-1">
                    Yönetici Yanıtı
                  </div>
                  <div className="text-sm text-blue-800">
                    {selectedReq.managerNote}
                  </div>
                </div>
              )}
              {isOwner && selectedReq.status === "pending" && (
                <div className="flex gap-2 pt-2">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => setSelectedReq(null)}
                  >
                    Onayla
                  </Button>
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => setSelectedReq(null)}
                  >
                    Reddet
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedReq(null)}
                  >
                    Kapat
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
