import { Edit2, Home, Plus, Trash2, Users } from "lucide-react";
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
import type { Apartment } from "../types";

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const STORAGE_KEY = (id: string) => `sitecore_apartments_${id}`;

const APT_TYPES = ["Stüdyo", "1+1", "2+1", "3+1", "4+1", "Diğer"];

export default function ApartmentManagement({
  buildingId,
  userId: _userId,
  isOwner,
  t,
}: Props) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editTarget, setEditTarget] = useState<Apartment | null>(null);

  const [form, setForm] = useState({
    number: "",
    floor: "",
    block: "",
    type: "2+1",
    residentName: "",
    residentUserId: "",
  });

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY(buildingId));
    if (raw) setApartments(JSON.parse(raw));
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
            }
          : a,
      );
      save(updated);
    } else {
      const newApt: Apartment = {
        id: crypto.randomUUID(),
        buildingId,
        number: form.number.trim(),
        floor: Number(form.floor) || 0,
        block: form.block.trim(),
        type: form.type,
        residentName: form.residentName.trim(),
        residentUserId: form.residentUserId.trim(),
        createdAt: Date.now(),
      };
      save([...apartments, newApt]);
    }
    setShowDialog(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    save(apartments.filter((a) => a.id !== id));
  };

  const occupied = apartments.filter((a) => a.residentName).length;

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
      <div className="grid grid-cols-3 gap-4 mb-6">
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
            <Users className="w-3 h-3" /> {t.occupiedApartments}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-[#F2A23A]">
            {apartments.length - occupied}
          </p>
          <p className="text-[#3A4654] text-sm mt-1">{t.emptyApartments}</p>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5EAF2] overflow-hidden">
        {apartments.length === 0 ? (
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
                {isOwner && <th className="px-4 py-3" />}
              </tr>
            </thead>
            <tbody>
              {apartments.map((apt, idx) => (
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
                      <span className="text-[#0E1116]">{apt.residentName}</span>
                    ) : (
                      <span className="text-[#3A4654]/50 text-sm">
                        {t.noResident}
                      </span>
                    )}
                  </td>
                  {isOwner && (
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
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
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Dialog */}
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
