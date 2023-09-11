import { createSlice } from "@reduxjs/toolkit";


 const profileSlice = createSlice({
    name:"profile",
    initialState:{
        profileUser:null,
        loading:false,
        isProfileDeleted:false,
        userCount:null,
        profiles:[]
    },
    reducers:{
       setProfile(state,action){
         state.profileUser = action.payload
       },
       setProfilePhoto(state,action){
         state.profileUser.profilePhoto = action.payload
       },
       updateProfile(state,action){
         state.profileUser = action.payload
       },
       setLoading(state,action){
         state.loading = true
       },
       clearLoading(state,action){
         state.loading = false
       },
       setDeleteProfile(state,action){
         state.isProfileDeleted = true
         state.loading = false
       },
       clearDeleteProfile(state,action){
         state.isProfileDeleted = false
       },
       setUsersCount(state,action){
         state.userCount = action.payload
       },
       setProfiles(state,action){
         state.profiles = action.payload
       }
    }
})


const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export {profileReducer,profileActions}