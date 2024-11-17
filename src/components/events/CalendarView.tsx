import React, { useMemo } from "react";
import { parse, format } from "date-fns";
import { Typography } from "@mui/material";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvent, setEventModalOpen } from "../../store/slices/eventSlice";

// Transform function to convert each event to the required format
const transformEvents = (events) =>
  events.map((event) => {
    const startDate = new Date(`${event.date} ${event.time}`);
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1); // Adjust as needed for event duration

    return {
      id: event.id,
      title: event.title,
      description: event.description,
      start: startDate,
      end: endDate,
      location: event.location,
    };
  });

interface EventProps {
  event: {
    title: string;
    description: string;
  };
}

const EventComponent: React.FC<EventProps> = ({ event }) => {
  const truncatedTitle =
    event.title.length > 15 ? `${event.title.slice(0, 15)}...` : event.title;
  const truncatedDescription =
    event.description.length > 30
      ? `${event.description.slice(0, 30)}...`
      : event.description;

  return (
    <div
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      <Typography variant="subtitle2" noWrap>
        {truncatedTitle}
      </Typography>
      <Typography variant="body2" color="textSecondary" noWrap>
        {truncatedDescription}
      </Typography>
    </div>
  );
};

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events }) => {
  const dispatch = useDispatch();
  const transformedEvents = useMemo(() => transformEvents(events), [events]);
  const handleSelectEvent = (event) => {
    dispatch(fetchEvent({ id: event?.id }));
    dispatch(setEventModalOpen(true));
  };
  return (
    <div style={{ height: "80vh", margin: "20px" }}>
      <Calendar
        localizer={localizer}
        events={transformedEvents}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["week", "month", "day", "agenda"]}
        style={{ height: "100%", minWidth: "100%" }}
        components={{
          event: EventComponent,
        }}
        popup
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};

export default CalendarComponent;
