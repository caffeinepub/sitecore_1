import { Heart, MessageCircle, Search, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";

interface Listing {
  id: number;
  title: string;
  category: "Takas" | "Satılık" | "Kiralık" | "Hizmet";
  description: string;
  poster: string;
  date: string;
  condition: "Yeni" | "İyi" | "Orta" | null;
  price?: string;
  favorited?: boolean;
}

const SAMPLE_LISTINGS: Listing[] = [
  {
    id: 1,
    title: "İkea Yemek Masası (6 Kişilik)",
    category: "Takas",
    description:
      "2 yıllık, çok az kullanılmış meşe rengi yemek masası. Sandalyeler dahil. Küçük bir kanepe ile takas yaparım.",
    poster: "Daire 5",
    date: "25 Mar 2026",
    condition: "İyi",
  },
  {
    id: 2,
    title: "Beko Bulaşık Makinesi",
    category: "Satılık",
    description:
      "A++ enerji sınıfı, 5 yaşında, tam çalışır durumda. Yeni makine aldığımız için satıyoruz.",
    poster: "Daire 12",
    date: "24 Mar 2026",
    condition: "İyi",
    price: "3.500 ₺",
  },
  {
    id: 3,
    title: "Haftalık Ev Temizliği",
    category: "Hizmet",
    description:
      "Deneyimli ev hanımıyım, haftada 1 gün temizlik yapabilirim. Referanslarım mevcut. Uygun fiyat.",
    poster: "Daire 8",
    date: "23 Mar 2026",
    condition: null,
    price: "800 ₺/gün",
  },
  {
    id: 4,
    title: "Çocuk Bisikleti (5-8 Yaş)",
    category: "Takas",
    description:
      "Kırmızı, 20 jant çocuk bisikleti. Çocuğum büyüdü, scooter veya kaykay ile takas ederim.",
    poster: "Daire 3",
    date: "22 Mar 2026",
    condition: "İyi",
  },
  {
    id: 5,
    title: "Bahçe & Balkon Bakımı",
    category: "Hizmet",
    description:
      "Balkon bahçeciliği konusunda yardım edebilirim. Bitki budama, toprak değişimi, sulama sistemi kurulumu.",
    poster: "Daire 17",
    date: "21 Mar 2026",
    condition: null,
    price: "Pazarlıklı",
  },
  {
    id: 6,
    title: 'Samsung 55" 4K Televizyon',
    category: "Satılık",
    description:
      "3 yıllık, smart TV, Netflix/YouTube desteği. Kutusunda saklanan orijinal uzaktan kumandası var.",
    poster: "Daire 21",
    date: "20 Mar 2026",
    condition: "İyi",
    price: "8.000 ₺",
  },
  {
    id: 7,
    title: "Elektrikli Scooter (Xiaomi)",
    category: "Kiralık",
    description:
      "Xiaomi Mi Scooter Pro 2, haftalık kiralık. Şehir içi ulaşım için ideal. Kask dahil.",
    poster: "Daire 9",
    date: "19 Mar 2026",
    condition: "İyi",
    price: "500 ₺/hafta",
  },
  {
    id: 8,
    title: "Kitap Koleksiyonu (50+ Kitap)",
    category: "Takas",
    description:
      "Türk ve dünya edebiyatından oluşan karma koleksiyon. Yemek kitabı veya çizgi roman ile takas.",
    poster: "Daire 14",
    date: "18 Mar 2026",
    condition: "İyi",
  },
];

const SAVED_LISTINGS = SAMPLE_LISTINGS.filter((l) => [2, 5, 7].includes(l.id));

const CATEGORY_COLORS: Record<string, string> = {
  Takas: "bg-blue-100 text-blue-700 border-blue-200",
  Satılık: "bg-green-100 text-green-700 border-green-200",
  Kiralık: "bg-purple-100 text-purple-700 border-purple-200",
  Hizmet: "bg-orange-100 text-orange-700 border-orange-200",
};

function ListingCard({
  listing,
  showFavorite = true,
}: { listing: Listing; showFavorite?: boolean }) {
  const [fav, setFav] = useState(listing.favorited ?? false);
  return (
    <Card className="border border-gray-100 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[listing.category]}`}
          >
            {listing.category}
          </span>
          {showFavorite && (
            <button
              type="button"
              onClick={() => setFav((v) => !v)}
              className="text-gray-400 hover:text-red-500 transition-colors mt-0.5"
              data-ocid={`marketplace.toggle.${listing.id}`}
            >
              <Heart
                className={`w-4 h-4 ${fav ? "fill-red-500 text-red-500" : ""}`}
              />
            </button>
          )}
        </div>
        <h3 className="font-semibold text-gray-800 text-sm mb-1">
          {listing.title}
        </h3>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">
          {listing.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400 space-y-0.5">
            <div>
              {listing.poster} · {listing.date}
            </div>
            {listing.condition && (
              <div>
                Durum:{" "}
                <span className="text-gray-600">{listing.condition}</span>
              </div>
            )}
            {listing.price && (
              <div className="font-medium text-green-700">{listing.price}</div>
            )}
          </div>
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-7"
            data-ocid={`marketplace.secondary_button.${listing.id}`}
          >
            <MessageCircle className="w-3 h-3 mr-1" />
            İletişim
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ResidentMarketplace({
  buildingId: _buildingId,
  t: _t,
}: { buildingId: string; t: any }) {
  const [filter, setFilter] = useState("Tümü");
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    condition: "",
    contact: "",
    price: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const CATEGORIES = ["Tümü", "Takas", "Satılık", "Kiralık", "Hizmet"];

  const filtered = SAMPLE_LISTINGS.filter((l) => {
    const matchCat = filter === "Tümü" || l.category === filter;
    const matchSearch =
      !search ||
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        title: "",
        category: "",
        description: "",
        condition: "",
        contact: "",
        price: "",
      });
    }, 3000);
  }

  return (
    <div className="p-6 space-y-6" data-ocid="marketplace.page">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Komşu Takas & İlan Panosu
          </h1>
          <p className="text-sm text-gray-500">
            Komşularınızla alışveriş yapın, hizmet alın veya ilan verin
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="border-0 bg-indigo-50">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-indigo-700">
              {SAMPLE_LISTINGS.length}
            </div>
            <div className="text-xs text-indigo-600">Aktif İlan</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-green-50">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-green-700">3</div>
            <div className="text-xs text-green-600">Bu Hafta Eklenen</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-orange-50">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-orange-700">2</div>
            <div className="text-xs text-orange-600">Tamamlanan Takas</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="listings">
        <TabsList className="grid grid-cols-3 w-full max-w-sm">
          <TabsTrigger value="listings" data-ocid="marketplace.tab">
            İlanlar
          </TabsTrigger>
          <TabsTrigger value="post" data-ocid="marketplace.tab">
            İlan Ver
          </TabsTrigger>
          <TabsTrigger value="favorites" data-ocid="marketplace.tab">
            Favoriler
          </TabsTrigger>
        </TabsList>

        {/* İlanlar Tab */}
        <TabsContent value="listings" className="mt-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="İlan ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
                data-ocid="marketplace.search_input"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setFilter(cat)}
                  data-ocid="marketplace.toggle"
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    filter === cat
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div
              className="text-center py-12 text-gray-400"
              data-ocid="marketplace.empty_state"
            >
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Bu kategoride ilan bulunamadı.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((listing, i) => (
                <div key={listing.id} data-ocid={`marketplace.item.${i + 1}`}>
                  <ListingCard listing={listing} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* İlan Ver Tab */}
        <TabsContent value="post" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Yeni İlan Oluştur</CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div
                  className="text-center py-8"
                  data-ocid="marketplace.success_state"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-green-700 font-medium">
                    İlanınız başarıyla yayınlandı!
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Komşularınız ilanınızı görebilecek.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Başlık</Label>
                    <Input
                      id="title"
                      placeholder="Ör: Çocuk bisikleti, temizlik hizmeti..."
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, title: e.target.value }))
                      }
                      required
                      data-ocid="marketplace.input"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Kategori</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(v) =>
                          setFormData((p) => ({ ...p, category: v }))
                        }
                      >
                        <SelectTrigger data-ocid="marketplace.select">
                          <SelectValue placeholder="Seçin..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Takas">Takas</SelectItem>
                          <SelectItem value="Satılık">Satılık</SelectItem>
                          <SelectItem value="Kiralık">Kiralık</SelectItem>
                          <SelectItem value="Hizmet">Hizmet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Durum</Label>
                      <Select
                        value={formData.condition}
                        onValueChange={(v) =>
                          setFormData((p) => ({ ...p, condition: v }))
                        }
                      >
                        <SelectTrigger data-ocid="marketplace.select">
                          <SelectValue placeholder="Seçin..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yeni">Yeni</SelectItem>
                          <SelectItem value="İyi">İyi</SelectItem>
                          <SelectItem value="Orta">Orta</SelectItem>
                          <SelectItem value="Hizmet">
                            Hizmet (geçerli değil)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Açıklama</Label>
                    <Textarea
                      id="description"
                      placeholder="Ürün veya hizmet hakkında detaylı bilgi verin..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          description: e.target.value,
                        }))
                      }
                      required
                      rows={3}
                      data-ocid="marketplace.textarea"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Fiyat (opsiyonel)</Label>
                      <Input
                        id="price"
                        placeholder="Ör: 500 ₺ veya Pazarlıklı"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, price: e.target.value }))
                        }
                        data-ocid="marketplace.input"
                      />
                    </div>
                    <div>
                      <Label>İletişim Tercihi</Label>
                      <Select
                        value={formData.contact}
                        onValueChange={(v) =>
                          setFormData((p) => ({ ...p, contact: v }))
                        }
                      >
                        <SelectTrigger data-ocid="marketplace.select">
                          <SelectValue placeholder="Seçin..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mesaj">Mesaj</SelectItem>
                          <SelectItem value="Telefon">Telefon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                    data-ocid="marketplace.submit_button"
                  >
                    İlan Yayınla
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Favoriler Tab */}
        <TabsContent value="favorites" className="mt-4 space-y-4">
          {SAVED_LISTINGS.length === 0 ? (
            <div
              className="text-center py-12 text-gray-400"
              data-ocid="marketplace.empty_state"
            >
              <Heart className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Henüz favori ilanınız yok.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SAVED_LISTINGS.map((listing, i) => (
                <div key={listing.id} data-ocid={`marketplace.item.${i + 1}`}>
                  <ListingCard listing={{ ...listing, favorited: true }} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
