import {createSlice} from "@reduxjs/toolkit";

const initialPineconeIndexes = {
    indexes: [],
    currentIndex: {},
    isCurrentIndexChanged: false,
    initiallyLoaded: false
}

const pineconeIndexesSlice = createSlice({
    name: 'pineconeIndexes',
    initialState: initialPineconeIndexes,
    reducers: {
        getIndexes(state,action) {
            state.indexes = action.payload;
        },
        setCurrentIndex(state, action) {
          state.currentIndex = action.payload;
          state.isCurrentIndexChanged = true
        },
        updateInitiallyLoaded(state, action) {
            state.initiallyLoaded = action.payload;
        }
    }
})

export default pineconeIndexesSlice;
export const pineconeIndexesActions = pineconeIndexesSlice.actions