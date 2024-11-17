import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../services/api";
import { toastTypes } from "../../utilities/consts";
import { showToast } from "../../utilities/helper";

export interface Event {
  id: string;
  user: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

export interface EventState {
  events: Event[];
  event: Event | null;
  loading: boolean;
  error: string | null;
  isEventModalOpen: false;
}

const initialState: EventState = {
  events: [],
  event: null,
  loading: false,
  error: null,

  isEventModalOpen: false,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvent: (state, action) => {
      state.event = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setEventModalOpen: (state, action) => {
      state.event = null;
      state.isEventModalOpen = action.payload;
    },
  },
});

export const { setLoading, setError, setEvent, setEvents, setEventModalOpen } =
  eventSlice.actions;

export default eventSlice.reducer;

// Create Event
export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (eventData: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await instance.post("/events/", eventData);
      dispatch(setEvents([]));
      dispatch(fetchEvents({ type: "all" }));
      dispatch(setEvent(null));
      dispatch(setEventModalOpen(false));
      showToast("Event created successfully !", toastTypes.SUCCESS);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create event");
    }
  }
);

// Edit Event
export const editEvent = createAsyncThunk(
  "event/editEvent",
  async (
    { id, updatedData }: { id: string; updatedData: any },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await instance.put(`/events/${id}/`, updatedData);
      dispatch(setEvents([]));
      dispatch(fetchEvents({ type: "all" }));
      dispatch(setEvent(null));
      dispatch(setEventModalOpen(false));
      showToast("Event Updated successfully !", toastTypes.SUCCESS);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to edit event");
    }
  }
);

// Delete Event
export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await instance.delete(`/events/${id}/`);
      dispatch(setEvents([]));
      dispatch(fetchEvents({ type: "all" }));
      dispatch(setEvent(null));
      dispatch(setEventModalOpen(false));
      showToast("Event Deleted successfully !", toastTypes.SUCCESS);

      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete event");
    }
  }
);

export const fetchEvents = createAsyncThunk(
  "event/fetchEvents",
  async (
    { type }: { type?: "past" | "upcoming" | "all" },
    { rejectWithValue, dispatch, getState }
  ) => {
    dispatch(setLoading(true));
    try {
      // Construct URL with optional query parameter
      const url = type ? `/events/?type=${type}` : "/events/";

      const response = await instance.get<Event[]>(url);

      const existingEvents = (getState() as any).event.events;

      const eventsMap = new Map<string | number, Event>();

      existingEvents.forEach((event: Event) => {
        eventsMap.set(event.id, event);
      });

      response.data.forEach((event: Event) => {
        eventsMap.set(event.id, event);
      });

      const updatedEvents = Array.from(eventsMap.values());

      dispatch(setEvents(updatedEvents));

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch events");
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchEvent = createAsyncThunk(
  "event/fetchEvents",
  async ({ id }: { id: number }, { rejectWithValue, dispatch, getState }) => {
    dispatch(setLoading(true));
    try {
      const url = `/events/${id}`;
      const response = await instance.get<Event[]>(url);
      dispatch(setEvent(response.data));

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch events");
    } finally {
      dispatch(setLoading(false));
    }
  }
);
