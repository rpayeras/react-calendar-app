import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { LoginScreen } from "../../components/auth/LoginScreen";
import { MemoryRouter } from "react-router";
import { createMemoryHistory } from "history";
import { startLogin, startRegister } from "../../actions/auth";
import Swal from "sweetalert2";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    checking: false,
  },
};

let store = mockStore(initState);
const history = createMemoryHistory();

store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

jest.mock("../../actions/auth", () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));

Swal.fire = jest.fn();

describe("Testing LoginScreen component", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should call dispatch login", () => {
    wrapper.find('input[name="lEmail"]').simulate("change", {
      target: {
        name: "lEmail",
        value: "email12@test.com",
      },
    });

    wrapper.find('input[name="lPassword"]').simulate("change", {
      target: {
        name: "lPassword",
        value: "123456",
      },
    });

    wrapper.find("form").at(0).prop("onSubmit")({
      preventDefault() {},
    });

    expect(startLogin).toHaveBeenCalledWith("email12@test.com", "123456");
  });

  test("should call dispatch register", () => {
    wrapper.find('input[name="rName"]').simulate("change", {
      target: {
        name: "rName",
        value: "User",
      },
    });

    wrapper.find('input[name="rEmail"]').simulate("change", {
      target: {
        name: "rEmail",
        value: "email12@test.com",
      },
    });

    wrapper.find('input[name="rPassword"]').simulate("change", {
      target: {
        name: "rPassword",
        value: "123456",
      },
    });

    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: {
        name: "rPassword2",
        value: "123456",
      },
    });

    wrapper.find("form").at(1).prop("onSubmit")({
      preventDefault() {},
    });

    expect(startRegister).toHaveBeenCalledWith(
      "User",
      "email12@test.com",
      "123456"
    );
  });

  test("should detect passwords are not same and show alert", () => {
    wrapper.find('input[name="rName"]').simulate("change", {
      target: {
        name: "rName",
        value: "User",
      },
    });

    wrapper.find('input[name="rEmail"]').simulate("change", {
      target: {
        name: "rEmail",
        value: "email12@test.com",
      },
    });

    wrapper.find('input[name="rPassword"]').simulate("change", {
      target: {
        name: "rPassword",
        value: "123456",
      },
    });

    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: {
        name: "rPassword",
        value: "32424222",
      },
    });

    wrapper.find("form").at(1).prop("onSubmit")({
      preventDefault() {},
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Passwords must be the same",
      "error"
    );
    expect(startRegister).not.toHaveBeenCalled();
  });
});
