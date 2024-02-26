import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import sentReducer from "./sentSlice";
import inboxRducer from "./inboxSlice"


const storedIdToken = localStorage.getItem("idToken");
const storedEmail = localStorage.getItem("email");

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    sent: sentReducer,
    inbox: inboxRducer
  },
  preloadedState: {
    auth: {
      idToken: storedIdToken || null,
      isAuthenticated: !!storedIdToken,
      email: storedEmail || null,
    },
   
  },
});

export default store;