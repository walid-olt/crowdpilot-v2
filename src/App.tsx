import AppRouter from "./router/index.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/client.ts";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";

import { setStore } from "./api/client.ts";

setStore(store);
export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster
            toastOptions={{
              style: {
                backgroundColor: "var(--popover)",
                color: "var(--popover-foreground) ",
              },
              error: {
                iconTheme: {
                  primary: "var(--destructive)",
                  secondary: "var(--destructive-foreground)",
                },
              },
              success: {
                iconTheme: {
                  primary: "var(--primary)",
                  secondary: "var(--secondary)",
                },
              },
            }}
          />
          <AppRouter />
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
}
