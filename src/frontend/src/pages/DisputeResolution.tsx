import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  MessageSquare,
  Plus,
  Scale,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface Dispute {
  id: string;
  title: string;
  complainant: string;
  respondent: string;
  category: string;
  status: "acik" | "inceleniyor" | "arabuluculuk" | "cozuldu" | "reddedildi";
  priority: "dusuk" | "orta" | "yuksek";
  date: string;
  description: string;
  resolution?: string;
  mediator?: string;
  messages: {
    author: string;
    text: string;
    date: string;
    isManager?: boolean;
  }[];
}

const SAMPLE_DISPUTES: Dispute[] = [
  {
    id: "D001",
    title: "Gece saatlerinde gürültü şikayeti",
    complainant: "Daire 12 - Ayşe Kaya",
    respondent: "Daire 13 - Mehmet Demir",
    category: "Gürültü",
    status: "arabuluculuk",
    priority: "yuksek",
    date: "2026-03-15",
    description:
      "Her gece 23:00-02:00 saatleri arasında yüksek sesle müzik ve gürültü yapılmaktadır. Uyarılara rağmen devam etmektedir.",
    mediator: "Yönetici Hasan Bey",
    messages: [
      {
        author: "Ayşe Kaya",
        text: "Bu durum artık dayanılmaz hale geldi, acilen çözüm istiyorum.",
        date: "2026-03-15",
      },
      {
        author: "Yönetici",
        text: "Şikayetinizi aldık. Taraflarla görüşeceğiz.",
        date: "2026-03-16",
        isManager: true,
      },
      {
        author: "Mehmet Demir",
        text: "Sesimin bu kadar yüksek çıktığını bilmiyordum, özür dilerim.",
        date: "2026-03-17",
      },
    ],
  },
  {
    id: "D002",
    title: "Ortak alan temizlik sorumluluğu",
    complainant: "Daire 5 - Fatma Yılmaz",
    respondent: "Daire 6 - Ali Çelik",
    category: "Ortak Alan",
    status: "cozuldu",
    priority: "orta",
    date: "2026-03-01",
    description:
      "Kat koridorundaki temizlik sırası konusunda anlaşmazlık yaşanmaktadır.",
    resolution:
      "Taraflar yönetici arabuluculuğunda haftanın belirli günleri için temizlik takvimi oluşturdu.",
    mediator: "Yönetici Hasan Bey",
    messages: [
      {
        author: "Fatma Yılmaz",
        text: "Komşum temizlik sırasına uymuyur.",
        date: "2026-03-01",
      },
      {
        author: "Yönetici",
        text: "Takvim oluşturduk ve her iki taraf da imzaladı.",
        date: "2026-03-05",
        isManager: true,
      },
    ],
  },
  {
    id: "D003",
    title: "Park yeri işgali",
    complainant: "Daire 8 - Kemal Arslan",
    respondent: "Daire 9 - Zeynep Şahin",
    category: "Otopark",
    status: "inceleniyor",
    priority: "orta",
    date: "2026-03-20",
    description:
      "Tahsis edilmiş park yerim sürekli başkası tarafından işgal edilmektedir.",
    messages: [
      {
        author: "Kemal Arslan",
        text: "3 gündür park yerime park edilemiyor.",
        date: "2026-03-20",
      },
    ],
  },
  {
    id: "D004",
    title: "Balkon eşyaları alt daireye zarar veriyor",
    complainant: "Daire 7 - Selin Öz",
    respondent: "Daire 11 - Okan Yıldız",
    category: "Hasar",
    status: "acik",
    priority: "yuksek",
    date: "2026-03-22",
    description:
      "Üst komşunun balkonundaki saksılar sulanırken aşağı damlıyor ve balkonumda hasar oluşturuyor.",
    messages: [],
  },
  {
    id: "D005",
    title: "Evcil hayvan koridorda bırakılması",
    complainant: "Daire 3 - Murat Koç",
    respondent: "Daire 4 - Elif Doğan",
    category: "Evcil Hayvan",
    status: "reddedildi",
    priority: "dusuk",
    date: "2026-02-20",
    description: "Komşunun kedisi koridorda bırakılıyor.",
    resolution:
      "Bina kuralları incelendi. Evcil hayvan koridorda bulunmasına dair kural ihlali tespit edilemedi.",
    messages: [
      {
        author: "Murat Koç",
        text: "Kedi koridorda kalmak istemiyor diyorlar ama beni rahatsız ediyor.",
        date: "2026-02-20",
      },
      {
        author: "Yönetici",
        text: "İnceleme sonucu bina kurallarına aykırı bir durum bulunamadı.",
        date: "2026-02-25",
        isManager: true,
      },
    ],
  },
];

const CATEGORIES = [
  "Tümü",
  "Gürültü",
  "Ortak Alan",
  "Otopark",
  "Hasar",
  "Evcil Hayvan",
  "Diğer",
];
const STATUS_LABELS: Record<
  string,
  { label: string; color: string; icon: any }
> = {
  acik: { label: "Açık", color: "bg-blue-100 text-blue-700", icon: Clock },
  inceleniyor: {
    label: "İnceleniyor",
    color: "bg-yellow-100 text-yellow-700",
    icon: AlertTriangle,
  },
  arabuluculuk: {
    label: "Arabuluculuk",
    color: "bg-purple-100 text-purple-700",
    icon: MessageSquare,
  },
  cozuldu: {
    label: "Çözüldü",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  reddedildi: {
    label: "Reddedildi",
    color: "bg-red-100 text-red-700",
    icon: XCircle,
  },
};
const PRIORITY_LABELS: Record<string, { label: string; color: string }> = {
  dusuk: { label: "Düşük", color: "text-green-600" },
  orta: { label: "Orta", color: "text-yellow-600" },
  yuksek: { label: "Yüksek", color: "text-red-600" },
};

export default function DisputeResolution({
  buildingId: _buildingId,
  isOwner,
  t: _t,
}: { buildingId: string; isOwner: boolean; t: any }) {
  const [disputes, setDisputes] = useState<Dispute[]>(SAMPLE_DISPUTES);
  const [filterStatus, setFilterStatus] = useState("Tümü");
  const [filterCategory, setFilterCategory] = useState("Tümü");
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showNewForm, setShowNewForm] = useState(false);

  const [newDispute, setNewDispute] = useState({
    title: "",
    complainant: "",
    respondent: "",
    category: "Gürültü",
    description: "",
    priority: "orta" as const,
  });

  const filtered = disputes.filter((d) => {
    if (
      filterStatus !== "Tümü" &&
      STATUS_LABELS[d.status].label !== filterStatus
    )
      return false;
    if (filterCategory !== "Tümü" && d.category !== filterCategory)
      return false;
    return true;
  });

  const stats = {
    total: disputes.length,
    open: disputes.filter(
      (d) => d.status === "acik" || d.status === "inceleniyor",
    ).length,
    mediation: disputes.filter((d) => d.status === "arabuluculuk").length,
    resolved: disputes.filter((d) => d.status === "cozuldu").length,
  };

  const handleAddDispute = () => {
    if (
      !newDispute.title ||
      !newDispute.complainant ||
      !newDispute.respondent ||
      !newDispute.description
    )
      return;
    const d: Dispute = {
      id: `D${String(disputes.length + 1).padStart(3, "0")}`,
      ...newDispute,
      status: "acik",
      date: new Date().toISOString().split("T")[0],
      messages: [],
    };
    setDisputes([d, ...disputes]);
    setNewDispute({
      title: "",
      complainant: "",
      respondent: "",
      category: "Gürültü",
      description: "",
      priority: "orta",
    });
    setShowNewForm(false);
  };

  const handleStatusChange = (id: string, status: Dispute["status"]) => {
    setDisputes(disputes.map((d) => (d.id === id ? { ...d, status } : d)));
    if (selectedDispute?.id === id)
      setSelectedDispute((prev) => (prev ? { ...prev, status } : null));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedDispute) return;
    const msg = {
      author: isOwner ? "Yönetici" : "Ben",
      text: newMessage,
      date: new Date().toISOString().split("T")[0],
      isManager: isOwner,
    };
    const updated = disputes.map((d) =>
      d.id === selectedDispute.id
        ? { ...d, messages: [...d.messages, msg] }
        : d,
    );
    setDisputes(updated);
    setSelectedDispute((prev) =>
      prev ? { ...prev, messages: [...prev.messages, msg] } : null,
    );
    setNewMessage("");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Scale className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#0E1116]">
              Anlaşmazlık Çözüm Merkezi
            </h1>
            <p className="text-sm text-[#3A4654]">
              Sakinler arası resmi uzlaşma ve arabuluculuk süreci
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowNewForm(!showNewForm)}
          className="flex items-center gap-2 bg-[#0B1B2E] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1a3a5c] transition-colors"
        >
          <Plus className="w-4 h-4" /> Yeni Başvuru
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Toplam",
            value: stats.total,
            color: "bg-blue-50 border-blue-200",
            textColor: "text-blue-700",
          },
          {
            label: "Açık / İnceleniyor",
            value: stats.open,
            color: "bg-yellow-50 border-yellow-200",
            textColor: "text-yellow-700",
          },
          {
            label: "Arabuluculukta",
            value: stats.mediation,
            color: "bg-purple-50 border-purple-200",
            textColor: "text-purple-700",
          },
          {
            label: "Çözüldü",
            value: stats.resolved,
            color: "bg-green-50 border-green-200",
            textColor: "text-green-700",
          },
        ].map((s) => (
          <div key={s.label} className={`border rounded-xl p-4 ${s.color}`}>
            <div className={`text-3xl font-bold ${s.textColor}`}>{s.value}</div>
            <div className="text-sm text-[#3A4654] mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* New Dispute Form */}
      {showNewForm && (
        <div className="bg-white border border-[#D7DEE9] rounded-xl p-5 space-y-4">
          <h2 className="font-semibold text-[#0E1116]">
            Yeni Anlaşmazlık Başvurusu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-[#3A4654] block mb-1">
                Başlık
              </p>
              <input
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                value={newDispute.title}
                onChange={(e) =>
                  setNewDispute({ ...newDispute, title: e.target.value })
                }
                placeholder="Anlaşmazlık konusu"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-[#3A4654] block mb-1">
                Kategori
              </p>
              <select
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                value={newDispute.category}
                onChange={(e) =>
                  setNewDispute({ ...newDispute, category: e.target.value })
                }
              >
                {[
                  "Gürültü",
                  "Ortak Alan",
                  "Otopark",
                  "Hasar",
                  "Evcil Hayvan",
                  "Diğer",
                ].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-xs font-medium text-[#3A4654] block mb-1">
                Şikayetçi (Ad - Daire)
              </p>
              <input
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                value={newDispute.complainant}
                onChange={(e) =>
                  setNewDispute({ ...newDispute, complainant: e.target.value })
                }
                placeholder="Daire 5 - Adı Soyadı"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-[#3A4654] block mb-1">
                Şikayet Edilen (Ad - Daire)
              </p>
              <input
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                value={newDispute.respondent}
                onChange={(e) =>
                  setNewDispute({ ...newDispute, respondent: e.target.value })
                }
                placeholder="Daire 6 - Adı Soyadı"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-[#3A4654] block mb-1">
                Öncelik
              </p>
              <select
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                value={newDispute.priority}
                onChange={(e) =>
                  setNewDispute({
                    ...newDispute,
                    priority: e.target.value as any,
                  })
                }
              >
                <option value="dusuk">Düşük</option>
                <option value="orta">Orta</option>
                <option value="yuksek">Yüksek</option>
              </select>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-[#3A4654] block mb-1">
              Açıklama
            </p>
            <textarea
              className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm h-24 resize-none"
              value={newDispute.description}
              onChange={(e) =>
                setNewDispute({ ...newDispute, description: e.target.value })
              }
              placeholder="Anlaşmazlığı detaylı açıklayın..."
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleAddDispute}
              className="bg-[#0B1B2E] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1a3a5c] transition-colors"
            >
              Başvuruyu Gönder
            </button>
            <button
              type="button"
              onClick={() => setShowNewForm(false)}
              className="border border-[#D7DEE9] text-[#3A4654] px-4 py-2 rounded-lg text-sm hover:bg-[#F3F6FB] transition-colors"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Filters */}
          <div className="bg-white border border-[#D7DEE9] rounded-xl p-4 space-y-3">
            <div>
              <p className="text-xs font-medium text-[#3A4654] block mb-1">
                Durum
              </p>
              <div className="flex flex-wrap gap-1">
                {[
                  "Tümü",
                  "Açık",
                  "İnceleniyor",
                  "Arabuluculuk",
                  "Çözüldü",
                  "Reddedildi",
                ].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${filterStatus === s ? "bg-[#0B1B2E] text-white" : "bg-[#F3F6FB] text-[#3A4654] hover:bg-[#D7DEE9]"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-[#3A4654] block mb-1">
                Kategori
              </p>
              <select
                className="w-full border border-[#D7DEE9] rounded-lg px-2 py-1.5 text-xs"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Dispute Cards */}
          <div className="space-y-2">
            {filtered.length === 0 ? (
              <div className="bg-white border border-[#D7DEE9] rounded-xl p-6 text-center text-sm text-[#3A4654]">
                Sonuç bulunamadı
              </div>
            ) : (
              filtered.map((d) => {
                const st = STATUS_LABELS[d.status];
                const pr = PRIORITY_LABELS[d.priority];
                const StIcon = st.icon;
                return (
                  <div
                    key={d.id}
                    onClick={() => setSelectedDispute(d)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setSelectedDispute(d);
                    }}
                    className={`bg-white border rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow ${selectedDispute?.id === d.id ? "border-[#0B1B2E] shadow-md" : "border-[#D7DEE9]"}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#0E1116] text-sm truncate">
                          {d.title}
                        </p>
                        <p className="text-xs text-[#3A4654] mt-0.5">
                          {d.category} · {d.date}
                        </p>
                      </div>
                      <span
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${st.color}`}
                      >
                        <StIcon className="w-3 h-3" />
                        {st.label}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-[#3A4654]">
                      <span>{d.complainant.split(" - ")[0]}</span>
                      <span className={`font-medium ${pr.color}`}>
                        {pr.label} Öncelik
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-2">
          {!selectedDispute ? (
            <div className="bg-white border border-[#D7DEE9] rounded-xl p-12 flex flex-col items-center justify-center text-center">
              <Scale className="w-12 h-12 text-[#D7DEE9] mb-3" />
              <p className="text-[#3A4654] text-sm">
                Detayları görüntülemek için sol taraftan bir başvuru seçin
              </p>
            </div>
          ) : (
            <div className="bg-white border border-[#D7DEE9] rounded-xl overflow-hidden">
              {/* Detail Header */}
              <div className="p-5 border-b border-[#D7DEE9]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-[#3A4654] bg-[#F3F6FB] px-2 py-0.5 rounded">
                        {selectedDispute.id}
                      </span>
                      <span
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_LABELS[selectedDispute.status].color}`}
                      >
                        {STATUS_LABELS[selectedDispute.status].label}
                      </span>
                      <span
                        className={`text-xs font-medium ${PRIORITY_LABELS[selectedDispute.priority].color}`}
                      >
                        {PRIORITY_LABELS[selectedDispute.priority].label}{" "}
                        Öncelik
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-[#0E1116]">
                      {selectedDispute.title}
                    </h2>
                    <p className="text-xs text-[#3A4654] mt-1">
                      {selectedDispute.category} · {selectedDispute.date}
                    </p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="bg-[#F3F6FB] rounded-lg p-3">
                    <p className="text-xs text-[#3A4654] mb-1">Şikayetçi</p>
                    <p className="text-sm font-medium text-[#0E1116]">
                      {selectedDispute.complainant}
                    </p>
                  </div>
                  <div className="bg-[#F3F6FB] rounded-lg p-3">
                    <p className="text-xs text-[#3A4654] mb-1">
                      Şikayet Edilen
                    </p>
                    <p className="text-sm font-medium text-[#0E1116]">
                      {selectedDispute.respondent}
                    </p>
                  </div>
                </div>
                {selectedDispute.mediator && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-purple-700 bg-purple-50 px-3 py-2 rounded-lg">
                    <MessageSquare className="w-3 h-3" />
                    <span>
                      Arabulucu: <strong>{selectedDispute.mediator}</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="p-5 border-b border-[#D7DEE9]">
                <h3 className="text-sm font-semibold text-[#0E1116] mb-2">
                  Açıklama
                </h3>
                <p className="text-sm text-[#3A4654] leading-relaxed">
                  {selectedDispute.description}
                </p>
                {selectedDispute.resolution && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-xs font-semibold text-green-700 mb-1">
                      Karar / Çözüm
                    </p>
                    <p className="text-sm text-green-800">
                      {selectedDispute.resolution}
                    </p>
                  </div>
                )}
              </div>

              {/* Manager Status Actions */}
              {isOwner &&
                selectedDispute.status !== "cozuldu" &&
                selectedDispute.status !== "reddedildi" && (
                  <div className="p-4 border-b border-[#D7DEE9] bg-[#F3F6FB]">
                    <p className="text-xs font-medium text-[#3A4654] mb-2">
                      Durum Güncelle
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          "inceleniyor",
                          "arabuluculuk",
                          "cozuldu",
                          "reddedildi",
                        ] as const
                      ).map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() =>
                            handleStatusChange(selectedDispute.id, s)
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedDispute.status === s ? "bg-[#0B1B2E] text-white" : "bg-white border border-[#D7DEE9] text-[#3A4654] hover:bg-[#D7DEE9]"}`}
                        >
                          {STATUS_LABELS[s].label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              {/* Messages */}
              <div className="p-5">
                <h3 className="text-sm font-semibold text-[#0E1116] mb-3">
                  İletişim Kaydı ({selectedDispute.messages.length})
                </h3>
                <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
                  {selectedDispute.messages.length === 0 ? (
                    <p className="text-sm text-[#3A4654] text-center py-4">
                      Henüz mesaj yok
                    </p>
                  ) : (
                    selectedDispute.messages.map((m) => (
                      <div
                        key={m.date + m.author}
                        className={`p-3 rounded-lg text-sm ${m.isManager ? "bg-blue-50 border border-blue-100" : "bg-[#F3F6FB]"}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`font-medium text-xs ${m.isManager ? "text-blue-700" : "text-[#0E1116]"}`}
                          >
                            {m.author}
                          </span>
                          <span className="text-xs text-[#3A4654]">
                            {m.date}
                          </span>
                        </div>
                        <p className="text-[#3A4654]">{m.text}</p>
                      </div>
                    ))
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    className="flex-1 border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Mesaj yazın..."
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-[#0B1B2E] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1a3a5c] transition-colors disabled:opacity-50"
                  >
                    Gönder
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
