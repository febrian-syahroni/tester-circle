import { Box, Image, Text } from "@chakra-ui/react";
import github from "../assets/status-bar/github.svg";
import linkedin from "../assets/status-bar/linkedin.svg";
import facebook from "../assets/status-bar/facebook.svg";
import instagram from "../assets/status-bar/instagram.svg";
import DW from "../assets/status-bar/DW.svg";

export default function Meta() {
  return (
    <Box
      display="flex"
      width="full"
      gap="8px"
      rounded="lg"
      flexDirection="column"
      px="16px"
      py="12px"
      bg="card">
      <Box display="flex" gap="8px" fontSize="10px">
        <Text>Developed with ❤ by Febrian Syahroni</Text>
        .
        <Image boxSize="15px" src={github} />
        <Image boxSize="15px" src={linkedin} />
        <Image boxSize="15px" src={facebook} />
        <Image boxSize="15px" src={instagram} />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap="4px"
        color="#B2B2B2"
        fontSize="10px"
        fontWeight="500">
        <Text>Powered by</Text>
        <Image src={DW} />
        <Text>DumbWays Indonesia</Text>.<Text>#1 Coding Bootcamp</Text>
      </Box>
    </Box>
  );
}
