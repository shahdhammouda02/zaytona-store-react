import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFavorites,
  addToFavorites,
  removeFromFavorites,
  removeAllFromFavorites,
} from "./favAction";

const initialState = {
  favorites: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(removeAllFromFavorites.fulfilled, (state) => {
        state.favorites = [];
      });
  },
});

export const selectFavorites = (state) => state.favorites.favorites;
export const selectLoading = (state) => state.favorites.loading;
export const selectError = (state) => state.favorites.error;

export default favoritesSlice.reducer;
