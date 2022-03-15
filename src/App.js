import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
const URL='http://localhost:/Shoppinglist/';



function App() {
  const [task, setTask] = useState({description:'',amount:''});
  const [tasks,setTasks] = useState([]);
  


  useEffect(() => {
    axios.get(URL)
    .then((response) => {     
     setTasks(response.data);
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
 
    });
  }, [])

  function handleChange(e) {
    const value = e.target.value;
    setTask({
      ...task,
      [e.target.name]: value
    });
  }

  function save(e) {
    e.preventDefault();

    const json = JSON.stringify(task);

    axios.post(URL + 'add.php',json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      setTasks(tasks => [...tasks,response.data]);
      setTask({description:'',amount:''});
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    });
  }

  function remove(id) {
    const json = JSON.stringify({id:id})
    axios.post(URL + 'delete.php',json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      const newListWithoutRemoved = tasks.filter((item) => item.id !== id);
      setTasks(newListWithoutRemoved);
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    });
  }



  return (
    <div className="container">
      <form onSubmit={save}>
        <h2>Shopping list</h2>
        <label>New Task</label>
        <input name='description' value={task.description} placeholder='Type description' onChange={handleChange} />
        <input name='amount' value={task.amount} placeholder='Type amount' onChange={handleChange} />
        <button>Add</button>
      </form>

     <ol>
       {tasks?.map(task => (
         <li key={task.id}>
          {task.description}&nbsp;
          {task.amount}&nbsp;
          <a href="#" className="delete" onClick={() => remove(task.id)}>
            Delete
            </a>
           </li>
       ))}
     </ol>
    </div>
  );
}

export default App;
