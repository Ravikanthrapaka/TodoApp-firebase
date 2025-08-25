




import React, { useState } from 'react'
import { CiTrash } from "react-icons/ci";
import Loader from './Loader';




function TodoCard({title,handleDelete,id}) {

    let [deleteStatus,setDeleteStatus]=useState(false);



    function handleDeleteClick(){

        setDeleteStatus(true);
        handleDelete(id)
    }
  return (
    <div className='border mt-3 border-neutral-300 box-border rounded-xl p-4 flex items-center justify-between'>
      <h2 className='text-neutral-700'>{title}</h2>
    
        <button onClick={handleDeleteClick} className='text-neutral-600 text-xl hover:text-red-700'>{ deleteStatus ? <Loader /> : <CiTrash />}</button>
    
    </div>
  )
}

export default TodoCard
