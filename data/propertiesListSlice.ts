// src/features/pagination/paginationSlice.ts
import { PaginationDto } from '@/types/PaginationDto';
import { PropertyFiltersDto } from '@/types/PropertyFiltersDto';
import { PropertyListRequest } from '@/types/propertyListRequest';
import { PropertyResponse } from '@/types/propertyResponse';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const PAGE_LIMIT = 24;

export interface PaginationState {
    properties: PropertyResponse[];
    filters: PropertyFiltersDto;
    currentPage: number;
    totalPages: number;
    totalItems: number;
    loading: boolean;
    error: string | null;
}

const initialState: PaginationState = {
    properties: [],
    filters: {},
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    loading: false,
    error: null,
};

interface GetPropertiesResponse {
    properties: PropertyResponse[];
    totalCount: number;
}

export const fetchItems = createAsyncThunk(
    'pagination/fetchItems',
    async ({ currentPage, filters }: { currentPage: number; filters: PropertyFiltersDto }) => {
        const pagination: PaginationDto = new PaginationDto({
            page: currentPage,
            limit: 24,
            sortBy: 'id',
            sortOrder: 'asc',
        });

        const requestPayload: PropertyListRequest = { pagination, filters };
        console.log(process.env.EXPO_PUBLIC_API_URL)
        const response = await axios.post<GetPropertiesResponse>(
            `${process.env.EXPO_PUBLIC_API_URL}/property/list`,
            requestPayload
        );

        return response.data;
    }
);

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<PropertyFiltersDto>) => {
            state.filters = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        resetProperties: (state) => {
            state.properties = [];
            state.currentPage = 1;
            state.totalPages = 0;
            state.totalItems = 0;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchItems.fulfilled, (state, action: PayloadAction<GetPropertiesResponse>) => {
                state.loading = false;
                if (state.currentPage === 1) {
                    state.properties = action.payload.properties; // Refresh or initial load
                } else {
                    state.properties.push(...action.payload.properties); // Append for pagination
                }
                state.totalPages = Math.ceil(action.payload.totalCount / PAGE_LIMIT);
                state.totalItems = action.payload.totalCount;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export const { setFilters, setCurrentPage, resetProperties } = paginationSlice.actions;
export default paginationSlice.reducer;