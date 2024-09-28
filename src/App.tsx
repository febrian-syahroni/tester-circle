import React, { useState } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

const App: React.FC = () => {
  const [posts, setPosts] = useState<{ title: string; content: string }[]>([]);
  const [editingPost, setEditingPost] = useState<{ title: string; content: string } | null>(null);

  const addPost = (post: { title: string; content: string }) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  const editPost = (post: { title: string; content: string }) => {
    setPosts((prevPosts) => 
      prevPosts.map((p) => (p.title === editingPost?.title ? post : p))
    );
    setEditingPost(null); // Reset editing post
  };

  const handleEdit = (post: { title: string; content: string }) => {
    setEditingPost(post);
  };

  return (
    <div>
      <h1>Buat Postingan</h1>
      <PostForm onAddPost={addPost} postToEdit={editingPost || undefined} onEditPost={editPost} />
      <PostList posts={posts} onEdit={handleEdit} />
    </div>
  );
};

export default App;
