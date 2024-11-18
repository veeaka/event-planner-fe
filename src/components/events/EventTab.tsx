import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import EventTable from "./EventTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  deleteEvent,
  fetchEvent,
  fetchEvents,
  setEventModalOpen,
  setEvents,
} from "../../store/slices/eventSlice";
import DeleteEventDialog from "./DeleteEventDialog";
import {
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EventCard from "./EventCard";
import CalendarComponent from "./CalendarView";
import NoEventsFound from "../../assets/noresultsicon1.png";
import { StyledButton } from "../utils/CustomComponents";

const EventTabs: React.FC = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [eventToDelete, setEventToDelete] = React.useState<number | null>(null);
  const [value, setValue] = React.useState(0);
  const { events, loading } = useSelector((state: RootState) => state.event);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);

    dispatch(setEvents([]));

    // Map tab index to API type
    const typeMap: { [key: number]: string | undefined } = {
      0: "all",
      1: "upcoming",
      2: "past",
    };

    const selectedType = typeMap[newValue];

    if (selectedType) {
      dispatch(fetchEvents({ type: selectedType }));
    }
  };

  const handleViewEvent = (id: string) => {
    dispatch(fetchEvent({ id }));
    dispatch(setEventModalOpen(true));
  };

  const handleDeleteEvent = (id: string) => {
    setEventToDelete(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEventToDelete(null);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteEvent(eventToDelete));
    handleCloseDialog();
  };

  React.useEffect(() => {
    dispatch(fetchEvents({ type: "all" }));
  }, []);

  return (
    <Box
      sx={{
        width: isMobile ? "350px" : "800px",
        margin: "100px auto",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="event tabs">
          <Tab
            sx={{
              width: isMobile ? "100px" : "180px",
              fontSize: isMobile ? "12px" : "15px",
              textTransform: "capitalize",
            }}
            label="All Events"
          />
          <Tab
            sx={{
              width: isMobile ? "140px" : "180px",
              fontSize: isMobile ? "12px" : "15px",
              textTransform: "capitalize",
            }}
            label="Upcoming Events"
          />
          <Tab
            sx={{
              width: isMobile ? "100px" : "180px",
              fontSize: isMobile ? "12px" : "15px",
              textTransform: "capitalize",
            }}
            label="Past Events"
          />
        </Tabs>
      </Box>

      {!isMobile && (
        <EventTable
          events={events}
          onViewEvent={handleViewEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      )}
      {isMobile && (
        <Grid container spacing={2}>
          {events.map((event) => (
            <Grid item xs={12} sm={isMobile ? 12 : 6} key={event.id}>
              <EventCard event={event} />
            </Grid>
          ))}
          {!events.length && (
            <Grid
              container
              margin="100px"
              display="flex"
              justifyContent="space-between"
            >
              No Events Found
            </Grid>
          )}
        </Grid>
      )}

      <DeleteEventDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default EventTabs;
