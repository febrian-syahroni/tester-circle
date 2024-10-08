import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import Cookies from "js-cookie"; // Assuming this is the correct import for Cookies

interface User {
  name: string;
}

interface Post {
  id: number;
  content: string;
  imageUrl?: string;
  user?: User;
  userName?: string; // Tambahkan ini jika backend mengirim userName langsung
  comments: Comment[];
}

interface Comment {
  id: number;
  content: string;
  userName: string;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

// Thunk for creating a post
export const createPost = createAsyncThunk<Post, FormData>(
  "post/createPost",
  async (formData) => {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Pengguna tidak terotentikasi.");
    }

    try {
      console.log('Mengirim data:', Object.fromEntries(formData));
      const response = await axios.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log('Respons dari server:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error detail:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
      throw error;
    }
  }
);

// FetchPosts thunk for getting posts
export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchPosts",
  async () => {
    const response = await axios.get("/posts");
    console.log('Data posting yang diterima:', response.data);
    return response.data;
  }
);

// Thunk untuk menambahkan komentar
export const addComment = createAsyncThunk<Comment, { postId: number; content: string }>(
  "post/addComment",
  async ({ postId, content }, { rejectWithValue }) => {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Pengguna tidak terotentikasi.");
    }

    try {
      const response = await axios.post(`/posts/${postId}/comments`, { content }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Gagal menambahkan komentar");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = Array.isArray(action.payload) ? action.payload : [];
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message || "Gagal mengambil posting";
        state.loading = false;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        state.loading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.error.message || "Failed to create post";
        state.loading = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId } = action.meta.arg;
        const post = state.posts.find(p => p.id === postId);
        if (post) {
          post.comments.push(action.payload);
        }
      });
  },
});

export default postsSlice.reducer;
