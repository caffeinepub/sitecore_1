import { MessageCircle, Package, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";

const CATEGORIES = [
  "Hepsi",
  "Elektronik",
  "Kıyafet",
  "Anahtar",
  "Evrak",
  "Diğer",
];
const STATUS_FILTER = ["Hepsi", "Aranıyor", "Bulundu", "Teslim Edildi"];

interface Item {
  id: string;
  type: "kayıp" | "buluntu";
  title: string;
  category: string;
  status: "Aranıyor" | "Bulundu" | "Teslim Edildi";
  date: string;
  owner: string;
  contact: string;
  desc: string;
}

const initialItems: Item[] = [
  {
    id: "1",
    type: "kayıp",
    title: "Siyah iPhone 14",
    category: "Elektronik",
    status: "Aranıyor",
    date: "2025-03-15",
    owner: "Daire 12 - A. Yılmaz",
    contact: "0532 111 22 33",
    desc: "Giriş holünde unutmuş olabilirim, siyah kılıflı.",
  },
  {
    id: "2",
    type: "buluntu",
    title: "Apartman Anahtarı",
    category: "Anahtar",
    status: "Bulundu",
    date: "2025-03-14",
    owner: "Daire 7 - F. Demir",
    contact: "0541 222 33 44",
    desc: "Asansör önünde bulundu, 3 anahtarlık.",
  },
  {
    id: "3",
    type: "kayıp",
    title: "Mavi Şemsiye",
    category: "Diğer",
    status: "Teslim Edildi",
    date: "2025-03-10",
    owner: "Daire 22 - M. Kaya",
    contact: "0555 333 44 55",
    desc: "Çatı katında unutulmuş olabilir.",
  },
  {
    id: "4",
    type: "buluntu",
    title: "Çocuk Montu",
    category: "Kıyafet",
    status: "Aranıyor",
    date: "2025-03-18",
    owner: "Yönetici",
    contact: "0500 000 00 01",
    desc: "5-6 yaş, kırmızı renkli mont. Bahçede bulundu.",
  },
  {
    id: "5",
    type: "kayıp",
    title: "Nüfus Cüzdanı",
    category: "Evrak",
    status: "Bulundu",
    date: "2025-03-17",
    owner: "Daire 18 - Z. Arslan",
    contact: "0533 444 55 66",
    desc: "Posta kutusunda unutulmuş olabilir.",
  },
  {
    id: "6",
    type: "buluntu",
    title: "Kablosuz Kulaklık",
    category: "Elektronik",
    status: "Aranıyor",
    date: "2025-03-19",
    owner: "Daire 5 - H. Çelik",
    contact: "0544 555 66 77",
    desc: "Spor salonunda bulundu, beyaz AirPods.",
  },
];

const statusConfig: Record<string, { label: string; class: string }> = {
  Aranıyor: {
    label: "Aranıyor",
    class:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  Bulundu: {
    label: "Bulundu",
    class: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  "Teslim Edildi": {
    label: "Teslim Edildi",
    class: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  },
};

export default function LostFound(_props: {
  buildingId?: string;
  userId?: string;
  isOwnerOrManager?: boolean;
  t?: unknown;
}) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("Hepsi");
  const [statusFilter, setStatusFilter] = useState("Hepsi");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    type: "kayıp",
    title: "",
    category: "",
    desc: "",
    contact: "",
    owner: "",
  });

  const filtered = items.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "Hepsi" || item.category === catFilter;
    const matchStatus =
      statusFilter === "Hepsi" || item.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  const activeCount = items.filter((i) => i.status === "Aranıyor").length;
  const thisMonthSolved = items.filter(
    (i) => i.status === "Teslim Edildi",
  ).length;

  const addItem = () => {
    if (!form.title || !form.category || !form.contact) return;
    setItems((prev) => [
      {
        id: Date.now().toString(),
        type: form.type as "kayıp" | "buluntu",
        title: form.title,
        category: form.category,
        status: "Aranıyor",
        date: new Date().toISOString().split("T")[0],
        owner: form.owner || "Anonim",
        contact: form.contact,
        desc: form.desc,
      },
      ...prev,
    ]);
    setForm({
      type: "kayıp",
      title: "",
      category: "",
      desc: "",
      contact: "",
      owner: "",
    });
    setOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kayıp & Buluntu</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Bina içi kayıp ve buluntu ilanları
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-ocid="lostfound.open_modal_button" className="gap-2">
              <Plus className="w-4 h-4" /> Yeni İlan Ekle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni İlan Ekle</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1">
                <Label>İlan Türü</Label>
                <Select
                  value={form.type}
                  onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}
                >
                  <SelectTrigger data-ocid="lostfound.type.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kayıp">🔍 Kayıp (kaybettim)</SelectItem>
                    <SelectItem value="buluntu">📦 Buluntu (buldum)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Başlık</Label>
                <Input
                  data-ocid="lostfound.title.input"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="Örn: Siyah iPhone 14"
                />
              </div>
              <div className="space-y-1">
                <Label>Kategori</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
                >
                  <SelectTrigger data-ocid="lostfound.category.select">
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.slice(1).map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Açıklama</Label>
                <Textarea
                  data-ocid="lostfound.desc.textarea"
                  value={form.desc}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, desc: e.target.value }))
                  }
                  placeholder="Detaylı açıklama..."
                  rows={3}
                />
              </div>
              <div className="space-y-1">
                <Label>İletişim Bilgisi</Label>
                <Input
                  data-ocid="lostfound.contact.input"
                  value={form.contact}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, contact: e.target.value }))
                  }
                  placeholder="Telefon veya daire no"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                İptal
              </Button>
              <Button data-ocid="lostfound.submit_button" onClick={addItem}>
                İlan Yayınla
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-5 flex items-center gap-3">
            <Package className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold">{activeCount}</p>
              <p className="text-sm text-muted-foreground">Aktif İlan</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold">{thisMonthSolved}</p>
              <p className="text-sm text-muted-foreground">Bu Ay Çözülen</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          <Input
            data-ocid="lostfound.search_input"
            className="pl-9"
            placeholder="İlan ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger
            data-ocid="lostfound.cat_filter.select"
            className="w-40"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger
            data-ocid="lostfound.status_filter.select"
            className="w-40"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_FILTER.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Items Grid */}
      {filtered.length === 0 ? (
        <div
          data-ocid="lostfound.empty_state"
          className="text-center py-16 text-muted-foreground"
        >
          <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Arama kriterlerine uyan ilan bulunamadı.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, idx) => (
            <Card
              key={item.id}
              data-ocid={`lostfound.item.${idx + 1}`}
              className="overflow-hidden"
            >
              <div
                className={`h-2 ${item.type === "kayıp" ? "bg-red-400" : "bg-blue-400"}`}
              />
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.date} · {item.owner}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${statusConfig[item.status].class}`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs ${item.type === "kayıp" ? "border-red-300 text-red-600" : "border-blue-300 text-blue-600"}`}
                  >
                    {item.type === "kayıp" ? "Kayıp" : "Buluntu"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.desc}
                </p>
                <a href={`tel:${item.contact}`} className="block">
                  <Button
                    data-ocid={`lostfound.contact.button.${idx + 1}`}
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> {item.contact}
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
