import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';
import { useState } from 'react';

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-2xl mx-auto mt-8 p-4">
        <AddTaskForm onTaskAdded={() => setRefresh(!refresh)} />
        <TaskList refresh={refresh} />
      </main>
    </div>
  );
};

export default Dashboard;