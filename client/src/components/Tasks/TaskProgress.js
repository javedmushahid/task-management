import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography } from "@mui/material";

const TaskProgress = () => {
  const tasks = useSelector((state) => state.tasks);
  let score = 0;

  tasks.forEach((task) => {
    const dueDate = new Date(task.dueDate);
    const completedDate = new Date(task.completedDate || Date.now());

    if (completedDate <= dueDate) {
      score += 1;
    } else {
      score -= 0.5;
    }
  });

  return (
    <Card
      sx={{ mb: 2, p: 2, boxShadow: 2, height: 60, borderRadius: 4, mt: 2 }}
    >
      <CardContent>
        <Typography fontWeight={700}>
          Progress Score - <span style={{ fontWeight: 500 }}>{score}</span>
        </Typography>
        <Typography variant="body1" color="text.secondary"></Typography>
      </CardContent>
    </Card>
  );
};

export default TaskProgress;
