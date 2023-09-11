import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createCategory } from '../../redux/apiCall.js/categoryApiCall';
import './addCategory.css';
function AddCategory() {
    const [title , setTitle ] = useState("")
    const dispatch = useDispatch()
    const formCategoryHandler=(e)=>{
        e.preventDefault();
        if(title.trim() === "") return toast.error("category is empty")
        dispatch(createCategory({title}))
        setTitle(" ")
    }
    return (
        <section className='section-add-category'>
            <div className='add-new-category'>
                <div className='admin-category-title'>Add New Category</div>
                <form className='form-add-category' onSubmit={formCategoryHandler}>
                    <span className='title-form'>Category Title</span>
                    <input type="text"
                        className='admin-category-input'
                        placeholder='Entre Category Title'
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                    />
                    <button type='submut'
                        className='admin-category-btn'
                    >
                        Add
                    </button>
                </form>
            </div>
        </section>
    )
}

export default AddCategory
