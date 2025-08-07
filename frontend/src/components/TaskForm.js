import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function TaskForm() {
  const [form, setForm] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await API.post("/tasks", form);
    navigate("/tasks");
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Add Task</Typography>
      <TextField label="Title" fullWidth margin="normal" onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <TextField label="Description" fullWidth margin="normal" onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <Button variant="contained" fullWidth onClick={handleSubmit}>Add</Button>
    </Container>
  );
}
