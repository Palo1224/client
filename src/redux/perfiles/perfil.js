import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchPerfil=createAsyncThunk('perfil/fetchPerfil',

async()=>{
        try {
            const res=await axios.get(`https://qworkbaseback.up.railway.app/perfiles`)
            return res.data;
        } catch (error) {
            console.log(error)
        }
})
const initialState = {
    perfil: []
}

const perfilSlice = createSlice({
    name: 'perfil',
    initialState,
    reducers:{
      
    },
    extraReducers:{
        [fetchPerfil.fulfilled]:(state,{payload})=>
        {
          state.perfil=payload     
        }
    }
})

export const perfilActions = fetchPerfil.actions
export default perfilSlice.reducer

