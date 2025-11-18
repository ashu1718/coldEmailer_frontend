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
import GoogleAuthPage from "./pages/GoogleAuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { AuthProvider } from "./contexts/AuthProvider";
import EmailForm from "./pages/EmailForm";
function App() {
  
  return (
    <AuthProvider>
      <Routers>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/google-auth"
            element={
              <ProtectedRoute>
                <GoogleAuthPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cold-email-form"
            element={
              <ProtectedRoute>
                <EmailForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Routers>
    </AuthProvider>
  );
}

export default App;
