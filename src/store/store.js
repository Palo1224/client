import { configureStore } from '@reduxjs/toolkit'
import  modalSlice  from '../redux/modalSlice/modalSlice'
import authSlice from '../redux/auth/authSlice'
import userSlice  from '../redux/user/users'
import perfilSlice from "../redux/perfiles/perfil"
// import devToolsEnhancer from 'remote-redux-devtools';
import temasSlice from '../redux/temas/temas'
import  sistRefSlice  from '../redux/sistRef/sistRef'
import clasifTemaSlice from "../redux/clasifTema/clasifTema"
import empresasSlice from "../redux/empresas/empresas"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'


  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, userSlice)

export const store = configureStore({
    reducer:{
        auth: authSlice,
        modal: modalSlice,
        perfil:perfilSlice,
        temas:temasSlice,
        sistRef:sistRefSlice,
        clasifTema:clasifTemaSlice,
        empresas:empresasSlice,
        user:persistedReducer

    },
middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
devTools: true,
    // enhancers: [devToolsEnhancer({ realtime: true, port: 3000 })],
})
export let persistor = persistStore(store)
