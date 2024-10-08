import React from 'react';
import { Box, Text, VStack, Input, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface CommentProps {
  id: number;
  content: string;
  userName: string;
}

const Comment: React.FC<CommentProps> = ({ id, content, userName }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={3} mb={2}>
      <VStack align="start" spacing={1}>
        <Text>{id}</Text>
        <Text fontWeight="bold">{userName}</Text>
        <Text>{content}</Text>
      </VStack>
    </Box>
  );
};

interface CommentSectionProps {
  postId: number;
  comments: CommentProps[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments/${postId}`);
      if (Array.isArray(response.data)) {
        setComments(response.data);
        setError(null);
      } else {
        console.error('Data komentar yang diterima bukan array:', response.data);
        setComments([]);
        setError('Terjadi kesalahan saat mengambil komentar. Silakan coba lagi nanti.');
      }
    } catch (error) {
      console.error('Error mengambil komentar:', error);
      setComments([]);
      setError('Gagal mengambil komentar. Silakan periksa koneksi Anda dan coba lagi.');
    }
  };

  const handleCommentSubmit = async () => {
    try {
      await axios.post(`/api/comments/${postId}`, { content: newComment });
      setNewComment('');
      fetchComments(); // Memuat ulang komentar setelah mengirim
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <Box>
      <Text fontWeight="bold" mb={2}>Komentar:</Text>
      {error ? (
        <Text color="red.500">{error}</Text>
      ) : Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment, index) => (
          <Comment key={index} {...comment} />
        ))
      ) : (
        <Text>Belum ada komentar.</Text>
      )}
      <Box mt={4}>
        <Input
          placeholder="Tulis komentar..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          mb={2}
        />
        <Button onClick={handleCommentSubmit} colorScheme="blue">
          Kirim Komentar
        </Button>
      </Box>
    </Box>
  );
};

export default CommentSection;
