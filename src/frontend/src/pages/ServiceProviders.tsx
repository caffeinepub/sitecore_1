import { AlertTriangle, Phone, Plus, Star, X } from "lucide-react";
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

const CATEGORIES = [
  "Tümü",
  "Tesisatçı",
  "Elektrikçi",
  "Temizlik",
  "Asansör Bakım",
  "Güvenlik",
  "Peyzaj",
  "Çilingir",
  "Boyacı",
  "Diğer",
];

interface WorkRecord {
  id: string;
  date: string;
  description: string;
}
interface Provider {
  id: string;
  name: string;
  category: string;
  phone: string;
  email: string;
  notes: string;
  rating: number;
  ratingCount: number;
  workHistory: WorkRecord[];
  lastCallDate?: string;
}

const DEFAULT_PROVIDERS: Provider[] = [
  {
    id: "1",
    name: "Yılmaz Tesisat",
    category: "Tesisatçı",
    phone: "0532 111 22 33",
    email: "",
    notes: "7/24 acil servis mevcut",
    rating: 4,
    ratingCount: 5,
    workHistory: [
      {
        id: "w1",
        date: "2026-02-10",
        description: "Bodrum katta su borusu tamiri",
      },
    ],
    lastCallDate: "2026-02-10",
  },
  {
    id: "2",
    name: "Parlak Elektrik",
    category: "Elektrikçi",
    phone: "0542 333 44 55",
    email: "",
    notes: "",
    rating: 5,
    ratingCount: 3,
    workHistory: [],
    lastCallDate: "2025-08-15",
  },
  {
    id: "3",
    name: "Güneş Temizlik",
    category: "Temizlik",
    phone: "0212 555 66 77",
    email: "",
    notes: "Haftalık ortak alan temizliği yapıyor",
    rating: 4,
    ratingCount: 8,
    workHistory: [],
    lastCallDate: "2026-03-01",
  },
];

export default function ServiceProviders({
  buildingId,
  isOwner,
}: { buildingId: string; userId: string; isOwner: boolean; t: any }) {
  const key = `sitecore_service_providers_${buildingId}`;
  const load = (): Provider[] => {
    try {
      const d = localStorage.getItem(key);
      return d ? JSON.parse(d) : DEFAULT_PROVIDERS;
    } catch {
      return DEFAULT_PROVIDERS;
    }
  };
  const [items, setItems] = useState<Provider[]>(load);
  const [filter, setFilter] = useState("Tümü");
  const [showAdd, setShowAdd] = useState(false);
  const [showDetail, setShowDetail] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "Tesisatçı",
    phone: "",
    email: "",
    notes: "",
    lastCallDate: "",
  });
  const [workForm, setWorkForm] = useState({ date: "", description: "" });

  const save = (data: Provider[]) => {
    setItems(data);
    localStorage.setItem(key, JSON.stringify(data));
  };

  const filtered =
    filter === "Tümü" ? items : items.filter((p) => p.category === filter);
  const detail = items.find((p) => p.id === showDetail);

  const handleAdd = () => {
    if (!form.name.trim()) return;
    save([
      ...items,
      {
        id: Date.now().toString(),
        ...form,
        rating: 0,
        ratingCount: 0,
        workHistory: [],
      },
    ]);
    setShowAdd(false);
    setForm({
      name: "",
      category: "Tesisatçı",
      phone: "",
      email: "",
      notes: "",
      lastCallDate: "",
    });
  };

  const handleRate = (id: string, stars: number) => {
    const updated = items.map((p) =>
      p.id !== id
        ? p
        : {
            ...p,
            rating: Math.round(
              (p.rating * p.ratingCount + stars) / (p.ratingCount + 1),
            ),
            ratingCount: p.ratingCount + 1,
          },
    );
    save(updated);
  };

  const handleAddWork = (id: string) => {
    if (!workForm.date || !workForm.description) return;
    const updated = items.map((p) =>
      p.id !== id
        ? p
        : {
            ...p,
            workHistory: [
              { id: Date.now().toString(), ...workForm },
              ...p.workHistory,
            ],
            lastCallDate: workForm.date,
          },
    );
    save(updated);
    setWorkForm({ date: "", description: "" });
  };

  const handleDelete = (id: string) => save(items.filter((p) => p.id !== id));

  const isOldContact = (lastCallDate?: string) => {
    if (!lastCallDate) return false;
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return new Date(lastCallDate) < sixMonthsAgo;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0E1116]">
          Tedarikçi & Hizmet Rehberi
        </h2>
        {isOwner && (
          <Button
            onClick={() => setShowAdd(true)}
            className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2"
          >
            <Plus className="w-4 h-4" />
            Tedarikçi Ekle
          </Button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-[#0B1B2E]">{items.length}</p>
          <p className="text-sm text-[#3A4654] mt-1">Toplam Tedarikçi</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-yellow-500">
            {items.filter((p) => p.rating >= 4).length}
          </p>
          <p className="text-sm text-[#3A4654] mt-1">Yüksek Puanlı</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-[#4A90D9]">
            {[...new Set(items.map((p) => p.category))].length}
          </p>
          <p className="text-sm text-[#3A4654] mt-1">Kategori</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${filter === cat ? "bg-[#0B1B2E] text-white" : "bg-white text-[#3A4654] border border-[#D7DEE9] hover:bg-[#F1F4F8]"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-semibold text-[#0E1116]">{p.name}</span>
                  <Badge className="bg-[#EEF3FA] text-[#4A90D9] border-0 text-xs">
                    {p.category}
                  </Badge>
                  {isOldContact(p.lastCallDate) && (
                    <Badge className="bg-yellow-100 text-yellow-700 border-0 text-xs flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> 6+ ay önce arandı
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= p.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-xs text-[#3A4654] ml-1">
                    ({p.ratingCount} değerlendirme)
                  </span>
                </div>
                {p.phone && (
                  <div className="flex items-center gap-1 text-sm text-[#3A4654]">
                    <Phone className="w-3 h-3" />
                    {p.phone}
                  </div>
                )}
                {p.lastCallDate && (
                  <p className="text-xs text-[#6B7A8D] mt-1">
                    Son arama: {p.lastCallDate}
                  </p>
                )}
                {p.notes && (
                  <p className="text-sm text-[#3A4654] mt-1 italic">
                    {p.notes}
                  </p>
                )}
              </div>
              <div className="flex gap-2 ml-3">
                <Button
                  onClick={() => setShowDetail(p.id)}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs"
                >
                  Detay
                </Button>
                {isOwner && (
                  <Button
                    onClick={() => handleDelete(p.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-600 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-[#3A4654] py-10">
            Tedarikçi bulunamadı.
          </p>
        )}
      </div>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Tedarikçi Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-1">Ad / Firma</p>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="Firma veya kişi adı"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Kategori</p>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
              >
                {CATEGORIES.filter((c) => c !== "Tümü").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Telefon</p>
              <Input
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                placeholder="0500 000 00 00"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">
                Son Arama Tarihi (opsiyonel)
              </p>
              <Input
                type="date"
                value={form.lastCallDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, lastCallDate: e.target.value }))
                }
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Not (opsiyonel)</p>
              <Input
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                placeholder="Ek bilgi"
              />
            </div>
            <Button
              onClick={handleAdd}
              disabled={!form.name.trim()}
              className="w-full bg-[#4A90D9] text-white rounded-full"
            >
              Ekle
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!showDetail} onOpenChange={() => setShowDetail(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{detail?.name}</DialogTitle>
          </DialogHeader>
          {detail && (
            <div className="space-y-4">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium mr-2">Puan Ver:</span>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleRate(detail.id, s)}
                  >
                    <Star
                      className={`w-5 h-5 cursor-pointer hover:fill-yellow-400 hover:text-yellow-400 ${s <= detail.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  </button>
                ))}
              </div>
              {isOwner && (
                <div className="space-y-2 p-3 bg-[#F3F6FB] rounded-xl">
                  <p className="text-sm font-medium">İş Kaydı Ekle</p>
                  <Input
                    type="date"
                    value={workForm.date}
                    onChange={(e) =>
                      setWorkForm((f) => ({ ...f, date: e.target.value }))
                    }
                  />
                  <Input
                    value={workForm.description}
                    onChange={(e) =>
                      setWorkForm((f) => ({
                        ...f,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Yapılan iş"
                  />
                  <Button
                    onClick={() => handleAddWork(detail.id)}
                    disabled={!workForm.date || !workForm.description}
                    className="w-full bg-[#4A90D9] text-white rounded-full text-sm"
                  >
                    Kaydet
                  </Button>
                </div>
              )}
              <div>
                <p className="text-sm font-medium mb-2">İş Geçmişi</p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {detail.workHistory.length === 0 && (
                    <p className="text-sm text-[#3A4654]">Kayıt bulunmuyor.</p>
                  )}
                  {detail.workHistory.map((w) => (
                    <div
                      key={w.id}
                      className="bg-white rounded-xl p-3 border border-[#E5EAF2]"
                    >
                      <p className="text-xs text-[#3A4654]">{w.date}</p>
                      <p className="text-sm text-[#0E1116]">{w.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
