import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    startChatWith:"",
}

const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{
        setChatWith : (state, action) => {
            state.startChatWith = action.payload;
        },
        clearChatWith: (state, action) => {
            state.startChatWith = "";
        }
    }
});

export const {setChatWith, clearChatWith} = chatSlice.actions;
export default chatSlice.reducer;
