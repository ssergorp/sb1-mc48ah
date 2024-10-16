import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  text: string;
  status: 'todo' | 'inProgress' | 'done';
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task: Task = { id: Date.now(), text: newTask, status: 'todo' };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const moveTask = (id: number, newStatus: 'todo' | 'inProgress' | 'done') => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const renderTaskList = (status: 'todo' | 'inProgress' | 'done') => (
    <div className={`task-list ${status}`}>
      <h2>{status === 'todo' ? 'Tasks Need Doing' : status === 'inProgress' ? 'Tasks Working On' : 'Tasks Done'}</h2>
      <ul>
        {tasks.filter(task => task.status === status).map(task => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => removeTask(task.id)}>Remove</button>
            {status !== 'done' && (
              <button onClick={() => moveTask(task.id, status === 'todo' ? 'inProgress' : 'done')}>
                Move to {status === 'todo' ? 'In Progress' : 'Done'}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="task-manager">
      <form onSubmit={addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <div className="task-lists">
        {renderTaskList('todo')}
        {renderTaskList('inProgress')}
        {renderTaskList('done')}
      </div>
    </div>
  );
};

export default TaskManager;