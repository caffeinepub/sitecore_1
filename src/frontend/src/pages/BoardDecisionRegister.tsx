import {
  AlertCircle,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Edit2,
  FileText,
  Filter,
  Plus,
  Printer,
  Search,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";

interface Decision {
  id: string;
  number: string;
  date: string;
  category: string;
  title: string;
  content: string;
  proposedBy: string;
  status: "approved" | "pending" | "rejected";
  votes: { yes: number; no: number; abstain: number };
  signatories: string[];
  notes?: string;
  meetingRef?: string;
}

const INITIAL_DECISIONS: Decision[] = [
  {
    id: "1",
    number: "2024/001",
    date: "2024-01-15",
    category: "Finansal",
    title: "Yıllık Bütçe Onayı",
    content:
      "2024 yılı için toplam 480.000 TL bütçe onaylanmıştır. Aidat miktarı daire büyüklüğüne göre 2.800 TL ile 4.200 TL arasında belirlenmiştir.",
    proposedBy: "Ahmet Yıldız",
    status: "approved",
    votes: { yes: 7, no: 1, abstain: 1 },
    signatories: ["Ahmet Yıldız", "Fatma Kaya", "Mehmet Demir"],
    meetingRef: "Ocak 2024 Olağan Toplantısı",
  },
  {
    id: "2",
    number: "2024/002",
    date: "2024-01-15",
    category: "Teknik",
    title: "Asansör Bakım Sözleşmesi Yenileme",
    content:
      "Otis Asansör A.Ş. ile 36 aylık bakım sözleşmesi yıllık 28.000 TL bedel üzerinden yenilenmiştir. Aylık periyodik bakım ve 7/24 arıza hizmeti dahildir.",
    proposedBy: "Mehmet Demir",
    status: "approved",
    votes: { yes: 9, no: 0, abstain: 0 },
    signatories: ["Ahmet Yıldız", "Mehmet Demir"],
    meetingRef: "Ocak 2024 Olağan Toplantısı",
  },
  {
    id: "3",
    number: "2024/003",
    date: "2024-02-10",
    category: "Güvenlik",
    title: "Ek Kamera Sistemi Kurulumu",
    content:
      "Otopark girişi ve arka bahçeye 4 adet ek güvenlik kamerası kurulmasına karar verilmiştir. Toplam maliyet 18.500 TL olup bina genel gider fonundan karşılanacaktır.",
    proposedBy: "Ali Çelik",
    status: "approved",
    votes: { yes: 6, no: 2, abstain: 1 },
    signatories: ["Ahmet Yıldız", "Ali Çelik", "Fatma Kaya"],
    meetingRef: "Şubat 2024 Acil Toplantısı",
  },
  {
    id: "4",
    number: "2024/004",
    date: "2024-03-05",
    category: "Çevre",
    title: "Bahçe Düzenlemesi Projesi",
    content:
      "Bina ön bahçesinin yeniden düzenlenmesi için Yeşil Bahçe Peyzaj firmasından alınan 35.000 TL tutarındaki teklif kabul edilmiştir. İşin Nisan ayında başlaması planlanmaktadır.",
    proposedBy: "Zeynep Arslan",
    status: "approved",
    votes: { yes: 5, no: 3, abstain: 2 },
    signatories: ["Ahmet Yıldız", "Zeynep Arslan"],
    meetingRef: "Mart 2024 Olağan Toplantısı",
  },
  {
    id: "5",
    number: "2024/005",
    date: "2024-03-05",
    category: "İdari",
    title: "Bina İç Yönetmeliği Güncellenmesi",
    content:
      "Evcil hayvan sahipliği, ortak alan kullanımı ve gürültü saatleri konularında bina iç yönetmeliğinde değişiklik yapılmasına karar verilmiştir. Güncellenmiş metin 30 gün içinde tüm sakenlere dağıtılacaktır.",
    proposedBy: "Fatma Kaya",
    status: "approved",
    votes: { yes: 8, no: 1, abstain: 0 },
    signatories: ["Ahmet Yıldız", "Fatma Kaya", "Mehmet Demir", "Ali Çelik"],
    meetingRef: "Mart 2024 Olağan Toplantısı",
  },
  {
    id: "6",
    number: "2024/006",
    date: "2024-04-20",
    category: "Finansal",
    title: "Çatı Tamir Fonu Oluşturulması",
    content:
      "Çatı yenileme projesi için özel bir tamir fonu oluşturulmasına karar verilmiştir. Her daireden aylık 150 TL ek kesinti yapılarak fon biriktirilecek, hedef rakam 200.000 TL'dir.",
    proposedBy: "Ahmet Yıldız",
    status: "pending",
    votes: { yes: 4, no: 4, abstain: 1 },
    signatories: [],
    notes: "Eşit oy nedeniyle bir sonraki toplantıya ertelendi.",
    meetingRef: "Nisan 2024 Olağan Toplantısı",
  },
  {
    id: "7",
    number: "2024/007",
    date: "2024-05-12",
    category: "Teknik",
    title: "Hidrofor Sistemi Yenilenmesi",
    content:
      "Binanın hidrofor sistemi 15 yıllık kullanım ömrünü doldurduğundan yenilenmesine karar verilmiştir. İhale süreci başlatılmış olup en az 3 firmadan teklif alınacaktır.",
    proposedBy: "Mehmet Demir",
    status: "approved",
    votes: { yes: 9, no: 0, abstain: 0 },
    signatories: ["Ahmet Yıldız", "Mehmet Demir", "Ali Çelik"],
    meetingRef: "Mayıs 2024 Teknik Toplantısı",
  },
  {
    id: "8",
    number: "2024/008",
    date: "2024-06-01",
    category: "Sosyal",
    title: "Yaz Etkinliği Organizasyonu",
    content:
      "Sakinler arası kaynaşmayı artırmak amacıyla Temmuz ayında bina bahçesinde akşam yemeği etkinliği düzenlenmesine karar verilmiştir. Bütçe: 5.000 TL.",
    proposedBy: "Zeynep Arslan",
    status: "approved",
    votes: { yes: 7, no: 1, abstain: 1 },
    signatories: ["Ahmet Yıldız", "Zeynep Arslan"],
    meetingRef: "Haziran 2024 Olağan Toplantısı",
  },
  {
    id: "9",
    number: "2024/009",
    date: "2024-06-01",
    category: "Güvenlik",
    title: "Gece Güvenlik Personeli İstihdamı",
    content:
      "Hafta içi gece 22:00-06:00 saatleri arasında güvenlik personeli çalıştırılmasına karar verilmiştir. Maliyet bina güvenlik bütçesinden karşılanacaktır.",
    proposedBy: "Ali Çelik",
    status: "rejected",
    votes: { yes: 3, no: 5, abstain: 2 },
    signatories: [],
    notes: "Oy çokluğuyla reddedildi. Önce kamera sistemi güçlendirilecek.",
    meetingRef: "Haziran 2024 Olağan Toplantısı",
  },
];

const CATEGORIES = [
  "Tümü",
  "Finansal",
  "Teknik",
  "Güvenlik",
  "Çevre",
  "İdari",
  "Sosyal",
];
const STATUS_OPTIONS = ["Tümü", "approved", "pending", "rejected"];

const STATUS_LABELS: Record<string, string> = {
  approved: "Onaylandı",
  pending: "Beklemede",
  rejected: "Reddedildi",
};

const STATUS_COLORS: Record<string, string> = {
  approved: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  rejected: "bg-red-100 text-red-700",
};

const STATUS_ICONS: Record<string, typeof CheckCircle> = {
  approved: CheckCircle,
  pending: Clock,
  rejected: AlertCircle,
};

const CATEGORY_COLORS: Record<string, string> = {
  Finansal: "bg-blue-100 text-blue-700",
  Teknik: "bg-purple-100 text-purple-700",
  Güvenlik: "bg-red-100 text-red-700",
  Çevre: "bg-green-100 text-green-700",
  İdari: "bg-gray-100 text-gray-700",
  Sosyal: "bg-pink-100 text-pink-700",
};

interface Props {
  buildingId: string;
  isOwner: boolean;
  t: Record<string, string>;
}

export default function BoardDecisionRegister({ isOwner }: Props) {
  const [decisions, setDecisions] = useState<Decision[]>(INITIAL_DECISIONS);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tümü");
  const [statusFilter, setStatusFilter] = useState("Tümü");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [printMode, setPrintMode] = useState(false);

  const [newDecision, setNewDecision] = useState({
    title: "",
    content: "",
    category: "Finansal",
    proposedBy: "",
    votesYes: 5,
    votesNo: 0,
    votesAbstain: 0,
    notes: "",
    meetingRef: "",
  });

  const filtered = decisions.filter((d) => {
    const matchSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.content.toLowerCase().includes(search.toLowerCase()) ||
      d.number.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      categoryFilter === "Tümü" || d.category === categoryFilter;
    const matchStatus = statusFilter === "Tümü" || d.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  const stats = {
    total: decisions.length,
    approved: decisions.filter((d) => d.status === "approved").length,
    pending: decisions.filter((d) => d.status === "pending").length,
    rejected: decisions.filter((d) => d.status === "rejected").length,
  };

  const handleAdd = () => {
    if (!newDecision.title || !newDecision.content || !newDecision.proposedBy)
      return;
    const now = new Date();
    const year = now.getFullYear();
    const num =
      decisions.filter((d) => d.number.startsWith(String(year))).length + 1;
    const newEntry: Decision = {
      id: String(Date.now()),
      number: `${year}/${String(num).padStart(3, "0")}`,
      date: now.toISOString().split("T")[0],
      category: newDecision.category,
      title: newDecision.title,
      content: newDecision.content,
      proposedBy: newDecision.proposedBy,
      status: "pending",
      votes: {
        yes: newDecision.votesYes,
        no: newDecision.votesNo,
        abstain: newDecision.votesAbstain,
      },
      signatories: [],
      notes: newDecision.notes || undefined,
      meetingRef: newDecision.meetingRef || undefined,
    };
    setDecisions([newEntry, ...decisions]);
    setNewDecision({
      title: "",
      content: "",
      category: "Finansal",
      proposedBy: "",
      votesYes: 5,
      votesNo: 0,
      votesAbstain: 0,
      notes: "",
      meetingRef: "",
    });
    setShowAddForm(false);
  };

  const handleApprove = (id: string) => {
    setDecisions((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: "approved" as const,
              signatories: d.signatories.length ? d.signatories : ["Yönetici"],
            }
          : d,
      ),
    );
  };

  const handleReject = (id: string) => {
    setDecisions((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: "rejected" as const } : d,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setDecisions((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#0E1116]">
              Yönetim Kurulu Karar Defteri
            </h1>
            <p className="text-sm text-[#6B7A8D]">
              Resmi kararlar, oylamalar ve onay kayıtları
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPrintMode(!printMode)}
            className="flex items-center gap-2 px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#3A4654] hover:bg-[#F3F6FB] transition-colors"
          >
            <Printer className="w-4 h-4" />
            Yazdır
          </button>
          {isOwner && (
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Yeni Karar
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[#E2E8F0]">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-indigo-600" />
            <span className="text-xs text-[#6B7A8D]">Toplam Karar</span>
          </div>
          <div className="text-2xl font-bold text-[#0E1116]">{stats.total}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E2E8F0]">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-xs text-[#6B7A8D]">Onaylanan</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {stats.approved}
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E2E8F0]">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-yellow-600" />
            <span className="text-xs text-[#6B7A8D]">Bekleyen</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600">
            {stats.pending}
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E2E8F0]">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-xs text-[#6B7A8D]">Reddedilen</span>
          </div>
          <div className="text-2xl font-bold text-red-600">
            {stats.rejected}
          </div>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
          <h3 className="font-semibold text-[#0E1116] mb-4">
            Yeni Karar Kaydı
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="decision-title"
                className="block text-xs font-medium text-[#6B7A8D] mb-1"
              >
                Karar Başlığı *
              </label>
              <input
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm"
                value={newDecision.title}
                onChange={(e) =>
                  setNewDecision({ ...newDecision, title: e.target.value })
                }
                placeholder="Karar başlığını girin"
              />
            </div>
            <div>
              <label
                htmlFor="decision-proposer"
                className="block text-xs font-medium text-[#6B7A8D] mb-1"
              >
                Öneren *
              </label>
              <input
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm"
                value={newDecision.proposedBy}
                onChange={(e) =>
                  setNewDecision({ ...newDecision, proposedBy: e.target.value })
                }
                placeholder="Ad Soyad"
              />
            </div>
            <div>
              <label
                htmlFor="decision-category"
                className="block text-xs font-medium text-[#6B7A8D] mb-1"
              >
                Kategori
              </label>
              <select
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm"
                value={newDecision.category}
                onChange={(e) =>
                  setNewDecision({ ...newDecision, category: e.target.value })
                }
              >
                {CATEGORIES.filter((c) => c !== "Tümü").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="decision-meeting"
                className="block text-xs font-medium text-[#6B7A8D] mb-1"
              >
                Toplantı Referansı
              </label>
              <input
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm"
                value={newDecision.meetingRef}
                onChange={(e) =>
                  setNewDecision({ ...newDecision, meetingRef: e.target.value })
                }
                placeholder="Toplantı adı (isteğe bağlı)"
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="decision-content"
                className="block text-xs font-medium text-[#6B7A8D] mb-1"
              >
                Karar Metni *
              </label>
              <textarea
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm"
                rows={3}
                value={newDecision.content}
                onChange={(e) =>
                  setNewDecision({ ...newDecision, content: e.target.value })
                }
                placeholder="Kararın tam metnini girin"
              />
            </div>
            <div className="md:col-span-2">
              <span className="block text-xs font-medium text-[#6B7A8D] mb-2">
                Oy Sonuçları
              </span>
              <div className="flex gap-4">
                {["votesYes", "votesNo", "votesAbstain"].map((field, i) => (
                  <div key={field}>
                    <span className="block text-xs text-[#6B7A8D] mb-1">
                      {["Evet", "Hayır", "Çekimser"][i]}
                    </span>
                    <input
                      type="number"
                      min={0}
                      className="w-20 border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm"
                      value={(newDecision as any)[field]}
                      onChange={(e) =>
                        setNewDecision({
                          ...newDecision,
                          [field]: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="decision-notes"
                className="block text-xs font-medium text-[#6B7A8D] mb-1"
              >
                Notlar
              </label>
              <input
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm"
                value={newDecision.notes}
                onChange={(e) =>
                  setNewDecision({ ...newDecision, notes: e.target.value })
                }
                placeholder="Ek not (isteğe bağlı)"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={handleAdd}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
            >
              Kaydet
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#3A4654] hover:bg-[#F3F6FB] transition-colors"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A8D]" />
          <input
            className="w-full pl-9 pr-4 py-2 border border-[#E2E8F0] rounded-lg text-sm"
            placeholder="Karar ara (başlık, metin, numara)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#6B7A8D]" />
            <select
              className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <select
            className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === "Tümü" ? "Tüm Durumlar" : STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Decision List */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#6B7A8D]">
            <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p>Karar bulunamadı</p>
          </div>
        )}
        {filtered.map((decision) => {
          const StatusIcon = STATUS_ICONS[decision.status];
          const isExpanded = expandedId === decision.id;
          const total =
            decision.votes.yes + decision.votes.no + decision.votes.abstain;
          return (
            <div
              key={decision.id}
              className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between p-4 cursor-pointer hover:bg-[#F8FAFC] transition-colors text-left"
                onClick={() => setExpandedId(isExpanded ? null : decision.id)}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded">
                      {decision.number}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-[#0E1116] text-sm">
                        {decision.title}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[decision.category] || "bg-gray-100 text-gray-700"}`}
                      >
                        {decision.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-[#6B7A8D] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {decision.date}
                      </span>
                      <span className="text-xs text-[#6B7A8D] flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {decision.proposedBy}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[decision.status]}`}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {STATUS_LABELS[decision.status]}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#6B7A8D]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#6B7A8D]" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-[#E2E8F0] p-4 space-y-4">
                  {/* Meeting Ref */}
                  {decision.meetingRef && (
                    <div className="text-xs text-indigo-700 bg-indigo-50 px-3 py-2 rounded-lg flex items-center gap-2">
                      <FileText className="w-3 h-3" />
                      {decision.meetingRef}
                    </div>
                  )}

                  {/* Content */}
                  <div>
                    <h4 className="text-xs font-semibold text-[#6B7A8D] mb-1">
                      KARAR METNİ
                    </h4>
                    <p className="text-sm text-[#3A4654] leading-relaxed">
                      {decision.content}
                    </p>
                  </div>

                  {/* Votes */}
                  <div>
                    <h4 className="text-xs font-semibold text-[#6B7A8D] mb-2">
                      OY SONUÇLARI ({total} toplam)
                    </h4>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-sm font-medium text-green-700">
                          Evet: {decision.votes.yes}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-sm font-medium text-red-700">
                          Hayır: {decision.votes.no}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-400" />
                        <span className="text-sm font-medium text-gray-600">
                          Çekimser: {decision.votes.abstain}
                        </span>
                      </div>
                    </div>
                    {total > 0 && (
                      <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden flex">
                        <div
                          className="bg-green-500 h-full"
                          style={{
                            width: `${(decision.votes.yes / total) * 100}%`,
                          }}
                        />
                        <div
                          className="bg-red-500 h-full"
                          style={{
                            width: `${(decision.votes.no / total) * 100}%`,
                          }}
                        />
                        <div
                          className="bg-gray-300 h-full"
                          style={{
                            width: `${(decision.votes.abstain / total) * 100}%`,
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Signatories */}
                  {decision.signatories.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-[#6B7A8D] mb-2">
                        İMZACILAR
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {decision.signatories.map((s) => (
                          <div
                            key={s}
                            className="flex items-center gap-1 bg-[#F3F6FB] px-3 py-1 rounded-lg text-xs text-[#3A4654] border border-[#E2E8F0]"
                          >
                            <User className="w-3 h-3" />
                            {s}
                            <span className="text-green-600">✓</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {decision.notes && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 text-xs text-yellow-800">
                      <strong>Not:</strong> {decision.notes}
                    </div>
                  )}

                  {/* Actions */}
                  {isOwner && (
                    <div className="flex gap-2 pt-1">
                      {decision.status === "pending" && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleApprove(decision.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="w-3 h-3" />
                            Onayla
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReject(decision.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700 transition-colors"
                          >
                            <AlertCircle className="w-3 h-3" />
                            Reddet
                          </button>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDelete(decision.id)}
                        className="flex items-center gap-1 px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-xs hover:bg-red-50 transition-colors ml-auto"
                      >
                        <Trash2 className="w-3 h-3" />
                        Sil
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Print View Hint */}
      {printMode && (
        <div className="bg-white rounded-xl border-2 border-dashed border-indigo-200 p-6">
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold text-[#0E1116]">
              YÖNETİM KURULU KARAR DEFTERİ
            </h2>
            <p className="text-xs text-[#6B7A8D]">
              Tüm kararlar -- {new Date().toLocaleDateString("tr-TR")}
            </p>
          </div>
          <div className="space-y-2">
            {decisions
              .filter((d) => d.status === "approved")
              .map((d) => (
                <div
                  key={d.id}
                  className="flex items-start gap-3 text-xs border-b border-gray-100 pb-2"
                >
                  <span className="font-mono font-bold text-indigo-700 w-20 flex-shrink-0">
                    {d.number}
                  </span>
                  <span className="text-[#6B7A8D] w-24 flex-shrink-0">
                    {d.date}
                  </span>
                  <span className="font-medium text-[#0E1116] flex-1">
                    {d.title}
                  </span>
                  <span className="text-green-700 flex-shrink-0">✓ Onaylı</span>
                </div>
              ))}
          </div>
          <button
            type="button"
            onClick={() => setPrintMode(false)}
            className="mt-4 text-xs text-[#6B7A8D] hover:text-[#0E1116]"
          >
            Kapat
          </button>
        </div>
      )}
    </div>
  );
}
