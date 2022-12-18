import * as React from "react";
import "./App.css";
import "typeface-roboto";
import "./design/fonts/VTFRedzone/stylesheet.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Tournaments } from "./pages/Tournaments/Tournaments";
import { Tournament } from "./pages/Tournament/Tournament";
import { Player } from "./pages/Player/Player";
import { SuspenseElement } from "./components/SuspendedPage";
import { TournamentWizard } from "./pages/TournamentWizard/TournamentWizard";
import { StageWizard } from "./pages/StageWizard/StageWizard";
import { LobbiesWizard } from "./pages/LobbiesWizard/LobbiesWizard";
import { ResultsWizard } from "./pages/ResultsWizard/ResultsWizard";
import { Stats } from "./pages/Stats/Stats";
import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";
import { Players } from "./pages/Players/Players";

export const App = () => {
  return (
    <div style={{ width: "100%" }}>
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
          <Route index element={<SuspenseElement element={<Players />} />} />
          <Route
            path=":playerId"
            element={<SuspenseElement element={<Player />} />}
          />
        </Route>
        <Route path="stats" element={<SuspenseElement element={<Stats />} />} />
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
    </div>
  );
};
