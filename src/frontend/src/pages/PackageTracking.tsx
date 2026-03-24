import { BarChart2, Bell, Package, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

interface PackageItem {
  id: string;
  apartmentNo: string;
  recipientName: string;
  carrier: "PTT" | "Yurtıçi" | "Aras" | "MNG" | "Diğer";
  trackingNumber: string;
  barcodeRef: string;
  receivedDate: string;
  status: "waiting" | "collected";
  collectedAt?: string;
  createdAt: number;
}

interface NotifLog {
  packageId: string;
  message: string;
  timestamp: string;
}

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const KEY = (id: string) => `sitecore_packages_${id}`;

function isOverdue(pkg: PackageItem): boolean {
  if (pkg.status !== "waiting") return false;
  const created = pkg.createdAt || new Date(pkg.receivedDate).getTime();
  return Date.now() - created > 7 * 24 * 60 * 60 * 1000;
}

export default function PackageTracking({ buildingId, isOwner, t }: Props) {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [notifLogs, setNotifLogs] = useState<NotifLog[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [form, setForm] = useState({
    apartmentNo: "",
    recipientName: "",
    carrier: "PTT" as PackageItem["carrier"],
    trackingNumber: "",
    barcodeRef: "",
    receivedDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const raw = localStorage.getItem(KEY(buildingId));
    if (raw) {
      const parsed = JSON.parse(raw);
      setPackages(parsed.map((p: any) => ({ barcodeRef: "", ...p })));
    } else {
      const seed: PackageItem[] = [
        {
          id: "p1",
          apartmentNo: "101",
          recipientName: "Ahmet Yılmaz",
          carrier: "PTT",
          trackingNumber: "TR123456789",
          barcodeRef: "BC-001",
          receivedDate: "2026-03-20",
          status: "waiting",
          createdAt: Date.now() - 8 * 86400000,
        },
        {
          id: "p2",
          apartmentNo: "202",
          recipientName: "Fatma Kaya",
          carrier: "Yurtıçi",
          trackingNumber: "YK987654321",
          barcodeRef: "",
          receivedDate: "2026-03-20",
          status: "waiting",
          createdAt: Date.now() - 86400000,
        },
        {
          id: "p3",
          apartmentNo: "301",
          recipientName: "Mehmet Demir",
          carrier: "Aras",
          trackingNumber: "",
          barcodeRef: "BC-003",
          receivedDate: "2026-03-19",
          status: "collected",
          collectedAt: "2026-03-20",
          createdAt: Date.now() - 2 * 86400000,
        },
        {
          id: "p4",
          apartmentNo: "105",
          recipientName: "Ayşe Çelik",
          carrier: "MNG",
          trackingNumber: "MNG112233",
          barcodeRef: "",
          receivedDate: "2026-03-21",
          status: "waiting",
          createdAt: Date.now() - 43200000,
        },
        {
          id: "p5",
          apartmentNo: "101",
          recipientName: "Ahmet Yılmaz",
          carrier: "PTT",
          trackingNumber: "TR999888",
          barcodeRef: "BC-005",
          receivedDate: "2026-03-18",
          status: "collected",
          collectedAt: "2026-03-19",
          createdAt: Date.now() - 3 * 86400000,
        },
      ];
      const logs: NotifLog[] = [
        {
          packageId: "p1",
          message:
            "Kargo bekleniyor bildirimi gönderildi - Ahmet Yılmaz (D:101)",
          timestamp: new Date(Date.now() - 6 * 86400000).toLocaleString(),
        },
        {
          packageId: "p2",
          message: "Yeni kargo bildirimi - Fatma Kaya (D:202)",
          timestamp: new Date(Date.now() - 86400000).toLocaleString(),
        },
        {
          packageId: "p3",
          message: "Kargo teslim alındı bildirimi - Mehmet Demir (D:301)",
          timestamp: new Date(Date.now() - 86400000 + 3600000).toLocaleString(),
        },
      ];
      setPackages(seed);
      setNotifLogs(logs);
      localStorage.setItem(KEY(buildingId), JSON.stringify(seed));
    }
  }, [buildingId]);

  const save = (updated: PackageItem[], logs?: NotifLog[]) => {
    setPackages(updated);
    localStorage.setItem(KEY(buildingId), JSON.stringify(updated));
    if (logs) setNotifLogs(logs);
  };

  const handleSubmit = () => {
    if (!form.apartmentNo.trim() || !form.recipientName.trim()) return;
    const newPkg: PackageItem = {
      id: Date.now().toString(),
      ...form,
      status: "waiting",
      createdAt: Date.now(),
    };
    const newLog: NotifLog = {
      packageId: newPkg.id,
      message: `Yeni kargo kaydı - ${form.recipientName} (D:${form.apartmentNo})`,
      timestamp: new Date().toLocaleString(),
    };
    save([...packages, newPkg], [newLog, ...notifLogs]);
    setShowDialog(false);
    setForm({
      apartmentNo: "",
      recipientName: "",
      carrier: "PTT",
      trackingNumber: "",
      barcodeRef: "",
      receivedDate: new Date().toISOString().split("T")[0],
    });
  };

  const markCollected = (id: string) => {
    const pkg = packages.find((p) => p.id === id);
    if (!pkg) return;
    const newLog: NotifLog = {
      packageId: id,
      message: `Kargo teslim alındı - ${pkg.recipientName} (D:${pkg.apartmentNo})`,
      timestamp: new Date().toLocaleString(),
    };
    save(
      packages.map((p) =>
        p.id === id
          ? {
              ...p,
              status: "collected",
              collectedAt: new Date().toISOString().split("T")[0],
            }
          : p,
      ),
      [newLog, ...notifLogs],
    );
  };

  const today = new Date().toISOString().split("T")[0];
  const waiting = packages.filter(
    (p) => p.status === "waiting" && !isOverdue(p),
  ).length;
  const overdueCount = packages.filter((p) => isOverdue(p)).length;
  const collectedToday = packages.filter(
    (p) => p.status === "collected" && p.collectedAt === today,
  ).length;

  // Per-apartment stats
  const aptStats = useMemo(() => {
    const map: Record<
      string,
      { total: number; waiting: number; collected: number }
    > = {};
    for (const p of packages) {
      if (!map[p.apartmentNo])
        map[p.apartmentNo] = { total: 0, waiting: 0, collected: 0 };
      map[p.apartmentNo].total++;
      if (p.status === "waiting") map[p.apartmentNo].waiting++;
      else map[p.apartmentNo].collected++;
    }
    return Object.entries(map)
      .map(([apt, stats]) => ({ apt, ...stats }))
      .sort((a, b) => b.total - a.total);
  }, [packages]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#0E1116]">
          {t.packageTracking || "Kargo & Paket Takibi"}
        </h2>
        {isOwner && (
          <Button
            onClick={() => setShowDialog(true)}
            className="bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full"
            data-ocid="packages.primary_button"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t.addPackage || "Paket Ekle"}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-[#E8EDF5]">
          <p className="text-sm text-[#6B7A8D]">
            {t.waitingPackages || "Bekleyen"}
          </p>
          <p className="text-2xl font-bold text-amber-600">{waiting}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#E8EDF5]">
          <p className="text-sm text-[#6B7A8D]">Gecikmiş (&gt;7 gün)</p>
          <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#E8EDF5]">
          <p className="text-sm text-[#6B7A8D]">
            {t.collectedToday || "Bugün Teslim"}
          </p>
          <p className="text-2xl font-bold text-green-600">{collectedToday}</p>
        </div>
      </div>

      <Tabs defaultValue="list">
        <TabsList className="bg-[#F3F6FB]">
          <TabsTrigger value="list" data-ocid="packages.tab">
            Paket Listesi
          </TabsTrigger>
          <TabsTrigger value="stats" data-ocid="packages.tab">
            <BarChart2 className="w-3.5 h-3.5 mr-1" />
            Daire İstatistikleri
          </TabsTrigger>
          <TabsTrigger value="notifications" data-ocid="packages.tab">
            Bildirim Geçmişi
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <div className="bg-white rounded-2xl border border-[#E8EDF5] overflow-hidden">
            {packages.length === 0 ? (
              <div
                className="p-12 text-center"
                data-ocid="packages.empty_state"
              >
                <Package className="h-10 w-10 text-[#D7DEE9] mx-auto mb-3" />
                <p className="text-[#6B7A8D]">
                  {t.noPackages || "Kayıtlı paket yok."}
                </p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-[#F3F6FB]">
                  <tr>
                    <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                      {t.apartmentNo || "Daire"}
                    </th>
                    <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                      {t.recipient || "Alıcı"}
                    </th>
                    <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                      {t.carrier || "Kargo"}
                    </th>
                    <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                      Barkod / Ref
                    </th>
                    <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                      {t.receivedDate || "Geliş"}
                    </th>
                    <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                      {t.status || "Durum"}
                    </th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {packages.map((p, i) => {
                    const overdue = isOverdue(p);
                    return (
                      <tr
                        key={p.id}
                        className={`border-t border-[#F0F3F8] hover:bg-[#FAFBFD] ${
                          overdue ? "bg-red-50/40" : ""
                        }`}
                        data-ocid={`packages.item.${i + 1}`}
                      >
                        <td className="px-4 py-3 font-semibold text-[#0E1116]">
                          {p.apartmentNo}
                        </td>
                        <td className="px-4 py-3 text-[#3A4654]">
                          {p.recipientName}
                        </td>
                        <td className="px-4 py-3">
                          <Badge className="bg-[#F1F4F8] text-[#3A4654]">
                            {p.carrier}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-xs text-[#6B7A8D] font-mono">
                          {p.barcodeRef || p.trackingNumber || "—"}
                        </td>
                        <td className="px-4 py-3 text-[#6B7A8D]">
                          {p.receivedDate}
                        </td>
                        <td className="px-4 py-3">
                          {overdue ? (
                            <Badge className="bg-red-100 text-red-700">
                              Gecikmiş
                            </Badge>
                          ) : p.status === "waiting" ? (
                            <Badge className="bg-amber-100 text-amber-700">
                              {t.waiting || "Bekliyor"}
                            </Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-700">
                              {t.collected || "Teslim Alındı"}
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {p.status === "waiting" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markCollected(p.id)}
                              className="text-xs rounded-full"
                              data-ocid={`packages.toggle.${i + 1}`}
                            >
                              {t.markCollected || "Teslim Alındı"}
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="mt-4">
          <div className="bg-white rounded-2xl border border-[#E8EDF5] overflow-hidden">
            {aptStats.length === 0 ? (
              <div className="p-10 text-center">
                <BarChart2 className="h-8 w-8 text-[#D7DEE9] mx-auto mb-2" />
                <p className="text-[#6B7A8D] text-sm">Henüz istatistik yok.</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-[#F3F6FB]">
                  <tr>
                    <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                      Daire No
                    </th>
                    <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                      Toplam
                    </th>
                    <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                      Bekleyen
                    </th>
                    <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                      Teslim Alınan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {aptStats.map((row, i) => (
                    <tr
                      key={row.apt}
                      className={`border-t border-[#F0F3F8] ${i === 0 ? "bg-amber-50/40" : ""}`}
                    >
                      <td className="px-4 py-3 font-semibold text-[#0E1116]">
                        Daire {row.apt}
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-[#EEF3FA] text-[#4A90D9] text-xs font-bold px-2 py-0.5 rounded-full">
                          {row.total}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-amber-600 font-medium">
                        {row.waiting}
                      </td>
                      <td className="px-4 py-3 text-green-600 font-medium">
                        {row.collected}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <div className="bg-white rounded-2xl border border-[#E8EDF5] overflow-hidden">
            {notifLogs.length === 0 ? (
              <div className="p-10 text-center">
                <Bell className="h-8 w-8 text-[#D7DEE9] mx-auto mb-2" />
                <p className="text-[#6B7A8D] text-sm">Bildirim geçmişi yok.</p>
              </div>
            ) : (
              <div className="divide-y divide-[#F0F3F8]">
                {notifLogs.map((log, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: notification log positional
                  <div key={i} className="px-4 py-3 flex items-start gap-3">
                    <Bell className="h-4 w-4 text-[#4A90D9] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-[#0E1116]">{log.message}</p>
                      <p className="text-xs text-[#6B7A8D] mt-0.5">
                        {log.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md" data-ocid="packages.dialog">
          <DialogHeader>
            <DialogTitle>{t.addPackage || "Paket Kaydı Ekle"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  {t.apartmentNo || "Daire No"}
                </p>
                <Input
                  value={form.apartmentNo}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, apartmentNo: e.target.value }))
                  }
                  placeholder="101"
                  data-ocid="packages.input"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  {t.recipient || "Alıcı Adı"}
                </p>
                <Input
                  value={form.recipientName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, recipientName: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.carrier || "Kargo Firması"}
              </p>
              <select
                value={form.carrier}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    carrier: e.target.value as PackageItem["carrier"],
                  }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                data-ocid="packages.select"
              >
                <option value="PTT">PTT</option>
                <option value="Yurtıçi">Yurtıçi Kargo</option>
                <option value="Aras">Aras Kargo</option>
                <option value="MNG">MNG Kargo</option>
                <option value="Diğer">{t.other || "Diğer"}</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  Barkod / Ref No
                </p>
                <Input
                  value={form.barcodeRef}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, barcodeRef: e.target.value }))
                  }
                  placeholder="BC-001"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  {t.trackingNumber || "Takip No"}
                </p>
                <Input
                  value={form.trackingNumber}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, trackingNumber: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.receivedDate || "Geliş Tarihi"}
              </p>
              <Input
                type="date"
                value={form.receivedDate}
                onChange={(e) =>
                  setForm((p) => ({ ...p, receivedDate: e.target.value }))
                }
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full"
                data-ocid="packages.submit_button"
              >
                {t.addPackage || "Ekle"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDialog(false)}
                className="flex-1 rounded-full"
                data-ocid="packages.cancel_button"
              >
                {t.cancel || "İptal"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
