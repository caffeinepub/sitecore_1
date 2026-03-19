export interface User {
  id: string;
  displayName: string;
  loginCode: string;
  createdAt: bigint;
}

export interface Building {
  id: string;
  name: string;
  address: string;
  ownerUserId: string;
  createdAt: bigint;
}

export interface Role {
  id: string;
  buildingId: string;
  name: string;
  permissions: string[];
  isDefault: boolean;
}

export interface UserWithRoles {
  user: User;
  roleIds: string[];
}

export interface Announcement {
  id: string;
  buildingId: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: bigint;
}

export type MaintenanceStatus =
  | { pending: null }
  | { inProgress: null }
  | { resolved: null };

export interface MaintenanceRequest {
  id: string;
  buildingId: string;
  requesterId: string;
  assignedTo: [] | [string];
  title: string;
  description: string;
  status: MaintenanceStatus;
  createdAt: bigint;
  updatedAt: bigint;
}

export type Result<T> = { ok: T } | { err: string };

export interface BackendActor {
  registerUser(
    displayName: string,
  ): Promise<Result<{ userId: string; loginCode: string }>>;
  loginWithCode(code: string): Promise<Result<User>>;
  getUserById(userId: string): Promise<Result<User>>;
  createBuilding(
    ownerUserId: string,
    name: string,
    address: string,
  ): Promise<Result<Building>>;
  getBuildingsForUser(userId: string): Promise<Building[]>;
  getBuildingById(buildingId: string): Promise<Result<Building>>;
  getRolesForBuilding(buildingId: string): Promise<Role[]>;
  createRole(
    requesterId: string,
    buildingId: string,
    name: string,
    permissions: string[],
  ): Promise<Result<Role>>;
  deleteRole(
    requesterId: string,
    buildingId: string,
    roleId: string,
  ): Promise<Result<null>>;
  addUserToBuilding(
    requesterId: string,
    buildingId: string,
    targetUserId: string,
    roleIds: string[],
  ): Promise<Result<null>>;
  removeUserFromBuilding(
    requesterId: string,
    buildingId: string,
    targetUserId: string,
  ): Promise<Result<null>>;
  getUsersInBuilding(
    requesterId: string,
    buildingId: string,
  ): Promise<Result<UserWithRoles[]>>;
  getUserRolesInBuilding(userId: string, buildingId: string): Promise<string[]>;
  generateInviteCode(
    requesterId: string,
    buildingId: string,
    roleId: string,
  ): Promise<Result<string>>;
  useInviteCode(
    userId: string,
    code: string,
  ): Promise<Result<{ buildingId: string; roleId: string }>>;
  createAnnouncement(
    authorId: string,
    buildingId: string,
    title: string,
    content: string,
  ): Promise<Result<Announcement>>;
  getAnnouncementsForBuilding(
    userId: string,
    buildingId: string,
  ): Promise<Result<Announcement[]>>;
  deleteAnnouncement(
    requesterId: string,
    buildingId: string,
    announcementId: string,
  ): Promise<Result<null>>;
  createMaintenanceRequest(
    requesterId: string,
    buildingId: string,
    title: string,
    description: string,
  ): Promise<Result<MaintenanceRequest>>;
  getMaintenanceRequestsForBuilding(
    userId: string,
    buildingId: string,
  ): Promise<Result<MaintenanceRequest[]>>;
  updateMaintenanceStatus(
    requesterId: string,
    buildingId: string,
    requestId: string,
    status: MaintenanceStatus,
    assignedTo: [] | [string],
  ): Promise<Result<MaintenanceRequest>>;
}

export const LANGUAGES = [
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
];

export interface Apartment {
  id: string;
  buildingId: string;
  number: string;
  floor: number;
  block: string;
  type: string;
  residentUserId: string;
  residentName: string;
  createdAt: number;
}

export interface DueRecord {
  id: string;
  buildingId: string;
  apartmentId: string;
  month: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  paidAt?: number;
  note: string;
}

export interface Visitor {
  id: string;
  buildingId: string;
  name: string;
  apartmentId: string;
  expectedDate: string;
  description: string;
  status: "expected" | "arrived" | "left";
  arrivedAt?: number;
  leftAt?: number;
  createdAt: number;
}

export interface Expense {
  id: string;
  buildingId: string;
  title: string;
  amount: number;
  category: "electricity" | "water" | "cleaning" | "elevator" | "other";
  date: string;
  note: string;
  createdAt: number;
}

export interface SurveyOption {
  id: string;
  text: string;
  votes: string[];
}

export interface Survey {
  id: string;
  buildingId: string;
  title: string;
  description: string;
  options: SurveyOption[];
  createdBy: string;
  createdAt: number;
  closedAt?: number;
  isActive: boolean;
}
