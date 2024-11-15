"use client";
import styles from "./page.module.css";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { decrement, increment } from "@/lib/features/CounterSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const counterState = useAppSelector((state) => state.counter.value);
  return (
    <Box>
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        +
      </button>
      <h1>{counterState}</h1>
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        -
      </button>
    </Box>
  );
}
