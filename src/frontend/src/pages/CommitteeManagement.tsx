import {
  CheckCircle,
  FileText,
  MinusCircle,
  Plus,
  Search,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
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

interface Props {
  buildingId: string;
  isOwner: boolean;
  t: any;
}

interface CommitteeMember {
  id: string;
  name: string;
  role: "Başkan" | "Üye" | "Sekreter" | "Denetçi";
  phone: string;
  termStart: string;
  termEnd: string;
  apartment: string;
}

interface Decision {
  id: string;
  date: string;
  subject: string;
  text: string;
  kabul: number;
  ret: number;
  cekimser: number;
  status: "yürürlükte" | "iptal";
}

const DEFAULT_MEMBERS: CommitteeMember[] = [
  {
    id: "1",
    name: "Ahmet Yıldırım",
    role: "Başkan",
    phone: "0532 111 22 33",
    termStart: "2025-01-01",
    termEnd: "2026-12-31",
    apartment: "A-15",
  },
  {
    id: "2",
    name: "Fatma Kaya",
    role: "Sekreter",
    phone: "0541 222 33 44",
    termStart: "2025-01-01",
    termEnd: "2026-12-31",
    apartment: "B-8",
  },
  {
    id: "3",
    name: "Mehmet Demir",
    role: "Üye",
    phone: "0555 333 44 55",
    termStart: "2025-01-01",
    termEnd: "2026-12-31",
    apartment: "A-3",
  },
  {
    id: "4",
    name: "Ayşe Çelik",
    role: "Üye",
    phone: "0533 444 55 66",
    termStart: "2025-01-01",
    termEnd: "2026-12-31",
    apartment: "C-12",
  },
  {
    id: "5",
    name: "Hasan Şahin",
    role: "Denetçi",
    phone: "0544 555 66 77",
    termStart: "2025-01-01",
    termEnd: "2026-12-31",
    apartment: "B-22",
  },
];

const DEFAULT_DECISIONS: Decision[] = [
  {
    id: "1",
    date: "2026-03-15",
    subject: "Asansör Bakım Sözleşmesi Yenileme",
    text: "Binanın A ve B bloğundaki asansörlerin bakım sözleşmesinin 2 yıllığına yenilenmesine karar verilmiştir.",
    kabul: 4,
    ret: 0,
    cekimser: 1,
    status: "yürürlükte",
  },
  {
    id: "2",
    date: "2026-02-20",
    subject: "Ortak Alan Boyası",
    text: "Bina koridorları ve giriş holünün boyanması için bütçeden ₺25.000 ayrılmasına karar verilmiştir.",
    kabul: 3,
    ret: 1,
    cekimser: 1,
    status: "yürürlükte",
  },
  {
    id: "3",
    date: "2026-01-10",
    subject: "Güvenlik Kamerası Ekleme",
    text: "Bodrum kat girişine 2 adet ek güvenlik kamerası takılmasına karar verilmiştir.",
    kabul: 5,
    ret: 0,
    cekimser: 0,
    status: "yürürlükte",
  },
  {
    id: "4",
    date: "2025-12-05",
    subject: "Havuz Kapatma Kararı",
    text: "Kış sezonu nedeniyle ortak alan havuzunun Mart 2026'ya kadar kapatılmasına karar verilmiştir.",
    kabul: 4,
    ret: 0,
    cekimser: 1,
    status: "yürürlükte",
  },
  {
    id: "5",
    date: "2025-11-18",
    subject: "Kapıcı Dairesi Tadilat",
    text: "Kapıcı dairesinin tadilatı teklifi reddedilmiştir. Yeniden değerlendirilmek üzere ertelenmiştir.",
    kabul: 1,
    ret: 3,
    cekimser: 1,
    status: "iptal",
  },
];

const MEMBER_KEY = (id: string) => `sitecore_committee_members_${id}`;
const DECISION_KEY = (id: string) => `sitecore_committee_decisions_${id}`;

const ROLE_COLORS: Record<string, string> = {
  Başkan: "bg-[#0B1B2E] text-white",
  Sekreter: "bg-blue-100 text-blue-700",
  Üye: "bg-gray-100 text-gray-700",
  Denetçi: "bg-purple-100 text-purple-700",
};

export default function CommitteeManagement({
  buildingId,
  isOwner,
  t: _t,
}: Props) {
  const loadMembers = (): CommitteeMember[] => {
    try {
      const d = localStorage.getItem(MEMBER_KEY(buildingId));
      return d ? JSON.parse(d) : DEFAULT_MEMBERS;
    } catch {
      return DEFAULT_MEMBERS;
    }
  };
  const loadDecisions = (): Decision[] => {
    try {
      const d = localStorage.getItem(DECISION_KEY(buildingId));
      return d ? JSON.parse(d) : DEFAULT_DECISIONS;
    } catch {
      return DEFAULT_DECISIONS;
    }
  };

  const [members, setMembers] = useState<CommitteeMember[]>(loadMembers);
  const [decisions, setDecisions] = useState<Decision[]>(loadDecisions);
  const [search, setSearch] = useState("");
  const [showMemberDialog, setShowMemberDialog] = useState(false);
  const [showDecisionDialog, setShowDecisionDialog] = useState(false);
  const [memberForm, setMemberForm] = useState({
    name: "",
    role: "Üye" as CommitteeMember["role"],
    phone: "",
    termStart: "",
    termEnd: "",
    apartment: "",
  });
  const [decisionForm, setDecisionForm] = useState({
    subject: "",
    text: "",
    kabul: 0,
    ret: 0,
    cekimser: 0,
  });

  const saveMembers = (data: CommitteeMember[]) => {
    setMembers(data);
    localStorage.setItem(MEMBER_KEY(buildingId), JSON.stringify(data));
  };
  const saveDecisions = (data: Decision[]) => {
    setDecisions(data);
    localStorage.setItem(DECISION_KEY(buildingId), JSON.stringify(data));
  };

  const addMember = () => {
    if (!memberForm.name.trim()) return;
    const newMember: CommitteeMember = {
      id: Date.now().toString(),
      ...memberForm,
    };
    saveMembers([...members, newMember]);
    setShowMemberDialog(false);
    setMemberForm({
      name: "",
      role: "Üye",
      phone: "",
      termStart: "",
      termEnd: "",
      apartment: "",
    });
  };

  const addDecision = () => {
    if (!decisionForm.subject.trim()) return;
    const newDecision: Decision = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      status: "yürürlükte",
      ...decisionForm,
    };
    saveDecisions([newDecision, ...decisions]);
    setShowDecisionDialog(false);
    setDecisionForm({ subject: "", text: "", kabul: 0, ret: 0, cekimser: 0 });
  };

  const filteredDecisions = decisions.filter(
    (d) =>
      d.subject.toLowerCase().includes(search.toLowerCase()) ||
      d.text.toLowerCase().includes(search.toLowerCase()),
  );

  const totalVotes = (d: Decision) => d.kabul + d.ret + d.cekimser;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0E1116]">
            Komite & Kurul Yönetimi
          </h2>
          <p className="text-sm text-[#6B7A8D] mt-0.5">
            Yönetim kurulu üyeleri ve alınan kararlar
          </p>
        </div>
      </div>

      <Tabs defaultValue="uyeler">
        <TabsList className="bg-[#F3F6FB] rounded-xl">
          <TabsTrigger value="uyeler" data-ocid="committee.tab">
            Üyeler
          </TabsTrigger>
          <TabsTrigger value="kararlar" data-ocid="committee.tab">
            Kararlar
          </TabsTrigger>
          <TabsTrigger value="belgeler" data-ocid="committee.tab">
            Belgeler
          </TabsTrigger>
        </TabsList>

        {/* Üyeler */}
        <TabsContent value="uyeler" className="mt-4">
          {isOwner && (
            <div className="flex justify-end mb-4">
              <Button
                onClick={() => setShowMemberDialog(true)}
                className="bg-[#0B1B2E] text-white rounded-full gap-2"
                data-ocid="committee.primary_button"
              >
                <Plus className="w-4 h-4" /> Üye Ekle
              </Button>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {members.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F3F6FB] flex items-center justify-center">
                      <Users className="w-5 h-5 text-[#0B1B2E]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0E1116]">{m.name}</p>
                      <p className="text-xs text-[#6B7A8D]">
                        Daire: {m.apartment} · {m.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${ROLE_COLORS[m.role]} border-0 text-xs`}
                    >
                      {m.role}
                    </Badge>
                    {isOwner && (
                      <button
                        type="button"
                        onClick={() =>
                          saveMembers(members.filter((x) => x.id !== m.id))
                        }
                        className="text-[#6B7A8D] hover:text-red-500 transition-colors"
                        data-ocid="committee.delete_button"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-[#F3F6FB] flex gap-4 text-xs text-[#6B7A8D]">
                  <span>Dönem Başı: {m.termStart}</span>
                  <span>Dönem Sonu: {m.termEnd}</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Kararlar */}
        <TabsContent value="kararlar" className="mt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A8D]" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Karar veya konu ara..."
                className="pl-9 rounded-full border-[#E5EAF2]"
                data-ocid="committee.search_input"
              />
            </div>
            {isOwner && (
              <Button
                onClick={() => setShowDecisionDialog(true)}
                className="bg-[#0B1B2E] text-white rounded-full gap-2 flex-shrink-0"
                data-ocid="committee.secondary_button"
              >
                <Plus className="w-4 h-4" /> Karar Ekle
              </Button>
            )}
          </div>
          <div className="space-y-4">
            {filteredDecisions.length === 0 ? (
              <div
                className="text-center py-12"
                data-ocid="committee.empty_state"
              >
                <FileText className="w-12 h-12 text-[#D7DEE9] mx-auto mb-3" />
                <p className="text-[#6B7A8D] font-medium">Karar bulunamadı</p>
              </div>
            ) : (
              filteredDecisions.map((d, i) => (
                <div
                  key={d.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] hover:shadow-md transition-shadow"
                  data-ocid={`committee.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-[#0E1116]">
                        {d.subject}
                      </h4>
                      <p className="text-xs text-[#6B7A8D] mt-0.5">{d.date}</p>
                    </div>
                    <Badge
                      className={`${d.status === "yürürlükte" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"} border-0`}
                    >
                      {d.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-[#3A4654] mb-4">{d.text}</p>
                  <div className="flex gap-4 pt-3 border-t border-[#F3F6FB]">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-semibold text-green-600">
                        {d.kabul} Kabul
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-semibold text-red-600">
                        {d.ret} Ret
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MinusCircle className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-semibold text-gray-500">
                        {d.cekimser} Çekimser
                      </span>
                    </div>
                    <span className="ml-auto text-xs text-[#6B7A8D]">
                      Toplam: {totalVotes(d)} oy
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {/* Belgeler */}
        <TabsContent value="belgeler" className="mt-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#0E1116]">Kurul Belgeleri</h3>
              {isOwner && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-full"
                  data-ocid="committee.upload_button"
                >
                  <Plus className="w-4 h-4" /> Belge Yükle
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {[
                {
                  name: "Yönetim Planı 2025.pdf",
                  date: "2025-01-15",
                  size: "2.4 MB",
                },
                {
                  name: "Olağan Kurul Toplantı Tutanağı - Mart 2026.pdf",
                  date: "2026-03-15",
                  size: "850 KB",
                },
                {
                  name: "Bütçe Raporu 2025.xlsx",
                  date: "2026-01-05",
                  size: "1.2 MB",
                },
                {
                  name: "Denetim Raporu Q1 2026.pdf",
                  date: "2026-04-01",
                  size: "1.8 MB",
                },
              ].map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#4A90D9]" />
                    <div>
                      <p className="text-sm font-medium text-[#0E1116]">
                        {doc.name}
                      </p>
                      <p className="text-xs text-[#6B7A8D]">
                        {doc.date} · {doc.size}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#4A90D9] text-xs"
                  >
                    İndir
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Member Dialog */}
      <Dialog open={showMemberDialog} onOpenChange={setShowMemberDialog}>
        <DialogContent className="max-w-md" data-ocid="committee.dialog">
          <DialogHeader>
            <DialogTitle>Yeni Kurul Üyesi</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Ad Soyad
              </p>
              <Input
                value={memberForm.name}
                onChange={(e) =>
                  setMemberForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Üye adı"
                data-ocid="committee.input"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Görev
              </p>
              <select
                value={memberForm.role}
                onChange={(e) =>
                  setMemberForm((p) => ({
                    ...p,
                    role: e.target.value as CommitteeMember["role"],
                  }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                data-ocid="committee.select"
              >
                {["Başkan", "Sekreter", "Üye", "Denetçi"].map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Telefon
              </p>
              <Input
                value={memberForm.phone}
                onChange={(e) =>
                  setMemberForm((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="0532 xxx xx xx"
                data-ocid="committee.input"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Daire
              </p>
              <Input
                value={memberForm.apartment}
                onChange={(e) =>
                  setMemberForm((p) => ({ ...p, apartment: e.target.value }))
                }
                placeholder="A-15"
                data-ocid="committee.input"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  Dönem Başı
                </p>
                <Input
                  type="date"
                  value={memberForm.termStart}
                  onChange={(e) =>
                    setMemberForm((p) => ({ ...p, termStart: e.target.value }))
                  }
                  data-ocid="committee.input"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  Dönem Sonu
                </p>
                <Input
                  type="date"
                  value={memberForm.termEnd}
                  onChange={(e) =>
                    setMemberForm((p) => ({ ...p, termEnd: e.target.value }))
                  }
                  data-ocid="committee.input"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                onClick={addMember}
                className="flex-1 bg-[#0B1B2E] text-white rounded-full"
                data-ocid="committee.submit_button"
              >
                Ekle
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowMemberDialog(false)}
                className="flex-1 rounded-full"
                data-ocid="committee.cancel_button"
              >
                İptal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Decision Dialog */}
      <Dialog open={showDecisionDialog} onOpenChange={setShowDecisionDialog}>
        <DialogContent className="max-w-md" data-ocid="committee.dialog">
          <DialogHeader>
            <DialogTitle>Yeni Karar Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Konu
              </p>
              <Input
                value={decisionForm.subject}
                onChange={(e) =>
                  setDecisionForm((p) => ({ ...p, subject: e.target.value }))
                }
                placeholder="Karar konusu"
                data-ocid="committee.input"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Karar Metni
              </p>
              <textarea
                value={decisionForm.text}
                onChange={(e) =>
                  setDecisionForm((p) => ({ ...p, text: e.target.value }))
                }
                placeholder="Karar detayı..."
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm min-h-[80px] resize-none"
                data-ocid="committee.textarea"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-sm font-medium text-green-700 block mb-1">
                  Kabul
                </p>
                <Input
                  type="number"
                  min={0}
                  value={decisionForm.kabul}
                  onChange={(e) =>
                    setDecisionForm((p) => ({ ...p, kabul: +e.target.value }))
                  }
                  data-ocid="committee.input"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-red-600 block mb-1">
                  Ret
                </p>
                <Input
                  type="number"
                  min={0}
                  value={decisionForm.ret}
                  onChange={(e) =>
                    setDecisionForm((p) => ({ ...p, ret: +e.target.value }))
                  }
                  data-ocid="committee.input"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 block mb-1">
                  Çekimser
                </p>
                <Input
                  type="number"
                  min={0}
                  value={decisionForm.cekimser}
                  onChange={(e) =>
                    setDecisionForm((p) => ({
                      ...p,
                      cekimser: +e.target.value,
                    }))
                  }
                  data-ocid="committee.input"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                onClick={addDecision}
                className="flex-1 bg-[#0B1B2E] text-white rounded-full"
                data-ocid="committee.submit_button"
              >
                Ekle
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDecisionDialog(false)}
                className="flex-1 rounded-full"
                data-ocid="committee.cancel_button"
              >
                İptal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
