import {
  HelpCircle,
  Plus,
  Search,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  updatedAt: string;
  helpful: number;
  notHelpful: number;
  ratedBy: string[];
}

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const KEY = (id: string) => `sitecore_helpcenter_${id}`;
const CATEGORIES = ["Tümü", "Genel", "Aidat", "Teknik", "Güvenlik"];

const DEFAULT_FAQS: FAQ[] = [
  {
    id: "faq1",
    question: "Bina yönetimiyle nasıl iletişime geçebilirim?",
    answer:
      "Yönetici ile SiteCore platformu üzerinden Bildirim/Mesaj Merkezi aracılığıyla iletişime geçebilirsiniz. Acil durumlar için Acil İletişim Rehberi modülündeki numaraları kullanabilirsiniz.",
    category: "Genel",
    updatedAt: "2026-03-01",
    helpful: 12,
    notHelpful: 1,
    ratedBy: [],
  },
  {
    id: "faq2",
    question: "Misafirimi binaya nasıl davet edebilirim?",
    answer:
      "Ziyaretçi Ön İzni modülü üzerinden misafiriniz için ön izin oluşturup 6 haneli erişim kodu alabilirsiniz. Güvenlik görevlisi bu kodu doğrulayarak giriş izni verecektir.",
    category: "Genel",
    updatedAt: "2026-03-10",
    helpful: 18,
    notHelpful: 0,
    ratedBy: [],
  },
  {
    id: "faq3",
    question: "Dairemin bilgilerini nasıl güncelleyebilirim?",
    answer:
      "Profil Ayarları sayfasından kişisel bilgilerinizi, Daire Yönetimi sayfasından ise daire detaylarınızı güncelleyebilirsiniz. Daire sahipliği değişiklikleri için yöneticiye başvurunuz.",
    category: "Genel",
    updatedAt: "2026-02-15",
    helpful: 7,
    notHelpful: 2,
    ratedBy: [],
  },
  {
    id: "faq4",
    question: "Aidat ödememi nasıl yapabilirim?",
    answer:
      "Aidat ödemeleri bina yönetimi tarafından belirlenen banka hesabına EFT/havale yöntemiyle yapılabilir. IBAN bilgisi için yöneticinize danışın. Ödeme sonrası dekont yüklemek için Aidat Takibi modülünü kullanabilirsiniz.",
    category: "Aidat",
    updatedAt: "2026-03-15",
    helpful: 22,
    notHelpful: 1,
    ratedBy: [],
  },
  {
    id: "faq5",
    question: "Aidatimin gecikip gecikmediğini nasıl öğrenebilirim?",
    answer:
      "Aidat Takibi modülünde daireye ait ödemelerin durumunu görüntüleyebilirsiniz. Geciken ödemeler kırmızı olarak işaretlenir ve size bildirim gönderilir.",
    category: "Aidat",
    updatedAt: "2026-02-20",
    helpful: 15,
    notHelpful: 0,
    ratedBy: [],
  },
  {
    id: "faq6",
    question: "Aidat taksitlendirme talep edebilir miyim?",
    answer:
      "Evet, yöneticiye Taksit Planları modülü üzerinden başvurabilirsiniz. Yönetici uygun gördüğü takdirde 2-12 ay arası taksitlendirme planı oluşturabilir.",
    category: "Aidat",
    updatedAt: "2026-03-05",
    helpful: 9,
    notHelpful: 0,
    ratedBy: [],
  },
  {
    id: "faq7",
    question: "Arıza bildirimi nasıl yapabilirim?",
    answer:
      "Arıza Bildirimi & Bakım Talebi modülünden yeni talep oluşturabilirsiniz. Arıza türünü, açıklamasını ve varsa fotoğrafını ekleyerek gönderin. Talebiniz yönetici tarafından incelenip teknisyene atanacaktır.",
    category: "Teknik",
    updatedAt: "2026-03-18",
    helpful: 19,
    notHelpful: 2,
    ratedBy: [],
  },
  {
    id: "faq8",
    question: "Su/elektrik sayacımı nasıl bildiririm?",
    answer:
      "Sayaç Takibi modülüne giderek ilgili sayacı seçip endeks değerinizi girebilirsiniz. Toplu giriş özelliğiyle birden fazla sayacı aynı anda güncelleyebilirsiniz.",
    category: "Teknik",
    updatedAt: "2026-02-10",
    helpful: 11,
    notHelpful: 1,
    ratedBy: [],
  },
  {
    id: "faq9",
    question: "Gece güvenlik numarası nedir?",
    answer:
      "Acil İletişim Rehberi modülünde güvenlik personelinin iletişim bilgilerini bulabilirsiniz. 7/24 hizmet veren güvenlik görevlisi sabitlenmiş olarak listelenmektedir.",
    category: "Güvenlik",
    updatedAt: "2026-01-25",
    helpful: 16,
    notHelpful: 0,
    ratedBy: [],
  },
  {
    id: "faq10",
    question: "Misafir giriş loglarına nasıl ulaşabilirim?",
    answer:
      "Ziyaretçi Yönetimi modülünde tüm ziyaretçi giriş/çıkış kayıtlarını görebilirsiniz. Yöneticiler ek olarak günlük raporları da indirebilir.",
    category: "Güvenlik",
    updatedAt: "2026-02-05",
    helpful: 8,
    notHelpful: 1,
    ratedBy: [],
  },
  {
    id: "faq11",
    question: "Ortak alanları nasıl rezerve edebilirim?",
    answer:
      "Ortak Alan Rezervasyonu modülünden uygun tarih ve saati seçerek rezervasyon oluşturabilirsiniz. Kapasite doluysa bekleme listesine eklenebilirsiniz.",
    category: "Genel",
    updatedAt: "2026-03-12",
    helpful: 13,
    notHelpful: 0,
    ratedBy: [],
  },
  {
    id: "faq12",
    question: "Bina WiFi şifresini nereden öğrenebilirim?",
    answer:
      "Bina kurallarında belirtilen ortak alan Wi-Fi şifresi yönetici tarafından düzenli olarak güncellenmektedir. Güncel şifre için yöneticinize başvurun.",
    category: "Teknik",
    updatedAt: "2026-03-20",
    helpful: 10,
    notHelpful: 3,
    ratedBy: [],
  },
];

export default function HelpCenter({ buildingId, userId, isOwner }: Props) {
  const [faqs, setFaqs] = useState<FAQ[]>(() => {
    try {
      const raw = localStorage.getItem(KEY(buildingId));
      if (raw) return JSON.parse(raw);
    } catch {}
    return DEFAULT_FAQS;
  });

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "Genel",
  });

  const save = (list: FAQ[]) => {
    setFaqs(list);
    localStorage.setItem(KEY(buildingId), JSON.stringify(list));
  };

  const handleAdd = () => {
    if (!form.question.trim() || !form.answer.trim()) return;
    save([
      ...faqs,
      {
        id: Date.now().toString(),
        ...form,
        updatedAt: new Date().toISOString().slice(0, 10),
        helpful: 0,
        notHelpful: 0,
        ratedBy: [],
      },
    ]);
    setShowForm(false);
    setForm({ question: "", answer: "", category: "Genel" });
  };

  const handleRate = (faqId: string, isHelpful: boolean) => {
    if (faqs.find((f) => f.id === faqId)?.ratedBy.includes(userId)) return;
    save(
      faqs.map((f) =>
        f.id !== faqId
          ? f
          : {
              ...f,
              helpful: isHelpful ? f.helpful + 1 : f.helpful,
              notHelpful: !isHelpful ? f.notHelpful + 1 : f.notHelpful,
              ratedBy: [...f.ratedBy, userId],
            },
      ),
    );
  };

  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === "Tümü" || f.category === activeCategory;
    const matchSearch =
      !search ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const suggested = expanded
    ? faqs
        .filter(
          (f) =>
            f.id !== expanded &&
            f.category === faqs.find((x) => x.id === expanded)?.category,
        )
        .slice(0, 3)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-[#0B1B2E]" />
          <h2 className="text-xl font-bold text-[#0E1116]">
            SSS & Yardım Merkezi
          </h2>
        </div>
        {isOwner && (
          <Button
            onClick={() => setShowForm(true)}
            className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2"
            data-ocid="helpcenter.open_modal_button"
          >
            <Plus className="w-4 h-4" /> Soru Ekle
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A8D]" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Soru ara..."
          className="pl-9"
          data-ocid="helpcenter.search_input"
        />
      </div>

      {/* Category tabs */}
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
            data-ocid="helpcenter.tab"
          >
            {cat}
            {cat !== "Tümü" &&
              ` (${faqs.filter((f) => f.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-2">
        {filtered.map((faq) => {
          const isRated = faq.ratedBy.includes(userId);
          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl shadow-sm border border-[#E5EAF2] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F8FAFC] transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#EEF3FA] text-[#4A90D9] font-medium flex-shrink-0">
                    {faq.category}
                  </span>
                  <span className="font-medium text-[#0E1116]">
                    {faq.question}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {isOwner && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        save(faqs.filter((f) => f.id !== faq.id));
                      }}
                      className="p-1 rounded text-[#6B7A8D] hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <span
                    className={`text-[#6B7A8D] transition-transform ${expanded === faq.id ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </div>
              </button>
              {expanded === faq.id && (
                <div className="px-4 pb-4 pt-0 border-t border-[#F3F6FB]">
                  <p className="text-sm text-[#3A4654] leading-relaxed pt-3">
                    {faq.answer}
                  </p>
                  {/* Last update + rating */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F3F6FB]">
                    <span className="text-xs text-[#6B7A8D]">
                      Son güncelleme: {faq.updatedAt}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#6B7A8D]">
                        Faydalı mı?
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRate(faq.id, true)}
                        disabled={isRated}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                          isRated
                            ? "bg-green-50 text-green-600 cursor-default"
                            : "bg-[#F3F6FB] text-[#6B7A8D] hover:bg-green-50 hover:text-green-600"
                        }`}
                        data-ocid="helpcenter.toggle"
                      >
                        <ThumbsUp className="w-3 h-3" /> {faq.helpful}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRate(faq.id, false)}
                        disabled={isRated}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                          isRated
                            ? "bg-red-50 text-red-500 cursor-default"
                            : "bg-[#F3F6FB] text-[#6B7A8D] hover:bg-red-50 hover:text-red-500"
                        }`}
                      >
                        <ThumbsDown className="w-3 h-3" /> {faq.notHelpful}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-[#3A4654] text-center py-10">
            Aramanizla eşleşen soru bulunamadı.
          </p>
        )}
      </div>

      {/* Suggested Questions */}
      {suggested.length > 0 && (
        <div className="bg-[#F3F6FB] rounded-xl p-4">
          <h3 className="text-sm font-semibold text-[#0E1116] mb-3">
            Önerilen Sorular
          </h3>
          <div className="space-y-1.5">
            {suggested.map((faq) => (
              <button
                key={faq.id}
                type="button"
                onClick={() => {
                  setExpanded(faq.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full text-left text-sm text-[#4A90D9] hover:text-[#2A70B9] py-1 flex items-center gap-2"
              >
                <span className="text-[#6B7A8D]">▸</span> {faq.question}
              </button>
            ))}
          </div>
        </div>
      )}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md" data-ocid="helpcenter.dialog">
          <DialogHeader>
            <DialogTitle>Yeni Soru & Cevap Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-1">Kategori</p>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                data-ocid="helpcenter.select"
              >
                {CATEGORIES.slice(1).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Soru</p>
              <Input
                value={form.question}
                onChange={(e) =>
                  setForm((f) => ({ ...f, question: e.target.value }))
                }
                placeholder="Sıkça sorulan soruyu yazın"
                data-ocid="helpcenter.input"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Cevap</p>
              <Textarea
                value={form.answer}
                onChange={(e) =>
                  setForm((f) => ({ ...f, answer: e.target.value }))
                }
                rows={4}
                placeholder="Detaylı cevabı yazın..."
                data-ocid="helpcenter.textarea"
              />
            </div>
            <Button
              onClick={handleAdd}
              disabled={!form.question.trim() || !form.answer.trim()}
              className="w-full bg-[#4A90D9] text-white rounded-full"
              data-ocid="helpcenter.confirm_button"
            >
              Ekle
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
