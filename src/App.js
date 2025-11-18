// import logo from './logo.svg';
import {
  BrowserRouter as Routers,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import './App.css';
import Login from './pages/Login';;
import Signup from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  
  return (
    <AuthProvider>
      <Routers>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                  <LandingPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Routers>
    </AuthProvider>
  );
}

export default App;
