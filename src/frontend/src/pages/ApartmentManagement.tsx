import { Edit2, Eye, Home, Plus, Trash2, Users, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
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
import type { Apartment } from "../types";

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const STORAGE_KEY = (id: string) => `sitecore_apartments_${id}`;
const DUES_KEY = (id: string) => `sitecore_dues_${id}`;
const MAINT_KEY = (id: string) => `sitecore_maintenance_${id}`;

const APT_TYPES = ["Stüdyo", "1+1", "2+1", "3+1", "4+1", "Diğer"];
const STATUSES = [
  { value: "occupied", label: "Dolu", color: "bg-green-100 text-green-700" },
  { value: "empty", label: "Boş", color: "bg-gray-100 text-gray-600" },
  {
    value: "maintenance",
    label: "Bakımda",
    color: "bg-orange-100 text-orange-700",
  },
];

export default function ApartmentManagement({
  buildingId,
  userId: _userId,
  isOwner,
  t,
}: Props) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [dues, setDues] = useState<any[]>([]);
  const [maintenance, setMaintenance] = useState<any[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [detailApt, setDetailApt] = useState<Apartment | null>(null);
  const [editTarget, setEditTarget] = useState<Apartment | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const [form, setForm] = useState({
    number: "",
    floor: "",
    block: "",
    type: "2+1",
    residentName: "",
    residentUserId: "",
    status: "occupied",
  });

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY(buildingId));
    if (raw) setApartments(JSON.parse(raw));
    const dRaw = localStorage.getItem(DUES_KEY(buildingId));
    if (dRaw) setDues(JSON.parse(dRaw));
    const mRaw = localStorage.getItem(MAINT_KEY(buildingId));
    if (mRaw) setMaintenance(JSON.parse(mRaw));
  }, [buildingId]);

  const save = (updated: Apartment[]) => {
    setApartments(updated);
    localStorage.setItem(STORAGE_KEY(buildingId), JSON.stringify(updated));
  };

  const resetForm = () =>
    setForm({
      number: "",
      floor: "",
      block: "",
      type: "2+1",
      residentName: "",
      residentUserId: "",
      status: "occupied",
    });

  const openAdd = () => {
    setEditTarget(null);
    resetForm();
    setShowDialog(true);
  };

  const openEdit = (apt: Apartment) => {
    setEditTarget(apt);
    setForm({
      number: apt.number,
      floor: String(apt.floor),
      block: apt.block,
      type: apt.type,
      residentName: apt.residentName,
      residentUserId: apt.residentUserId,
      status: (apt as any).status || "occupied",
    });
    setShowDialog(true);
  };

  const handleSubmit = () => {
    if (!form.number.trim()) return;
    if (editTarget) {
      const updated = apartments.map((a) =>
        a.id === editTarget.id
          ? {
              ...a,
              number: form.number.trim(),
              floor: Number(form.floor) || 0,
              block: form.block.trim(),
              type: form.type,
              residentName: form.residentName.trim(),
              residentUserId: form.residentUserId.trim(),
              status: form.status,
            }
          : a,
      );
      save(updated);
    } else {
      const newApt: any = {
        id: crypto.randomUUID(),
        buildingId,
        number: form.number.trim(),
        floor: Number(form.floor) || 0,
        block: form.block.trim(),
        type: form.type,
        residentName: form.residentName.trim(),
        residentUserId: form.residentUserId.trim(),
        status: form.status,
        createdAt: Date.now(),
      };
      save([...apartments, newApt]);
    }
    setShowDialog(false);
    resetForm();
  };

  const handleDelete = (id: string) =>
    save(apartments.filter((a) => a.id !== id));

  const getStatus = (apt: any) =>
    apt.status || (apt.residentName ? "occupied" : "empty");

  const statusInfo = (val: string) =>
    STATUSES.find((s) => s.value === val) || STATUSES[0];

  const filtered =
    filterStatus === "all"
      ? apartments
      : apartments.filter((a) => getStatus(a) === filterStatus);

  const occupied = apartments.filter((a) => getStatus(a) === "occupied").length;
  const empty = apartments.filter((a) => getStatus(a) === "empty").length;
  const inMaint = apartments.filter(
    (a) => getStatus(a) === "maintenance",
  ).length;

  const aptDues = (aptNo: string) =>
    dues.filter(
      (d: any) => d.apartmentNumber === aptNo || d.apartmentNo === aptNo,
    );
  const aptMaint = (aptId: string) =>
    maintenance.filter((m: any) => m.apartmentId === aptId);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0E1116]">{t.apartments}</h2>
        {isOwner && (
          <Button
            data-ocid="apartments.primary_button"
            onClick={openAdd}
            className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2"
          >
            <Plus className="w-4 h-4" />
            {t.addApartment}
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-[#0B1B2E]">
            {apartments.length}
          </p>
          <p className="text-[#3A4654] text-sm mt-1 flex items-center justify-center gap-1">
            <Home className="w-3 h-3" /> {t.totalApartments}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-green-600">{occupied}</p>
          <p className="text-[#3A4654] text-sm mt-1 flex items-center justify-center gap-1">
            <Users className="w-3 h-3" /> Dolu
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-[#F2A23A]">{empty}</p>
          <p className="text-[#3A4654] text-sm mt-1">{t.emptyApartments}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-orange-500">{inMaint}</p>
          <p className="text-[#3A4654] text-sm mt-1 flex items-center justify-center gap-1">
            <Wrench className="w-3 h-3" /> Bakımda
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {["all", "occupied", "empty", "maintenance"].map((s) => (
          <Button
            key={s}
            size="sm"
            variant={filterStatus === s ? "default" : "outline"}
            onClick={() => setFilterStatus(s)}
            className={
              filterStatus === s
                ? "bg-[#4A90D9] text-white rounded-full"
                : "rounded-full"
            }
          >
            {s === "all" ? "Tümü" : statusInfo(s).label}
          </Button>
        ))}
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5EAF2] overflow-hidden">
        {filtered.length === 0 ? (
          <div
            data-ocid="apartments.empty_state"
            className="py-12 text-center text-[#3A4654]"
          >
            {t.noApartments}
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-[#F3F6FB] border-b border-[#E5EAF2]">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#3A4654]">
                  {t.apartmentNumber}
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#3A4654]">
                  {t.floor}
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#3A4654]">
                  {t.block}
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#3A4654]">
                  {t.apartmentType}
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#3A4654]">
                  {t.resident}
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#3A4654]">
                  Durum
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((apt, idx) => {
                const st = statusInfo(getStatus(apt));
                return (
                  <tr
                    key={apt.id}
                    data-ocid={`apartments.item.${idx + 1}`}
                    className="border-b border-[#E5EAF2] last:border-0 hover:bg-[#F9FAFB]"
                  >
                    <td className="px-4 py-3 font-medium text-[#0E1116]">
                      {apt.number}
                    </td>
                    <td className="px-4 py-3 text-[#3A4654]">{apt.floor}</td>
                    <td className="px-4 py-3 text-[#3A4654]">
                      {apt.block || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="bg-[#EEF3FA] text-[#4A90D9] border-0 text-xs">
                        {apt.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {apt.residentName ? (
                        <span className="text-[#0E1116]">
                          {apt.residentName}
                        </span>
                      ) : (
                        <span className="text-[#3A4654]/50 text-sm">
                          {t.noResident}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={`${st.color} border-0 text-xs`}>
                        {st.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <Button
                          onClick={() => setDetailApt(apt)}
                          variant="ghost"
                          size="sm"
                          className="text-[#4A90D9] hover:text-[#3B82C4] h-7 w-7 p-0"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                        {isOwner && (
                          <>
                            <Button
                              data-ocid={`apartments.edit_button.${idx + 1}`}
                              onClick={() => openEdit(apt)}
                              variant="ghost"
                              size="sm"
                              className="text-[#4A90D9] hover:text-[#3B82C4] h-7 w-7 p-0"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              data-ocid={`apartments.delete_button.${idx + 1}`}
                              onClick={() => handleDelete(apt.id)}
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-600 h-7 w-7 p-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail Dialog */}
      {detailApt && (
        <Dialog open={!!detailApt} onOpenChange={() => setDetailApt(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Daire {detailApt.number} - Detay</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="info">
              <TabsList className="mb-4">
                <TabsTrigger value="info">Genel</TabsTrigger>
                <TabsTrigger value="dues">Aidat Özeti</TabsTrigger>
                <TabsTrigger value="maint">Bakım Kayıtları</TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#3A4654]">Daire No:</span>
                    <span className="font-medium">{detailApt.number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3A4654]">Kat:</span>
                    <span>{detailApt.floor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3A4654]">Blok:</span>
                    <span>{detailApt.block || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3A4654]">Tip:</span>
                    <span>{detailApt.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3A4654]">Sakin:</span>
                    <span>{detailApt.residentName || "Boş"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3A4654]">Durum:</span>
                    <Badge
                      className={`${statusInfo(getStatus(detailApt)).color} border-0 text-xs`}
                    >
                      {statusInfo(getStatus(detailApt)).label}
                    </Badge>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="dues">
                {aptDues(detailApt.number).length === 0 ? (
                  <p className="text-center text-[#3A4654] py-6 text-sm">
                    Aidat kaydı bulunamadı.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {aptDues(detailApt.number)
                      .slice(0, 8)
                      .map((d: any, i: number) => (
                        <div
                          key={d.month || d.period || i}
                          className="flex justify-between text-sm border-b border-[#E5EAF2] pb-2"
                        >
                          <span>{d.month || d.period}</span>
                          <Badge
                            className={
                              d.status === "paid"
                                ? "bg-green-100 text-green-700 border-0"
                                : "bg-red-100 text-red-700 border-0"
                            }
                          >
                            {d.status === "paid" ? "Ödendi" : "Bekliyor"}
                          </Badge>
                        </div>
                      ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="maint">
                {aptMaint(detailApt.id).length === 0 ? (
                  <p className="text-center text-[#3A4654] py-6 text-sm">
                    Bakım kaydı bulunamadı.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {aptMaint(detailApt.id)
                      .slice(0, 5)
                      .map((m: any, i: number) => (
                        <div
                          key={m.title || i}
                          className="text-sm border-b border-[#E5EAF2] pb-2"
                        >
                          <p className="font-medium">{m.title}</p>
                          <p className="text-[#3A4654]">{m.date}</p>
                        </div>
                      ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {editTarget ? t.editApartment : t.addApartment}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.apartmentNumber} *
              </p>
              <Input
                data-ocid="apartments.input"
                value={form.number}
                onChange={(e) =>
                  setForm((p) => ({ ...p, number: e.target.value }))
                }
                placeholder="12 / 3A"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  {t.floor}
                </p>
                <Input
                  type="number"
                  value={form.floor}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, floor: e.target.value }))
                  }
                  placeholder="1"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  {t.block}
                </p>
                <Input
                  value={form.block}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, block: e.target.value }))
                  }
                  placeholder="A"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.apartmentType}
              </p>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm((p) => ({ ...p, type: e.target.value }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]"
              >
                {APT_TYPES.map((tp) => (
                  <option key={tp} value={tp}>
                    {tp}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Durum
              </p>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((p) => ({ ...p, status: e.target.value }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.resident}
              </p>
              <Input
                value={form.residentName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, residentName: e.target.value }))
                }
                placeholder="Ad Soyad"
              />
            </div>
            <Button
              data-ocid="apartments.submit_button"
              onClick={handleSubmit}
              disabled={!form.number.trim()}
              className="w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
            >
              {editTarget ? t.save : t.addApartment}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
