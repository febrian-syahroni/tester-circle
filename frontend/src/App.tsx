import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./routes/ProtectedRoute";
import Layout from "./pages/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute>
          <Layout />
        </PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
