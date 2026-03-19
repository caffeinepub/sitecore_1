import {
  ArrowLeft,
  BarChart2,
  Bell,
  Building2,
  Calendar,
  Check,
  Copy,
  CreditCard,
  FileText,
  Home,
  MapPin,
  Megaphone,
  Receipt,
  Settings,
  User,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { useAuth } from "../context/AuthContext";
import { useActor } from "../hooks/useActor";
import { useTranslation } from "../hooks/useTranslation";
import type {
  Announcement,
  BackendActor,
  Building,
  MaintenanceRequest,
  Role,
  UserWithRoles,
} from "../types";
import ApartmentManagement from "./ApartmentManagement";
import BuildingSettings from "./BuildingSettings";
import CommonAreaReservation from "./CommonAreaReservation";
import DocumentManagement from "./DocumentManagement";
import DuesTracking from "./DuesTracking";
import ExpenseTracking from "./ExpenseTracking";
import MeetingManagement from "./MeetingManagement";
import NotificationCenter from "./NotificationCenter";
import ProfileSettings from "./ProfileSettings";
import SurveyManagement from "./SurveyManagement";
import VisitorManagement from "./VisitorManagement";

export default function BuildingPanel() {
  const { id: buildingId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { actor } = useActor();
  const { userId } = useAuth();
  const { t } = useTranslation();
  const backend = actor as unknown as BackendActor;

  const [building, setBuilding] = useState<Building | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [myRoleIds, setMyRoleIds] = useState<string[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [maintenance, setMaintenance] = useState<MaintenanceRequest[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  // Invite code state
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedRoleForInvite, setSelectedRoleForInvite] = useState("");
  const [generatedInvite, setGeneratedInvite] = useState("");
  const [copiedInvite, setCopiedInvite] = useState(false);

  // Add user state
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserId, setNewUserId] = useState("");
  const [newUserRoleId, setNewUserRoleId] = useState("");

  // Add role state
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);

  // Announcement state
  const [showAnnModal, setShowAnnModal] = useState(false);
  const [annTitle, setAnnTitle] = useState("");
  const [annContent, setAnnContent] = useState("");

  // Maintenance state
  const [showMaintModal, setShowMaintModal] = useState(false);
  const [maintTitle, setMaintTitle] = useState("");
  const [maintDesc, setMaintDesc] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isOwner = building?.ownerUserId === userId;

  const hasPermission = (perm: string): boolean => {
    if (isOwner) return true;
    return myRoleIds.some((rid) => {
      const role = roles.find((r) => r.id === rid);
      return (
        role?.permissions.includes(perm) || role?.permissions.includes("admin")
      );
    });
  };

  const PERMISSIONS = [
    { key: "manage_users", label: t.permManageUsers },
    { key: "manage_announcements", label: t.permManageAnnouncements },
    { key: "manage_maintenance", label: t.permManageMaintenance },
    { key: "view_announcements", label: t.permViewAnnouncements },
    { key: "create_maintenance", label: t.permCreateMaintenance },
    { key: "view_maintenance", label: t.permViewMaintenance },
    { key: "update_maintenance", label: t.permUpdateMaintenance },
    { key: "admin", label: t.permAdmin },
  ];

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    if (!buildingId) return;
    loadAll();
  }, [userId, buildingId, actor]);

  const loadAll = async () => {
    if (!backend || !buildingId || !userId) return;
    setLoading(true);
    try {
      const [bResult, rolesResult, myRoles] = await Promise.all([
        backend.getBuildingById(buildingId),
        backend.getRolesForBuilding(buildingId),
        backend.getUserRolesInBuilding(userId, buildingId),
      ]);
      if ("ok" in bResult) setBuilding(bResult.ok);
      setRoles(rolesResult);
      setMyRoleIds(myRoles);

      // Load users if permitted
      if (
        "ok" in bResult &&
        (bResult.ok.ownerUserId === userId || myRoles.length > 0)
      ) {
        try {
          const usersResult = await backend.getUsersInBuilding(
            userId,
            buildingId,
          );
          if ("ok" in usersResult) setUsers(usersResult.ok);
        } catch {}
        try {
          const annResult = await backend.getAnnouncementsForBuilding(
            userId,
            buildingId,
          );
          if ("ok" in annResult) setAnnouncements(annResult.ok);
        } catch {}
        try {
          const maintResult = await backend.getMaintenanceRequestsForBuilding(
            userId,
            buildingId,
          );
          if ("ok" in maintResult) setMaintenance(maintResult.ok);
        } catch {}
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateInvite = async () => {
    if (!backend || !userId || !buildingId || !selectedRoleForInvite) return;
    setSubmitting(true);
    try {
      const result = await backend.generateInviteCode(
        userId,
        buildingId,
        selectedRoleForInvite,
      );
      if ("ok" in result) setGeneratedInvite(result.ok);
    } catch {}
    setSubmitting(false);
  };

  const handleAddUser = async () => {
    if (!backend || !userId || !buildingId || !newUserId || !newUserRoleId)
      return;
    setSubmitting(true);
    setError("");
    try {
      const result = await backend.addUserToBuilding(
        userId,
        buildingId,
        newUserId,
        [newUserRoleId],
      );
      if ("ok" in result) {
        await loadAll();
        setShowAddUserModal(false);
        setNewUserId("");
        setNewUserRoleId("");
      } else setError(result.err);
    } catch (e) {
      setError(String(e));
    }
    setSubmitting(false);
  };

  const handleRemoveUser = async (targetUserId: string) => {
    if (!backend || !userId || !buildingId) return;
    try {
      await backend.removeUserFromBuilding(userId, buildingId, targetUserId);
      await loadAll();
    } catch {}
  };

  const handleCreateRole = async () => {
    if (!backend || !userId || !buildingId || !newRoleName.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const result = await backend.createRole(
        userId,
        buildingId,
        newRoleName.trim(),
        selectedPerms,
      );
      if ("ok" in result) {
        await loadAll();
        setShowAddRoleModal(false);
        setNewRoleName("");
        setSelectedPerms([]);
      } else setError(result.err);
    } catch (e) {
      setError(String(e));
    }
    setSubmitting(false);
  };

  const handleDeleteRole = async (roleId: string) => {
    if (!backend || !userId || !buildingId) return;
    try {
      await backend.deleteRole(userId, buildingId, roleId);
      await loadAll();
    } catch {}
  };

  const handleCreateAnnouncement = async () => {
    if (!backend || !userId || !buildingId || !annTitle.trim()) return;
    setSubmitting(true);
    try {
      const result = await backend.createAnnouncement(
        userId,
        buildingId,
        annTitle.trim(),
        annContent.trim(),
      );
      if ("ok" in result) {
        await loadAll();
        setShowAnnModal(false);
        setAnnTitle("");
        setAnnContent("");
      }
    } catch {}
    setSubmitting(false);
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!backend || !userId || !buildingId) return;
    try {
      await backend.deleteAnnouncement(userId, buildingId, id);
      await loadAll();
    } catch {}
  };

  const handleCreateMaintenance = async () => {
    if (!backend || !userId || !buildingId || !maintTitle.trim()) return;
    setSubmitting(true);
    try {
      const result = await backend.createMaintenanceRequest(
        userId,
        buildingId,
        maintTitle.trim(),
        maintDesc.trim(),
      );
      if ("ok" in result) {
        await loadAll();
        setShowMaintModal(false);
        setMaintTitle("");
        setMaintDesc("");
      }
    } catch {}
    setSubmitting(false);
  };

  const handleUpdateMaintenanceStatus = async (
    requestId: string,
    status: "pending" | "inProgress" | "resolved",
  ) => {
    if (!backend || !userId || !buildingId) return;
    const statusObj =
      status === "pending"
        ? { pending: null }
        : status === "inProgress"
          ? { inProgress: null }
          : { resolved: null };
    try {
      await backend.updateMaintenanceStatus(
        userId,
        buildingId,
        requestId,
        statusObj,
        [],
      );
      await loadAll();
    } catch {}
  };

  const getStatusBadge = (status: MaintenanceRequest["status"]) => {
    if ("pending" in status)
      return (
        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
          {t.pending}
        </Badge>
      );
    if ("inProgress" in status)
      return (
        <Badge className="bg-blue-100 text-blue-700 border-blue-200">
          {t.inProgress}
        </Badge>
      );
    return (
      <Badge className="bg-green-100 text-green-700 border-green-200">
        {t.resolved}
      </Badge>
    );
  };

  const tabs = [
    { key: "overview", label: t.overview, icon: Building2, show: true },
    {
      key: "users",
      label: t.userManagement,
      icon: Users,
      show: isOwner || hasPermission("manage_users"),
    },
    { key: "roles", label: t.roleManagement, icon: Settings, show: isOwner },
    {
      key: "announcements",
      label: t.announcements,
      icon: Megaphone,
      show:
        hasPermission("view_announcements") ||
        hasPermission("manage_announcements"),
    },
    {
      key: "maintenance",
      label: t.maintenance,
      icon: Wrench,
      show:
        hasPermission("view_maintenance") ||
        hasPermission("create_maintenance") ||
        hasPermission("manage_maintenance"),
    },
    {
      key: "apartments",
      label: t.apartments,
      icon: Home,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "dues",
      label: t.dues,
      icon: CreditCard,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "visitors",
      label: t.visitors,
      icon: UserCheck,
      show: true,
    },
    {
      key: "expenses",
      label: t.expenses,
      icon: Receipt,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "surveys",
      label: t.surveys,
      icon: BarChart2,
      show: true,
    },
    {
      key: "buildingSettings",
      label: t.buildingSettings,
      icon: Settings,
      show: isOwner,
    },
    { key: "profile", label: t.profileSettings, icon: User, show: true },
    { key: "documents", label: t.documents, icon: FileText, show: true },
    {
      key: "meetings",
      label: t.meetings || "Toplantılar",
      icon: Calendar,
      show: true,
    },
    {
      key: "commonAreas",
      label: t.commonAreas || "Ortak Alanlar",
      icon: MapPin,
      show: true,
    },
    {
      key: "notifications",
      label: t.notifications || "Bildirimler",
      icon: Bell,
      show: true,
    },
  ].filter((tab) => tab.show);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3F6FB] flex items-center justify-center">
        <p className="text-[#3A4654]">{t.loading}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F6FB]">
      {/* Header */}
      <header className="bg-[#0B1B2E] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Building2 className="text-white w-6 h-6" />
            <div>
              <span className="text-white font-bold">{building?.name}</span>
              <span className="text-white/40 text-sm ml-2">
                {building?.address}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isOwner && (
              <Badge className="bg-[#F2A23A] text-white border-0">
                {t.buildingOwner}
              </Badge>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
        {/* Sidebar */}
        <aside className="w-56 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-[#0B1B2E] text-white"
                    : "text-[#3A4654] hover:bg-white hover:text-[#0E1116]"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          {/* Overview */}
          {activeTab === "overview" && (
            <div>
              <h2 className="text-xl font-bold text-[#0E1116] mb-6">
                {t.overview}
              </h2>
              {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
              {(() => {
                const apts = (() => {
                  try {
                    return JSON.parse(
                      localStorage.getItem(
                        `sitecore_apartments_${buildingId}`,
                      ) || "[]",
                    );
                  } catch {
                    return [];
                  }
                })();
                const survs = (() => {
                  try {
                    return JSON.parse(
                      localStorage.getItem(`sitecore_surveys_${buildingId}`) ||
                        "[]",
                    );
                  } catch {
                    return [];
                  }
                })();
                const activeSurveys = survs.filter(
                  (s: any) => s.isActive,
                ).length;
                return (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2]">
                      <p className="text-3xl font-bold text-[#0B1B2E]">
                        {users.length}
                      </p>
                      <p className="text-[#3A4654] text-sm mt-1">
                        {t.totalUsers}
                      </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2]">
                      <p className="text-3xl font-bold text-[#4A90D9]">
                        {announcements.length}
                      </p>
                      <p className="text-[#3A4654] text-sm mt-1">
                        {t.totalAnnouncements}
                      </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2]">
                      <p className="text-3xl font-bold text-[#F2A23A]">
                        {maintenance.length}
                      </p>
                      <p className="text-[#3A4654] text-sm mt-1">
                        {t.totalMaintenance}
                      </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2]">
                      <p className="text-3xl font-bold text-green-600">
                        {apts.length}
                      </p>
                      <p className="text-[#3A4654] text-sm mt-1">
                        {t.totalApartments}
                      </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2]">
                      <p className="text-3xl font-bold text-purple-600">
                        {activeSurveys}
                      </p>
                      <p className="text-[#3A4654] text-sm mt-1">
                        {t.activeSurveys}
                      </p>
                    </div>
                  </div>
                );
              })()}
              {myRoleIds.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2]">
                  <h3 className="font-semibold text-[#0E1116] mb-3">
                    {t.yourRole}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {myRoleIds.map((rid) => {
                      const role = roles.find((r) => r.id === rid);
                      return role ? (
                        <Badge
                          key={rid}
                          className="bg-[#F1F4F8] text-[#0E1116] border-[#E5EAF2]"
                        >
                          {role.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User Management */}
          {activeTab === "users" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#0E1116]">
                  {t.userManagement}
                </h2>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowInviteModal(true)}
                    variant="outline"
                    className="rounded-full border-[#D7DEE9] gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    {t.generateInvite}
                  </Button>
                  <Button
                    onClick={() => setShowAddUserModal(true)}
                    className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
                  >
                    {t.addUser}
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                {users.map(({ user, roleIds }) => (
                  <div
                    key={user.id}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-[#0E1116]">
                        {user.displayName}
                      </p>
                      <p className="text-xs text-[#3A4654] font-mono mt-0.5">
                        {user.id}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {roleIds.map((rid) => {
                          const role = roles.find((r) => r.id === rid);
                          return role ? (
                            <Badge
                              key={rid}
                              className="bg-[#F1F4F8] text-xs text-[#0E1116]"
                            >
                              {role.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                    {user.id !== userId && (
                      <Button
                        onClick={() => handleRemoveUser(user.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-500 border-red-200 hover:bg-red-50 rounded-full"
                      >
                        {t.removeUser}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Role Management */}
          {activeTab === "roles" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#0E1116]">
                  {t.roleManagement}
                </h2>
                <Button
                  onClick={() => setShowAddRoleModal(true)}
                  className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
                >
                  {t.addRole}
                </Button>
              </div>
              <div className="space-y-3">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#0E1116]">
                          {role.name}
                        </span>
                        {role.isDefault && (
                          <Badge className="bg-[#F1F4F8] text-[#3A4654] text-xs">
                            {t.defaultRole}
                          </Badge>
                        )}
                      </div>
                      {!role.isDefault && (
                        <Button
                          onClick={() => handleDeleteRole(role.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-500 border-red-200 hover:bg-red-50 rounded-full text-xs"
                        >
                          {t.deleteRole}
                        </Button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((p) => {
                        const perm = PERMISSIONS.find((x) => x.key === p);
                        return (
                          <Badge
                            key={p}
                            className="bg-[#EEF3FA] text-[#4A90D9] border-0 text-xs"
                          >
                            {perm?.label || p}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Announcements */}
          {activeTab === "announcements" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#0E1116]">
                  {t.announcements}
                </h2>
                {hasPermission("manage_announcements") && (
                  <Button
                    onClick={() => setShowAnnModal(true)}
                    className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
                  >
                    {t.newAnnouncement}
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                {announcements.length === 0 && (
                  <p className="text-[#3A4654] text-center py-8">
                    Duyuru bulunmuyor.
                  </p>
                )}
                {announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-[#0E1116] mb-2">
                          {ann.title}
                        </h3>
                        <p className="text-[#3A4654] text-sm leading-relaxed">
                          {ann.content}
                        </p>
                        <p className="text-[#3A4654]/40 text-xs mt-2">
                          {new Date(
                            Number(ann.createdAt) / 1_000_000,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      {hasPermission("manage_announcements") && (
                        <Button
                          onClick={() => handleDeleteAnnouncement(ann.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-600 ml-2"
                        >
                          {t.delete}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Maintenance */}
          {activeTab === "maintenance" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#0E1116]">
                  {t.maintenance}
                </h2>
                {(hasPermission("create_maintenance") ||
                  hasPermission("manage_maintenance")) && (
                  <Button
                    onClick={() => setShowMaintModal(true)}
                    className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
                  >
                    {t.newRequest}
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                {maintenance.length === 0 && (
                  <p className="text-[#3A4654] text-center py-8">
                    Talep bulunmuyor.
                  </p>
                )}
                {maintenance.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-[#0E1116]">
                          {req.title}
                        </h3>
                        <p className="text-[#3A4654] text-sm mt-1">
                          {req.description}
                        </p>
                      </div>
                      {getStatusBadge(req.status)}
                    </div>
                    {(hasPermission("update_maintenance") ||
                      hasPermission("manage_maintenance")) &&
                      !("resolved" in req.status) && (
                        <div className="flex gap-2 mt-3">
                          {"pending" in req.status && (
                            <Button
                              onClick={() =>
                                handleUpdateMaintenanceStatus(
                                  req.id,
                                  "inProgress",
                                )
                              }
                              size="sm"
                              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full text-xs"
                            >
                              {t.inProgress}
                            </Button>
                          )}
                          {"inProgress" in req.status && (
                            <Button
                              onClick={() =>
                                handleUpdateMaintenanceStatus(
                                  req.id,
                                  "resolved",
                                )
                              }
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 text-white rounded-full text-xs"
                            >
                              {t.resolved}
                            </Button>
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Apartments */}
          {activeTab === "apartments" && buildingId && (
            <ApartmentManagement
              buildingId={buildingId}
              userId={userId || ""}
              isOwner={isOwner}
              t={t}
            />
          )}

          {/* Dues */}
          {activeTab === "dues" && buildingId && (
            <DuesTracking
              buildingId={buildingId}
              userId={userId || ""}
              isOwner={isOwner}
              t={t}
            />
          )}

          {/* Visitors */}
          {activeTab === "visitors" && buildingId && (
            <VisitorManagement
              buildingId={buildingId}
              userId={userId || ""}
              isOwner={isOwner}
              t={t}
            />
          )}

          {/* Expenses */}
          {activeTab === "expenses" && buildingId && (
            <ExpenseTracking
              buildingId={buildingId}
              userId={userId || ""}
              isOwner={isOwner}
              t={t}
            />
          )}

          {/* Surveys */}
          {activeTab === "surveys" && buildingId && (
            <SurveyManagement
              buildingId={buildingId}
              userId={userId || ""}
              isOwner={isOwner}
              t={t}
            />
          )}

          {/* Building Settings */}
          {activeTab === "buildingSettings" && buildingId && (
            <BuildingSettings
              buildingId={buildingId}
              userId={userId || ""}
              isOwner={isOwner}
              t={t}
              building={building}
            />
          )}

          {/* Profile Settings */}
          {activeTab === "profile" && (
            <ProfileSettings userId={userId || ""} t={t} />
          )}

          {/* Documents */}
          {activeTab === "documents" && buildingId && (
            <DocumentManagement
              buildingId={buildingId}
              userId={userId || ""}
              isOwner={isOwner}
              t={t}
            />
          )}
          {activeTab === "meetings" && buildingId && userId && (
            <MeetingManagement
              userId={userId}
              isOwnerOrManager={isOwner || hasPermission("manage_users")}
            />
          )}
          {activeTab === "commonAreas" && buildingId && userId && (
            <CommonAreaReservation
              userId={userId}
              isOwnerOrManager={isOwner || hasPermission("manage_users")}
            />
          )}
          {activeTab === "notifications" && buildingId && userId && (
            <NotificationCenter
              userId={userId}
              isOwnerOrManager={
                isOwner || hasPermission("manage_announcements")
              }
            />
          )}
        </main>
      </div>

      {/* Invite Code Modal */}
      <Dialog
        open={showInviteModal}
        onOpenChange={() => {
          setShowInviteModal(false);
          setGeneratedInvite("");
          setSelectedRoleForInvite("");
        }}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t.generateInvite}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.selectRole}
              </p>
              <select
                value={selectedRoleForInvite}
                onChange={(e) => setSelectedRoleForInvite(e.target.value)}
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]"
              >
                <option value="">{t.selectRole}...</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
            <Button
              onClick={handleGenerateInvite}
              disabled={submitting || !selectedRoleForInvite}
              className="w-full bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full"
            >
              {submitting ? t.loading : t.generateInvite}
            </Button>
            {generatedInvite && (
              <div className="bg-[#F1F4F8] rounded-xl p-4 text-center">
                <p className="text-sm text-[#3A4654] mb-2">{t.generatedCode}</p>
                <p className="font-mono text-2xl font-bold text-[#0B1B2E] tracking-widest mb-3">
                  {generatedInvite}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 rounded-full"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedInvite);
                    setCopiedInvite(true);
                    setTimeout(() => setCopiedInvite(false), 2000);
                  }}
                >
                  {copiedInvite ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copiedInvite ? t.copied : t.copyCode}
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add User Modal */}
      <Dialog open={showAddUserModal} onOpenChange={setShowAddUserModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t.addUser}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.userId}
              </p>
              <Input
                value={newUserId}
                onChange={(e) => setNewUserId(e.target.value)}
                placeholder="User ID"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.selectRole}
              </p>
              <select
                value={newUserRoleId}
                onChange={(e) => setNewUserRoleId(e.target.value)}
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
              >
                <option value="">{t.selectRole}...</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              onClick={handleAddUser}
              disabled={submitting || !newUserId || !newUserRoleId}
              className="w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
            >
              {submitting ? t.loading : t.addUser}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Role Modal */}
      <Dialog open={showAddRoleModal} onOpenChange={setShowAddRoleModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t.addRole}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.roleName}
              </p>
              <Input
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                placeholder={t.roleName}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-2">
                {t.permissions}
              </p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {PERMISSIONS.map((p) => (
                  <label
                    key={p.key}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPerms.includes(p.key)}
                      onChange={(e) =>
                        setSelectedPerms((prev) =>
                          e.target.checked
                            ? [...prev, p.key]
                            : prev.filter((x) => x !== p.key),
                        )
                      }
                      className="rounded"
                    />
                    <span className="text-sm text-[#0E1116]">{p.label}</span>
                  </label>
                ))}
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              onClick={handleCreateRole}
              disabled={submitting || !newRoleName.trim()}
              className="w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
            >
              {submitting ? t.loading : t.create}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Announcement Modal */}
      <Dialog open={showAnnModal} onOpenChange={setShowAnnModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t.newAnnouncement}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium block mb-1">{t.title}</p>
              <Input
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                placeholder={t.title}
              />
            </div>
            <div>
              <p className="text-sm font-medium block mb-1">{t.content}</p>
              <textarea
                value={annContent}
                onChange={(e) => setAnnContent(e.target.value)}
                placeholder={t.content}
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm min-h-[100px] resize-none"
              />
            </div>
            <Button
              onClick={handleCreateAnnouncement}
              disabled={submitting || !annTitle.trim()}
              className="w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
            >
              {submitting ? t.loading : t.publish}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Maintenance Modal */}
      <Dialog open={showMaintModal} onOpenChange={setShowMaintModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t.newRequest}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium block mb-1">{t.title}</p>
              <Input
                value={maintTitle}
                onChange={(e) => setMaintTitle(e.target.value)}
                placeholder={t.title}
              />
            </div>
            <div>
              <p className="text-sm font-medium block mb-1">{t.description}</p>
              <textarea
                value={maintDesc}
                onChange={(e) => setMaintDesc(e.target.value)}
                placeholder={t.description}
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm min-h-[80px] resize-none"
              />
            </div>
            <Button
              onClick={handleCreateMaintenance}
              disabled={submitting || !maintTitle.trim()}
              className="w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
            >
              {submitting ? t.loading : t.submit}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
