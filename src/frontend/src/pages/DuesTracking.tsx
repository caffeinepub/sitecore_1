import { DollarSign } from "lucide-react";
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
import type { Apartment, DueRecord } from "../types";

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const APT_KEY = (id: string) => `sitecore_apartments_${id}`;
const DUES_KEY = (id: string) => `sitecore_dues_${id}`;

function currentMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default function DuesTracking({ buildingId, isOwner, t }: Props) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [dues, setDues] = useState<DueRecord[]>([]);
  const [month, setMonth] = useState(currentMonth());
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [bulkAmount, setBulkAmount] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(APT_KEY(buildingId));
    if (raw) setApartments(JSON.parse(raw));
    const dRaw = localStorage.getItem(DUES_KEY(buildingId));
    if (dRaw) setDues(JSON.parse(dRaw));
  }, [buildingId]);

  const saveDues = (updated: DueRecord[]) => {
    setDues(updated);
    localStorage.setItem(DUES_KEY(buildingId), JSON.stringify(updated));
  };

  const monthDues = useMemo(
    () => dues.filter((d) => d.month === month),
    [dues, month],
  );

  const getDue = (aptId: string) =>
    monthDues.find((d) => d.apartmentId === aptId);

  const ensureDue = (aptId: string, amount = 0): DueRecord => {
    const existing = getDue(aptId);
    if (existing) return existing;
    const newDue: DueRecord = {
      id: crypto.randomUUID(),
      buildingId,
      apartmentId: aptId,
      month,
      amount,
      status: "pending",
      note: "",
    };
    const updated = [...dues, newDue];
    saveDues(updated);
    return newDue;
  };

  const setStatus = (aptId: string, status: DueRecord["status"]) => {
    const due = ensureDue(aptId);
    const updated = dues.map((d) =>
      d.id === due.id
        ? { ...d, status, paidAt: status === "paid" ? Date.now() : d.paidAt }
        : d,
    );
    saveDues(updated);
  };

  const setAmount = (aptId: string, amount: number) => {
    const due = getDue(aptId);
    if (due) {
      saveDues(dues.map((d) => (d.id === due.id ? { ...d, amount } : d)));
    } else {
      ensureDue(aptId, amount);
    }
  };

  const applyBulkAmount = () => {
    const amt = Number(bulkAmount);
    if (!amt) return;
    const updated = [...dues];
    for (const apt of apartments) {
      const idx = updated.findIndex(
        (d) => d.apartmentId === apt.id && d.month === month,
      );
      if (idx >= 0) {
        updated[idx] = { ...updated[idx], amount: amt };
      } else {
        updated.push({
          id: crypto.randomUUID(),
          buildingId,
          apartmentId: apt.id,
          month,
          amount: amt,
          status: "pending",
          note: "",
        });
      }
    }
    saveDues(updated);
    setShowBulkDialog(false);
    setBulkAmount("");
  };

  const totalCollected = monthDues
    .filter((d) => d.status === "paid")
    .reduce((s, d) => s + d.amount, 0);
  const totalPending = monthDues
    .filter((d) => d.status === "pending")
    .reduce((s, d) => s + d.amount, 0);
  const totalOverdue = monthDues
    .filter((d) => d.status === "overdue")
    .reduce((s, d) => s + d.amount, 0);

  const statusBadge = (status?: DueRecord["status"]) => {
    if (status === "paid")
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200">
          {t.paid}
        </Badge>
      );
    if (status === "overdue")
      return (
        <Badge className="bg-red-100 text-red-700 border-red-200">
          {t.overdue}
        </Badge>
      );
    return (
      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
        {t.pending}
      </Badge>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0E1116]">{t.dues}</h2>
        <div className="flex items-center gap-2">
          <Input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-40 text-sm"
          />
          {isOwner && (
            <Button
              data-ocid="dues.primary_button"
              onClick={() => setShowBulkDialog(true)}
              className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full text-sm"
            >
              {t.setMonthlyDues}
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
          <p className="text-3xl font-bold text-green-600">
            {totalCollected.toLocaleString()} ₺
          </p>
          <p className="text-[#3A4654] text-sm mt-1 flex items-center gap-1">
            <DollarSign className="w-3 h-3" /> {t.totalCollected}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
          <p className="text-3xl font-bold text-yellow-600">
            {totalPending.toLocaleString()} ₺
          </p>
          <p className="text-[#3A4654] text-sm mt-1">{t.totalPending}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
          <p className="text-3xl font-bold text-red-500">
            {totalOverdue.toLocaleString()} ₺
          </p>
          <p className="text-[#3A4654] text-sm mt-1">{t.overdue}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5EAF2] overflow-hidden">
        {apartments.length === 0 ? (
          <div
            data-ocid="dues.empty_state"
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
                  {t.resident}
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#3A4654]">
                  {t.dueAmount}
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#3A4654]">
                  {t.status}
                </th>
                {isOwner && <th className="px-4 py-3" />}
              </tr>
            </thead>
            <tbody>
              {apartments.map((apt, idx) => {
                const due = getDue(apt.id);
                return (
                  <tr
                    key={apt.id}
                    data-ocid={`dues.item.${idx + 1}`}
                    className="border-b border-[#E5EAF2] last:border-0 hover:bg-[#F9FAFB]"
                  >
                    <td className="px-4 py-3 font-medium text-[#0E1116]">
                      {apt.block ? `${apt.block}-` : ""}
                      {apt.number}
                    </td>
                    <td className="px-4 py-3 text-[#3A4654]">
                      {apt.residentName || (
                        <span className="text-[#3A4654]/40">
                          {t.noResident}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {isOwner ? (
                        <Input
                          type="number"
                          value={due?.amount ?? ""}
                          onChange={(e) =>
                            setAmount(apt.id, Number(e.target.value))
                          }
                          className="w-24 h-7 text-sm"
                          placeholder="0"
                        />
                      ) : (
                        <span className="text-[#0E1116]">
                          {due?.amount ?? 0} ₺
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">{statusBadge(due?.status)}</td>
                    {isOwner && (
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-end">
                          <Button
                            data-ocid={`dues.toggle.${idx + 1}`}
                            onClick={() => setStatus(apt.id, "paid")}
                            size="sm"
                            variant="outline"
                            className="text-xs text-green-600 border-green-200 hover:bg-green-50 rounded-full h-7"
                          >
                            {t.markPaid}
                          </Button>
                          <Button
                            onClick={() => setStatus(apt.id, "overdue")}
                            size="sm"
                            variant="outline"
                            className="text-xs text-red-500 border-red-200 hover:bg-red-50 rounded-full h-7"
                          >
                            {t.markOverdue}
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Bulk Dialog */}
      <Dialog open={showBulkDialog} onOpenChange={setShowBulkDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t.setMonthlyDues}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.dueAmount} (₺)
              </p>
              <Input
                data-ocid="dues.input"
                type="number"
                value={bulkAmount}
                onChange={(e) => setBulkAmount(e.target.value)}
                placeholder="500"
              />
            </div>
            <Button
              data-ocid="dues.submit_button"
              onClick={applyBulkAmount}
              disabled={!bulkAmount}
              className="w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
            >
              {t.applyToAll}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
