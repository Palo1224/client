import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchTemas=createAsyncThunk("temas/fetchTemas", async({search,id,ref,empresa })=>{
    try {
      console.log(id)
      if(id)
      {
        if(search)
        {
          const res= await axios.get(`http://localhost:3001/contenidos?search=${search}&id=${id}`,)
          return res.data

        }
        else if(search=="")
        {
          const res=await axios.get(`http://localhost:3001/contenidos?id=${id}`,);
          return res.data
        }
        else if(ref)
        {
          const res=await axios.get(`http://localhost:3001/contenidos?id=${id}&ref=${ref}`,);
          return res.data
        }
        else if(empresa){
          const res=await axios.get(`http://localhost:3001/contenidos?id=${id}&empresa=${empresa}`,);
          return res.data
        }
        else
        {
          const res=await axios.get(`http://localhost:3001/contenidos?id=${id}`);
          return res.data
        }
      }
      else {
        if(search)
        {
          const res= await axios.get(`http://localhost:3001/contenidos?search=${search}`,)
          return res.data

        }
        else if(search=="")
        {
          const res=await axios.get(`http://localhost:3001/contenidos`,);
          return res.data
        }
        else if(ref)
        {
          const res=await axios.get(`http://localhost:3001/contenidos?ref=${ref}`,);
          return res.data
        }
        else if(empresa){
          const res=await axios.get(`http://localhost:3001/contenidos?empresa=${empresa}`,);
          return res.data
        }
        else
        {
          const res=await axios.get(`http://localhost:3001/contenidos`);
          return res.data
        }
      }

       
    } catch (error) {
      console.log(error)  
    } 
}) 

export const fetchTema=createAsyncThunk("tema/fetchTema", async(id)=>{
    try {
        
        const res= await axios.get(`http://localhost:3001/contenidos/${id}`)


        return  res.data
    } catch (error) {
      console.log(error.response.data.msg)  
    } 
}) 

const  initialState={
    temas:[],
    tema:{},
}

export const temasSlice=createSlice({
    name:"temas",
    initialState,
    reducers:{
      getClean(state){
        state.tema = {}
    }
    },
    extraReducers:{
        [fetchTemas.fulfilled]:(state,{payload})=>
        {
          state.temas=payload     
        },
 
        [fetchTema.pending]:(state)=>{
      },
      [fetchTema.fulfilled]:(state,{payload})=>
      {
        state.tema=payload     

      },
      [fetchTema.rejected]:(state)=>
      {
      }   

    }
})

export const temaActions = temasSlice.actions
export const fetchActions=fetchTemas.actions
export default temasSlice.reducer