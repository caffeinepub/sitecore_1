import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Edit2,
  Package,
  Plus,
  Search,
  Trash2,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";

interface DepotItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  quantity: number;
  minQuantity: number;
  location: string;
  responsible: string;
  lastUpdated: string;
}

interface Transaction {
  id: string;
  itemId: string;
  itemName: string;
  type: "in" | "out";
  quantity: number;
  responsible: string;
  note: string;
  date: string;
}

const CATEGORIES = [
  "Temizlik",
  "Elektrik",
  "Sıhhi Tesisat",
  "Güvenlik",
  "Bahçe",
  "Genel",
];
const UNITS = ["Adet", "Litre", "Kg", "Kutu", "Rulo", "Paket"];

const INITIAL_ITEMS: DepotItem[] = [
  {
    id: "1",
    name: "Çamaşır Suyu",
    category: "Temizlik",
    unit: "Litre",
    quantity: 15,
    minQuantity: 5,
    location: "Raf A-1",
    responsible: "Ahmet Y.",
    lastUpdated: "2026-03-20",
  },
  {
    id: "2",
    name: "Mop & Paspas",
    category: "Temizlik",
    unit: "Adet",
    quantity: 8,
    minQuantity: 3,
    location: "Depo Giriş",
    responsible: "Fatma K.",
    lastUpdated: "2026-03-18",
  },
  {
    id: "3",
    name: "Ampul LED 9W",
    category: "Elektrik",
    unit: "Adet",
    quantity: 2,
    minQuantity: 10,
    location: "Raf B-2",
    responsible: "Mehmet D.",
    lastUpdated: "2026-03-15",
  },
  {
    id: "4",
    name: "Boru Contası",
    category: "Sıhhi Tesisat",
    unit: "Paket",
    quantity: 6,
    minQuantity: 2,
    location: "Raf C-1",
    responsible: "Ahmet Y.",
    lastUpdated: "2026-03-10",
  },
  {
    id: "5",
    name: "Güvenlik Teli",
    category: "Güvenlik",
    unit: "Metre",
    quantity: 50,
    minQuantity: 20,
    location: "Raf D-3",
    responsible: "Ali R.",
    lastUpdated: "2026-03-05",
  },
  {
    id: "6",
    name: "Çim Biçme Yağı",
    category: "Bahçe",
    unit: "Litre",
    quantity: 3,
    minQuantity: 1,
    location: "Bahçe Kulübesi",
    responsible: "Mustafa S.",
    lastUpdated: "2026-02-28",
  },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "t1",
    itemId: "1",
    itemName: "Çamaşır Suyu",
    type: "out",
    quantity: 3,
    responsible: "Fatma K.",
    note: "Bodrum kat temizliği",
    date: "2026-03-22",
  },
  {
    id: "t2",
    itemId: "3",
    itemName: "Ampul LED 9W",
    type: "out",
    quantity: 8,
    responsible: "Mehmet D.",
    note: "Koridor yenileme",
    date: "2026-03-21",
  },
  {
    id: "t3",
    itemId: "1",
    itemName: "Çamaşır Suyu",
    type: "in",
    quantity: 10,
    responsible: "Ahmet Y.",
    note: "Satın alma sipariş #1023",
    date: "2026-03-20",
  },
  {
    id: "t4",
    itemId: "2",
    itemName: "Mop & Paspas",
    type: "out",
    quantity: 2,
    responsible: "Fatma K.",
    note: "5. kat merdiven",
    date: "2026-03-18",
  },
  {
    id: "t5",
    itemId: "4",
    itemName: "Boru Contası",
    type: "in",
    quantity: 4,
    responsible: "Ahmet Y.",
    note: "Stok takviyesi",
    date: "2026-03-10",
  },
];

export default function DepotManagement({
  buildingId: _buildingId,
  isOwner,
}: {
  buildingId: string;
  isOwner: boolean;
  t: Record<string, string>;
}) {
  const [items, setItems] = useState<DepotItem[]>(INITIAL_ITEMS);
  const [transactions, setTransactions] =
    useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<"stock" | "transactions">("stock");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("Tümü");
  const [showAddItem, setShowAddItem] = useState(false);
  const [showTransaction, setShowTransaction] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DepotItem | null>(null);
  const [txType, setTxType] = useState<"in" | "out">("out");
  const [txQty, setTxQty] = useState("");
  const [txNote, setTxNote] = useState("");
  const [txResponsible, setTxResponsible] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Temizlik",
    unit: "Adet",
    quantity: "",
    minQuantity: "",
    location: "",
    responsible: "",
  });

  const lowStockItems = items.filter((i) => i.quantity <= i.minQuantity);
  const filtered = items.filter((i) => {
    const matchSearch =
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.location.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === "Tümü" || i.category === filterCategory;
    return matchSearch && matchCat;
  });

  function handleTransaction() {
    if (!selectedItem || !txQty || !txResponsible) return;
    const qty = Number.parseInt(txQty);
    if (Number.isNaN(qty) || qty <= 0) return;
    const tx: Transaction = {
      id: Date.now().toString(),
      itemId: selectedItem.id,
      itemName: selectedItem.name,
      type: txType,
      quantity: qty,
      responsible: txResponsible,
      note: txNote,
      date: new Date().toISOString().split("T")[0],
    };
    setTransactions((prev) => [tx, ...prev]);
    setItems((prev) =>
      prev.map((i) =>
        i.id === selectedItem.id
          ? {
              ...i,
              quantity:
                txType === "in"
                  ? i.quantity + qty
                  : Math.max(0, i.quantity - qty),
              lastUpdated: tx.date,
            }
          : i,
      ),
    );
    setShowTransaction(false);
    setTxQty("");
    setTxNote("");
    setTxResponsible("");
  }

  function handleAddItem() {
    if (!newItem.name || !newItem.quantity) return;
    const item: DepotItem = {
      id: Date.now().toString(),
      name: newItem.name,
      category: newItem.category,
      unit: newItem.unit,
      quantity: Number.parseInt(newItem.quantity) || 0,
      minQuantity: Number.parseInt(newItem.minQuantity) || 0,
      location: newItem.location,
      responsible: newItem.responsible,
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    setItems((prev) => [...prev, item]);
    setShowAddItem(false);
    setNewItem({
      name: "",
      category: "Temizlik",
      unit: "Adet",
      quantity: "",
      minQuantity: "",
      location: "",
      responsible: "",
    });
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0E1116]">
            Depo & Malzeme Yönetimi
          </h1>
          <p className="text-sm text-[#6B7A8D] mt-1">
            Bina deposundaki malzeme ve ekipman stoklarını yönetin
          </p>
        </div>
        {isOwner && (
          <Button
            onClick={() => setShowAddItem(true)}
            className="bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full gap-2"
          >
            <Plus className="w-4 h-4" /> Malzeme Ekle
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white border-none shadow-sm">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0E1116]">
                  {items.length}
                </p>
                <p className="text-xs text-[#6B7A8D]">Toplam Kalem</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-none shadow-sm">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0E1116]">
                  {lowStockItems.length}
                </p>
                <p className="text-xs text-[#6B7A8D]">Düşük Stok</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-none shadow-sm">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <ArrowDown className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0E1116]">
                  {transactions.filter((t) => t.type === "in").length}
                </p>
                <p className="text-xs text-[#6B7A8D]">Giriş İşlemi</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-none shadow-sm">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <ArrowUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0E1116]">
                  {transactions.filter((t) => t.type === "out").length}
                </p>
                <p className="text-xs text-[#6B7A8D]">Çıkış İşlemi</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-700">
              Düşük Stok Uyarısı
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStockItems.map((i) => (
              <span
                key={i.id}
                className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full"
              >
                {i.name} ({i.quantity} {i.unit})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#E5EAF2]">
        {(["stock", "transactions"] as const).map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-[#4A90D9] text-[#4A90D9]"
                : "border-transparent text-[#6B7A8D] hover:text-[#0E1116]"
            }`}
          >
            {tab === "stock" ? "Stok Listesi" : "İşlem Geçmişi"}
          </button>
        ))}
      </div>

      {activeTab === "stock" && (
        <>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A8D]" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Malzeme veya konum ara..."
                className="pl-9"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]"
            >
              <option>Tümü</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-3">
            {filtered.map((item) => {
              const isLow = item.quantity <= item.minQuantity;
              return (
                <Card
                  key={item.id}
                  className={`bg-white border-none shadow-sm ${isLow ? "border-l-4 border-l-red-400" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F1F4F8] flex items-center justify-center">
                          <Package className="w-5 h-5 text-[#4A90D9]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#0E1116]">
                            {item.name}
                          </p>
                          <p className="text-xs text-[#6B7A8D]">
                            {item.category} • {item.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p
                            className={`font-bold text-lg ${isLow ? "text-red-600" : "text-[#0E1116]"}`}
                          >
                            {item.quantity}
                          </p>
                          <p className="text-xs text-[#6B7A8D]">{item.unit}</p>
                        </div>
                        {isLow && (
                          <Badge variant="destructive" className="text-xs">
                            Düşük
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full gap-1 text-xs"
                          onClick={() => {
                            setSelectedItem(item);
                            setShowTransaction(true);
                          }}
                        >
                          <ArrowUpDown className="w-3 h-3" /> İşlem
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#6B7A8D]">
                      <span>
                        Min Stok: {item.minQuantity} {item.unit}
                      </span>
                      <span>Sorumlu: {item.responsible}</span>
                      <span>Son güncelleme: {item.lastUpdated}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {activeTab === "transactions" && (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <Card key={tx.id} className="bg-white border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${tx.type === "in" ? "bg-green-100" : "bg-orange-100"}`}
                    >
                      {tx.type === "in" ? (
                        <ArrowDown className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowUp className="w-4 h-4 text-orange-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-[#0E1116]">
                        {tx.itemName}
                      </p>
                      <p className="text-xs text-[#6B7A8D]">{tx.note || "—"}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${tx.type === "in" ? "text-green-600" : "text-orange-600"}`}
                    >
                      {tx.type === "in" ? "+" : "-"}
                      {tx.quantity}
                    </p>
                    <p className="text-xs text-[#6B7A8D]">{tx.date}</p>
                  </div>
                </div>
                <p className="text-xs text-[#6B7A8D] mt-2">
                  Sorumlu: {tx.responsible}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Item Modal */}
      <Dialog open={showAddItem} onOpenChange={setShowAddItem}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Yeni Malzeme Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Malzeme adı"
              value={newItem.name}
              onChange={(e) =>
                setNewItem((p) => ({ ...p, name: e.target.value }))
              }
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                value={newItem.category}
                onChange={(e) =>
                  setNewItem((p) => ({ ...p, category: e.target.value }))
                }
                className="border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select
                value={newItem.unit}
                onChange={(e) =>
                  setNewItem((p) => ({ ...p, unit: e.target.value }))
                }
                className="border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
              >
                {UNITS.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Mevcut miktar"
                type="number"
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem((p) => ({ ...p, quantity: e.target.value }))
                }
              />
              <Input
                placeholder="Min. miktar"
                type="number"
                value={newItem.minQuantity}
                onChange={(e) =>
                  setNewItem((p) => ({ ...p, minQuantity: e.target.value }))
                }
              />
            </div>
            <Input
              placeholder="Depo konumu (örn. Raf A-1)"
              value={newItem.location}
              onChange={(e) =>
                setNewItem((p) => ({ ...p, location: e.target.value }))
              }
            />
            <Input
              placeholder="Sorumlu kişi"
              value={newItem.responsible}
              onChange={(e) =>
                setNewItem((p) => ({ ...p, responsible: e.target.value }))
              }
            />
            <Button
              onClick={handleAddItem}
              disabled={!newItem.name || !newItem.quantity}
              className="w-full bg-[#0B1B2E] text-white rounded-full"
            >
              Ekle
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Transaction Modal */}
      <Dialog open={showTransaction} onOpenChange={setShowTransaction}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Stok İşlemi — {selectedItem?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Button
                variant={txType === "in" ? "default" : "outline"}
                onClick={() => setTxType("in")}
                className={`flex-1 rounded-full ${txType === "in" ? "bg-green-600 hover:bg-green-700 text-white" : ""}`}
              >
                Giriş
              </Button>
              <Button
                variant={txType === "out" ? "default" : "outline"}
                onClick={() => setTxType("out")}
                className={`flex-1 rounded-full ${txType === "out" ? "bg-orange-600 hover:bg-orange-700 text-white" : ""}`}
              >
                Çıkış
              </Button>
            </div>
            <Input
              placeholder="Miktar"
              type="number"
              value={txQty}
              onChange={(e) => setTxQty(e.target.value)}
            />
            <Input
              placeholder="Sorumlu kişi"
              value={txResponsible}
              onChange={(e) => setTxResponsible(e.target.value)}
            />
            <Input
              placeholder="Not (isteğe bağlı)"
              value={txNote}
              onChange={(e) => setTxNote(e.target.value)}
            />
            <Button
              onClick={handleTransaction}
              disabled={!txQty || !txResponsible}
              className="w-full bg-[#0B1B2E] text-white rounded-full"
            >
              Kaydet
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
