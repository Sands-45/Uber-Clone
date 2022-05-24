import { configureStore } from "@reduxjs/toolkit";
import NavSlice from "./slices/NavSlice"

const store = configureStore({
  reducer: {
    NavData: NavSlice,
  },
});
 export default store