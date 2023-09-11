import React, { useEffect, useState } from 'react'
import './create.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createNewPost } from '../../redux/apiCall.js/postApiCall';
import { RotatingLines } from 'react-loader-spinner';
function Create() {
  const dispatch = useDispatch()
  const { isPostCreated, loading } = useSelector((state) => state.posts)
  const { categories } = useSelector((state) => state.categories)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [file, setFile] = useState(null)

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("post title is requried")
    if (category.trim() === "") return toast.error("post category is requried")
    if (description.trim() === "") return toast.error("post description is requried")
    if (!file) return toast.error("post file is requried")
    console.log({ title, category, description, file })
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    dispatch(createNewPost(formData))
  }
  const navigate = useNavigate()
  useEffect(() => {
    if (isPostCreated) {
      navigate('/')
    }
  }, [navigate, isPostCreated])

  return (
    <section className="create-post">

      <h1 className="create-post-title">Create New Post</h1>
      <form className="create-post-form" onSubmit={formSubmitHandler}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Post Title"
          className="create-post-input"
        />
        <select
          className="create-post-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}

        >
          <option disabled value="">
            Select A Category
          </option>
          {
            categories?.map((category) => {
              return (
                <option key={category._id} value={category.title}>{category.title}</option>
              )
            })
          }

        </select>
        <textarea
          className="create-post-textarea"
          placeholder="Post Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
        ></textarea>
        <input
          className="create-post-upload"
          type="file"
          name="file"
          id="file"

          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="create-post-btn">
          {
            loading ? <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            /> : "Create"
          }
        </button>
      </form>
    </section>
  )
}


export default Create
