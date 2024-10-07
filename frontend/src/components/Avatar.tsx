import { Image } from "@chakra-ui/react";
import photo from "@/assets/status-bar/foto.jpg";

export default function Avatar() {
  return <Image rounded="full" objectFit="cover" boxSize="30px" src={photo} />;
}
