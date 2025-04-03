import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductImagesResponse } from "./productImage.api";

interface InitialState {
  images: ProductImagesResponse[] | null;
}

const initialState: InitialState = {
  images: null,
};

const productImageSlice = createSlice({
  name: "productImages", 
  initialState,
  reducers: {
    setImages: (
      state,
      action: PayloadAction<ProductImagesResponse[] | null>
    ) => {
      state.images = action.payload;
    },
    addImages: (state, action: PayloadAction<ProductImagesResponse[]>) => {
      state.images = [...(state.images || []), ...action.payload];
    },
    removeImage: (state, action: PayloadAction<string>) => {
      if (state.images) {
        state.images = state.images.filter(
          (image) => image.filename !== action.payload
        );
      }
    },
    resetImages: (state) => {
      state.images = null;
    },
  },
});

export const { setImages, addImages, removeImage, resetImages } =
  productImageSlice.actions;

export default productImageSlice.reducer;
