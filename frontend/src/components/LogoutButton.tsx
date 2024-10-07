import { Button, Image } from "@chakra-ui/react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logout } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import out from "../assets/sidebar/logout.svg";

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirect user to login page after logout
  };

  return (
    <Button
      backgroundColor="background"
      display="flex"
      rounded="md"
      cursor="pointer"
      alignItems="center"
      color="white"
      _hover={{ backgroundColor: "secondary" }}
      gap="16px"
      py="10px"
      px="10px"
      onClick={handleLogout}
      >
        <Image boxSize="25px" src={out} />
        Logout
    </Button>
  );
};

export default LogoutButton;
