
import './App.css';
import React,{useState,useRef,useEffect} from 'react'
// import Button from 'react-bootstrap/Button';
import {FiEdit} from "react-icons/fi"
// import { Mycontext } from './context';
// import { useContext } from 'react';
export default  function App() {

  const [toDos,setToDos]=useState([])
  const [toDo,setToDo]=useState('')
  const [editId,setEditId] =useState(0)
  const [dueDate, setDueDate] = useState(null); 
  const [taskError, setTaskError] = useState("");

  // const [num,setNum] = useContext(Mycontext)

 
     const inputRef = useRef('null')
     useEffect(()=>{
      inputRef.current.focus();
      document.title = `To Do (${toDos.length})`
     })

     const currentDate = new Date();
     const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
     const currentDayName = dayNames[currentDate.getDay()];
     const addToDo = ()=>{
      if (toDo.trim() === "") {
        setTaskError("Task name cannot be empty.");
        return; 
      }
      const existingTask = toDos.find((task) => task.text === toDo);

      if (existingTask) {
        setTaskError("Task with the same name already exists.");
       return;
      }

      if(toDo!==''){
        setToDos([...toDos,{id:Date.now(),text:toDo,status:false,priority: false,dueDate: dueDate || null,}])
        setToDo('')
        setTaskError("")
      }
      if(editId){
        const editToDo = toDos.find((todo)=>todo.id === editId)
        const updateTodo = toDos.map((to)=> to.id === editToDo.id
        ?(to = {id:to.id,text:toDo,dueDate:dueDate})
        :(to = {id:to.id,text:to.text,dueDate: to.dueDate || null }))
        setToDos(updateTodo)
        setEditId(0)
        setToDo('')
        // setNum('Faizu')
      }
     }
     const onEdit = (id)=>{
        const editToDo = toDos.find((toDo)=>toDo.id===id)
        setToDo(editToDo.text)
        setDueDate(editToDo.dueDate || null);
        setEditId(editToDo.id)
     }
     const Delete = (id)=>{
      const item = toDos.find((obj2)=>obj2.id===id)
      if(!window.confirm(`Are you sure you want to remove ${item.text} ?`)){
        return
      }
      setToDos(toDos.filter((obj2)=>obj2.id!==id))
      }
      const togglePriority = (id) => {
        const updatedToDos = toDos.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                priority: !todo.priority,
              }
            : todo
        );
        setToDos(updatedToDos);
      };
      

      const toggleStatus = (id) => {
        const completionDateTime = new Date(); 
        const updatedToDos = toDos.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                status: !todo.status,
                completedDate: completionDateTime,
              }
            : todo
        );
        setToDos(updatedToDos);
      };
      const numCompletedTasks = toDos.filter((obj) => obj.text).length;
    
  return (
    <div className="app todos tasks-container">  
    <div className='header'>

      <div className="mainHeading">
        <h1 style={{ color: 'var(--primary-color)' }}>To Do App </h1>
      </div>
      <div className="subHeading">
        <br />
        <h2 style={{ color: 'var(--secondary-color)' }}>Wow, it's {currentDayName} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input ref={inputRef} value={toDo} onChange={(e)=>setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
  
   
    <input 
      type="checkbox"
      checked={dueDate !== null}
      onChange={() => setDueDate(dueDate === null ? new Date().toISOString() : null)}
    />

  
  {dueDate !== null && (
    <input
      type="date"
      value={dueDate ? dueDate.substr(0, 10) : ""}
      onChange={(e) => setDueDate(e.target.value)}
    />
  )}
        <button onClick={()=>{
        addToDo()
        }} className={editId ? 'my-edit-button' : 'my-add-button'}>{editId?'EDIT':'ADD'}</button>
      </div>
     {taskError && <p className="error" style={{textAlign:'center',color:'red'}}>{taskError}</p>}
    </div>
    
    {toDos.some((obj) => obj.text) && 
    <h2>My Task</h2>
     }
      {toDos.some((obj) => obj.text) && 
      <div className="todos myTasks column" style={numCompletedTasks >= 2 ? { overflowY: 'scroll',maxHeight: '200px' } : {}}>
     

       { toDos
     .sort((a, b) => {
    if (a.priority && !b.priority) {
      return -1; 
    } else if (!a.priority && b.priority) {
      return 1; 
    } else {
      return b.id - a.id; 
    }
  })
  .map((obj) => {

        return(  <div className="todo column">
            
          <div key={obj.id} className="left">
          <button
        className={`priority-button ${obj.priority ? 'priority' : 'no-priority'}`}
        onClick={() => togglePriority(obj.id)}
      >
        ★
      </button>
            <input onChange={(e)=>{
              toggleStatus(obj.id)
            
            }} value={obj.status} type="checkbox" name="" id="" />
            <p id={obj.status ? 'item' : ''}>
    {obj.text}{' '}
    {obj.status && (
     <span className="completion-time">
     Completed at{' '}
     {obj.completedDate.toLocaleTimeString([], {
       hour: 'numeric',
       minute: 'numeric',
       hour12: true, 
     })}
   </span>
    )}
  </p>
  {obj.dueDate && (
      <p className="due-date" style={{color:'green'}}>
        Due: {new Date(obj.dueDate).toLocaleDateString()}
      </p>
    )}
    {obj.reminder && (
      <p className="reminder">Reminder Set</p>
    )}
          </div>
          <div className="right">
 
     
            <div className="icon-container" onClick={() => onEdit(obj.id)}>
            <i className="icon-edit fa fa-edit"></i>
           </div>

<div className="icon-container" onClick={() => Delete(obj.id)}>
  <i className="icon-delete fas fa-trash"></i>
</div>

          </div>
        </div> )
       })}
  {toDos.some((obj) => obj.status) && 
<div className="completed-tasks todos column" >
  <h2>Completed Tasks</h2>
  {toDos
    .filter((obj) => obj.status)
    .map((obj) => (
      <div className="completed-task" key={obj.id}>
        <div className="completed-task-text">
          {obj.text}
        </div>
        <div className=" completion-time completed-task-datetime">
          Completed on:{' '}
          {obj.completedDate.toLocaleTimeString([], {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </div>
        <div className="completed-task-actions">
          <div className="icon-container" onClick={() => onEdit(obj.id)}>
            <FiEdit className="icon-edit" />
          </div>
          <div className="icon-container" onClick={() => Delete(obj.id)}>
            <i className="icon-delete fas fa-times"></i>
          </div>
        </div>
      </div>
    ))}
</div>
}

      </div>
}
    </div>
  );
}

