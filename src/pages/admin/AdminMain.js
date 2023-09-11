import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AddCategory from './AddCategory'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategory } from '../../redux/apiCall.js/categoryApiCall'
import { countProfile } from '../../redux/apiCall.js/profileApiCall'
import { fetchAllComments } from '../../redux/apiCall.js/commentApiCall'
function AdminMain() {
  const {categories} = useSelector((state)=>state.categories)
  const {userCount} = useSelector((state)=>state.profile)
  const {posts} = useSelector((state)=>state.posts);
  const {comments} = useSelector((state)=>state.comments);
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchCategory())
  },[])
  useEffect(()=>{
    dispatch(countProfile())
  },[])
  useEffect(()=>{
    dispatch(fetchAllComments())
  },[])
  return (
    <div className='admin-main'>
      <div className='admin-main-header'>

        <div className='admin-main-card'>
          <h4 className='admin-main-title'>Users</h4>
          <div className='admin-main-count'>{userCount}</div>
          <div className='admin-main-btn'>
            <Link to='/admin-dashboard/users-table' className='main-btn'>
              See all users
            </Link>
            <i className='bi bi-person' />
          </div>
        </div>

        <div className='admin-main-card'>
          <h4 className='admin-main-title'>Posts</h4>
          <div className='admin-main-count'>{posts?.length}</div>
          <div className='admin-main-btn'>
            <Link to='/admin-dashboard/posts-table' className='main-btn'>
              See all posts
            </Link>
            <i className='bi bi-file-post' />
          </div>
        </div>

        <div className='admin-main-card'>
          <h4 className='admin-main-title'>Categories</h4>
          <div className='admin-main-count'>{categories?.length}</div>
          <div className='admin-main-btn'>
            <Link to='/admin-dashboard/categories-table' className='main-btn'>
              See all categories
            </Link>
            <i className='bi bi-tag-fill' />
          </div>
        </div>

        <div className='admin-main-card'>
          <h4 className='admin-main-title'>Comments</h4>
          <div className='admin-main-count'>{comments?.length}</div>
          <div className='admin-main-btn'>
            <Link to='/admin-dashboard/comments-table' className='main-btn'>
              See all comments
            </Link>
            <i className='bi bi-chat-left-text' />
          </div>
        </div>
      </div>
     
     <AddCategory/>
    </div>
  )
}

export default AdminMain
