import React from "react";
import PropTypes from "prop-types";

export const CalendarEvent = ({ event }) => {
  const { title, user } = event;

  return (
    <div>
      <strong>{title}</strong>
      <span>{user.name}</span>
    </div>
  );
};

CalendarEvent.propTypes = {
  event: PropTypes.object,
};
