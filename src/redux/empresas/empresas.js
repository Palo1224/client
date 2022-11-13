import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchEmpresas=createAsyncThunk('empresas/fetchEmpresas',

async()=>{
        try {
            const res=await axios.get(`https://qworkbaseback.up.railway.app/empresa`)
            return res.data;
        } catch (error) {
            console.log(error)
        }
})
const initialState = {
    empresas: []
}

const empresasSlice = createSlice({
    name: 'empresa',
    initialState,
    reducers:{
      
    },
    extraReducers:{
        [fetchEmpresas.fulfilled]:(state,{payload})=>
        {
          state.empresas=payload     
        }
    }
})

export const empresasActions = fetchEmpresas.actions
export default empresasSlice.reducer

