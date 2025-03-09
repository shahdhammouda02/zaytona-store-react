import { createSlice } from "@reduxjs/toolkit";
import { fetchSearchResults } from "./searchAction";

const initialState = {
  query: "",
  history: [],
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
      if (action.payload && !state.history.includes(action.payload)) {
        state.history.unshift(action.payload);
        if (state.history.length > 10) state.history.pop();
      }
    },
    clearSearchQuery: (state) => {
      state.query = "";
    },
    clearSearchHistory: (state) => {
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery, clearSearchQuery, clearSearchHistory } =
  searchSlice.actions;
export default searchSlice.reducer;
