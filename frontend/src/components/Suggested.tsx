import { Box, Text } from "@chakra-ui/react";

import foto from "../assets/status-bar/foto.jpg";
import User from "./User";

export default function Suggested() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      px="14px"
      py="10px"
      rounded="lg"
      width="full"
      backgroundColor="card">
      <Text fontSize="15px" mb="5px">
        Suggested for you
      </Text>
      <User name="Mohammed Jawahir" mention="@em.jawahir" photo={foto} />
      <User name="Mohammed Jawahir" mention="@em.jawahir" photo={foto} />
      <User name="Mohammed Jawahir" mention="@em.jawahir" photo={foto} />
      <User name="Mohammed Jawahir" mention="@em.jawahir" photo={foto} />
      <User name="Mohammed Jawahir" mention="@em.jawahir" photo={foto} />
      <User name="Mohammed Jawahir" mention="@em.jawahir" photo={foto} />
      <User name="Mohammed Jawahir" mention="@em.jawahir" photo={foto} />
      <User name="Mohammed Jawahir" mention="@em.jawahir" photo={foto} />
    </Box>
  );
}
