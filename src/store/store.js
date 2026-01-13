import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from './storage'
import { createStateSyncMiddleware } from 'redux-state-sync'

import catalogReducer from './catalogSlice'
import menuReducer from './menuSlice'
import shoppingBagReducer from './shoppingBagSlice'
import filterReducer from './filterSlice'
import authReducer from './authSlice'
import checkoutSliceReducer from './checkoutSlice'

const isClient = typeof window !== 'undefined'

/* -------------------------------
   Root Reducer
-------------------------------- */
const rootReducer = combineReducers({
  catalog: catalogReducer,
  menu: menuReducer,
  shoppingBag: shoppingBagReducer,
  filter: filterReducer,
  auth: authReducer,
  checkout: checkoutSliceReducer,
})

/* -------------------------------
   Persist Config (CLIENT ONLY)
-------------------------------- */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'catalog',
    'menu',
    'shoppingBag',
    'filter',
    'auth',
    'checkout',
  ],
}

const reducer = isClient
  ? persistReducer(persistConfig, rootReducer)
  : rootReducer

/* -------------------------------
   Middleware (CLIENT ONLY)
-------------------------------- */
const middlewares = []

if (isClient) {
  middlewares.push(
    createStateSyncMiddleware({
      blacklist: [
        'persist/PERSIST',
        'persist/REHYDRATE',
        'persist/REGISTER',
        'persist/FLUSH',
        'persist/PAUSE',
        'persist/PURGE',
        'persist/RESOLVE',
        'persist/REJECT',
      ],
    })
  )
}

/* -------------------------------
   Store
-------------------------------- */
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
})

/* -------------------------------
   Persistor (CLIENT ONLY)
-------------------------------- */
export const persistor = isClient ? persistStore(store) : null

export default store
