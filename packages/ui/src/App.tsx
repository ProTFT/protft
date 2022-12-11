import * as React from "react";
import "typeface-roboto";
import "./design/fonts/VTFRedzone/stylesheet.css";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Tournaments } from "./pages/Tournaments/Tournaments";
import { Tournament } from "./pages/Tournament/Tournament";
import { PlayersContainer } from "./pages/Players/Players";
import { Player } from "./pages/Player/Player";
import { SuspenseElement } from "./components/SuspendedPage";
import { TournamentWizard } from "./pages/TournamentWizard/TournamentWizard";
import { StageWizard } from "./pages/StageWizard/StageWizard";
import { LobbiesWizard } from "./pages/LobbiesWizard/LobbiesWizard";
import { ResultsWizard } from "./pages/ResultsWizard/ResultsWizard";
import { Stats } from "./pages/Stats/Stats";
import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";

export const App = () => {
  return (
    <ChakraProvider>
      <Box w="100%" zIndex={1}>
        <NavBar />
        <Routes>
          <Route path="/" element={<SuspenseElement element={<Home />} />} />
          <Route path="tournaments">
            <Route
              index
              element={<SuspenseElement element={<Tournaments />} />}
            />
            <Route
              path=":tournamentId"
              element={<SuspenseElement element={<Tournament />} />}
            />
          </Route>
          <Route path="players">
            <Route
              index
              element={<SuspenseElement element={<PlayersContainer />} />}
            />
            <Route
              path=":playerId"
              element={<SuspenseElement element={<Player />} />}
            />
          </Route>
          <Route
            path="stats"
            element={<SuspenseElement element={<Stats />} />}
          />
          <Route path="addTournament">
            <Route
              index
              element={<SuspenseElement element={<TournamentWizard />} />}
            />
            <Route path=":tournamentId">
              <Route
                index
                element={<SuspenseElement element={<StageWizard />} />}
              />
              <Route
                path="lobbies"
                element={<SuspenseElement element={<LobbiesWizard />} />}
              />
              <Route
                path="results"
                element={<SuspenseElement element={<ResultsWizard />} />}
              />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </Box>
    </ChakraProvider>
  );
};
