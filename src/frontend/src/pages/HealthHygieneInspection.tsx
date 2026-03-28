import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Plus, ShieldCheck, Star } from "lucide-react";
import { useState } from "react";

interface Props {
  buildingId: string;
}

const inspections = [
  {
    id: 1,
    tarih: "15.03.2026",
    alan: "Ortak Koridor",
    denetci: "Ahmet Yılmaz",
    puan: 92,
    durum: "tamamlandı",
  },
  {
    id: 2,
    tarih: "12.03.2026",
    alan: "Asansör",
    denetci: "Fatma Kaya",
    puan: 85,
    durum: "tamamlandı",
  },
  {
    id: 3,
    tarih: "10.03.2026",
    alan: "Otopark",
    denetci: "Mehmet Demir",
    puan: 68,
    durum: "tamamlandı",
  },
  {
    id: 4,
    tarih: "08.03.2026",
    alan: "Bahçe",
    denetci: "Ahmet Yılmaz",
    puan: 95,
    durum: "tamamlandı",
  },
  {
    id: 5,
    tarih: "05.03.2026",
    alan: "Çatı",
    denetci: "Fatma Kaya",
    puan: 72,
    durum: "tamamlandı",
  },
  {
    id: 6,
    tarih: "03.03.2026",
    alan: "Bodrum",
    denetci: "Mehmet Demir",
    puan: 61,
    durum: "tamamlandı",
  },
  {
    id: 7,
    tarih: "20.03.2026",
    alan: "Ortak Koridor",
    denetci: "Ahmet Yılmaz",
    puan: 0,
    durum: "devam ediyor",
  },
  {
    id: 8,
    tarih: "25.03.2026",
    alan: "Asansör",
    denetci: "Fatma Kaya",
    puan: 0,
    durum: "planlandı",
  },
];

const pestLogs = [
  {
    id: 1,
    tarih: "10.03.2026",
    tur: "İlaçlama",
    alan: "Bodrum",
    firma: "PestPro A.Ş.",
    durum: "tamamlandı",
  },
  {
    id: 2,
    tarih: "05.03.2026",
    tur: "Tuzak",
    alan: "Otopark",
    firma: "PestPro A.Ş.",
    durum: "tamamlandı",
  },
  {
    id: 3,
    tarih: "01.03.2026",
    tur: "Önleyici",
    alan: "Ortak Koridor",
    firma: "HijyenMark",
    durum: "tamamlandı",
  },
  {
    id: 4,
    tarih: "28.02.2026",
    tur: "İlaçlama",
    alan: "Çatı",
    firma: "PestPro A.Ş.",
    durum: "tamamlandı",
  },
  {
    id: 5,
    tarih: "25.03.2026",
    tur: "İlaçlama",
    alan: "Bodrum",
    firma: "HijyenMark",
    durum: "planlandı",
  },
  {
    id: 6,
    tarih: "30.03.2026",
    tur: "Önleyici",
    alan: "Bahçe",
    firma: "PestPro A.Ş.",
    durum: "planlandı",
  },
];

const checklistItems = [
  {
    id: 1,
    kategori: "Genel Temizlik",
    item: "Koridorlar süpürülüp temizlendi",
    sonKontrol: "15.03.2026",
    sorumlu: "Temizlik Ekibi",
    checked: true,
  },
  {
    id: 2,
    kategori: "Genel Temizlik",
    item: "Cam ve pencereler silindi",
    sonKontrol: "14.03.2026",
    sorumlu: "Temizlik Ekibi",
    checked: true,
  },
  {
    id: 3,
    kategori: "Genel Temizlik",
    item: "Merdiven sahanlıkları temizlendi",
    sonKontrol: "15.03.2026",
    sorumlu: "Temizlik Ekibi",
    checked: true,
  },
  {
    id: 4,
    kategori: "Genel Temizlik",
    item: "Kapı kolları dezenfekte edildi",
    sonKontrol: "13.03.2026",
    sorumlu: "Temizlik Ekibi",
    checked: false,
  },
  {
    id: 5,
    kategori: "Genel Temizlik",
    item: "Bodrum kat temizlendi",
    sonKontrol: "10.03.2026",
    sorumlu: "Temizlik Ekibi",
    checked: false,
  },
  {
    id: 6,
    kategori: "Sanitasyon",
    item: "Çöp konteynerleri dezenfekte edildi",
    sonKontrol: "15.03.2026",
    sorumlu: "Teknik Personel",
    checked: true,
  },
  {
    id: 7,
    kategori: "Sanitasyon",
    item: "Atık su kanalları kontrol edildi",
    sonKontrol: "12.03.2026",
    sorumlu: "Teknik Personel",
    checked: true,
  },
  {
    id: 8,
    kategori: "Sanitasyon",
    item: "Su depoları temizlendi",
    sonKontrol: "01.03.2026",
    sorumlu: "Teknik Personel",
    checked: false,
  },
  {
    id: 9,
    kategori: "Sanitasyon",
    item: "Biyogüvenlik protokolleri uygulandı",
    sonKontrol: "10.03.2026",
    sorumlu: "Yönetim",
    checked: true,
  },
  {
    id: 10,
    kategori: "Sanitasyon",
    item: "Tuvalet ve lavabolar temizlendi",
    sonKontrol: "15.03.2026",
    sorumlu: "Temizlik Ekibi",
    checked: true,
  },
  {
    id: 11,
    kategori: "Haşere Önleme",
    item: "Haşere tuzakları kontrol edildi",
    sonKontrol: "14.03.2026",
    sorumlu: "PestPro A.Ş.",
    checked: true,
  },
  {
    id: 12,
    kategori: "Haşere Önleme",
    item: "Bodrum ilaçlama yapıldı",
    sonKontrol: "10.03.2026",
    sorumlu: "PestPro A.Ş.",
    checked: true,
  },
  {
    id: 13,
    kategori: "Haşere Önleme",
    item: "Giriş noktaları kapatıldı",
    sonKontrol: "08.03.2026",
    sorumlu: "Teknik Personel",
    checked: false,
  },
  {
    id: 14,
    kategori: "Haşere Önleme",
    item: "Çöp birikimleri engellendi",
    sonKontrol: "15.03.2026",
    sorumlu: "Temizlik Ekibi",
    checked: true,
  },
  {
    id: 15,
    kategori: "Haşere Önleme",
    item: "Sızdırmazlık kontrolleri yapıldı",
    sonKontrol: "05.03.2026",
    sorumlu: "Teknik Personel",
    checked: false,
  },
  {
    id: 16,
    kategori: "Havalandırma",
    item: "Hava kanalları temizlendi",
    sonKontrol: "01.03.2026",
    sorumlu: "Teknik Personel",
    checked: true,
  },
  {
    id: 17,
    kategori: "Havalandırma",
    item: "Filtreler değiştirildi",
    sonKontrol: "28.02.2026",
    sorumlu: "Teknik Personel",
    checked: false,
  },
  {
    id: 18,
    kategori: "Havalandırma",
    item: "Asansör makine dairesi havalandırıldı",
    sonKontrol: "10.03.2026",
    sorumlu: "Teknik Personel",
    checked: true,
  },
  {
    id: 19,
    kategori: "Havalandırma",
    item: "Garaj havalandırma sistemi kontrol edildi",
    sonKontrol: "12.03.2026",
    sorumlu: "Teknik Personel",
    checked: true,
  },
  {
    id: 20,
    kategori: "Havalandırma",
    item: "Koku giderici sistemler çalıştırıldı",
    sonKontrol: "14.03.2026",
    sorumlu: "Temizlik Ekibi",
    checked: false,
  },
];

const bulgular = [
  {
    id: 1,
    alan: "Otopark",
    aciklama: "Yağ lekeleri temizlenmemiş",
    seviye: "orta",
  },
  {
    id: 2,
    alan: "Bodrum",
    aciklama: "Rutubet ve küf oluşumu tespit edildi",
    seviye: "kritik",
  },
  { id: 3, alan: "Çatı", aciklama: "Atık birikmesi var", seviye: "orta" },
  { id: 4, alan: "Asansör", aciklama: "Tavan paneli kirli", seviye: "düşük" },
  { id: 5, alan: "Bodrum", aciklama: "Haşere izi mevcut", seviye: "kritik" },
];

function scoreColor(puan: number) {
  if (puan >= 90) return "text-green-600";
  if (puan >= 70) return "text-yellow-600";
  return "text-red-600";
}

function scoreBg(puan: number) {
  if (puan >= 90) return "bg-green-100 text-green-700";
  if (puan >= 70) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}

function durumBadge(durum: string) {
  if (durum === "tamamlandı")
    return <Badge className="bg-green-100 text-green-700">Tamamlandı</Badge>;
  if (durum === "devam ediyor")
    return <Badge className="bg-blue-100 text-blue-700">Devam Ediyor</Badge>;
  return <Badge className="bg-gray-100 text-gray-600">Planlandı</Badge>;
}

function seviyeBadge(seviye: string) {
  if (seviye === "kritik")
    return <Badge className="bg-red-100 text-red-700">Kritik</Badge>;
  if (seviye === "orta")
    return <Badge className="bg-yellow-100 text-yellow-700">Orta</Badge>;
  return <Badge className="bg-blue-100 text-blue-700">Düşük</Badge>;
}

export default function HealthHygieneInspection({
  buildingId: _buildingId,
}: Props) {
  const [alanFilter, setAlanFilter] = useState("Tümü");
  const [durumFilter, setDurumFilter] = useState("Tümü");
  const [checklist, setChecklist] = useState(checklistItems);
  const [showInspForm, setShowInspForm] = useState(false);
  const [showPestForm, setShowPestForm] = useState(false);

  const filteredInsp = inspections.filter((i) => {
    if (alanFilter !== "Tümü" && i.alan !== alanFilter) return false;
    if (durumFilter !== "Tümü" && i.durum !== durumFilter) return false;
    return true;
  });

  const alanScores: Record<string, number[]> = {};
  for (const i of inspections.filter((i) => i.puan > 0)) {
    if (!alanScores[i.alan]) alanScores[i.alan] = [];
    alanScores[i.alan].push(i.puan);
  }
  const alanAvg = Object.entries(alanScores).map(([alan, scores]) => ({
    alan,
    avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
  }));
  const genelSkor = Math.round(
    alanAvg.reduce((a, b) => a + b.avg, 0) / (alanAvg.length || 1),
  );
  const enIyi = alanAvg.sort((a, b) => b.avg - a.avg)[0];
  const enDusuk = [...alanAvg].sort((a, b) => a.avg - b.avg)[0];

  const completedCount = checklist.filter((c) => c.checked).length;
  const completionPct = Math.round((completedCount / checklist.length) * 100);
  const categories = Array.from(new Set(checklist.map((c) => c.kategori)));

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
          <ShieldCheck className="text-teal-600" size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Sağlık & Hijyen Denetimi
          </h1>
          <p className="text-sm text-gray-500">
            Bina hijyen takibi, denetim raporları ve haşere kontrolü
          </p>
        </div>
      </div>

      <Tabs defaultValue="denetimler">
        <TabsList className="mb-6">
          <TabsTrigger value="denetimler" data-ocid="health.denetimler.tab">
            Denetimler
          </TabsTrigger>
          <TabsTrigger value="skor" data-ocid="health.skor.tab">
            Sağlık Skoru
          </TabsTrigger>
          <TabsTrigger value="hasere" data-ocid="health.hasere.tab">
            Haşere Kontrol
          </TabsTrigger>
          <TabsTrigger value="liste" data-ocid="health.liste.tab">
            Kontrol Listesi
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Denetimler */}
        <TabsContent value="denetimler">
          <div className="flex flex-wrap gap-3 mb-4 items-center justify-between">
            <div className="flex gap-2">
              <Select value={alanFilter} onValueChange={setAlanFilter}>
                <SelectTrigger className="w-40" data-ocid="health.alan.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Tümü",
                    "Ortak Koridor",
                    "Asansör",
                    "Otopark",
                    "Bahçe",
                    "Çatı",
                    "Bodrum",
                  ].map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={durumFilter} onValueChange={setDurumFilter}>
                <SelectTrigger className="w-40" data-ocid="health.durum.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Tümü", "tamamlandı", "devam ediyor", "planlandı"].map(
                    (d) => (
                      <SelectItem key={d} value={d}>
                        {d.charAt(0).toUpperCase() + d.slice(1)}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
            <Dialog open={showInspForm} onOpenChange={setShowInspForm}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-teal-600 hover:bg-teal-700"
                  data-ocid="health.denetim.open_modal_button"
                >
                  <Plus size={14} className="mr-1" /> Yeni Denetim
                </Button>
              </DialogTrigger>
              <DialogContent data-ocid="health.denetim.dialog">
                <DialogHeader>
                  <DialogTitle>Yeni Denetim Ekle</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 py-2">
                  <div>
                    <Label>Alan</Label>
                    <Select>
                      <SelectTrigger data-ocid="health.denetim.alan.select">
                        <SelectValue placeholder="Alan seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Ortak Koridor",
                          "Asansör",
                          "Otopark",
                          "Bahçe",
                          "Çatı",
                          "Bodrum",
                        ].map((a) => (
                          <SelectItem key={a} value={a}>
                            {a}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Tarih</Label>
                    <Input type="date" data-ocid="health.denetim.tarih.input" />
                  </div>
                  <div>
                    <Label>Denetçi Adı</Label>
                    <Input
                      placeholder="Ad Soyad"
                      data-ocid="health.denetim.denetci.input"
                    />
                  </div>
                  <div>
                    <Label>Notlar</Label>
                    <Textarea
                      placeholder="Notlar..."
                      data-ocid="health.denetim.notlar.input"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowInspForm(false)}
                      data-ocid="health.denetim.cancel_button"
                    >
                      İptal
                    </Button>
                    <Button
                      onClick={() => setShowInspForm(false)}
                      className="bg-teal-600 hover:bg-teal-700"
                      data-ocid="health.denetim.submit_button"
                    >
                      Kaydet
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  {["Tarih", "Alan", "Denetçi", "Puan", "Durum"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-3 py-2 text-gray-600 font-medium"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredInsp.map((i, idx) => (
                  <tr
                    key={i.id}
                    className="border-b hover:bg-gray-50"
                    data-ocid={`health.denetim.item.${idx + 1}`}
                  >
                    <td className="px-3 py-2">{i.tarih}</td>
                    <td className="px-3 py-2">{i.alan}</td>
                    <td className="px-3 py-2">{i.denetci}</td>
                    <td className="px-3 py-2">
                      {i.puan > 0 ? (
                        <span className={`font-bold ${scoreColor(i.puan)}`}>
                          {i.puan}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2">{durumBadge(i.durum)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Tab 2: Sağlık Skoru */}
        <TabsContent value="skor">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card data-ocid="health.genel_skor.card">
              <CardContent className="pt-4 pb-3 text-center">
                <p className="text-xs text-gray-500 mb-1">Genel Bina Skoru</p>
                <p className={`text-4xl font-black ${scoreColor(genelSkor)}`}>
                  {genelSkor}
                </p>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${scoreBg(genelSkor)}`}
                >
                  {genelSkor >= 90
                    ? "Mükemmel"
                    : genelSkor >= 70
                      ? "İyi"
                      : "Düşük"}
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-3 text-center">
                <p className="text-xs text-gray-500 mb-1">En İyi Alan</p>
                <Star size={20} className="text-yellow-500 mx-auto mb-1" />
                <p className="font-semibold text-sm">{enIyi?.alan}</p>
                <p
                  className={`text-lg font-bold ${scoreColor(enIyi?.avg ?? 0)}`}
                >
                  {enIyi?.avg}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-3 text-center">
                <p className="text-xs text-gray-500 mb-1">En Düşük Alan</p>
                <AlertTriangle
                  size={20}
                  className="text-red-500 mx-auto mb-1"
                />
                <p className="font-semibold text-sm">{enDusuk?.alan}</p>
                <p
                  className={`text-lg font-bold ${scoreColor(enDusuk?.avg ?? 0)}`}
                >
                  {enDusuk?.avg}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-3 text-center">
                <p className="text-xs text-gray-500 mb-1">Son Denetim</p>
                <p className="font-bold text-gray-800 mt-3">15.03.2026</p>
                <p className="text-xs text-gray-400">Ortak Koridor</p>
              </CardContent>
            </Card>
          </div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-sm">Alan Bazlı Skor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alanAvg.map((a) => (
                  <div key={a.alan}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{a.alan}</span>
                      <span className={`font-bold ${scoreColor(a.avg)}`}>
                        {a.avg}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${a.avg >= 90 ? "bg-green-500" : a.avg >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                        style={{ width: `${a.avg}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Açık Bulgular</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {bulgular.map((b, idx) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                    data-ocid={`health.bulgu.item.${idx + 1}`}
                  >
                    <div>
                      <span className="font-medium text-sm">{b.alan}</span>
                      <p className="text-xs text-gray-500">{b.aciklama}</p>
                    </div>
                    {seviyeBadge(b.seviye)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Haşere Kontrol */}
        <TabsContent value="hasere">
          <div className="grid grid-cols-3 gap-4 mb-5">
            <Card>
              <CardContent className="pt-4 pb-3 text-center">
                <p className="text-xs text-gray-500 mb-1">Son İlaçlama</p>
                <p className="font-bold text-gray-800">10.03.2026</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-3 text-center">
                <p className="text-xs text-gray-500 mb-1">Planlanan Sonraki</p>
                <p className="font-bold text-gray-800">25.03.2026</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-3 text-center">
                <p className="text-xs text-gray-500 mb-1">Aktif Tuzak Sayısı</p>
                <p className="font-bold text-2xl text-teal-600">8</p>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-end mb-3">
            <Dialog open={showPestForm} onOpenChange={setShowPestForm}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-teal-600 hover:bg-teal-700"
                  data-ocid="health.pest.open_modal_button"
                >
                  <Plus size={14} className="mr-1" /> Yeni Kayıt
                </Button>
              </DialogTrigger>
              <DialogContent data-ocid="health.pest.dialog">
                <DialogHeader>
                  <DialogTitle>Haşere Kontrol Kaydı</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 py-2">
                  <div>
                    <Label>Uygulama Türü</Label>
                    <Select>
                      <SelectTrigger data-ocid="health.pest.tur.select">
                        <SelectValue placeholder="Seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {["İlaçlama", "Tuzak", "Önleyici"].map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Alan</Label>
                    <Input
                      placeholder="Alan"
                      data-ocid="health.pest.alan.input"
                    />
                  </div>
                  <div>
                    <Label>Firma</Label>
                    <Input
                      placeholder="Firma adı"
                      data-ocid="health.pest.firma.input"
                    />
                  </div>
                  <div>
                    <Label>Tarih</Label>
                    <Input type="date" data-ocid="health.pest.tarih.input" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowPestForm(false)}
                      data-ocid="health.pest.cancel_button"
                    >
                      İptal
                    </Button>
                    <Button
                      onClick={() => setShowPestForm(false)}
                      className="bg-teal-600 hover:bg-teal-700"
                      data-ocid="health.pest.submit_button"
                    >
                      Kaydet
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  {["Tarih", "Tür", "Alan", "Firma", "Durum"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-3 py-2 text-gray-600 font-medium"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pestLogs.map((p, idx) => (
                  <tr
                    key={p.id}
                    className="border-b hover:bg-gray-50"
                    data-ocid={`health.pest.item.${idx + 1}`}
                  >
                    <td className="px-3 py-2">{p.tarih}</td>
                    <td className="px-3 py-2">{p.tur}</td>
                    <td className="px-3 py-2">{p.alan}</td>
                    <td className="px-3 py-2">{p.firma}</td>
                    <td className="px-3 py-2">{durumBadge(p.durum)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Tab 4: Kontrol Listesi */}
        <TabsContent value="liste">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-black text-teal-600">
                {completionPct}%
              </span>
              <span className="text-sm text-gray-500 ml-2">
                tamamlandı ({completedCount}/{checklist.length})
              </span>
            </div>
            <div className="w-48 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-500 rounded-full transition-all"
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>
          <div className="space-y-5">
            {categories.map((kat) => (
              <Card key={kat}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{kat}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {checklist
                      .filter((c) => c.kategori === kat)
                      .map((c, idx) => (
                        <div
                          key={c.id}
                          className="flex items-start gap-3 py-1.5 border-b last:border-0"
                          data-ocid={`health.checklist.item.${idx + 1}`}
                        >
                          <Checkbox
                            checked={c.checked}
                            onCheckedChange={(v) =>
                              setChecklist((prev) =>
                                prev.map((x) =>
                                  x.id === c.id ? { ...x, checked: !!v } : x,
                                ),
                              )
                            }
                            data-ocid={`health.checklist.checkbox.${idx + 1}`}
                          />
                          <div className="flex-1">
                            <p
                              className={`text-sm ${c.checked ? "line-through text-gray-400" : "text-gray-800"}`}
                            >
                              {c.item}
                            </p>
                            <p className="text-xs text-gray-400">
                              {c.sorumlu} · Son: {c.sonKontrol}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
