import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/es";

import { Calendar, momentLocalizer } from "react-big-calendar";
import { messages } from "../../helpers/calendar-messages";

import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { Navbar } from "../ui/Navbar";

import { uiOpenModal } from "../../actions/ui";
import { useSelector, useDispatch } from "react-redux";
import {
  eventCleanCurrent,
  eventSetCurrent,
  eventStartLoading,
} from "../../actions/calendar";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

moment.locale("es");
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );
  const dispatch = useDispatch();
  const { events, current } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onViewChange = (e) => {
    localStorage.setItem("lastView", e);
    setLastView(e);
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetCurrent(e));
  };

  const onSelectedSlot = (e) => {
    dispatch(eventCleanCurrent());
    dispatch(uiOpenModal());
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user._id ? "#367CF7" : "#464646",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return {
      style,
    };
  };

  return (
    <section className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="startDate"
        endAccessor="endDate"
        style={{ height: 500 }}
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onSelectedSlot={onSelectedSlot}
        selectable={true}
        components={{
          event: CalendarEvent,
        }}
        view={lastView}
      />
      <AddNewFab />
      {current && <DeleteEventFab />}

      <CalendarModal />
    </section>
  );
};
