import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        addReview: (state, action) => {
            state.push(action.payload); // Thêm đánh giá
        },
        removeReview: (state, action) => {
            return state.filter((review) => review.id !== action.payload.id); // Xóa đánh giá
        },
    },
});

export const { addReview, removeReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
