import { useAuth } from '../context/AuthContext';
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';
const Dashboard = () => {
    const { user, logout } = useAuth();
    const [refresh, setRefresh] = useState(false);

    const handleTaskAdded = () => setRefresh(!refresh);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* header igual */}
            <main className="max-w-2xl mx-auto mt-8 p-4">
                <AddTaskForm onTaskAdded={() => setRefresh(!refresh)} />
                <TaskList refresh={refresh} />
            </main>
        </div>
    );
};
export default Dashboard;