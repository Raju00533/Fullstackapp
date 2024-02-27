import React, { FormEvent, useEffect, useState, useRef } from 'react';
import './App.css';
import axios from 'axios';
//import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  const [name, setName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    LoadTasks();
  }, []);

  const LoadTasks = async () => {
    try {
      const response = (await axios.get('http://localhost:4000/tasks/')).data;
      setTasks(response.tasks);
    } catch (e) {
      console.log('Error:', e);
    }
  };

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:4000/tasks/${taskId}`);
      alert('Task deleted successfully!!!');
      LoadTasks();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const markTaskCompleted = async (taskId, isCompleted) => {
    try {
      await axios.put(`http://localhost:4000/tasks/${taskId}`, { is_completed: !isCompleted });
      alert(`Task marked as ${isCompleted ? 'incomplete' : 'completed'}!!!`);
      LoadTasks();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task.id);
    setName(task.name); // Set the task name to the input field
    inputRef.current.focus(); // Focus on the input field
  };

  const handleEditChange = (e) => {
    setEditedTaskName(e.target.value);
  };

  const handleSubmitEdit = async (taskId) => {
    try {
      await axios.put(`http://localhost:4000/tasks/${taskId}`, { name: name });
      alert('Task edited successfully!!!');
      setEditingTask(null);
      LoadTasks();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget | HTMLButtonElement>) => {
    e.preventDefault();
    setName('');

    try {
      if (editingTask) {
        await axios.put(`http://localhost:4000/tasks/${editingTask}`, { name: name });
        alert('Task updated successfully!!!');
        setEditingTask(null);
      } else {
        await axios.post('http://localhost:4000/tasks/', { name });
        alert('New task added successfully!!!');
      }
      LoadTasks();
    } catch (e) {
      console.error('Error:', e);
    }
  };

  return (
    <div className='container'>
      <div className='fixed-top'>
        <div className="header">
          <h1>Todo Application</h1>
        </div>
        <div className='container'>
          <form className="input-group" onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Enter a task"
              onChange={handleTaskChange}
              className="form-control me-3"
              ref={inputRef} // Ref added to focus
              required
            />
            <button className="btn btn-primary" type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
          </form>
        </div>
      </div>
      <div className='container mt-5' style={{ maxHeight: '680px', overflowY: 'auto' }}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">isComplete</th>
              <th scope="col">Task </th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.isCompleted ? (
                  <span className="text text-success">Yes</span>
                ) : (
                  <span className="text text-warning">No</span>
                )}</td>
                <td>
                  {
                    task.name
                  }
                </td>
                <td>
                  {
                    <>
                      <button className='btn btn-info m-2' onClick={() => markTaskCompleted(task.id, task.isCompleted)}>Mark {task.isCompleted ? 'Incomplete' : 'Completed'}</button>
                      <button className='btn btn-warning m-2' onClick={() => handleEditClick(task)}>Edit</button>
                      <button className='btn btn-danger m-2' onClick={() => deleteTask(task.id)}>Delete</button>
                    </>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </div>
  );
}

export default App;
