import { useAppSelector } from "../hooks/useAppSelector"; // Pastikan import ini benar
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAppSelector((state) => state.user.token); // Akses token dari state auth

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
