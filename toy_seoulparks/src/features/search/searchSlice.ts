import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getParksList } from '../parks/ParkUtil';
import { RootState, AppThunk } from '../../app/store';

export interface ListState {
    baseList : any,
    conditions : any,
    searchedList : any,
    backEventOn : boolean,
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ListState = {
    baseList: [],
    conditions: [],
    searchedList: [],
    backEventOn : false,
    status: 'idle',
}

export const getParksListAsync = createAsyncThunk(
    'search/fetchBaseList',
    async () => {
        const parksLIst = await getParksList();
        return parksLIst;
    }
);

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        initMainList: (state) => {
            state.backEventOn = false;
        },
        backToMainList: (state) => {
            state.backEventOn = true;
        },
        conditionSearched: (state, action) => {
            state.conditions = action.payload.condition;
            state.searchedList = action.payload.list;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getParksListAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getParksListAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.baseList = action.payload;
        })
        .addCase(getParksListAsync.rejected, (state) => {
            state.status = 'failed';
        })
    }
});

export const { initMainList, backToMainList, conditionSearched } = searchSlice.actions;

export default searchSlice.reducer;



