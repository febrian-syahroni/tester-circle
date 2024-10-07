import { Box, Button, Image, Text } from "@chakra-ui/react";
import coffee from "../assets/status-bar/coffee-in-the-table.jpg";
import foto from "../assets/status-bar/foto.jpg";

interface desc {
  height: string;
  onOpen?: any;
}

export default function ProfileItem({ height, onOpen }: desc) {
  return (
    <>
      <Box position="relative">
        <Image
          rounded="lg"
          width="full"
          height={height}
          objectFit="cover"
          src={coffee}
        />
        <Image
          rounded="full"
          color="card"
          border="4px"
          bottom="-35px"
          left="24px"
          position="absolute"
          objectFit="cover"
          boxSize="70px"
          src={foto}
        />
      </Box>
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="end">
        <Button
          onClick={onOpen}
          textAlign="center"
          fontSize="9px"
          backgroundColor="background"
          color="white"
          _hover={{ color: "black", backgroundColor: "white" }}
          border="1px"
          borderColor="white"
          fontWeight="100"
          height="25px"
          rounded="full">
          Edit Profile
        </Button>
      </Box>
      <Box
        display="flex"
        gap="4px"
        width="full"
        flexDirection="column"
        alignItems="start"
        justifyContent="start">
        <Text fontSize="16px">✨ Stella Audhina ✨</Text>
        <Text fontSize="12px" color="#909090">
          @audhinafh
        </Text>
        <Text fontSize="12px" fontWeight="100">
          picked over by the worms, and weird fishes
        </Text>
        <Box display="flex" fontSize="12px" gap="12px">
          <Box display="flex" gap="4px">
            <Text color="white" fontWeight="100">
              291
            </Text>
            <Text color="#909090" fontWeight="400">
              Following
            </Text>
          </Box>
          <Box display="flex" gap="4px">
            <Text color="white" fontWeight="100">
              23
            </Text>
            <Text color="#909090" fontWeight="400">
              Followers
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}
