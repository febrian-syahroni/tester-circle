import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VStack, Text } from '@chakra-ui/react';
import CommentSection from './home/CommentSection';

interface CommentData {
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
  };
  postId: number;
}

interface CommentListProps {
  postId: number;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/comments/${postId}`);
        setComments(response.data);
        setError(null);
      } catch (err) {
        console.error('Kesalahan saat mengambil komentar:', err);
        setError('Terjadi kesalahan saat mengambil komentar. Silakan coba lagi nanti.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  if (isLoading) {
    return <Text>Memuat komentar...</Text>;
  }

  if (error) {
    return (
      <Text color="red.500">
        {error}
        <button onClick={() => window.location.reload()}>Coba lagi</button>
      </Text>
    );
  }

  return (
    <VStack align="stretch" spacing={2} mt={4}>
      {comments.map((comment) => (
        <CommentSection
          key={comment.id} 
          comments={[{
            id: comment.id,
            content: comment.content,
            userName: comment.user.name,
          }]}
          postId={comment.postId}
        />
      ))}
    </VStack>
  );
};

export default CommentList;
