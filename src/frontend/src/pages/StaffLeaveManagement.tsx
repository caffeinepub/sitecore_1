import {
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Plus,
  TrendingUp,
  User,
  XCircle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface Props {
  buildingId: string;
  isOwner: boolean;
  t: Record<string, string>;
}

interface LeaveRecord {
  id: number;
  staff: string;
  role: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "onaylandi" | "bekliyor" | "reddedildi";
  approvedBy?: string;
}

interface OvertimeRecord {
  id: number;
  staff: string;
  role: string;
  date: string;
  hours: number;
  reason: string;
  status: "onaylandi" | "bekliyor" | "odendi" | "reddedildi";
}

const leaveTypes = [
  "Yıllık İzin",
  "Hastalık İzni",
  "Ücretsiz İzin",
  "Mazeret İzni",
  "Doğum İzni",
  "Ölüm İzni",
];

const staffList = [
  { name: "Ahmet Kaya", role: "Kapıcı" },
  { name: "Fatma Demir", role: "Temizlik Görevlisi" },
  { name: "Mehmet Yılmaz", role: "Güvenlik" },
  { name: "Ayşe Çelik", role: "Bahçıvan" },
  { name: "Hasan Arslan", role: "Teknik Görevli" },
];

const initialLeaves: LeaveRecord[] = [
  {
    id: 1,
    staff: "Ahmet Kaya",
    role: "Kapıcı",
    type: "Yıllık İzin",
    startDate: "2026-04-01",
    endDate: "2026-04-07",
    days: 7,
    reason: "Ailevi ziyaret",
    status: "onaylandi",
    approvedBy: "Yönetici",
  },
  {
    id: 2,
    staff: "Fatma Demir",
    role: "Temizlik Görevlisi",
    type: "Hastalık İzni",
    startDate: "2026-03-20",
    endDate: "2026-03-22",
    days: 3,
    reason: "Grip tedavisi",
    status: "onaylandi",
    approvedBy: "Yönetici",
  },
  {
    id: 3,
    staff: "Mehmet Yılmaz",
    role: "Güvenlik",
    type: "Mazeret İzni",
    startDate: "2026-04-10",
    endDate: "2026-04-10",
    days: 1,
    reason: "Resmi işlem",
    status: "bekliyor",
  },
  {
    id: 4,
    staff: "Ayşe Çelik",
    role: "Bahçıvan",
    type: "Yıllık İzin",
    startDate: "2026-05-15",
    endDate: "2026-05-22",
    days: 8,
    reason: "Tatil",
    status: "bekliyor",
  },
  {
    id: 5,
    staff: "Hasan Arslan",
    role: "Teknik Görevli",
    type: "Ücretsiz İzin",
    startDate: "2026-03-01",
    endDate: "2026-03-05",
    days: 5,
    reason: "Kişisel nedenler",
    status: "reddedildi",
  },
];

const initialOvertimes: OvertimeRecord[] = [
  {
    id: 1,
    staff: "Mehmet Yılmaz",
    role: "Güvenlik",
    date: "2026-03-15",
    hours: 4,
    reason: "Bina denetimi",
    status: "onaylandi",
  },
  {
    id: 2,
    staff: "Hasan Arslan",
    role: "Teknik Görevli",
    date: "2026-03-20",
    hours: 3,
    reason: "Asansör arızası acil onarım",
    status: "odendi",
  },
  {
    id: 3,
    staff: "Ahmet Kaya",
    role: "Kapıcı",
    date: "2026-03-22",
    hours: 2,
    reason: "Teslimat beklemek",
    status: "bekliyor",
  },
  {
    id: 4,
    staff: "Fatma Demir",
    role: "Temizlik Görevlisi",
    date: "2026-03-25",
    hours: 5,
    reason: "Genel temizlik sonrası ek çalışma",
    status: "onaylandi",
  },
];

type ActiveTab = "izinler" | "mesai" | "takvim" | "ozet";

export default function StaffLeaveManagement({ isOwner }: Props) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("izinler");
  const [leaves, setLeaves] = useState<LeaveRecord[]>(initialLeaves);
  const [overtimes, setOvertimes] =
    useState<OvertimeRecord[]>(initialOvertimes);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showOvertimeModal, setShowOvertimeModal] = useState(false);
  const [filterStaff, setFilterStaff] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [newLeave, setNewLeave] = useState({
    staff: "",
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [newOvertime, setNewOvertime] = useState({
    staff: "",
    date: "",
    hours: "",
    reason: "",
  });

  const statusColor: Record<string, string> = {
    onaylandi: "bg-green-100 text-green-700",
    bekliyor: "bg-yellow-100 text-yellow-700",
    reddedildi: "bg-red-100 text-red-700",
    odendi: "bg-blue-100 text-blue-700",
  };

  const statusLabel: Record<string, string> = {
    onaylandi: "Onaylandı",
    bekliyor: "Bekliyor",
    reddedildi: "Reddedildi",
    odendi: "Ödendi",
  };

  const filteredLeaves = leaves.filter((l) => {
    const matchStaff = filterStaff === "all" || l.staff === filterStaff;
    const matchStatus = filterStatus === "all" || l.status === filterStatus;
    return matchStaff && matchStatus;
  });

  const handleApproveLeave = (id: number) => {
    setLeaves((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: "onaylandi", approvedBy: "Yönetici" } : l,
      ),
    );
  };

  const handleRejectLeave = (id: number) => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: "reddedildi" } : l)),
    );
  };

  const handleApproveOvertime = (id: number) => {
    setOvertimes((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "onaylandi" } : o)),
    );
  };

  const handleAddLeave = () => {
    if (
      !newLeave.staff ||
      !newLeave.type ||
      !newLeave.startDate ||
      !newLeave.endDate
    )
      return;
    const start = new Date(newLeave.startDate);
    const end = new Date(newLeave.endDate);
    const days =
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const staffInfo = staffList.find((s) => s.name === newLeave.staff);
    setLeaves((prev) => [
      ...prev,
      {
        id: Date.now(),
        staff: newLeave.staff,
        role: staffInfo?.role ?? "-",
        type: newLeave.type,
        startDate: newLeave.startDate,
        endDate: newLeave.endDate,
        days,
        reason: newLeave.reason,
        status: "bekliyor",
      },
    ]);
    setNewLeave({
      staff: "",
      type: "",
      startDate: "",
      endDate: "",
      reason: "",
    });
    setShowLeaveModal(false);
  };

  const handleAddOvertime = () => {
    if (!newOvertime.staff || !newOvertime.date || !newOvertime.hours) return;
    const staffInfo = staffList.find((s) => s.name === newOvertime.staff);
    setOvertimes((prev) => [
      ...prev,
      {
        id: Date.now(),
        staff: newOvertime.staff,
        role: staffInfo?.role ?? "-",
        date: newOvertime.date,
        hours: Number(newOvertime.hours),
        reason: newOvertime.reason,
        status: "bekliyor",
      },
    ]);
    setNewOvertime({ staff: "", date: "", hours: "", reason: "" });
    setShowOvertimeModal(false);
  };

  const totalLeavedays = leaves
    .filter((l) => l.status === "onaylandi")
    .reduce((sum, l) => sum + l.days, 0);
  const totalOvertimeHours = overtimes
    .filter((o) => o.status !== "reddedildi")
    .reduce((sum, o) => sum + o.hours, 0);
  const pendingLeaves = leaves.filter((l) => l.status === "bekliyor").length;
  const pendingOvertimes = overtimes.filter(
    (o) => o.status === "bekliyor",
  ).length;

  // Simple monthly calendar data
  const currentMonth = "Nisan 2026";
  const calendarEvents = [
    {
      day: 1,
      staff: "Ahmet Kaya",
      type: "Yıllık İzin",
      color: "bg-blue-200 text-blue-800",
    },
    {
      day: 2,
      staff: "Ahmet Kaya",
      type: "Yıllık İzin",
      color: "bg-blue-200 text-blue-800",
    },
    {
      day: 3,
      staff: "Ahmet Kaya",
      type: "Yıllık İzin",
      color: "bg-blue-200 text-blue-800",
    },
    {
      day: 10,
      staff: "Mehmet Yılmaz",
      type: "Mazeret İzni",
      color: "bg-orange-200 text-orange-800",
    },
    {
      day: 15,
      staff: "Ayşe Çelik",
      type: "Yıllık İzin",
      color: "bg-green-200 text-green-800",
    },
  ];

  const staffSummary = staffList.map((s) => {
    const staffLeaves = leaves.filter(
      (l) => l.staff === s.name && l.status === "onaylandi",
    );
    const staffOvertimes = overtimes.filter(
      (o) => o.staff === s.name && o.status !== "reddedildi",
    );
    return {
      ...s,
      totalLeaveDays: staffLeaves.reduce((sum, l) => sum + l.days, 0),
      totalOvertimeHours: staffOvertimes.reduce((sum, o) => sum + o.hours, 0),
      pendingLeaves: leaves.filter(
        (l) => l.staff === s.name && l.status === "bekliyor",
      ).length,
    };
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A2433]">
            Personel İzin & Mesai Takibi
          </h1>
          <p className="text-[#6B7A8D] mt-1">
            İzin talepleri ve fazla mesai yönetimi
          </p>
        </div>
        {isOwner && (
          <div className="flex gap-2">
            <Button
              onClick={() => setShowLeaveModal(true)}
              className="bg-[#3B5BDB] hover:bg-[#2F4CC0] text-white"
            >
              <Plus className="w-4 h-4 mr-2" /> İzin Ekle
            </Button>
            <Button
              onClick={() => setShowOvertimeModal(true)}
              variant="outline"
              className="border-[#3B5BDB] text-[#3B5BDB]"
            >
              <Clock className="w-4 h-4 mr-2" /> Mesai Ekle
            </Button>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-[#1A2433]">
                  {totalLeavedays}
                </div>
                <div className="text-xs text-[#6B7A8D]">Onaylı İzin Günü</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-purple-500" />
              <div>
                <div className="text-2xl font-bold text-[#1A2433]">
                  {totalOvertimeHours}
                </div>
                <div className="text-xs text-[#6B7A8D]">Toplam Mesai Saati</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-[#1A2433]">
                  {pendingLeaves}
                </div>
                <div className="text-xs text-[#6B7A8D]">Bekleyen İzin</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-[#1A2433]">
                  {pendingOvertimes}
                </div>
                <div className="text-xs text-[#6B7A8D]">Bekleyen Mesai</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {(["izinler", "mesai", "takvim", "ozet"] as ActiveTab[]).map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-[#3B5BDB] text-[#3B5BDB]"
                : "border-transparent text-[#6B7A8D] hover:text-[#1A2433]"
            }`}
          >
            {tab === "izinler"
              ? "İzin Talepleri"
              : tab === "mesai"
                ? "Fazla Mesai"
                : tab === "takvim"
                  ? "İzin Takvimi"
                  : "Personel Özeti"}
          </button>
        ))}
      </div>

      {/* Leave Requests Tab */}
      {activeTab === "izinler" && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <Select value={filterStaff} onValueChange={setFilterStaff}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Personel filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Personel</SelectItem>
                {staffList.map((s) => (
                  <SelectItem key={s.name} value={s.name}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-44">
                <SelectValue placeholder="Durum filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="bekliyor">Bekliyor</SelectItem>
                <SelectItem value="onaylandi">Onaylandı</SelectItem>
                <SelectItem value="reddedildi">Reddedildi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            {filteredLeaves.map((leave) => (
              <Card key={leave.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#3B5BDB]/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-[#3B5BDB]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#1A2433]">
                          {leave.staff}
                        </div>
                        <div className="text-xs text-[#6B7A8D]">
                          {leave.role}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-medium text-[#3B5BDB]">
                            {leave.type}
                          </span>
                          <span className="text-xs text-[#6B7A8D]">•</span>
                          <span className="text-xs text-[#6B7A8D]">
                            {leave.days} gün
                          </span>
                        </div>
                        <div className="text-xs text-[#6B7A8D] mt-1">
                          {leave.startDate} – {leave.endDate}
                        </div>
                        {leave.reason && (
                          <div className="text-xs text-[#6B7A8D] mt-1">
                            Neden: {leave.reason}
                          </div>
                        )}
                        {leave.approvedBy && (
                          <div className="text-xs text-green-600 mt-1">
                            Onaylayan: {leave.approvedBy}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={statusColor[leave.status]}>
                        {statusLabel[leave.status]}
                      </Badge>
                      {isOwner && leave.status === "bekliyor" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApproveLeave(leave.id)}
                            className="bg-green-600 hover:bg-green-700 text-white h-7 px-2"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" /> Onayla
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectLeave(leave.id)}
                            className="border-red-400 text-red-600 hover:bg-red-50 h-7 px-2"
                          >
                            <XCircle className="w-3 h-3 mr-1" /> Reddet
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Overtime Tab */}
      {activeTab === "mesai" && (
        <div className="space-y-3">
          {overtimes.map((ot) => (
            <Card key={ot.id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#1A2433]">
                        {ot.staff}
                      </div>
                      <div className="text-xs text-[#6B7A8D]">{ot.role}</div>
                      <div className="text-sm text-purple-700 font-medium mt-1">
                        {ot.hours} saat fazla mesai
                      </div>
                      <div className="text-xs text-[#6B7A8D]">{ot.date}</div>
                      {ot.reason && (
                        <div className="text-xs text-[#6B7A8D] mt-1">
                          Neden: {ot.reason}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={statusColor[ot.status]}>
                      {statusLabel[ot.status]}
                    </Badge>
                    {isOwner && ot.status === "bekliyor" && (
                      <Button
                        size="sm"
                        onClick={() => handleApproveOvertime(ot.id)}
                        className="bg-green-600 hover:bg-green-700 text-white h-7 px-2"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" /> Onayla
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === "takvim" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1A2433]">
              <Calendar className="w-5 h-5 text-[#3B5BDB]" />
              {currentMonth} İzin Takvimi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((d) => (
                <div
                  key={d}
                  className="text-center text-xs font-medium text-[#6B7A8D] py-2"
                >
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {/* April 2026 starts on Wednesday (offset 2) */}
              {[0, 1].map((i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                const events = calendarEvents.filter((e) => e.day === day);
                return (
                  <div
                    key={day}
                    className={`min-h-[60px] p-1 border border-gray-100 rounded ${
                      events.length > 0 ? "bg-blue-50" : "bg-white"
                    }`}
                  >
                    <div className="text-xs font-medium text-[#1A2433] mb-1">
                      {day}
                    </div>
                    {events.map((e) => (
                      <div
                        key={`${e.staff}-${e.day}`}
                        className={`text-xs px-1 rounded mb-0.5 truncate ${e.color}`}
                      >
                        {e.staff.split(" ")[0]}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-blue-200" />
                <span className="text-xs text-[#6B7A8D]">Yıllık İzin</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-orange-200" />
                <span className="text-xs text-[#6B7A8D]">Mazeret İzni</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-green-200" />
                <span className="text-xs text-[#6B7A8D]">Diğer İzin</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Tab */}
      {activeTab === "ozet" && (
        <div className="space-y-3">
          {staffSummary.map((s) => (
            <Card key={s.name} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#3B5BDB]/10 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-[#3B5BDB]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#1A2433]">
                        {s.name}
                      </div>
                      <div className="text-xs text-[#6B7A8D]">{s.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-6 text-center">
                    <div>
                      <div className="text-lg font-bold text-[#3B5BDB]">
                        {s.totalLeaveDays}
                      </div>
                      <div className="text-xs text-[#6B7A8D]">İzin Günü</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600">
                        {s.totalOvertimeHours}
                      </div>
                      <div className="text-xs text-[#6B7A8D]">Mesai Saati</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-yellow-600">
                        {s.pendingLeaves}
                      </div>
                      <div className="text-xs text-[#6B7A8D]">Bekleyen</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Leave Modal */}
      <Dialog open={showLeaveModal} onOpenChange={setShowLeaveModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>İzin Talebi Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Select
              value={newLeave.staff}
              onValueChange={(v) => setNewLeave((p) => ({ ...p, staff: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Personel seçin" />
              </SelectTrigger>
              <SelectContent>
                {staffList.map((s) => (
                  <SelectItem key={s.name} value={s.name}>
                    {s.name} ({s.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={newLeave.type}
              onValueChange={(v) => setNewLeave((p) => ({ ...p, type: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="İzin türü seçin" />
              </SelectTrigger>
              <SelectContent>
                {leaveTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-[#6B7A8D] mb-1 block">
                  Başlangıç
                </span>
                <Input
                  type="date"
                  value={newLeave.startDate}
                  onChange={(e) =>
                    setNewLeave((p) => ({ ...p, startDate: e.target.value }))
                  }
                />
              </div>
              <div>
                <span className="text-xs text-[#6B7A8D] mb-1 block">Bitiş</span>
                <Input
                  type="date"
                  value={newLeave.endDate}
                  onChange={(e) =>
                    setNewLeave((p) => ({ ...p, endDate: e.target.value }))
                  }
                />
              </div>
            </div>
            <Input
              placeholder="Neden (opsiyonel)"
              value={newLeave.reason}
              onChange={(e) =>
                setNewLeave((p) => ({ ...p, reason: e.target.value }))
              }
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowLeaveModal(false)}
              >
                İptal
              </Button>
              <Button
                onClick={handleAddLeave}
                className="bg-[#3B5BDB] text-white hover:bg-[#2F4CC0]"
              >
                Ekle
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Overtime Modal */}
      <Dialog open={showOvertimeModal} onOpenChange={setShowOvertimeModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Fazla Mesai Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Select
              value={newOvertime.staff}
              onValueChange={(v) => setNewOvertime((p) => ({ ...p, staff: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Personel seçin" />
              </SelectTrigger>
              <SelectContent>
                {staffList.map((s) => (
                  <SelectItem key={s.name} value={s.name}>
                    {s.name} ({s.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={newOvertime.date}
              onChange={(e) =>
                setNewOvertime((p) => ({ ...p, date: e.target.value }))
              }
            />
            <Input
              type="number"
              placeholder="Mesai saat sayısı"
              value={newOvertime.hours}
              onChange={(e) =>
                setNewOvertime((p) => ({ ...p, hours: e.target.value }))
              }
            />
            <Input
              placeholder="Neden"
              value={newOvertime.reason}
              onChange={(e) =>
                setNewOvertime((p) => ({ ...p, reason: e.target.value }))
              }
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowOvertimeModal(false)}
              >
                İptal
              </Button>
              <Button
                onClick={handleAddOvertime}
                className="bg-[#3B5BDB] text-white hover:bg-[#2F4CC0]"
              >
                Ekle
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
