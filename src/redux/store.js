import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import reviewsReducer from './reviewsSlice';

const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        reviews: reviewsReducer,
    },
});

export default store;
export { store };