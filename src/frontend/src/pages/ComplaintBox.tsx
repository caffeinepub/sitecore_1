import {
  AlertTriangle,
  BarChart2,
  Clock,
  MessageSquare,
  Plus,
  User,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
import { Textarea } from "../components/ui/textarea";

type Priority = "low" | "medium" | "high" | "urgent";
type ComplaintStatus = "pending" | "investigating" | "resolved";

interface Complaint {
  id: string;
  title: string;
  description: string;
  category: "noise" | "cleanliness" | "security" | "suggestion" | "other";
  priority: Priority;
  anonymous: boolean;
  submittedBy: string;
  status: ComplaintStatus;
  adminReply?: string;
  assignedTo?: string;
  createdAt: string;
  resolvedAt?: string;
}

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const KEY = (id: string) => `sitecore_complaints_${id}`;

const PRIORITY_COLORS: Record<Priority, string> = {
  low: "bg-gray-100 text-gray-600 border-gray-200",
  medium: "bg-blue-100 text-blue-700 border-blue-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  urgent: "bg-red-100 text-red-700 border-red-200",
};

const PRIORITY_LABELS: Record<Priority, string> = {
  low: "Düşük",
  medium: "Orta",
  high: "Yüksek",
  urgent: "Acil",
};

const CAT_COLORS: Record<string, string> = {
  noise: "#F59E0B",
  cleanliness: "#22C55E",
  security: "#EF4444",
  suggestion: "#4A90D9",
  other: "#8B5CF6",
};

function daysSince(dateStr: string): number {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
}

export default function ComplaintBox({
  buildingId,
  userId,
  isOwner,
  t,
}: Props) {
  const [items, setItems] = useState<Complaint[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [replyTarget, setReplyTarget] = useState<Complaint | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyAssignee, setReplyAssignee] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "noise" as Complaint["category"],
    priority: "medium" as Priority,
    anonymous: false,
  });

  useEffect(() => {
    const raw = localStorage.getItem(KEY(buildingId));
    if (raw) {
      const parsed = JSON.parse(raw);
      setItems(
        parsed.map((c: any) => ({ priority: "medium" as Priority, ...c })),
      );
    } else {
      const seed: Complaint[] = [
        {
          id: "c1",
          title: "Gece Gürültüsü",
          description: "3. kattan gece geç saatte müzik sesi geliyor.",
          category: "noise",
          priority: "high",
          anonymous: false,
          submittedBy: "resident1",
          status: "investigating",
          assignedTo: "Yönetici Ali",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "c2",
          title: "Asansör Temizliği",
          description: "Asansör içi uzun süredir temizlenmedi.",
          category: "cleanliness",
          priority: "medium",
          anonymous: true,
          submittedBy: "anon",
          status: "resolved",
          adminReply: "Temizlik ekibi bilgilendirildi.",
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          resolvedAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "c3",
          title: "Otopark Güvenliği",
          description: "Otopark kameraları çalışmıyor.",
          category: "security",
          priority: "urgent",
          anonymous: false,
          submittedBy: "resident2",
          status: "pending",
          createdAt: new Date(Date.now() - 259200000).toISOString(),
        },
      ];
      setItems(seed);
      localStorage.setItem(KEY(buildingId), JSON.stringify(seed));
    }
  }, [buildingId]);

  const save = (updated: Complaint[]) => {
    setItems(updated);
    localStorage.setItem(KEY(buildingId), JSON.stringify(updated));
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.description.trim()) return;
    save([
      ...items,
      {
        id: Date.now().toString(),
        ...form,
        submittedBy: form.anonymous ? "anon" : userId,
        status: "pending" as ComplaintStatus,
        createdAt: new Date().toISOString(),
      },
    ]);
    setShowDialog(false);
    setForm({
      title: "",
      description: "",
      category: "noise",
      priority: "medium",
      anonymous: false,
    });
  };

  const handleReply = () => {
    if (!replyTarget) return;
    save(
      items.map((i) =>
        i.id === replyTarget.id
          ? {
              ...i,
              adminReply: replyText,
              assignedTo: replyAssignee || i.assignedTo,
              status: "resolved" as ComplaintStatus,
              resolvedAt: new Date().toISOString(),
            }
          : i,
      ),
    );
    setReplyTarget(null);
    setReplyText("");
    setReplyAssignee("");
  };

  const handleAdvanceStatus = (id: string) => {
    save(
      items.map((i) => {
        if (i.id !== id) return i;
        const next: ComplaintStatus =
          i.status === "pending"
            ? "investigating"
            : i.status === "investigating"
              ? "resolved"
              : "pending";
        return {
          ...i,
          status: next,
          resolvedAt:
            next === "resolved" ? new Date().toISOString() : undefined,
        };
      }),
    );
  };

  const statusBadge = (status: ComplaintStatus) => {
    if (status === "resolved")
      return (
        <Badge className="bg-green-100 text-green-700">{"Çözümlendi"}</Badge>
      );
    if (status === "investigating")
      return <Badge className="bg-blue-100 text-blue-700">İnceleniyor</Badge>;
    return (
      <Badge className="bg-amber-100 text-amber-700">
        {t.pending || "Bekliyor"}
      </Badge>
    );
  };

  const categoryLabel = (cat: string) => {
    const map: Record<string, string> = {
      noise: t.catNoise || "Gürültü",
      cleanliness: t.catCleanliness || "Temizlik",
      security: t.catSecurity || "Güvenlik",
      suggestion: t.catSuggestion || "Öneri",
      other: t.other || "Diğer",
    };
    return map[cat] || cat;
  };

  const myItems = isOwner
    ? items
    : items.filter((c) => c.submittedBy === userId || c.anonymous);

  const statusNextLabel = (s: ComplaintStatus) => {
    if (s === "pending") return "İncele";
    if (s === "investigating") return "Çözümlendi";
    return "Yeniden Aç";
  };

  // Category stats
  const catStats = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of items) {
      map[c.category] = (map[c.category] || 0) + 1;
    }
    const catLabelMap: Record<string, string> = {
      noise: t.catNoise || "Gürültü",
      cleanliness: t.catCleanliness || "Temizlik",
      security: t.catSecurity || "Güvenlik",
      suggestion: t.catSuggestion || "Öneri",
      other: t.other || "Diğer",
    };
    return Object.entries(map).map(([cat, count]) => ({
      name: catLabelMap[cat] || cat,
      count,
      fill: CAT_COLORS[cat] || "#8B5CF6",
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, t]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#0E1116]">
          {t.complaintBox || "Şikayet & Öneri Kutusu"}
        </h2>
        <Button
          onClick={() => setShowDialog(true)}
          className="bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full"
          data-ocid="complaints.primary_button"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t.submitComplaint || "Şikayet Ekle"}
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-[#E8EDF5]">
          <p className="text-sm text-[#6B7A8D]">
            {t.pendingComplaints || "Bekleyen"}
          </p>
          <p className="text-2xl font-bold text-amber-600">
            {items.filter((c) => c.status === "pending").length}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#E8EDF5]">
          <p className="text-sm text-[#6B7A8D]">İnceleniyor</p>
          <p className="text-2xl font-bold text-blue-600">
            {items.filter((c) => c.status === "investigating").length}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#E8EDF5]">
          <p className="text-sm text-[#6B7A8D]">
            {t.resolvedComplaints || "Çözümlenen"}
          </p>
          <p className="text-2xl font-bold text-green-600">
            {items.filter((c) => c.status === "resolved").length}
          </p>
        </div>
      </div>

      <Tabs defaultValue="list">
        <TabsList className="bg-[#F3F6FB]">
          <TabsTrigger value="list">Listele</TabsTrigger>
          <TabsTrigger value="stats">
            <BarChart2 className="w-3.5 h-3.5 mr-1" /> İstatistikler
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <div className="space-y-3">
            {myItems.length === 0 ? (
              <div
                className="bg-white rounded-2xl border border-[#E8EDF5] p-12 text-center"
                data-ocid="complaints.empty_state"
              >
                <MessageSquare className="h-10 w-10 text-[#D7DEE9] mx-auto mb-3" />
                <p className="text-[#6B7A8D]">
                  {t.noComplaints || "Şikayet bulunamadı."}
                </p>
              </div>
            ) : (
              myItems.map((c, i) => {
                const since = daysSince(c.createdAt);
                const resolutionDays = c.resolvedAt
                  ? Math.floor(
                      (new Date(c.resolvedAt).getTime() -
                        new Date(c.createdAt).getTime()) /
                        86400000,
                    )
                  : null;
                return (
                  <div
                    key={c.id}
                    className="bg-white rounded-2xl border border-[#E8EDF5] p-4"
                    data-ocid={`complaints.item.${i + 1}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-[#0E1116]">
                            {c.title}
                          </h3>
                          {statusBadge(c.status)}
                          <Badge
                            className={`border text-xs ${PRIORITY_COLORS[c.priority]}`}
                          >
                            <AlertTriangle className="h-3 w-3 mr-1 inline" />
                            {PRIORITY_LABELS[c.priority]}
                          </Badge>
                          <Badge className="bg-[#F1F4F8] text-[#6B7A8D]">
                            {categoryLabel(c.category)}
                          </Badge>
                          {c.anonymous && (
                            <Badge className="bg-gray-100 text-gray-600">
                              {t.anonymous || "Anonim"}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-[#3A4654]">
                          {c.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-[#6B7A8D]">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {since === 0 ? "Bugün" : `${since} gün önce`}
                          </span>
                          {c.assignedTo && (
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {c.assignedTo}
                            </span>
                          )}
                          {resolutionDays !== null && (
                            <span className="text-green-600">
                              ✓ {resolutionDays} günde çözümlendi
                            </span>
                          )}
                        </div>
                        {c.adminReply && (
                          <div className="mt-2 bg-[#F3F6FB] rounded-lg p-3">
                            <p className="text-xs font-medium text-[#6B7A8D] mb-1">
                              {t.adminReply || "Yönetici Yanıtı"}:
                            </p>
                            <p className="text-sm text-[#0E1116]">
                              {c.adminReply}
                            </p>
                          </div>
                        )}
                      </div>
                      {isOwner && (
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setReplyTarget(c);
                              setReplyText(c.adminReply || "");
                              setReplyAssignee(c.assignedTo || "");
                            }}
                            className="text-xs rounded-full"
                            data-ocid={`complaints.edit_button.${i + 1}`}
                          >
                            {t.adminReply || "Yanıtla"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAdvanceStatus(c.id)}
                            className="text-xs rounded-full"
                            data-ocid={`complaints.toggle.${i + 1}`}
                          >
                            {statusNextLabel(c.status)}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="mt-4">
          <div className="bg-white rounded-2xl border border-[#E8EDF5] p-5">
            <h3 className="font-semibold text-[#0E1116] mb-4">
              Kategori Dağılımı
            </h3>
            {catStats.length === 0 ? (
              <p className="text-[#6B7A8D] text-sm text-center py-6">
                Şikayet bulunamadı.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={catStats}
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F3F8" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#6B7A8D" }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#6B7A8D" }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #E5EAF2",
                    }}
                    formatter={(v) => [`${v} Şikayet`]}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {catStats.map((entry) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: recharts Cell by name
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-semibold text-[#3A4654]">
                Açık Şikayet Geçmişi
              </h4>
              {items
                .filter((c) => c.status !== "resolved")
                .map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-[#0E1116]">{c.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#6B7A8D]">
                        {daysSince(c.createdAt)} gündür açık
                      </span>
                      {statusBadge(c.status)}
                    </div>
                  </div>
                ))}
              {items.filter((c) => c.status !== "resolved").length === 0 && (
                <p className="text-sm text-green-600">
                  ✓ Tüm şikayetler çözümlendi.
                </p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md" data-ocid="complaints.dialog">
          <DialogHeader>
            <DialogTitle>
              {t.submitComplaint || "Şikayet / Öneri Ekle"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.complaintTitle || "Başlık"}
              </p>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                data-ocid="complaints.input"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  {t.complaintCategory || "Kategori"}
                </p>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      category: e.target.value as Complaint["category"],
                    }))
                  }
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                  data-ocid="complaints.select"
                >
                  <option value="noise">{t.catNoise || "Gürültü"}</option>
                  <option value="cleanliness">
                    {t.catCleanliness || "Temizlik"}
                  </option>
                  <option value="security">
                    {t.catSecurity || "Güvenlik"}
                  </option>
                  <option value="suggestion">
                    {t.catSuggestion || "Öneri"}
                  </option>
                  <option value="other">{t.other || "Diğer"}</option>
                </select>
              </div>
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  Aciliyet
                </p>
                <select
                  value={form.priority}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      priority: e.target.value as Priority,
                    }))
                  }
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                >
                  <option value="low">Düşük</option>
                  <option value="medium">Orta</option>
                  <option value="high">Yüksek</option>
                  <option value="urgent">Acil</option>
                </select>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.complaintDesc || "Açıklama"}
              </p>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={4}
                data-ocid="complaints.textarea"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anon"
                checked={form.anonymous}
                onChange={(e) =>
                  setForm((p) => ({ ...p, anonymous: e.target.checked }))
                }
                data-ocid="complaints.checkbox"
              />
              <label htmlFor="anon" className="text-sm text-[#3A4654]">
                {t.anonymous || "Anonim Gönder"}
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full"
                data-ocid="complaints.submit_button"
              >
                {t.submitComplaint || "Gönder"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDialog(false)}
                className="flex-1 rounded-full"
                data-ocid="complaints.cancel_button"
              >
                {t.cancel || "İptal"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!replyTarget} onOpenChange={() => setReplyTarget(null)}>
        <DialogContent className="max-w-md" data-ocid="complaints.modal">
          <DialogHeader>
            <DialogTitle>{t.adminReply || "Yanıt Yaz"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Atanan Kişi
              </p>
              <Input
                value={replyAssignee}
                onChange={(e) => setReplyAssignee(e.target.value)}
                placeholder="Örn. Yönetici Ali"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">Yanıt</p>
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={4}
                placeholder={t.adminReply || "Yanıtınızı yazın..."}
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleReply}
                className="flex-1 bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full"
                data-ocid="complaints.confirm_button"
              >
                {t.send || "Gönder"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setReplyTarget(null)}
                className="flex-1 rounded-full"
                data-ocid="complaints.close_button"
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
