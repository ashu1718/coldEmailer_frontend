// import logo from './logo.svg';
import {
  BrowserRouter as Routers,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import './App.css';
import "antd/dist/reset.css";
import Login from './pages/Login';
import Signup from "./pages/SignUp";
import GoogleAuthPage from "./pages/GoogleAuthPage";
import { AuthProvider } from "./contexts/AuthProvider";
import EmailForm from "./pages/EmailForm";
import { useAuth } from "./contexts/AuthProvider";
function App() {
  const {loading, isLoggedIn, gmailConnected} = useAuth();
  if (loading) return null;
  return (
   
      <Routers>
        <Routes>
          {!isLoggedIn && (
            <>
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}

          {/* Logged in but Gmail not connected → GoogleAuthPage */}
          {isLoggedIn && !gmailConnected && (
            <>
              <Route path="/google-auth" element={<GoogleAuthPage />} />
              <Route
                path="*"
                element={<Navigate to="/google-auth" replace />}
              />
            </>
          )}

          {/* Logged in & Gmail connected → Email form */}
          {isLoggedIn && gmailConnected && (
            <>
              <Route path="/cold-email-form" element={<EmailForm />} />
              <Route path="*" element={<Navigate to="/cold-email-form" replace />} />
            </>
          )}
        </Routes>
      </Routers>
  );
}

export default App;
