import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { CalendarModal } from "../../../components/calendar/CalendarModal";
import moment from "moment";
import {
  eventCleanCurrent,
  eventStartAddNew,
  eventStartUpdateCurrent,
} from "../../../actions/calendar";
import { uiCloseModal } from "../../../actions/ui";
import { act } from "react-dom/test-utils";
import Swal from "sweetalert2";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  calendar: {
    events: [],
    current: {
      id: "test1234",
      title: "test event",
      startDate: moment().minutes(0).seconds(0).add(1, "hours").toDate(),
      endDate: moment().minutes(0).seconds(0).add(4, "hours").toDate(),
      bgcolor: "#FAFAFA",
      notes: "",
      user: {
        id: "123qwe",
        name: "User",
      },
    },
  },
  auth: {
    uid: "123",
    name: "user",
  },
  ui: {
    modalOpen: true,
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();
Storage.prototype.setItem = jest.fn();

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

jest.mock("../../../actions/calendar", () => ({
  eventStartUpdateCurrent: jest.fn(),
  eventStartAddNew: jest.fn(),
  eventCleanCurrent: jest.fn(),
}));

jest.mock("../../../actions/ui", () => ({
  uiCloseModal: jest.fn(),
}));

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe("Testing Calendar Modal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render modal", () => {
    expect(wrapper.find("Modal").prop("isOpen")).toBe(true);
  });

  test("should call open and close modal", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(eventStartUpdateCurrent).toHaveBeenCalledWith(
      initState.calendar.current
    );
    expect(eventCleanCurrent).toHaveBeenCalled();
  });

  test("should show error if title is empty", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(wrapper.find('input[name="title"]').hasClass("is-invalid")).toBe(
      true
    );
  });

  test("should create an event", () => {
    const initState = {
      calendar: {
        events: [],
        current: null,
      },
      auth: {
        uid: "123",
        name: "user",
      },
      ui: {
        modalOpen: true,
      },
    };

    const store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Testing",
      },
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(eventStartAddNew).toHaveBeenCalledWith({
      bgcolor: "#FAFAFA",
      endDate: expect.anything(),
      startDate: expect.anything(),
      title: "Testing",
      notes: "",
      user: expect.anything(),
    });

    expect(eventCleanCurrent).toHaveBeenCalled();
  });

  test("should validate dates", () => {
    const today = new Date();

    act(() => {
      wrapper.find("DateTimePicker").at(1).prop("onChange")(today);
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Date end should be major than start"
    );
  });
});
