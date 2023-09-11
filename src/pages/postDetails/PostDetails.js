import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import AddComment from '../../components/comments/AddComment';
import CommentList from '../../components/comments/CommentList';
import UpdateComment from '../../components/comments/UpdateComment';
import { deletePost, getSinglePost, toggleLikesPost, updatePhotoPost } from '../../redux/apiCall.js/postApiCall';
import './postDetails.css';
import UpdatePostModel from './UpdatePostModel';
function PostDetails() {
  const dispatch = useDispatch()
  const { post } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)
  const { id } = useParams()
  const [file, setFile] = useState(null)
  const [updatePost, setUpdatePost] = useState(false)


  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getSinglePost(id))
  }, [id]);
  //update image submit handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("file is empty")
    const formData = new FormData()
    formData.append("image", file)
    dispatch(updatePhotoPost(post?._id, formData))
  }
  const navigate = useNavigate()
  // delete post handler
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((isOk) => {
        if (isOk) {
          dispatch(deletePost(post?._id))
          navigate(`/profile/${user?._id}`)
        } else {
          swal("Something went wrong!");
        }
      });
  }
  return (
    <div className='image-Details'>
      <div >
        <img src={file ? URL.createObjectURL(file) : post?.image?.url} className="imgD" />
        {post?.user?._id === user?._id && (
          <form className='update-image' onSubmit={updateImageSubmitHandler}>
            <label htmlFor='file' className='update-image-file'>
              <i className="bi bi-image-fill"></i>
              Select new image
            </label>
            <input
              type="file"
              name='file'
              style={{ display: "none" }}
              className='file'
              id='file'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type='submit' className='btn-file'>upload</button>
          </form>
        )}
        <h2 className='title-details'>{post?.title}</h2>
        <div className='post-details-user'>
          <img src={post?.user?.profilePhoto.url} className="image-user" />
          <span className='name-date-user'>
            <strong >
              <Link to={`/profile/${post?.user?._id}`} className='name' >{post?.user?.username}</Link>
            </strong>
            <span className='date'>{new Date(post?.createdAt).toDateString()} </span>
          </span>
        </div>
        <div className='descri'>
          {post?.description} music for our purposes might be as follows: music is an intentionally organized art
          form whose medium is sound and silence, with core elements of pitch (melody and harmony),
          rhythm (meter, tempo, and articulation), dynamics, and the qualities of timbre and texture
        </div>
        <div className='likes'>
          <span class="like">
            {
              user &&
              <i
                onClick={() => dispatch(toggleLikesPost(post?._id))}
                className={
                  post?.likes?.includes(user?._id)
                    ? "bi bi-hand-thumbs-up-fill"
                    : "bi bi-hand-thumbs-up"
                }
              ></i>
            }
            {post?.likes?.length} likes
          </span>

          {post?.user?._id === user?._id && (
            <span className='icons'>
              <i onClick={() => setUpdatePost(true)} class="bi bi-pencil-square"></i>
              <i onClick={deletePostHandler} class="bi bi-trash-fill"></i>
            </span>
          )}

        </div>
      </div>
      {
        user ? <AddComment postId={post?._id} />
          : <p>
            to write comment you should login first
          </p>
      }

      <CommentList comment={post?.comments} />
      {
        updatePost && <UpdatePostModel post={post} setUpdatePost={setUpdatePost} />
      }

    </div>
  )
}

export default PostDetails
