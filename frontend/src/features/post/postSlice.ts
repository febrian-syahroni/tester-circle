import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";

export interface Thread {
  id: number;
  content: string;
  image?: string;
  user: {
    username: string;
    fullname: string;
  };
  replies: Reply[];
}

interface Reply {
  id: number;
  content: string;
  image?: string;
  user: {
    username: string;
    fullname: string;
  };
}

interface ThreadsState {
  threads: Thread[];
  loading: boolean;
  error: string | null;
}

const initialState: ThreadsState = {
  threads: [],
  loading: false,
  error: null,
};

export const createThread = createAsyncThunk<Thread, { content: string; images?: File[] }>(
  "threads/createThread",
  async ({ content, images }) => {
    // const formData = new FormData();
    // formData.append("content", content);
    // if (images) {
    //   images.forEach((image) => formData.append("images", image));
    // }
    const response = await api.post("/threads", { content }, {
      headers: {
        // "Content-Type": "multipart/form-data",
      },
    });
    return response.data.thread;
  }
);

export const fetchThreads = createAsyncThunk<Thread[]>(
  "threads/fetchThreads",
  async () => {
    const response = await api.get("/threads");
    return response.data.threads;
  }
);

export const fetchThreadDetail = createAsyncThunk<{ thread: Thread; replies: Reply[] }, number>(
  "threads/fetchThreadDetail",
  async (threadId) => {
    const response = await api.get(`/threads/detail/${threadId}`);
    return response.data;
  }
);

export const replyToThread = createAsyncThunk<
  Thread,
  { threadId: number; content: string; images?: File[] }
>("threads/replyToThread", async ({ threadId, content, images }) => {
  const formData = new FormData();
  formData.append("content", content);
  if (images) {
    images.forEach((image) => formData.append("images", image));
  }
  const response = await api.post(`/threads/reply/${threadId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.thread;
});

const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.threads = action.payload;
        state.loading = false;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.error = action.error.message || "Gagal mengambil thread";
        state.loading = false;
      })
      .addCase(createThread.fulfilled, (state, action) => {
        state.threads.unshift(action.payload);
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        const index = state.threads.findIndex(
          (thread) => thread.id === action.payload.thread.id
        );
        if (index !== -1) {
          state.threads[index] = action.payload.thread;
        } else {
          state.threads.push(action.payload.thread);
        }
      })
      .addCase(replyToThread.fulfilled, (state, action) => {
        const thread = state.threads.find(
          (t) => t.id === action.meta.arg.threadId
        );
        if (thread) {
          thread.replies.push(action.payload);
        }
      });
  },
});

export default threadsSlice.reducer;