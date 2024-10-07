// src/hooks/useFetchPosts.ts
import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { fetchPosts } from "../features/post/postSlice"; // Use fetchPosts

export const useFetchPosts = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts()); // Dispatch fetchPosts instead of getPosts
  }, [dispatch]);
};
