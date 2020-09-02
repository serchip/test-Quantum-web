import { combineReducers } from 'redux';

import socket from '../socket/reducer';
import chart from '../components/reducer';

export default combineReducers({
    socket,
    chart,
});
