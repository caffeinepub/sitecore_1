import { AlertTriangle, CheckCircle, Clock, Plus, X } from "lucide-react";
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

const TYPES = ["Sigorta", "Garanti", "Sözleşme", "Lisans"];
const TYPE_COLORS: Record<string, string> = {
  Sigorta: "bg-blue-100 text-blue-700",
  Garanti: "bg-green-100 text-green-700",
  Sözleşme: "bg-purple-100 text-purple-700",
  Lisans: "bg-orange-100 text-orange-700",
};

interface InsuranceRecord {
  id: string;
  name: string;
  type: string;
  policyNo: string;
  provider: string;
  startDate: string;
  endDate: string;
  amount: string;
  notes: string;
  attachment?: string;
}

const DEFAULT_RECORDS: InsuranceRecord[] = [
  {
    id: "1",
    name: "Bina Zorunlu Deprem Sigortası (DASK)",
    type: "Sigorta",
    policyNo: "DASK-2026-0001",
    provider: "Güven Sigorta",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    amount: "15000",
    notes: "Yıllık yenileme gerekiyor",
  },
  {
    id: "2",
    name: "Asansör Yıllık Muayene",
    type: "Sözleşme",
    policyNo: "ASANSOR-2026",
    provider: "Kaya Teknik",
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    amount: "3500",
    notes: "Altı ayda bir yenileniyor",
  },
  {
    id: "3",
    name: "Yangın Tüpü Garantisi",
    type: "Garanti",
    policyNo: "YT-2024-055",
    provider: "Yangın Sistemleri AŞ",
    startDate: "2024-03-15",
    endDate: "2026-03-15",
    amount: "",
    notes: "10 adet yangın tübü",
  },
  {
    id: "4",
    name: "Kazan Servis Sözleşmesi",
    type: "Sözleşme",
    policyNo: "KAZ-2025-012",
    provider: "Isı Teknik",
    startDate: "2025-07-01",
    endDate: "2026-06-30",
    amount: "4200",
    notes: "Yıllık bakım dahil",
  },
];

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const KEY = (id: string) => `sitecore_insurance_${id}`;

export default function InsuranceWarranty({ buildingId, isOwner, t }: Props) {
  const [records, setRecords] = useState<InsuranceRecord[]>(() => {
    const raw = localStorage.getItem(KEY(buildingId));
    return raw ? JSON.parse(raw) : DEFAULT_RECORDS;
  });

  const [showDialog, setShowDialog] = useState(false);
  const [filterType, setFilterType] = useState("Tümü");
  const [form, setForm] = useState({
    name: "",
    type: "Sigorta",
    policyNo: "",
    provider: "",
    startDate: "",
    endDate: "",
    amount: "",
    notes: "",
    attachment: "",
  });

  const save = (u: InsuranceRecord[]) => {
    setRecords(u);
    localStorage.setItem(KEY(buildingId), JSON.stringify(u));
  };

  const handleAdd = () => {
    if (!form.name.trim()) return;
    save([{ id: crypto.randomUUID(), ...form }, ...records]);
    setShowDialog(false);
    setForm({
      name: "",
      type: "Sigorta",
      policyNo: "",
      provider: "",
      startDate: "",
      endDate: "",
      amount: "",
      notes: "",
      attachment: "",
    });
  };

  const handleDelete = (id: string) => save(records.filter((r) => r.id !== id));

  const getDaysLeft = (endDate: string) => {
    if (!endDate) return null;
    const diff = new Date(endDate).getTime() - Date.now();
    return Math.ceil(diff / 86400000);
  };

  const expiryStatus = (endDate: string) => {
    const days = getDaysLeft(endDate);
    if (days === null) return null;
    if (days < 0)
      return {
        color: "bg-red-50 border-red-200",
        badge: (
          <Badge className="bg-red-100 text-red-700 border-0 text-xs">
            Çıktı ({Math.abs(days)}g önce)
          </Badge>
        ),
      };
    if (days <= 7)
      return {
        color: "bg-red-50 border-red-200",
        badge: (
          <Badge className="bg-red-100 text-red-700 border-0 text-xs">
            {days} gün kaldı
          </Badge>
        ),
      };
    if (days <= 30)
      return {
        color: "bg-orange-50 border-orange-200",
        badge: (
          <Badge className="bg-orange-100 text-orange-700 border-0 text-xs">
            {days} gün kaldı
          </Badge>
        ),
      };
    return {
      color: "",
      badge: (
        <Badge className="bg-green-100 text-green-700 border-0 text-xs">
          {days} gün kaldı
        </Badge>
      ),
    };
  };

  const filtered =
    filterType === "Tümü"
      ? records
      : records.filter((r) => r.type === filterType);

  const expiringSoon = records.filter((r) => {
    const d = getDaysLeft(r.endDate);
    return d !== null && d <= 30 && d >= 0;
  });

  const expired = records.filter((r) => {
    const d = getDaysLeft(r.endDate);
    return d !== null && d < 0;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#0E1116]">
          {t.insurance || "Sigorta & Garanti Takibi"}
        </h2>
        {isOwner && (
          <Button
            onClick={() => setShowDialog(true)}
            className="bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full"
            data-ocid="insurance.primary_button"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ekle
          </Button>
        )}
      </div>

      {/* Alerts */}
      {(expiringSoon.length > 0 || expired.length > 0) && (
        <div className="space-y-2">
          {expired.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <p className="font-semibold text-red-700 flex items-center gap-2 mb-1">
                <X className="w-4 h-4" /> Süresi Dolmuş ({expired.length})
              </p>
              <p className="text-sm text-red-600">
                {expired.map((r) => r.name).join(", ")}
              </p>
            </div>
          )}
          {expiringSoon.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
              <p className="font-semibold text-orange-700 flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4" /> 30 Gün İçinde Dolacak (
                {expiringSoon.length})
              </p>
              <p className="text-sm text-orange-600">
                {expiringSoon.map((r) => r.name).join(", ")}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-2xl font-bold text-[#0B1B2E]">{records.length}</p>
          <p className="text-xs text-[#3A4654] mt-1">Toplam Kayıt</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100 text-center">
          <p className="text-2xl font-bold text-orange-600">
            {expiringSoon.length}
          </p>
          <p className="text-xs text-[#3A4654] mt-1 flex items-center justify-center gap-1">
            <Clock className="w-3 h-3" />
            Yaklaşan
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100 text-center">
          <p className="text-2xl font-bold text-green-600">
            {records.length - expiringSoon.length - expired.length}
          </p>
          <p className="text-xs text-[#3A4654] mt-1 flex items-center justify-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Geçerli
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {["Tümü", ...TYPES].map((type) => (
          <Button
            key={type}
            size="sm"
            variant={filterType === type ? "default" : "outline"}
            onClick={() => setFilterType(type)}
            className={
              filterType === type
                ? "bg-[#0B1B2E] text-white rounded-full"
                : "rounded-full"
            }
          >
            {type}
          </Button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div
            data-ocid="insurance.empty_state"
            className="bg-white rounded-2xl p-10 text-center border border-[#E5EAF2] text-[#6B7A8D]"
          >
            Kayıt bulunamadı.
          </div>
        ) : (
          filtered.map((r, idx) => {
            const status = expiryStatus(r.endDate);
            return (
              <div
                key={r.id}
                data-ocid={`insurance.item.${idx + 1}`}
                className={`bg-white rounded-2xl p-4 shadow-sm border ${status?.color || "border-[#E5EAF2]"}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-[#0E1116]">
                        {r.name}
                      </span>
                      <Badge
                        className={`${TYPE_COLORS[r.type] || "bg-gray-100 text-gray-600"} border-0 text-xs`}
                      >
                        {r.type}
                      </Badge>
                      {status?.badge}
                    </div>
                    <p className="text-sm text-[#3A4654]">
                      {r.provider}
                      {r.policyNo ? ` — ${r.policyNo}` : ""}
                    </p>
                    <p className="text-xs text-[#6B7A8D] mt-0.5">
                      {r.startDate} — {r.endDate}
                    </p>
                    {r.amount && (
                      <p className="text-xs text-[#3A4654] mt-0.5">
                        {Number(r.amount).toLocaleString()} ₺
                      </p>
                    )}
                    {r.notes && (
                      <p className="text-xs text-[#6B7A8D] mt-0.5 italic">
                        {r.notes}
                      </p>
                    )}
                    {r.attachment && (
                      <p className="text-xs text-[#4A90D9] mt-0.5">
                        📎 {r.attachment}
                      </p>
                    )}
                  </div>
                  {isOwner && (
                    <Button
                      onClick={() => handleDelete(r.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-600 h-7 w-7 p-0 ml-2"
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md" data-ocid="insurance.dialog">
          <DialogHeader>
            <DialogTitle>Yeni Kayıt Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            <div>
              <p className="text-sm font-medium mb-1">Ad / Açıklama *</p>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Bina Sigortası..."
                data-ocid="insurance.input"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium mb-1">Tür</p>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, type: e.target.value }))
                  }
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                  data-ocid="insurance.select"
                >
                  {TYPES.map((tp) => (
                    <option key={tp} value={tp}>
                      {tp}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Poliçe / Seri No</p>
                <Input
                  value={form.policyNo}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, policyNo: e.target.value }))
                  }
                  placeholder="ABC-001"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Sağlayıcı / Firma</p>
              <Input
                value={form.provider}
                onChange={(e) =>
                  setForm((p) => ({ ...p, provider: e.target.value }))
                }
                placeholder="Sigorta Firması"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium mb-1">Başlangıç</p>
                <Input
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, startDate: e.target.value }))
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Bitiş</p>
                <Input
                  type="date"
                  value={form.endDate}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, endDate: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Tutar (₺)</p>
              <Input
                type="number"
                value={form.amount}
                onChange={(e) =>
                  setForm((p) => ({ ...p, amount: e.target.value }))
                }
                placeholder="0"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Ekli Belge / Dosya Adı</p>
              <Input
                value={form.attachment}
                onChange={(e) =>
                  setForm((p) => ({ ...p, attachment: e.target.value }))
                }
                placeholder="sigorta-police.pdf"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Notlar</p>
              <Input
                value={form.notes}
                onChange={(e) =>
                  setForm((p) => ({ ...p, notes: e.target.value }))
                }
                placeholder="Not..."
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleAdd}
                disabled={!form.name.trim()}
                className="flex-1 bg-[#0B1B2E] text-white rounded-full"
                data-ocid="insurance.submit_button"
              >
                Kaydet
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDialog(false)}
                className="flex-1 rounded-full"
              >
                İptal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
