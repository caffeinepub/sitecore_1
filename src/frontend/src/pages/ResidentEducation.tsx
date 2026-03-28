import {
  Award,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  Play,
} from "lucide-react";
import { useState } from "react";

const videos = [
  {
    id: 1,
    title: "Platforma Nasıl Kayıt Olunur?",
    duration: "4:32",
    category: "Platform Kullanımı",
    views: 1240,
    color: "bg-blue-100",
  },
  {
    id: 2,
    title: "Aidat Ödeme Adımları",
    duration: "3:15",
    category: "Platform Kullanımı",
    views: 980,
    color: "bg-blue-100",
  },
  {
    id: 3,
    title: "Yönetim Kurulu Nasıl Çalışır?",
    duration: "6:48",
    category: "Bina Yönetimi",
    views: 720,
    color: "bg-green-100",
  },
  {
    id: 4,
    title: "Ortak Alan Kullanım Kuralları",
    duration: "5:20",
    category: "Bina Yönetimi",
    views: 560,
    color: "bg-green-100",
  },
  {
    id: 5,
    title: "Kat Mülkiyeti Kanunu Temel Haklar",
    duration: "8:10",
    category: "Yasal Haklar",
    views: 430,
    color: "bg-purple-100",
  },
  {
    id: 6,
    title: "Yangın Güvenliği ve Tahliye",
    duration: "5:55",
    category: "Güvenlik",
    views: 890,
    color: "bg-red-100",
  },
];

const guides = [
  {
    id: 1,
    title: "Yeni Sakin Hoş Geldiniz Rehberi",
    desc: "Binaya taşınırken bilinmesi gerekenler",
    size: "2.4 MB",
    category: "Yeni Sakin",
  },
  {
    id: 2,
    title: "Aidat Hesaplama Kılavuzu",
    desc: "Aidat nasıl hesaplanır, nereye gider?",
    size: "1.1 MB",
    category: "Aidat",
  },
  {
    id: 3,
    title: "Şikayet ve Talep Süreci",
    desc: "Resmi şikayet nasıl yapılır?",
    size: "0.8 MB",
    category: "Şikayet",
  },
  {
    id: 4,
    title: "Periyodik Bakım Takvimi",
    desc: "Bina bakım zamanlaması",
    size: "1.6 MB",
    category: "Bakım",
  },
  {
    id: 5,
    title: "Ortak Gider Paylaşım Esasları",
    desc: "Giderlerin nasıl bölüşüldüğü",
    size: "1.3 MB",
    category: "Aidat",
  },
  {
    id: 6,
    title: "Kiracı Hakları ve Yükümlülükleri",
    desc: "Kiracı-mal sahibi ilişkisi rehberi",
    size: "2.0 MB",
    category: "Yeni Sakin",
  },
  {
    id: 7,
    title: "Acil Durum Prosedürleri",
    desc: "Yangın, deprem ve tahliye talimatları",
    size: "1.8 MB",
    category: "Bakım",
  },
  {
    id: 8,
    title: "Karar Alma Süreçleri",
    desc: "Genel kurul ve yönetim kararları",
    size: "0.9 MB",
    category: "Şikayet",
  },
];

const faqs = [
  {
    id: "f1",
    q: "Aidat ne zaman ödenmeli?",
    a: "Aidat her ayın 1-5. günleri arasında ödenmesi gerekir. Geç ödemelerde yasal faiz uygulanır.",
    cat: "Aidat",
  },
  {
    id: "f2",
    q: "Aidat miktarı nasıl belirlenir?",
    a: "Yıllık bütçe genel kurul kararıyla belirlenir; daire metrekaresi veya arsa payına göre dağıtılır.",
    cat: "Aidat",
  },
  {
    id: "f3",
    q: "Şikayet nasıl iletilir?",
    a: "Bina yöneticisine yazılı olarak veya platform üzerinden dijital şikayet bildirimi yapılabilir.",
    cat: "Şikayet & Talepler",
  },
  {
    id: "f4",
    q: "Ortak alanlar nasıl rezerve edilir?",
    a: "Platform'daki Ortak Alan Rezervasyonu modülünden uygun tarih/saati seçerek rezervasyon yapabilirsiniz.",
    cat: "Ortak Alanlar",
  },
  {
    id: "f5",
    q: "Tadilat yapabilmek için izin gerekli mi?",
    a: "Evet. Gürültü çıkaran tadilat işlemleri için yöneticiden yazılı onay alınması zorunludur.",
    cat: "Tadilat",
  },
  {
    id: "f6",
    q: "Misafir aracını nereye park ettireceğim?",
    a: "Misafir araçları için belirlenmiş bölge vardır. Uzun süreli park için yönetimden ön izin alınmalıdır.",
    cat: "Ortak Alanlar",
  },
  {
    id: "f7",
    q: "Fatura itirazı nasıl yapılır?",
    a: "İtiraz dilekçesini yönetim ofisine teslim edin ya da platform üzerinden talep gönderin.",
    cat: "Şikayet & Talepler",
  },
  {
    id: "f8",
    q: "Yönetim kuruluna nasıl katılabilirim?",
    a: "Genel kurulda aday olarak başvurabilirsiniz. Şartlar için yönetimle iletişime geçin.",
    cat: "Yönetim",
  },
  {
    id: "f9",
    q: "Evcil hayvan besleyebilir miyim?",
    a: "Yönetmeliğe ve genel kurul kararlarına göre değişir. Yönetim ofisinden mevcut kuralları öğrenebilirsiniz.",
    cat: "Tadilat",
  },
  {
    id: "f10",
    q: "Taşınma saatleri nelerdir?",
    a: "Taşınma işlemleri hafta içi 08:00-18:00, hafta sonu 09:00-16:00 saatleri arasında yapılabilir.",
    cat: "Yönetim",
  },
];

const certs = [
  {
    id: 1,
    title: "Platform Kullanımı Temel Eğitim",
    date: "12 Ocak 2025",
    score: "95/100",
  },
  {
    id: 2,
    title: "Bina Güvenlik Farkındalık Kursu",
    date: "28 Şubat 2025",
    score: "88/100",
  },
  {
    id: 3,
    title: "Sakin Hakları ve Sorumlulukları",
    date: "5 Mart 2025",
    score: "92/100",
  },
];

const catColor: Record<string, string> = {
  "Platform Kullanımı": "bg-blue-100 text-blue-700",
  "Bina Yönetimi": "bg-green-100 text-green-700",
  "Yasal Haklar": "bg-purple-100 text-purple-700",
  Güvenlik: "bg-red-100 text-red-700",
  "Yeni Sakin": "bg-teal-100 text-teal-700",
  Aidat: "bg-yellow-100 text-yellow-700",
  Şikayet: "bg-orange-100 text-orange-700",
  Bakım: "bg-gray-100 text-gray-700",
};

export default function ResidentEducation(_props: { buildingId: string }) {
  const [tab, setTab] = useState<"videos" | "guides" | "faq" | "certs">(
    "videos",
  );
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const navTabs = [
    { key: "videos" as const, label: "Eğitim Videoları" },
    { key: "guides" as const, label: "Rehber & Kılavuzlar" },
    { key: "faq" as const, label: "SSS" },
    { key: "certs" as const, label: "Sertifikalar" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <BookOpen className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Sakin Eğitim & Bilgi Bankası
          </h1>
          <p className="text-sm text-gray-500">
            Video kurslar, rehberler, sık sorulan sorular ve sertifikalar
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "Video",
            value: videos.length,
            color: "text-blue-600 bg-blue-50",
          },
          {
            label: "Rehber",
            value: guides.length,
            color: "text-green-600 bg-green-50",
          },
          {
            label: "SSS",
            value: faqs.length,
            color: "text-purple-600 bg-purple-50",
          },
          {
            label: "Sertifika",
            value: certs.length,
            color: "text-yellow-600 bg-yellow-50",
          },
        ].map((s) => (
          <div
            key={s.label}
            className={`rounded-xl p-4 text-center ${s.color}`}
          >
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 border-b">
        {navTabs.map((t) => (
          <button
            type="button"
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === t.key
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "videos" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((v) => (
            <div
              key={v.id}
              className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`${v.color} h-36 flex items-center justify-center`}
              >
                <button
                  type="button"
                  className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                >
                  <Play
                    className="w-6 h-6 text-indigo-600 ml-1"
                    fill="currentColor"
                  />
                </button>
              </div>
              <div className="p-3">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${catColor[v.category] || "bg-gray-100 text-gray-700"}`}
                >
                  {v.category}
                </span>
                <p className="mt-2 font-semibold text-sm text-gray-800 line-clamp-2">
                  {v.title}
                </p>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                  <span>{v.duration}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />{" "}
                    {v.views.toLocaleString("tr-TR")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "guides" && (
        <div className="space-y-3">
          {guides.map((g) => (
            <div
              key={g.id}
              className="flex items-center justify-between p-4 border rounded-xl bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    {g.title}
                  </p>
                  <p className="text-xs text-gray-500">{g.desc}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${catColor[g.category] || "bg-gray-100 text-gray-700"}`}
                    >
                      {g.category}
                    </span>
                    <span className="text-xs text-gray-400">{g.size}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Download className="w-3 h-3" /> İndir
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === "faq" && (
        <div className="space-y-2">
          {faqs.map((f) => (
            <div
              key={f.id}
              className="border rounded-xl overflow-hidden bg-white"
            >
              <button
                type="button"
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setOpenFaq(openFaq === f.id ? null : f.id)}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${catColor[f.cat] || "bg-gray-100 text-gray-700"}`}
                  >
                    {f.cat}
                  </span>
                  <span className="font-medium text-sm text-gray-800">
                    {f.q}
                  </span>
                </div>
                {openFaq === f.id ? (
                  <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                )}
              </button>
              {openFaq === f.id && (
                <div className="px-4 pb-4 text-sm text-gray-600 border-t pt-3 bg-gray-50">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "certs" && (
        <div className="space-y-4">
          {certs.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-4 p-5 border rounded-xl bg-gradient-to-r from-indigo-50 to-white"
            >
              <div className="p-3 bg-indigo-100 rounded-full">
                <Award className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{c.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">
                  Tamamlandı: {c.date}
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-indigo-600">
                  {c.score}
                </div>
                <div className="text-xs text-gray-400">Puan</div>
              </div>
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-1.5 border border-indigo-300 text-indigo-600 text-xs rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <Download className="w-3 h-3" /> Sertifika
              </button>
            </div>
          ))}
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
            Daha fazla sertifika kazanmak için eğitim videolarını tamamlayın ve
            değerlendirmelere katılın.
          </div>
        </div>
      )}
    </div>
  );
}
