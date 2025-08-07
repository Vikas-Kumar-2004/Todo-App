import React from "react";
import { Rating as MuiRating } from "@mui/material";
import API from "../api";

export default function Rating({ taskId, currentRating }) {
  const handleChange = async (e, value) => {
    await API.post(`/tasks/${taskId}/rate`, { rating: value });
  };
  return <MuiRating value={currentRating} onChange={handleChange} />;
}
