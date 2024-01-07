import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    loading:true
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setLoggedIn: (state, actions) => {
            state.isLoggedIn = true;
            state.loading = false
        },
        setLoggedOut: (state, actions) => {
            state.isLoggedIn = false;
            state.loading = false;
        },
        
    }
});

export const {setLoggedIn, setLoggedOut, setLoading} = authSlice.actions;
export default authSlice.reducer;