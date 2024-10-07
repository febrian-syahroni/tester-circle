import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/home">
      <Text
        fontSize="50px"
        lineHeight={1}
        mx="20px"
        fontWeight={700}
        color="primary.active">
        circle
      </Text>
    </Link>
  );
}

