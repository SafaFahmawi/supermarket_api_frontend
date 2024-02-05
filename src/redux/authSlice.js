import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
    message: "",
    user: "",
    token: "",
    loading: false,
    error: ""
}

export const SignUpUser = createAsyncThunk('/signup', async (credentials) => {
    try {
        const response = await axios.post("http://localhost:8000/signup", credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;  // Throw the response data in case of an error
    }
});

//The code also defines an asynchronous thunk called "loginUser", which is used to make an API call to login a user with the given "body" data. It uses the "createAsyncThunk" function from Redux Toolkit to simplify the process of handling the API call and updating the state based on the result.
export const loginUser = createAsyncThunk('/login', async (credentials) => {
    try {
        const response = await axios.post("http://localhost:8000/login", credentials);
        window.location.href = "/dataset";
        return response.data;
    } catch (error) {
        window.location.href = "/Signup";
        alert("Failed to login because account not found. Please create an account");
        throw error.response.data;  // Throw the response data in case of an error
    }
});

const authSlice = createSlice({
    name: "user",
    initialState,
    /**The slice also defines two reducers: "addToken" and "addUser", which are not used in this code but can be used to manually update the state with new token and user data. */
    reducers: {
        addToken: (state, action) => {
            state.token = localStorage.getItem("token")
        },

        addUser: (state, action) => {
            state.user = localStorage.getItem("user")
        },
    },

    extraReducers: (builder) => {
        // SignUp user
        builder
            .addCase(SignUpUser.pending, (state, action) => {
                state.loading = true;
            })
            //When the thunk is fulfilled (i.e., the API call succeeds), it updates the "token" and "user" properties with the values from the API response, sets "loading" to false, and saves the token and user data in the local storage.
            .addCase(SignUpUser.fulfilled, (state, { payload: { error, message } }) => {
                state.loading = false;
                if (error) {
                    state.error = error;
                } else {
                    state.message = message;
                }
            })
            //When the thunk is rejected (i.e., the API call fails), it sets "loading" to true.
            .addCase(SignUpUser.rejected, (state, action) => {
                state.loading = false;
            });
        //***********************************************************************
        // login user
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true;
            })
            //When the thunk is fulfilled (i.e., the API call succeeds), it updates the "token" and "user" properties with the values from the API response, sets "loading" to false, and saves the token and user data in the local storage.
            .addCase(loginUser.fulfilled, (state, { payload: { user, token } }) => {
                state.loading = false;
                state.token = token;
                state.user = user;
                localStorage.setItem("token", JSON.stringify(token));
                // store user details and basic auth data in local storage to keep user logged in between page refreshes
                localStorage.setItem("user", JSON.stringify(user));

                // Log the token to the console
                //console.log("Token:", token);
            })
            //When the thunk is rejected (i.e., the API call fails), it sets "loading" to true.
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
            });
    },
})

export const { addToken, addUser } = authSlice.actions;
export default authSlice.reducer;