/*import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const productApi = createApi({
    reducerPath:productApi,
    baseQuery:fetchBaseQuery({baseUrl:"/api/v1"}),
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:(params)=>"/products",
        }),

    }),
    
})
export const {useGetProductsQuery} = productApi*/

// productApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url:"/products",
        params:{
          page:params?.page,
          keyword:params?.keyword
        }
      })
    }),
    getProductsDetails: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery,useGetProductsDetailsQuery } = productApi;
