import { apiClient } from "@/api/client";
import type {
  ProjectResponse,
  ProjectsResponse,
  CreateProjectRequestBody,
  UpdateProjectRequestBody,
} from "@/types/api";
import { AxiosError } from "axios";

export const getOwnerProjects = async (): Promise<ProjectsResponse> => {
  try {
    const { data } = await apiClient.get<ProjectsResponse>("/projects/mine");
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.message, {
        cause: e,
        ...e.response?.data,
      });
    } else {
      throw e;
    }
  }
};
export const getAllProjects = async (): Promise<ProjectsResponse> => {
  try {
    const { data } = await apiClient.get<ProjectsResponse>("/projects/open");
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.message, {
        cause: e,
        ...e.response?.data,
      });
    } else {
      throw e;
    }
  }
};

export const deleteProject = async (id: string): Promise<ProjectResponse> => {
  try {
    const { data } = await apiClient.delete<ProjectResponse>(`/projects/${id}`);
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.message, {
        cause: e,
        ...e.response?.data,
      });
    } else {
      throw e;
    }
  }
};

export const getProjectById = async (id: string) => {
  try {
    const { data } = await apiClient.get<ProjectResponse>(`/projects/${id}`);
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error("Failed to fetch project details", {
        cause: e,
        ...e.response?.data,
      });
    } else {
      throw e;
    }
  }
};

export const createProject = async (payload: CreateProjectRequestBody) => {
  try {
    const { data } = await apiClient.post<ProjectResponse>(
      `/projects`,
      payload,
    );
    await new Promise((r) => setTimeout(r, 3000));
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error("Failed to create project, try again", {
        cause: e,
        ...e.response?.data,
      });
    } else {
      throw e;
    }
  }
};

export const updateProject = async (
  id: string,
  payload: UpdateProjectRequestBody,
) => {
  try {
    const { data } = await apiClient.patch<ProjectResponse>(
      `/projects/${id}`,
      payload,
    );
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error("Failed to update project, try again", {
        cause: e,
        ...e.response?.data,
      });
    } else {
      throw e;
    }
  }
};
