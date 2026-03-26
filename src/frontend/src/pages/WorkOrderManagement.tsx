import {
  AlertTriangle,
  CheckCircle2,
  Circle,
  ClipboardList,
  Clock,
  FileText,
  Loader2,
  Plus,
  Printer,
  RefreshCw,
  Search,
  Timer,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";

type WorkOrderStatus =
  | "Açık"
  | "Atandı"
  | "Devam Ediyor"
  | "Tamamlandı"
  | "İptal";
type WorkOrderType = "Arıza" | "Bakım" | "Temizlik" | "Genel";
type WorkOrderPriority = "Düşük" | "Normal" | "Yüksek" | "Kritik";
type WorkOrderSource = "Arıza Bildirimi" | "Planlı Bakım" | "Manuel";

interface WorkOrder {
  id: string;
  orderNo: string;
  title: string;
  type: WorkOrderType;
  source: WorkOrderSource;
  description: string;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  assignee: string;
  estimatedHours: number;
  createdAt: string;
  completedAt: string | null;
}

interface WorkOrderTemplate {
  id: string;
  title: string;
  period: string;
  category: WorkOrderType;
  estimatedHours: number;
  description: string;
}

const STAFF_LIST = [
  "Ahmet Yılmaz",
  "Fatma Kaya",
  "Mehmet Demir",
  "Ali Rıza",
  "Mustafa Şahin",
  "Hasan Çelik",
  "Güvenlik A.Ş.",
  "Teknik Servis Ltd.",
];

const TEMPLATES: WorkOrderTemplate[] = [
  {
    id: "t1",
    title: "Aylık Asansör Bakımı",
    period: "Aylık",
    category: "Bakım",
    estimatedHours: 2,
    description: "Aylık periyodik asansör yağlama, kontrol ve test işlemleri",
  },
  {
    id: "t2",
    title: "Çeyreklik Yangın Sistemi Kontrolü",
    period: "3 Aylık",
    category: "Bakım",
    estimatedHours: 3,
    description:
      "Yangın söndürücü, duman dedektörü ve alarm sistemleri kontrolü",
  },
  {
    id: "t3",
    title: "Haftalık Ortak Alan Temizliği",
    period: "Haftalık",
    category: "Temizlik",
    estimatedHours: 4,
    description:
      "Giriş, koridor, merdiven ve ortak alanların haftalık genel temizliği",
  },
  {
    id: "t4",
    title: "Yıllık Çatı İncelemesi",
    period: "Yıllık",
    category: "Genel",
    estimatedHours: 6,
    description:
      "Çatı su yalıtımı, oluklar, baca ve çatı örtüsünün yıllık incelemesi",
  },
  {
    id: "t5",
    title: "Aylık Jeneratör Testi",
    period: "Aylık",
    category: "Bakım",
    estimatedHours: 1,
    description: "Jeneratör devreye alma testi, yağ ve yakıt kontrolü",
  },
  {
    id: "t6",
    title: "Haftalık Havuz Bakımı",
    period: "Haftalık",
    category: "Bakım",
    estimatedHours: 2,
    description:
      "Havuz suyu kimyasal dengesi, filtre temizliği ve yüzey bakımı",
  },
];

const PERIOD_COLORS: Record<string, string> = {
  Haftalık: "bg-green-100 text-green-700 border-green-200",
  Aylık: "bg-blue-100 text-blue-700 border-blue-200",
  "3 Aylık": "bg-purple-100 text-purple-700 border-purple-200",
  Yıllık: "bg-orange-100 text-orange-700 border-orange-200",
};

const TEMPLATE_CATEGORY_ICONS: Record<string, string> = {
  Bakım: "🔧",
  Temizlik: "🧹",
  Genel: "📋",
  Arıza: "⚠️",
};

const INITIAL_ORDERS: WorkOrder[] = [
  {
    id: "1",
    orderNo: "IE-2026-001",
    title: "Asansör Yağlama ve Bakımı",
    type: "Bakım",
    source: "Planlı Bakım",
    description: "Aylık periyodik asansör yağlama ve kontrol işlemi",
    priority: "Normal",
    status: "Tamamlandı",
    assignee: "Teknik Servis Ltd.",
    estimatedHours: 3,
    createdAt: "2026-03-01",
    completedAt: "2026-03-02",
  },
  {
    id: "2",
    orderNo: "IE-2026-002",
    title: "Bodrum Kat Su Borusu Sızıntısı",
    type: "Arıza",
    source: "Arıza Bildirimi",
    description: "B-04 bodrum katında su borusu sızıntısı tespit edildi",
    priority: "Kritik",
    status: "Devam Ediyor",
    assignee: "Ahmet Yılmaz",
    estimatedHours: 5,
    createdAt: "2026-03-10",
    completedAt: null,
  },
  {
    id: "3",
    orderNo: "IE-2026-003",
    title: "Koridor Ampul Değişimi",
    type: "Arıza",
    source: "Manuel",
    description: "3. ve 4. kat koridorlarında ampul değişimi yapılacak",
    priority: "Düşük",
    status: "Atandı",
    assignee: "Mehmet Demir",
    estimatedHours: 2,
    createdAt: "2026-03-12",
    completedAt: null,
  },
  {
    id: "4",
    orderNo: "IE-2026-004",
    title: "Bahçe Sulama Sistemi Kontrolü",
    type: "Bakım",
    source: "Planlı Bakım",
    description: "Sulama sisteminin yaz öncesi genel kontrolü",
    priority: "Normal",
    status: "Açık",
    assignee: "",
    estimatedHours: 4,
    createdAt: "2026-03-14",
    completedAt: null,
  },
  {
    id: "5",
    orderNo: "IE-2026-005",
    title: "Jeneratör Periyodik Bakımı",
    type: "Bakım",
    source: "Planlı Bakım",
    description: "6 aylık jeneratör bakımı ve yağ değişimi",
    priority: "Yüksek",
    status: "Tamamlandı",
    assignee: "Teknik Servis Ltd.",
    estimatedHours: 6,
    createdAt: "2026-03-03",
    completedAt: "2026-03-05",
  },
  {
    id: "6",
    orderNo: "IE-2026-006",
    title: "Giriş Kapısı Kilit Tamiri",
    type: "Arıza",
    source: "Arıza Bildirimi",
    description: "Ana giriş kapısının elektronik kilidi bozuldu",
    priority: "Yüksek",
    status: "Tamamlandı",
    assignee: "Ali Rıza",
    estimatedHours: 1,
    createdAt: "2026-03-08",
    completedAt: "2026-03-08",
  },
  {
    id: "7",
    orderNo: "IE-2026-007",
    title: "Çatı Yağmur Olukları Temizliği",
    type: "Temizlik",
    source: "Planlı Bakım",
    description: "İlkbahar öncesi çatı olukları temizlenmesi",
    priority: "Normal",
    status: "Devam Ediyor",
    assignee: "Mustafa Şahin",
    estimatedHours: 8,
    createdAt: "2026-03-15",
    completedAt: null,
  },
  {
    id: "8",
    orderNo: "IE-2026-008",
    title: "Otopark Zemin Boyası",
    type: "Genel",
    source: "Manuel",
    description: "Otopark zemin çizgilerinin yenilenmesi",
    priority: "Düşük",
    status: "Açık",
    assignee: "",
    estimatedHours: 12,
    createdAt: "2026-03-16",
    completedAt: null,
  },
  {
    id: "9",
    orderNo: "IE-2026-009",
    title: "Havuz Filtre Sistemi Değişimi",
    type: "Bakım",
    source: "Planlı Bakım",
    description: "Yüzme havuzu filtre pompasının değiştirilmesi",
    priority: "Yüksek",
    status: "Atandı",
    assignee: "Teknik Servis Ltd.",
    estimatedHours: 10,
    createdAt: "2026-03-17",
    completedAt: null,
  },
  {
    id: "10",
    orderNo: "IE-2026-010",
    title: "Yangın Söndürücü Dolumu",
    type: "Bakım",
    source: "Planlı Bakım",
    description: "Tüm katlardaki yangın söndürücülerin yıllık dolumu",
    priority: "Kritik",
    status: "Tamamlandı",
    assignee: "Güvenlik A.Ş.",
    estimatedHours: 4,
    createdAt: "2026-02-20",
    completedAt: "2026-02-22",
  },
  {
    id: "11",
    orderNo: "IE-2026-011",
    title: "Zemin Kat Tuvalet Tamiri",
    type: "Arıza",
    source: "Arıza Bildirimi",
    description: "Ortak kullanım tuvaletinde su kesme vanası arızası",
    priority: "Normal",
    status: "İptal",
    assignee: "Ahmet Yılmaz",
    estimatedHours: 2,
    createdAt: "2026-03-09",
    completedAt: null,
  },
  {
    id: "12",
    orderNo: "IE-2026-012",
    title: "Toplantı Salonu Klima Bakımı",
    type: "Bakım",
    source: "Planlı Bakım",
    description: "Yaz öncesi klima filtre temizliği ve gaz kontrolü",
    priority: "Normal",
    status: "Açık",
    assignee: "",
    estimatedHours: 3,
    createdAt: "2026-03-20",
    completedAt: null,
  },
];

const STATUS_CONFIG: Record<
  WorkOrderStatus,
  { label: string; color: string; icon: React.ReactNode }
> = {
  Açık: {
    label: "Açık",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: <Circle className="w-3 h-3" />,
  },
  Atandı: {
    label: "Atandı",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    icon: <ClipboardList className="w-3 h-3" />,
  },
  "Devam Ediyor": {
    label: "Devam Ediyor",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: <Loader2 className="w-3 h-3" />,
  },
  Tamamlandı: {
    label: "Tamamlandı",
    color: "bg-green-100 text-green-700 border-green-200",
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  İptal: {
    label: "İptal",
    color: "bg-gray-100 text-gray-500 border-gray-200",
    icon: <XCircle className="w-3 h-3" />,
  },
};

const PRIORITY_CONFIG: Record<WorkOrderPriority, { color: string }> = {
  Düşük: { color: "bg-gray-100 text-gray-500 border-gray-200" },
  Normal: { color: "bg-blue-100 text-blue-600 border-blue-200" },
  Yüksek: { color: "bg-orange-100 text-orange-600 border-orange-200" },
  Kritik: { color: "bg-red-100 text-red-600 border-red-200" },
};

export default function WorkOrderManagement({
  buildingId: _buildingId,
  isOwner,
}: {
  buildingId: string;
  isOwner: boolean;
  t: Record<string, string>;
}) {
  const [orders, setOrders] = useState<WorkOrder[]>(INITIAL_ORDERS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tümü");
  const [filterType, setFilterType] = useState("Tümü");
  const [filterPriority, setFilterPriority] = useState("Tümü");
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null);
  const [printOrder, setPrintOrder] = useState<WorkOrder | null>(null);
  const [activeTab, setActiveTab] = useState<"liste" | "sablonlar">("liste");
  const [form, setForm] = useState({
    title: "",
    type: "Arıza" as WorkOrderType,
    source: "Manuel" as WorkOrderSource,
    description: "",
    priority: "Normal" as WorkOrderPriority,
    assignee: "",
    estimatedHours: "",
  });

  const stats = {
    total: orders.length,
    open: orders.filter((o) => o.status === "Açık").length,
    inProgress: orders.filter(
      (o) => o.status === "Devam Ediyor" || o.status === "Atandı",
    ).length,
    completed: orders.filter((o) => o.status === "Tamamlandı").length,
    avgHours: (() => {
      const done = orders.filter((o) => o.status === "Tamamlandı");
      return done.length
        ? Math.round(
            done.reduce((s, o) => s + o.estimatedHours, 0) / done.length,
          )
        : 0;
    })(),
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.orderNo.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Tümü" || o.status === filterStatus;
    const matchType = filterType === "Tümü" || o.type === filterType;
    const matchPriority =
      filterPriority === "Tümü" || o.priority === filterPriority;
    return matchSearch && matchStatus && matchType && matchPriority;
  });

  function handleCreate() {
    if (!form.title) return;
    const newOrder: WorkOrder = {
      id: Date.now().toString(),
      orderNo: `IE-2026-${String(orders.length + 1).padStart(3, "0")}`,
      title: form.title,
      type: form.type,
      source: form.source,
      description: form.description,
      priority: form.priority,
      status: form.assignee ? "Atandı" : "Açık",
      assignee: form.assignee,
      estimatedHours: Number(form.estimatedHours) || 1,
      createdAt: new Date().toISOString().split("T")[0],
      completedAt: null,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setShowForm(false);
    setForm({
      title: "",
      type: "Arıza",
      source: "Manuel",
      description: "",
      priority: "Normal",
      assignee: "",
      estimatedHours: "",
    });
  }

  function handleStatusChange(id: string, status: WorkOrderStatus) {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status,
              completedAt:
                status === "Tamamlandı"
                  ? new Date().toISOString().split("T")[0]
                  : o.completedAt,
            }
          : o,
      ),
    );
    setSelectedOrder(null);
  }

  function handleUseTemplate(template: WorkOrderTemplate) {
    setForm({
      title: template.title,
      type: template.category,
      source: "Planlı Bakım",
      description: template.description,
      priority: "Normal",
      assignee: "",
      estimatedHours: String(template.estimatedHours),
    });
    setActiveTab("liste");
    setShowForm(true);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0E1116]">
            İş Emri Yönetimi
          </h1>
          <p className="text-sm text-[#6B7A8D] mt-1">
            Planlı ve arıza kaynaklı iş emirlerini takip edin
          </p>
        </div>
        {isOwner && (
          <Button
            onClick={() => setShowForm(true)}
            className="bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full gap-2"
            data-ocid="workorder.open_modal_button"
          >
            <Plus className="w-4 h-4" /> Yeni İş Emri
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          {
            label: "Toplam İş Emri",
            value: stats.total,
            color: "bg-blue-100",
            iconColor: "text-blue-600",
            Icon: ClipboardList,
          },
          {
            label: "Açık",
            value: stats.open,
            color: "bg-sky-100",
            iconColor: "text-sky-600",
            Icon: Circle,
          },
          {
            label: "Devam Eden",
            value: stats.inProgress,
            color: "bg-yellow-100",
            iconColor: "text-yellow-600",
            Icon: Loader2,
          },
          {
            label: "Tamamlanan",
            value: stats.completed,
            color: "bg-green-100",
            iconColor: "text-green-600",
            Icon: CheckCircle2,
          },
          {
            label: "Ort. Süre (saat)",
            value: stats.avgHours,
            color: "bg-purple-100",
            iconColor: "text-purple-600",
            Icon: Timer,
          },
        ].map(({ label, value, color, iconColor, Icon }) => (
          <Card key={label} className="bg-white border-none shadow-sm">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0E1116]">{value}</p>
                  <p className="text-xs text-[#6B7A8D]">{label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#E5EAF2]">
        <button
          type="button"
          onClick={() => setActiveTab("liste")}
          className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
            activeTab === "liste"
              ? "bg-white border border-b-white border-[#E5EAF2] text-[#0B1B2E] -mb-px"
              : "text-[#6B7A8D] hover:text-[#0E1116]"
          }`}
          data-ocid="workorder.tab"
        >
          <span className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4" />
            İş Emirleri
            <span className="bg-[#F1F4F8] text-[#6B7A8D] text-xs px-1.5 py-0.5 rounded-full">
              {orders.length}
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("sablonlar")}
          className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
            activeTab === "sablonlar"
              ? "bg-white border border-b-white border-[#E5EAF2] text-[#0B1B2E] -mb-px"
              : "text-[#6B7A8D] hover:text-[#0E1116]"
          }`}
          data-ocid="workorder.tab"
        >
          <span className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Şablonlar
            <span className="bg-[#F1F4F8] text-[#6B7A8D] text-xs px-1.5 py-0.5 rounded-full">
              {TEMPLATES.length}
            </span>
          </span>
        </button>
      </div>

      {/* Tab: İş Emirleri */}
      {activeTab === "liste" && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A8D]" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="İş emri ara..."
                className="pl-9"
                data-ocid="workorder.search_input"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]"
              data-ocid="workorder.select"
            >
              <option>Tümü</option>
              {(
                [
                  "Açık",
                  "Atandı",
                  "Devam Ediyor",
                  "Tamamlandı",
                  "İptal",
                ] as WorkOrderStatus[]
              ).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]"
            >
              <option>Tümü</option>
              {(["Arıza", "Bakım", "Temizlik", "Genel"] as WorkOrderType[]).map(
                (t) => (
                  <option key={t}>{t}</option>
                ),
              )}
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]"
            >
              <option>Tümü</option>
              {(
                ["Düşük", "Normal", "Yüksek", "Kritik"] as WorkOrderPriority[]
              ).map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div
            className="bg-white rounded-xl shadow-sm overflow-hidden"
            data-ocid="workorder.table"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F1F4F8]">
                  <tr>
                    {[
                      "İş Emri No",
                      "Başlık",
                      "Tür",
                      "Öncelik",
                      "Durum",
                      "Atanan Kişi",
                      "Oluşturma",
                      "Tamamlanma",
                      "İşlem",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold text-[#6B7A8D] uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F4F8]">
                  {filtered.map((order, idx) => {
                    const sc = STATUS_CONFIG[order.status];
                    const pc = PRIORITY_CONFIG[order.priority];
                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-[#F8FAFC] transition-colors"
                        data-ocid={`workorder.item.${idx + 1}`}
                      >
                        <td className="px-4 py-3 font-mono text-xs text-[#4A90D9] font-semibold">
                          {order.orderNo}
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-[#0E1116]">
                            {order.title}
                          </p>
                          <p className="text-xs text-[#6B7A8D] mt-0.5">
                            {order.source}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 bg-[#F1F4F8] text-[#3A4654] rounded text-xs">
                            {order.type}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${pc.color}`}
                          >
                            {order.priority === "Kritik" && (
                              <AlertTriangle className="w-3 h-3" />
                            )}
                            {order.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${sc.color}`}
                          >
                            {sc.icon}
                            {sc.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#3A4654]">
                          {order.assignee || (
                            <span className="text-[#B0BAC7]">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-[#6B7A8D]">
                          {order.createdAt}
                        </td>
                        <td className="px-4 py-3 text-[#6B7A8D]">
                          {order.completedAt || (
                            <span className="text-[#B0BAC7]">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full text-xs gap-1 h-7"
                              onClick={() => setSelectedOrder(order)}
                              data-ocid={`workorder.edit_button.${idx + 1}`}
                            >
                              <Clock className="w-3 h-3" /> Durum
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="rounded-full h-7 w-7 p-0 text-[#6B7A8D] hover:text-[#0B1B2E]"
                              onClick={() => setPrintOrder(order)}
                              title="Yazdır"
                              data-ocid={`workorder.button.${idx + 1}`}
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div
                  className="text-center py-12 text-[#6B7A8D]"
                  data-ocid="workorder.empty_state"
                >
                  <ClipboardList className="w-8 h-8 mx-auto mb-2 text-[#B0BAC7]" />
                  <p>Kayıt bulunamadı</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Tab: Şablonlar */}
      {activeTab === "sablonlar" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#6B7A8D]">
              Tekrarlayan iş emirleri için hazır şablonlar. "Şablondan Oluştur"
              butonuna tıklayarak otomatik doldurulmuş form açılır.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEMPLATES.map((template) => {
              const periodColor =
                PERIOD_COLORS[template.period] ??
                "bg-gray-100 text-gray-600 border-gray-200";
              const emoji = TEMPLATE_CATEGORY_ICONS[template.category] ?? "📋";
              return (
                <Card
                  key={template.id}
                  className="bg-white border border-[#E5EAF2] shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="pt-5 pb-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{emoji}</span>
                          <h3 className="font-semibold text-[#0E1116] text-sm leading-snug">
                            {template.title}
                          </h3>
                        </div>
                        <Badge
                          className={`text-xs border shrink-0 ${periodColor}`}
                          variant="outline"
                        >
                          <RefreshCw className="w-2.5 h-2.5 mr-1" />
                          {template.period}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#6B7A8D] leading-relaxed">
                        {template.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-[#6B7A8D]">
                        <span className="flex items-center gap-1">
                          <span className="px-1.5 py-0.5 bg-[#F1F4F8] rounded text-[#3A4654]">
                            {template.category}
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Timer className="w-3 h-3" />
                          {template.estimatedHours} saat
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="w-full bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full text-xs gap-1.5 mt-1"
                        onClick={() => handleUseTemplate(template)}
                        data-ocid="workorder.primary_button"
                      >
                        <Plus className="w-3.5 h-3.5" /> Şablondan Oluştur
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* New Work Order Modal */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg" data-ocid="workorder.dialog">
          <DialogHeader>
            <DialogTitle>Yeni İş Emri Oluştur</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="İş emri başlığı"
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
              data-ocid="workorder.input"
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-[#6B7A8D] mb-1 block">Tür</p>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      type: e.target.value as WorkOrderType,
                    }))
                  }
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                >
                  {(
                    ["Arıza", "Bakım", "Temizlik", "Genel"] as WorkOrderType[]
                  ).map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-xs text-[#6B7A8D] mb-1 block">Kaynak</p>
                <select
                  value={form.source}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      source: e.target.value as WorkOrderSource,
                    }))
                  }
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                >
                  {(
                    [
                      "Arıza Bildirimi",
                      "Planlı Bakım",
                      "Manuel",
                    ] as WorkOrderSource[]
                  ).map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-[#6B7A8D] mb-1 block">Öncelik</p>
                <select
                  value={form.priority}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      priority: e.target.value as WorkOrderPriority,
                    }))
                  }
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                >
                  {(
                    [
                      "Düşük",
                      "Normal",
                      "Yüksek",
                      "Kritik",
                    ] as WorkOrderPriority[]
                  ).map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-xs text-[#6B7A8D] mb-1 block">
                  Tahmini Süre (saat)
                </p>
                <Input
                  type="number"
                  placeholder="örn. 4"
                  value={form.estimatedHours}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, estimatedHours: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <p className="text-xs text-[#6B7A8D] mb-1 block">Atanan Kişi</p>
              <select
                value={form.assignee}
                onChange={(e) =>
                  setForm((p) => ({ ...p, assignee: e.target.value }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Atanmadı</option>
                {STAFF_LIST.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-xs text-[#6B7A8D] mb-1 block">Açıklama</p>
              <textarea
                placeholder="İş emri detayı..."
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={3}
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm resize-none"
                data-ocid="workorder.textarea"
              />
            </div>
            <Button
              onClick={handleCreate}
              disabled={!form.title}
              className="w-full bg-[#0B1B2E] text-white rounded-full"
              data-ocid="workorder.submit_button"
            >
              İş Emri Oluştur
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Status Change Modal */}
      <Dialog
        open={!!selectedOrder}
        onOpenChange={() => setSelectedOrder(null)}
      >
        <DialogContent className="max-w-sm" data-ocid="workorder.modal">
          <DialogHeader>
            <DialogTitle>Durum Güncelle</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-[#0E1116]">
                {selectedOrder.title}
              </p>
              <p className="text-xs text-[#6B7A8D]">{selectedOrder.orderNo}</p>
              <div className="space-y-2">
                {(
                  [
                    "Açık",
                    "Atandı",
                    "Devam Ediyor",
                    "Tamamlandı",
                    "İptal",
                  ] as WorkOrderStatus[]
                ).map((s) => {
                  const sc = STATUS_CONFIG[s];
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleStatusChange(selectedOrder.id, s)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                        selectedOrder.status === s
                          ? `${sc.color} border-current`
                          : "border-[#E5EAF2] hover:bg-[#F1F4F8] text-[#3A4654]"
                      }`}
                      data-ocid="workorder.toggle"
                    >
                      {sc.icon} {s}
                      {selectedOrder.status === s && (
                        <CheckCircle2 className="w-4 h-4 ml-auto" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Print Modal */}
      <Dialog open={!!printOrder} onOpenChange={() => setPrintOrder(null)}>
        <DialogContent className="max-w-lg" data-ocid="workorder.dialog">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Printer className="w-4 h-4" />
              İş Emri Yazdır
            </DialogTitle>
          </DialogHeader>
          {printOrder && (
            <div className="space-y-4">
              {/* Printable document area */}
              <div
                id="print-work-order"
                className="border border-[#E5EAF2] rounded-xl p-5 space-y-4 bg-white"
              >
                {/* Header */}
                <div className="border-b border-[#E5EAF2] pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#6B7A8D] uppercase tracking-wider font-semibold">
                        SiteCore — İş Emri
                      </p>
                      <p className="text-lg font-bold text-[#0E1116] mt-0.5">
                        {printOrder.orderNo}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs border font-medium ${
                        STATUS_CONFIG[printOrder.status].color
                      }`}
                    >
                      {STATUS_CONFIG[printOrder.status].icon}
                      {printOrder.status}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="font-semibold text-[#0E1116] text-base">
                    {printOrder.title}
                  </h3>
                  {printOrder.description && (
                    <p className="text-sm text-[#6B7A8D] mt-1 leading-relaxed">
                      {printOrder.description}
                    </p>
                  )}
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Tür", value: printOrder.type },
                    { label: "Kaynak", value: printOrder.source },
                    {
                      label: "Öncelik",
                      value: printOrder.priority,
                    },
                    {
                      label: "Tahmini Süre",
                      value: `${printOrder.estimatedHours} saat`,
                    },
                    {
                      label: "Atanan Kişi",
                      value: printOrder.assignee || "Atanmadı",
                    },
                    { label: "Oluşturma Tarihi", value: printOrder.createdAt },
                    {
                      label: "Tamamlanma Tarihi",
                      value: printOrder.completedAt ?? "—",
                    },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-[#F8FAFC] rounded-lg p-2.5">
                      <p className="text-xs text-[#6B7A8D] mb-0.5">{label}</p>
                      <p className="text-sm font-medium text-[#0E1116]">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer note */}
                <div className="border-t border-[#E5EAF2] pt-3 text-xs text-[#B0BAC7] flex justify-between">
                  <span>SiteCore Konut Yönetim Platformu</span>
                  <span>{new Date().toLocaleDateString("tr-TR")}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setPrintOrder(null)}
                  data-ocid="workorder.cancel_button"
                >
                  Kapat
                </Button>
                <Button
                  className="bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full gap-2"
                  onClick={() => window.print()}
                  data-ocid="workorder.primary_button"
                >
                  <Printer className="w-4 h-4" /> Yazdır
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
