import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  Clock,
  Filter,
  LogOut,
  Search,
  UserPlus,
  Users,
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
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

interface Visitor {
  id: string;
  name: string;
  tcOrPassport: string;
  visitedApartment: string;
  residentName: string;
  purpose: string;
  vehiclePlate?: string;
  checkIn: string;
  checkOut?: string;
  status: "inside" | "left" | "denied";
  note?: string;
}

const sampleVisitors: Visitor[] = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    tcOrPassport: "123****890",
    visitedApartment: "D:12",
    residentName: "Ayşe Kaya",
    purpose: "Aile ziyareti",
    checkIn: "2026-03-28 09:15",
    checkOut: "2026-03-28 11:30",
    status: "left",
  },
  {
    id: "2",
    name: "Zeynep Arslan",
    tcOrPassport: "234****901",
    visitedApartment: "B:5",
    residentName: "Mehmet Demir",
    purpose: "Kargo teslimi",
    checkIn: "2026-03-28 10:00",
    status: "inside",
  },
  {
    id: "3",
    name: "Mustafa Çelik",
    tcOrPassport: "345****012",
    visitedApartment: "A:3",
    residentName: "Fatma Şahin",
    purpose: "Tamir & Servis",
    vehiclePlate: "34 XYZ 123",
    checkIn: "2026-03-28 08:45",
    checkOut: "2026-03-28 10:15",
    status: "left",
  },
  {
    id: "4",
    name: "Elif Koç",
    tcOrPassport: "456****123",
    visitedApartment: "C:8",
    residentName: "Ali Yıldız",
    purpose: "İş görüşmesi",
    checkIn: "2026-03-28 13:00",
    status: "inside",
  },
  {
    id: "5",
    name: "Hasan Öztürk",
    tcOrPassport: "567****234",
    visitedApartment: "D:7",
    residentName: "Hatice Çelik",
    purpose: "Ziyaret",
    vehiclePlate: "06 ABC 456",
    checkIn: "2026-03-27 15:30",
    checkOut: "2026-03-27 17:00",
    status: "left",
  },
  {
    id: "6",
    name: "Bilinmeyen Kişi",
    tcOrPassport: "-",
    visitedApartment: "B:2",
    residentName: "Sakin mevcut değil",
    purpose: "Tespit edilemedi",
    checkIn: "2026-03-27 22:10",
    status: "denied",
    note: "Sakin onaylamaması üzerine giriş reddedildi.",
  },
  {
    id: "7",
    name: "Selin Güneş",
    tcOrPassport: "678****345",
    visitedApartment: "A:6",
    residentName: "Emre Kılıç",
    purpose: "Arkadaş ziyareti",
    checkIn: "2026-03-27 18:00",
    checkOut: "2026-03-27 21:30",
    status: "left",
  },
];

const purposeOptions = [
  "Aile ziyareti",
  "Arkadaş ziyareti",
  "Kargo teslimi",
  "Tamir & Servis",
  "İş görüşmesi",
  "Temizlik hizmeti",
  "Diğer",
];

export default function DigitalVisitorRegister({
  buildingId: _buildingId,
  t: _t,
}: {
  buildingId: string;
  t: Record<string, string>;
}) {
  const [visitors, setVisitors] = useState<Visitor[]>(sampleVisitors);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("today");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    tcOrPassport: "",
    visitedApartment: "",
    residentName: "",
    purpose: "",
    vehiclePlate: "",
    note: "",
  });

  const filtered = visitors.filter((v) => {
    const matchSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.visitedApartment.toLowerCase().includes(search.toLowerCase()) ||
      v.residentName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || v.status === statusFilter;
    const isToday = v.checkIn.startsWith("2026-03-28");
    const matchDate =
      dateFilter === "all" ||
      (dateFilter === "today" && isToday) ||
      (dateFilter === "yesterday" && !isToday);
    return matchSearch && matchStatus && matchDate;
  });

  const insideCount = visitors.filter((v) => v.status === "inside").length;
  const todayTotal = visitors.filter((v) =>
    v.checkIn.startsWith("2026-03-28"),
  ).length;
  const deniedCount = visitors.filter((v) => v.status === "denied").length;

  const handleCheckOut = (id: string) => {
    setVisitors((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              status: "left",
              checkOut: `2026-03-28 ${new Date().toTimeString().slice(0, 5)}`,
            }
          : v,
      ),
    );
  };

  const handleAdd = () => {
    if (!form.name || !form.visitedApartment || !form.purpose) return;
    const newVisitor: Visitor = {
      id: String(visitors.length + 1),
      name: form.name,
      tcOrPassport: form.tcOrPassport || "-",
      visitedApartment: form.visitedApartment,
      residentName: form.residentName,
      purpose: form.purpose,
      vehiclePlate: form.vehiclePlate || undefined,
      note: form.note || undefined,
      checkIn: `2026-03-28 ${new Date().toTimeString().slice(0, 5)}`,
      status: "inside",
    };
    setVisitors((prev) => [newVisitor, ...prev]);
    setForm({
      name: "",
      tcOrPassport: "",
      visitedApartment: "",
      residentName: "",
      purpose: "",
      vehiclePlate: "",
      note: "",
    });
    setShowForm(false);
  };

  const statusBadge = (status: Visitor["status"]) => {
    if (status === "inside")
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200">
          İçeride
        </Badge>
      );
    if (status === "left")
      return (
        <Badge className="bg-gray-100 text-gray-600 border-gray-200">
          Ayrıldı
        </Badge>
      );
    return (
      <Badge className="bg-red-100 text-red-700 border-red-200">
        Reddedildi
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1A2341]">
            Dijital Ziyaretçi Defteri
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Bina giriş-çıkış ziyaretçi kayıtları
          </p>
        </div>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button className="bg-[#3A6BFF] hover:bg-[#2A5BEF] text-white gap-2">
              <UserPlus className="w-4 h-4" /> Ziyaretçi Kaydet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Yeni Ziyaretçi Girişi</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 mt-2">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Ad Soyad *
                </p>
                <Input
                  placeholder="Ziyaretçi adı"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  TC / Pasaport No
                </p>
                <Input
                  placeholder="Kimlik numarası (isteğe bağlı)"
                  value={form.tcOrPassport}
                  onChange={(e) =>
                    setForm({ ...form, tcOrPassport: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Ziyaret Edilen Daire *
                  </p>
                  <Input
                    placeholder="Örn: D:12"
                    value={form.visitedApartment}
                    onChange={(e) =>
                      setForm({ ...form, visitedApartment: e.target.value })
                    }
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Sakin Adı
                  </p>
                  <Input
                    placeholder="Sakin adı"
                    value={form.residentName}
                    onChange={(e) =>
                      setForm({ ...form, residentName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Ziyaret Amacı *
                </p>
                <Select
                  value={form.purpose}
                  onValueChange={(v) => setForm({ ...form, purpose: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Amaç seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {purposeOptions.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Araç Plakası
                </p>
                <Input
                  placeholder="34 ABC 123 (isteğe bağlı)"
                  value={form.vehiclePlate}
                  onChange={(e) =>
                    setForm({ ...form, vehiclePlate: e.target.value })
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Not</p>
                <Input
                  placeholder="Ek not (isteğe bağlı)"
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                />
              </div>
              <Button
                className="w-full bg-[#3A6BFF] hover:bg-[#2A5BEF] text-white"
                onClick={handleAdd}
              >
                Giriş Kaydı Oluştur
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A2341]">
                  {todayTotal}
                </p>
                <p className="text-xs text-gray-500">Bugünkü Ziyaret</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A2341]">
                  {insideCount}
                </p>
                <p className="text-xs text-gray-500">Şu An İçeride</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <LogOut className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A2341]">
                  {visitors.filter((v) => v.status === "left").length}
                </p>
                <p className="text-xs text-gray-500">Ayrılan</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A2341]">
                  {deniedCount}
                </p>
                <p className="text-xs text-gray-500">Reddedilen</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Ziyaretçi adı, daire veya sakin ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-44">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="inside">İçeride</SelectItem>
                <SelectItem value="left">Ayrıldı</SelectItem>
                <SelectItem value="denied">Reddedildi</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full sm:w-44">
                <Clock className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Tarih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Bugün</SelectItem>
                <SelectItem value="yesterday">Dün</SelectItem>
                <SelectItem value="all">Tümü</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="w-5 h-5 text-[#3A6BFF]" />
            Ziyaretçi Kayıtları ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ziyaretçi</TableHead>
                  <TableHead>Daire / Sakin</TableHead>
                  <TableHead>Amaç</TableHead>
                  <TableHead>Araç</TableHead>
                  <TableHead>Giriş</TableHead>
                  <TableHead>Çıkış</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-gray-400 py-10"
                    >
                      Kayıt bulunamadı
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((v) => (
                    <TableRow key={v.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-[#1A2341]">{v.name}</p>
                          <p className="text-xs text-gray-400">
                            {v.tcOrPassport}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{v.visitedApartment}</p>
                          <p className="text-xs text-gray-400">
                            {v.residentName}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{v.purpose}</TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {v.vehiclePlate || "-"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {v.checkIn.split(" ")[1]}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {v.checkOut ? v.checkOut.split(" ")[1] : "-"}
                      </TableCell>
                      <TableCell>{statusBadge(v.status)}</TableCell>
                      <TableCell>
                        {v.status === "inside" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7 gap-1"
                            onClick={() => handleCheckOut(v.id)}
                          >
                            <LogOut className="w-3 h-3" /> Çıkış Yap
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          {filtered.some((v) => v.note) && (
            <div className="mt-4 space-y-2">
              {filtered
                .filter((v) => v.note)
                .map((v) => (
                  <div
                    key={v.id}
                    className="flex items-start gap-2 p-3 bg-red-50 rounded-lg"
                  >
                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-red-700">
                      <span className="font-medium">{v.name}:</span> {v.note}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
