import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateNewoPost } from '../../redux/apiCall.js/postApiCall';
import './Update.css'
function UpdatePostModel({setUpdatePost,post}) {
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [category, setCategory] = useState(post.category);
    // Form submit handler
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formSubmitHandler = (e) =>{
        e.preventDefault();
        if (title.trim() === "") return toast.error("Post Title is required");
        if (category.trim() === "") return toast.error("Post Category is required");
        if (description.trim() === "") return toast.error("Post Description is required");

        dispatch(updateNewoPost(post?._id,{title,category,description}))
        setUpdatePost(false)
    }
  return (
    <div className='update-post'>
        <form className='update-post-form' onSubmit={formSubmitHandler}>
            <abbr title='close'>
                <i onClick={()=>setUpdatePost(false)} className='bi bi-x-circle-fill update-post-form-close'></i>
            </abbr>
            <h3 className='update-post-title'>Update Post</h3>
            <input 
                className='update-post-input'
                type="text"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />
            <select 
                className='update-post-input'
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
            >
                <option disabled value="">
                    Select all category
                </option>
                <option  value="music">music</option>
                <option  value="travelling">travelling</option>
            </select>
            <textarea rows='5'
                      className='update-post-textarea'
                      value={description}
                      onChange={(e)=>setDescription(e.target.value)}
            ></textarea>
            <button className='button-update-post'
                    type='submit'
            >
                Update Post
            </button>

            
        </form>
    </div>
  )
}

export default UpdatePostModel
