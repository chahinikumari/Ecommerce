/*import {configureStore,getDefaultMiddleware} from "@reduxjs/toolkit"
import {productApi} from "./app.js/productApi"

export const store = configureStore({
    reducer:{
        [productApi.reducerPath]:productApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat([productApi.middleware]),
});*/

// store.js
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { productApi } from "./app/productApi";
import { authApi } from "./app/authApi";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]:authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productApi.middleware,authApi.middleware]),
});
