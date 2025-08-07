import React, { useEffect, useState } from "react";
import { Button, Container, Typography, List, ListItem, IconButton } from "@mui/material";
import API from "../api";
import DeleteIcon from "@mui/icons-material/Delete";
import Rating from "./Rating";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <Container>
      <Typography variant="h5">My Tasks</Typography>
      <List>
        {tasks.map(task => (
          <ListItem key={task._id}>
            {task.title} - {task.description}
            <Rating taskId={task._id} currentRating={task.rating || 0} />
            <IconButton onClick={() => deleteTask(task._id)}><DeleteIcon /></IconButton>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" href="/add-task">Add Task</Button>
    </Container>
  );
}
