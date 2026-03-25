import {
  Award,
  MessageSquare,
  Star,
  ThumbsUp,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

interface Props {
  buildingId: string;
  t: any;
}

const NPS_SCORE = 72;
const NPS_TREND = 4; // +4 from last month

const CATEGORY_SCORES = [
  { category: "Temizlik", score: 4.2, color: "#4A90D9" },
  { category: "Güvenlik", score: 4.5, color: "#22C55E" },
  { category: "Yönetim", score: 3.8, color: "#F2A23A" },
  { category: "Altyapı", score: 3.6, color: "#8B5CF6" },
  { category: "İletişim", score: 4.1, color: "#06B6D4" },
];

const MONTHLY_TREND = [
  { ay: "Nis", nps: 61 },
  { ay: "May", nps: 63 },
  { ay: "Haz", nps: 65 },
  { ay: "Tem", nps: 60 },
  { ay: "Ağu", nps: 64 },
  { ay: "Eyl", nps: 67 },
  { ay: "Eki", nps: 70 },
  { ay: "Kas", nps: 68 },
  { ay: "Ara", nps: 71 },
  { ay: "Oca", nps: 69 },
  { ay: "Şub", nps: 68 },
  { ay: "Mar", nps: 72 },
];

const FEEDBACK_LIST = [
  {
    id: "fb1",
    daire: "A-12",
    tarih: "2026-03-20",
    puan: 5,
    yorum: "Asansör tamiri çok hızlı yapıldı, teşekkürler!",
    kategori: "Altyapı",
  },
  {
    id: "fb2",
    daire: "B-7",
    tarih: "2026-03-18",
    puan: 4,
    yorum: "Temizlik genel olarak iyi ama bodrum katta eksiklik var.",
    kategori: "Temizlik",
  },
  {
    id: "fb3",
    daire: "A-5",
    tarih: "2026-03-15",
    puan: 3,
    yorum: "Yönetim duyuruları çok geç yapılıyor.",
    kategori: "İletişim",
  },
  {
    id: "fb4",
    daire: "C-2",
    tarih: "2026-03-12",
    puan: 5,
    yorum: "Güvenlik personeli çok ilgili ve profesyonel.",
    kategori: "Güvenlik",
  },
  {
    id: "fb5",
    daire: "B-15",
    tarih: "2026-03-10",
    puan: 4,
    yorum: "Bahçe bakımı bu ay çok güzeldi.",
    kategori: "Temizlik",
  },
  {
    id: "fb6",
    daire: "A-3",
    tarih: "2026-03-08",
    puan: 2,
    yorum: "Otopark düzenlemesi hâlâ çözülmedi.",
    kategori: "Yönetim",
  },
  {
    id: "fb7",
    daire: "C-8",
    tarih: "2026-03-06",
    puan: 5,
    yorum: "Online platformun kullanımı çok kolay ve pratik.",
    kategori: "Yönetim",
  },
  {
    id: "fb8",
    daire: "B-3",
    tarih: "2026-03-04",
    puan: 4,
    yorum: "Su arızası 24 saat içinde giderildi, memnunum.",
    kategori: "Altyapı",
  },
  {
    id: "fb9",
    daire: "A-9",
    tarih: "2026-03-01",
    puan: 3,
    yorum: "Ortak alan rezervasyon sistemi bazen yanıt vermiyor.",
    kategori: "Altyapı",
  },
  {
    id: "fb10",
    daire: "C-11",
    tarih: "2026-02-28",
    puan: 4,
    yorum: "Yönetim ekibine teşekkürler, sorunlar hızlı çözülüyor.",
    kategori: "Yönetim",
  },
  {
    id: "fb11",
    daire: "B-9",
    tarih: "2026-02-25",
    puan: 5,
    yorum: "Güvenlik kameralarının arttırılması güvende hissettiriyor.",
    kategori: "Güvenlik",
  },
  {
    id: "fb12",
    daire: "A-14",
    tarih: "2026-02-22",
    puan: 3,
    yorum: "Zaman zaman asansör bakımı gecikmeli yapılıyor.",
    kategori: "Altyapı",
  },
];

const MGMT_METRICS = [
  {
    label: "Ort. Yanıt Süresi",
    value: "4.2 saat",
    icon: TrendingDown,
    color: "text-green-600",
  },
  {
    label: "Çözüm Oranı",
    value: "%87",
    icon: ThumbsUp,
    color: "text-blue-600",
  },
  {
    label: "Aktif Şikayet",
    value: "7",
    icon: MessageSquare,
    color: "text-[#F2A23A]",
  },
  {
    label: "Bu Ay Geri Bildirim",
    value: "34",
    icon: Award,
    color: "text-purple-600",
  },
];

function StarRating({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= Math.round(score) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
        />
      ))}
    </div>
  );
}

export default function ResidentSatisfaction({
  buildingId: _buildingId,
  t: _t,
}: Props) {
  const npsColor =
    NPS_SCORE >= 70
      ? "text-green-600"
      : NPS_SCORE >= 50
        ? "text-[#F2A23A]"
        : "text-red-600";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#0E1116]">
          Sakin Memnuniyet & Geri Bildirim
        </h2>
        <p className="text-sm text-[#6B7A8D] mt-1">
          NPS skoru, kategori memnuniyeti ve geri bildirim analizi
        </p>
      </div>

      {/* NPS + Metrics */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-[#E5EAF2] p-6 flex flex-col items-center justify-center">
          <p className="text-xs font-bold text-[#6B7A8D] uppercase tracking-wide">
            Net Tavsiye Skoru (NPS)
          </p>
          <div className="flex items-end gap-2 mt-3">
            <p className={`text-7xl font-extrabold ${npsColor}`}>{NPS_SCORE}</p>
            <div className="flex items-center gap-1 mb-2">
              {NPS_TREND >= 0 ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${NPS_TREND >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {NPS_TREND >= 0 ? "+" : ""}
                {NPS_TREND}
              </span>
            </div>
          </div>
          <p className="text-xs text-[#6B7A8D] mt-1">Geçen aya göre</p>
          <div className="w-full mt-4">
            <div className="flex justify-between text-xs text-[#6B7A8D] mb-1">
              <span>Kötü (0-49)</span>
              <span>İyi (50-74)</span>
              <span>Mükemmel (75+)</span>
            </div>
            <div className="h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-full relative">
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#0B1B2E] rounded-full"
                style={{ left: `${NPS_SCORE}%` }}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-3">
          {MGMT_METRICS.map((m) => (
            <div
              key={m.label}
              className="bg-white rounded-xl border border-[#E5EAF2] p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <m.icon className={`w-5 h-5 ${m.color}`} />
                <p className="text-xs text-[#6B7A8D]">{m.label}</p>
              </div>
              <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      <Tabs defaultValue="categories">
        <TabsList className="bg-[#F3F6FB]">
          <TabsTrigger value="categories">Kategori Memnuniyeti</TabsTrigger>
          <TabsTrigger value="trend">Aylık Trend</TabsTrigger>
          <TabsTrigger value="feedback">Geri Bildirimler</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="mt-4">
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-[#E5EAF2] p-5">
              <h3 className="font-semibold text-[#0E1116] mb-4">
                Kategori Skorları (5 üzerinden)
              </h3>
              <div className="space-y-4">
                {CATEGORY_SCORES.map((c) => (
                  <div key={c.category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-[#0E1116]">
                        {c.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <StarRating score={c.score} />
                        <span className="text-sm font-bold text-[#0B1B2E]">
                          {c.score}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-[#F3F6FB] rounded-full">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${(c.score / 5) * 100}%`,
                          backgroundColor: c.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E5EAF2] p-5">
              <h3 className="font-semibold text-[#0E1116] mb-4">
                Kategori Karşılaştırması
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={CATEGORY_SCORES} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[0, 5]}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    dataKey="category"
                    type="category"
                    tick={{ fontSize: 11 }}
                    width={70}
                  />
                  <Tooltip formatter={(v: any) => [v.toFixed(1), "Puan"]} />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                    {CATEGORY_SCORES.map((c) => (
                      <rect key={c.category} fill={c.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trend" className="mt-4">
          <div className="bg-white rounded-xl border border-[#E5EAF2] p-5">
            <h3 className="font-semibold text-[#0E1116] mb-4">
              12 Aylık NPS Trendi
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={MONTHLY_TREND}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ay" tick={{ fontSize: 12 }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: any) => [v, "NPS"]} />
                <Line
                  type="monotone"
                  dataKey="nps"
                  stroke="#4A90D9"
                  strokeWidth={2.5}
                  dot={{ fill: "#4A90D9", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="mt-4">
          <div className="space-y-3">
            {FEEDBACK_LIST.map((fb) => (
              <div
                key={fb.id}
                className="bg-white rounded-xl border border-[#E5EAF2] p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#4A90D9] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {fb.daire}
                    </div>
                    <div>
                      <p className="text-sm text-[#3A4654]">{fb.yorum}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <StarRating score={fb.puan} />
                        <span className="text-xs text-[#6B7A8D]">
                          {fb.tarih}
                        </span>
                        <Badge className="bg-[#F3F6FB] text-[#6B7A8D] border-0 text-xs">
                          {fb.kategori}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-[#0B1B2E]">
                    {fb.puan}/5
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
