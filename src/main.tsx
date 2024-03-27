import "bootstrap/dist/css/bootstrap.min.css";

import { StrictMode } from "react";
import { Container } from "react-bootstrap";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientConfig, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "@/context/AuthContext.tsx";
import { ThemeProvider } from "@/context/ThemeContext.tsx";

import { baseAxios } from "@/utils/axios.ts";

import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";
import "./i18n.ts";
import "./index.css";

const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 3,
      cacheTime: 5 * 60 * 1000,
      // staleTime: 5 * 60 * 1000,
      queryFn: async ({ queryKey }) => {
        const url = queryKey[0];
        if (typeof url === "string") {
          const response = await baseAxios.get(url);
          return response.data;
        }
        return Promise.reject("Invalid query key");
      },
    },
  },
};

const queryClient = new QueryClient(queryConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      renderFallback={(error) => (
        <Container>
          <p className={"text-danger fw-semibold"}>{error.message}</p>
        </Container>
      )}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
