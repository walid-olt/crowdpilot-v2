import type { Project } from "@/types/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProjectById } from "../projects/api";
import type { AxiosError } from "axios";

// this is totally redundant, but it is to show how to use
// createAsyncThunk and handle the loading state and error state in the slice

export const fetchProjectById = createAsyncThunk(
  "projects/fetchById",
  async (projectId: string) => {
    const { data } = await getProjectById(projectId);
    return data;
  },
);

type InvestmentState = {
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: null | Error | AxiosError | string;
  currentProject: Project | null;
};

const initialState: InvestmentState = {
  loading: "idle",
  currentProject: null,
  error: null,
};

const investmentSlice = createSlice({
  name: "investment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjectById.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchProjectById.fulfilled, (state, action) => {
      const project = action.payload;
      state.loading = "succeeded";
      if (!project) {
        state.error = "Could not fetch project";
        state.loading = "failed";
        return;
      }
      state.error = null;
      state.loading = "succeeded";
      state.currentProject = project;
    });

    builder.addCase(fetchProjectById.rejected, (state, action) => {
      console.error(action.error);
      state.loading = "failed";
      const error = action.error;
      state.error = error.message || "Could not fetch project";
    });
  },
});

export default investmentSlice.reducer;
