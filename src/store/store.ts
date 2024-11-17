import { configureStore, Action } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { eventSlice } from "./slices/eventSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    event: eventSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
