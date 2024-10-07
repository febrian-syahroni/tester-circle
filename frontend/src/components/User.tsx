import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useState } from "react";

interface desc {
  name: string;
  mention: string;
  photo: string;
}

export default function User({ name, mention, photo }: desc) {
  const [followed, setFollowed] = useState<boolean>(false);

  function handleFollow() {
    setFollowed((prev) => !prev);
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="5px"
      gap="16px">
      <Image rounded="full" objectFit="cover" boxSize="30px" src={photo} />
      <Box
        fontSize="10px"
        width={followed ? "264px" : "285px"}
        display="flex"
        flexDirection="column">
        <Text>{name}</Text>
        <Text color="#909090">{mention}</Text>
      </Box>
      <Button
        onClick={handleFollow}
        fontSize="10px"
        width={followed ? "99px" : "78px"}
        height="23px"
        rounded="full"
        _hover={{
          backgroundColor: followed ? "secondary" : "white",
          color: "black",
        }}
        color={followed ? "#909090" : "white"}
        px={4}
        border="1px"
        borderColor={followed ? "#909090" : "white"}
        backgroundColor="card">
        {followed ? "Following" : "Follow"}
      </Button>
    </Box>
  );
}
