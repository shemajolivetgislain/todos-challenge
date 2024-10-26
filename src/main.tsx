import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import "./i18n.ts";
import store, { persistor } from "./app/store/index.ts";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);

// import ReactDOM from "react-dom/client";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(
//   <Provider store={store}>
//     <QueryClientProvider client={queryClient}>
//       <App />
//     </QueryClientProvider>
//   </Provider>
// );
