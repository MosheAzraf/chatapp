import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user:null, // use it later.

}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setLoggedIn: (state, actions) => {
            state.isLoggedIn = true;
            state.user = null; //action.payload
        },
        setLoggedOut: (state, actions) => {
            state.isLoggedIn = false,
            state.user = null;
        },
        
    }
});

export const {setLoggedIn, setLoggedOut} = authSlice.actions;
export default authSlice.reducer;