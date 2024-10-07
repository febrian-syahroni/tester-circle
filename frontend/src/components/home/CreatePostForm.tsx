import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { createPost } from '../../features/post/postSlice';
import { Box, Button, Input, Textarea, VStack } from '@chakra-ui/react';

const CreatePostForm = () => {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      await dispatch(createPost(formData)).unwrap();
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("Gagal membuat posting:", error);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Apa yang Anda pikirkan?"
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <Button type="submit" colorScheme="blue">
          Posting
        </Button>
      </VStack>
    </Box>
  );
};

export default CreatePostForm;
