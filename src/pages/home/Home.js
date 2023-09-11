import React, { useEffect } from 'react';
import './home.css';
import PostList from '../../components/posts/PostList';
import Sidebar from '../../components/sidebar/Sidebar';
import { categories } from '../../dummyData'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../redux/apiCall.js/postApiCall';
import { fetchCategory } from '../../redux/apiCall.js/categoryApiCall';
function Home() {
  const {posts} = useSelector((state)=>state.posts)
  const {categories} = useSelector((state)=>state.categories)

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllPosts(1))
    window.scrollTo(0,0)
  },[])
  useEffect(()=>{
    dispatch(fetchCategory())
  },[])

  return (
    <section>
      <div className='header-home'>
        <div className='header-title'>
          <h1 className='title'>Welcome to Blog</h1>
        </div>
      </div>

      <div className="home-div">Last Posts</div>
      <div className='row-container'>
        <PostList posts={posts.slice(0, 3)} />
        <Sidebar categories={categories} />
      </div>
      <div className='home-see-all-posts'>
        <Link to="/posts" className="home-links">
          See All Posts
        </Link>
      </div>
    </section>
  )
}

export default Home
