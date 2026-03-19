import { BarChart2, Plus, X } from "lucide-react";
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
import { Progress } from "../components/ui/progress";
import type { Survey, SurveyOption } from "../types";

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const SUR_KEY = (id: string) => `sitecore_surveys_${id}`;

export default function SurveyManagement({
  buildingId,
  userId,
  isOwner,
  t,
}: Props) {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    options: ["", ""],
  });

  useEffect(() => {
    const raw = localStorage.getItem(SUR_KEY(buildingId));
    if (raw) setSurveys(JSON.parse(raw));
  }, [buildingId]);

  const save = (updated: Survey[]) => {
    setSurveys(updated);
    localStorage.setItem(SUR_KEY(buildingId), JSON.stringify(updated));
  };

  const resetForm = () =>
    setForm({ title: "", description: "", options: ["", ""] });

  const handleCreate = () => {
    if (!form.title.trim()) return;
    const validOptions = form.options.filter((o) => o.trim());
    if (validOptions.length < 2) return;
    const survey: Survey = {
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
    };
    save([survey, ...surveys]);
    setShowDialog(false);
    resetForm();
  };

  const handleVote = (surveyId: string, optionId: string) => {
    save(
      surveys.map((s) =>
        s.id !== surveyId
          ? s
          : {
              ...s,
              options: s.options.map((o) =>
                o.id === optionId && !o.votes.includes(userId)
                  ? { ...o, votes: [...o.votes, userId] }
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

  const getUserVote = (survey: Survey) =>
    survey.options.find((o) => o.votes.includes(userId))?.id;

  const active = surveys.filter((s) => s.isActive);
  const closed = surveys.filter((s) => !s.isActive);

  const SurveyCard = ({ survey, idx }: { survey: Survey; idx: number }) => {
    const totalVotes = survey.options.reduce((s, o) => s + o.votes.length, 0);
    const userVote = getUserVote(survey);

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
            const isMyVote = opt.id === userVote;
            return (
              <div
                key={opt.id}
                className={`p-3 rounded-xl border ${isMyVote ? "border-[#4A90D9] bg-[#EEF3FA]" : "border-[#E5EAF2]"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-sm ${isMyVote ? "font-semibold text-[#4A90D9]" : "text-[#0E1116]"}`}
                  >
                    {opt.text}
                    {isMyVote && " ✓"}
                  </span>
                  <span className="text-xs text-[#3A4654]/60">
                    {opt.votes.length} oy ({pct}%)
                  </span>
                </div>
                <Progress value={pct} className="h-1.5" />
                {survey.isActive && !userVote && (
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
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-green-600">{active.length}</p>
          <p className="text-[#3A4654] text-sm mt-1">{t.activeSurveys}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-[#3A4654]">{closed.length}</p>
          <p className="text-[#3A4654] text-sm mt-1">Kapalı Anket</p>
        </div>
      </div>

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

      {/* Create Dialog */}
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
