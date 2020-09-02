import { actionsTypes } from './actions';

const initialState = {
    matrix: [],
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
    case actionsTypes.NEW_STATE:
        return {matrix: payload.message.split(',')}
    default:
        return state;
    }
};

export default reducer;
