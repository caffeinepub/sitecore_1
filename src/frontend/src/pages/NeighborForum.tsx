import { Award, MessagesSquare, Pin, Plus, ThumbsUp, X } from "lucide-react";
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
import { Textarea } from "../components/ui/textarea";

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface Topic {
  id: string;
  title: string;
  category: string;
  tags: string[];
  content: string;
  author: string;
  createdAt: string;
  comments: Comment[];
  likeCount: number;
  likedBy: string[];
  isPinned: boolean;
  isClosed: boolean;
}

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const KEY = (id: string) => `sitecore_forum_${id}`;
const CATEGORIES = ["Tümü", "Genel", "Öneri", "Şikayet", "Etkinlik", "Duyuru"];
const CAT_COLORS: Record<string, string> = {
  Genel: "bg-blue-100 text-blue-700",
  Öneri: "bg-green-100 text-green-700",
  Şikayet: "bg-red-100 text-red-700",
  Etkinlik: "bg-purple-100 text-purple-700",
  Duyuru: "bg-yellow-100 text-yellow-700",
};

const ALL_TAGS = [
  "#duyuru",
  "#öneri",
  "#sorun",
  "#genel",
  "#etkinlik",
  "#önemli",
];

const DEFAULT_TOPICS: Topic[] = [
  {
    id: "f1",
    title: "Asansör bakımı ne zaman yapılacak?",
    category: "Şikayet",
    tags: ["#sorun"],
    content:
      "Asansör haftadır düzgün çalışmıyor, arıza sesi geliyor. Bakım tarihini öğrenmek istiyorum.",
    author: "Sakin A-3",
    createdAt: "2026-03-20T10:00:00Z",
    comments: [
      {
        id: "c1",
        author: "Yönetici",
        content: "Bu hafta içinde teknisyen gelecek, bilgilendireceğiz.",
        createdAt: "2026-03-20T14:00:00Z",
      },
    ],
    likeCount: 8,
    likedBy: [],
    isPinned: false,
    isClosed: false,
  },
  {
    id: "f2",
    title: "Bahçe partisi organizasyonu",
    category: "Etkinlik",
    tags: ["#etkinlik", "#genel"],
    content:
      "Nisan ayında komşularla birlikte küçük bir bahçe buluşması organize etmeyi düşünüyorum. Katılmak isteyen var mı?",
    author: "Sakin B-5",
    createdAt: "2026-03-18T15:30:00Z",
    comments: [],
    likeCount: 14,
    likedBy: [],
    isPinned: true,
    isClosed: false,
  },
  {
    id: "f3",
    title: "Otopark kurallarına uyaLım",
    category: "Duyuru",
    tags: ["#duyuru", "#önemli"],
    content:
      "Bazı araçların otopark çizgilerinin dışına park ettiği görülüyor. Lütfen kurallara uyaLım.",
    author: "Yönetici",
    createdAt: "2026-03-15T09:00:00Z",
    comments: [
      {
        id: "c2",
        author: "Sakin C-1",
        content: "Haklısınız, dikkat edeceğiz.",
        createdAt: "2026-03-15T11:00:00Z",
      },
    ],
    likeCount: 5,
    likedBy: [],
    isPinned: true,
    isClosed: true,
  },
  {
    id: "f4",
    title: "Ortak alan Wi-Fi şifresini güncelleyelim mi?",
    category: "Öneri",
    tags: ["#öneri"],
    content:
      "Lobideki Wi-Fi şifresi çok kişiye dağıldı, güvenlik için aylık güncelleme öneriyorum.",
    author: "Sakin D-7",
    createdAt: "2026-03-12T11:00:00Z",
    comments: [],
    likeCount: 11,
    likedBy: [],
    isPinned: false,
    isClosed: false,
  },
  {
    id: "f5",
    title: "Kapı ziline bakınız, çalışmıyor",
    category: "Şikayet",
    tags: ["#sorun"],
    content:
      "2. kat giriş kapısı zili 3 haftadır çalışmıyor. Birden fazla komsu mağdur.",
    author: "Sakin C-4",
    createdAt: "2026-03-10T08:00:00Z",
    comments: [],
    likeCount: 9,
    likedBy: [],
    isPinned: false,
    isClosed: false,
  },
];

export default function NeighborForum({
  buildingId,
  userId,
  isOwner,
  t: _t,
}: Props) {
  const [topics, setTopics] = useState<Topic[]>(() => {
    try {
      const raw = localStorage.getItem(KEY(buildingId));
      if (raw) return JSON.parse(raw);
    } catch {}
    return DEFAULT_TOPICS;
  });

  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [activeTag, setActiveTag] = useState("");
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newComment, setNewComment] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    title: "",
    category: "Genel",
    content: "",
    tags: [] as string[],
  });

  const save = (list: Topic[]) => {
    setTopics(list);
    localStorage.setItem(KEY(buildingId), JSON.stringify(list));
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.content.trim()) return;
    const t: Topic = {
      id: Date.now().toString(),
      title: form.title,
      category: form.category,
      tags: form.tags,
      content: form.content,
      author: `Kullanıcı ${userId.slice(0, 4)}`,
      createdAt: new Date().toISOString(),
      comments: [],
      likeCount: 0,
      likedBy: [],
      isPinned: false,
      isClosed: false,
    };
    save([t, ...topics]);
    setShowForm(false);
    setForm({ title: "", category: "Genel", content: "", tags: [] });
  };

  const handleLike = (id: string) => {
    save(
      topics.map((t) => {
        if (t.id !== id) return t;
        const liked = t.likedBy.includes(userId);
        return {
          ...t,
          likeCount: liked ? t.likeCount - 1 : t.likeCount + 1,
          likedBy: liked
            ? t.likedBy.filter((u) => u !== userId)
            : [...t.likedBy, userId],
        };
      }),
    );
  };

  const handleAddComment = (topicId: string) => {
    const text = newComment[topicId];
    if (!text?.trim()) return;
    const c: Comment = {
      id: Date.now().toString(),
      author: `Kullanıcı ${userId.slice(0, 4)}`,
      content: text.trim(),
      createdAt: new Date().toISOString(),
    };
    save(
      topics.map((t) =>
        t.id === topicId ? { ...t, comments: [...t.comments, c] } : t,
      ),
    );
    setNewComment((prev) => ({ ...prev, [topicId]: "" }));
  };

  const handlePin = (id: string) =>
    save(
      topics.map((t) => (t.id === id ? { ...t, isPinned: !t.isPinned } : t)),
    );
  const handleClose = (id: string) =>
    save(
      topics.map((t) => (t.id === id ? { ...t, isClosed: !t.isClosed } : t)),
    );
  const handleDelete = (id: string) => save(topics.filter((t) => t.id !== id));

  const filtered = topics
    .filter((t) => activeCategory === "Tümü" || t.category === activeCategory)
    .filter((t) => !activeTag || t.tags.includes(activeTag))
    .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  // Most active residents (by comments + likes + topics)
  const residentActivity: Record<string, number> = {};
  for (const topic of topics) {
    residentActivity[topic.author] = (residentActivity[topic.author] || 0) + 1;
    for (const c of topic.comments) {
      residentActivity[c.author] = (residentActivity[c.author] || 0) + 1;
    }
  }
  const topResidents = Object.entries(residentActivity)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessagesSquare className="w-6 h-6 text-[#0B1B2E]" />
          <h2 className="text-xl font-bold text-[#0E1116]">Komşu Forumu</h2>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2"
          data-ocid="forum.open_modal_button"
        >
          <Plus className="w-4 h-4" /> Konu Aç
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 space-y-4">
          {/* Category filter */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-[#0B1B2E] text-white"
                    : "bg-white border border-[#E5EAF2] text-[#3A4654] hover:border-[#0B1B2E]"
                }`}
                data-ocid="forum.tab"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tag filter */}
          <div className="flex gap-1.5 flex-wrap">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(activeTag === tag ? "" : tag)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeTag === tag
                    ? "bg-[#4A90D9] text-white"
                    : "bg-[#F3F6FB] text-[#6B7A8D] hover:bg-[#E5EAF2]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((topic) => (
              <div
                key={topic.id}
                className={`bg-white rounded-2xl shadow-sm border transition-all ${
                  topic.isPinned ? "border-[#4A90D9]" : "border-[#E5EAF2]"
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        {topic.isPinned && (
                          <Pin className="w-3.5 h-3.5 text-[#4A90D9]" />
                        )}
                        <span className="font-bold text-[#0E1116]">
                          {topic.title}
                        </span>
                        <Badge
                          className={`text-xs border-0 ${CAT_COLORS[topic.category] || "bg-gray-100 text-gray-600"}`}
                        >
                          {topic.category}
                        </Badge>
                        {topic.isClosed && (
                          <Badge className="bg-gray-100 text-gray-500 text-xs border-0">
                            Kapalı
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-1 flex-wrap mb-1">
                        {topic.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-[#4A90D9] font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-[#3A4654] line-clamp-2">
                        {topic.content}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-[#6B7A8D]">
                        <span>{topic.author}</span>
                        <span>
                          {new Date(topic.createdAt).toLocaleDateString(
                            "tr-TR",
                          )}
                        </span>
                        <span>💬 {topic.comments.length} yorum</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleLike(topic.id)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                          topic.likedBy.includes(userId)
                            ? "bg-blue-100 text-blue-700"
                            : "bg-[#F3F6FB] text-[#6B7A8D] hover:bg-blue-50"
                        }`}
                        data-ocid="forum.toggle"
                      >
                        <ThumbsUp className="w-3 h-3" /> {topic.likeCount}
                      </button>
                      {isOwner && (
                        <>
                          <button
                            type="button"
                            onClick={() => handlePin(topic.id)}
                            className="p-1 rounded text-[#6B7A8D] hover:text-[#4A90D9]"
                            title="Sabitle"
                          >
                            <Pin className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleClose(topic.id)}
                            className="p-1 rounded text-[#6B7A8D] hover:text-orange-500"
                            title="Kapat/Aç"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(topic.id)}
                            className="p-1 rounded text-[#6B7A8D] hover:text-red-500"
                            title="Sil"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setExpandedTopic(
                      expandedTopic === topic.id ? null : topic.id,
                    )
                  }
                  className="w-full px-5 py-2 text-xs text-[#4A90D9] text-left hover:bg-[#F8FAFC] transition-colors border-t border-[#F3F6FB]"
                >
                  {expandedTopic === topic.id
                    ? "▲ Yorumları Gizle"
                    : `▼ ${topic.comments.length} Yorum Göster`}
                </button>

                {expandedTopic === topic.id && (
                  <div className="px-5 pb-4 space-y-3">
                    {topic.comments.map((c) => (
                      <div key={c.id} className="flex gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#E5EAF2] flex items-center justify-center text-xs font-bold text-[#0B1B2E] flex-shrink-0">
                          {c.author[0]}
                        </div>
                        <div className="bg-[#F3F6FB] rounded-xl p-3 flex-1">
                          <p className="text-xs font-semibold text-[#0B1B2E]">
                            {c.author}
                          </p>
                          <p className="text-sm text-[#3A4654]">{c.content}</p>
                        </div>
                      </div>
                    ))}
                    {!topic.isClosed && (
                      <div className="flex gap-2">
                        <Input
                          value={newComment[topic.id] || ""}
                          onChange={(e) =>
                            setNewComment((p) => ({
                              ...p,
                              [topic.id]: e.target.value,
                            }))
                          }
                          placeholder="Yorum yaz..."
                          className="text-sm"
                          data-ocid="forum.input"
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleAddComment(topic.id)
                          }
                        />
                        <Button
                          size="sm"
                          className="bg-[#4A90D9] text-white"
                          onClick={() => handleAddComment(topic.id)}
                        >
                          Gönder
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {filtered.length === 0 && (
              <p
                className="text-center text-[#3A4654] py-10"
                data-ocid="forum.empty_state"
              >
                Bu kategoride konu yok.
              </p>
            )}
          </div>
        </div>

        {/* Sidebar: Most active */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#E5EAF2] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-[#F2A23A]" />
              <h3 className="font-semibold text-sm text-[#0E1116]">
                En Aktif Sakinler
              </h3>
            </div>
            <div className="space-y-2">
              {topResidents.map(([name, count], i) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        [
                          "bg-yellow-400",
                          "bg-gray-400",
                          "bg-orange-400",
                          "bg-[#4A90D9]",
                          "bg-purple-400",
                        ][i]
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-xs text-[#0E1116] font-medium truncate max-w-[100px]">
                      {name}
                    </span>
                  </div>
                  <span className="text-xs text-[#6B7A8D]">{count} katkı</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E5EAF2] p-4">
            <h3 className="font-semibold text-sm text-[#0E1116] mb-3">
              Forum İstatistikleri
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#6B7A8D]">Toplam Konu</span>
                <span className="font-semibold text-[#0E1116]">
                  {topics.length}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#6B7A8D]">Sabitlenmiş</span>
                <span className="font-semibold text-[#0E1116]">
                  {topics.filter((t) => t.isPinned).length}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#6B7A8D]">Açık Konular</span>
                <span className="font-semibold text-green-600">
                  {topics.filter((t) => !t.isClosed).length}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#6B7A8D]">Toplam Yorum</span>
                <span className="font-semibold text-[#0E1116]">
                  {topics.reduce((s, t) => s + t.comments.length, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Topic Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md" data-ocid="forum.dialog">
          <DialogHeader>
            <DialogTitle>Yeni Konu Aç</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Kategori
              </p>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                data-ocid="forum.select"
              >
                {CATEGORIES.slice(1).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Etiketler
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {ALL_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        tags: f.tags.includes(tag)
                          ? f.tags.filter((t) => t !== tag)
                          : [...f.tags, tag],
                      }))
                    }
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                      form.tags.includes(tag)
                        ? "bg-[#4A90D9] text-white"
                        : "bg-[#F3F6FB] text-[#6B7A8D] hover:bg-[#E5EAF2]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Başlık
              </p>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Konu başlığı"
                data-ocid="forum.input"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                İçerik
              </p>
              <Textarea
                value={form.content}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                rows={4}
                placeholder="Konuyu detaylı anlatın..."
                data-ocid="forum.textarea"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
                data-ocid="forum.cancel_button"
              >
                İptal
              </Button>
              <Button
                className="bg-[#4A90D9] text-white"
                onClick={handleSubmit}
                data-ocid="forum.confirm_button"
              >
                Gönder
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
