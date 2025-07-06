import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  const handleLoginSuccess = () => {
    navigate("/");
  };

  return <LoginForm onSuccess={handleLoginSuccess} />;
};

export default Login; 