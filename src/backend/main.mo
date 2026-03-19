import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Time "mo:core/Time";

actor SiteCore {

  // ==================== TYPES ====================

  type UserId = Text;
  type BuildingId = Text;
  type RoleId = Text;
  type InviteCode = Text;

  type User = {
    id : UserId;
    displayName : Text;
    loginCode : Text;
    createdAt : Int;
  };

  type Building = {
    id : BuildingId;
    name : Text;
    address : Text;
    ownerUserId : UserId;
    createdAt : Int;
  };

  type Role = {
    id : RoleId;
    buildingId : BuildingId;
    name : Text;
    permissions : [Text];
    isDefault : Bool;
  };

  type UserBuildingRole = {
    userId : UserId;
    buildingId : BuildingId;
    roleIds : [RoleId];
    addedAt : Int;
  };

  type InviteCodeRecord = {
    code : InviteCode;
    buildingId : BuildingId;
    roleId : RoleId;
    createdBy : UserId;
    used : Bool;
    createdAt : Int;
  };

  type Announcement = {
    id : Text;
    buildingId : BuildingId;
    title : Text;
    content : Text;
    authorId : UserId;
    createdAt : Int;
  };

  type MaintenanceStatus = { #pending; #inProgress; #resolved };

  type MaintenanceRequest = {
    id : Text;
    buildingId : BuildingId;
    requesterId : UserId;
    assignedTo : ?UserId;
    title : Text;
    description : Text;
    status : MaintenanceStatus;
    createdAt : Int;
    updatedAt : Int;
  };

  // ==================== STATE ====================

  let users : Map.Map<Text, User> = Map.empty<Text, User>();
  let loginCodeIndex : Map.Map<Text, UserId> = Map.empty<Text, UserId>();
  let buildings : Map.Map<Text, Building> = Map.empty<Text, Building>();
  let roles : Map.Map<Text, Role> = Map.empty<Text, Role>();
  let userBuildingRoles : Map.Map<Text, UserBuildingRole> = Map.empty<Text, UserBuildingRole>();
  let inviteCodes : Map.Map<Text, InviteCodeRecord> = Map.empty<Text, InviteCodeRecord>();
  let announcements : Map.Map<Text, Announcement> = Map.empty<Text, Announcement>();
  let maintenanceRequests : Map.Map<Text, MaintenanceRequest> = Map.empty<Text, MaintenanceRequest>();
  var idCounter : Nat = 0;

  // ==================== HELPERS ====================

  func generateId() : Text {
    idCounter += 1;
    let t = Time.now();
    let tNat = Int.abs(t % 1_000_000);
    idCounter.toText() # "-" # tNat.toText()
  };

  func generateCode(length : Nat) : Text {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let charArray = chars.toVarArray();
    idCounter += 1;
    let t = Time.now();
    var seed = Int.abs(t) + idCounter * 999983;
    var code = "";
    var i = 0;
    while (i < length) {
      let idx = seed % 36;
      let c = charArray[idx].toText();
      code := code # c;
      seed := (seed * 6364136223 + 1442695040) % 2147483647;
      i += 1;
    };
    code
  };

  func ubKey(userId : UserId, buildingId : BuildingId) : Text {
    userId # "#" # buildingId
  };

  func hasPermission(userId : UserId, buildingId : BuildingId, permission : Text) : Bool {
    switch (buildings.get(buildingId)) {
      case null { false };
      case (?b) {
        if (b.ownerUserId == userId) { return true };
        switch (userBuildingRoles.get(ubKey(userId, buildingId))) {
          case null { false };
          case (?ubr) {
            var hasPerm = false;
            for (rid in ubr.roleIds.vals()) {
              switch (roles.get(rid)) {
                case null {};
                case (?r) {
                  for (p in r.permissions.vals()) {
                    if (p == permission or p == "admin") { hasPerm := true };
                  };
                };
              };
            };
            hasPerm
          };
        };
      };
    }
  };

  // ==================== USER APIs ====================

  public func registerUser(displayName : Text) : async { #ok : { userId : Text; loginCode : Text }; #err : Text } {
    var code = generateCode(16);
    var attempts = 0;
    while (loginCodeIndex.get(code) != null and attempts < 10) {
      code := generateCode(16);
      attempts += 1;
    };
    let uid = generateId();
    let user : User = {
      id = uid;
      displayName = displayName;
      loginCode = code;
      createdAt = Time.now();
    };
    users.add(uid, user);
    loginCodeIndex.add(code, uid);
    #ok({ userId = uid; loginCode = code })
  };

  public query func loginWithCode(code : Text) : async { #ok : User; #err : Text } {
    switch (loginCodeIndex.get(code)) {
      case null { #err("Gecersiz giris kodu") };
      case (?uid) {
        switch (users.get(uid)) {
          case null { #err("Kullanici bulunamadi") };
          case (?u) { #ok(u) };
        }
      };
    }
  };

  public query func getUserById(userId : UserId) : async { #ok : User; #err : Text } {
    switch (users.get(userId)) {
      case null { #err("Kullanici bulunamadi") };
      case (?u) { #ok(u) };
    }
  };

  // ==================== BUILDING APIs ====================

  public func createBuilding(ownerUserId : UserId, name : Text, address : Text) : async { #ok : Building; #err : Text } {
    switch (users.get(ownerUserId)) {
      case null { #err("Kullanici bulunamadi") };
      case (?_) {
        let bid = generateId();
        let building : Building = {
          id = bid;
          name = name;
          address = address;
          ownerUserId = ownerUserId;
          createdAt = Time.now();
        };
        buildings.add(bid, building);
        let managerRoleId = generateId();
        let residentRoleId = generateId();
        let staffRoleId = generateId();
        roles.add(managerRoleId, { id = managerRoleId; buildingId = bid; name = "Bina Yoneticisi"; permissions = ["manage_users", "manage_announcements", "manage_maintenance"]; isDefault = true });
        roles.add(residentRoleId, { id = residentRoleId; buildingId = bid; name = "Daire Sakini"; permissions = ["view_announcements", "create_maintenance"]; isDefault = true });
        roles.add(staffRoleId, { id = staffRoleId; buildingId = bid; name = "Yardimci Personel"; permissions = ["view_maintenance", "update_maintenance"]; isDefault = true });
        userBuildingRoles.add(ubKey(ownerUserId, bid), { userId = ownerUserId; buildingId = bid; roleIds = []; addedAt = Time.now() });
        #ok(building)
      };
    }
  };

  public query func getBuildingsForUser(userId : UserId) : async [Building] {
    var result : [Building] = [];
    for ((_, ubr) in userBuildingRoles.entries()) {
      if (ubr.userId == userId) {
        switch (buildings.get(ubr.buildingId)) {
          case null {};
          case (?b) { result := result.concat([b]) };
        };
      };
    };
    for ((_, b) in buildings.entries()) {
      if (b.ownerUserId == userId) {
        var found = false;
        for (rb in result.vals()) {
          if (rb.id == b.id) { found := true };
        };
        if (not found) { result := result.concat([b]) };
      };
    };
    result
  };

  public query func getBuildingById(buildingId : BuildingId) : async { #ok : Building; #err : Text } {
    switch (buildings.get(buildingId)) {
      case null { #err("Bina bulunamadi") };
      case (?b) { #ok(b) };
    }
  };

  // ==================== ROLE APIs ====================

  public query func getRolesForBuilding(buildingId : BuildingId) : async [Role] {
    var result : [Role] = [];
    for ((_, r) in roles.entries()) {
      if (r.buildingId == buildingId) {
        result := result.concat([r]);
      };
    };
    result
  };

  public func createRole(requesterId : UserId, buildingId : BuildingId, name : Text, permissions : [Text]) : async { #ok : Role; #err : Text } {
    if (not hasPermission(requesterId, buildingId, "admin")) {
      return #err("Yetkiniz yok");
    };
    let rid = generateId();
    let role : Role = { id = rid; buildingId = buildingId; name = name; permissions = permissions; isDefault = false };
    roles.add(rid, role);
    #ok(role)
  };

  public func deleteRole(requesterId : UserId, buildingId : BuildingId, roleId : RoleId) : async { #ok : (); #err : Text } {
    if (not hasPermission(requesterId, buildingId, "admin")) {
      return #err("Yetkiniz yok");
    };
    switch (roles.get(roleId)) {
      case null { #err("Rol bulunamadi") };
      case (?r) {
        if (r.isDefault) { return #err("Varsayilan roller silinemez") };
        roles.remove(roleId);
        #ok(())
      };
    }
  };

  // ==================== USER MANAGEMENT ====================

  public func addUserToBuilding(requesterId : UserId, buildingId : BuildingId, targetUserId : UserId, newRoleIds : [RoleId]) : async { #ok : (); #err : Text } {
    if (not hasPermission(requesterId, buildingId, "manage_users")) {
      return #err("Yetkiniz yok");
    };
    switch (users.get(targetUserId)) {
      case null { return #err("Kullanici bulunamadi") };
      case (?_) {};
    };
    let key = ubKey(targetUserId, buildingId);
    switch (userBuildingRoles.get(key)) {
      case (?existing) {
        let merged = existing.roleIds.concat(newRoleIds);
        userBuildingRoles.add(key, { userId = targetUserId; buildingId = buildingId; roleIds = merged; addedAt = existing.addedAt });
      };
      case null {
        userBuildingRoles.add(key, { userId = targetUserId; buildingId = buildingId; roleIds = newRoleIds; addedAt = Time.now() });
      };
    };
    #ok(())
  };

  public func removeUserFromBuilding(requesterId : UserId, buildingId : BuildingId, targetUserId : UserId) : async { #ok : (); #err : Text } {
    if (not hasPermission(requesterId, buildingId, "manage_users")) {
      return #err("Yetkiniz yok");
    };
    userBuildingRoles.remove(ubKey(targetUserId, buildingId));
    #ok(())
  };

  public query func getUsersInBuilding(requesterId : UserId, buildingId : BuildingId) : async { #ok : [{ user : User; roleIds : [RoleId] }]; #err : Text } {
    if (not hasPermission(requesterId, buildingId, "manage_users")) {
      return #err("Yetkiniz yok");
    };
    var result : [{ user : User; roleIds : [RoleId] }] = [];
    for ((_, ubr) in userBuildingRoles.entries()) {
      if (ubr.buildingId == buildingId) {
        switch (users.get(ubr.userId)) {
          case null {};
          case (?u) {
            result := result.concat([{ user = u; roleIds = ubr.roleIds }]);
          };
        };
      };
    };
    #ok(result)
  };

  public query func getUserRolesInBuilding(userId : UserId, buildingId : BuildingId) : async [RoleId] {
    switch (userBuildingRoles.get(ubKey(userId, buildingId))) {
      case null { [] };
      case (?ubr) { ubr.roleIds };
    }
  };

  // ==================== INVITE CODES ====================

  public func generateInviteCode(requesterId : UserId, buildingId : BuildingId, roleId : RoleId) : async { #ok : Text; #err : Text } {
    if (not hasPermission(requesterId, buildingId, "manage_users")) {
      return #err("Yetkiniz yok");
    };
    var code = generateCode(8);
    var attempts = 0;
    while (inviteCodes.get(code) != null and attempts < 10) {
      code := generateCode(8);
      attempts += 1;
    };
    inviteCodes.add(code, { code = code; buildingId = buildingId; roleId = roleId; createdBy = requesterId; used = false; createdAt = Time.now() });
    #ok(code)
  };

  public func useInviteCode(userId : UserId, code : InviteCode) : async { #ok : { buildingId : BuildingId; roleId : RoleId }; #err : Text } {
    switch (inviteCodes.get(code)) {
      case null { #err("Gecersiz davet kodu") };
      case (?record) {
        if (record.used) { return #err("Bu davet kodu zaten kullanildi") };
        let key = ubKey(userId, record.buildingId);
        switch (userBuildingRoles.get(key)) {
          case (?existing) {
            let merged = existing.roleIds.concat([record.roleId]);
            userBuildingRoles.add(key, { userId = userId; buildingId = record.buildingId; roleIds = merged; addedAt = existing.addedAt });
          };
          case null {
            userBuildingRoles.add(key, { userId = userId; buildingId = record.buildingId; roleIds = [record.roleId]; addedAt = Time.now() });
          };
        };
        inviteCodes.add(code, { code = record.code; buildingId = record.buildingId; roleId = record.roleId; createdBy = record.createdBy; used = true; createdAt = record.createdAt });
        #ok({ buildingId = record.buildingId; roleId = record.roleId })
      };
    }
  };

  // ==================== ANNOUNCEMENTS ====================

  public func createAnnouncement(authorId : UserId, buildingId : BuildingId, title : Text, content : Text) : async { #ok : Announcement; #err : Text } {
    if (not hasPermission(authorId, buildingId, "manage_announcements")) {
      return #err("Yetkiniz yok");
    };
    let aid = generateId();
    let ann : Announcement = { id = aid; buildingId = buildingId; title = title; content = content; authorId = authorId; createdAt = Time.now() };
    announcements.add(aid, ann);
    #ok(ann)
  };

  public query func getAnnouncementsForBuilding(userId : UserId, buildingId : BuildingId) : async { #ok : [Announcement]; #err : Text } {
    if (not hasPermission(userId, buildingId, "view_announcements") and not hasPermission(userId, buildingId, "manage_announcements")) {
      return #err("Yetkiniz yok");
    };
    var result : [Announcement] = [];
    for ((_, a) in announcements.entries()) {
      if (a.buildingId == buildingId) {
        result := result.concat([a]);
      };
    };
    #ok(result)
  };

  public func deleteAnnouncement(requesterId : UserId, buildingId : BuildingId, announcementId : Text) : async { #ok : (); #err : Text } {
    if (not hasPermission(requesterId, buildingId, "manage_announcements")) {
      return #err("Yetkiniz yok");
    };
    announcements.remove(announcementId);
    #ok(())
  };

  // ==================== MAINTENANCE REQUESTS ====================

  public func createMaintenanceRequest(requesterId : UserId, buildingId : BuildingId, title : Text, description : Text) : async { #ok : MaintenanceRequest; #err : Text } {
    if (not hasPermission(requesterId, buildingId, "create_maintenance") and not hasPermission(requesterId, buildingId, "manage_maintenance")) {
      return #err("Yetkiniz yok");
    };
    let mid = generateId();
    let req : MaintenanceRequest = {
      id = mid;
      buildingId = buildingId;
      requesterId = requesterId;
      assignedTo = null;
      title = title;
      description = description;
      status = #pending;
      createdAt = Time.now();
      updatedAt = Time.now();
    };
    maintenanceRequests.add(mid, req);
    #ok(req)
  };

  public query func getMaintenanceRequestsForBuilding(userId : UserId, buildingId : BuildingId) : async { #ok : [MaintenanceRequest]; #err : Text } {
    if (not hasPermission(userId, buildingId, "view_maintenance") and not hasPermission(userId, buildingId, "manage_maintenance")) {
      return #err("Yetkiniz yok");
    };
    var result : [MaintenanceRequest] = [];
    for ((_, r) in maintenanceRequests.entries()) {
      if (r.buildingId == buildingId) {
        result := result.concat([r]);
      };
    };
    #ok(result)
  };

  public func updateMaintenanceStatus(requesterId : UserId, buildingId : BuildingId, requestId : Text, newStatus : MaintenanceStatus, assignedTo : ?UserId) : async { #ok : MaintenanceRequest; #err : Text } {
    if (not hasPermission(requesterId, buildingId, "update_maintenance") and not hasPermission(requesterId, buildingId, "manage_maintenance")) {
      return #err("Yetkiniz yok");
    };
    switch (maintenanceRequests.get(requestId)) {
      case null { #err("Talep bulunamadi") };
      case (?req) {
        let updated : MaintenanceRequest = {
          id = req.id;
          buildingId = req.buildingId;
          requesterId = req.requesterId;
          assignedTo = assignedTo;
          title = req.title;
          description = req.description;
          status = newStatus;
          createdAt = req.createdAt;
          updatedAt = Time.now();
        };
        maintenanceRequests.add(requestId, updated);
        #ok(updated)
      };
    }
  };

};
