import { useAppDispatch } from "@/store/hooks";
import {
  closeDeleteDialogue,
  closeEditingModal,
  openDeleteDialogue,
  openEditingModal,
} from "../projectsSlice.ts";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  deleteProject,
  getProjectById,
  createProject,
  updateProject,
} from "../api/index.ts";

export function useProjectDeleteDialogue(
  project: Parameters<typeof openDeleteDialogue>[0],
) {
  const dispatch = useAppDispatch();
  const open = () => dispatch(openDeleteDialogue(project));
  const close = () => dispatch(closeDeleteDialogue());
  return { open, close };
}

export function useProjectUpdateDialogue(
  project: Parameters<typeof openEditingModal>[0],
) {
  const dispatch = useAppDispatch();
  const open = () => dispatch(openEditingModal(project));
  const close = () => dispatch(closeEditingModal());
  return { open, close };
}

export function useDeleteProjectMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["projects"] }); // invalidating a cache just like this feels illegal 😭
    },
  });
}

export function useProjectDetailsQuery(id: string) {
  const { data } = useSuspenseQuery({
    queryFn: () => getProjectById(id),
    queryKey: ["projects", id],
  });
  return data;
}

export function useCreateProjectMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProjectMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Parameters<typeof updateProject>[1];
    }) => updateProject(id, payload),
    onSuccess: ({ data }) => {
      client.invalidateQueries({ queryKey: ["projects"] });
      if (data?._id) {
        client.invalidateQueries({ queryKey: ["projects", data._id] });
      }
    },
  });
}
