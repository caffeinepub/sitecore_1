import { Edit2, Plus, Search, Trash2 } from "lucide-react";
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
import { Switch } from "../components/ui/switch";
import { Textarea } from "../components/ui/textarea";

const CATS = [
  "Hepsi",
  "Gürültü",
  "Evcil Hayvan",
  "Otopark",
  "Temizlik",
  "Genel",
];

const catColors: Record<string, string> = {
  Gürültü:
    "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  "Evcil Hayvan":
    "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  Otopark: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Temizlik:
    "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  Genel: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

interface Rule {
  id: string;
  num: number;
  title: string;
  desc: string;
  category: string;
  active: boolean;
}

const initialRules: Rule[] = [
  {
    id: "1",
    num: 1,
    title: "Gece Sessizlik Saatleri",
    desc: "22:00 - 08:00 saatleri arasında müzik aleti çalmak, yüksek sesle konuşmak ve gürültülü aktiviteler yasaktır.",
    category: "Gürültü",
    active: true,
  },
  {
    id: "2",
    num: 2,
    title: "Evcil Hayvan Tasması",
    desc: "Köpekler ortak alanlarda daima tasmalı ve gözetim altında bulundurulmalıdır. Dışkı temizlenmesi zorunludur.",
    category: "Evcil Hayvan",
    active: true,
  },
  {
    id: "3",
    num: 3,
    title: "Otopark Kullanım Kuralları",
    desc: "Her daire yalnızca kendine tahsis edilen park alanını kullanabilir. Misafir araçları için yöneticiden izin alınmalıdır.",
    category: "Otopark",
    active: true,
  },
  {
    id: "4",
    num: 4,
    title: "Ortak Alan Temizliği",
    desc: "Merdiven, asansör ve giriş holüne çöp ve eşya bırakmak yasaktır. Bina saatleri dışında çöp atılmamalıdır.",
    category: "Temizlik",
    active: true,
  },
  {
    id: "5",
    num: 5,
    title: "Yangın Merdivenlerini Açık Tutma",
    desc: "Yangın merdivenleri ve acil çıkış yollarına eşya bırakılması kesinlikle yasaktır.",
    category: "Genel",
    active: true,
  },
  {
    id: "6",
    num: 6,
    title: "Tadilat Saatleri",
    desc: "Daire tadilatları yalnızca hafta içi 09:00-18:00 saatleri arasında yapılabilir. Hafta sonu ve resmi tatillerde yasaktır.",
    category: "Gürültü",
    active: true,
  },
  {
    id: "7",
    num: 7,
    title: "Çamaşır Serme",
    desc: "Balkon dışından görünecek şekilde pencere veya çatıya çamaşır sermek yasaktır.",
    category: "Genel",
    active: false,
  },
  {
    id: "8",
    num: 8,
    title: "Ziyaretçi Araç Parkı",
    desc: "Ziyaretçi araçları en fazla 24 saat park edebilir. Uzun süreli park için yönetici onayı gereklidir.",
    category: "Otopark",
    active: true,
  },
  {
    id: "9",
    num: 9,
    title: "Asansör Kullanımı",
    desc: "Asansör içinde sigara içmek, hasar vermek ve çocukları yalnız bırakmak yasaktır. Kargo taşımacılığı için servis asansörü kullanılmalıdır.",
    category: "Genel",
    active: true,
  },
  {
    id: "10",
    num: 10,
    title: "Koku Yönetimi",
    desc: "Güçlü koku yayan yemek veya aktiviteler için havalandırmaya dikkat edilmeli, komşuları rahatsız edecek durumlardan kaçınılmalıdır.",
    category: "Genel",
    active: false,
  },
];

export default function BuildingRules(_props: {
  buildingId?: string;
  userId?: string;
  isOwner?: boolean;
  t?: unknown;
}) {
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("Hepsi");
  const [statusFilter, setStatusFilter] = useState("Hepsi");
  const [open, setOpen] = useState(false);
  const [editRule, setEditRule] = useState<Rule | null>(null);
  const [form, setForm] = useState({ title: "", desc: "", category: "" });

  const toggleActive = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)),
    );
  };

  const deleteRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  const openAdd = () => {
    setEditRule(null);
    setForm({ title: "", desc: "", category: "" });
    setOpen(true);
  };

  const openEdit = (rule: Rule) => {
    setEditRule(rule);
    setForm({ title: rule.title, desc: rule.desc, category: rule.category });
    setOpen(true);
  };

  const save = () => {
    if (!form.title || !form.category) return;
    if (editRule) {
      setRules((prev) =>
        prev.map((r) => (r.id === editRule.id ? { ...r, ...form } : r)),
      );
    } else {
      const maxNum = Math.max(...rules.map((r) => r.num), 0);
      setRules((prev) => [
        ...prev,
        { id: Date.now().toString(), num: maxNum + 1, ...form, active: true },
      ]);
    }
    setOpen(false);
  };

  const filtered = rules.filter((r) => {
    const matchSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "Hepsi" || r.category === catFilter;
    const matchStatus =
      statusFilter === "Hepsi" ||
      (statusFilter === "Aktif" ? r.active : !r.active);
    return matchSearch && matchCat && matchStatus;
  });

  const activeCount = rules.filter((r) => r.active).length;
  const inactiveCount = rules.length - activeCount;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bina Kuralları & Yönetmelik</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Apartman kuralları ve sakin yükümlülükleri
          </p>
        </div>
        <Button
          data-ocid="rules.open_modal_button"
          className="gap-2"
          onClick={openAdd}
        >
          <Plus className="w-4 h-4" /> Kural Ekle
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-5">
            <p className="text-muted-foreground text-sm">Toplam Kural</p>
            <p className="text-3xl font-bold">{rules.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-muted-foreground text-sm">Aktif</p>
            <p className="text-3xl font-bold text-green-600">{activeCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-muted-foreground text-sm">Pasif</p>
            <p className="text-3xl font-bold text-muted-foreground">
              {inactiveCount}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          <Input
            data-ocid="rules.search_input"
            className="pl-9"
            placeholder="Kural ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger data-ocid="rules.cat_filter.select" className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATS.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger
            data-ocid="rules.status_filter.select"
            className="w-36"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Hepsi">Hepsi</SelectItem>
            <SelectItem value="Aktif">Aktif</SelectItem>
            <SelectItem value="Pasif">Pasif</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rules List */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div
            data-ocid="rules.empty_state"
            className="text-center py-16 text-muted-foreground"
          >
            Kural bulunamadı.
          </div>
        )}
        {filtered.map((rule, idx) => (
          <Card
            key={rule.id}
            data-ocid={`rules.item.${idx + 1}`}
            className={!rule.active ? "opacity-60" : ""}
          >
            <CardContent className="pt-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                  {rule.num}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center flex-wrap gap-2">
                    <p className="font-semibold">{rule.title}</p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${catColors[rule.category] || catColors.Genel}`}
                    >
                      {rule.category}
                    </span>
                    {!rule.active && (
                      <Badge variant="outline" className="text-xs">
                        Pasif
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{rule.desc}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Switch
                    checked={rule.active}
                    onCheckedChange={() => toggleActive(rule.id)}
                    data-ocid={`rules.switch.${idx + 1}`}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEdit(rule)}
                    data-ocid={`rules.edit_button.${idx + 1}`}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => deleteRule(rule.id)}
                    data-ocid={`rules.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editRule ? "Kuralı Düzenle" : "Yeni Kural Ekle"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <Label>Kural Başlığı</Label>
              <Input
                data-ocid="rules.title.input"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Örn: Gece Sessizlik Saatleri"
              />
            </div>
            <div className="space-y-1">
              <Label>Açıklama</Label>
              <Textarea
                data-ocid="rules.desc.textarea"
                value={form.desc}
                onChange={(e) =>
                  setForm((f) => ({ ...f, desc: e.target.value }))
                }
                placeholder="Kural detayı..."
                rows={4}
              />
            </div>
            <div className="space-y-1">
              <Label>Kategori</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
              >
                <SelectTrigger data-ocid="rules.category.select">
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  {CATS.slice(1).map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              İptal
            </Button>
            <Button data-ocid="rules.submit_button" onClick={save}>
              {editRule ? "Güncelle" : "Ekle"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
