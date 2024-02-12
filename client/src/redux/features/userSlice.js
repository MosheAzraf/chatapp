import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    fullName: null,
    userName: null,
    loading: true
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.loading = action.payload; 
        },
        setUser :(state, action) => {
            const firstName = action.payload.firstName;
            const lastName = action.payload.lastName;
            state.fullName = `${firstName} + ${lastName}`;
            state.userName = action.payload.userName;
        },
        clearUser:(state, aciton) => {
            state.fullName = null;
            state.firstName = null;
        }
    }
});

export const {setUser,setIsLoading ,clearUser} = userSlice.actions;
export default userSlice.reducer;