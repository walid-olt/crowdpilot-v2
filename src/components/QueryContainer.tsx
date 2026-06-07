import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import ErrorComponent from "@/components/Error";
import Loading from "@/components/Loading";
import { Suspense, type ComponentType, type ReactNode } from "react";

type QueryContainerProps = {
  children: ReactNode;
  /** Custom message passed to the default Loading component */
  loadingMessage?: string;
  /** Custom message passed to the default Error component */
  errorMessage?: string;
  /** Optional custom loading component if you want to override <Loading /> entirely */
  loadingFallback?: ReactNode;
  /** Optional custom error fallback component */
  errorFallback?: ComponentType<FallbackProps>;
};

/**
 * Reusable Wrapper component for handling loading and error state declaratively
 * use if :
 * - Your component fetches data using tanstack/react-query or new use hook (or if it's lazyloaded)
 * - Your component can throw errors
 */
const QueryContainer = ({
  children,
  loadingMessage = "Loading...",
  loadingFallback,

  errorFallback: CustomErrorFallback,
}: QueryContainerProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={(boundaryProps) =>
            CustomErrorFallback ? (
              <CustomErrorFallback {...boundaryProps} />
            ) : (
              <ErrorComponent
                error={boundaryProps.error}
                resetErrorBoundary={boundaryProps.resetErrorBoundary}
              />
            )
          }
        >
          <Suspense
            fallback={loadingFallback ?? <Loading message={loadingMessage} />}
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default QueryContainer;
