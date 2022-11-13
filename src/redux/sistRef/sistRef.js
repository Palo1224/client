import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchSistRef=createAsyncThunk("temas/fetchSistRef", async()=>{
    try {
        
        const res= await axios.get("https://qworkbaseback.up.railway.app/sistRef")
        return res.data
    } catch (error) {
      console.log(error)  
    } 
}) 
const  initialState={
    sistRef:[],
}

export const sistRefSlice=createSlice({
    name:"sistRef",
    initialState,
    reducers:{},
    extraReducers:{
        [fetchSistRef.fulfilled]:(state,{payload})=>
        {
          state.sistRef=payload     
        },
  

    }
})

export const fetchActions=fetchSistRef.actions
export default sistRefSlice.reducer