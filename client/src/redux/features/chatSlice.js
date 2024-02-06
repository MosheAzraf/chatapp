import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomId:"",
    sendTo:"",
    isNewChat:false
}

const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{
        setChatWith : (state, action) => {
            state.sendTo = action.payload.sendTo;
        },
        setChatRoomId:(state, action) => {
            state.roomId = action.payload.roomId;
        },
    }
});

export const {setChatWith,setChatRoomId } = chatSlice.actions;
export default chatSlice.reducer;
