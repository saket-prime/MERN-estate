import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        },
        
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        
        updateStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        
        updateFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        
        deleteUserStart: (state) => {
            
            state.loading = true;
        },
        
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        
        deleteUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signoutUserStart: (state) => {
            state.loading = true;
        },
        
        signoutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        
        signoutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { 
    signInStart,
    signInSuccess, 
    signInFailure, 
    updateStart, 
    updateSuccess, 
    updateFailure, 
    deleteUserFailure, 
    deleteUserStart, 
    deleteUserSuccess,
    signoutUserFailure, 
    signoutUserStart, 
    signoutUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;