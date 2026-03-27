import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, e as Badge, U as Users, $ as Vote, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input, X } from "./index-W9zdyH4f.js";
import { P as Progress } from "./progress-wke12Drj.js";
import { T as Textarea } from "./textarea-DipGXKip.js";
import { C as Clock } from "./clock-54B5Fbhc.js";
import { C as CircleCheck } from "./circle-check-DjuDRuEf.js";
import { T as Trophy } from "./trophy-E7eQOb6O.js";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, b as Cell } from "./BarChart-TJegvgAQ.js";
const SAMPLE_ELECTIONS = [
  {
    id: "e1",
    title: "Bina Yöneticisi Seçimi 2026",
    description: "Apartmanımızın 2026–2028 dönemini kapsayan yönetici seçimi. Tüm sakinlerin katılımı önemlidir.",
    startDate: "2026-03-01",
    endDate: "2026-03-31",
    status: "active",
    candidates: [
      { id: "c1", name: "Mehmet Yıldız", apartment: "Daire 301", votes: 8 },
      { id: "c2", name: "Ayşe Çelik", apartment: "Daire 204", votes: 12 },
      { id: "c3", name: "Ali Demir", apartment: "Daire 502", votes: 6 }
    ],
    totalVoters: 42,
    votedUsers: []
  },
  {
    id: "e2",
    title: "Apartman Komite Seçimi",
    description: "Bina komitesi için 3 üye seçimi. Komite, aylık toplantılarda yönetimi denetleyecektir.",
    startDate: "2025-11-01",
    endDate: "2025-11-15",
    status: "completed",
    candidates: [
      { id: "c4", name: "Fatma Kaya", apartment: "Daire 102", votes: 19 },
      { id: "c5", name: "Hasan Öztürk", apartment: "Daire 405", votes: 14 },
      { id: "c6", name: "Zeynep Arslan", apartment: "Daire 303", votes: 9 },
      { id: "c7", name: "Murat Şahin", apartment: "Daire 201", votes: 6 }
    ],
    totalVoters: 38,
    votedUsers: []
  }
];
const COLORS = ["#4A90D9", "#22C55E", "#F2A23A", "#EF4444", "#8B5CF6"];
function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}
function ElectionManagement({ buildingId, isOwner }) {
  const storageKey = `sitecore_elections_${buildingId}`;
  const userId = "current_user";
  const [elections, setElections] = reactExports.useState(() => {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : SAMPLE_ELECTIONS;
  });
  const [votingElection, setVotingElection] = reactExports.useState(null);
  const [selectedCandidate, setSelectedCandidate] = reactExports.useState("");
  const [showCreateModal, setShowCreateModal] = reactExports.useState(false);
  const [newCandidateName, setNewCandidateName] = reactExports.useState("");
  const [newCandidateApt, setNewCandidateApt] = reactExports.useState("");
  const [createForm, setCreateForm] = reactExports.useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    totalVoters: 40
  });
  const [candidates, setCandidates] = reactExports.useState([]);
  const save = (updated) => {
    setElections(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };
  const submitVote = () => {
    if (!votingElection || !selectedCandidate) return;
    const updated = elections.map((el) => {
      if (el.id !== votingElection.id) return el;
      return {
        ...el,
        candidates: el.candidates.map(
          (c) => c.id === selectedCandidate ? { ...c, votes: c.votes + 1 } : c
        ),
        votedUsers: [...el.votedUsers, userId]
      };
    });
    save(updated);
    setVotingElection(null);
    setSelectedCandidate("");
  };
  const handleCreate = () => {
    if (!createForm.title.trim() || candidates.length < 2) return;
    const newEl = {
      id: crypto.randomUUID(),
      ...createForm,
      status: "active",
      candidates,
      votedUsers: []
    };
    save([...elections, newEl]);
    setShowCreateModal(false);
    setCandidates([]);
    setCreateForm({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      totalVoters: 40
    });
  };
  const addCandidate = () => {
    if (!newCandidateName.trim()) return;
    setCandidates((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: newCandidateName,
        apartment: newCandidateApt,
        votes: 0
      }
    ]);
    setNewCandidateName("");
    setNewCandidateApt("");
  };
  const activeElections = elections.filter((e) => e.status === "active");
  const completedElections = elections.filter((e) => e.status === "completed");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Oy & Seçim Yönetimi" }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "election.primary_button",
          onClick: () => setShowCreateModal(true),
          className: "bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Seçim Oluştur"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "active", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-[#F3F6FB] mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "active", "data-ocid": "election.tab", children: [
          "Aktif Seçimler (",
          activeElections.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "completed", "data-ocid": "election.tab", children: [
          "Tamamlanan (",
          completedElections.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "active", className: "space-y-4", children: activeElections.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "election.empty_state",
          className: "bg-white rounded-2xl border border-[#E5EAF2] p-12 text-center text-[#6B7A8D]",
          children: "Şu an aktif seçim bulunmuyor."
        }
      ) : activeElections.map((el, idx) => {
        const totalVotes = el.candidates.reduce((s, c) => s + c.votes, 0);
        const participated = Math.round(
          totalVotes / el.totalVoters * 100
        );
        const hasVoted = el.votedUsers.includes(userId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `election.item.${idx + 1}`,
            className: "bg-white rounded-2xl border border-[#E5EAF2] shadow-sm p-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116]", children: el.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700 border-green-200 text-xs", children: "Aktif" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: el.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-2 text-xs text-[#6B7A8D]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                      " Bitiş: ",
                      el.endDate
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
                      " ",
                      totalVotes,
                      "/",
                      el.totalVoters,
                      " oy kullandı"
                    ] })
                  ] })
                ] }),
                !hasVoted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": "election.primary_button",
                    onClick: () => setVotingElection(el),
                    className: "bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full text-sm",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Vote, { className: "w-4 h-4 mr-1" }),
                      " Oy Kullan"
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-100 text-green-700 border-green-200", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 mr-1" }),
                  " Oy Kullandınız"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-[#6B7A8D] mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Katılım oranı" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    participated,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: participated, className: "h-2" })
              ] })
            ]
          },
          el.id
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "completed", className: "space-y-4", children: completedElections.map((el) => {
        const totalVotes = el.candidates.reduce((s, c) => s + c.votes, 0);
        const winner = [...el.candidates].sort(
          (a, b) => b.votes - a.votes
        )[0];
        const chartData = el.candidates.map((c) => ({
          name: c.name.split(" ")[0],
          Oy: c.votes,
          Yüzde: totalVotes > 0 ? Math.round(c.votes / totalVotes * 100) : 0
        }));
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-white rounded-2xl border border-[#E5EAF2] shadow-sm p-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116]", children: el.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gray-100 text-gray-600 text-xs", children: "Tamamlandı" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#6B7A8D] mt-0.5", children: [
                    "Bitiş: ",
                    el.endDate,
                    " — ",
                    totalVotes,
                    " oy"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4 text-amber-500 mx-auto mb-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-amber-700", children: winner == null ? void 0 : winner.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-600", children: [
                    winner == null ? void 0 : winner.votes,
                    " oy"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 140, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: chartData, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#F0F3F8" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 11 } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11 } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip,
                  {
                    formatter: (v, n) => n === "Oy" ? [`${v} oy`] : [`%${v}`]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Oy", radius: [4, 4, 0, 0], children: chartData.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Cell,
                  {
                    fill: COLORS[i % COLORS.length]
                  },
                  entry.name
                )) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 mt-3", children: el.candidates.map((c) => {
                const pct = totalVotes > 0 ? Math.round(c.votes / totalVotes * 100) : 0;
                const isWinner = c.id === (winner == null ? void 0 : winner.id);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `flex items-center gap-2 p-2 rounded-xl ${isWinner ? "bg-amber-50 border border-amber-200" : "bg-[#F3F6FB]"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-[#4A90D9] text-white flex items-center justify-center text-xs font-bold flex-shrink-0", children: getInitials(c.name) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium truncate", children: [
                          c.name,
                          " ",
                          isWinner && "🏆"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D]", children: [
                          c.votes,
                          " oy (%",
                          pct,
                          ")"
                        ] })
                      ] })
                    ]
                  },
                  c.id
                );
              }) })
            ]
          },
          el.id
        );
      }) })
    ] }),
    votingElection && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!votingElection,
        onOpenChange: () => {
          setVotingElection(null);
          setSelectedCandidate("");
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", "data-ocid": "election.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: votingElection.title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mb-3", children: votingElection.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: votingElection.candidates.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: `flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${selectedCandidate === c.id ? "border-[#4A90D9] bg-[#EEF3FA]" : "border-[#E5EAF2] hover:bg-[#F3F6FB]"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "radio",
                    name: "candidate",
                    value: c.id,
                    checked: selectedCandidate === c.id,
                    onChange: () => setSelectedCandidate(c.id),
                    className: "sr-only"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-[#4A90D9] text-white flex items-center justify-center text-sm font-bold flex-shrink-0", children: getInitials(c.name) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: c.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: c.apartment })
                ] }),
                selectedCandidate === c.id && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-[#4A90D9] ml-auto" })
              ]
            },
            c.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "election.confirm_button",
                onClick: submitVote,
                disabled: !selectedCandidate,
                className: "flex-1 bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full",
                children: "Oyu Gönder"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "election.cancel_button",
                variant: "outline",
                onClick: () => setVotingElection(null),
                className: "flex-1 rounded-full",
                children: "İptal"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showCreateModal, onOpenChange: setShowCreateModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "election.modal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Seçim Oluştur" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 max-h-[70vh] overflow-y-auto pr-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Seçim Başlığı *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "election.input",
              value: createForm.title,
              onChange: (e) => setCreateForm((p) => ({ ...p, title: e.target.value })),
              placeholder: "Yönetici Seçimi 2027"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Açıklama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: createForm.description,
              onChange: (e) => setCreateForm((p) => ({ ...p, description: e.target.value })),
              rows: 2
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Başlangıç" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: createForm.startDate,
                onChange: (e) => setCreateForm((p) => ({ ...p, startDate: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Bitiş" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: createForm.endDate,
                onChange: (e) => setCreateForm((p) => ({ ...p, endDate: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Toplam Seçmen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              value: createForm.totalVoters,
              onChange: (e) => setCreateForm((p) => ({
                ...p,
                totalVoters: Number(e.target.value)
              }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-[#E5EAF2] pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-[#0E1116] mb-2", children: "Adaylar (en az 2)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-3", children: candidates.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 bg-[#F3F6FB] rounded-lg px-3 py-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-[#4A90D9] text-white flex items-center justify-center text-xs font-bold", children: getInitials(c.name) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm flex-1", children: [
                  c.name,
                  " – ",
                  c.apartment
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setCandidates((prev) => prev.filter((_, j) => j !== i)),
                    className: "text-red-400 hover:text-red-600",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                  }
                )
              ]
            },
            c.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Ad Soyad",
                value: newCandidateName,
                onChange: (e) => setNewCandidateName(e.target.value),
                className: "flex-1"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Daire",
                value: newCandidateApt,
                onChange: (e) => setNewCandidateApt(e.target.value),
                className: "w-24"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: addCandidate,
                className: "rounded-full",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "election.submit_button",
            onClick: handleCreate,
            disabled: !createForm.title.trim() || candidates.length < 2,
            className: "w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full",
            children: "Seçimi Oluştur"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  ElectionManagement as default
};
