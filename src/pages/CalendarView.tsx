import { Grid } from "@mui/material";
import CalendarComponent from "../components/events/CalendarView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchEvents } from "../store/slices/eventSlice";
import React from "react";
import ResponsiveAppBar from "../components/navbar";

export const CalendarView = () => {
  const dispatch = useDispatch();

  const { events } = useSelector((state) => state.event);
  useEffect(() => {
    dispatch(fetchEvents({ type: "all" }));
  }, []);
  return (
    <Grid>
      <ResponsiveAppBar />
      <Grid margin={"100px 200px"}>
        <CalendarComponent events={events} />
      </Grid>
    </Grid>
  );
};
