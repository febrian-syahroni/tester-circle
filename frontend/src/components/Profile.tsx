import { Box, Text } from "@chakra-ui/react";
import ProfileItem from "./ProfileItem";

export default function Profile() {
  return (
    <Box
      display="flex"
      px="14px"
      py="10px"
      rounded="lg"
      flexDirection="column"
      gap="12px"
      width="full"
      backgroundColor="card">
      <Text fontSize="15px">My Profile</Text>
      <ProfileItem height="80px" />
    </Box>
  );
}
