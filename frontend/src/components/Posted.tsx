import textMessage from "@/assets/content/message-text.svg";
import { Box, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import heartFill from "@/assets/content/heart-fill.svg";
import heartOutline from "@/assets/content/heart-outline.svg";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

interface desc {
  author: string;
  description: string;
  image?: string;
  borderTop?: string;
  padding?: string;
}

export default function Posted({
  author,
  description,
  image,
  borderTop,
  padding,
}: desc) {
  const [liked, setLiked] = useState<boolean>(false);

  function handleLiked() {
    setLiked((prev) => !prev);
  }

  return (
    <Box
      display="flex"
      width="full"
      padding={padding || "20px"}
      gap="20px"
      borderTop={borderTop || "1px"}
      borderColor="secondary">
      <Avatar />
      <Box display="flex" flexDirection="column" fontSize="12px" gap="10px">
        <Box display="flex" flexDirection="column" gap="2px">
          <Link to="/profile">{author}</Link>
          <Text fontWeight="100">{description}</Text>
        </Box>
        <Link to="/image">{image && <Image width="50%" src={image} />}</Link>
        <Box display="flex" gap="20px">
          <Box display="flex" gap="5px" alignItems="center">
            <Image
              onClick={handleLiked}
              cursor="pointer"
              src={liked ? heartFill : heartOutline}
            />
            <Text color="gray">36</Text>
          </Box>
          <Box display="flex" gap="5px" alignItems="center">
            <Link to="/status">
              <Image src={textMessage} />
            </Link>
            <Text color="gray">381</Text>
            <Text color="gray">Replies</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
