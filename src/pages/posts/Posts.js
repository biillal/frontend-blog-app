import React, { useEffect, useState } from 'react'
import PostList from '../../components/posts/PostList';
import Sidebar from '../../components/sidebar/Sidebar';
import { categories } from '../../dummyData'
import './posts.css'
import Pagination from '../../components/pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, getCountPosts } from '../../redux/apiCall.js/postApiCall';
function Posts() {
  const {posts,postCount} = useSelector((state)=>state.posts)
  const {categories} = useSelector((state)=>state.categories)
  const POST_PER_PAGE = 3
  const pages = Math.ceil(postCount/POST_PER_PAGE)
  const [currentPage,setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllPosts(currentPage))
    window.scrollTo(0,0)
  },[currentPage])
  useEffect(()=>{
    dispatch(getCountPosts())
  },[])
  return (
    <>
      <section className='posts'>
        <PostList posts={posts} />
        <Sidebar categories={categories} />
      </section>
      <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>

  )
}

export default Posts
