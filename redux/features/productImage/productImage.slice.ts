import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductImagesResponse } from "./productImage.api";

interface InitialState {
  images: ProductImagesResponse[] | null;
}

const initialState: InitialState = {
  images: null,
};

const productImageSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<ProductImagesResponse[]>) => {
      state.images = action.payload;
    },
    removeImage: (state, action: PayloadAction<ProductImagesResponse>) => {
      state.images =
        state.images?.filter(
          (image) => image.filename !== action.payload.filename
        ) ?? state.images;
    },
  },
});

export const { setImages, removeImage } = productImageSlice.actions;

export default productImageSlice.reducer;
