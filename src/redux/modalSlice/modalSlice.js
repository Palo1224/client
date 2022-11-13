import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
    activeLoginModal: null,
    activeLoginRedactor:null,
    activeLoginAdmin:null,
    activeCreacionClasifTema:null,
    activeCreacionPerfil:null,
    activeCreacionSistRef:null,
    activeCreacionEmpresa:null,
    eliminarContenido:null,
    activeLoadingArchivo:null,
    id:null,
  
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,

    reducers:{
        setModalValue( state ){
           state.isOpen = !state.isOpen;
        },
        activateLoginModal(state, {payload}){
            state.activeLoginModal = payload;
        },
        activeLoginAdmin(state, {payload}){
            state.activeLoginAdmin = payload;
        },
        activeLoginRedactor(state, {payload}){
            state.activeLoginRedactor = payload;
        },
        eliminarContenido(state, {payload}){
            state.eliminarContenido = payload;
        },
        activeLoadingArchivo(state, {payload}){
            state.activeLoadingArchivo = payload;
        },
        
        

        activeCreacionClasifTema(state, {payload}){
            state.activeCreacionClasifTema = payload;
        },

        activeCreacionPerfil(state, {payload}){
            state.activeCreacionPerfil = payload;
        },
        activeCreacionSistRef(state, {payload}){
            state.activeCreacionSistRef = payload;
        },
        activeCreacionEmpresa(state, {payload}){
            state.activeCreacionEmpresa = payload;
        },


    }
})


export const modalActions = modalSlice.actions;
export default modalSlice.reducer;