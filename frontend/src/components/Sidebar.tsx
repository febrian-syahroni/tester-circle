import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Menu from "./Menu";
import LogoutButton from "./LogoutButton";
export default function Sidebar() {
  return (
    <Box
      backgroundColor="background"
      position="fixed"
      display="flex"
      top={0}
      left={0}
      width="25%"
      height="full"
      flexDirection="column"
      justifyContent="space-between">
      <Box display="flex" padding="20px" flexDirection="column" gap="20px">
        <Logo />
        <Menu />
      </Box>
      <Link to="login">
        <Box display="flex" px="20px" mb="40px">
          <LogoutButton />
        </Box>
      </Link>
    </Box>
  );
}