import { createSlice } from "@reduxjs/toolkit";



const categorySlice = createSlice({
    name:"category",
    initialState:{
        categories:null
    },
    reducers:{
        setCategory(state,action){
            state.categories = action.payload
        },
        addCategoty(state,action){
            state.categories.push(action.payload)
        },
        deleteCategoty(state,action){
            state.categories = state.categories.filter(c => c._id === action.payload)
        }
    }
})

const categoryReducer = categorySlice.reducer;
const categoryActions = categorySlice.actions;

export {categoryActions,categoryReducer}