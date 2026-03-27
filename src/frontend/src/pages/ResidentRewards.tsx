import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  CheckCircle,
  Gift,
  Star,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface ResidentRewardsProps {
  buildingId: string;
  isOwner: boolean;
  t: any;
}

const residents = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    apartment: "D:12",
    points: 1850,
    badge: "Altın Sakin",
  },
  {
    id: "2",
    name: "Fatma Demir",
    apartment: "D:7",
    points: 1420,
    badge: "Gümüş Sakin",
  },
  {
    id: "3",
    name: "Mehmet Kaya",
    apartment: "D:3",
    points: 1180,
    badge: "Gümüş Sakin",
  },
  {
    id: "4",
    name: "Zeynep Çelik",
    apartment: "D:15",
    points: 840,
    badge: "Bronz Sakin",
  },
  {
    id: "5",
    name: "Ali Şahin",
    apartment: "D:9",
    points: 720,
    badge: "Bronz Sakin",
  },
  {
    id: "6",
    name: "Ayşe Koç",
    apartment: "D:2",
    points: 540,
    badge: "Bronz Sakin",
  },
  { id: "7", name: "Mustafa Öz", apartment: "D:18", points: 310, badge: null },
  { id: "8", name: "Elif Arslan", apartment: "D:6", points: 200, badge: null },
];

const pointHistory = [
  {
    id: "1",
    residentId: "1",
    resident: "Ahmet Yılmaz",
    action: "Zamanında Aidat Ödemesi",
    points: 50,
    date: "2026-03-01",
    category: "aidat",
  },
  {
    id: "2",
    residentId: "1",
    resident: "Ahmet Yılmaz",
    action: "Gönüllü Görev Tamamlama",
    points: 30,
    date: "2026-02-15",
    category: "gonullu",
  },
  {
    id: "3",
    residentId: "1",
    resident: "Ahmet Yılmaz",
    action: "Anket Katılımı",
    points: 20,
    date: "2026-02-10",
    category: "anket",
  },
  {
    id: "4",
    residentId: "1",
    resident: "Ahmet Yılmaz",
    action: "Toplantıya Katılım",
    points: 15,
    date: "2026-02-05",
    category: "toplanti",
  },
  {
    id: "5",
    residentId: "1",
    resident: "Ahmet Yılmaz",
    action: "Hasar Bildirimi",
    points: 10,
    date: "2026-01-28",
    category: "hasar",
  },
  {
    id: "6",
    residentId: "2",
    resident: "Fatma Demir",
    action: "Zamanında Aidat Ödemesi",
    points: 50,
    date: "2026-03-01",
    category: "aidat",
  },
  {
    id: "7",
    residentId: "2",
    resident: "Fatma Demir",
    action: "Toplantıya Katılım",
    points: 15,
    date: "2026-02-05",
    category: "toplanti",
  },
  {
    id: "8",
    residentId: "2",
    resident: "Fatma Demir",
    action: "Anket Katılımı",
    points: 20,
    date: "2026-02-10",
    category: "anket",
  },
  {
    id: "9",
    residentId: "2",
    resident: "Fatma Demir",
    action: "Gönüllü Görev Tamamlama",
    points: 30,
    date: "2026-01-20",
    category: "gonullu",
  },
  {
    id: "10",
    residentId: "3",
    resident: "Mehmet Kaya",
    action: "Zamanında Aidat Ödemesi",
    points: 50,
    date: "2026-03-01",
    category: "aidat",
  },
  {
    id: "11",
    residentId: "3",
    resident: "Mehmet Kaya",
    action: "Hasar Bildirimi",
    points: 10,
    date: "2026-02-20",
    category: "hasar",
  },
  {
    id: "12",
    residentId: "3",
    resident: "Mehmet Kaya",
    action: "Anket Katılımı",
    points: 20,
    date: "2026-02-10",
    category: "anket",
  },
  {
    id: "13",
    residentId: "4",
    resident: "Zeynep Çelik",
    action: "Zamanında Aidat Ödemesi",
    points: 50,
    date: "2026-03-01",
    category: "aidat",
  },
  {
    id: "14",
    residentId: "4",
    resident: "Zeynep Çelik",
    action: "Gönüllü Görev Tamamlama",
    points: 30,
    date: "2026-02-18",
    category: "gonullu",
  },
  {
    id: "15",
    residentId: "5",
    resident: "Ali Şahin",
    action: "Zamanında Aidat Ödemesi",
    points: 50,
    date: "2026-03-01",
    category: "aidat",
  },
  {
    id: "16",
    residentId: "5",
    resident: "Ali Şahin",
    action: "Anket Katılımı",
    points: 20,
    date: "2026-02-10",
    category: "anket",
  },
  {
    id: "17",
    residentId: "6",
    resident: "Ayşe Koç",
    action: "Toplantıya Katılım",
    points: 15,
    date: "2026-02-05",
    category: "toplanti",
  },
  {
    id: "18",
    residentId: "6",
    resident: "Ayşe Koç",
    action: "Hasar Bildirimi",
    points: 10,
    date: "2026-02-22",
    category: "hasar",
  },
  {
    id: "19",
    residentId: "7",
    resident: "Mustafa Öz",
    action: "Anket Katılımı",
    points: 20,
    date: "2026-02-10",
    category: "anket",
  },
  {
    id: "20",
    residentId: "8",
    resident: "Elif Arslan",
    action: "Hasar Bildirimi",
    points: 10,
    date: "2026-02-25",
    category: "hasar",
  },
];

const rules = [
  {
    action: "Zamanında Aidat Ödemesi",
    points: 50,
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    action: "Gönüllü Görev Tamamlama",
    points: 30,
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    action: "Anket Katılımı",
    points: 20,
    icon: Star,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    action: "Toplantıya Katılım",
    points: 15,
    icon: TrendingUp,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    action: "Hasar Bildirimi",
    points: 10,
    icon: Zap,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    action: "Forum Konusu Açma",
    points: 5,
    icon: Star,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    action: "Öneri Gönderme",
    points: 5,
    icon: TrendingUp,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
];

const rewards = [
  {
    level: "Bronz Sakin",
    points: 500,
    color: "from-orange-400 to-amber-500",
    textColor: "text-amber-800",
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "🥉",
    perks: [
      "Özel profil rozeti",
      "Duyuruları öncelikli görme",
      "Teşekkür sertifikası",
    ],
  },
  {
    level: "Gümüş Sakin",
    points: 1000,
    color: "from-slate-400 to-gray-500",
    textColor: "text-slate-700",
    bg: "bg-slate-50",
    border: "border-slate-200",
    icon: "🥈",
    perks: [
      "Bronz ayrıcalıkları",
      "Aylık bülten öne çıkarma",
      "Yönetim toplantısına davet",
    ],
  },
  {
    level: "Altın Sakin",
    points: 2000,
    color: "from-yellow-400 to-amber-400",
    textColor: "text-yellow-800",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: "🥇",
    perks: [
      "Gümüş ayrıcalıkları",
      "Yıllık ödül töreni",
      "Yönetim danışma hakkı",
      "Özel park yeri önceliği",
    ],
  },
];

const getMedalIcon = (rank: number) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return null;
};

const getBadgeVariant = (badge: string | null) => {
  if (badge === "Altın Sakin")
    return "bg-yellow-100 text-yellow-800 border-yellow-300";
  if (badge === "Gümüş Sakin")
    return "bg-slate-100 text-slate-700 border-slate-300";
  if (badge === "Bronz Sakin")
    return "bg-orange-100 text-orange-700 border-orange-300";
  return "bg-gray-100 text-gray-600 border-gray-200";
};

const getCategoryColor = (category: string) => {
  const map: Record<string, string> = {
    aidat: "bg-green-100 text-green-700",
    gonullu: "bg-blue-100 text-blue-700",
    anket: "bg-yellow-100 text-yellow-700",
    toplanti: "bg-purple-100 text-purple-700",
    hasar: "bg-orange-100 text-orange-700",
  };
  return map[category] || "bg-gray-100 text-gray-600";
};

export default function ResidentRewards({
  buildingId: _buildingId,
  isOwner: _isOwner,
}: ResidentRewardsProps) {
  const [selectedResident, setSelectedResident] = useState("all");

  const filteredHistory =
    selectedResident === "all"
      ? pointHistory
      : pointHistory.filter((h) => h.residentId === selectedResident);

  const totalPoints = residents.reduce((s, r) => s + r.points, 0);
  const goldCount = residents.filter((r) => r.badge === "Altın Sakin").length;
  const bronzePlus = residents.filter((r) => r.badge !== null).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
          <Award className="w-5 h-5 text-yellow-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#0B1B2E]">
            Sakin Ödül & Teşvik Sistemi
          </h2>
          <p className="text-sm text-[#3A4654]">
            Katılım ve katkıya göre puan kazanın, rozet ve ayrıcalıklar edinin
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-[#3A4654]">Toplam Puan</p>
                <p className="text-lg font-bold text-[#0B1B2E]">
                  {totalPoints.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">🥇</span>
              </div>
              <div>
                <p className="text-xs text-[#3A4654]">Altın Sakin</p>
                <p className="text-lg font-bold text-[#0B1B2E]">{goldCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                <Gift className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-[#3A4654]">Rozetli Sakin</p>
                <p className="text-lg font-bold text-[#0B1B2E]">{bronzePlus}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-[#3A4654]">Toplam Sakin</p>
                <p className="text-lg font-bold text-[#0B1B2E]">
                  {residents.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="leaderboard">
        <TabsList className="bg-white border border-gray-200 rounded-xl p-1">
          <TabsTrigger
            value="leaderboard"
            data-ocid="rewards.tab"
            className="rounded-lg text-sm"
          >
            🏆 Liderlik Tablosu
          </TabsTrigger>
          <TabsTrigger
            value="history"
            data-ocid="rewards.tab"
            className="rounded-lg text-sm"
          >
            📋 Puan Geçmişi
          </TabsTrigger>
          <TabsTrigger
            value="rules"
            data-ocid="rewards.tab"
            className="rounded-lg text-sm"
          >
            📖 Puan Kuralları
          </TabsTrigger>
          <TabsTrigger
            value="rewards"
            data-ocid="rewards.tab"
            className="rounded-lg text-sm"
          >
            🎁 Ödüller
          </TabsTrigger>
        </TabsList>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="mt-4">
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-[#0B1B2E]">
                Puan Sıralaması
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {residents.map((resident, index) => {
                const rank = index + 1;
                const medal = getMedalIcon(rank);
                const nextMilestone =
                  resident.badge === "Altın Sakin"
                    ? 2000
                    : resident.badge === "Gümüş Sakin"
                      ? 2000
                      : resident.badge === "Bronz Sakin"
                        ? 1000
                        : resident.points < 500
                          ? 500
                          : 1000;
                const progress = Math.min(
                  (resident.points / nextMilestone) * 100,
                  100,
                );

                return (
                  <div
                    key={resident.id}
                    data-ocid={`rewards.item.${rank}`}
                    className={`flex items-center gap-4 p-3 rounded-xl border ${
                      rank <= 3
                        ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-amber-100"
                        : "bg-gray-50 border-gray-100"
                    }`}
                  >
                    <div className="w-8 text-center">
                      {medal ? (
                        <span className="text-xl">{medal}</span>
                      ) : (
                        <span className="text-sm font-bold text-gray-400">
                          #{rank}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-[#0B1B2E] text-sm">
                          {resident.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {resident.apartment}
                        </span>
                        {resident.badge && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getBadgeVariant(resident.badge)}`}
                          >
                            {resident.badge}
                          </span>
                        )}
                      </div>
                      <div className="mt-1.5 flex items-center gap-2">
                        <Progress value={progress} className="h-1.5 flex-1" />
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {resident.points}/{nextMilestone}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-indigo-600">
                        {resident.points}
                      </span>
                      <p className="text-xs text-gray-400">puan</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="mt-4">
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="text-base font-semibold text-[#0B1B2E]">
                  Puan Kazanma Geçmişi
                </CardTitle>
                <Select
                  value={selectedResident}
                  onValueChange={setSelectedResident}
                >
                  <SelectTrigger className="w-48" data-ocid="rewards.select">
                    <SelectValue placeholder="Sakin seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Sakinler</SelectItem>
                    {residents.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sakin</TableHead>
                    <TableHead>Eylem</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead className="text-right">Puan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium text-sm">
                        {entry.resident}
                      </TableCell>
                      <TableCell className="text-sm">{entry.action}</TableCell>
                      <TableCell>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryColor(entry.category)}`}
                        >
                          {entry.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {entry.date}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-bold text-indigo-600">
                          +{entry.points}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rules Tab */}
        <TabsContent value="rules" className="mt-4">
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-[#0B1B2E]">
                Puan Kazanma Kuralları
              </CardTitle>
              <p className="text-sm text-gray-500">
                Bu eylemler tamamlandığında otomatik olarak puan kazanılır
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {rules.map((rule) => {
                const Icon = rule.icon;
                return (
                  <div
                    key={rule.action}
                    className={`flex items-center justify-between p-3 rounded-xl ${rule.bg}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Icon className={`w-4 h-4 ${rule.color}`} />
                      </div>
                      <span className="font-medium text-sm text-[#0B1B2E]">
                        {rule.action}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`font-bold text-base px-3 ${rule.color} border-current`}
                    >
                      +{rule.points}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards" className="mt-4">
          <div className="grid md:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <Card
                key={reward.level}
                className={`bg-white rounded-xl shadow-sm border-2 ${reward.border}`}
              >
                <CardHeader className="pb-3">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${reward.color} flex items-center justify-center text-2xl shadow-md`}
                  >
                    {reward.icon}
                  </div>
                  <CardTitle
                    className={`text-lg font-bold mt-2 ${reward.textColor}`}
                  >
                    {reward.level}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {reward.points.toLocaleString()} puan gerekli
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Eşiğe ulaşan sakin sayısı</span>
                      <span className="font-semibold">
                        {
                          residents.filter((r) => r.points >= reward.points)
                            .length
                        }
                        /{residents.length}
                      </span>
                    </div>
                    <Progress
                      value={
                        (residents.filter((r) => r.points >= reward.points)
                          .length /
                          residents.length) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    {reward.perks.map((perk) => (
                      <div key={perk} className="flex items-center gap-2">
                        <CheckCircle
                          className={`w-3.5 h-3.5 flex-shrink-0 ${reward.textColor}`}
                        />
                        <span className="text-sm text-gray-600">{perk}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
