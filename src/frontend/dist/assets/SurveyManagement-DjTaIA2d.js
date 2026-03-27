import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input, X, e as Badge, l as ChartPie, w as ChartNoAxesColumn } from "./index-sLqKzs0M.js";
import { P as Progress } from "./progress-BGqsMrKl.js";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, b as Cell, L as Legend } from "./BarChart-Bmbb07Zq.js";
import { P as PieChart, a as Pie } from "./PieChart-DaaDmLlT.js";
import { C as Clock } from "./clock-CJGjspA3.js";
const SUR_KEY = (id) => `sitecore_surveys_${id}`;
const PIE_COLORS = [
  "#4A90D9",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4"
];
function getCountdown(deadline) {
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return "Süre doldu";
  const days = Math.floor(diff / 864e5);
  const hours = Math.floor(diff % 864e5 / 36e5);
  if (days > 0) return `${days}g ${hours}sa kaldı`;
  const mins = Math.floor(diff % 36e5 / 6e4);
  return `${hours}sa ${mins}dk kaldı`;
}
const SURVEY_TEMPLATES = [
  {
    key: "memnuniyet",
    title: "Memnuniyet Anketi",
    desc: "Sakinlerin bina hizmetlerinden memnuniyetini ölçer",
    options: [
      "Çok Memnunum",
      "Memnunum",
      "Kararsızım",
      "Memnun Değilim",
      "Hiç Memnun Değilim"
    ]
  },
  {
    key: "tadilat",
    title: "Tadilat İzni Oylaması",
    desc: "Planlanan tadilat için komşu onayı alır",
    options: ["Onaylıyorum", "Koşullu Onaylıyorum", "Reddediyorum"]
  },
  {
    key: "butce",
    title: "Bütçe Onayı",
    desc: "Yıllık bütçe planı için sakin onayı",
    options: ["Kabul Ediyorum", "Değişiklik Öneriyorum", "Reddediyorum"]
  },
  {
    key: "yonetim",
    title: "Yönetim Değerlendirme",
    desc: "Yönetim ekibinin performansını değerlendirir",
    options: ["Çok İyi", "İyi", "Orta", "Kötü"]
  }
];
function SurveyManagement({
  buildingId,
  userId,
  isOwner,
  t
}) {
  const [surveys, setSurveys] = reactExports.useState([]);
  const [showDialog, setShowDialog] = reactExports.useState(false);
  const [chartSurvey, setChartSurvey] = reactExports.useState(null);
  const [chartType, setChartType] = reactExports.useState("pie");
  const [form, setForm] = reactExports.useState({
    title: "",
    description: "",
    options: ["", ""],
    deadline: "",
    anonymous: false
  });
  reactExports.useEffect(() => {
    const raw = localStorage.getItem(SUR_KEY(buildingId));
    if (raw) {
      const parsed = JSON.parse(raw);
      const updated = parsed.map((s) => {
        if (s.deadline && new Date(s.deadline).getTime() < Date.now() && s.isActive) {
          return { ...s, isActive: false, closedAt: Date.now() };
        }
        return s;
      });
      setSurveys(updated);
    }
  }, [buildingId]);
  const save = (updated) => {
    setSurveys(updated);
    localStorage.setItem(SUR_KEY(buildingId), JSON.stringify(updated));
  };
  const resetForm = () => setForm({
    title: "",
    description: "",
    options: ["", ""],
    deadline: "",
    anonymous: false
  });
  const handleCreate = () => {
    if (!form.title.trim()) return;
    const validOptions = form.options.filter((o) => o.trim());
    if (validOptions.length < 2) return;
    const survey = {
      id: crypto.randomUUID(),
      buildingId,
      title: form.title.trim(),
      description: form.description.trim(),
      options: validOptions.map(
        (text) => ({
          id: crypto.randomUUID(),
          text: text.trim(),
          votes: []
        })
      ),
      createdBy: userId,
      createdAt: Date.now(),
      isActive: true,
      deadline: form.deadline || void 0,
      anonymous: form.anonymous
    };
    save([survey, ...surveys]);
    setShowDialog(false);
    resetForm();
  };
  const handleVote = (surveyId, optionId) => {
    const survey = surveys.find((s) => s.id === surveyId);
    if (!survey) return;
    const isAnon = survey.anonymous;
    const voteId = isAnon ? `anon_${Date.now()}` : userId;
    save(
      surveys.map(
        (s) => s.id !== surveyId ? s : {
          ...s,
          options: s.options.map(
            (o) => o.id === optionId && !o.votes.includes(isAnon ? "" : userId) ? { ...o, votes: [...o.votes, voteId] } : o
          )
        }
      )
    );
  };
  const closeSurvey = (id) => {
    save(
      surveys.map(
        (s) => s.id === id ? { ...s, isActive: false, closedAt: Date.now() } : s
      )
    );
  };
  const getUserVote = (survey) => {
    var _a;
    if (survey.anonymous) return void 0;
    return (_a = survey.options.find((o) => o.votes.includes(userId))) == null ? void 0 : _a.id;
  };
  const active = surveys.filter((s) => s.isActive);
  const closed = surveys.filter((s) => !s.isActive);
  const totalVotesAll = surveys.reduce(
    (acc, s) => acc + s.options.reduce((a, o) => a + o.votes.length, 0),
    0
  );
  const avgParticipation = surveys.length > 0 ? Math.round(totalVotesAll / surveys.length) : 0;
  const SurveyCard = ({ survey, idx }) => {
    const totalVotes = survey.options.reduce((s, o) => s + o.votes.length, 0);
    const userVote = getUserVote(survey);
    const deadline = survey.deadline;
    const isAnon = survey.anonymous;
    const isExpired = deadline && new Date(deadline).getTime() < Date.now();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": `surveys.item.${idx + 1}`,
        className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-[#0E1116]", children: survey.title }),
              survey.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-0.5", children: survey.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 flex-wrap", children: [
                survey.isActive && deadline && !isExpired && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-amber-600 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                  getCountdown(deadline)
                ] }),
                isExpired && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-600 text-xs", children: "Süre Doldu" }),
                isAnon && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gray-100 text-gray-600 text-xs", children: "Anonim Oylama" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#6B7A8D]", children: [
                  totalVotes,
                  " oy · %",
                  survey.options.length > 0 && totalVotes > 0 ? Math.round(totalVotes / Math.max(totalVotes, 1) * 100) : 0,
                  " ",
                  "katılım"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              survey.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700 border-green-200", children: "Aktif" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gray-100 text-gray-600 border-gray-200", children: "Kapalı" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: () => setChartSurvey(survey),
                  size: "sm",
                  variant: "outline",
                  className: "text-xs rounded-full gap-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChartPie, { className: "w-3 h-3" }),
                    " Grafik"
                  ]
                }
              ),
              isOwner && survey.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": `surveys.close_button.${idx + 1}`,
                  onClick: () => closeSurvey(survey.id),
                  size: "sm",
                  variant: "outline",
                  className: "text-xs rounded-full text-red-500 border-red-200 hover:bg-red-50",
                  children: t.closeSurvey
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: survey.options.map((opt) => {
            const pct = totalVotes > 0 ? Math.round(opt.votes.length / totalVotes * 100) : 0;
            const isMyVote = !isAnon && opt.id === userVote;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `p-3 rounded-xl border ${isMyVote ? "border-[#4A90D9] bg-[#EEF3FA]" : "border-[#E5EAF2]"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `text-sm ${isMyVote ? "font-semibold text-[#4A90D9]" : "text-[#0E1116]"}`,
                        children: [
                          opt.text,
                          isMyVote && " ✓"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#3A4654]/60", children: [
                      opt.votes.length,
                      " oy (",
                      pct,
                      "%)"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct, className: "h-1.5" }),
                  survey.isActive && !userVote && !isExpired && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      "data-ocid": "surveys.toggle",
                      onClick: () => handleVote(survey.id, opt.id),
                      size: "sm",
                      className: "mt-2 bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full text-xs h-6",
                      children: t.vote
                    }
                  )
                ]
              },
              opt.id
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#3A4654]/50 mt-3 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-3 h-3" }),
            " ",
            t.totalVotes,
            ": ",
            totalVotes
          ] })
        ]
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: t.surveys }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "surveys.primary_button",
          onClick: () => setShowDialog(true),
          className: "bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            t.createSurvey
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-green-600", children: active.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654] text-sm mt-1", children: t.activeSurveys })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-[#3A4654]", children: closed.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654] text-sm mt-1", children: "Kapalı Anket" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-[#4A90D9]", children: totalVotesAll }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654] text-sm mt-1", children: "Toplam Oy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-amber-600", children: avgParticipation }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654] text-sm mt-1", children: "Ort. Katılım" })
      ] })
    ] }),
    isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-[#E5EAF2] p-5 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-3", children: "📋 Şablon Kütüphanesi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-3", children: SURVEY_TEMPLATES.map((tpl) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            setForm({
              title: tpl.title,
              description: tpl.desc,
              options: tpl.options,
              deadline: "",
              anonymous: false
            });
            setShowDialog(true);
          },
          className: "text-left p-3 bg-[#F3F6FB] rounded-xl hover:bg-[#E5EAF2] transition-colors",
          "data-ocid": "surveys.button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-[#0E1116]", children: tpl.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-1", children: tpl.desc }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#4A90D9] mt-2", children: "Şablonu Kullan →" })
          ]
        },
        tpl.key
      )) })
    ] }),
    closed.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-[#E5EAF2] p-5 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-3", children: "📊 Dönem Karşılaştırması" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: [closed[closed.length - 1], closed[closed.length - 2]].map(
        (s, i) => {
          const total = s.options.reduce(
            (a, o) => a + o.votes.length,
            0
          );
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `p-4 rounded-xl border-2 ${i === 0 ? "border-[#4A90D9] bg-blue-50" : "border-[#E5EAF2] bg-[#F3F6FB]"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-[#0E1116] mb-1", children: s.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D] mb-2", children: [
                  i === 0 ? "Son Dönem" : "Önceki Dönem",
                  " · ",
                  total,
                  " oy"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: s.options.map((o) => {
                  const pct = total > 0 ? Math.round(o.votes.length / total * 100) : 0;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]", children: o.text }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                        pct,
                        "%"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-white rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-1.5 rounded-full bg-[#4A90D9]",
                        style: { width: `${pct}%` }
                      }
                    ) })
                  ] }, o.id);
                }) })
              ]
            },
            s.id
          );
        }
      ) })
    ] }),
    closed.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-[#E5EAF2] p-5 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-3", children: "Kapalı Anket Katılım Özeti" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        BarChart,
        {
          data: closed.map((s) => ({
            name: s.title.length > 18 ? `${s.title.slice(0, 18)}...` : s.title,
            Oy: s.options.reduce((a, o) => a + o.votes.length, 0)
          })),
          margin: { top: 5, right: 10, left: 0, bottom: 5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#F0F3F8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 11, fill: "#6B7A8D" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11, fill: "#6B7A8D" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                contentStyle: { borderRadius: 8, border: "1px solid #E5EAF2" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Oy", fill: "#4A90D9", radius: [4, 4, 0, 0] })
          ]
        }
      ) })
    ] }),
    active.length === 0 && closed.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "surveys.empty_state",
        className: "py-10 text-center text-[#3A4654]",
        children: t.noSurveys
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      active.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-[#3A4654] mb-3 uppercase tracking-wide", children: t.activeSurveys }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: active.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(SurveyCard, { survey: s, idx }, s.id)) })
      ] }),
      closed.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-[#3A4654] mb-3 uppercase tracking-wide mt-6", children: "Kapalı Anketler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: closed.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(SurveyCard, { survey: s, idx: active.length + idx }, s.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!chartSurvey, onOpenChange: () => setChartSurvey(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        chartSurvey == null ? void 0 : chartSurvey.title,
        " — Sonuçlar"
      ] }) }),
      chartSurvey && (() => {
        const totalVotes = chartSurvey.options.reduce(
          (s, o) => s + o.votes.length,
          0
        );
        const chartData = chartSurvey.options.map((o, i) => ({
          name: o.text,
          value: o.votes.length,
          pct: totalVotes > 0 ? Math.round(o.votes.length / totalVotes * 100) : 0,
          fill: PIE_COLORS[i % PIE_COLORS.length]
        }));
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: chartType === "pie" ? "default" : "outline",
                onClick: () => setChartType("pie"),
                className: "rounded-full text-xs",
                children: "Pasta Grafik"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: chartType === "bar" ? "default" : "outline",
                onClick: () => setChartType("bar"),
                className: "rounded-full text-xs",
                children: "Çubuk Grafik"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F8FAFC] rounded-xl p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#6B7A8D] mb-1", children: [
              "Toplam Oy: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: totalVotes })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#6B7A8D]", children: [
              "Katılım Oranı:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                "%",
                totalVotes > 0 ? 100 : 0
              ] })
            ] })
          ] }),
          chartType === "pie" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pie,
              {
                data: chartData,
                cx: "50%",
                cy: "50%",
                outerRadius: 80,
                dataKey: "value",
                label: ({ name, pct }) => `${name}: %${pct}`,
                labelLine: false,
                children: chartData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.fill }, entry.name))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => [`${v} oy`] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {})
          ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            BarChart,
            {
              data: chartData,
              margin: { top: 5, right: 10, left: 0, bottom: 5 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#F0F3F8" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  XAxis,
                  {
                    dataKey: "name",
                    tick: { fontSize: 11, fill: "#6B7A8D" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11, fill: "#6B7A8D" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => [`${v} oy`] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", radius: [4, 4, 0, 0], children: chartData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.fill }, entry.name)) })
              ]
            }
          ) })
        ] });
      })()
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showDialog, onOpenChange: setShowDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t.createSurvey }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: [
            t.surveyTitle,
            " *"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "surveys.input",
              value: form.title,
              onChange: (e) => setForm((p) => ({ ...p, title: e.target.value })),
              placeholder: "Anket başlığı..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.surveyDesc }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.description,
              onChange: (e) => setForm((p) => ({ ...p, description: e.target.value })),
              placeholder: "Açıklama..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Son Tarih" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "datetime-local",
                value: form.deadline,
                onChange: (e) => setForm((p) => ({ ...p, deadline: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                id: "survey-anon",
                checked: form.anonymous,
                onChange: (e) => setForm((p) => ({ ...p, anonymous: e.target.checked }))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "survey-anon", className: "text-sm text-[#3A4654]", children: "Anonim Oylama" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.surveyOptions }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            form.options.map((opt, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: form options are positional
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: opt,
                    onChange: (e) => setForm((p) => ({
                      ...p,
                      options: p.options.map(
                        (o, i) => i === idx ? e.target.value : o
                      )
                    })),
                    placeholder: `Seçenek ${idx + 1}`
                  }
                ),
                idx >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => setForm((p) => ({
                      ...p,
                      options: p.options.filter((_, i) => i !== idx)
                    })),
                    variant: "ghost",
                    size: "sm",
                    className: "p-1 h-8 w-8 text-red-400",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }, `opt-${idx}`)
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "surveys.secondary_button",
                onClick: () => setForm((p) => ({ ...p, options: [...p.options, ""] })),
                variant: "outline",
                size: "sm",
                className: "w-full rounded-full text-xs",
                children: [
                  "+ ",
                  t.addOption
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "surveys.submit_button",
            onClick: handleCreate,
            disabled: !form.title.trim() || form.options.filter((o) => o.trim()).length < 2,
            className: "w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full",
            children: t.createSurvey
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  SurveyManagement as default
};
