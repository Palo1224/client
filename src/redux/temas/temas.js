import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchTemas=createAsyncThunk("temas/fetchTemas", async({search,id,ref,empresa })=>{
    try {
      
      if(id)
      {
        if(search)
        {
          const res= await axios.get(`https://qworkapi.herokuapp.com/contenidos?search=${search}&id=${id}`,)
          return res.data

        }
        else if(search=="".toString())
        {
          const res=await axios.get(`https://qworkapi.herokuapp.com/contenidos?id=${id}`,);
          return res.data
        }
        else if(ref)
        {
          const res=await axios.get(`https://qworkapi.herokuapp.com/contenidos?id=${id}&ref=${ref}`,);
          return res.data
        }
        else if(empresa){
          const res=await axios.get(`https://qworkapi.herokuapp.com/contenidos?id=${id}&empresa=${empresa}`,);
          return res.data
        }
        else
        {
          const res=await axios.get(`https://qworkapi.herokuapp.com/contenidos?id=${id}`);
          return res.data
        }
      }
      else {
        if(search)
        {
          const res= await axios.get(`https://qworkapi.herokuapp.com/contenidos?search=${search}`,)
          return res.data

        }
        else if(search=="")
        {
          const res=await axios.get(`https://qworkapi.herokuapp.com/contenidos`,);
          return res.data
        }
        else if(ref)
        {
          const res=await axios.get(`https://qworkapi.herokuapp.com/contenidos?ref=${ref}`,);
          return res.data
        }
        else if(empresa){
          const res=await axios.get(`https://qworkapi.herokuapp.com/contenidos?empresa=${empresa}`,);
          return res.data
        }
        else
        {
          const res=await axios.get(`https://qworkapi.herokuapp.com/contenidos`);
          return res.data
        }
      }

       
    } catch (error) {
      console.log(error.response.data.msg)  
    } 
}) 

export const fetchTema=createAsyncThunk("tema/fetchTema", async(_id)=>{
    try {
        
        const res= await axios.get(`https://qworkapi.herokuapp.com/contenidos/${_id}`)


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