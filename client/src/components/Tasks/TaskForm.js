import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../../redux/slices/taskSlice";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";

const TaskForm = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("To Do");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { title, description, dueDate, status };
    if (task) {
      dispatch(editTask({ ...task, ...taskData }));
      toast.success("Task updated successfully", { autoClose: 2000 });
    } else {
      dispatch(addTask({ ...taskData, id: Date.now() }));
      toast.success("Task added successfully", { autoClose: 2000 });
    }
    onClose();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
          },
        }}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
          },
        }}
      />
      <TextField
        label="Due Date"
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
          },
        }}
      />
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        fullWidth
        required
        sx={{
          borderRadius: 2.5,
        }}
      >
        <MenuItem value="To Do">To Do</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
      </Select>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          letterSpacing: 0.5,
          borderRadius: 2.5,
          mr: 2,
        }}
        size="large"
        fullWidth
      >
        {task ? "Update Task" : "Add Task"}
      </Button>
    </Box>
  );
};

export default TaskForm;
