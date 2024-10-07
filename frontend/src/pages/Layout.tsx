import { Box } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import StatusBar from "../components/StatusBar";
import ContentHome from "../components/home/ContentHome";

export default function Layout() {
  return (
    <Box
      backgroundColor="background"
      justifyContent="center"
      display="flex"
      width="full">
      <Sidebar />
      <Box
        position="absolute"
        top={0}
        display="flex"
        flexDirection="column"
        borderX="1px"
        borderColor="secondary"
        width="41%"
        minHeight="full"
        ml="10%"
        mr="18%"
        py="20px"
        color="white">
        <ContentHome />
      </Box>
      <StatusBar />
    </Box>
  );
}
