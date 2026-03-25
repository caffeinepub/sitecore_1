import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  CreditCard,
  Key,
  Plus,
  Search,
  Smartphone,
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

interface KeyRecord {
  id: string;
  type: "anahtar" | "kart" | "kumanda" | "sifre";
  code: string;
  apartment: string;
  holderName: string;
  issuedDate: string;
  returnedDate?: string;
  status: "active" | "lost" | "returned";
  notes: string;
  copyAllowed: boolean;
}

const INITIAL: KeyRecord[] = [
  {
    id: "1",
    type: "anahtar",
    code: "ANA-001",
    apartment: "A-1",
    holderName: "Mehmet Yılmaz",
    issuedDate: "2025-01-10",
    status: "active",
    notes: "",
    copyAllowed: false,
  },
  {
    id: "2",
    type: "kart",
    code: "KRT-045",
    apartment: "A-1",
    holderName: "Mehmet Yılmaz",
    issuedDate: "2025-01-10",
    status: "active",
    notes: "Araç giriş kartı",
    copyAllowed: false,
  },
  {
    id: "3",
    type: "kumanda",
    code: "KMD-012",
    apartment: "B-5",
    holderName: "Elif Şahin",
    issuedDate: "2024-06-15",
    status: "active",
    notes: "Otopark bariyeri",
    copyAllowed: false,
  },
  {
    id: "4",
    type: "anahtar",
    code: "ANA-023",
    apartment: "C-8",
    holderName: "Hasan Polat",
    issuedDate: "2024-03-20",
    status: "lost",
    notes: "Kayıp bildirildi",
    copyAllowed: false,
  },
  {
    id: "5",
    type: "kart",
    code: "KRT-031",
    apartment: "D-2",
    holderName: "Fatma Çelik",
    issuedDate: "2023-11-01",
    returnedDate: "2026-02-28",
    status: "returned",
    notes: "Taşınma nedeniyle iade",
    copyAllowed: false,
  },
  {
    id: "6",
    type: "sifre",
    code: "GRS-999",
    apartment: "Ortak",
    holderName: "Tüm Sakinler",
    issuedDate: "2026-01-01",
    status: "active",
    notes: "Misafir girişi şifresi",
    copyAllowed: true,
  },
];

const TYPE_LABELS: Record<string, string> = {
  anahtar: "Anahtar",
  kart: "Giriş Kartı",
  kumanda: "Uzaktan Kumanda",
  sifre: "Şifre / Kod",
};

const TYPE_ICONS: Record<string, React.ElementType> = {
  anahtar: Key,
  kart: CreditCard,
  kumanda: Smartphone,
  sifre: Key,
};

function statusBadge(status: string) {
  if (status === "active")
    return (
      <Badge className="bg-green-100 text-green-700 border-0">Aktif</Badge>
    );
  if (status === "lost")
    return <Badge className="bg-red-100 text-red-700 border-0">Kayıp</Badge>;
  return (
    <Badge className="bg-gray-100 text-gray-600 border-0">İade Edildi</Badge>
  );
}

export default function AccessKeyManagement({
  buildingId: _buildingId,
  isOwner,
}: {
  buildingId: string;
  isOwner: boolean;
  t: Record<string, string>;
}) {
  const [records, setRecords] = useState<KeyRecord[]>(INITIAL);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("Tümü");
  const [filterStatus, setFilterStatus] = useState("Tümü");
  const [showAdd, setShowAdd] = useState(false);
  const [showLostConfirm, setShowLostConfirm] = useState("");
  const [newForm, setNewForm] = useState({
    type: "anahtar",
    code: "",
    apartment: "",
    holderName: "",
    issuedDate: "",
    notes: "",
    copyAllowed: false,
  });

  const active = records.filter((r) => r.status === "active").length;
  const lost = records.filter((r) => r.status === "lost").length;
  const returned = records.filter((r) => r.status === "returned").length;

  const filtered = records.filter((r) => {
    const matchSearch =
      r.code.toLowerCase().includes(search.toLowerCase()) ||
      r.holderName.toLowerCase().includes(search.toLowerCase()) ||
      r.apartment.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "Tümü" || r.type === filterType;
    const matchStatus = filterStatus === "Tümü" || r.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  function markLost(id: string) {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "lost" as const } : r)),
    );
    setShowLostConfirm("");
  }

  function markReturned(id: string) {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "returned" as const,
              returnedDate: new Date().toISOString().split("T")[0],
            }
          : r,
      ),
    );
  }

  function handleAdd() {
    if (!newForm.code || !newForm.apartment || !newForm.holderName) return;
    const r: KeyRecord = {
      id: Date.now().toString(),
      type: newForm.type as KeyRecord["type"],
      code: newForm.code,
      apartment: newForm.apartment,
      holderName: newForm.holderName,
      issuedDate: newForm.issuedDate || new Date().toISOString().split("T")[0],
      status: "active",
      notes: newForm.notes,
      copyAllowed: newForm.copyAllowed,
    };
    setRecords((prev) => [...prev, r]);
    setShowAdd(false);
    setNewForm({
      type: "anahtar",
      code: "",
      apartment: "",
      holderName: "",
      issuedDate: "",
      notes: "",
      copyAllowed: false,
    });
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0E1116]">
            Erişim Kontrol & Anahtar Yönetimi
          </h1>
          <p className="text-sm text-[#6B7A8D] mt-1">
            Daire anahtarları, giriş kartları ve kumandaların envanterini tutun
          </p>
        </div>
        {isOwner && (
          <Button
            onClick={() => setShowAdd(true)}
            className="bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full gap-2"
          >
            <Plus className="w-4 h-4" /> Kayıt Ekle
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-white border-none shadow-sm">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0E1116]">{active}</p>
                <p className="text-xs text-[#6B7A8D]">Aktif</p>
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
                <p className="text-2xl font-bold text-[#0E1116]">{lost}</p>
                <p className="text-xs text-[#6B7A8D]">Kayıp</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-none shadow-sm">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                <Key className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0E1116]">{returned}</p>
                <p className="text-xs text-[#6B7A8D]">İade</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lost alert */}
      {lost > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span className="text-sm text-red-700">
            {lost} kayıp erişim aracı bildirildi. Güvenlik protokolünü gözden
            geçirin.
          </span>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A8D]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Kod, kişi veya daire ara..."
            className="pl-9"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
        >
          <option>Tümü</option>
          {Object.entries(TYPE_LABELS).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
        >
          <option>Tümü</option>
          <option value="active">Aktif</option>
          <option value="lost">Kayıp</option>
          <option value="returned">İade</option>
        </select>
      </div>

      {/* List */}
      <div className="grid gap-3">
        {filtered.map((rec) => {
          const Icon = TYPE_ICONS[rec.type] || Key;
          return (
            <Card
              key={rec.id}
              className={`bg-white border-none shadow-sm ${rec.status === "lost" ? "border-l-4 border-l-red-400" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F1F4F8] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#4A90D9]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-[#0E1116]">
                          {TYPE_LABELS[rec.type]}
                        </p>
                        <span className="text-xs font-mono bg-[#F1F4F8] px-2 py-0.5 rounded text-[#3A4654]">
                          {rec.code}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B7A8D]">
                        {rec.holderName} • Daire {rec.apartment}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {statusBadge(rec.status)}
                    {rec.status === "active" && isOwner && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-orange-600 hover:bg-orange-50 rounded-full text-xs h-7 px-2"
                          onClick={() => setShowLostConfirm(rec.id)}
                        >
                          Kayıp
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-gray-600 hover:bg-gray-50 rounded-full text-xs h-7 px-2"
                          onClick={() => markReturned(rec.id)}
                        >
                          İade
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-[#6B7A8D]">
                  <span>Teslim: {rec.issuedDate}</span>
                  {rec.returnedDate && <span>İade: {rec.returnedDate}</span>}
                  {rec.copyAllowed && (
                    <span className="text-blue-600">Kopyalama izinli</span>
                  )}
                  {!rec.copyAllowed && (
                    <span className="text-red-500">Kopyalama yasak</span>
                  )}
                  {rec.notes && <span>Not: {rec.notes}</span>}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Lost confirm */}
      <Dialog
        open={!!showLostConfirm}
        onOpenChange={() => setShowLostConfirm("")}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Kayıp Bildir</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-[#3A4654]">
            Bu erişim aracını kayıp olarak işaretlemek istediğinizden emin
            misiniz? Güvenlik birimini haberdar etmeyi unutmayın.
          </p>
          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              className="flex-1 rounded-full"
              onClick={() => setShowLostConfirm("")}
            >
              İptal
            </Button>
            <Button
              className="flex-1 rounded-full bg-red-600 hover:bg-red-700 text-white"
              onClick={() => markLost(showLostConfirm)}
            >
              Kayıp Olarak İşaretle
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Modal */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Yeni Erişim Kaydı</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <select
              value={newForm.type}
              onChange={(e) =>
                setNewForm((p) => ({ ...p, type: e.target.value }))
              }
              className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
            >
              {Object.entries(TYPE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
            <Input
              placeholder="Kod / Seri no (örn. ANA-024)"
              value={newForm.code}
              onChange={(e) =>
                setNewForm((p) => ({ ...p, code: e.target.value }))
              }
            />
            <Input
              placeholder="Daire (örn. A-5)"
              value={newForm.apartment}
              onChange={(e) =>
                setNewForm((p) => ({ ...p, apartment: e.target.value }))
              }
            />
            <Input
              placeholder="Teslim alan kişi"
              value={newForm.holderName}
              onChange={(e) =>
                setNewForm((p) => ({ ...p, holderName: e.target.value }))
              }
            />
            <Input
              type="date"
              value={newForm.issuedDate}
              onChange={(e) =>
                setNewForm((p) => ({ ...p, issuedDate: e.target.value }))
              }
            />
            <Input
              placeholder="Not (isteğe bağlı)"
              value={newForm.notes}
              onChange={(e) =>
                setNewForm((p) => ({ ...p, notes: e.target.value }))
              }
            />
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={newForm.copyAllowed}
                onChange={(e) =>
                  setNewForm((p) => ({ ...p, copyAllowed: e.target.checked }))
                }
              />
              Kopyalama izni var
            </label>
            <Button
              onClick={handleAdd}
              disabled={
                !newForm.code || !newForm.apartment || !newForm.holderName
              }
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
