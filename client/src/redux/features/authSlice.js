import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user:null,
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
            state.user = actions.payload;
            state.loading = false
        },
        setLoggedOut: (state, actions) => {
            state.isLoggedIn = false;
            state.user = null;
            state.loading = false;
        },
        
    }
});

export const {setLoggedIn, setLoggedOut, setLoading} = authSlice.actions;
export default authSlice.reducer;