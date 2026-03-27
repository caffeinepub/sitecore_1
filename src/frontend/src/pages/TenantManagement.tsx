import {
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Home,
  Mail,
  Phone,
  Plus,
  Search,
  TrendingUp,
  User,
} from "lucide-react";
import { useState } from "react";

interface Tenant {
  id: number;
  name: string;
  apartment: string;
  floor: number;
  phone: string;
  email: string;
  ownerName: string;
  ownerPhone: string;
  moveInDate: string;
  contractEnd: string;
  monthlyRent: number;
  deposit: number;
  status: "aktif" | "geciken" | "bitti";
  payments: { month: string; amount: number; paid: boolean; date?: string }[];
}

const sampleTenants: Tenant[] = [
  {
    id: 1,
    name: "Mehmet Yılmaz",
    apartment: "3B",
    floor: 3,
    phone: "0532 111 22 33",
    email: "mehmet@email.com",
    ownerName: "Ayşe Kaya",
    ownerPhone: "0533 444 55 66",
    moveInDate: "2023-03-01",
    contractEnd: "2025-02-28",
    monthlyRent: 12000,
    deposit: 24000,
    status: "aktif",
    payments: [
      { month: "Ocak 2025", amount: 12000, paid: true, date: "2025-01-03" },
      { month: "Şubat 2025", amount: 12000, paid: true, date: "2025-02-02" },
      { month: "Mart 2025", amount: 12000, paid: false },
    ],
  },
  {
    id: 2,
    name: "Fatma Demir",
    apartment: "5A",
    floor: 5,
    phone: "0545 222 33 44",
    email: "fatma@email.com",
    ownerName: "Ali Çelik",
    ownerPhone: "0536 777 88 99",
    moveInDate: "2022-07-15",
    contractEnd: "2024-07-14",
    monthlyRent: 9500,
    deposit: 19000,
    status: "bitti",
    payments: [
      { month: "Mayıs 2024", amount: 9500, paid: true, date: "2024-05-05" },
      { month: "Haziran 2024", amount: 9500, paid: true, date: "2024-06-04" },
      { month: "Temmuz 2024", amount: 9500, paid: true, date: "2024-07-01" },
    ],
  },
  {
    id: 3,
    name: "Burak Arslan",
    apartment: "2C",
    floor: 2,
    phone: "0543 333 44 55",
    email: "burak@email.com",
    ownerName: "Zeynep Şahin",
    ownerPhone: "0537 000 11 22",
    moveInDate: "2024-01-01",
    contractEnd: "2025-12-31",
    monthlyRent: 8500,
    deposit: 17000,
    status: "geciken",
    payments: [
      { month: "Ocak 2025", amount: 8500, paid: true, date: "2025-01-10" },
      { month: "Şubat 2025", amount: 8500, paid: false },
      { month: "Mart 2025", amount: 8500, paid: false },
    ],
  },
  {
    id: 4,
    name: "Selin Kılıç",
    apartment: "7D",
    floor: 7,
    phone: "0541 555 66 77",
    email: "selin@email.com",
    ownerName: "Hasan Öztürk",
    ownerPhone: "0534 222 33 44",
    moveInDate: "2024-06-01",
    contractEnd: "2026-05-31",
    monthlyRent: 15000,
    deposit: 30000,
    status: "aktif",
    payments: [
      { month: "Ocak 2025", amount: 15000, paid: true, date: "2025-01-02" },
      { month: "Şubat 2025", amount: 15000, paid: true, date: "2025-02-01" },
      { month: "Mart 2025", amount: 15000, paid: true, date: "2025-03-03" },
    ],
  },
  {
    id: 5,
    name: "Can Koç",
    apartment: "1A",
    floor: 1,
    phone: "0542 666 77 88",
    email: "can@email.com",
    ownerName: "Murat Yıldız",
    ownerPhone: "0539 333 44 55",
    moveInDate: "2023-09-01",
    contractEnd: "2025-08-31",
    monthlyRent: 7000,
    deposit: 14000,
    status: "aktif",
    payments: [
      { month: "Ocak 2025", amount: 7000, paid: true, date: "2025-01-05" },
      { month: "Şubat 2025", amount: 7000, paid: true, date: "2025-02-06" },
      { month: "Mart 2025", amount: 7000, paid: false },
    ],
  },
];

const statusConfig = {
  aktif: {
    label: "Aktif",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
    iconColor: "text-green-500",
  },
  geciken: {
    label: "Gecikmiş Ödeme",
    color: "bg-red-100 text-red-700",
    icon: AlertCircle,
    iconColor: "text-red-500",
  },
  bitti: {
    label: "Sözleşme Bitti",
    color: "bg-gray-100 text-gray-600",
    icon: Clock,
    iconColor: "text-gray-400",
  },
};

export default function TenantManagement({
  buildingId: _buildingId,
  isOwner,
  t: _t,
}: { buildingId: string; isOwner: boolean; t: any }) {
  const [tenants] = useState<Tenant[]>(sampleTenants);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "hepsi" | "aktif" | "geciken" | "bitti"
  >("hepsi");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"liste" | "ozet">("liste");

  const filtered = tenants.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.apartment.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "hepsi" || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalRent = tenants
    .filter((t) => t.status === "aktif" || t.status === "geciken")
    .reduce((s, t) => s + t.monthlyRent, 0);
  const totalDeposit = tenants.reduce((s, t) => s + t.deposit, 0);
  const overdueCount = tenants.filter((t) => t.status === "geciken").length;
  const activeCount = tenants.filter((t) => t.status === "aktif").length;

  const daysUntilExpiry = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#3A4654]">Kiracı Yönetimi</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Kiracı bilgileri, kira ödemeleri ve sözleşme takibi
          </p>
        </div>
        {isOwner && (
          <button
            type="button"
            className="flex items-center gap-2 bg-[#4F8EF7] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3a7ae0] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Yeni Kiracı Ekle
          </button>
        )}
      </div>

      {/* Tab */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {(["liste", "ozet"] as const).map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-white text-[#3A4654] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "liste" ? "Kiracı Listesi" : "Genel Özet"}
          </button>
        ))}
      </div>

      {activeTab === "ozet" && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500">Aktif Kiracı</p>
              <p className="text-2xl font-bold text-[#3A4654] mt-1">
                {activeCount}
              </p>
              <p className="text-xs text-green-500 mt-1">
                Toplam {tenants.length} kayıt
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500">Aylık Kira Geliri</p>
              <p className="text-2xl font-bold text-[#3A4654] mt-1">
                {(totalRent / 1000).toFixed(0)}K ₺
              </p>
              <p className="text-xs text-blue-500 mt-1">Aktif kira toplamı</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500">Toplam Depozito</p>
              <p className="text-2xl font-bold text-[#3A4654] mt-1">
                {(totalDeposit / 1000).toFixed(0)}K ₺
              </p>
              <p className="text-xs text-gray-400 mt-1">Tüm kiracılar</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500">Gecikmiş Ödeme</p>
              <p className="text-2xl font-bold text-red-500 mt-1">
                {overdueCount}
              </p>
              <p className="text-xs text-red-400 mt-1">Aksiyon gerekli</p>
            </div>
          </div>

          {/* Expiring Contracts */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-[#3A4654] mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-500" />
              Yaklaşan Sözleşme Bitişleri
            </h3>
            <div className="space-y-2">
              {tenants
                .filter(
                  (t) =>
                    daysUntilExpiry(t.contractEnd) > 0 &&
                    daysUntilExpiry(t.contractEnd) <= 180,
                )
                .sort(
                  (a, b) =>
                    new Date(a.contractEnd).getTime() -
                    new Date(b.contractEnd).getTime(),
                )
                .map((tenant) => {
                  const days = daysUntilExpiry(tenant.contractEnd);
                  return (
                    <div
                      key={tenant.id}
                      className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-[#3A4654]">
                          {tenant.name} - Daire {tenant.apartment}
                        </p>
                        <p className="text-xs text-gray-400">
                          {tenant.contractEnd} bitiş
                        </p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          days <= 30
                            ? "bg-red-100 text-red-600"
                            : days <= 60
                              ? "bg-orange-100 text-orange-600"
                              : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {days} gün kaldı
                      </span>
                    </div>
                  );
                })}
              {tenants.filter(
                (t) =>
                  daysUntilExpiry(t.contractEnd) > 0 &&
                  daysUntilExpiry(t.contractEnd) <= 180,
              ).length === 0 && (
                <p className="text-sm text-gray-400 text-center py-3">
                  Yakın 6 ay içinde biten sözleşme yok
                </p>
              )}
            </div>
          </div>

          {/* Overdue Payments */}
          {overdueCount > 0 && (
            <div className="bg-red-50 rounded-xl border border-red-100 p-4">
              <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Gecikmiş Ödemeler
              </h3>
              {tenants
                .filter((t) => t.status === "geciken")
                .map((tenant) => {
                  const unpaidCount = tenant.payments.filter(
                    (p) => !p.paid,
                  ).length;
                  return (
                    <div
                      key={tenant.id}
                      className="flex items-center justify-between py-2"
                    >
                      <div>
                        <p className="text-sm font-medium text-[#3A4654]">
                          {tenant.name} - Daire {tenant.apartment}
                        </p>
                        <p className="text-xs text-red-500">
                          {unpaidCount} aylık ödeme gecikmiş
                        </p>
                      </div>
                      <p className="text-sm font-bold text-red-600">
                        {(unpaidCount * tenant.monthlyRent).toLocaleString(
                          "tr-TR",
                        )}{" "}
                        ₺
                      </p>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}

      {activeTab === "liste" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Kiracı adı veya daire ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F8EF7]/30"
              />
            </div>
            <div className="flex gap-2">
              {(["hepsi", "aktif", "geciken", "bitti"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFilterStatus(s)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
                    filterStatus === s
                      ? "bg-[#4F8EF7] text-white border-[#4F8EF7]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#4F8EF7]"
                  }`}
                >
                  {s === "hepsi"
                    ? "Tümü"
                    : s === "aktif"
                      ? "Aktif"
                      : s === "geciken"
                        ? "Gecikmiş"
                        : "Bitti"}
                </button>
              ))}
            </div>
          </div>

          {/* Tenant Cards */}
          <div className="space-y-3">
            {filtered.map((tenant) => {
              const cfg = statusConfig[tenant.status];
              const StatusIcon = cfg.icon;
              const isExpanded = expandedId === tenant.id;
              const days = daysUntilExpiry(tenant.contractEnd);
              const unpaidPayments = tenant.payments.filter((p) => !p.paid);

              return (
                <div
                  key={tenant.id}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden"
                >
                  <button
                    type="button"
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors w-full text-left"
                    onClick={() => setExpandedId(isExpanded ? null : tenant.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#4F8EF7]/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-[#4F8EF7]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#3A4654]">
                            {tenant.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                              <Home className="w-3 h-3" /> Daire{" "}
                              {tenant.apartment} ({tenant.floor}. kat)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${cfg.color}`}
                        >
                          <StatusIcon className={`w-3 h-3 ${cfg.iconColor}`} />
                          {cfg.label}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-xs text-gray-400">Aylık Kira</p>
                        <p className="text-sm font-semibold text-[#3A4654]">
                          {tenant.monthlyRent.toLocaleString("tr-TR")} ₺
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Sözleşme Bitişi</p>
                        <p
                          className={`text-sm font-semibold ${
                            days < 0
                              ? "text-gray-400"
                              : days <= 30
                                ? "text-red-500"
                                : days <= 90
                                  ? "text-orange-500"
                                  : "text-[#3A4654]"
                          }`}
                        >
                          {tenant.contractEnd}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Depozito</p>
                        <p className="text-sm font-semibold text-[#3A4654]">
                          {tenant.deposit.toLocaleString("tr-TR")} ₺
                        </p>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-4">
                      {/* Contact Info */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-3 border border-gray-100">
                          <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                            <User className="w-3 h-3" /> Kiracı İletişim
                          </p>
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-3.5 h-3.5 text-gray-400" />
                              <span>{tenant.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-3.5 h-3.5 text-gray-400" />
                              <span>{tenant.email}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-100">
                          <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                            <Building2 className="w-3 h-3" /> Mal Sahibi
                          </p>
                          <div className="space-y-1.5">
                            <p className="text-sm font-medium text-[#3A4654]">
                              {tenant.ownerName}
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-3.5 h-3.5 text-gray-400" />
                              <span>{tenant.ownerPhone}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contract Timeline */}
                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                        <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                          <FileText className="w-3 h-3" /> Sözleşme Bilgileri
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Başlangıç: {tenant.moveInDate}</span>
                              <span>Bitiş: {tenant.contractEnd}</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div
                                className="bg-[#4F8EF7] h-2 rounded-full"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    Math.max(
                                      0,
                                      ((new Date().getTime() -
                                        new Date(tenant.moveInDate).getTime()) /
                                        (new Date(
                                          tenant.contractEnd,
                                        ).getTime() -
                                          new Date(
                                            tenant.moveInDate,
                                          ).getTime())) *
                                        100,
                                    ),
                                  )}%`,
                                }}
                              />
                            </div>
                            <p className="text-xs text-gray-400 mt-1 text-right">
                              {days > 0
                                ? `${days} gün kaldı`
                                : "Sözleşme sona erdi"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Payment History */}
                      <div className="bg-white rounded-lg p-3 border border-gray-100">
                        <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> Kira Ödeme Geçmişi
                        </p>
                        <div className="space-y-2">
                          {tenant.payments.map((payment) => (
                            <div
                              key={payment.month}
                              className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0"
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${payment.paid ? "bg-green-500" : "bg-red-400"}`}
                                />
                                <span className="text-sm text-[#3A4654]">
                                  {payment.month}
                                </span>
                                {payment.date && (
                                  <span className="text-xs text-gray-400">
                                    {payment.date}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                  {payment.amount.toLocaleString("tr-TR")} ₺
                                </span>
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full ${
                                    payment.paid
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-600"
                                  }`}
                                >
                                  {payment.paid ? "Ödendi" : "Bekliyor"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        {unpaidPayments.length > 0 && (
                          <div className="mt-3 flex items-center justify-between bg-red-50 rounded-lg px-3 py-2">
                            <span className="text-sm text-red-600">
                              {unpaidPayments.length} aylık gecikmiş ödeme
                            </span>
                            <span className="text-sm font-bold text-red-700">
                              {(
                                unpaidPayments.length * tenant.monthlyRent
                              ).toLocaleString("tr-TR")}{" "}
                              ₺
                            </span>
                          </div>
                        )}
                      </div>

                      {isOwner && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="flex-1 py-2 text-sm font-medium bg-[#4F8EF7] text-white rounded-lg hover:bg-[#3a7ae0] transition-colors"
                          >
                            Ödeme Kaydet
                          </button>
                          <button
                            type="button"
                            className="flex-1 py-2 text-sm font-medium bg-white border border-gray-200 text-[#3A4654] rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Sözleşme Yenile
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <User className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Kiracı bulunamadı</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
