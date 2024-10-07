import { Box, Image, Text } from "@chakra-ui/react";

interface Attributes {
    title: string;
    src: string;
  }

export default function Items({ title, src, ...props }: Attributes) {
    return(
        <Box
        {...props}
        display="flex"
        rounded="md"
        cursor="pointer"
        alignItems="center"
        color="white"
        _hover={{ backgroundColor: "secondary" }}
        gap="16px"
        py="10px"
        px="10px">
        <Image boxSize="25px" src={src} />
        <Text fontSize="15px">{title}</Text>
      </Box>
    )
}