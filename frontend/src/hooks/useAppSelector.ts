import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store"; // Adjust the import path based on your store setup

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
