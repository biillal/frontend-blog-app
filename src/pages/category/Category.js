import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import PostList from '../../components/posts/PostList';
import {useDispatch, useSelector} from 'react-redux';
import { getCategory } from '../../redux/apiCall.js/postApiCall';
function Category() {
    const {postCategory} = useSelector((state)=>state.posts)
    const {category} = useParams()
    const dispatch = useDispatch()
   
    useEffect(()=>{
      window.scrollTo(0,0)
      dispatch(getCategory(category))
    },[])
  return (
    <section className='category'>
       <h1 className='category-title'>Posts based on {category} </h1>
       <PostList posts={postCategory} />
    </section>
  )
}

export default Category
