import './App.css';
import { useEffect,useState } from "react";

function App() {
    const [users,setUsers] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect (() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch(error) {
                setError(error.message);
                setLoading(false);
                console.log(error);
            };
        }
        fetchUsers();
    },[]);

    if (loading) return <h1>Loading users</h1>;
    if (error) return <h1>Failed to fetch users</h1>;

    return(
        <div className='content'>
            <h1>First 5 Users</h1>
            <ol>
                {users.slice(0,5).map(user => (
                    <li key={user.id}>
                        <h2>{user.name}</h2>
                        <p>Company: {user.company.name}</p>
                        <p>Email: {user.email}</p>
                    </li>

                ))}
            </ol>
        </div>
    )
}

export default App;