import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchClasifTema=createAsyncThunk('clasifTema/fetchClasifTema',

async()=>{
        try {
            const res=await axios.get(`http://localhost:3001/clasifTema`)
            return res.data;
        } catch (error) {
            console.log(error)
        }
})
const initialState = {
    clasifTema: []
}

const clasifTemaSlice = createSlice({
    name: 'clasifTema',
    initialState,
    reducers:{
      
    },
    extraReducers:{
        [fetchClasifTema.fulfilled]:(state,{payload})=>
        {
          state.clasifTema=payload     
        }
    }
})

export const clasifTemaActions = fetchClasifTema.actions
export default clasifTemaSlice.reducer

