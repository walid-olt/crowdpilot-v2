import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitInvestment } from "../api";
import { useAppDispatch } from "@/store/hooks";
import { fetchProjectById } from "../investmentSlice";
import type { InvestRequestBody } from "@/types/api";

export const useSubmitInvestmentMutation = (projectId: string) => {
  const qc = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (payload: InvestRequestBody) =>
      submitInvestment(projectId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects", projectId] });
      // dispatch(fetchProjectById(projectId));
    },
  });
};
