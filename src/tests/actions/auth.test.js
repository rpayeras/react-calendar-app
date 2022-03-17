import "@testing-library/jest-dom";
import Swal from "sweetalert2";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  startChecking,
  startLogin,
  startLogout,
  startRegister,
} from "../../actions/auth";
import { types } from "../../types/types";
import * as fetchModule from "../../helpers/fetch";

Storage.prototype.setItem = jest.fn();
Storage.prototype.clear = jest.fn();

let token = "";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

const testCredentials = {
  email: "email12@test.com",
  password: "123456",
};

describe("Testing auth actions", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("startLogin do login", async () => {
    await store.dispatch(
      startLogin(testCredentials.email, testCredentials.password)
    );
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-created",
      expect.any(Number)
    );

    token = localStorage.setItem.mock.calls[0][1];
  });

  test("startLogin should return error", async () => {
    await store.dispatch(startLogin("wronguser", "wrongpass"));
    const actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalled();
  });

  test("startRegister should register an user", async () => {
    fetchModule.fetchNoToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          data: {
            uid: "123",
            name: "user",
            token: "testtoken",
          },
        };
      },
    }));

    await store.dispatch(startRegister("usertest", "user@mail.com", "123456"));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authRegister,
      payload: {
        uid: "123",
        name: "user",
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-created",
      expect.any(Number)
    );
  });

  test("startChecking should check the user", async () => {
    fetchModule.fetchWithToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          data: {
            uid: "123",
            name: "user",
            token: "testtoken",
          },
        };
      },
    }));

    await store.dispatch(startChecking());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "user",
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-created",
      expect.any(Number)
    );
  });

  test("startLogout should do logout", async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogout,
    });

    expect(localStorage.clear).toHaveBeenCalled();
  });
});
