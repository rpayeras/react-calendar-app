import moment from "moment";

export const prepareEvents = (events = []) => {
  return events.map((e) => ({
    ...e,
    endDate: moment(e.endDate).toDate(),
    startDate: moment(e.startDate).toDate(),
  }));
};
