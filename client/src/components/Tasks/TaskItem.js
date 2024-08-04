import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editTask, deleteTask } from "../../redux/slices/taskSlice";
import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import { toast } from "react-toastify";

const TaskItem = ({ task, onEdit }) => {
  const dispatch = useDispatch();
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date();
      const dueDate = new Date(task.dueDate);
      const difference = dueDate - now;
      if (difference < 0) {
        setRemainingTime("Due Date Passed");
        return;
      }
      let timeLeft = "";
      if (difference < 60000) {
        timeLeft = `${Math.floor(difference / 1000)} seconds`;
      } else if (difference < 3600000) {
        timeLeft = `${Math.floor(difference / 60000)} minutes`;
      } else if (difference < 86400000) {
        timeLeft = `${Math.floor(difference / 3600000)} hours`;
      } else if (difference < 604800000) {
        timeLeft = `${Math.floor(difference / 86400000)} days`;
      } else if (difference < 2592000000) {
        timeLeft = `${Math.floor(difference / 604800000)} weeks`;
      } else {
        timeLeft = `${Math.floor(difference / 2592000000)} months`;
      }

      setRemainingTime(timeLeft);
    };

    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, [task.dueDate]);

  const handleEdit = () => {
    if (onEdit) onEdit(task);
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    toast.success("Task deleted successfully", { autoClose: 2000 });
  };

  return (
    <Card sx={{ mb: 2, p: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {task.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {task.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Due: {new Date(task.dueDate).toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Remaining Time:{" "}
          <span style={{ fontWeight: 600 }}>{remainingTime}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {task.status}
        </Typography>
        <Box mt={2} display="flex" gap={1}>
          <Button
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: 0.5,
              borderRadius: 2.5,
              mr: 2,
            }}
            size="large"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: 0.5,
              borderRadius: 2.5,
              mr: 2,
            }}
            size="large"
            fullWidth
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
