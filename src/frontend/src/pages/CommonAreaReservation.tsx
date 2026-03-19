import {
  CheckCircle,
  Clock,
  MapPin,
  Plus,
  Trash2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { useTranslation } from "../hooks/useTranslation";

interface CommonArea {
  id: string;
  name: string;
  description: string;
  capacity: number;
}

interface Reservation {
  id: string;
  areaId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface Props {
  userId: string;
  isOwnerOrManager: boolean;
}

export default function CommonAreaReservation({
  userId,
  isOwnerOrManager,
}: Props) {
  const { t } = useTranslation();

  const [areas, setAreas] = useState<CommonArea[]>([
    {
      id: "1",
      name: t.areaGym || "Spor Salonu",
      description: "",
      capacity: 10,
    },
    {
      id: "2",
      name: t.areaMeetingRoom || "Toplantı Odası",
      description: "",
      capacity: 20,
    },
    {
      id: "3",
      name: t.areaGarden || "Bahçe / Teras",
      description: "",
      capacity: 50,
    },
  ]);

  const [reservations, setReservations] = useState<Reservation[]>([]);

  const [showReserveModal, setShowReserveModal] = useState(false);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [resDate, setResDate] = useState("");
  const [resStart, setResStart] = useState("");
  const [resEnd, setResEnd] = useState("");
  const [resPurpose, setResPurpose] = useState("");
  const [newAreaName, setNewAreaName] = useState("");
  const [newAreaCapacity, setNewAreaCapacity] = useState("");

  const handleReserve = () => {
    if (!selectedArea || !resDate || !resStart || !resEnd) return;
    const newRes: Reservation = {
      id: Date.now().toString(),
      areaId: selectedArea,
      userId,
      date: resDate,
      startTime: resStart,
      endTime: resEnd,
      purpose: resPurpose,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setReservations([newRes, ...reservations]);
    setShowReserveModal(false);
    setResDate("");
    setResStart("");
    setResEnd("");
    setResPurpose("");
  };

  const handleAddArea = () => {
    if (!newAreaName) return;
    const newArea: CommonArea = {
      id: Date.now().toString(),
      name: newAreaName,
      description: "",
      capacity: Number(newAreaCapacity) || 0,
    };
    setAreas([...areas, newArea]);
    setNewAreaName("");
    setNewAreaCapacity("");
    setShowAreaModal(false);
  };

  const handleDeleteArea = (areaId: string) => {
    setAreas(areas.filter((a) => a.id !== areaId));
    setReservations(reservations.filter((r) => r.areaId !== areaId));
  };

  const handleApprove = (resId: string) => {
    setReservations(
      reservations.map((r) =>
        r.id === resId ? { ...r, status: "approved" } : r,
      ),
    );
  };

  const handleReject = (resId: string) => {
    setReservations(
      reservations.map((r) =>
        r.id === resId ? { ...r, status: "rejected" } : r,
      ),
    );
  };

  const handleDeleteRes = (resId: string) => {
    setReservations(reservations.filter((r) => r.id !== resId));
  };

  const statusColor = (status: Reservation["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
    }
  };

  const statusLabel = (status: Reservation["status"]) => {
    switch (status) {
      case "pending":
        return t.resPending || "Onay Bekliyor";
      case "approved":
        return t.resApproved || "Onaylandı";
      case "rejected":
        return t.resRejected || "Reddedildi";
    }
  };

  const myReservations = reservations.filter((r) => r.userId === userId);
  const pendingReservations = reservations.filter(
    (r) => r.status === "pending",
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#0B1B2E]">
            {t.commonAreas || "Ortak Alan Rezervasyonu"}
          </h2>
          <p className="text-sm text-[#6B7A8D] mt-1">
            {areas.length} {t.areasAvailable || "alan mevcut"}
          </p>
        </div>
        <div className="flex gap-2">
          {isOwnerOrManager && (
            <Button
              onClick={() => setShowAreaModal(true)}
              variant="outline"
              className="gap-2 border-[#1A3A5C] text-[#1A3A5C]"
            >
              <Plus className="w-4 h-4" />
              {t.addArea || "Alan Ekle"}
            </Button>
          )}
          <Button
            onClick={() => setShowReserveModal(true)}
            className="bg-[#1A3A5C] hover:bg-[#0B1B2E] text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            {t.makeReservation || "Rezervasyon Yap"}
          </Button>
        </div>
      </div>

      {/* Common Areas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {areas.map((area) => (
          <div
            key={area.id}
            className="bg-white rounded-xl border border-[#E2E8F0] p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#1A3A5C]" />
                  <span className="font-semibold text-[#0B1B2E]">
                    {area.name}
                  </span>
                </div>
                {area.capacity > 0 && (
                  <p className="text-xs text-[#6B7A8D] mt-1">
                    {t.capacity || "Kapasite"}: {area.capacity}
                  </p>
                )}
              </div>
              {isOwnerOrManager && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1"
                  onClick={() => handleDeleteArea(area.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            <Button
              className="w-full mt-3 bg-[#F3F6FB] hover:bg-[#E2E8F0] text-[#1A3A5C] text-sm"
              variant="outline"
              onClick={() => {
                setSelectedArea(area.id);
                setShowReserveModal(true);
              }}
            >
              {t.makeReservation || "Rezervasyon Yap"}
            </Button>
          </div>
        ))}
      </div>

      {/* Manager: Pending approvals */}
      {isOwnerOrManager && pendingReservations.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[#3A4654] uppercase tracking-wide">
            {t.pendingApprovals || "Onay Bekleyen Rezervasyonlar"} (
            {pendingReservations.length})
          </h3>
          {pendingReservations.map((res) => {
            const area = areas.find((a) => a.id === res.areaId);
            return (
              <div
                key={res.id}
                className="bg-white rounded-xl border border-yellow-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-[#0B1B2E]">
                      {area?.name}
                    </span>
                    <div className="flex gap-3 text-sm text-[#6B7A8D] mt-1">
                      <span>{res.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {res.startTime} - {res.endTime}
                      </span>
                      {res.purpose && <span>{res.purpose}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white gap-1"
                      onClick={() => handleApprove(res.id)}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      {t.approve || "Onayla"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50 gap-1"
                      onClick={() => handleReject(res.id)}
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      {t.reject || "Reddet"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* My Reservations */}
      {myReservations.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[#3A4654] uppercase tracking-wide">
            {t.myReservations || "Rezervasyonlarım"}
          </h3>
          {myReservations.map((res) => {
            const area = areas.find((a) => a.id === res.areaId);
            return (
              <div
                key={res.id}
                className="bg-white rounded-xl border border-[#E2E8F0] p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#0B1B2E]">
                        {area?.name}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(res.status)}`}
                      >
                        {statusLabel(res.status)}
                      </span>
                    </div>
                    <div className="flex gap-3 text-sm text-[#6B7A8D] mt-1">
                      <span>{res.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {res.startTime} - {res.endTime}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteRes(res.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {reservations.length === 0 && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-10 text-center">
          <MapPin className="w-10 h-10 text-[#B0BAC6] mx-auto mb-3" />
          <p className="text-[#6B7A8D]">
            {t.noReservations || "Henüz rezervasyon yapılmadı."}
          </p>
        </div>
      )}

      {/* Reserve Modal */}
      <Dialog open={showReserveModal} onOpenChange={setShowReserveModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.makeReservation || "Rezervasyon Yap"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label
                htmlFor="area-1"
                className="text-sm font-medium text-[#3A4654] mb-1 block"
              >
                {t.selectArea || "Alan Seçin"}
              </label>
              <select
                id="area-1"
                className="w-full border border-[#E2E8F0] rounded-lg p-2.5 text-sm text-[#0B1B2E] focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                <option value="">{t.selectArea || "Alan Seçin"}</option>
                {areas.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="area-2"
                className="text-sm font-medium text-[#3A4654] mb-1 block"
              >
                {t.meetingDate || "Tarih"}
              </label>
              <Input
                id="area-2"
                type="date"
                value={resDate}
                onChange={(e) => setResDate(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="area-3"
                  className="text-sm font-medium text-[#3A4654] mb-1 block"
                >
                  {t.startTime || "Başlangıç"}
                </label>
                <Input
                  id="area-3"
                  type="time"
                  value={resStart}
                  onChange={(e) => setResStart(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="area-4"
                  className="text-sm font-medium text-[#3A4654] mb-1 block"
                >
                  {t.endTime || "Bitiş"}
                </label>
                <Input
                  id="area-4"
                  type="time"
                  value={resEnd}
                  onChange={(e) => setResEnd(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="area-5"
                className="text-sm font-medium text-[#3A4654] mb-1 block"
              >
                {t.resPurpose || "Kullanım Amacı"}
              </label>
              <Input
                id="area-5"
                value={resPurpose}
                onChange={(e) => setResPurpose(e.target.value)}
                placeholder={t.resPurposePlaceholder || "Örn: Spor, Toplantı"}
              />
            </div>
            <p className="text-xs text-[#6B7A8D]">
              {t.reservationNote ||
                "Rezervasyonunuz yönetici onayından sonra aktif olacaktır."}
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowReserveModal(false)}
              >
                {t.cancel || "İptal"}
              </Button>
              <Button
                className="bg-[#1A3A5C] hover:bg-[#0B1B2E] text-white"
                onClick={handleReserve}
              >
                {t.sendRequest || "Talep Gönder"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Area Modal */}
      {isOwnerOrManager && (
        <Dialog open={showAreaModal} onOpenChange={setShowAreaModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.addArea || "Yeni Alan Ekle"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <label
                  htmlFor="area-6"
                  className="text-sm font-medium text-[#3A4654] mb-1 block"
                >
                  {t.areaName || "Alan Adı"}
                </label>
                <Input
                  id="area-6"
                  value={newAreaName}
                  onChange={(e) => setNewAreaName(e.target.value)}
                  placeholder={t.areaNamePlaceholder || "Örn: Yüzme Havuzu"}
                />
              </div>
              <div>
                <label
                  htmlFor="area-7"
                  className="text-sm font-medium text-[#3A4654] mb-1 block"
                >
                  {t.capacity || "Kapasite"}
                </label>
                <Input
                  id="area-7"
                  type="number"
                  value={newAreaCapacity}
                  onChange={(e) => setNewAreaCapacity(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowAreaModal(false)}
                >
                  {t.cancel || "İptal"}
                </Button>
                <Button
                  className="bg-[#1A3A5C] hover:bg-[#0B1B2E] text-white"
                  onClick={handleAddArea}
                >
                  {t.save || "Kaydet"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
