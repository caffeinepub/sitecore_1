import {
  ArrowLeft,
  Award,
  BarChart2,
  Bell,
  BookOpen,
  Building2,
  Calendar,
  CalendarClock,
  Car,
  Check,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  ClipboardList,
  Copy,
  CreditCard,
  FileText,
  Flame,
  Gauge,
  HardHat,
  Heart,
  HelpCircle,
  Home,
  Image,
  KeyRound as Key,
  Leaf,
  Lightbulb,
  ListOrdered,
  MapPin,
  Megaphone,
  MessageSquare,
  MessagesSquare,
  Newspaper,
  Package,
  PartyPopper,
  PawPrint,
  Phone,
  PieChart,
  PiggyBank,
  QrCode,
  Receipt,
  Scale,
  ScrollText,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  Smile,
  Sparkles,
  Store,
  TrendingDown,
  TrendingUp,
  Truck,
  User,
  UserCheck,
  UserCog,
  Users,
  Vote,
  Wrench,
  Zap,
} from "lucide-react";
import { Suspense, lazy, useEffect, useState } from "react";
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
const AccessKeyManagement = lazy(() => import("./AccessKeyManagement"));
const ApartmentManagement = lazy(() => import("./ApartmentManagement"));
const ApartmentValuation = lazy(() => import("./ApartmentValuation"));
const BudgetAccounting = lazy(() => import("./BudgetAccounting"));
const BudgetPlanning = lazy(() => import("./BudgetPlanning"));
const BuildingMediaArchive = lazy(() => import("./BuildingMediaArchive"));
const BuildingRules = lazy(() => import("./BuildingRules"));
const BuildingSettings = lazy(() => import("./BuildingSettings"));
const BulletinBoard = lazy(() => import("./BulletinBoard"));
const CleaningSchedule = lazy(() => import("./CleaningSchedule"));
const CommitteeManagement = lazy(() => import("./CommitteeManagement"));
const CommonAreaReservation = lazy(() => import("./CommonAreaReservation"));
const ComplaintBox = lazy(() => import("./ComplaintBox"));
const DepotManagement = lazy(() => import("./DepotManagement"));
const DigitalBulletin = lazy(() => import("./DigitalBulletin"));
const DisabledElderlySupport = lazy(() => import("./DisabledElderlySupport"));
const DocumentManagement = lazy(() => import("./DocumentManagement"));
const DuesPaymentPlan = lazy(() => import("./DuesPaymentPlan"));
const DuesTracking = lazy(() => import("./DuesTracking"));
const ElectionManagement = lazy(() => import("./ElectionManagement"));
const EmergencyActionPlan = lazy(() => import("./EmergencyActionPlan"));
const EmergencyContacts = lazy(() => import("./EmergencyContacts"));
const EnergyEfficiency = lazy(() => import("./EnergyEfficiency"));
const ExpenseTracking = lazy(() => import("./ExpenseTracking"));
const GuestParking = lazy(() => import("./GuestParking"));
const HeatingCostDistribution = lazy(() => import("./HeatingCostDistribution"));
const HelpCenter = lazy(() => import("./HelpCenter"));
const InsuranceWarranty = lazy(() => import("./InsuranceWarranty"));
const InvoiceTracking = lazy(() => import("./InvoiceTracking"));
const LegalDebtTracking = lazy(() => import("./LegalDebtTracking"));
const LostFound = lazy(() => import("./LostFound"));
const MaintenanceSchedule = lazy(() => import("./MaintenanceSchedule"));
const ManagementActivityReport = lazy(
  () => import("./ManagementActivityReport"),
);
const MeetingManagement = lazy(() => import("./MeetingManagement"));
const MeterTracking = lazy(() => import("./MeterTracking"));
const MovingManagement = lazy(() => import("./MovingManagement"));
const NeighborForum = lazy(() => import("./NeighborForum"));
const NotificationCenter = lazy(() => import("./NotificationCenter"));
const PackageTracking = lazy(() => import("./PackageTracking"));
const ParkingAllocation = lazy(() => import("./ParkingAllocation"));
const PetManagement = lazy(() => import("./PetManagement"));
const ProfileSettings = lazy(() => import("./ProfileSettings"));
const ProjectManagement = lazy(() => import("./ProjectManagement"));
const RenovationPermits = lazy(() => import("./RenovationPermits"));
const RepairQuoteManagement = lazy(() => import("./RepairQuoteManagement"));
const ReportingCenter = lazy(() => import("./ReportingCenter"));
const ResidentOnboarding = lazy(() => import("./ResidentOnboarding"));
const ResidentSatisfaction = lazy(() => import("./ResidentSatisfaction"));
const ResidentTasks = lazy(() => import("./ResidentTasks"));
const SecurityIncidents = lazy(() => import("./SecurityIncidents"));
const ServiceProviders = lazy(() => import("./ServiceProviders"));
const StaffManagement = lazy(() => import("./StaffManagement"));
const SubscriptionTracking = lazy(() => import("./SubscriptionTracking"));
const SupplierContractPerformance = lazy(
  () => import("./SupplierContractPerformance"),
);
const SurveyManagement = lazy(() => import("./SurveyManagement"));
const VehicleParking = lazy(() => import("./VehicleParking"));
const VisitorManagement = lazy(() => import("./VisitorManagement"));
const VisitorPreAuth = lazy(() => import("./VisitorPreAuth"));
const WasteManagement = lazy(() => import("./WasteManagement"));
const WorkOrderManagement = lazy(() => import("./WorkOrderManagement"));

const DuesTransparency = lazy(() => import("./DuesTransparency"));
const FacilityEquipment = lazy(() => import("./FacilityEquipment"));
const ResidentServiceRequests = lazy(() => import("./ResidentServiceRequests"));
const ChildSportsFacility = lazy(() => import("./ChildSportsFacility"));
const DisasterPreparedness = lazy(() => import("./DisasterPreparedness"));
const NeighborhoodGuide = lazy(() => import("./NeighborhoodGuide"));
const ResidentRewards = lazy(() => import("./ResidentRewards"));
const BoardDecisionRegister = lazy(() => import("./BoardDecisionRegister"));
const EmergencyServiceGuide = lazy(() => import("./EmergencyServiceGuide"));
const ResidentProfile = lazy(() => import("./ResidentProfile"));
const DisputeResolution = lazy(() => import("./DisputeResolution"));
const BuildingTechSpec = lazy(() => import("./BuildingTechSpec"));
const SocialEvents = lazy(() => import("./SocialEvents"));
const StaffLeaveManagement = lazy(() => import("./StaffLeaveManagement"));
const TenantManagement = lazy(() => import("./TenantManagement"));
const VehicleMaintenanceTracking = lazy(
  () => import("./VehicleMaintenanceTracking"),
);
const EnergyConsumption = lazy(() => import("./EnergyConsumption"));
const InsuranceClaimManagement = lazy(
  () => import("./InsuranceClaimManagement"),
);
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
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {
      management: true,
      finance: true,
      communication: true,
      security: true,
      technical: true,
      social: true,
    },
  );

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
  const [annAudience, setAnnAudience] = useState("all");
  const [annAudienceDetail, setAnnAudienceDetail] = useState("");
  const [annReadMap, setAnnReadMap] = useState<Record<string, string[]>>(() => {
    try {
      return JSON.parse(
        localStorage.getItem(`sitecore_ann_reads_${buildingId}`) || "{}",
      );
    } catch {
      return {};
    }
  });

  // Maintenance state
  const [showMaintModal, setShowMaintModal] = useState(false);
  const [maintTitle, setMaintTitle] = useState("");
  const [maintDesc, setMaintDesc] = useState("");
  const [maintTechnicianMap, setMaintTechnicianMap] = useState<
    Record<string, string>
  >({});
  const [editingTechnician, setEditingTechnician] = useState<string | null>(
    null,
  );
  const [maintPriorityMap, setMaintPriorityMap] = useState<
    Record<string, string>
  >({});
  const [maintPhotoMap, setMaintPhotoMap] = useState<Record<string, string>>(
    {},
  );
  const [maintPriority, setMaintPriority] = useState("Orta");
  const [technicianInput, setTechnicianInput] = useState("");

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
    {
      key: "vehicles",
      label: (t as any).vehicleParking || "Araç & Otopark",
      icon: Car,
      show: true,
    },
    {
      key: "meters",
      label: (t as any).meterTracking || "Sayaç Takibi",
      icon: Gauge,
      show: true,
    },
    {
      key: "complaints",
      label: (t as any).complaintBox || "Şikayet & Öneri",
      icon: MessageSquare,
      show: true,
    },
    {
      key: "emergency",
      label: (t as any).emergencyContacts || "Acil İletişim",
      icon: Phone,
      show: true,
    },
    {
      key: "packages",
      label: (t as any).packageTracking || "Kargo & Paket",
      icon: Package,
      show: true,
    },
    {
      key: "staffMgmt",
      label: (t as any).staffManagement || "Personel Yönetimi",
      icon: UserCog,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "budget",
      label: (t as any).budgetAccounting || "Muhasebe",
      icon: PiggyBank,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "buildingRules",
      label: (t as any).buildingRules || "Bina Kuralları",
      icon: BookOpen,
      show: true,
    },
    {
      key: "security",
      label: (t as any).securityIncidents || "Güvenlik & Olaylar",
      icon: Shield,
      show: true,
    },
    {
      key: "energy",
      label: (t as any).energyEfficiency || "Enerji Verimliliği",
      icon: Zap,
      show: true,
    },
    {
      key: "lostFound",
      label: (t as any).lostFound || "Kayıp & Buluntu",
      icon: Search,
      show: true,
    },
    {
      key: "maintSchedule",
      label: "Bakım Takvimi",
      icon: CalendarClock,
      show: true,
    },
    {
      key: "serviceProviders",
      label: "Tedarikçi Rehberi",
      icon: Store,
      show: true,
    },
    {
      key: "bulletin",
      label: "İlan Panosu",
      icon: ClipboardList,
      show: true,
    },
    {
      key: "moving",
      label: "Taşınma & Teslim",
      icon: Truck,
      show: true,
    },
    {
      key: "cleaning",
      label: "Temizlik Programı",
      icon: Sparkles,
      show: true,
    },
    {
      key: "insurance",
      label: "Sigorta & Garanti",
      icon: ShieldCheck,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "reporting",
      label: "Raporlama & Analitik",
      icon: TrendingUp,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "committee",
      label: "Komite & Kurul",
      icon: Vote,
      show: true,
    },
    {
      key: "subscriptions",
      label: "Abonelik & Sözleşme",
      icon: ScrollText,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "renovationPermits",
      label: "İzin & Tadilat",
      icon: HardHat,
      show: true,
    },
    { key: "forum", label: "Komşu Forumu", icon: MessagesSquare, show: true },
    {
      key: "visitorPreAuth",
      label: "Ziyaretçi Ön İzni",
      icon: QrCode,
      show: true,
    },
    { key: "helpCenter", label: "SSS & Yardım", icon: HelpCircle, show: true },
    {
      key: "budgetPlanning",
      label: "Bütçe Planlama",
      icon: PieChart,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "duesPaymentPlan",
      label: "Taksit Planları",
      icon: ListOrdered,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "petManagement",
      label: "Evcil Hayvanlar",
      icon: PawPrint,
      show: true,
    },
    {
      key: "legalDebt",
      label: "Hukuki Borç Takibi",
      icon: Scale,
      show: isOwner,
    },
    { key: "guestParking", label: "Misafir Otopark", icon: Car, show: true },
    { key: "mediaArchive", label: "Medya Arşivi", icon: Image, show: true },
    {
      key: "projectManagement",
      label: "Proje Yönetimi",
      icon: HardHat,
      show: true,
    },
    { key: "election", label: "Oy & Seçim", icon: Vote, show: true },
    {
      key: "digitalBulletin",
      label: "Dijital Bülten",
      icon: Newspaper,
      show: true,
    },
    {
      key: "depot",
      label: "Depo & Malzeme",
      icon: Package,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "residentOnboarding",
      label: "Sakin Onboarding",
      icon: UserCheck,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "accessKeys",
      label: "Anahtar Yönetimi",
      icon: Key,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "workOrders",
      label: "İş Emri Yönetimi",
      icon: ClipboardList,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "invoiceTracking",
      label: "Fatura Takibi",
      icon: Receipt,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "repairQuotes",
      label: "Teklif Yu00f6netimi",
      icon: FileText,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "heatingCost",
      label: "Isu0131nma Gider Pay.",
      icon: Flame,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "activityReport",
      label: "Faaliyet Raporu",
      icon: BarChart2,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "residentTasks",
      label: "Gönüllü Görevler",
      icon: CheckSquare,
      show: true,
    },
    {
      key: "parkingAllocation",
      label: "Park Tahsis Yönetimi",
      icon: Car,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "disabledSupport",
      label: "Engelli & Yaşlı Destek",
      icon: Heart,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "supplierContracts",
      label: "Tedarikçi Sözleşme",
      icon: Award,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "facilityEquipment",
      label: "Tesis & Ekipman",
      icon: Settings,
      show: isOwner || hasPermission("manage_users"),
    },
    {
      key: "duesTransparency",
      label: "Aidat u015eeffaflu0131u011fu0131",
      icon: PieChart,
      show: true,
    },
    {
      key: "serviceRequests",
      label: "Hizmet Talepleri",
      icon: Lightbulb,
      show: true,
    },
    {
      key: "childSportsFacility",
      label: "Çocuk & Spor Tesisi",
      icon: Users,
      show: true,
    },
    {
      key: "disasterPreparedness",
      label: "Afet Hazırlık & Sigorta",
      icon: Shield,
      show: true,
    },
    {
      key: "neighborhoodGuide",
      label: "Mahalle & Çevre Rehberi",
      icon: MapPin,
      show: true,
    },
    {
      key: "residentRewards",
      label: "Sakin Ödül & Teşvik",
      icon: Award,
      show: true,
    },
    {
      key: "boardDecisionRegister",
      label: "Karar Defteri",
      icon: BookOpen,
      show: true,
    },
    {
      key: "emergencyServiceGuide",
      label: "Acil Servis Rehberi",
      icon: Phone,
      show: true,
    },
    {
      key: "residentProfile",
      label: "Sakin Profil & Tercihler",
      icon: User,
      show: true,
    },
    {
      key: "disputeResolution",
      label: "Anlaşmazlık Çözüm",
      icon: Scale,
      show: true,
    },
    {
      key: "buildingTechSpec",
      label: "Teknik Şartname & El Kitabı",
      icon: BookOpen,
      show: true,
    },
    {
      key: "socialEvents",
      label: "Sosyal Etkinlikler",
      icon: PartyPopper,
      show: true,
    },
    {
      key: "staffLeave",
      label: "Personel İzin & Mesai",
      icon: ClipboardCheck,
      show: isOwner,
    },
    {
      key: "tenantManagement",
      label: "Kiracı Yönetimi",
      icon: Users,
      show: isOwner,
    },
    {
      key: "vehicleMaintenance",
      label: "Araç Bakım & Muayene",
      icon: Car,
      show: isOwner,
    },
    {
      key: "energyConsumption",
      label: "Enerji Tüketimi & Tasarrufu",
      icon: Zap,
      show: true,
    },
    {
      key: "insuranceClaims",
      label: "Sigorta & Hasar Yönetimi",
      icon: Shield,
      show: isOwner,
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
        <aside className="w-60 flex-shrink-0">
          <nav className="space-y-2">
            {(() => {
              const SIDEBAR_CATEGORIES = [
                {
                  key: "management",
                  label: "🏢 Yönetim",
                  tabKeys: [
                    "overview",
                    "apartments",
                    "users",
                    "roles",
                    "buildingSettings",
                    "moving",
                    "committee",
                    "renovationPermits",
                    "activityReport",
                  ],
                },
                {
                  key: "finance",
                  label: "💰 Finans",
                  tabKeys: [
                    "dues",
                    "expenses",
                    "budget",
                    "insurance",
                    "subscriptions",
                    "reporting",
                    "budgetPlanning",
                    "duesPaymentPlan",
                    "legalDebt",
                    "heatingCost",
                  ],
                },
                {
                  key: "communication",
                  label: "📢 İletişim",
                  tabKeys: [
                    "announcements",
                    "notifications",
                    "surveys",
                    "bulletin",
                    "digitalBulletin",
                  ],
                },
                {
                  key: "security",
                  label: "🔒 Güvenlik",
                  tabKeys: [
                    "visitors",
                    "security",
                    "packages",
                    "lostFound",
                    "visitorPreAuth",
                    "emergencyPlan",
                  ],
                },
                {
                  key: "technical",
                  label: "🔧 Teknik",
                  tabKeys: [
                    "maintenance",
                    "meters",
                    "maintSchedule",
                    "serviceProviders",
                    "energy",
                    "staffMgmt",
                    "cleaning",
                    "projectManagement",
                    "repairQuotes",
                  ],
                },
                {
                  key: "social",
                  label: "👥 Sosyal",
                  tabKeys: [
                    "vehicles",
                    "meetings",
                    "commonAreas",
                    "documents",
                    "profile",
                    "emergency",
                    "complaints",
                    "buildingRules",
                    "forum",
                    "helpCenter",
                    "residentSatisfaction",
                    "apartmentValuation",
                    "wasteManagement",
                    "petManagement",
                    "guestParking",
                    "mediaArchive",
                    "election",
                    "residentTasks",
                    "parkingAllocation",
                    "disabledSupport",
                    "supplierContracts",
                    "serviceRequests",
                    "duesTransparency",
                    "facilityEquipment",
                  ],
                },
              ];
              return SIDEBAR_CATEGORIES.map((cat) => {
                const catTabs = tabs.filter((t) => cat.tabKeys.includes(t.key));
                if (catTabs.length === 0) return null;
                const isOpen = openCategories[cat.key] !== false;
                const hasActive = catTabs.some((t) => t.key === activeTab);
                const toggleCat = () => {
                  if (hasActive) return;
                  setOpenCategories((prev) => ({
                    ...prev,
                    [cat.key]: !isOpen,
                  }));
                };
                return (
                  <div key={cat.key}>
                    <button
                      type="button"
                      onClick={toggleCat}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-[#6B7A8D] uppercase tracking-wide hover:text-[#0E1116] transition-colors"
                    >
                      <span>{cat.label}</span>
                      {isOpen || hasActive ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>
                    {(isOpen || hasActive) && (
                      <div className="space-y-0.5 mb-1">
                        {catTabs.map((tab) => (
                          <button
                            type="button"
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                              activeTab === tab.key
                                ? "bg-[#0B1B2E] text-white"
                                : "text-[#3A4654] hover:bg-white hover:text-[#0E1116]"
                            }`}
                          >
                            <tab.icon className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{tab.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              });
            })()}
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
              {/* Role detection */}
              {(() => {
                const isManager =
                  isOwner ||
                  hasPermission("manage_users") ||
                  hasPermission("admin");
                const isStaff = hasPermission("view_maintenance") && !isManager;
                const isResident = !isManager && !isStaff;
                if (isResident) {
                  // Resident personalized panel
                  const dues = (() => {
                    try {
                      return JSON.parse(
                        localStorage.getItem(`sitecore_dues_${buildingId}`) ||
                          "[]",
                      );
                    } catch {
                      return [];
                    }
                  })();
                  const unpaidDues = dues.filter(
                    (d: any) => d.status === "overdue" || d.status === "unpaid",
                  ).length;
                  const packages = (() => {
                    try {
                      return JSON.parse(
                        localStorage.getItem(
                          `sitecore_packages_${buildingId}`,
                        ) || "[]",
                      );
                    } catch {
                      return [];
                    }
                  })();
                  const pendingPkgs = packages.filter(
                    (p: any) =>
                      p.status !== "delivered" && p.status !== "teslim edildi",
                  ).length;
                  const reservations = (() => {
                    try {
                      return JSON.parse(
                        localStorage.getItem(
                          `sitecore_reservations_${buildingId}`,
                        ) || "[]",
                      );
                    } catch {
                      return [];
                    }
                  })();
                  const myReservations = reservations.filter(
                    (r: any) => r.userId === userId || r.createdBy === userId,
                  ).length;
                  return (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-[#0B1B2E] to-[#1A3A5C] rounded-2xl p-5 text-white">
                        <p className="text-lg font-semibold">
                          Hoş geldiniz! 👋
                        </p>
                        <p className="text-sm text-white/70 mt-1">
                          {building?.name} —{" "}
                          {new Date().toLocaleDateString("tr-TR", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                          })}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div
                          className={`rounded-2xl p-5 border ${unpaidDues > 0 ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}
                        >
                          <p
                            className="text-2xl font-bold"
                            style={{
                              color: unpaidDues > 0 ? "#dc2626" : "#16a34a",
                            }}
                          >
                            {unpaidDues > 0 ? unpaidDues : "✓"}
                          </p>
                          <p
                            className="text-sm mt-1"
                            style={{
                              color: unpaidDues > 0 ? "#b91c1c" : "#15803d",
                            }}
                          >
                            {unpaidDues > 0
                              ? "Ödenmemiş Aidat"
                              : "Aidatlarınız güncel"}
                          </p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2]">
                          <p className="text-2xl font-bold text-[#4A90D9]">
                            {announcements.length}
                          </p>
                          <p className="text-sm text-[#3A4654] mt-1">
                            Aktif Duyuru
                          </p>
                        </div>
                        <div
                          className={`rounded-2xl p-5 border ${pendingPkgs > 0 ? "bg-amber-50 border-amber-200" : "bg-white border-[#E5EAF2]"}`}
                        >
                          <p
                            className={`text-2xl font-bold ${pendingPkgs > 0 ? "text-amber-600" : "text-[#3A4654]"}`}
                          >
                            {pendingPkgs}
                          </p>
                          <p className="text-sm text-[#3A4654] mt-1">
                            Bekleyen Kargo
                          </p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2]">
                          <p className="text-2xl font-bold text-purple-600">
                            {myReservations}
                          </p>
                          <p className="text-sm text-[#3A4654] mt-1">
                            Rezervasyonlarım
                          </p>
                        </div>
                      </div>
                      {announcements.length > 0 && (
                        <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2]">
                          <p className="font-semibold text-[#0E1116] mb-3">
                            📢 Son Duyurular
                          </p>
                          <div className="space-y-2">
                            {announcements.slice(0, 3).map((ann: any) => (
                              <div
                                key={ann.id}
                                className="text-sm text-[#3A4654] border-b border-[#F3F6FB] pb-2 last:border-0 last:pb-0"
                              >
                                <p className="font-medium text-[#0E1116]">
                                  {ann.title}
                                </p>
                                <p className="text-xs text-[#6B7A8D] mt-0.5">
                                  {ann.date ||
                                    ann.createdAt?.split("T")[0] ||
                                    ""}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                if (isStaff) {
                  const today = new Date().toISOString().split("T")[0];
                  const shifts = (() => {
                    try {
                      return JSON.parse(
                        localStorage.getItem(
                          `sitecore_shift_log_${buildingId}`,
                        ) || "[]",
                      );
                    } catch {
                      return [];
                    }
                  })();
                  const todayShifts = shifts.filter(
                    (s: any) => s.date === today,
                  );
                  const incidents = (() => {
                    try {
                      return JSON.parse(
                        localStorage.getItem(
                          `sitecore_incidents_${buildingId}`,
                        ) || "[]",
                      );
                    } catch {
                      return [];
                    }
                  })();
                  const openIncidents = incidents.filter(
                    (i: any) => i.status !== "closed",
                  ).length;
                  const cleaning = (() => {
                    try {
                      return JSON.parse(
                        localStorage.getItem(
                          `sitecore_cleaning_${buildingId}`,
                        ) || "[]",
                      );
                    } catch {
                      return [];
                    }
                  })();
                  const todayCleaning = cleaning.filter(
                    (c: any) =>
                      c.date === today ||
                      c.day ===
                        new Date().toLocaleDateString("tr-TR", {
                          weekday: "long",
                        }),
                  ).length;
                  const assignedMaint = maintenance.filter(
                    (m: any) =>
                      m.technicianId === userId ||
                      (m.assignee && m.assignee === userId),
                  ).length;
                  return (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-[#1A3A5C] to-[#0B1B2E] rounded-2xl p-5 text-white">
                        <p className="text-lg font-semibold">Görev Panosu 🛡️</p>
                        <p className="text-sm text-white/70 mt-1">
                          {new Date().toLocaleDateString("tr-TR", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                          })}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div
                          className={`rounded-2xl p-5 border ${openIncidents > 0 ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}
                        >
                          <p
                            className={`text-2xl font-bold ${openIncidents > 0 ? "text-red-600" : "text-green-600"}`}
                          >
                            {openIncidents}
                          </p>
                          <p
                            className="text-sm mt-1"
                            style={{
                              color: openIncidents > 0 ? "#b91c1c" : "#15803d",
                            }}
                          >
                            Açık Olay
                          </p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2]">
                          <p className="text-2xl font-bold text-amber-600">
                            {assignedMaint}
                          </p>
                          <p className="text-sm text-[#3A4654] mt-1">
                            Atanan Arıza
                          </p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2]">
                          <p className="text-2xl font-bold text-[#4A90D9]">
                            {todayCleaning}
                          </p>
                          <p className="text-sm text-[#3A4654] mt-1">
                            Bugün Temizlik Görevi
                          </p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2]">
                          <p className="text-2xl font-bold text-purple-600">
                            {todayShifts.length}
                          </p>
                          <p className="text-sm text-[#3A4654] mt-1">
                            Bugün Nöbet Devri
                          </p>
                        </div>
                      </div>
                      {todayShifts.length > 0 && (
                        <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2]">
                          <p className="font-semibold text-[#0E1116] mb-3">
                            🕐 Bugünün Nöbet Devri
                          </p>
                          <div className="space-y-2">
                            {todayShifts.map((s: any) => (
                              <div
                                key={s.id}
                                className="text-sm text-[#3A4654] flex justify-between"
                              >
                                <span>
                                  {s.time} — {s.incoming} ↔ {s.outgoing}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                return null; // isManager falls through to existing content below
              })()}
              {/* Admin/Manager content */}
              {(() => {
                const isManager =
                  isOwner ||
                  hasPermission("manage_users") ||
                  hasPermission("admin");
                if (!isManager) return null;
                return (
                  <div>
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
                            localStorage.getItem(
                              `sitecore_surveys_${buildingId}`,
                            ) || "[]",
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
                          {(() => {
                            try {
                              const incs = JSON.parse(
                                localStorage.getItem(
                                  `sitecore_incidents_${buildingId}`,
                                ) || "[]",
                              );
                              const openIncs = incs.filter(
                                (i: any) => i.status !== "closed",
                              ).length;
                              return (
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
                                  <p className="text-3xl font-bold text-red-600">
                                    {openIncs}
                                  </p>
                                  <p className="text-[#3A4654] text-sm mt-1">
                                    Açık Arıza/Olay
                                  </p>
                                </div>
                              );
                            } catch {
                              return null;
                            }
                          })()}
                        </div>
                      );
                    })()}
                    {(() => {
                      const duesData = (() => {
                        try {
                          return JSON.parse(
                            localStorage.getItem(
                              `sitecore_dues_${buildingId}`,
                            ) || "[]",
                          );
                        } catch {
                          return [];
                        }
                      })();
                      const overdueCount = duesData.filter(
                        (d: any) => d.status === "overdue",
                      ).length;
                      const complaintsData = (() => {
                        try {
                          return JSON.parse(
                            localStorage.getItem(
                              `sitecore_complaints_${buildingId}`,
                            ) || "[]",
                          );
                        } catch {
                          return [];
                        }
                      })();
                      const openComplaints = complaintsData.filter(
                        (c: any) =>
                          c.status === "open" ||
                          c.status === "pending" ||
                          !c.status,
                      ).length;
                      const reservationsData = (() => {
                        try {
                          return JSON.parse(
                            localStorage.getItem(
                              `sitecore_reservations_${buildingId}`,
                            ) || "[]",
                          );
                        } catch {
                          return [];
                        }
                      })();
                      const pendingReservations = reservationsData.filter(
                        (r: any) => r.status === "pending",
                      ).length;
                      const apartmentsData = (() => {
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
                      return (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
                              <div className="flex items-center gap-2 mb-2">
                                <Building2 className="w-5 h-5 text-[#4A90D9]" />
                              </div>
                              <p className="text-3xl font-bold text-[#0B1B2E]">
                                {apartmentsData.length}
                              </p>
                              <p className="text-sm text-[#3A4654] mt-1">
                                Toplam Daire
                              </p>
                            </div>
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-red-100">
                              <div className="flex items-center gap-2 mb-2">
                                <CreditCard className="w-5 h-5 text-red-500" />
                              </div>
                              <p className="text-3xl font-bold text-red-600">
                                {overdueCount}
                              </p>
                              <p className="text-sm text-[#3A4654] mt-1">
                                Geciken Aidat
                              </p>
                            </div>
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-yellow-100">
                              <div className="flex items-center gap-2 mb-2">
                                <MessageSquare className="w-5 h-5 text-yellow-500" />
                              </div>
                              <p className="text-3xl font-bold text-yellow-600">
                                {openComplaints}
                              </p>
                              <p className="text-sm text-[#3A4654] mt-1">
                                Açık Şikayet
                              </p>
                            </div>
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100">
                              <div className="flex items-center gap-2 mb-2">
                                <MapPin className="w-5 h-5 text-orange-500" />
                              </div>
                              <p className="text-3xl font-bold text-orange-600">
                                {pendingReservations}
                              </p>
                              <p className="text-sm text-[#3A4654] mt-1">
                                Bekleyen Rezervasyon
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <button
                              type="button"
                              onClick={() => setActiveTab("dues")}
                              className="px-4 py-2 bg-[#0B1B2E] text-white text-sm font-medium rounded-full hover:bg-[#112843] transition-colors"
                            >
                              💰 Aidat Takibi
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveTab("complaints")}
                              className="px-4 py-2 bg-[#0B1B2E] text-white text-sm font-medium rounded-full hover:bg-[#112843] transition-colors"
                            >
                              💬 Şikayet Kutusu
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveTab("commonAreas")}
                              className="px-4 py-2 bg-[#0B1B2E] text-white text-sm font-medium rounded-full hover:bg-[#112843] transition-colors"
                            >
                              📅 Rezervasyonlar
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveTab("reporting")}
                              className="px-4 py-2 bg-[#112843] text-white text-sm font-medium rounded-full hover:bg-[#0B1B2E] transition-colors"
                              data-ocid="overview.secondary_button"
                            >
                              📊 Raporlama
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveTab("committee")}
                              className="px-4 py-2 bg-[#112843] text-white text-sm font-medium rounded-full hover:bg-[#0B1B2E] transition-colors"
                              data-ocid="overview.secondary_button"
                            >
                              🏛️ Kurul
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveTab("subscriptions")}
                              className="px-4 py-2 bg-[#112843] text-white text-sm font-medium rounded-full hover:bg-[#0B1B2E] transition-colors"
                              data-ocid="overview.secondary_button"
                            >
                              📄 Sözleşmeler
                            </button>
                          </div>
                          {/* Health Score */}
                          {(() => {
                            const duesForScore = (() => {
                              try {
                                return JSON.parse(
                                  localStorage.getItem(
                                    `sitecore_dues_${buildingId}`,
                                  ) || "[]",
                                );
                              } catch {
                                return [];
                              }
                            })();
                            const maintForScore = (() => {
                              try {
                                return JSON.parse(
                                  localStorage.getItem(
                                    `sitecore_maintenance_${buildingId}`,
                                  ) || "[]",
                                );
                              } catch {
                                return maintenance;
                              }
                            })();
                            const complaintsForScore = (() => {
                              try {
                                return JSON.parse(
                                  localStorage.getItem(
                                    `sitecore_complaints_${buildingId}`,
                                  ) || "[]",
                                );
                              } catch {
                                return [];
                              }
                            })();
                            const resForScore = (() => {
                              try {
                                return JSON.parse(
                                  localStorage.getItem(
                                    `sitecore_reservations_${buildingId}`,
                                  ) || "[]",
                                );
                              } catch {
                                return [];
                              }
                            })();
                            const overdueForScore = duesForScore.filter(
                              (d: any) => d.status === "overdue",
                            ).length;
                            const pendingMaintForScore = maintForScore.filter
                              ? maintForScore.filter(
                                  (m: any) =>
                                    m.status &&
                                    ("pending" in m.status ||
                                      m.status === "pending"),
                                ).length
                              : maintenance.filter((m) => "pending" in m.status)
                                  .length;
                            const resolvedComplaints =
                              complaintsForScore.filter(
                                (c: any) =>
                                  c.status === "resolved" ||
                                  c.status === "çözümlendi",
                              ).length;
                            const totalComplaints = complaintsForScore.length;
                            const approvedRes = resForScore.filter(
                              (r: any) => r.status === "approved",
                            ).length;
                            const totalRes = resForScore.length;
                            const s1 =
                              (1 -
                                overdueForScore /
                                  Math.max(duesForScore.length, 1)) *
                              25;
                            const s2 =
                              (1 -
                                pendingMaintForScore /
                                  Math.max(maintenance.length, 1)) *
                              25;
                            const s3 =
                              totalComplaints === 0
                                ? 25
                                : (resolvedComplaints / totalComplaints) * 25;
                            const s4 =
                              totalRes === 0
                                ? 25
                                : (approvedRes / totalRes) * 25;
                            const score = Math.round(s1 + s2 + s3 + s4);
                            const scoreColor =
                              score >= 80
                                ? "text-green-600"
                                : score >= 60
                                  ? "text-yellow-600"
                                  : "text-red-600";
                            const scoreBg =
                              score >= 80
                                ? "bg-green-50 border-green-200"
                                : score >= 60
                                  ? "bg-yellow-50 border-yellow-200"
                                  : "bg-red-50 border-red-200";
                            return (
                              <div
                                className={`mt-4 rounded-2xl p-5 shadow-sm border ${scoreBg}`}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h3 className="font-semibold text-[#0E1116] mb-1">
                                      🏥 Bina Sağlık Skoru
                                    </h3>
                                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-2 text-xs text-[#6B7A8D]">
                                      <span>
                                        💰 Aidat durumu: {Math.round(s1)}/25
                                      </span>
                                      <span>
                                        🔧 Arıza oranı: {Math.round(s2)}/25
                                      </span>
                                      <span>
                                        💬 Şikayet çözümü: {Math.round(s3)}/25
                                      </span>
                                      <span>
                                        📅 Rezervasyon: {Math.round(s4)}/25
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-center ml-4">
                                    <p
                                      className={`text-5xl font-bold ${scoreColor}`}
                                    >
                                      {score}
                                    </p>
                                    <p className="text-xs text-[#6B7A8D] mt-1">
                                      / 100
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                          {/* Recent Activity Feed */}
                          <div className="mt-4 bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
                            <h3 className="font-semibold text-[#0E1116] mb-3">
                              Son İşlemler
                            </h3>
                            <div className="space-y-2">
                              {[
                                {
                                  icon: "💰",
                                  text: "D-12 dairesi aidatını ödedi",
                                  time: "2 saat önce",
                                },
                                {
                                  icon: "🔧",
                                  text: "A-3 arıza bildirimi oluşturuldu: Su tesisatı sorunu",
                                  time: "4 saat önce",
                                },
                                {
                                  icon: "📦",
                                  text: "B-7 için kargo teslim alındı",
                                  time: "Dün, 16:45",
                                },
                                {
                                  icon: "👤",
                                  text: "Yeni sakin C-8 daireye kayıt oldu",
                                  time: "Dün, 11:20",
                                },
                                {
                                  icon: "📢",
                                  text: "Yönetim duyurusu yayınlandı: Asansör bakımı",
                                  time: "2 gün önce",
                                },
                              ].map((item) => (
                                <div
                                  key={item.text}
                                  className="flex items-center gap-3 py-2 border-b border-[#F3F6FB] last:border-0"
                                >
                                  <span className="text-lg">{item.icon}</span>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm text-[#0E1116] truncate">
                                      {item.text}
                                    </p>
                                  </div>
                                  <span className="text-xs text-[#6B7A8D] flex-shrink-0">
                                    {item.time}
                                  </span>
                                </div>
                              ))}
                            </div>
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
                );
              })()}
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
                      <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                        {(() => {
                          const reads = annReadMap[ann.id] || [];
                          const alreadyRead = reads.includes(userId || "");
                          return (
                            <Button
                              size="sm"
                              variant={alreadyRead ? "ghost" : "outline"}
                              className={`text-xs rounded-full ${alreadyRead ? "text-green-600" : "text-[#3A4654]"}`}
                              onClick={() => {
                                if (alreadyRead) return;
                                const newReads = {
                                  ...annReadMap,
                                  [ann.id]: [...reads, userId || ""],
                                };
                                setAnnReadMap(newReads);
                                localStorage.setItem(
                                  `sitecore_ann_reads_${buildingId}`,
                                  JSON.stringify(newReads),
                                );
                              }}
                            >
                              {alreadyRead
                                ? `✓ Okundu (${reads.length})`
                                : `Okundu İşaretle (${reads.length})`}
                            </Button>
                          );
                        })()}
                        {hasPermission("manage_announcements") && (
                          <Button
                            onClick={() => handleDeleteAnnouncement(ann.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-600"
                          >
                            {t.delete}
                          </Button>
                        )}
                      </div>
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
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-4 border border-[#E5EAF2]">
                  <p className="text-sm text-[#6B7A8D]">Açık Talepler</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {maintenance.filter((r) => "pending" in r.status).length}
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-[#E5EAF2]">
                  <p className="text-sm text-[#6B7A8D]">Devam Ediyor</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {maintenance.filter((r) => "inProgress" in r.status).length}
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-[#E5EAF2]">
                  <p className="text-sm text-[#6B7A8D]">Tamamlanan</p>
                  <p className="text-2xl font-bold text-green-600">
                    {maintenance.filter((r) => "resolved" in r.status).length}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {maintenance.length === 0 && (
                  <p className="text-[#3A4654] text-center py-8">
                    Talep bulunmuyor.
                  </p>
                )}
                {maintenance.map((req) => {
                  const technician = maintTechnicianMap[req.id];
                  return (
                    <div
                      key={req.id}
                      className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-[#0E1116]">
                            {req.title}
                          </h3>
                          <p className="text-[#3A4654] text-sm mt-1">
                            {req.description}
                          </p>
                          {technician && (
                            <p className="text-xs text-[#6B7A8D] mt-1 flex items-center gap-1">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400" />
                              Teknisyen:{" "}
                              <span className="font-medium text-blue-700">
                                {technician}
                              </span>
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(req.status)}
                          {maintPriorityMap[req.id] &&
                            (() => {
                              const p = maintPriorityMap[req.id];
                              const c =
                                p === "Kritik"
                                  ? "bg-red-100 text-red-700 border-red-200"
                                  : p === "Yüksek"
                                    ? "bg-orange-100 text-orange-700 border-orange-200"
                                    : p === "Orta"
                                      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                      : "bg-gray-100 text-gray-600 border-gray-200";
                              return (
                                <Badge className={`text-xs border ${c}`}>
                                  {p}
                                </Badge>
                              );
                            })()}
                        </div>
                        {maintPhotoMap[req.id] && (
                          <img
                            src={maintPhotoMap[req.id]}
                            alt="arıza"
                            className="mt-2 rounded-lg max-h-32 object-cover"
                          />
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {(hasPermission("update_maintenance") ||
                          hasPermission("manage_maintenance")) &&
                          !("resolved" in req.status) && (
                            <>
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
                            </>
                          )}
                        {(hasPermission("manage_maintenance") || isOwner) &&
                          (editingTechnician === req.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={technicianInput}
                                onChange={(e) =>
                                  setTechnicianInput(e.target.value)
                                }
                                className="border border-[#E2E8F0] rounded px-2 py-1 text-xs w-36"
                                placeholder="Teknisyen adı"
                              />
                              <Button
                                size="sm"
                                className="text-xs rounded-full h-7 bg-[#4A90D9] text-white"
                                onClick={() => {
                                  setMaintTechnicianMap((prev) => ({
                                    ...prev,
                                    [req.id]: technicianInput,
                                  }));
                                  setEditingTechnician(null);
                                  setTechnicianInput("");
                                }}
                              >
                                Ata
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-xs h-7"
                                onClick={() => setEditingTechnician(null)}
                              >
                                İptal
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs rounded-full"
                              onClick={() => {
                                setEditingTechnician(req.id);
                                setTechnicianInput(
                                  maintTechnicianMap[req.id] || "",
                                );
                              }}
                            >
                              {technician
                                ? "Teknisyeni Değiştir"
                                : "Teknisyen Ata"}
                            </Button>
                          ))}
                        {isOwner && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs rounded-full"
                            onClick={() => {
                              const levels = [
                                "Düşük",
                                "Orta",
                                "Yüksek",
                                "Kritik",
                              ];
                              const cur = maintPriorityMap[req.id] || "Orta";
                              const next =
                                levels[
                                  (levels.indexOf(cur) + 1) % levels.length
                                ];
                              setMaintPriorityMap((prev) => ({
                                ...prev,
                                [req.id]: next,
                              }));
                            }}
                          >
                            ↑ Önceliği Yükselt
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Apartments */}
          <Suspense
            fallback={
              <div className="flex items-center justify-center p-12 text-gray-400">
                Yükleniyor...
              </div>
            }
          >
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
            {activeTab === "vehicles" && buildingId && (
              <VehicleParking
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner || hasPermission("manage_users")}
                t={t}
              />
            )}
            {activeTab === "meters" && buildingId && (
              <MeterTracking
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner || hasPermission("manage_users")}
                t={t}
              />
            )}
            {activeTab === "complaints" && buildingId && (
              <ComplaintBox
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner || hasPermission("manage_users")}
                t={t}
              />
            )}
            {activeTab === "emergency" && buildingId && (
              <EmergencyContacts
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner || hasPermission("manage_users")}
                t={t}
              />
            )}
            {activeTab === "packages" && buildingId && (
              <PackageTracking
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner || hasPermission("manage_users")}
                t={t}
              />
            )}
            {activeTab === "staffMgmt" && buildingId && (
              <StaffManagement
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner || hasPermission("manage_users")}
                t={t}
              />
            )}
            {activeTab === "budget" && buildingId && (
              <BudgetAccounting
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner || hasPermission("manage_users")}
                t={t}
              />
            )}
            {activeTab === "buildingRules" && buildingId && (
              <BuildingRules
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner || hasPermission("manage_users")}
                t={t}
              />
            )}
            {activeTab === "security" && buildingId && userId && (
              <SecurityIncidents
                buildingId={buildingId}
                userId={userId}
                isOwnerOrManager={isOwner || hasPermission("manage_users")}
                t={t}
              />
            )}
            {activeTab === "energy" && buildingId && (
              <EnergyEfficiency
                buildingId={buildingId}
                isOwnerOrManager={isOwner || hasPermission("manage_users")}
                t={t}
              />
            )}
            {activeTab === "lostFound" && buildingId && userId && (
              <LostFound
                buildingId={buildingId}
                userId={userId}
                isOwnerOrManager={isOwner || hasPermission("manage_users")}
                t={t}
              />
            )}
            {activeTab === "maintSchedule" && buildingId && (
              <MaintenanceSchedule
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner || hasPermission("manage_users")}
                t={t}
              />
            )}
            {activeTab === "serviceProviders" && buildingId && (
              <ServiceProviders
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner || hasPermission("manage_users")}
                t={t}
              />
            )}
            {activeTab === "bulletin" && buildingId && (
              <BulletinBoard
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner}
                t={t}
              />
            )}
            {activeTab === "moving" && buildingId && (
              <MovingManagement
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner || hasPermission("manage_users")}
                t={t}
              />
            )}
            {activeTab === "cleaning" && buildingId && (
              <CleaningSchedule
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner || hasPermission("manage_users")}
                t={t}
              />
            )}
            {activeTab === "insurance" && buildingId && (
              <InsuranceWarranty
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner || hasPermission("manage_users")}
                t={t}
              />
            )}

            {activeTab === "reporting" && buildingId && (
              <ReportingCenter buildingId={buildingId} t={t} />
            )}
            {activeTab === "committee" && buildingId && (
              <CommitteeManagement
                buildingId={buildingId}
                isOwner={isOwner || hasPermission("manage_users")}
                t={t}
              />
            )}
            {activeTab === "subscriptions" && buildingId && (
              <SubscriptionTracking
                buildingId={buildingId}
                isOwner={isOwner || hasPermission("manage_users")}
                t={t}
              />
            )}
            {activeTab === "renovationPermits" && buildingId && (
              <RenovationPermits
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner}
                t={t}
              />
            )}
            {activeTab === "forum" && buildingId && (
              <NeighborForum
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner}
                t={t}
              />
            )}
            {activeTab === "visitorPreAuth" && buildingId && (
              <VisitorPreAuth
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner}
                t={t}
              />
            )}
            {activeTab === "helpCenter" && buildingId && (
              <HelpCenter
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner}
                t={t}
              />
            )}
            {activeTab === "budgetPlanning" && buildingId && (
              <BudgetPlanning
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner}
                t={t}
              />
            )}
            {activeTab === "duesPaymentPlan" && buildingId && (
              <DuesPaymentPlan
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner}
                t={t}
              />
            )}
            {activeTab === "emergencyPlan" && buildingId && (
              <EmergencyActionPlan
                buildingId={buildingId}
                isOwner={isOwner}
                t={t}
              />
            )}
            {activeTab === "residentSatisfaction" && buildingId && (
              <ResidentSatisfaction buildingId={buildingId} t={t} />
            )}
            {activeTab === "apartmentValuation" && buildingId && (
              <ApartmentValuation buildingId={buildingId} t={t} />
            )}
            {activeTab === "wasteManagement" && buildingId && (
              <WasteManagement buildingId={buildingId} t={t} />
            )}
            {activeTab === "petManagement" && buildingId && (
              <PetManagement buildingId={buildingId} isOwner={isOwner} t={t} />
            )}
            {activeTab === "legalDebt" && buildingId && (
              <LegalDebtTracking
                buildingId={buildingId}
                isOwner={isOwner}
                t={t}
              />
            )}
            {activeTab === "guestParking" && buildingId && (
              <GuestParking buildingId={buildingId} isOwner={isOwner} t={t} />
            )}
            {activeTab === "mediaArchive" && buildingId && (
              <BuildingMediaArchive
                buildingId={buildingId}
                isOwner={isOwner}
                t={t}
              />
            )}
            {activeTab === "projectManagement" && buildingId && (
              <ProjectManagement
                buildingId={buildingId}
                isOwner={isOwner}
                t={t}
              />
            )}
            {activeTab === "election" && buildingId && (
              <ElectionManagement
                buildingId={buildingId}
                isOwner={isOwner}
                t={t}
              />
            )}
            {activeTab === "digitalBulletin" && buildingId && (
              <DigitalBulletin
                buildingId={buildingId}
                isOwner={isOwner}
                t={t}
              />
            )}
            {activeTab === "depot" && buildingId && (
              <DepotManagement
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "residentOnboarding" && buildingId && (
              <ResidentOnboarding
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "accessKeys" && buildingId && (
              <AccessKeyManagement
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "workOrders" && buildingId && (
              <WorkOrderManagement
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "invoiceTracking" && buildingId && (
              <InvoiceTracking
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "repairQuotes" && buildingId && (
              <RepairQuoteManagement
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "heatingCost" && buildingId && (
              <HeatingCostDistribution
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "activityReport" && buildingId && (
              <ManagementActivityReport
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "residentTasks" && buildingId && (
              <ResidentTasks
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "parkingAllocation" && buildingId && (
              <ParkingAllocation
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "disabledSupport" && buildingId && (
              <DisabledElderlySupport
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "supplierContracts" && buildingId && (
              <SupplierContractPerformance
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "facilityEquipment" && buildingId && (
              <FacilityEquipment
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "duesTransparency" && buildingId && (
              <DuesTransparency
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "serviceRequests" && buildingId && (
              <ResidentServiceRequests
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "childSportsFacility" && buildingId && (
              <ChildSportsFacility
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "disasterPreparedness" && buildingId && (
              <DisasterPreparedness
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "neighborhoodGuide" && buildingId && (
              <NeighborhoodGuide
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "residentRewards" && buildingId && (
              <ResidentRewards
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "boardDecisionRegister" && buildingId && (
              <BoardDecisionRegister
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "emergencyServiceGuide" && buildingId && (
              <EmergencyServiceGuide
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "residentProfile" && buildingId && (
              <ResidentProfile
                buildingId={buildingId}
                userId={userId || ""}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "disputeResolution" && buildingId && (
              <DisputeResolution
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "buildingTechSpec" && buildingId && (
              <BuildingTechSpec
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "socialEvents" && buildingId && (
              <SocialEvents
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "staffLeave" && buildingId && (
              <StaffLeaveManagement
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "tenantManagement" && buildingId && (
              <TenantManagement
                buildingId={buildingId}
                isOwner={isOwner}
                t={t as any}
              />
            )}
            {activeTab === "vehicleMaintenance" && (
              <VehicleMaintenanceTracking t={t as any} />
            )}
            {activeTab === "energyConsumption" && <EnergyConsumption />}
            {activeTab === "insuranceClaims" && <InsuranceClaimManagement />}
          </Suspense>
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
            <div>
              <p className="text-sm font-medium block mb-2">Hedef Kitle</p>
              <div className="flex flex-col gap-2">
                {[
                  ["all", "Tüm Sakinler"],
                  ["floors", "Belirli Katlar"],
                  ["apartments", "Belirli Daireler"],
                ].map(([val, label]) => (
                  <label
                    key={val}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      checked={annAudience === val}
                      onChange={() => setAnnAudience(val)}
                    />
                    <span className="text-sm text-[#0E1116]">{label}</span>
                  </label>
                ))}
              </div>
              {annAudience === "floors" && (
                <input
                  value={annAudienceDetail}
                  onChange={(e) => setAnnAudienceDetail(e.target.value)}
                  placeholder="Örn: 1,2,3"
                  className="mt-2 w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                />
              )}
              {annAudience === "apartments" && (
                <input
                  value={annAudienceDetail}
                  onChange={(e) => setAnnAudienceDetail(e.target.value)}
                  placeholder="Örn: A-1,B-3,C-7"
                  className="mt-2 w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                />
              )}
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
            <div>
              <p className="text-sm font-medium block mb-1">Öncelik</p>
              <select
                value={maintPriority}
                onChange={(e) => setMaintPriority(e.target.value)}
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
              >
                <option>Düşük</option>
                <option>Orta</option>
                <option>Yüksek</option>
                <option>Kritik</option>
              </select>
            </div>
            <div>
              <p className="text-sm font-medium block mb-1">
                Fotoğraf (isteğe bağlı)
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    if (ev.target?.result)
                      setMaintPhotoMap((prev) => ({
                        ...prev,
                        _pending: String(ev.target!.result),
                      }));
                  };
                  reader.readAsDataURL(file);
                }}
                className="w-full text-sm text-[#3A4654]"
              />
            </div>
            <Button
              onClick={async () => {
                if (!backend || !userId || !buildingId || !maintTitle.trim())
                  return;
                setSubmitting(true);
                try {
                  const result = await backend.createMaintenanceRequest(
                    userId,
                    buildingId,
                    maintTitle.trim(),
                    maintDesc.trim(),
                  );
                  if ("ok" in result) {
                    const newId = result.ok.id || Date.now().toString();
                    setMaintPriorityMap((prev) => ({
                      ...prev,
                      [newId]: maintPriority,
                    }));
                    if (maintPhotoMap._pending) {
                      setMaintPhotoMap((prev) => {
                        const { _pending, ...rest } = prev;
                        return { ...rest, [newId]: _pending };
                      });
                    }
                    await loadAll();
                    setShowMaintModal(false);
                    setMaintTitle("");
                    setMaintDesc("");
                    setMaintPriority("Orta");
                  }
                } catch {}
                setSubmitting(false);
              }}
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
