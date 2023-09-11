import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createComments } from '../../redux/apiCall.js/commentApiCall';
import './addComment.css';
function AddComment({postId}) {
    const dispatch = useDispatch()
    const [text,setText] = useState("");
    // form submit handler
    const FormSubmitHandler = (e) =>{
        e.preventDefault();
        if(text.trim() === "") return toast.error("please write something");
        dispatch(createComments({text , postId}))
        setText("")
    }
  return (
    <form className='add-comment'  onSubmit={FormSubmitHandler}>
        <input 
            type="text" 
            placeholder='Add a comment'
            className='add-comment-input'
            onChange={(e)=>setText(e.target.value)}
        />
        <button
           className='add-comment-btn'
           type='submit'
        >
            Comment
        </button>
            

    </form>
  )
}

export default AddComment
