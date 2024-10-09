import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { fetchThreads } from "../features/post/postSlice";

export const useFetchPosts = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);
};