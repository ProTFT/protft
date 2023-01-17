import * as React from "react";
import "./App.css";
import "typeface-roboto";
import "./design/fonts/VTFRedzone/stylesheet.css";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Tournaments } from "./pages/Tournaments/Tournaments";
import { Tournament } from "./pages/Tournament/Tournament";
import { Player } from "./pages/Player/Player";
import { SuspenseElement } from "./components/SuspendedPage";
import { Stats } from "./pages/Stats/Stats";
import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";
import { Players } from "./pages/Players/Players";
import { About } from "./pages/About/About";
import { useAuth } from "./hooks/useAuth";
import { AdminHome } from "./pages/Admin/Home/AdminHome";
import { Login } from "./pages/Auth/Login/Login";
import { AdminTournament } from "./pages/Admin/Tournament/AdminTournament";
import { AdminStage } from "./pages/Admin/Stage/AdminStage";
import { Logout } from "./pages/Auth/Logout/Logout";
import { useToast } from "./pages/Admin/Components/Toast/Toast";

const ProtectedRoutes = (props: any) => {
  const location = useLocation();
  const auth = useAuth();

  return auth.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ redirect: location.pathname }} />
  );
};

export const App = () => {
  const { toast } = useToast();
  return (
    <div style={{ width: "100%" }}>
      <NavBar />
      {toast}
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
        <Route path="about" element={<SuspenseElement element={<About />} />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="admin/tournaments" element={<ProtectedRoutes />}>
          <Route index element={<SuspenseElement element={<AdminHome />} />} />
          <Route
            path=":id/stages/:stageId/*"
            element={<SuspenseElement element={<AdminStage />} />}
          />
          <Route
            path=":id/*"
            element={<SuspenseElement element={<AdminTournament />} />}
          />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};
