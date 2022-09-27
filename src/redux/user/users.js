import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";





export const fetchUser=createAsyncThunk('user/fetchUser',

async(id)=>{
        try {
            const res=await axios.get(`https://qworkapi.herokuapp.com/users/${id}`)
            return res.data;
        } catch (error) {
            console.log(error)
        }
})


export const fetchUsers=createAsyncThunk("user/fetchUsers",
async({search ,estado,empresa})=>{
    try {

        const res=await axios.get(`https://qworkapi.herokuapp.com/users?search=${search}&estado=${estado}&empresa=${empresa}`)
        return res.data;
        
        // else{
        //     const res=await axios.get(`https://qwork.herokuapp.com/users`)
        //     return res.data;
        // }
        
    } catch (error) {
        console.log(error)
    }

})
// export const fetchGoogleUser = createAsyncThunk('googleUser/fetchGoogleUser',
//     async() => {
//         try {
//             const { data } = await axios.get('https://qworkapi.herokuapp.com/users/login/success',{
//               method:"GET",
//               withCredentials:true,
//             })
//             return data.user
//         } catch (error) {
//             console.log(error)
//         }

//     })
const  initialState={
    user:{},
    users:[],

}


export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        loginSuccess(state, {payload}){
            state.user = payload
            // state.isLogged = true
        },
        logout(state){

            
                state.user = null
            
        },

    },
    extraReducers:{
        [fetchUser.fulfilled]:(state,{payload})=>
        {
          state.user=payload;
 
        },
        [fetchUsers.fulfilled]:(state,{payload})=>
        {
          state.users=payload     
        },
  
 }
})
export const {loginSuccess ,logout} = userSlice.actions

export const fetchActions=fetchUser.actions
export default userSlice.reducer