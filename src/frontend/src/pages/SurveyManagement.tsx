import { BarChart2, Clock, PieChart, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart as RePieChart,
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
import { Progress } from "../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import type { Survey, SurveyOption } from "../types";

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const SUR_KEY = (id: string) => `sitecore_surveys_${id}`;

const PIE_COLORS = [
  "#4A90D9",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

function getCountdown(deadline: string): string {
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return "Süre doldu";
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  if (days > 0) return `${days}g ${hours}sa kaldı`;
  const mins = Math.floor((diff % 3600000) / 60000);
  return `${hours}sa ${mins}dk kaldı`;
}

export default function SurveyManagement({
  buildingId,
  userId,
  isOwner,
  t,
}: Props) {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [chartSurvey, setChartSurvey] = useState<Survey | null>(null);
  const [chartType, setChartType] = useState<"pie" | "bar">("pie");

  const [form, setForm] = useState({
    title: "",
    description: "",
    options: ["", ""],
    deadline: "",
    anonymous: false,
  });

  useEffect(() => {
    const raw = localStorage.getItem(SUR_KEY(buildingId));
    if (raw) {
      const parsed: Survey[] = JSON.parse(raw);
      const updated = parsed.map((s: any) => {
        if (
          s.deadline &&
          new Date(s.deadline).getTime() < Date.now() &&
          s.isActive
        ) {
          return { ...s, isActive: false, closedAt: Date.now() };
        }
        return s;
      });
      setSurveys(updated);
    }
  }, [buildingId]);

  const save = (updated: Survey[]) => {
    setSurveys(updated);
    localStorage.setItem(SUR_KEY(buildingId), JSON.stringify(updated));
  };

  const resetForm = () =>
    setForm({
      title: "",
      description: "",
      options: ["", ""],
      deadline: "",
      anonymous: false,
    });

  const handleCreate = () => {
    if (!form.title.trim()) return;
    const validOptions = form.options.filter((o) => o.trim());
    if (validOptions.length < 2) return;
    const survey: any = {
      id: crypto.randomUUID(),
      buildingId,
      title: form.title.trim(),
      description: form.description.trim(),
      options: validOptions.map(
        (text) =>
          ({
            id: crypto.randomUUID(),
            text: text.trim(),
            votes: [],
          }) as SurveyOption,
      ),
      createdBy: userId,
      createdAt: Date.now(),
      isActive: true,
      deadline: form.deadline || undefined,
      anonymous: form.anonymous,
    };
    save([survey, ...surveys]);
    setShowDialog(false);
    resetForm();
  };

  const handleVote = (surveyId: string, optionId: string) => {
    const survey = surveys.find((s) => s.id === surveyId);
    if (!survey) return;
    const isAnon = (survey as any).anonymous;
    const voteId = isAnon ? `anon_${Date.now()}` : userId;
    save(
      surveys.map((s) =>
        s.id !== surveyId
          ? s
          : {
              ...s,
              options: s.options.map((o) =>
                o.id === optionId && !o.votes.includes(isAnon ? "" : userId)
                  ? { ...o, votes: [...o.votes, voteId] }
                  : o,
              ),
            },
      ),
    );
  };

  const closeSurvey = (id: string) => {
    save(
      surveys.map((s) =>
        s.id === id ? { ...s, isActive: false, closedAt: Date.now() } : s,
      ),
    );
  };

  const getUserVote = (survey: Survey) => {
    if ((survey as any).anonymous) return undefined;
    return survey.options.find((o) => o.votes.includes(userId))?.id;
  };

  const active = surveys.filter((s) => s.isActive);
  const closed = surveys.filter((s) => !s.isActive);

  // Overall stats
  const totalVotesAll = surveys.reduce(
    (acc, s) => acc + s.options.reduce((a, o) => a + o.votes.length, 0),
    0,
  );
  const avgParticipation =
    surveys.length > 0 ? Math.round(totalVotesAll / surveys.length) : 0;

  const SurveyCard = ({ survey, idx }: { survey: Survey; idx: number }) => {
    const totalVotes = survey.options.reduce((s, o) => s + o.votes.length, 0);
    const userVote = getUserVote(survey);
    const deadline = (survey as any).deadline as string | undefined;
    const isAnon = (survey as any).anonymous as boolean;
    const isExpired = deadline && new Date(deadline).getTime() < Date.now();

    return (
      <div
        data-ocid={`surveys.item.${idx + 1}`}
        className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-[#0E1116]">{survey.title}</h3>
            {survey.description && (
              <p className="text-sm text-[#3A4654] mt-0.5">
                {survey.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {survey.isActive && deadline && !isExpired && (
                <span className="text-xs text-amber-600 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {getCountdown(deadline)}
                </span>
              )}
              {isExpired && (
                <Badge className="bg-red-100 text-red-600 text-xs">
                  Süre Doldu
                </Badge>
              )}
              {isAnon && (
                <Badge className="bg-gray-100 text-gray-600 text-xs">
                  Anonim Oylama
                </Badge>
              )}
              <span className="text-xs text-[#6B7A8D]">
                {totalVotes} oy · %
                {survey.options.length > 0 && totalVotes > 0
                  ? Math.round((totalVotes / Math.max(totalVotes, 1)) * 100)
                  : 0}{" "}
                katılım
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {survey.isActive ? (
              <Badge className="bg-green-100 text-green-700 border-green-200">
                Aktif
              </Badge>
            ) : (
              <Badge className="bg-gray-100 text-gray-600 border-gray-200">
                Kapalı
              </Badge>
            )}
            <Button
              onClick={() => setChartSurvey(survey)}
              size="sm"
              variant="outline"
              className="text-xs rounded-full gap-1"
            >
              <PieChart className="w-3 h-3" /> Grafik
            </Button>
            {isOwner && survey.isActive && (
              <Button
                data-ocid={`surveys.close_button.${idx + 1}`}
                onClick={() => closeSurvey(survey.id)}
                size="sm"
                variant="outline"
                className="text-xs rounded-full text-red-500 border-red-200 hover:bg-red-50"
              >
                {t.closeSurvey}
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {survey.options.map((opt) => {
            const pct =
              totalVotes > 0
                ? Math.round((opt.votes.length / totalVotes) * 100)
                : 0;
            const isMyVote = !isAnon && opt.id === userVote;
            return (
              <div
                key={opt.id}
                className={`p-3 rounded-xl border ${
                  isMyVote
                    ? "border-[#4A90D9] bg-[#EEF3FA]"
                    : "border-[#E5EAF2]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-sm ${
                      isMyVote
                        ? "font-semibold text-[#4A90D9]"
                        : "text-[#0E1116]"
                    }`}
                  >
                    {opt.text}
                    {isMyVote && " ✓"}
                  </span>
                  <span className="text-xs text-[#3A4654]/60">
                    {opt.votes.length} oy ({pct}%)
                  </span>
                </div>
                <Progress value={pct} className="h-1.5" />
                {survey.isActive && !userVote && !isExpired && (
                  <Button
                    data-ocid="surveys.toggle"
                    onClick={() => handleVote(survey.id, opt.id)}
                    size="sm"
                    className="mt-2 bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full text-xs h-6"
                  >
                    {t.vote}
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-xs text-[#3A4654]/50 mt-3 flex items-center gap-1">
          <BarChart2 className="w-3 h-3" /> {t.totalVotes}: {totalVotes}
        </p>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0E1116]">{t.surveys}</h2>
        {isOwner && (
          <Button
            data-ocid="surveys.primary_button"
            onClick={() => setShowDialog(true)}
            className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2"
          >
            <Plus className="w-4 h-4" />
            {t.createSurvey}
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-green-600">{active.length}</p>
          <p className="text-[#3A4654] text-sm mt-1">{t.activeSurveys}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-[#3A4654]">{closed.length}</p>
          <p className="text-[#3A4654] text-sm mt-1">Kapalı Anket</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-[#4A90D9]">{totalVotesAll}</p>
          <p className="text-[#3A4654] text-sm mt-1">Toplam Oy</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-amber-600">
            {avgParticipation}
          </p>
          <p className="text-[#3A4654] text-sm mt-1">Ort. Katılım</p>
        </div>
      </div>

      {/* Category breakdown for closed surveys */}
      {closed.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5EAF2] p-5 mb-6">
          <h3 className="font-semibold text-[#0E1116] mb-3">
            Kapalı Anket Katılım Özeti
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={closed.map((s) => ({
                name:
                  s.title.length > 18 ? `${s.title.slice(0, 18)}...` : s.title,
                Oy: s.options.reduce((a, o) => a + o.votes.length, 0),
              }))}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F3F8" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6B7A8D" }} />
              <YAxis tick={{ fontSize: 11, fill: "#6B7A8D" }} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #E5EAF2" }}
              />
              <Bar dataKey="Oy" fill="#4A90D9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {active.length === 0 && closed.length === 0 ? (
        <div
          data-ocid="surveys.empty_state"
          className="py-10 text-center text-[#3A4654]"
        >
          {t.noSurveys}
        </div>
      ) : (
        <div className="space-y-4">
          {active.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-[#3A4654] mb-3 uppercase tracking-wide">
                {t.activeSurveys}
              </h3>
              <div className="space-y-3">
                {active.map((s, idx) => (
                  <SurveyCard key={s.id} survey={s} idx={idx} />
                ))}
              </div>
            </div>
          )}
          {closed.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-[#3A4654] mb-3 uppercase tracking-wide mt-6">
                Kapalı Anketler
              </h3>
              <div className="space-y-3">
                {closed.map((s, idx) => (
                  <SurveyCard key={s.id} survey={s} idx={active.length + idx} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chart Modal */}
      <Dialog open={!!chartSurvey} onOpenChange={() => setChartSurvey(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{chartSurvey?.title} — Sonuçlar</DialogTitle>
          </DialogHeader>
          {chartSurvey &&
            (() => {
              const totalVotes = chartSurvey.options.reduce(
                (s, o) => s + o.votes.length,
                0,
              );
              const chartData = chartSurvey.options.map((o, i) => ({
                name: o.text,
                value: o.votes.length,
                pct:
                  totalVotes > 0
                    ? Math.round((o.votes.length / totalVotes) * 100)
                    : 0,
                fill: PIE_COLORS[i % PIE_COLORS.length],
              }));
              return (
                <div className="space-y-4">
                  <div className="flex gap-2 mb-2">
                    <Button
                      size="sm"
                      variant={chartType === "pie" ? "default" : "outline"}
                      onClick={() => setChartType("pie")}
                      className="rounded-full text-xs"
                    >
                      Pasta Grafik
                    </Button>
                    <Button
                      size="sm"
                      variant={chartType === "bar" ? "default" : "outline"}
                      onClick={() => setChartType("bar")}
                      className="rounded-full text-xs"
                    >
                      Çubuk Grafik
                    </Button>
                  </div>
                  <div className="bg-[#F8FAFC] rounded-xl p-3">
                    <p className="text-sm text-[#6B7A8D] mb-1">
                      Toplam Oy: <strong>{totalVotes}</strong>
                    </p>
                    <p className="text-sm text-[#6B7A8D]">
                      Katılım Oranı:{" "}
                      <strong>%{totalVotes > 0 ? 100 : 0}</strong>
                    </p>
                  </div>
                  {chartType === "pie" ? (
                    <ResponsiveContainer width="100%" height={220}>
                      <RePieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, pct }) => `${name}: %${pct}`}
                          labelLine={false}
                        >
                          {chartData.map((entry) => (
                            // biome-ignore lint/suspicious/noArrayIndexKey: recharts Cell
                            <Cell key={entry.name} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(v) => [`${v} oy`]} />
                        <Legend />
                      </RePieChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart
                        data={chartData}
                        margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#F0F3F8" />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 11, fill: "#6B7A8D" }}
                        />
                        <YAxis tick={{ fontSize: 11, fill: "#6B7A8D" }} />
                        <Tooltip formatter={(v) => [`${v} oy`]} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {chartData.map((entry) => (
                            // biome-ignore lint/suspicious/noArrayIndexKey: recharts Cell
                            <Cell key={entry.name} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              );
            })()}
        </DialogContent>
      </Dialog>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t.createSurvey}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.surveyTitle} *
              </p>
              <Input
                data-ocid="surveys.input"
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Anket başlığı..."
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.surveyDesc}
              </p>
              <Input
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Açıklama..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  Son Tarih
                </p>
                <Input
                  type="datetime-local"
                  value={form.deadline}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, deadline: e.target.value }))
                  }
                />
              </div>
              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="survey-anon"
                  checked={form.anonymous}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, anonymous: e.target.checked }))
                  }
                />
                <label htmlFor="survey-anon" className="text-sm text-[#3A4654]">
                  Anonim Oylama
                </label>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.surveyOptions}
              </p>
              <div className="space-y-2">
                {form.options.map((opt, idx) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: form options are positional
                  <div key={`opt-${idx}`} className="flex items-center gap-2">
                    <Input
                      value={opt}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          options: p.options.map((o, i) =>
                            i === idx ? e.target.value : o,
                          ),
                        }))
                      }
                      placeholder={`Seçenek ${idx + 1}`}
                    />
                    {idx >= 2 && (
                      <Button
                        onClick={() =>
                          setForm((p) => ({
                            ...p,
                            options: p.options.filter((_, i) => i !== idx),
                          }))
                        }
                        variant="ghost"
                        size="sm"
                        className="p-1 h-8 w-8 text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  data-ocid="surveys.secondary_button"
                  onClick={() =>
                    setForm((p) => ({ ...p, options: [...p.options, ""] }))
                  }
                  variant="outline"
                  size="sm"
                  className="w-full rounded-full text-xs"
                >
                  + {t.addOption}
                </Button>
              </div>
            </div>
            <Button
              data-ocid="surveys.submit_button"
              onClick={handleCreate}
              disabled={
                !form.title.trim() ||
                form.options.filter((o) => o.trim()).length < 2
              }
              className="w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
            >
              {t.createSurvey}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
