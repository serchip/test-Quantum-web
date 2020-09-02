import { createAction } from 'redux-actions';

export const actionsTypes = {
    NEW_STATE: 'NEW_STATE',
};

export default {
    newState: createAction(actionsTypes.NEW_STATE),
};
