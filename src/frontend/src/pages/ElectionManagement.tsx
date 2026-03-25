import {
  CheckCircle2,
  Clock,
  Plus,
  Trophy,
  Users,
  Vote,
  X,
} from "lucide-react";
import { useState } from "react";
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
import { Progress } from "../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";

interface Candidate {
  id: string;
  name: string;
  apartment: string;
  votes: number;
}

interface Election {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed";
  candidates: Candidate[];
  totalVoters: number;
  votedUsers: string[];
}

interface Props {
  buildingId: string;
  isOwner: boolean;
  t: any;
}

const SAMPLE_ELECTIONS: Election[] = [
  {
    id: "e1",
    title: "Bina Yöneticisi Seçimi 2026",
    description:
      "Apartmanımızın 2026–2028 dönemini kapsayan yönetici seçimi. Tüm sakinlerin katılımı önemlidir.",
    startDate: "2026-03-01",
    endDate: "2026-03-31",
    status: "active",
    candidates: [
      { id: "c1", name: "Mehmet Yıldız", apartment: "Daire 301", votes: 8 },
      { id: "c2", name: "Ayşe Çelik", apartment: "Daire 204", votes: 12 },
      { id: "c3", name: "Ali Demir", apartment: "Daire 502", votes: 6 },
    ],
    totalVoters: 42,
    votedUsers: [],
  },
  {
    id: "e2",
    title: "Apartman Komite Seçimi",
    description:
      "Bina komitesi için 3 üye seçimi. Komite, aylık toplantılarda yönetimi denetleyecektir.",
    startDate: "2025-11-01",
    endDate: "2025-11-15",
    status: "completed",
    candidates: [
      { id: "c4", name: "Fatma Kaya", apartment: "Daire 102", votes: 19 },
      { id: "c5", name: "Hasan Öztürk", apartment: "Daire 405", votes: 14 },
      { id: "c6", name: "Zeynep Arslan", apartment: "Daire 303", votes: 9 },
      { id: "c7", name: "Murat Şahin", apartment: "Daire 201", votes: 6 },
    ],
    totalVoters: 38,
    votedUsers: [],
  },
];

const COLORS = ["#4A90D9", "#22C55E", "#F2A23A", "#EF4444", "#8B5CF6"];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function ElectionManagement({ buildingId, isOwner }: Props) {
  const storageKey = `sitecore_elections_${buildingId}`;
  const userId = "current_user";
  const [elections, setElections] = useState<Election[]>(() => {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : SAMPLE_ELECTIONS;
  });
  const [votingElection, setVotingElection] = useState<Election | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCandidateName, setNewCandidateName] = useState("");
  const [newCandidateApt, setNewCandidateApt] = useState("");
  const [createForm, setCreateForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    totalVoters: 40,
  });
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const save = (updated: Election[]) => {
    setElections(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const submitVote = () => {
    if (!votingElection || !selectedCandidate) return;
    const updated = elections.map((el) => {
      if (el.id !== votingElection.id) return el;
      return {
        ...el,
        candidates: el.candidates.map((c) =>
          c.id === selectedCandidate ? { ...c, votes: c.votes + 1 } : c,
        ),
        votedUsers: [...el.votedUsers, userId],
      };
    });
    save(updated);
    setVotingElection(null);
    setSelectedCandidate("");
  };

  const handleCreate = () => {
    if (!createForm.title.trim() || candidates.length < 2) return;
    const newEl: Election = {
      id: crypto.randomUUID(),
      ...createForm,
      status: "active",
      candidates,
      votedUsers: [],
    };
    save([...elections, newEl]);
    setShowCreateModal(false);
    setCandidates([]);
    setCreateForm({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      totalVoters: 40,
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
        votes: 0,
      },
    ]);
    setNewCandidateName("");
    setNewCandidateApt("");
  };

  const activeElections = elections.filter((e) => e.status === "active");
  const completedElections = elections.filter((e) => e.status === "completed");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#0E1116]">
          Oy & Seçim Yönetimi
        </h2>
        {isOwner && (
          <Button
            data-ocid="election.primary_button"
            onClick={() => setShowCreateModal(true)}
            className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2"
          >
            <Plus className="w-4 h-4" /> Seçim Oluştur
          </Button>
        )}
      </div>

      <Tabs defaultValue="active">
        <TabsList className="bg-[#F3F6FB] mb-4">
          <TabsTrigger value="active" data-ocid="election.tab">
            Aktif Seçimler ({activeElections.length})
          </TabsTrigger>
          <TabsTrigger value="completed" data-ocid="election.tab">
            Tamamlanan ({completedElections.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeElections.length === 0 ? (
            <div
              data-ocid="election.empty_state"
              className="bg-white rounded-2xl border border-[#E5EAF2] p-12 text-center text-[#6B7A8D]"
            >
              Şu an aktif seçim bulunmuyor.
            </div>
          ) : (
            activeElections.map((el, idx) => {
              const totalVotes = el.candidates.reduce((s, c) => s + c.votes, 0);
              const participated = Math.round(
                (totalVotes / el.totalVoters) * 100,
              );
              const hasVoted = el.votedUsers.includes(userId);
              return (
                <div
                  key={el.id}
                  data-ocid={`election.item.${idx + 1}`}
                  className="bg-white rounded-2xl border border-[#E5EAF2] shadow-sm p-5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#0E1116]">
                          {el.title}
                        </h3>
                        <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                          Aktif
                        </Badge>
                      </div>
                      <p className="text-sm text-[#6B7A8D] mt-1">
                        {el.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-[#6B7A8D]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Bitiş: {el.endDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" /> {totalVotes}/
                          {el.totalVoters} oy kullandı
                        </span>
                      </div>
                    </div>
                    {!hasVoted ? (
                      <Button
                        data-ocid="election.primary_button"
                        onClick={() => setVotingElection(el)}
                        className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full text-sm"
                      >
                        <Vote className="w-4 h-4 mr-1" /> Oy Kullan
                      </Button>
                    ) : (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Oy Kullandınız
                      </Badge>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-[#6B7A8D] mb-1">
                      <span>Katılım oranı</span>
                      <span>{participated}%</span>
                    </div>
                    <Progress value={participated} className="h-2" />
                  </div>
                </div>
              );
            })
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedElections.map((el) => {
            const totalVotes = el.candidates.reduce((s, c) => s + c.votes, 0);
            const winner = [...el.candidates].sort(
              (a, b) => b.votes - a.votes,
            )[0];
            const chartData = el.candidates.map((c) => ({
              name: c.name.split(" ")[0],
              Oy: c.votes,
              Yüzde:
                totalVotes > 0 ? Math.round((c.votes / totalVotes) * 100) : 0,
            }));
            return (
              <div
                key={el.id}
                className="bg-white rounded-2xl border border-[#E5EAF2] shadow-sm p-5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[#0E1116]">
                        {el.title}
                      </h3>
                      <Badge className="bg-gray-100 text-gray-600 text-xs">
                        Tamamlandı
                      </Badge>
                    </div>
                    <p className="text-sm text-[#6B7A8D] mt-0.5">
                      Bitiş: {el.endDate} — {totalVotes} oy
                    </p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-center">
                    <Trophy className="w-4 h-4 text-amber-500 mx-auto mb-0.5" />
                    <p className="text-xs font-semibold text-amber-700">
                      {winner?.name}
                    </p>
                    <p className="text-xs text-amber-600">{winner?.votes} oy</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F3F8" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      formatter={(v, n) =>
                        n === "Oy" ? [`${v} oy`] : [`%${v}`]
                      }
                    />
                    <Bar dataKey="Oy" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, i) => (
                        <Cell
                          key={entry.name}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {el.candidates.map((c) => {
                    const pct =
                      totalVotes > 0
                        ? Math.round((c.votes / totalVotes) * 100)
                        : 0;
                    const isWinner = c.id === winner?.id;
                    return (
                      <div
                        key={c.id}
                        className={`flex items-center gap-2 p-2 rounded-xl ${isWinner ? "bg-amber-50 border border-amber-200" : "bg-[#F3F6FB]"}`}
                      >
                        <div className="w-8 h-8 rounded-full bg-[#4A90D9] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {getInitials(c.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">
                            {c.name} {isWinner && "🏆"}
                          </p>
                          <p className="text-xs text-[#6B7A8D]">
                            {c.votes} oy (%{pct})
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </TabsContent>
      </Tabs>

      {/* Voting Modal */}
      {votingElection && (
        <Dialog
          open={!!votingElection}
          onOpenChange={() => {
            setVotingElection(null);
            setSelectedCandidate("");
          }}
        >
          <DialogContent className="max-w-sm" data-ocid="election.dialog">
            <DialogHeader>
              <DialogTitle>{votingElection.title}</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-[#6B7A8D] mb-3">
              {votingElection.description}
            </p>
            <div className="space-y-2">
              {votingElection.candidates.map((c) => (
                <label
                  key={c.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    selectedCandidate === c.id
                      ? "border-[#4A90D9] bg-[#EEF3FA]"
                      : "border-[#E5EAF2] hover:bg-[#F3F6FB]"
                  }`}
                >
                  <input
                    type="radio"
                    name="candidate"
                    value={c.id}
                    checked={selectedCandidate === c.id}
                    onChange={() => setSelectedCandidate(c.id)}
                    className="sr-only"
                  />
                  <div className="w-9 h-9 rounded-full bg-[#4A90D9] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {getInitials(c.name)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{c.name}</p>
                    <p className="text-xs text-[#6B7A8D]">{c.apartment}</p>
                  </div>
                  {selectedCandidate === c.id && (
                    <CheckCircle2 className="w-4 h-4 text-[#4A90D9] ml-auto" />
                  )}
                </label>
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <Button
                data-ocid="election.confirm_button"
                onClick={submitVote}
                disabled={!selectedCandidate}
                className="flex-1 bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
              >
                Oyu Gönder
              </Button>
              <Button
                data-ocid="election.cancel_button"
                variant="outline"
                onClick={() => setVotingElection(null)}
                className="flex-1 rounded-full"
              >
                İptal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-md" data-ocid="election.modal">
          <DialogHeader>
            <DialogTitle>Yeni Seçim Oluştur</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Seçim Başlığı *
              </p>
              <Input
                data-ocid="election.input"
                value={createForm.title}
                onChange={(e) =>
                  setCreateForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Yönetici Seçimi 2027"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Açıklama
              </p>
              <Textarea
                value={createForm.description}
                onChange={(e) =>
                  setCreateForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-[#3A4654] mb-1">
                  Başlangıç
                </p>
                <Input
                  type="date"
                  value={createForm.startDate}
                  onChange={(e) =>
                    setCreateForm((p) => ({ ...p, startDate: e.target.value }))
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#3A4654] mb-1">Bitiş</p>
                <Input
                  type="date"
                  value={createForm.endDate}
                  onChange={(e) =>
                    setCreateForm((p) => ({ ...p, endDate: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Toplam Seçmen
              </p>
              <Input
                type="number"
                value={createForm.totalVoters}
                onChange={(e) =>
                  setCreateForm((p) => ({
                    ...p,
                    totalVoters: Number(e.target.value),
                  }))
                }
              />
            </div>

            <div className="border-t border-[#E5EAF2] pt-3">
              <p className="text-sm font-semibold text-[#0E1116] mb-2">
                Adaylar (en az 2)
              </p>
              <div className="space-y-2 mb-3">
                {candidates.map((c, i) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-2 bg-[#F3F6FB] rounded-lg px-3 py-2"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#4A90D9] text-white flex items-center justify-center text-xs font-bold">
                      {getInitials(c.name)}
                    </div>
                    <span className="text-sm flex-1">
                      {c.name} – {c.apartment}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setCandidates((prev) => prev.filter((_, j) => j !== i))
                      }
                      className="text-red-400 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Ad Soyad"
                  value={newCandidateName}
                  onChange={(e) => setNewCandidateName(e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Daire"
                  value={newCandidateApt}
                  onChange={(e) => setNewCandidateApt(e.target.value)}
                  className="w-24"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addCandidate}
                  className="rounded-full"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <Button
              data-ocid="election.submit_button"
              onClick={handleCreate}
              disabled={!createForm.title.trim() || candidates.length < 2}
              className="w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
            >
              Seçimi Oluştur
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
