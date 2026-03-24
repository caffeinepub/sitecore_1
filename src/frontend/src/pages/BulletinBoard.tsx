import { Image, MessageSquare, Plus, X } from "lucide-react";
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

const TYPES = [
  "Tümü",
  "Satılık",
  "Kiralık",
  "Aranan",
  "Hizmet Teklifi",
  "Duyuru",
];
const TYPE_COLORS: Record<string, string> = {
  Satılık: "bg-green-100 text-green-700",
  Kiralık: "bg-blue-100 text-blue-700",
  Aranan: "bg-yellow-100 text-yellow-700",
  "Hizmet Teklifi": "bg-purple-100 text-purple-700",
  Duyuru: "bg-gray-100 text-gray-700",
};

interface Listing {
  id: string;
  title: string;
  description: string;
  type: string;
  price: string;
  contact: string;
  createdBy: string;
  createdAt: string;
  expiresAt?: string;
  imageUrl?: string;
}

const DEFAULT_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "İkinci El Kanepe",
    description: "3+1 koltuk takımı, iyi durumda. Taşınıyorum.",
    type: "Satılık",
    price: "3500",
    contact: "Daire 12",
    createdBy: "user1",
    createdAt: new Date().toISOString().slice(0, 10),
    expiresAt: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
  },
  {
    id: "2",
    title: "Çocuk Bisikleti Aranıyor",
    description: "5-7 yaş arası çocuk bisikleti arıyorum.",
    type: "Aranan",
    price: "",
    contact: "Daire 7",
    createdBy: "user2",
    createdAt: new Date().toISOString().slice(0, 10),
  },
  {
    id: "3",
    title: "Ev Temizliği Hizmeti",
    description: "Haftada 2 gün ev temizliği yapıyorum. Uygun fiyat.",
    type: "Hizmet Teklifi",
    price: "200/gün",
    contact: "0533 xxx xx xx",
    createdBy: "user3",
    createdAt: new Date().toISOString().slice(0, 10),
    expiresAt: new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10), // already expired
  },
];

export default function BulletinBoard({
  buildingId,
  userId,
  isOwner,
}: { buildingId: string; userId: string; isOwner: boolean; t: any }) {
  const key = `sitecore_bulletin_${buildingId}`;
  const load = (): Listing[] => {
    try {
      const d = localStorage.getItem(key);
      return d ? JSON.parse(d) : DEFAULT_LISTINGS;
    } catch {
      return DEFAULT_LISTINGS;
    }
  };
  const [items, setItems] = useState<Listing[]>(load);
  const [filter, setFilter] = useState("Tümü");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "Satılık",
    price: "",
    contact: "",
    expiresAt: "",
    imageUrl: "",
  });

  const save = (data: Listing[]) => {
    setItems(data);
    localStorage.setItem(key, JSON.stringify(data));
  };
  const filtered =
    filter === "Tümü" ? items : items.filter((i) => i.type === filter);

  const isExpired = (item: Listing) => {
    if (!item.expiresAt) return false;
    return new Date(item.expiresAt) < new Date();
  };

  const handleAdd = () => {
    if (!form.title.trim() || !form.description.trim()) return;
    save([
      {
        id: Date.now().toString(),
        ...form,
        createdBy: userId,
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...items,
    ]);
    setShowAdd(false);
    setForm({
      title: "",
      description: "",
      type: "Satılık",
      price: "",
      contact: "",
      expiresAt: "",
      imageUrl: "",
    });
  };

  const handleDelete = (id: string, createdBy: string) => {
    if (userId === createdBy || isOwner) save(items.filter((i) => i.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0E1116]">
          İlan Panosu / Komşu Pazarı
        </h2>
        <Button
          onClick={() => setShowAdd(true)}
          className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2"
        >
          <Plus className="w-4 h-4" />
          İlan Ver
        </Button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
        {TYPES.filter((type) => type !== "Tümü").map((type) => (
          <div
            key={type}
            className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center"
          >
            <p className="text-2xl font-bold text-[#0B1B2E]">
              {items.filter((i) => i.type === type).length}
            </p>
            <p className="text-xs text-[#3A4654] mt-1">{type}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {TYPES.map((typeItem) => (
          <button
            key={typeItem}
            type="button"
            onClick={() => setFilter(typeItem)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${filter === typeItem ? "bg-[#0B1B2E] text-white" : "bg-white text-[#3A4654] border border-[#D7DEE9] hover:bg-[#F1F4F8]"}`}
          >
            {typeItem}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl p-5 shadow-sm border ${isExpired(item) ? "border-red-200 opacity-70" : "border-[#E5EAF2]"}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {item.imageUrl && (
                  <div className="mb-3">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full max-w-xs h-32 object-cover rounded-xl border border-[#E5EAF2]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-semibold text-[#0E1116]">
                    {item.title}
                  </span>
                  <Badge
                    className={`${TYPE_COLORS[item.type]} border-0 text-xs`}
                  >
                    {item.type}
                  </Badge>
                  {item.price && (
                    <span className="text-sm font-medium text-green-600">
                      {item.price} ₺
                    </span>
                  )}
                  {isExpired(item) && (
                    <Badge className="bg-red-100 text-red-700 border-0 text-xs">
                      Süresi Doldu
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-[#3A4654] mb-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-[#3A4654] flex-wrap">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {item.contact}
                  </span>
                  <span>{item.createdAt}</span>
                  {item.expiresAt && (
                    <span
                      className={
                        isExpired(item) ? "text-red-500" : "text-[#6B7A8D]"
                      }
                    >
                      {isExpired(item)
                        ? "Süresi doldu"
                        : `Son: ${item.expiresAt}`}
                    </span>
                  )}
                </div>
              </div>
              {(userId === item.createdBy || isOwner) && (
                <Button
                  onClick={() => handleDelete(item.id, item.createdBy)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-600 rounded-full ml-3"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-[#3A4654] py-10">İlan bulunamadı.</p>
        )}
      </div>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Yeni İlan</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-1">Başlık</p>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="İlan başlığı"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Tür</p>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm((f) => ({ ...f, type: e.target.value }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
              >
                {TYPES.filter((typeOpt) => typeOpt !== "Tümü").map(
                  (typeOpt) => (
                    <option key={typeOpt} value={typeOpt}>
                      {typeOpt}
                    </option>
                  ),
                )}
              </select>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Açıklama</p>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Detaylar..."
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm min-h-[80px] resize-none"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Fiyat (opsiyonel)</p>
              <Input
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: e.target.value }))
                }
                placeholder="ör. 1500"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">İletişim</p>
              <Input
                value={form.contact}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contact: e.target.value }))
                }
                placeholder="Telefon veya daire no"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">
                Son Geçerlilik Tarihi (opsiyonel)
              </p>
              <Input
                type="date"
                value={form.expiresAt}
                onChange={(e) =>
                  setForm((f) => ({ ...f, expiresAt: e.target.value }))
                }
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1 flex items-center gap-1">
                <Image className="w-3 h-3" /> Fotoğraf URL (opsiyonel)
              </p>
              <Input
                value={form.imageUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, imageUrl: e.target.value }))
                }
                placeholder="https://..."
              />
            </div>
            <Button
              onClick={handleAdd}
              disabled={!form.title.trim() || !form.description.trim()}
              className="w-full bg-[#4A90D9] text-white rounded-full"
            >
              Yayınla
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
