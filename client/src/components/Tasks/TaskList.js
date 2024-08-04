import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import {
  TextField,
  MenuItem,
  Select,
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Modal,
  InputAdornment,
  IconButton,
  useTheme,
} from "@mui/material";
import TaskProgress from "./TaskProgress";
import { Search } from "@mui/icons-material";

const TaskList = () => {
  const theme = useTheme();

  const tasks = useSelector((state) => state.tasks || []);
  const [filterText, setFilterText] = useState("");
  const [filterDropdown, setFilterDropdown] = useState("all");
  const [sort, setSort] = useState("soonest");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  if (!Array.isArray(tasks)) {
    console.error("Tasks data is not an array:", tasks);
    return <Typography variant="h6">Error loading tasks</Typography>;
  }

  const now = new Date();
  const msInDay = 1000 * 60 * 60 * 24;

  const getFilteredTasks = () => {
    const now = new Date();
    const msInDay = 1000 * 60 * 60 * 24;

    let filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(filterText.toLowerCase())
    );

    switch (filterDropdown) {
      case "nextWeek":
        filtered = filtered.filter((task) => {
          const dueDate = new Date(task.dueDate);
          const differenceInDays = (dueDate - now) / msInDay;

          return differenceInDays >= 0 && differenceInDays <= 7;
        });
        break;

      case "nextMonth":
        filtered = filtered.filter((task) => {
          const dueDate = new Date(task.dueDate);
          const differenceInDays = (dueDate - now) / msInDay;

          return differenceInDays >= 0 && differenceInDays <= 30;
        });
        break;

      case "overdue":
        filtered = filtered.filter((task) => {
          const dueDate = new Date(task.dueDate);
          const differenceInDays = (now - dueDate) / msInDay;

          return differenceInDays >= 7;
        });
        break;

      default:
        break;
    }

    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === "soonest") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sort === "latest") {
      return new Date(b.dueDate) - new Date(a.dueDate);
    }
    return 0;
  });

  const handleEditTask = (task = null) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <Container maxWidth="md">
      <TaskProgress />
      <Box mb={2} mt={1} display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          spellCheck="false"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Search color="action" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Select
              value={filterDropdown}
              onChange={(e) => setFilterDropdown(e.target.value)}
              fullWidth
              sx={{
                "& .MuiSelect-select": {
                  padding: "12px 14px",
                  fontSize: "16px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.dark,
                },
                "& .MuiSelect-icon": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <MenuItem value="all">All Tasks</MenuItem>
              <MenuItem value="nextWeek">Due in the next week</MenuItem>
              <MenuItem value="nextMonth">Due in the next month</MenuItem>
              <MenuItem value="overdue">Overdue by a week or more</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              fullWidth
              sx={{
                "& .MuiSelect-select": {
                  padding: "12px 14px",
                  fontSize: "16px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.dark,
                },
                "& .MuiSelect-icon": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <MenuItem value="soonest">Soonest deadline</MenuItem>
              <MenuItem value="latest">Latest deadline</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setEditingTask(null);
                setShowForm(true);
              }}
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: 0.5,
                borderRadius: 2.5,
                height: "100%",
              }}
              size="large"
              fullWidth
            >
              Add Task
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <TaskItem task={task} onEdit={handleEditTask} />
            </Grid>
          ))
        ) : (
          <Typography ml={2} mt={1} variant="h6" fontWeight={600}>
            No tasks found
          </Typography>
        )}
      </Grid>
      <Modal
        open={showForm}
        onClose={handleCloseForm}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {editingTask ? "Edit Task" : "Add New Task"}
          </Typography>
          <TaskForm task={editingTask} onClose={handleCloseForm} />
        </Box>
      </Modal>
    </Container>
  );
};

export default TaskList;
