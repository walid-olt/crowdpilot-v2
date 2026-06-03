import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    isUpdatingWallet: false,
  },
  reducers: {
    setIsUpdatingWallet: (state, action: PayloadAction<boolean>) => {
      state.isUpdatingWallet = action.payload;
    },
  },
});

export const { setIsUpdatingWallet } = walletSlice.actions;
export default walletSlice.reducer;
