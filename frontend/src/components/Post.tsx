import React from 'react';
import { Box, Text, Image, VStack } from '@chakra-ui/react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

interface PostProps {
  id: number;
  content: string;
  imageUrl?: string;
  userName: string;
  comments: Array<{ id: number; content: string; userName: string }>;
}

const Post: React.FC<PostProps> = ({ id, content, imageUrl, userName, comments }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
      <VStack align="start" spacing={3}>
        <Text fontWeight="bold">{userName}</Text>
        <Text>{content}</Text>
        {imageUrl && <Image src={imageUrl} alt="Post image" />}
        <CommentList comments={comments} />
        <CommentForm postId={id} />
      </VStack>
    </Box>
  );
};

export default Post;