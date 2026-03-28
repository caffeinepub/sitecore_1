import {
  Baby,
  BookOpen,
  Car,
  CheckCircle2,
  Clock,
  HandHeart,
  Heart,
  MessageCircle,
  Plus,
  ShoppingBag,
  Star,
  Users,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

interface HelpRequest {
  id: string;
  residentName: string;
  apartment: string;
  category: string;
  title: string;
  description: string;
  status: "open" | "matched" | "completed";
  urgency: "acil" | "normal" | "esnek";
  postedDate: string;
  helpersCount: number;
}

interface OfferItem {
  id: string;
  residentName: string;
  apartment: string;
  category: string;
  title: string;
  description: string;
  availability: string;
  rating: number;
  helpCount: number;
}

const categories = [
  { key: "all", label: "Tümü", icon: Heart },
  { key: "alisveris", label: "Alışveriş", icon: ShoppingBag },
  { key: "ulasim", label: "Ulaşım", icon: Car },
  { key: "teknik", label: "Teknik Yardım", icon: Wrench },
  { key: "cocuk", label: "Çocuk Bakımı", icon: Baby },
  { key: "egitim", label: "Eğitim/Ders", icon: BookOpen },
  { key: "sosyal", label: "Sosyal", icon: Users },
];

const mockRequests: HelpRequest[] = [
  {
    id: "1",
    residentName: "Ayşe Kaya",
    apartment: "D-12",
    category: "alisveris",
    title: "Market alışverişi yardımı",
    description:
      "Dizim ameliyat olduğu için markete gidemiyorum. Haftalık alışveriş listemi paylaşabilirim, ücretini ödeyebilirim.",
    status: "open",
    urgency: "normal",
    postedDate: "2 saat önce",
    helpersCount: 0,
  },
  {
    id: "2",
    residentName: "Mehmet Demir",
    apartment: "A-3",
    category: "teknik",
    title: "Bilgisayar kurulumu",
    description:
      "Yeni aldığım bilgisayarı kurmakta zorlanıyorum. Biraz yardım lazım.",
    status: "matched",
    urgency: "esnek",
    postedDate: "1 gün önce",
    helpersCount: 1,
  },
  {
    id: "3",
    residentName: "Fatma Şahin",
    apartment: "B-7",
    category: "cocuk",
    title: "Çocuk bakımı - 2 saatlik",
    description:
      "Yarın öğleden sonra 2 saatliğine 5 yaşındaki çocuğuma bakabilecek biri var mı? Acil işim çıktı.",
    status: "open",
    urgency: "acil",
    postedDate: "30 dakika önce",
    helpersCount: 0,
  },
  {
    id: "4",
    residentName: "Ali Yıldız",
    apartment: "C-15",
    category: "ulasim",
    title: "Hastane ulaşımı",
    description:
      "Perşembe sabahı hastaneye gidip gelmem gerekiyor. Araçlı biri yardımcı olabilir mi?",
    status: "open",
    urgency: "normal",
    postedDate: "3 saat önce",
    helpersCount: 2,
  },
  {
    id: "5",
    residentName: "Zeynep Arslan",
    apartment: "E-4",
    category: "egitim",
    title: "Matematik dersi",
    description:
      "Lise 2'deki kızıma matematik konularında yardımcı olabilecek biri arıyorum. Ücret öderim.",
    status: "completed",
    urgency: "esnek",
    postedDate: "5 gün önce",
    helpersCount: 1,
  },
];

const mockOffers: OfferItem[] = [
  {
    id: "1",
    residentName: "Emre Çelik",
    apartment: "A-8",
    category: "teknik",
    title: "Elektrik / elektronik yardımı",
    description:
      "Bilgisayar mühendisiyim. Teknik sorunlarınızda yardımcı olabilirim.",
    availability: "Hafta sonu",
    rating: 4.9,
    helpCount: 12,
  },
  {
    id: "2",
    residentName: "Selin Kara",
    apartment: "D-5",
    category: "cocuk",
    title: "Çocuk bakımı",
    description:
      "Öğretmenim, güvenilir çocuk bakımı sağlayabilirim. Referanslarım var.",
    availability: "Esnek",
    rating: 5.0,
    helpCount: 8,
  },
  {
    id: "3",
    residentName: "Hasan Güneş",
    apartment: "B-11",
    category: "ulasim",
    title: "Araç ile ulaşım",
    description:
      "Hafta içi sabah saatlerinde hastane veya market gibi yerlere götürüp getirebilirim.",
    availability: "Hafta içi sabah",
    rating: 4.7,
    helpCount: 15,
  },
  {
    id: "4",
    residentName: "Nilüfer Öz",
    apartment: "C-2",
    category: "alisveris",
    title: "Market alışverişi",
    description:
      "Her gün markete gidiyorum, sizi de düşünebilirim. Ücretsiz yaparım.",
    availability: "Her gün öğlen",
    rating: 4.8,
    helpCount: 20,
  },
];

const urgencyConfig: Record<string, { label: string; color: string }> = {
  acil: { label: "Acil", color: "bg-red-100 text-red-700" },
  normal: { label: "Normal", color: "bg-blue-100 text-blue-700" },
  esnek: { label: "Esnek", color: "bg-green-100 text-green-700" },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  open: { label: "Açık", color: "bg-yellow-100 text-yellow-700" },
  matched: { label: "Eşleşti", color: "bg-blue-100 text-blue-700" },
  completed: { label: "Tamamlandı", color: "bg-green-100 text-green-700" },
};

export default function ResidentSolidarity({
  buildingId: _buildingId,
  t: _t,
}: {
  buildingId: string;
  t: Record<string, string>;
}) {
  const [activeTab, setActiveTab] = useState<"requests" | "offers" | "stats">(
    "requests",
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);

  const filteredRequests = mockRequests.filter(
    (r) => selectedCategory === "all" || r.category === selectedCategory,
  );

  const totalHelps = mockOffers.reduce((sum, o) => sum + o.helpCount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Sakin Dayanışma & Yardım Ağı
          </h2>
          <p className="text-gray-500 mt-1">
            Komşularınızla yardımlaşın, birlikte güçlü olun
          </p>
        </div>
        <Button
          onClick={() => setShowNewRequestForm(!showNewRequestForm)}
          className="bg-rose-500 hover:bg-rose-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yardım İste
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-rose-50 border-rose-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <HandHeart className="w-8 h-8 text-rose-500" />
              <div>
                <p className="text-2xl font-bold text-rose-700">
                  {mockRequests.filter((r) => r.status === "open").length}
                </p>
                <p className="text-xs text-rose-600">Açık Talep</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-700">
                  {mockOffers.length}
                </p>
                <p className="text-xs text-blue-600">Gönüllü</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-700">
                  {mockRequests.filter((r) => r.status === "completed").length}
                </p>
                <p className="text-xs text-green-600">Tamamlanan</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-purple-700">
                  {totalHelps}
                </p>
                <p className="text-xs text-purple-600">Toplam Yardım</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Request Form */}
      {showNewRequestForm && (
        <Card className="border-rose-200 bg-rose-50">
          <CardHeader>
            <CardTitle className="text-rose-800">Yeni Yardım Talebi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="req-title"
                  className="text-sm font-medium text-gray-700"
                >
                  Başlık
                </label>
                <input
                  id="req-title"
                  className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                  placeholder="Kısa bir başlık yazın"
                />
              </div>
              <div>
                <label
                  htmlFor="req-cat"
                  className="text-sm font-medium text-gray-700"
                >
                  Kategori
                </label>
                <select
                  id="req-cat"
                  className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                >
                  {categories
                    .filter((c) => c.key !== "all")
                    .map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.label}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="req-urgency"
                  className="text-sm font-medium text-gray-700"
                >
                  Aciliyet
                </label>
                <select
                  id="req-urgency"
                  className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="esnek">Esnek</option>
                  <option value="normal">Normal</option>
                  <option value="acil">Acil</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="req-desc"
                className="text-sm font-medium text-gray-700"
              >
                Açıklama
              </label>
              <textarea
                id="req-desc"
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                rows={3}
                placeholder="İhtiyacınızı detaylıca açıklayın..."
              />
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-rose-500 hover:bg-rose-600 text-white"
              >
                Talep Oluştur
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowNewRequestForm(false)}
              >
                İptal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {(["requests", "offers", "stats"] as const).map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab === "requests"
              ? "Yardım Talepleri"
              : tab === "offers"
                ? "Yardım Teklifleri"
                : "İstatistikler"}
          </button>
        ))}
      </div>

      {/* Category Filter */}
      {activeTab !== "stats" && (
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                type="button"
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.key
                    ? "bg-rose-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Requests Tab */}
      {activeTab === "requests" && (
        <div className="space-y-3">
          {filteredRequests.map((req) => (
            <Card key={req.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {req.title}
                      </h3>
                      <Badge className={urgencyConfig[req.urgency].color}>
                        {urgencyConfig[req.urgency].label}
                      </Badge>
                      <Badge className={statusConfig[req.status].color}>
                        {statusConfig[req.status].label}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {req.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="font-medium text-gray-600">
                        {req.residentName} ({req.apartment})
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {req.postedDate}
                      </span>
                      {req.helpersCount > 0 && (
                        <span className="flex items-center gap-1 text-blue-600">
                          <Users className="w-3 h-3" />
                          {req.helpersCount} yardım teklifi
                        </span>
                      )}
                    </div>
                  </div>
                  {req.status === "open" && (
                    <Button
                      size="sm"
                      className="bg-rose-500 hover:bg-rose-600 text-white shrink-0"
                    >
                      <HandHeart className="w-3.5 h-3.5 mr-1" /> Yardım Et
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Offers Tab */}
      {activeTab === "offers" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockOffers
            .filter(
              (o) =>
                selectedCategory === "all" || o.category === selectedCategory,
            )
            .map((offer) => (
              <Card
                key={offer.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {offer.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {offer.residentName} ({offer.apartment})
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium text-yellow-700">
                        {offer.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {offer.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {offer.availability}
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        {offer.helpCount} yardım
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-rose-300 text-rose-600 hover:bg-rose-50"
                    >
                      <MessageCircle className="w-3.5 h-3.5 mr-1" /> İletişim
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          {/* Add Offer Card */}
          <Card className="border-dashed border-2 border-rose-200 hover:border-rose-400 cursor-pointer transition-colors">
            <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[160px] text-center">
              <Plus className="w-8 h-8 text-rose-300 mb-2" />
              <p className="text-sm font-medium text-rose-500">
                Yardım Teklifi Ver
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Komşularına yardım etmek için teklif oluştur
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stats Tab */}
      {activeTab === "stats" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Kategori Dağılımı</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Alışveriş", count: 8, color: "bg-orange-400" },
                { label: "Ulaşım", count: 12, color: "bg-blue-400" },
                { label: "Teknik Yardım", count: 6, color: "bg-purple-400" },
                { label: "Çocuk Bakımı", count: 5, color: "bg-pink-400" },
                { label: "Eğitim/Ders", count: 4, color: "bg-green-400" },
                { label: "Sosyal", count: 9, color: "bg-yellow-400" },
              ].map((cat) => (
                <div key={cat.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{cat.label}</span>
                    <span className="font-medium">{cat.count} yardım</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`${cat.color} h-2 rounded-full`}
                      style={{ width: `${(cat.count / 12) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                En Aktif Yardımseverler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockOffers
                  .sort((a, b) => b.helpCount - a.helpCount)
                  .map((offer, idx) => (
                    <div
                      key={offer.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            idx === 0
                              ? "bg-yellow-100 text-yellow-700"
                              : idx === 1
                                ? "bg-gray-100 text-gray-700"
                                : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div>
                          <p className="text-sm font-medium">
                            {offer.residentName}
                          </p>
                          <p className="text-xs text-gray-400">
                            {offer.apartment}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-rose-600">
                          {offer.helpCount} yardım
                        </span>
                        <div className="flex items-center gap-0.5">
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs">{offer.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
