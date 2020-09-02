import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CardActions } from 'material-ui/Card';
import Button from 'material-ui/RaisedButton';


class Command extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    render() {
        const newGeneration = () => () => {
            this.props.reconnect();
            this.timer = setInterval(() => {
                if (this.props.socket.connected){ this.props.socket.instance.send('start');
                clearInterval(this.timer);
            }}, 1000);
        };
        return (
            <CardActions>
                <Button label={'Start'} primary={true} onClick={newGeneration()} />
            </CardActions>
        );
    }
}

Command.propTypes = {
    socket: PropTypes.object.isRequired,
    reconnect: PropTypes.func.isRequired,
};

export default Command;
