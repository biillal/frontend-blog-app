import { createSlice } from "@reduxjs/toolkit";


const postSlice = createSlice({
    name:"posts",
    initialState:{
        posts:[],
        postss:[],
        postCount:null,
        postCategory:[],
        loading:false,
        isPostCreated:false,
        post:null,
        postCount:null
    },
    reducers:{
       getPosts(state,action){
         state.posts = action.payload
       },
       setPostCount(state,action){
         state.postCount = action.payload
       },
       setPostCate(state,action){
         state.postCategory = action.payload
       },
       setLoading(state){
         state.loading = true
       },
       clearLoading(state){
         state.loading = false
       },
       setIsPostCreated(state,action){
         state.isPostCreated=true
         state.loading=false
       },
       clearIsPostCreated(state,action){
         state.isPostCreated=false
         state.loading=false
       },
       setPost(state,action){
         state.post = action.payload
       },
       setLinks(state,action){
         state.post.likes = action.payload.likes
       },
       deletePots(state,action){
         state.posts = state.posts.filter(p=>p.id !== action.payload)
       },
       addCommentToPost(state,action){
         state.post.comments.push(action.payload)
       },
       updateCommentpost(state,action){
         state.post.comments = state.post.comments.map(comment=>
          comment._id === action.payload._id ? action.payload : comment)
       },
       deleteCommentPost(state,action){
         const comment = state.post.commments.find(p => p._id === action.payload)
         const commentIndexOf = state.post.comments.indexOf(comment)
         state.post.comments.splice(commentIndexOf,1) 
       },
       setPostCount(state,action){
         state.postCount = action.payload
       },
       
    }
})


const postReducer = postSlice.reducer
const postActions = postSlice.actions

export {postReducer,postActions}