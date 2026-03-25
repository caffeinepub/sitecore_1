import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Clock,
  FileCheck,
  Plus,
  TrendingDown,
} from "lucide-react";
import { useState } from "react";

interface RepairQuoteManagementProps {
  buildingId: string;
  isOwner: boolean;
  t: any;
}

type QuoteStatus =
  | "Taslak"
  | "Teklifler Bekleniyor"
  | "Değerlendirme"
  | "Tamamlandı";

interface QuoteRequest {
  id: string;
  title: string;
  category: string;
  status: QuoteStatus;
  requestDate: string;
  deadline: string;
  quoteCount: number;
  budget: number;
}

interface Quote {
  id: string;
  requestId: string;
  company: string;
  amount: number;
  duration: number;
  notes: string;
  status: "Bekliyor" | "Kabul Edildi" | "Reddedildi";
  score: number;
}

const mockRequests: QuoteRequest[] = [
  {
    id: "1",
    title: "Çatı Su Yalıtımı Tamiri",
    category: "Genel",
    status: "Değerlendirme",
    requestDate: "2026-03-01",
    deadline: "2026-03-20",
    quoteCount: 3,
    budget: 45000,
  },
  {
    id: "2",
    title: "Asansör Elektrik Panosu Değişimi",
    category: "Elektrik",
    status: "Teklifler Bekleniyor",
    requestDate: "2026-03-05",
    deadline: "2026-03-25",
    quoteCount: 2,
    budget: 30000,
  },
  {
    id: "3",
    title: "Bodrum Kat Boya Badana",
    category: "Boya",
    status: "Tamamlandı",
    requestDate: "2026-02-10",
    deadline: "2026-02-28",
    quoteCount: 3,
    budget: 15000,
  },
  {
    id: "4",
    title: "Ana Su Hattı Onarımı",
    category: "Su Tesisatı",
    status: "Teklifler Bekleniyor",
    requestDate: "2026-03-10",
    deadline: "2026-03-30",
    quoteCount: 1,
    budget: 20000,
  },
  {
    id: "5",
    title: "Giriş Kapısı Otomatik Sistem",
    category: "Elektrik",
    status: "Taslak",
    requestDate: "2026-03-15",
    deadline: "2026-04-05",
    quoteCount: 0,
    budget: 12000,
  },
];

const mockQuotes: Quote[] = [
  {
    id: "q1",
    requestId: "1",
    company: "Yıldız Yapı A.Ş.",
    amount: 38500,
    duration: 7,
    notes: "Malzeme dahil, 2 yıl garanti",
    status: "Kabul Edildi",
    score: 92,
  },
  {
    id: "q2",
    requestId: "1",
    company: "Güvenli İnşaat Ltd.",
    amount: 42000,
    duration: 5,
    notes: "Premium malzeme kullanılacak",
    status: "Reddedildi",
    score: 78,
  },
  {
    id: "q3",
    requestId: "1",
    company: "Ekonomik Yapı Hiz.",
    amount: 35000,
    duration: 10,
    notes: "Standart malzeme, 1 yıl garanti",
    status: "Bekliyor",
    score: 65,
  },
  {
    id: "q4",
    requestId: "2",
    company: "Elektro Teknik A.Ş.",
    amount: 28000,
    duration: 3,
    notes: "Siemens marka panel, CE belgeli",
    status: "Bekliyor",
    score: 88,
  },
  {
    id: "q5",
    requestId: "2",
    company: "Güç Sistemleri Ltd.",
    amount: 31500,
    duration: 2,
    notes: "Acil müdahale kapasitesi mevcut",
    status: "Bekliyor",
    score: 82,
  },
  {
    id: "q6",
    requestId: "3",
    company: "Boya Usta Hiz.",
    amount: 12800,
    duration: 4,
    notes: "Dış cephe boyası dahil",
    status: "Kabul Edildi",
    score: 90,
  },
  {
    id: "q7",
    requestId: "3",
    company: "Renkli Yapı",
    amount: 14500,
    duration: 3,
    notes: "Eco-friendly boyalar kullanılır",
    status: "Reddedildi",
    score: 74,
  },
  {
    id: "q8",
    requestId: "3",
    company: "Temiz Boya Ltd.",
    amount: 13200,
    duration: 5,
    notes: "2 kat boya uygulanacak",
    status: "Reddedildi",
    score: 68,
  },
  {
    id: "q9",
    requestId: "4",
    company: "Su Teknik Grup",
    amount: 18500,
    duration: 2,
    notes: "Acil müdahale, 24 saat servis",
    status: "Bekliyor",
    score: 85,
  },
];

const statusConfig: Record<QuoteStatus, { label: string; color: string }> = {
  Taslak: { label: "Taslak", color: "bg-gray-100 text-gray-700" },
  "Teklifler Bekleniyor": {
    label: "Bekleniyor",
    color: "bg-yellow-100 text-yellow-700",
  },
  Değerlendirme: { label: "Değerlendirme", color: "bg-blue-100 text-blue-700" },
  Tamamlandı: { label: "Tamamlandı", color: "bg-green-100 text-green-700" },
};

const quoteStatusConfig = {
  Bekliyor: "bg-yellow-100 text-yellow-700",
  "Kabul Edildi": "bg-green-100 text-green-700",
  Reddedildi: "bg-red-100 text-red-700",
};

export default function RepairQuoteManagement({
  isOwner,
}: RepairQuoteManagementProps) {
  const [requests, setRequests] = useState<QuoteRequest[]>(mockRequests);
  const [quotes] = useState<Quote[]>(mockQuotes);
  const [selectedRequestId, setSelectedRequestId] = useState<string>("1");
  const [showNewModal, setShowNewModal] = useState(false);
  const [newForm, setNewForm] = useState({
    title: "",
    category: "Genel",
    budget: "",
    description: "",
    deadline: "",
  });

  const active = requests.filter((r) => r.status !== "Tamamlandı").length;
  const evaluating = requests.filter(
    (r) => r.status === "Değerlendirme",
  ).length;
  const completed = requests.filter((r) => r.status === "Tamamlandı").length;
  const allAmounts = quotes.map((q) => q.amount);
  const avgAmount = allAmounts.length
    ? Math.round(allAmounts.reduce((a, b) => a + b, 0) / allAmounts.length)
    : 0;

  const selectedQuotes = quotes.filter(
    (q) => q.requestId === selectedRequestId,
  );
  const minAmount = Math.min(...selectedQuotes.map((q) => q.amount));

  function handleAddRequest() {
    if (!newForm.title) return;
    const newReq: QuoteRequest = {
      id: String(Date.now()),
      title: newForm.title,
      category: newForm.category,
      status: "Taslak",
      requestDate: new Date().toISOString().split("T")[0],
      deadline: newForm.deadline || "2026-04-30",
      quoteCount: 0,
      budget: Number(newForm.budget) || 0,
    };
    setRequests((prev) => [newReq, ...prev]);
    setShowNewModal(false);
    setNewForm({
      title: "",
      category: "Genel",
      budget: "",
      description: "",
      deadline: "",
    });
  }

  return (
    <div className="space-y-6" data-ocid="repair_quotes.page">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Aktif Talepler</p>
                <p className="text-2xl font-bold text-slate-800">{active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Değerlendirmedeki</p>
                <p className="text-2xl font-bold text-slate-800">
                  {evaluating}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Tamamlanan</p>
                <p className="text-2xl font-bold text-slate-800">{completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Ort. Teklif Tutarı</p>
                <p className="text-xl font-bold text-slate-800">
                  {avgAmount.toLocaleString("tr-TR")} ₺
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requests">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="requests" data-ocid="repair_quotes.tab">
            Talepler
          </TabsTrigger>
          <TabsTrigger value="quotes" data-ocid="repair_quotes.tab">
            Teklifler
          </TabsTrigger>
          <TabsTrigger value="comparison" data-ocid="repair_quotes.tab">
            Karşılaştırma
          </TabsTrigger>
        </TabsList>

        {/* Requests Tab */}
        <TabsContent value="requests">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">Teklif Talepleri</CardTitle>
              {isOwner && (
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setShowNewModal(true)}
                  data-ocid="repair_quotes.open_modal_button"
                >
                  <Plus className="w-4 h-4 mr-1" /> Yeni Talep
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>İş Tanımı</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Talep Tarihi</TableHead>
                    <TableHead>Son Teklif</TableHead>
                    <TableHead>Teklif Sayısı</TableHead>
                    <TableHead>Bütçe</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((req, i) => (
                    <TableRow
                      key={req.id}
                      data-ocid={`repair_quotes.item.${i + 1}`}
                    >
                      <TableCell className="font-medium">{req.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{req.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[req.status].color}`}
                        >
                          {statusConfig[req.status].label}
                        </span>
                      </TableCell>
                      <TableCell>{req.requestDate}</TableCell>
                      <TableCell>{req.deadline}</TableCell>
                      <TableCell>
                        <span className="font-semibold text-blue-600">
                          {req.quoteCount}
                        </span>
                      </TableCell>
                      <TableCell>
                        {req.budget.toLocaleString("tr-TR")} ₺
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quotes Tab */}
        <TabsContent value="quotes">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-4">
                <CardTitle className="text-base">
                  Tedarikçi Teklifleri
                </CardTitle>
                <Select
                  value={selectedRequestId}
                  onValueChange={setSelectedRequestId}
                >
                  <SelectTrigger
                    className="w-72"
                    data-ocid="repair_quotes.select"
                  >
                    <SelectValue placeholder="Talep seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {requests.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Firma Adı</TableHead>
                    <TableHead>Teklif Tutarı</TableHead>
                    <TableHead>Süre (Gün)</TableHead>
                    <TableHead>Notlar</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>İşlem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedQuotes.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-slate-400 py-8"
                        data-ocid="repair_quotes.empty_state"
                      >
                        Bu talep için henüz teklif bulunmuyor
                      </TableCell>
                    </TableRow>
                  ) : (
                    selectedQuotes.map((q, i) => (
                      <TableRow
                        key={q.id}
                        data-ocid={`repair_quotes.item.${i + 1}`}
                      >
                        <TableCell className="font-medium">
                          {q.company}
                        </TableCell>
                        <TableCell className="font-semibold text-slate-800">
                          {q.amount.toLocaleString("tr-TR")} ₺
                        </TableCell>
                        <TableCell>{q.duration} gün</TableCell>
                        <TableCell className="text-sm text-slate-600 max-w-xs">
                          {q.notes}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${quoteStatusConfig[q.status]}`}
                          >
                            {q.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {q.status === "Bekliyor" && isOwner && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-300 hover:bg-green-50"
                              data-ocid="repair_quotes.confirm_button"
                            >
                              Kabul Et
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="comparison">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-4">
                <CardTitle className="text-base">
                  Teklif Karşılaştırması
                </CardTitle>
                <Select
                  value={selectedRequestId}
                  onValueChange={setSelectedRequestId}
                >
                  <SelectTrigger
                    className="w-72"
                    data-ocid="repair_quotes.select"
                  >
                    <SelectValue placeholder="Talep seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {requests.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {selectedQuotes.length === 0 ? (
                <div
                  className="text-center text-slate-400 py-12"
                  data-ocid="repair_quotes.empty_state"
                >
                  Bu talep için karşılaştırılacak teklif bulunmuyor
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Firma</TableHead>
                      <TableHead>Teklif Tutarı</TableHead>
                      <TableHead>Süre</TableHead>
                      <TableHead>Puan</TableHead>
                      <TableHead>Not</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedQuotes
                      .sort((a, b) => a.amount - b.amount)
                      .map((q, i) => (
                        <TableRow
                          key={q.id}
                          className={
                            q.amount === minAmount ? "bg-green-50" : ""
                          }
                          data-ocid={`repair_quotes.row.${i + 1}`}
                        >
                          <TableCell className="font-medium">
                            {q.company}
                            {q.amount === minAmount && (
                              <Badge className="ml-2 bg-green-100 text-green-700 border-0 text-xs">
                                En Düşük
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell
                            className={`font-semibold ${q.amount === minAmount ? "text-green-700" : "text-slate-800"}`}
                          >
                            {q.amount.toLocaleString("tr-TR")} ₺
                          </TableCell>
                          <TableCell>{q.duration} gün</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500 rounded-full"
                                  style={{ width: `${q.score}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">
                                {q.score}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-slate-600">
                            {q.notes}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Request Modal */}
      <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
        <DialogContent className="max-w-md" data-ocid="repair_quotes.dialog">
          <DialogHeader>
            <DialogTitle>Yeni Teklif Talebi</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>İş Tanımı</Label>
              <Input
                placeholder="Yapılacak iş açıklaması"
                value={newForm.title}
                onChange={(e) =>
                  setNewForm((p) => ({ ...p, title: e.target.value }))
                }
                data-ocid="repair_quotes.input"
              />
            </div>
            <div>
              <Label>Kategori</Label>
              <Select
                value={newForm.category}
                onValueChange={(v) =>
                  setNewForm((p) => ({ ...p, category: v }))
                }
              >
                <SelectTrigger data-ocid="repair_quotes.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Elektrik">Elektrik</SelectItem>
                  <SelectItem value="Boya">Boya</SelectItem>
                  <SelectItem value="Su Tesisatı">Su Tesisatı</SelectItem>
                  <SelectItem value="Genel">Genel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Bütçe Üst Limiti (₺)</Label>
              <Input
                type="number"
                placeholder="50000"
                value={newForm.budget}
                onChange={(e) =>
                  setNewForm((p) => ({ ...p, budget: e.target.value }))
                }
                data-ocid="repair_quotes.input"
              />
            </div>
            <div>
              <Label>Son Teklif Tarihi</Label>
              <Input
                type="date"
                value={newForm.deadline}
                onChange={(e) =>
                  setNewForm((p) => ({ ...p, deadline: e.target.value }))
                }
                data-ocid="repair_quotes.input"
              />
            </div>
            <div>
              <Label>Açıklama</Label>
              <Textarea
                placeholder="Ek detaylar..."
                value={newForm.description}
                onChange={(e) =>
                  setNewForm((p) => ({ ...p, description: e.target.value }))
                }
                data-ocid="repair_quotes.textarea"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowNewModal(false)}
                data-ocid="repair_quotes.cancel_button"
              >
                İptal
              </Button>
              <Button
                onClick={handleAddRequest}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                data-ocid="repair_quotes.submit_button"
              >
                Talep Oluştur
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
