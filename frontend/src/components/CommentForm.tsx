import React, { useState } from 'react';
import { Box, Button, Input, HStack } from '@chakra-ui/react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addComment } from '../features/post/postSlice';

interface CommentFormProps {
  postId: number;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [content, setContent] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      dispatch(addComment({ postId, content }));
      setContent('');
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} mt={4}>
      <HStack>
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis komentar..."
        />
        <Button type="submit" colorScheme="green">
          Kirim
        </Button>
      </HStack>
    </Box>
  );
};

export default CommentForm;