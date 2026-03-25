import {
  Archive,
  BookOpen,
  Calendar,
  Clock,
  Download,
  Edit2,
  Megaphone,
  Newspaper,
  Pin,
  Plus,
  Tag,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: "Duyuru" | "Etkinlik" | "Bakım" | "Gündem" | "Komşu";
  date: string;
  readTime: number;
  pinned: boolean;
  author: string;
}

interface BulletinArchive {
  id: string;
  title: string;
  period: string;
  date: string;
}

interface Props {
  buildingId: string;
  isOwner: boolean;
  t: any;
}

const SAMPLE_NEWS: NewsItem[] = [
  {
    id: "n1",
    title: "Asansör Modernizasyonu Başladı!",
    summary:
      "No. 1 asansörümüz 3 Mart itibarıyla yenileme çalışmaları kapsamında hizmet dışı olacaktır. Çalışmaların 6 hafta sürmesi öngörülmektedir.",
    content:
      "Değerli sakinlerimiz, apartmanımızın yaşam kalitesini artırmak amacıyla başlatılan asansör modernizasyon projesi kapsamında No. 1 asansör 3 Mart – 14 Nisan tarihleri arasında hizmet dışı kalacaktır. Bu süreçte lütfen No. 2 asansörü kullanınız.",
    category: "Bakım",
    date: "2026-03-01",
    readTime: 2,
    pinned: true,
    author: "Yönetim",
  },
  {
    id: "n2",
    title: "Bahar Barbeku Etkinliği – 15 Nisan",
    summary:
      "Her yıl geleneksel hale gelen bahar barbekümüz bu yıl da düzenleniyor. Tüm sakinler davetlidir!",
    content:
      "Sakin komitemizin organizasyonuyla gerçekleşecek Bahar Barbeku Etkinliği, 15 Nisan Salı günü saat 18:00'de bina bahçesinde yapılacaktır.",
    category: "Etkinlik",
    date: "2026-03-10",
    readTime: 1,
    pinned: false,
    author: "Sakin Komitesi",
  },
  {
    id: "n3",
    title: "Mart Ayı Olağan Genel Kurul Kararları",
    summary:
      "20 Mart tarihinde yapılan genel kurulda alınan kararların özeti aşağıda paylaşılmaktadır.",
    content:
      "Toplantıda; 2026 bütçe revizyonu, asansör yenileme projesi, otopark kapasite artışı ve bina güvenlik sistemi yenilenmesi konularında kararlar alınmıştır.",
    category: "Gündem",
    date: "2026-03-21",
    readTime: 3,
    pinned: false,
    author: "Yönetim",
  },
  {
    id: "n4",
    title: "Su Sayaçları Güncelleniyor",
    summary:
      "Nisan ayı içinde tüm dairelerin su sayaçları akıllı sayaç sistemiyle değiştirilecek.",
    content:
      "Belediye ile yapılan anlaşma kapsamında dairenizdeki eski su sayacı, uzaktan okuma özellikli akıllı sayaçlarla değiştirilecektir.",
    category: "Duyuru",
    date: "2026-03-15",
    readTime: 2,
    pinned: false,
    author: "Yönetim",
  },
  {
    id: "n5",
    title: "Komşu Tavsiyesi: Zeynep Hanım'ın Ev Yapımı Reçelleri",
    summary:
      "Daire 303'ten Zeynep Hanım, özel yapımı çilek ve kayısı reçellerini komşularla paylaşmak istiyor.",
    content:
      "Zeynep Hanım ile 303 numaralı dairenin kapısından ya da komşu forumu üzerinden iletişime geçebilirsiniz. Fiyatlar cüzi tutulmuştur.",
    category: "Komşu",
    date: "2026-03-18",
    readTime: 1,
    pinned: false,
    author: "Daire 303",
  },
  {
    id: "n6",
    title: "Güneş Paneli Fizibilite Anketi Sonuçları",
    summary:
      "Geçen ay düzenlenen güneş paneli fizibilite anketine katılanların %78'i projeyi destekledi.",
    content:
      "45 katılımcının %78'i güneş paneli kurulumunu desteklerken, %15'i daha fazla bilgi talep etti. Yönetim kurulu bu doğrultuda ihale sürecini başlatma kararı aldı.",
    category: "Gündem",
    date: "2026-03-05",
    readTime: 2,
    pinned: false,
    author: "Yönetim",
  },
];

const SAMPLE_ARCHIVES: BulletinArchive[] = [
  {
    id: "a1",
    title: "Şubat 2026 Bülteni",
    period: "Şubat 2026",
    date: "2026-02-28",
  },
  {
    id: "a2",
    title: "Ocak 2026 Bülteni",
    period: "Ocak 2026",
    date: "2026-01-31",
  },
  {
    id: "a3",
    title: "Aralık 2025 Bülteni",
    period: "Aralık 2025",
    date: "2025-12-31",
  },
];

const CATEGORIES = [
  "Tümü",
  "Duyuru",
  "Etkinlik",
  "Bakım",
  "Gündem",
  "Komşu",
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  Duyuru: "bg-blue-100 text-blue-700",
  Etkinlik: "bg-purple-100 text-purple-700",
  Bakım: "bg-orange-100 text-orange-700",
  Gündem: "bg-gray-100 text-gray-700",
  Komşu: "bg-green-100 text-green-700",
};

const EMPTY_FORM = {
  title: "",
  summary: "",
  content: "",
  category: "Duyuru" as NewsItem["category"],
  readTime: 2,
};

export default function DigitalBulletin({ buildingId, isOwner }: Props) {
  const storageKey = `sitecore_bulletin_${buildingId}`;
  const archiveKey = `sitecore_bulletin_archive_${buildingId}`;
  const [news, setNews] = useState<NewsItem[]>(() => {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : SAMPLE_NEWS;
  });
  const [archives, _setArchives] = useState<BulletinArchive[]>(() => {
    const raw = localStorage.getItem(archiveKey);
    return raw ? JSON.parse(raw) : SAMPLE_ARCHIVES;
  });
  const [filterCat, setFilterCat] = useState<string>("Tümü");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [detailItem, setDetailItem] = useState<NewsItem | null>(null);

  const saveNews = (updated: NewsItem[]) => {
    setNews(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const handleCreate = () => {
    if (!form.title.trim()) return;
    const newItem: NewsItem = {
      ...form,
      id: crypto.randomUUID(),
      date: new Date().toISOString().split("T")[0],
      pinned: false,
      author: "Yönetim",
    };
    saveNews([newItem, ...news]);
    setShowCreateModal(false);
    setForm(EMPTY_FORM);
  };

  const pinnedItem = news.find((n) => n.pinned);
  const filteredNews = news.filter((n) => {
    if (n.pinned) return false;
    if (filterCat !== "Tümü" && n.category !== filterCat) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0E1116] flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-[#4A90D9]" />
            Bina Bülteni
          </h2>
          <p className="text-sm text-[#6B7A8D] mt-0.5">
            Mart 2026 Sayısı • {news.length} haber
          </p>
        </div>
        {isOwner && (
          <Button
            data-ocid="bulletin.primary_button"
            onClick={() => {
              setForm(EMPTY_FORM);
              setShowCreateModal(true);
            }}
            className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2"
          >
            <Plus className="w-4 h-4" /> Yeni Bülten
          </Button>
        )}
      </div>

      <Tabs defaultValue="feed">
        <TabsList className="bg-[#F3F6FB] mb-4">
          <TabsTrigger value="feed" data-ocid="bulletin.tab">
            Haber Akışı
          </TabsTrigger>
          <TabsTrigger value="archive" data-ocid="bulletin.tab">
            Arşiv
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed">
          {/* Pinned Featured News */}
          {pinnedItem && (
            <button
              type="button"
              className="w-full text-left bg-gradient-to-br from-[#0B1B2E] to-[#1A3A5C] rounded-2xl p-6 text-white mb-5 cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => setDetailItem(pinnedItem)}
            >
              <div className="flex items-center gap-2 mb-3">
                <Pin className="w-4 h-4 text-amber-400" />
                <Badge className="bg-amber-400/20 text-amber-300 border-amber-400/30 text-xs">
                  Öne Çıkan
                </Badge>
                <Badge
                  className={`${CATEGORY_COLORS[pinnedItem.category]} text-xs`}
                >
                  {pinnedItem.category}
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">{pinnedItem.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {pinnedItem.summary}
              </p>
              <div className="flex items-center gap-4 mt-4 text-white/60 text-xs">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {pinnedItem.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {pinnedItem.readTime} dk okuma
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> {pinnedItem.author}
                </span>
              </div>
            </button>
          )}

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={filterCat === cat ? "default" : "outline"}
                onClick={() => setFilterCat(cat)}
                className={
                  filterCat === cat
                    ? "bg-[#4A90D9] text-white rounded-full"
                    : "rounded-full"
                }
                data-ocid="bulletin.tab"
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* News Feed */}
          <div className="grid gap-3">
            {filteredNews.length === 0 ? (
              <div
                data-ocid="bulletin.empty_state"
                className="bg-white rounded-2xl border border-[#E5EAF2] p-12 text-center text-[#6B7A8D]"
              >
                Bu kategoride haber bulunamadı.
              </div>
            ) : (
              filteredNews.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  data-ocid={`bulletin.item.${idx + 1}`}
                  className="w-full text-left bg-white rounded-2xl border border-[#E5EAF2] shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setDetailItem(item)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge
                          className={`${CATEGORY_COLORS[item.category] || ""} border-0 text-xs`}
                        >
                          <Tag className="w-2.5 h-2.5 mr-1" />
                          {item.category}
                        </Badge>
                        <span className="text-xs text-[#6B7A8D]">
                          {item.date}
                        </span>
                        <span className="text-xs text-[#9CA8B4]">
                          • {item.readTime} dk
                        </span>
                      </div>
                      <h4 className="font-semibold text-[#0E1116] text-sm">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#6B7A8D] mt-1 line-clamp-2">
                        {item.summary}
                      </p>
                    </div>
                    {isOwner && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-[#4A90D9]"
                        onClick={(e) => {
                          e.stopPropagation();
                          setForm({
                            title: item.title,
                            summary: item.summary,
                            content: item.content,
                            category: item.category,
                            readTime: item.readTime,
                          });
                          setShowCreateModal(true);
                        }}
                        data-ocid={`bulletin.edit_button.${idx + 1}`}
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="archive">
          <div className="bg-white rounded-2xl border border-[#E5EAF2] overflow-hidden">
            <div className="bg-[#F3F6FB] px-4 py-3 border-b border-[#E5EAF2]">
              <h3 className="font-semibold text-[#0E1116] flex items-center gap-2">
                <Archive className="w-4 h-4" /> Bülten Arşivi
              </h3>
            </div>
            {archives.map((arch, idx) => (
              <div
                key={arch.id}
                data-ocid={`bulletin.item.${idx + 1}`}
                className="flex items-center justify-between px-4 py-3 border-b border-[#F0F3F8] last:border-0 hover:bg-[#F9FAFB]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#EEF3FA] rounded-lg">
                    <Megaphone className="w-4 h-4 text-[#4A90D9]" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-[#0E1116]">
                      {arch.title}
                    </p>
                    <p className="text-xs text-[#6B7A8D]">
                      {arch.period} • {arch.date}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs gap-1"
                  data-ocid={`bulletin.secondary_button.${idx + 1}`}
                >
                  <Download className="w-3 h-3" /> İndir
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Detail Modal */}
      {detailItem && (
        <Dialog open={!!detailItem} onOpenChange={() => setDetailItem(null)}>
          <DialogContent className="max-w-lg" data-ocid="bulletin.dialog">
            <DialogHeader>
              <DialogTitle>{detailItem.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  className={`${CATEGORY_COLORS[detailItem.category] || ""} border-0 text-xs`}
                >
                  {detailItem.category}
                </Badge>
                <span className="text-xs text-[#6B7A8D] flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {detailItem.date}
                </span>
                <span className="text-xs text-[#6B7A8D] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {detailItem.readTime} dk okuma
                </span>
                <span className="text-xs text-[#6B7A8D] flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> {detailItem.author}
                </span>
              </div>
              <p className="text-sm text-[#3A4654] leading-relaxed">
                {detailItem.content}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Yeni Haber / Bülten Oluştur</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Başlık *
              </p>
              <Input
                data-ocid="bulletin.input"
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Haber başlığı"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Kategori
              </p>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    category: e.target.value as NewsItem["category"],
                  }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                data-ocid="bulletin.select"
              >
                {["Duyuru", "Etkinlik", "Bakım", "Gündem", "Komşu"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">Özet</p>
              <Textarea
                value={form.summary}
                onChange={(e) =>
                  setForm((p) => ({ ...p, summary: e.target.value }))
                }
                rows={2}
                placeholder="Kısa özet (liste görünümünde gösterilir)"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">İçerik</p>
              <Textarea
                value={form.content}
                onChange={(e) =>
                  setForm((p) => ({ ...p, content: e.target.value }))
                }
                rows={4}
                placeholder="Haber detayı..."
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Okuma Süresi (dk)
              </p>
              <Input
                type="number"
                min={1}
                max={30}
                value={form.readTime}
                onChange={(e) =>
                  setForm((p) => ({ ...p, readTime: Number(e.target.value) }))
                }
              />
            </div>
            <Button
              data-ocid="bulletin.submit_button"
              onClick={handleCreate}
              disabled={!form.title.trim()}
              className="w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
            >
              Yayınla
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
