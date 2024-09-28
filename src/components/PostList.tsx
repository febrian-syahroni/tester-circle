import React from 'react';

interface Post {
    title: string;
    content: string;
}

interface PostListProps {
    posts: Post[];
    onEdit: (post: Post) => void; // Tambahkan properti untuk fungsi edit
}

const PostList: React.FC<PostListProps> = ({ posts, onEdit }) => {
    return (
        <div>
            <h2>Daftar Postingan</h2>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <button onClick={() => onEdit(post)}>Edit</button> {/* Tambahkan tombol edit */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
