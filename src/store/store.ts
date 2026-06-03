import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import projectsReducer from "../features/projects/projectsSlice";
import walletReducer from "../features/wallet/walletSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    wallet: walletReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export default store;
