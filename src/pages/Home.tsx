import React from "react";
import ResponsiveAppBar from "../components/navbar";
import EventTable from "../components/events/EventTable";
import EventTabs from "../components/events/EventTab";

export const Home = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <EventTabs />
    </div>
  );
};
