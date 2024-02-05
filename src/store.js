import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/authSlice";
import { addToken, addUser } from "./redux/authSlice";

const store=configureStore({
reducer:{
    user:authSlice
}
})

// Dispatch the addToken and addUser actions after store creation
store.dispatch(addToken());
store.dispatch(addUser());

export default store;