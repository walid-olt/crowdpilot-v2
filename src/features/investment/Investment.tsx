import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProjectSummary } from "./components/ProjectSummary";
import { useEffect } from "react";
import { fetchProjectById } from "./investmentSlice";
import { useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import InvestmentForm from "./components/InvestmentForm";

export const Component = () => {
  const { id } = useParams();
  const { loading, error } = useAppSelector((s) => s.investments);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProjectById(id!));
  }, [id, dispatch]);

  switch (loading) {
    case "pending":
      return <Loading message="Loading project summary" />;

    case "succeeded":
      return (
        <section className="px-8">
          <h1 className="text-2xl font-bold leading-snug">
            Make an investment
          </h1>
          <ProjectSummary />
          <InvestmentForm />
        </section>
      );

    case "failed":
      return (
        <Error
          title={
            (error instanceof Error && error.message) ||
            "Couldn't fetch project details"
          }
          description="error fetching project details"
          error={error}
          resetErrorBoundary={() => dispatch(fetchProjectById(id!))}
        />
      );
  }
};
