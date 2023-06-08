import * as React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { simplePagination } from "@urql/exchange-graphcache/extras";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { ProvideAuth } from "./hooks/useAuth";
import { ProvideToast } from "./pages/Admin/Components/Toast/Toast";
import { ThemeProvider } from "styled-components";
import { theme } from "./design/theme";
import Plausible from "plausible-tracker";
import { ProvideTracking } from "./hooks/useTracking";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);
const graphqlClient = createClient({
  fetchOptions: {
    credentials: "include",
  },
  url: `${process.env.REACT_APP_BACKEND_URL}`,
  requestPolicy: "cache-and-network",
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        PlayerStats: () => null,
        PlayerResults: () => null,
        PlayerCalculatedStats: () => null,
        PlayerWithStats: () => null,
        StagePlayerInfo: () => null,
        TournamentStream: () => null,
      },
      resolvers: {
        Query: {
          playerStats: simplePagination({
            limitArgument: "take",
          }),
          upcomingTournaments: simplePagination({
            limitArgument: "take",
          }),
          pastTournaments: simplePagination({
            limitArgument: "take",
          }),
          players: simplePagination({
            limitArgument: "take",
          }),
          adminTournaments: simplePagination({
            limitArgument: "take",
          }),
        },
      },
    }),
    fetchExchange,
  ],
  suspense: true,
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider value={graphqlClient}>
        <DndProvider backend={HTML5Backend}>
          <ProvideAuth>
            <ProvideToast>
              <ProvideTracking>
                <ThemeProvider theme={theme}>
                  <App />
                </ThemeProvider>
              </ProvideTracking>
            </ProvideToast>
          </ProvideAuth>
        </DndProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
