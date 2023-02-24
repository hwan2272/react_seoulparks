import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getParksList } from '../parks/ParkUtil';
import { RootState, AppThunk } from '../../app/store';

export interface ListState {
    item : any,
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ListState = {
    item: [],
    status: 'idle',
}

export const getParksListAsync = createAsyncThunk(
    'list/fetchList',
    async () => {
        const parksLIst = await getParksList();
        return parksLIst;
    }
);

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(getParksListAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getParksListAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.item = action.payload;
        })
        .addCase(getParksListAsync.rejected, (state) => {
            state.status = 'failed';
        })
    }
});

export default listSlice.reducer;



