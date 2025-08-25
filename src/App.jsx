import axios from "axios";
import { useEffect, useRef, useState } from "react";

import Card from "./components/TodoCard";
import Loader from "./components/Loader";
const firebaseUrl='https://front-end-72f22-default-rtdb.asia-southeast1.firebasedatabase.app/'



function App(){

  let taskInput=useRef(null)
  let[todos,setTodos]=useState([])

  let[formStatus,setFormStatus]=useState(false)

  function handleSubmit(){

    setFormStatus(true)
    let task=taskInput.current.value
    axios.post(`${firebaseUrl}todos.json`,{

      title:task
    }).then(()=>{
      setFormStatus(false);
      fetchTodos()
    })

  }



  function fetchTodos(){

    axios.get(`${firebaseUrl}todos.json`).then(todos=>{

      let tempTodos=[];

      for(let key in todos.data){

        let todo={
          id:key,
          ...todos.data[key]
        }
        tempTodos.push(todo)
      }
      setTodos(tempTodos)
      // console.log(tempTodos)
    })
  }

  function handleDelete(id){

    axios.delete(`${firebaseUrl}todos/${id}.json`).then(()=>{

      fetchTodos()
    })
    // console.log('delete func is called')
  }

  useEffect(()=>{
    fetchTodos()//function called
  },[])
  return(

    <>
    
   <div>

    <div className="w-[400px] mx-auto mt-12">
      <h1 className="text-2xl font-bold">Manage your tasks!<span className="text-neutral-600">@ravi</span></h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rem assumenda eum?</p>
      <input ref={taskInput} className="mt-2 border rounded-xl p-3 w-full focus:outline-none border-neutral-300" type="text" placeholder="Add task i.e. Learn Hooks in react" />

      <button onClick={handleSubmit} className="mt-2 bg-violet-200 py-3 px-5 rounded-xl text-violet-900 flex items-center gap-4">Create Task{!formStatus ? " " : <Loader/>}</button>
    
    
    <div className="mt-12">

      {
        todos.map(todo=><Card title={todo.title} id={todo.id} handleDelete={handleDelete} key={todo.id} />)
      }
    </div>
    
    
    </div>
   </div>
    
    </>
  )
}



export default App;