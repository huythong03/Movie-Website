import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            // Thêm phim vào danh sách yêu thích
            const existingIndex = state.findIndex((movie) => movie.id === action.payload.id);
            if (existingIndex === -1) {
                state.push(action.payload); // Nếu chưa có, thêm vào danh sách
            }
        },
        removeFavorite: (state, action) => {
            // Xóa phim khỏi danh sách yêu thích
            return state.filter((movie) => movie.id !== action.payload.id);
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
