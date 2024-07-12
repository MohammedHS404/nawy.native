
import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './propertiesListSlice';
import propertyDetailsReducer from './propertyDetailsSlice';

const store = configureStore({
    reducer: {
        propertiesList: propertiesReducer,
        propertyDetails: propertyDetailsReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch