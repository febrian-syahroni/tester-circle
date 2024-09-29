   // src/components/PostForm.tsx
   import React, { useState } from 'react';

   interface Post {
       title: string;
       content: string;
   }

   interface PostFormProps {
       onAddPost: (post: Post) => void;
       postToEdit?: Post; // Tambahkan properti untuk post yang akan diedit
       onEditPost?: (post: Post) => void; // Tambahkan fungsi untuk mengedit post
   }

   const PostForm: React.FC<PostFormProps> = ({ onAddPost, postToEdit, onEditPost }) => {
       const [title, setTitle] = useState(postToEdit ? postToEdit.title : '');
       const [content, setContent] = useState(postToEdit ? postToEdit.content : '');

       const handleSubmit = (e: React.FormEvent) => {
           e.preventDefault();
           if (postToEdit) {
               onEditPost!({ title, content }); // Panggil fungsi edit jika ada post yang diedit
           } else {
               onAddPost({ title, content });
           }
           setTitle('');
           setContent('');
       };

       return (
           <form onSubmit={handleSubmit}>
               <input 
                   type="text" 
                   value={title} 
                   onChange={(e) => setTitle(e.target.value)} 
                   placeholder="Judul" 
                   required 
               />
               <textarea 
                   value={content} 
                   onChange={(e) => setContent(e.target.value)} 
                   placeholder="Konten" 
                   required 
               />
               <button type="submit">Buat Postingan</button>
           </form>
       );
   };

   export default PostForm;