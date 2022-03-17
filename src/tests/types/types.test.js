import { types } from "../../types/types";

describe("Testing types", () => {
  test("should be same", () => {
    expect(types).toEqual({
      uiOpenModal: "[UI] Open Modal",
      uiCloseModal: "[UI] Close Modal",

      eventLoaded: "[events] Loaded",
      eventSetCurrent: "[event] Set Current",
      eventStartAddNew: "[event] Start add new",
      eventAddNew: "[event] Add New",
      eventCleanCurrent: "[event] Clean Current",
      eventUpdateCurrent: "[event] Update Current",
      eventDelete: "[event] Delete event",
      eventLogout: "[event] Logout events",

      authLogin: "[auth] Login",
      authChecking: "[auth] Checking",
      authCheckingFinish: "[auth] Checking Finish",
      authRegister: "[auth] Register",
      authRenew: "[auth] Renew",
      authLogout: "[auth] Logout",
    });
  });
});
