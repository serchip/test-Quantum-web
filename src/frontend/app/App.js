import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import LineChart from '../components/LineChart';
import Command from '../components/Command';
import SocketIndicator from '../socket/Indicator';
import initSocketFactory from '../socket/initSocket';


const loaderStyle = {
    position: 'relative',
    top: 0,
    left: 'calc(50% - 45px)',
};

class App extends Component {

    render() {
        const { socket, chart, initSocket } = this.props;
        const loading = socket.loading || !chart.matrix.length;

        const reconnect = () => {
            initSocket('ws://localhost:8008/ws/chart/test/');
        };

        return (
            <MuiThemeProvider>
                <Card>
                    <CardTitle title="Quantum web test" subtitle={<SocketIndicator socket={socket} />} />
                    {loading && <div className="loading-wrapper">
                        <RefreshIndicator size={70} status="loading" style={loaderStyle} />
                    </div>}
                    {!loading && <CardText><LineChart dataset={chart.matrix} /></CardText>}
                    <Command socket={socket} reconnect={reconnect} />
                </Card>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    chart: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired,
    initSocket: PropTypes.func.isRequired,
};

const mapPropsToProps = store => store;
const mapDispatchToProps = dispatch => ({
    initSocket: initSocketFactory(dispatch),
});

export default connect(mapPropsToProps, mapDispatchToProps)(App);
