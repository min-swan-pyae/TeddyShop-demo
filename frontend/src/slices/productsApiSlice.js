import { PRODUCTS_URL,UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
     
      keepUnusedDataFor: 5,
       providesTags:['Products'],   //For no need to reload
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method:"POST",
      }),
      //To stop it from being cached so that we will have fresh data, if not we will have to reload the page after we click create product
      invalidatesTags:['Product']
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: "PUT",
        body:data
      }),
      invalidatesTags:['Products']
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body:data
      })
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      })
    })
  }),
 
});

export const { useGetProductsQuery, useGetProductDetailsQuery,useCreateProductMutation,useUpdateProductMutation,useDeleteProductMutation,useUploadProductImageMutation } =
  productsApiSlice;
