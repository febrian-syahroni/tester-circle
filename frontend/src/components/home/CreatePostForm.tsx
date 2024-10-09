import React, { useState, ChangeEvent } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { createThread } from '../../features/post/postSlice';
import { Button, Input, Textarea, VStack, FormControl, FormLabel } from '@chakra-ui/react';

const CreatePostForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => setImage(e.target.files?.[0] || null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      await dispatch(createThread({
        // content: formData.get('content') as string,
        // images: formData.getAll('images') as File[]
        content: content,
      })).unwrap();
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("Gagal membuat posting:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel htmlFor="content">Konten Posting</FormLabel>
          <Textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            placeholder="Apa yang Anda pikirkan?"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="image">Unggah Gambar</FormLabel>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" isDisabled={!content.trim()}>
          Posting
        </Button>
      </VStack>
    </form>
  );
};

export default CreatePostForm;