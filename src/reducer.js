const initialState = {
    movies: [],
    genres: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return { ...state, movies: action.payload };
        case 'SET_GENRES':
            return { ...state, genres: action.payload };
        default:
            return state;
    }
};

export default rootReducer;
