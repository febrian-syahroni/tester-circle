import { useAppSelector } from "../../hooks/useAppSelector";
import { useFetchPosts } from "../../hooks/useFetchPosts";
import { Box, Text, Image, VStack, Divider } from "@chakra-ui/react";
import CreatePostForm from "./CreatePostForm";

const HomePage = () => {
  useFetchPosts(); // Ambil posting saat komponen dimuat

  const { posts, loading, error } = useAppSelector((state) => state.posts);

  const renderPostContent = (post: any) => {
    return (
      <VStack align="start" spacing={2} p={4} borderWidth={1} borderRadius="md" key={post.id || Math.random()}>
        <Text>{post.content || 'Tidak ada konten'}</Text>
        {post.imageUrl && <Image src={"http://localhost:5000/uploads/"+post.imageUrl} alt="" maxW="100%" h="auto" />}
        <Text fontSize="sm" color="gray.500">
          Diposting oleh {post.user?.name || post.userName || 'Pengguna tidak dikenal'}
        </Text>
        <Divider />
      </VStack>
    );
  };

  return (
    <Box color="white">
      <CreatePostForm />

      <Text fontSize="50px" fontWeight={700} mb={4}>Daftar Thread</Text>
      {loading && <Text>Memuat posting...</Text>}
      {error && <Text color="red.500">{error}</Text>}
      {!loading && !error && posts.length === 0 && <Text>Tidak ada posting tersedia.</Text>}
      {Array.isArray(posts) ? (
        posts.map((post) => renderPostContent(post))
      ) : (
        <Text>Data posting tidak valid</Text>
      )}
    </Box>
  );
};

export default HomePage;
