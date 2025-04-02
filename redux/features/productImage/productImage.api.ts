import { api } from "@/redux/api";

export interface ProductImagesResponse {
  url: string;
  position: number;
  filename: string;
  model_id: string;
}

export const productImageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProductImages: builder.query<
      ProductImagesResponse,
      { product_id: string; organization_id: string }
    >({
      query: ({ product_id, organization_id }) => ({
        url: "product-images",
        method: "GET",
        params: { product_id, organization_id },
      }),
      providesTags: ["ProductImage"],
    }),
    createProductImage: builder.mutation<
      string,
      { product_id: string; formData: FormData }
    >({
      query: ({ product_id, formData }) => ({
        url: "product-images",
        method: "PUT",
        params: { product_id },
        body: formData,
      }),
      invalidatesTags: ["ProductImage"],
    }),
    deleteProductImage: builder.mutation<
      string,
      { filename: string; organization_id: string; product_id: string }
    >({
      query: ({ filename, organization_id, product_id }) => ({
        url: "product-images",
        method: "DELETE",
        params: { filename, organization_id, product_id },
      }),
      invalidatesTags: ["ProductImage"],
    }),
  }),
});

export const {
  useGetProductImagesQuery,
  useCreateProductImageMutation,
  useDeleteProductImageMutation,
} = productImageApi;
