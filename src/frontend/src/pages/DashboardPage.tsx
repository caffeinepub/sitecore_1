import { Building2, Globe, LogOut, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useAuth } from "../context/AuthContext";
import { useActor } from "../hooks/useActor";
import { useTranslation } from "../hooks/useTranslation";
import { LANGUAGES } from "../i18n";
import type { BackendActor, Building } from "../types";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { actor } = useActor();
  const { userId, user, logout, language, setLanguage } = useAuth();
  const { t } = useTranslation();
  const backend = actor as unknown as BackendActor;

  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [buildingName, setBuildingName] = useState("");
  const [address, setAddress] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    loadBuildings();
  }, [userId, actor]);

  const loadBuildings = async () => {
    if (!backend || !userId) return;
    setLoading(true);
    try {
      const result = await backend.getBuildingsForUser(userId);
      setBuildings(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBuilding = async () => {
    if (!backend || !userId || !buildingName.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const result = await backend.createBuilding(
        userId,
        buildingName.trim(),
        address.trim(),
      );
      if ("ok" in result) {
        await loadBuildings();
        setShowAddModal(false);
        setBuildingName("");
        setAddress("");
      } else {
        setError(result.err);
      }
    } catch (e) {
      setError(String(e));
    }
    setSubmitting(false);
  };

  const handleJoinBuilding = async () => {
    if (!backend || !userId || !inviteCode.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      // biome-ignore lint/correctness/useHookAtTopLevel: not a React hook
      const result = await backend.useInviteCode(
        userId,
        inviteCode.trim().toUpperCase(),
      );
      if ("ok" in result) {
        await loadBuildings();
        setShowAddModal(false);
        setInviteCode("");
      } else {
        setError(result.err);
      }
    } catch (e) {
      setError(String(e));
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#F3F6FB]">
      {/* Header */}
      <header className="bg-[#0B1B2E] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0"
            onClick={() => navigate("/")}
          >
            <Building2 className="text-white w-6 h-6" />
            <span className="text-white font-bold text-lg">SITECORE</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-white/70 text-sm">{user?.displayName}</span>
            <div className="flex items-center gap-1 text-white/70">
              <Globe className="w-4 h-4" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-white/70 text-sm border-none cursor-pointer"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.code.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <Button
              onClick={logout}
              size="sm"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 rounded-full gap-1"
            >
              <LogOut className="w-4 h-4" />
              {t.logout}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#0E1116]">{t.myBuildings}</h1>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2"
          >
            <Plus className="w-4 h-4" />
            {t.addBuilding}
          </Button>
        </div>

        {loading ? (
          <p className="text-[#3A4654]">{t.loading}</p>
        ) : buildings.length === 0 ? (
          <div className="text-center py-20">
            <Building2 className="w-16 h-16 text-[#D7DEE9] mx-auto mb-4" />
            <p className="text-[#3A4654] text-lg mb-2">{t.noBuildings}</p>
            <p className="text-[#3A4654]/60 text-sm mb-6">{t.createOrJoin}</p>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
            >
              {t.addBuilding}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {buildings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl p-6 shadow-md border border-[#E5EAF2] hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-[#F1F4F8] p-3 rounded-xl">
                    <Building2 className="w-6 h-6 text-[#4A90D9]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#0E1116] truncate">
                      {b.name}
                    </h3>
                    <p className="text-sm text-[#3A4654] truncate">
                      {b.address}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => navigate(`/building/${b.id}`)}
                  className="w-full bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full"
                >
                  {t.goToPanel}
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Building Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t.addBuilding}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="create">
            <TabsList className="w-full">
              <TabsTrigger value="create" className="flex-1">
                {t.createBuilding}
              </TabsTrigger>
              <TabsTrigger value="join" className="flex-1">
                {t.joinBuilding}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="create" className="space-y-4 pt-4">
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  {t.buildingName}
                </p>
                <Input
                  value={buildingName}
                  onChange={(e) => setBuildingName(e.target.value)}
                  placeholder={t.buildingName}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  {t.address}
                </p>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t.address}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button
                onClick={handleCreateBuilding}
                disabled={submitting || !buildingName.trim()}
                className="w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
              >
                {submitting ? t.loading : t.create}
              </Button>
            </TabsContent>
            <TabsContent value="join" className="space-y-4 pt-4">
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  {t.inviteCode}
                </p>
                <Input
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  placeholder={t.inviteCodePlaceholder}
                  maxLength={8}
                  className="font-mono tracking-widest text-center"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button
                onClick={handleJoinBuilding}
                disabled={submitting || !inviteCode.trim()}
                className="w-full bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full"
              >
                {submitting ? t.loading : t.join}
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
