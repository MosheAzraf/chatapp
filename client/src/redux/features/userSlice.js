import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    fullName: null,
    userName: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser :(state, action) => {
            const firstName = action.payload.firstName;
            const lastName = action.payload.lastName;
            state.fullName = `${firstName} + ${lastName}`;
            state.userName = action.payload.userName;
        },
        //onLogout
        clearUser:(state, aciton) => {
            state.fullName = null;
            state.firstName = null;
        }
    }
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;