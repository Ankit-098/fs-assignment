import {
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const priorities = ['Low', 'Medium', 'High'];
import React, { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import checkAuth from "../auth/checkAuth";

function Dashboard() {
let navigate= useNavigate()
  useEffect(()=>{

    let token=   localStorage.getItem("authToken")
    if(!token){
     navigate("/login")
     return
    }
    // console.log(await checkAuth()) 
  },[])
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setCurrentTask({
      ...currentTask,
      [e.target.name]: e.target.value
    });
  };

  const handleOpen = (task = {}) => {
    setCurrentTask(task);
    setIsEditing(!!task.id);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentTask({});
    setOpen(false);
    setIsEditing(false);
  };

  const handleSubmit = () => {
    if (!currentTask.title || !currentTask.description || !currentTask.dueDate || !currentTask.priority) {
      alert("All fields are required!");
      return;
    }

    if (isEditing) {
      setTasks(tasks.map(task => (task.id === currentTask.id ? currentTask : task)));
    } else {
      setTasks([...tasks, { ...currentTask, id: Date.now() }]);
    }

    handleClose();
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
      Simple Kanban Board
      </Typography>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpen()}>
        Add Task
      </Button>
      <Grid container spacing={3} style={{ marginTop: 20 }}>
        {tasks.map(task => (
          <Grid item xs={12} sm={6} md={4} key={task.id} style={{width:"30%" }}>
            <Paper style={{ padding: 20, position: 'relative',}}>
              <Typography variant="h6">{task.title}</Typography>
              <Typography variant="body1">{task.description}</Typography>
              <Typography variant="body2">Due: {task.dueDate}</Typography>
              <Typography variant="body2">Priority: {task.priority}</Typography>
              <IconButton
                style={{ position: 'absolute', top: 10, right: 50 }}
                onClick={() => handleOpen(task)}
              >
                <Edit />
              </IconButton>
              <IconButton
                style={{ position: 'absolute', top: 10, right: 10 }}
                onClick={() => handleDelete(task.id)}
              >
                <Delete />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? "Edit Task" : "Add Task"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={currentTask.title || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={currentTask.description || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="dueDate"
            label="Due Date"
            type="date"
            fullWidth
            value={currentTask.dueDate || ''}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            select
            margin="dense"
            name="priority"
            label="Priority"
            fullWidth
            value={currentTask.priority || ''}
            onChange={handleChange}
          >
            {priorities.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isEditing ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};



export default Dashboard;
