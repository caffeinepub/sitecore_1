import { MessagesSquare, Pin, Plus, ThumbsUp, X } from "lucide-react";
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
    return [
      {
        id: "f1",
        title: "Asansör bakımı ne zaman yapılacak?",
        category: "Şikayet",
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
        title: "Otopark kurallarına uyalım",
        category: "Duyuru",
        content:
          "Bazı araçların otopark çizgilerinin dışına park ettiği görülüyor. Lütfen kurallara uyalım.",
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
    ];
  });

  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newComment, setNewComment] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    title: "",
    category: "Genel",
    content: "",
  });

  const save = (list: Topic[]) => {
    setTopics(list);
    localStorage.setItem(KEY(buildingId), JSON.stringify(list));
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.content.trim()) return;
    const t: Topic = {
      id: Date.now().toString(),
      ...form,
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
    setForm({ title: "", category: "Genel", content: "" });
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
    .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

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
        >
          <Plus className="w-4 h-4" /> Konu Aç
        </Button>
      </div>

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
          >
            {cat}
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
                  <p className="text-sm text-[#3A4654] line-clamp-2">
                    {topic.content}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-[#6B7A8D]">
                    <span>{topic.author}</span>
                    <span>
                      {new Date(topic.createdAt).toLocaleDateString("tr-TR")}
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
              <button
                type="button"
                onClick={() =>
                  setExpandedTopic(expandedTopic === topic.id ? null : topic.id)
                }
                className="mt-3 text-xs text-[#4A90D9] hover:underline"
              >
                {expandedTopic === topic.id
                  ? "Yorumları Gizle"
                  : `Yorumları Gör (${topic.comments.length})`}
              </button>
            </div>

            {expandedTopic === topic.id && (
              <div className="border-t border-[#E5EAF2] px-5 py-4 space-y-3">
                {topic.comments.length === 0 && (
                  <p className="text-sm text-[#6B7A8D]">Henüz yorum yok.</p>
                )}
                {topic.comments.map((c) => (
                  <div key={c.id} className="bg-[#F3F6FB] rounded-xl p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[#0E1116]">
                        {c.author}
                      </span>
                      <span className="text-xs text-[#6B7A8D]">
                        {new Date(c.createdAt).toLocaleDateString("tr-TR")}
                      </span>
                    </div>
                    <p className="text-sm text-[#3A4654]">{c.content}</p>
                  </div>
                ))}
                {!topic.isClosed && (
                  <div className="flex gap-2">
                    <Input
                      value={newComment[topic.id] || ""}
                      onChange={(e) =>
                        setNewComment((prev) => ({
                          ...prev,
                          [topic.id]: e.target.value,
                        }))
                      }
                      placeholder="Yorumunuzu yazın..."
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddComment(topic.id);
                      }}
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
                {isOwner && (
                  <button
                    type="button"
                    onClick={() => handleClose(topic.id)}
                    className="text-xs text-[#6B7A8D] hover:text-[#0E1116]"
                  >
                    {topic.isClosed ? "Konuyu Yeniden Aç" : "Konuyu Kapat"}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-[#3A4654] text-center py-10">
            Bu kategoride konu bulunamadı.
          </p>
        )}
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Yeni Konu Aç</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-1">Başlık</p>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Konunun başlığını yazın"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Kategori</p>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
              >
                {CATEGORIES.slice(1).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">İçerik</p>
              <Textarea
                value={form.content}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                rows={4}
                placeholder="Konunuzu detaylı açıklayın..."
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!form.title.trim() || !form.content.trim()}
              className="w-full bg-[#4A90D9] text-white rounded-full"
            >
              Konuyu Yayınla
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
