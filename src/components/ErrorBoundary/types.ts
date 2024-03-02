import { ReactNode } from "react";

export type ErrorBoundaryProps = {
  // eslint-disable-next-line
  renderFallback: (error: Error) => ReactNode;
  children: ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};
