import { createSlice } from "@reduxjs/toolkit";

const translationSlice = createSlice({
  name: "translation",
  initialState: {
    translationlanguage: [],
    defaultLanguage: "en",
    isLanguapePopMenuOpen: false,
  },
  reducers: {
    setTranslation: (state, action) => {
      state.translationlanguage = action.payload;
    },
    setDefaultLanguage: (state, action) => {
      state.defaultLanguage = action.payload;
    },
    setIsLanguapePopMenuOpen: (state, action) => {
      state.isLanguapePopMenuOpen = action.payload;
    },
  },
});

export default translationSlice.reducer;
export const { setTranslation, setDefaultLanguage, setIsLanguapePopMenuOpen } =
  translationSlice.actions;
