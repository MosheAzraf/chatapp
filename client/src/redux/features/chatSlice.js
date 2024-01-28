import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomId:"",
    sendTo:""
}

const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{
        setChat : (state, action) => {
            state.roomId = action.payload.roomId
            state.sendTo = action.payload.sendTo
        },
        clearChat:(state, action) => {
            state = initialState;
        }
    }
});

export const {setChat, clearChat} = chatSlice.actions;
export default chatSlice.reducer;
