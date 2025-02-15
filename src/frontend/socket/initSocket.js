import actions from './actions';
import chartActions from '../components/actions';

export default dispatch => (uri) => {
    if (!('WebSocket' in window)) {
        dispatch(actions.error({ error: 'WebSocket is not supported by your browser' }));
        return;
    }

    const socket = new WebSocket(uri);
    dispatch(actions.connect());

    socket.onopen = () => dispatch(actions.open({ instance: socket }));
    socket.onerror = () => dispatch(actions.error({ error: true }));
    socket.onmessage = evt => dispatch(chartActions.newState({ ...JSON.parse(evt.data) }));
    socket.onclose = () => dispatch(actions.close());
};
