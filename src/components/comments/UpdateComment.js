import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateComment } from '../../redux/apiCall.js/commentApiCall';
import './updateComment.css';
function UpdateComment({updateForComment,setUpdateComment}) {
    const [text,settext] = useState(updateForComment?.text)
    const dispatch = useDispatch()
    //Form Submit handler
    const formUpdateSubmitHandler = (e) =>{
        e.preventDefault();
        if(text.trim() === "") return toast.error("please write something");
        dispatch(updateComment(updateForComment?._id,{text}))
        setUpdateComment(false)
    }
    return (
        <div className='update-comment'>
            <form className='update-comment-form' onSubmit={formUpdateSubmitHandler}>
                <abbr title='close' >
                    <i onClick={()=>setUpdateComment(false)} className='bi bi-x-circle-fill update-comment-form-close'></i>
                </abbr>
                <h3 className='update-comment-title'>Update Comment</h3>
                <input type="text"   
                    className='update-comment-input'
                    placeholder='write update comment...'
                    onChange={(e)=>settext(e.target.value)}
                />
                <button type='submit'
                    className='update-comment-btn'
                >
                    Update Comment
                </button>
            </form>
        </div>
    )
}

export default UpdateComment
