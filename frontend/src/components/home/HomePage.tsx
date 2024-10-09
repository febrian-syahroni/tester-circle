import { useAppSelector } from "../../hooks/useAppSelector";
import { useFetchPosts } from "../../hooks/useFetchPosts";
import { Box, Text, Image, VStack, Divider } from "@chakra-ui/react";
import CreatePostForm from "./CreatePostForm";
import CommentSection from "./CommentSection";
import { Thread } from "../../features/post/postSlice";
const HomePage = () => {
  useFetchPosts(); // Ambil posting saat komponen dimuat

  const { threads, loading, error } = useAppSelector((state) => state.threads);

  const renderPostContent = (thread: Thread) => {
    return (
      <VStack align="start" spacing={2} p={4} borderWidth={1} borderRadius="md" key={thread.id}>
        <Text>{thread.content}</Text>
        {thread.image && <Image src={`http://localhost:5000/uploads/${thread.image}`} alt="" maxW="100%" h="auto" />}
        <Text fontSize="sm" color="gray.500">
          Diposting oleh {thread.user?.fullname}
        </Text>
        <Divider />
        <CommentSection threadId={thread.id} />
      </VStack>
    );
  };

  return (
    <Box color="white">
      <CreatePostForm />

      <Text fontSize="50px" fontWeight={700} mb={4}>Daftar Thread</Text>
      {loading && <Text>Memuat thread...</Text>}
      {error && <Text color="red.500">{error}</Text>}
      {!loading && !error && threads.length === 0 && <Text>Tidak ada thread tersedia.</Text>}
      {threads.map((thread) => renderPostContent(thread))}
    </Box>
  );
};

export default HomePage;
