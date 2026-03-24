import {
  AlertTriangle,
  CheckCircle,
  Edit2,
  FileText,
  Plus,
  RefreshCw,
  Trash2,
  XCircle,
} from "lucide-react";
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
import { Switch } from "../components/ui/switch";

interface Props {
  buildingId: string;
  isOwner: boolean;
  t: any;
}

interface Subscription {
  id: string;
  provider: string;
  serviceType: string;
  startDate: string;
  endDate: string;
  monthlyCost: number;
  autoRenew: boolean;
  status: "aktif" | "süresi dolmuş" | "iptal";
  notes: string;
}

const SERVICE_TYPES = [
  "Tümü",
  "Asansör Bakım",
  "Güvenlik Sistemi",
  "Temizlik",
  "Peyzaj",
  "İnternet/Fiber",
  "Doğalgaz Bakım",
  "Jeneratör Bakım",
  "Sigorta",
  "Muhasebe",
  "Diğer",
];

const DEFAULT_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "1",
    provider: "AsansörTek A.Ş.",
    serviceType: "Asansör Bakım",
    startDate: "2025-01-01",
    endDate: "2026-12-31",
    monthlyCost: 2800,
    autoRenew: true,
    status: "aktif",
    notes: "Aylık bakım + 24/7 arıza desteği",
  },
  {
    id: "2",
    provider: "GuardPro Güvenlik",
    serviceType: "Güvenlik Sistemi",
    startDate: "2024-06-01",
    endDate: "2026-05-31",
    monthlyCost: 3500,
    autoRenew: true,
    status: "aktif",
    notes: "7/24 izleme + alarm sistemi",
  },
  {
    id: "3",
    provider: "Güneş Temizlik Ltd.",
    serviceType: "Temizlik",
    startDate: "2026-01-01",
    endDate: "2026-04-20",
    monthlyCost: 4200,
    autoRenew: false,
    status: "aktif",
    notes: "Haftalık ortak alan temizliği",
  },
  {
    id: "4",
    provider: "YeşilBahçe Peyzaj",
    serviceType: "Peyzaj",
    startDate: "2025-04-01",
    endDate: "2026-03-31",
    monthlyCost: 1200,
    autoRenew: false,
    status: "süresi dolmuş",
    notes: "Mevsimlik bakım",
  },
  {
    id: "5",
    provider: "TürkFiber",
    serviceType: "İnternet/Fiber",
    startDate: "2024-09-01",
    endDate: "2026-08-31",
    monthlyCost: 850,
    autoRenew: true,
    status: "aktif",
    notes: "Ortak alan internet",
  },
  {
    id: "6",
    provider: "EnerjiTek Bakım",
    serviceType: "Jeneratör Bakım",
    startDate: "2026-01-01",
    endDate: "2026-04-30",
    monthlyCost: 1600,
    autoRenew: false,
    status: "aktif",
    notes: "Yıllık bakım + yakıt takibi",
  },
];

const KEY = (id: string) => `sitecore_subscriptions_${id}`;

function daysUntilExpiry(endDate: string): number {
  const end = new Date(endDate);
  const today = new Date();
  return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function getExpiryColor(days: number, status: string): string {
  if (status !== "aktif") return "";
  if (days < 0) return "border-red-300 bg-red-50";
  if (days <= 30) return "border-red-200 bg-red-50";
  if (days <= 60) return "border-yellow-200 bg-yellow-50";
  return "";
}

export default function SubscriptionTracking({
  buildingId,
  isOwner,
  t: _t,
}: Props) {
  const load = (): Subscription[] => {
    try {
      const d = localStorage.getItem(KEY(buildingId));
      return d ? JSON.parse(d) : DEFAULT_SUBSCRIPTIONS;
    } catch {
      return DEFAULT_SUBSCRIPTIONS;
    }
  };

  const [subs, setSubs] = useState<Subscription[]>(load);
  const [filterStatus, setFilterStatus] = useState("Tümü");
  const [filterType, setFilterType] = useState("Tümü");
  const [showDialog, setShowDialog] = useState(false);
  const [editTarget, setEditTarget] = useState<Subscription | null>(null);
  const [form, setForm] = useState<Omit<Subscription, "id">>({
    provider: "",
    serviceType: "Diğer",
    startDate: "",
    endDate: "",
    monthlyCost: 0,
    autoRenew: false,
    status: "aktif",
    notes: "",
  });

  const save = (data: Subscription[]) => {
    setSubs(data);
    localStorage.setItem(KEY(buildingId), JSON.stringify(data));
  };

  const openAdd = () => {
    setEditTarget(null);
    setForm({
      provider: "",
      serviceType: "Diğer",
      startDate: "",
      endDate: "",
      monthlyCost: 0,
      autoRenew: false,
      status: "aktif",
      notes: "",
    });
    setShowDialog(true);
  };

  const openEdit = (s: Subscription) => {
    setEditTarget(s);
    setForm({
      provider: s.provider,
      serviceType: s.serviceType,
      startDate: s.startDate,
      endDate: s.endDate,
      monthlyCost: s.monthlyCost,
      autoRenew: s.autoRenew,
      status: s.status,
      notes: s.notes,
    });
    setShowDialog(true);
  };

  const handleSave = () => {
    if (!form.provider.trim()) return;
    if (editTarget) {
      save(subs.map((s) => (s.id === editTarget.id ? { ...s, ...form } : s)));
    } else {
      save([...subs, { id: Date.now().toString(), ...form }]);
    }
    setShowDialog(false);
  };

  const filtered = subs.filter(
    (s) =>
      (filterStatus === "Tümü" || s.status === filterStatus) &&
      (filterType === "Tümü" || s.serviceType === filterType),
  );

  const activeSubs = subs.filter((s) => s.status === "aktif");
  const totalMonthlyCost = activeSubs.reduce(
    (sum, s) => sum + s.monthlyCost,
    0,
  );
  const expiringThisMonth = subs.filter(
    (s) =>
      s.status === "aktif" &&
      daysUntilExpiry(s.endDate) <= 30 &&
      daysUntilExpiry(s.endDate) >= 0,
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0E1116]">
            Abonelik & Sözleşme Takibi
          </h2>
          <p className="text-sm text-[#6B7A8D] mt-0.5">
            Aktif sözleşmeler ve yaklaşan son kullanma tarihleri
          </p>
        </div>
        {isOwner && (
          <Button
            onClick={openAdd}
            className="bg-[#0B1B2E] text-white rounded-full gap-2"
            data-ocid="subscriptions.primary_button"
          >
            <Plus className="w-4 h-4" /> Sözleşme Ekle
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-[#0E1116]">
            {activeSubs.length}
          </p>
          <p className="text-sm text-[#6B7A8D] mt-1">Aktif Sözleşme</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-[#4A90D9]" />
          </div>
          <p className="text-2xl font-bold text-[#0E1116]">
            ₺{totalMonthlyCost.toLocaleString("tr-TR")}
          </p>
          <p className="text-sm text-[#6B7A8D] mt-1">Toplam Aylık Maliyet</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-orange-500">
            {expiringThisMonth}
          </p>
          <p className="text-sm text-[#6B7A8D] mt-1">Bu Ay Bitenler</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex gap-1 bg-[#F3F6FB] rounded-full p-1">
          {["Tümü", "aktif", "süresi dolmuş", "iptal"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filterStatus === s ? "bg-white shadow text-[#0E1116]" : "text-[#6B7A8D] hover:text-[#0E1116]"}`}
              data-ocid="subscriptions.toggle"
            >
              {s === "Tümü" ? "Tümü" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-[#D7DEE9] rounded-full px-4 py-1.5 text-sm text-[#3A4654]"
          data-ocid="subscriptions.select"
        >
          {SERVICE_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div
          className="text-center py-16 bg-white rounded-2xl border border-[#E5EAF2]"
          data-ocid="subscriptions.empty_state"
        >
          <FileText className="w-12 h-12 text-[#D7DEE9] mx-auto mb-3" />
          <p className="font-medium text-[#3A4654]">Sözleşme bulunamadı</p>
          <p className="text-sm text-[#6B7A8D] mt-1">
            Yeni sözleşme eklemek için yukarıdaki butonu kullanın
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((s, i) => {
            const days = daysUntilExpiry(s.endDate);
            const expiryBg = getExpiryColor(days, s.status);
            return (
              <div
                key={s.id}
                className={`bg-white rounded-2xl p-5 shadow-sm border transition-shadow hover:shadow-md ${expiryBg || "border-[#E5EAF2]"}`}
                data-ocid={`subscriptions.item.${i + 1}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-[#0E1116]">
                        {s.provider}
                      </h4>
                      <Badge
                        className={`text-xs border-0 ${
                          s.status === "aktif"
                            ? "bg-green-50 text-green-700"
                            : s.status === "süresi dolmuş"
                              ? "bg-red-50 text-red-600"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {s.status}
                      </Badge>
                      {s.autoRenew && (
                        <Badge className="bg-blue-50 text-blue-600 border-0 text-xs gap-1">
                          <RefreshCw className="w-3 h-3" /> Otomatik Yenileme
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-[#6B7A8D]">{s.serviceType}</p>
                    {s.notes && (
                      <p className="text-xs text-[#6B7A8D] mt-1">{s.notes}</p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-lg font-bold text-[#0E1116]">
                      ₺{s.monthlyCost.toLocaleString("tr-TR")}
                      <span className="text-xs font-normal text-[#6B7A8D]">
                        /ay
                      </span>
                    </p>
                    {s.status === "aktif" && (
                      <p
                        className={`text-xs mt-1 font-medium ${
                          days < 0
                            ? "text-red-600"
                            : days <= 30
                              ? "text-red-500"
                              : days <= 60
                                ? "text-yellow-600"
                                : "text-[#6B7A8D]"
                        }`}
                      >
                        {days < 0
                          ? `${Math.abs(days)} gün önce doldu`
                          : days === 0
                            ? "Bugün bitiyor!"
                            : `${days} gün kaldı`}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#F3F6FB]">
                  <span className="text-xs text-[#6B7A8D]">
                    Başlangıç:{" "}
                    <span className="font-medium text-[#3A4654]">
                      {s.startDate}
                    </span>
                  </span>
                  <span className="text-xs text-[#6B7A8D]">
                    Bitiş:{" "}
                    <span className="font-medium text-[#3A4654]">
                      {s.endDate}
                    </span>
                  </span>
                  {isOwner && (
                    <div className="ml-auto flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(s)}
                        className="text-[#6B7A8D] hover:text-[#0B1B2E] transition-colors"
                        data-ocid={`subscriptions.edit_button.${i + 1}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => save(subs.filter((x) => x.id !== s.id))}
                        className="text-[#6B7A8D] hover:text-red-500 transition-colors"
                        data-ocid={`subscriptions.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md" data-ocid="subscriptions.dialog">
          <DialogHeader>
            <DialogTitle>
              {editTarget ? "Sözleşmeyi Düzenle" : "Yeni Sözleşme"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Sağlayıcı / Firma Adı
              </p>
              <Input
                value={form.provider}
                onChange={(e) =>
                  setForm((p) => ({ ...p, provider: e.target.value }))
                }
                placeholder="Firma adı"
                data-ocid="subscriptions.input"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Hizmet Türü
              </p>
              <select
                value={form.serviceType}
                onChange={(e) =>
                  setForm((p) => ({ ...p, serviceType: e.target.value }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                data-ocid="subscriptions.select"
              >
                {SERVICE_TYPES.filter((t) => t !== "Tümü").map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  Başlangıç Tarihi
                </p>
                <Input
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, startDate: e.target.value }))
                  }
                  data-ocid="subscriptions.input"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  Bitiş Tarihi
                </p>
                <Input
                  type="date"
                  value={form.endDate}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, endDate: e.target.value }))
                  }
                  data-ocid="subscriptions.input"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Aylık Maliyet (₺)
              </p>
              <Input
                type="number"
                min={0}
                value={form.monthlyCost}
                onChange={(e) =>
                  setForm((p) => ({ ...p, monthlyCost: +e.target.value }))
                }
                data-ocid="subscriptions.input"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Durum
              </p>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    status: e.target.value as Subscription["status"],
                  }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                data-ocid="subscriptions.select"
              >
                <option value="aktif">Aktif</option>
                <option value="süresi dolmuş">Süresi Dolmuş</option>
                <option value="iptal">İptal</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.autoRenew}
                onCheckedChange={(v) =>
                  setForm((p) => ({ ...p, autoRenew: v }))
                }
                data-ocid="subscriptions.switch"
              />
              <p className="text-sm text-[#3A4654]">Otomatik Yenileme</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Notlar
              </p>
              <Input
                value={form.notes}
                onChange={(e) =>
                  setForm((p) => ({ ...p, notes: e.target.value }))
                }
                placeholder="Ek açıklama"
                data-ocid="subscriptions.input"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleSave}
                className="flex-1 bg-[#0B1B2E] text-white rounded-full"
                data-ocid="subscriptions.submit_button"
              >
                Kaydet
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDialog(false)}
                className="flex-1 rounded-full"
                data-ocid="subscriptions.cancel_button"
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
