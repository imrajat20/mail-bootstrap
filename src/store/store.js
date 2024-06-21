
import { configureStore, createSlice } from "@reduxjs/toolkit";


const initialState = {sender: ''};

const mySlice = createSlice({
    name: 'mail',
    initialState,
    reducers: {
        setSender(state, action) {
            state.sender = action.payload;
        }

    }
});
export const myAction = mySlice.actions;
const store = configureStore({
    reducer:  mySlice.reducer
});

export default store;