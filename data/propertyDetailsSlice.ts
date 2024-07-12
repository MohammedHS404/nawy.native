// src/features/propertyDetails/propertyDetailsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { PropertyResponse } from '../types/propertyResponse';

interface PropertyDetailsState {
    property: PropertyResponse | null;
    loading: boolean;
    error: string | null;
}

const initialState: PropertyDetailsState = {
    property: null,
    loading: false,
    error: null,
};

export const fetchPropertyDetails = createAsyncThunk(
    'propertyDetails/fetchPropertyDetails',
    async (slug: string) => {
        console.log(slug);
        const response = await axios.get<PropertyResponse>(`http://192.168.1.20:5000/api/property/${slug}`);
        console.log(response.data.id);
        return response.data;
    }
);

const propertyDetailsSlice = createSlice({
    name: 'propertyDetails',
    initialState,
    reducers: {
        resetPropertyDetails: (state) => {
            state.property = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPropertyDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPropertyDetails.fulfilled, (state, action: PayloadAction<PropertyResponse>) => {
                state.loading = false;
                state.property = action.payload;
            })
            .addCase(fetchPropertyDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export const { resetPropertyDetails } = propertyDetailsSlice.actions;
export default propertyDetailsSlice.reducer;
