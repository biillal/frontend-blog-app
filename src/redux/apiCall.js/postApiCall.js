import axios from "axios";
import { toast } from "react-toastify";
import { postActions } from "../slice/postSlice";


// get all posts
export function getAllPosts(pageNumber){
    return async(dispatch)=>{
        try {
            const {data} = await axios.get(`https://blog-app-bu5e.onrender.com/api/posts?pageNumber=${pageNumber}`)
            dispatch(postActions.getPosts(data.posts))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
// get all posts admin
export function getAllPostsAdmin(){
    return async(dispatch)=>{
        try {
            const {data} = await axios.get(`https://blog-app-bu5e.onrender.com/api/posts`)
            dispatch(postActions.getPosts(data.posts))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
// get count posts
export function getCountPosts(){
    return async(dispatch)=>{
        try {
            const {data} = await axios.get(`https://blog-app-bu5e.onrender.com/api/posts/count`)
            dispatch(postActions.setPostCount(data.count))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

// get category posts
export function getCategory(category){
    return async(dispatch)=>{
        try {
            const {data} = await axios.get(`https://blog-app-bu5e.onrender.com/api/posts?category=${category}`)
            dispatch(postActions.setPostCate(data.posts))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

// create new post
export function createNewPost(newPost){
    return async(dispatch,getState)=>{
        try {
            dispatch(postActions.setLoading())
            const {data} = await axios.post(`https://blog-app-bu5e.onrender.com/api/posts`,newPost,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type" : "multipart/form-data"
                }
            });
            dispatch(postActions.setIsPostCreated())
            setTimeout(()=>dispatch(postActions.clearIsPostCreated()),2000)
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(postActions.clearLoading())
        }
    }
}
// count post
export function countPost(){
    return async(dispatch,getState)=>{
        try {
            dispatch(postActions.setLoading())
            const {data} = await axios.post(`https://blog-app-bu5e.onrender.com/api/posts/count`,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(postActions.setPostCount(data?.count))
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(postActions.clearLoading())
        }
    }
}

// get one post
export function getSinglePost(postId){
    return async(dispatch)=>{
        try {
            const {data} = await axios.get(`https://blog-app-bu5e.onrender.com/api/posts/${postId}`)
            dispatch(postActions.setPost(data))
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
// likes post
export function toggleLikesPost(postId){
    return async(dispatch,getState)=>{
        try {
            const {data} = await axios.put(`https://blog-app-bu5e.onrender.com/api/posts/like/${postId}`,{},{
                headers:{
                   Authorization : "Bearer " + getState().auth.user.token
                } 
            })
            dispatch(postActions.setLinks(data))
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function updatePhotoPost(postId,newPhoto){
    return async(dispatch,getState)=>{
        try {
            const {data} = await axios.put(`https://blog-app-bu5e.onrender.com/api/posts/update-image/${postId}`,newPhoto,{
                headers:{
                   Authorization : "Bearer " + getState().auth.user.token,
                   "Content-Type" : "multipart/form-data"
                } 
            })
            toast.success("image updated successfully")
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}


export function updateNewoPost(postId,newPost){
    return async(dispatch,getState)=>{
        try {
            const {data} = await axios.put(`https://blog-app-bu5e.onrender.com/api/posts/${postId}`,newPost,{
                headers:{
                   Authorization : "Bearer " + getState().auth.user.token,
                } 
            })
                dispatch(postActions.setPost(data))            
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}


export function deletePost(postId){
    return async(dispatch,getState)=>{
        try {
            const {data} = await axios.delete(`https://blog-app-bu5e.onrender.com/api/posts/${postId}`,{
                headers:{
                   Authorization : "Bearer " + getState().auth.user.token,
                } 
            })
                dispatch(postActions.setPost(data.postId))
                toast.success(data.message)            
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}