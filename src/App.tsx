import { Suspense, lazy, useCallback } from "react";
import {
  useRoutes,
  Routes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import routes from "tempo-routes";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import OfflineIndicator from "./components/OfflineIndicator";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserProfile from "./components/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./components/LandingPage";
import { AuthProvider } from "./contexts/AuthContext";
import { MultiplayerProvider } from "./contexts/MultiplayerContext";
import React from "react";
import { captureError } from "./utils/sentry";
import { PerformanceMetrics } from "./components/PerformanceMetrics";
import { ToastContainer } from "./components/ToastContainer";

// Lazy load components
const Home = lazy(() => import("./components/home"));
const ResourceManagement = lazy(
  () => import("./components/game/ResourceManagement"),
);
const Building = lazy(() => import("./components/game/Building"));
const Military = lazy(() => import("./components/game/Military"));
const DewanRaja = lazy(() => import("./components/game/DewanRaja"));
const CombatInterface = lazy(() => import("./components/game/CombatInterface"));
const KingdomOverview = lazy(() => import("./components/game/KingdomOverview"));
const GameMap = lazy(() => import("./components/game/GameMap"));

// Memoized components
const MemoizedLayout = React.memo(Layout);
const MemoizedProtectedRoute = React.memo(ProtectedRoute);

function AppRoutes() {
  const handleError = useCallback((error: Error) => {
    captureError(error, { component: "App" });
  }, []);

  const routes = useRoutes([
    {
      path: "/",
      element: <MemoizedLayout />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        {
          path: "game",
          element: <MemoizedProtectedRoute />,
          children: [
            { index: true, element: <Home /> },
            { path: "resources", element: <ResourceManagement /> },
            { path: "building", element: <Building /> },
            { path: "military", element: <Military /> },
            { path: "dewan-raja", element: <DewanRaja /> },
            { path: "combat", element: <CombatInterface /> },
            { path: "kingdom", element: <KingdomOverview /> },
            { path: "map", element: <GameMap /> },
            { path: "profile", element: <UserProfile /> },
          ],
        },
      ],
    },
  ]);

  return (
    <ErrorBoundary onError={handleError}>
      <AuthProvider>
        <MultiplayerProvider>
          <Router>
            <div className="min-h-screen bg-gray-100">
              <OfflineIndicator />
              <PerformanceMetrics />
              <ToastContainer />
              {/* For the tempo routes */}
              {import.meta.env.VITE_TEMPO &&
                typeof window !== "undefined" &&
                useRoutes(routes)}
              {import.meta.env.VITE_TEMPO && typeof window !== "undefined" && (
                <Route path="/tempobook/*" />
              )}
              <Suspense
                fallback={
                  <div className="flex items-center justify-center min-h-screen">
                    <LoadingSpinner size="lg" text="Loading game..." />
                  </div>
                }
              >
                {routes}
              </Suspense>
            </div>
          </Router>
        </MultiplayerProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

const App = React.memo(function App() {
  return <AppRoutes />;
});

export default App;
