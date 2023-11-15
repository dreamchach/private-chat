import authReducer from '@/utill/redux/authSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'

const persistConfig = {
    key : 'root',
    storage
}
const rootReducer = combineReducers({
    auth: authReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer : persistedReducer
})

export const persistor = persistStore(store)