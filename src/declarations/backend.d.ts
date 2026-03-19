import { ActorMethod } from '@dfinity/agent';

export type UserId = string;
export type BuildingId = string;
export type RoleId = string;

export interface User {
  id: UserId;
  displayName: string;
  loginCode: string;
  createdAt: bigint;
}

export interface Building {
  id: BuildingId;
  name: string;
  address: string;
  ownerUserId: UserId;
  createdAt: bigint;
}

export interface Role {
  id: RoleId;
  buildingId: BuildingId;
  name: string;
  permissions: string[];
  isDefault: boolean;
}

export interface UserBuildingRole {
  userId: UserId;
  buildingId: BuildingId;
  roleIds: RoleId[];
  addedAt: bigint;
}

export type MaintenanceStatus = { pending: null } | { inProgress: null } | { resolved: null };

export interface MaintenanceRequest {
  id: string;
  buildingId: BuildingId;
  requesterId: UserId;
  assignedTo: [] | [UserId];
  title: string;
  description: string;
  status: MaintenanceStatus;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface Announcement {
  id: string;
  buildingId: BuildingId;
  title: string;
  content: string;
  authorId: UserId;
  createdAt: bigint;
}

export type Result<T, E> = { ok: T } | { err: E };

export interface _SERVICE {
  registerUser: ActorMethod<[string], Result<{ userId: string; loginCode: string }, string>>;
  loginWithCode: ActorMethod<[string], Result<User, string>>;
  getUserById: ActorMethod<[UserId], Result<User, string>>;
  createBuilding: ActorMethod<[UserId, string, string], Result<Building, string>>;
  getBuildingsForUser: ActorMethod<[UserId], Building[]>;
  getBuildingById: ActorMethod<[BuildingId], Result<Building, string>>;
  getRolesForBuilding: ActorMethod<[BuildingId], Role[]>;
  createRole: ActorMethod<[UserId, BuildingId, string, string[]], Result<Role, string>>;
  deleteRole: ActorMethod<[UserId, BuildingId, RoleId], Result<null, string>>;
  addUserToBuilding: ActorMethod<[UserId, BuildingId, UserId, RoleId[]], Result<null, string>>;
  removeUserFromBuilding: ActorMethod<[UserId, BuildingId, UserId], Result<null, string>>;
  getUsersInBuilding: ActorMethod<[UserId, BuildingId], Result<Array<{ user: User; roleIds: RoleId[] }>, string>>;
  getUserRolesInBuilding: ActorMethod<[UserId, BuildingId], RoleId[]>;
  generateInviteCode: ActorMethod<[UserId, BuildingId, RoleId], Result<string, string>>;
  useInviteCode: ActorMethod<[UserId, string], Result<{ buildingId: BuildingId; roleId: RoleId }, string>>;
  createAnnouncement: ActorMethod<[UserId, BuildingId, string, string], Result<Announcement, string>>;
  getAnnouncementsForBuilding: ActorMethod<[UserId, BuildingId], Result<Announcement[], string>>;
  deleteAnnouncement: ActorMethod<[UserId, BuildingId, string], Result<null, string>>;
  createMaintenanceRequest: ActorMethod<[UserId, BuildingId, string, string], Result<MaintenanceRequest, string>>;
  getMaintenanceRequestsForBuilding: ActorMethod<[UserId, BuildingId], Result<MaintenanceRequest[], string>>;
  updateMaintenanceStatus: ActorMethod<[UserId, BuildingId, string, MaintenanceStatus, [] | [UserId]], Result<MaintenanceRequest, string>>;
}
