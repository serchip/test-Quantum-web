import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';


class LineChart extends Component {
  constructor(props) {
    super(props);
    this.min = 0;
    this.state = {
      options: {
        time: {
          useUTC: false
        },

        title: {
          text: "Evolution log"
        },
        chart: {
            type: 'areaspline',
            animation: false,
			zoomType: 'xy'
		},
          xAxis: {
                type: 'datetime',
                 tickInterval: 1000,
        },
          yAxis: {
            title: false
        },
        exporting: {
          enabled: false
        },
        // chart.series[0].setData([]);
        series: [
          {
            name: "Evolution data",
            threshold: null,
            data: (function() {
              // generate an array of random data
              var data = [],
                time = new Date().getTime(),
                i;

              for (i = -55; i <= 0; i += 1) {
                data.push([time + i * 1000, null]);
              }
              return data;
            })()
          }
        ]
      }
    };
  }

  ticker = series => {
    const x = new Date(parseFloat(this.props.dataset[0].replace(",", ".") * 1000)).getTime();
    const y = parseFloat(this.props.dataset[1].replace(",", "."));
    series.addPoint([x, y], true, true);
    if (y < this.min) {
      this.chart.legend.allItems[0].update({name:"Min energy: " + Number(y).toFixed(1)});
    }
  };

  getChart = chart => {
    this.chart = chart;
  };

  componentDidUpdate(prevProps) {
    if (this.props.dataset !== prevProps.dataset) {
        const series = this.chart.series[0];
        this.ticker(series);
    }
  }

  render() {
    return (
      <HighchartsReact callback={this.getChart}
        highcharts={Highcharts}
        options={this.state.options}
      />
    );
  }
}

LineChart.propTypes = {
    dispatch: PropTypes.func.isRequired,
    dataset: PropTypes.array.isRequired,
};
function mapStateToProps(state) {
   const { matrix } = state.chart;
   return { matrix };
 }

export default connect(mapStateToProps)(LineChart);
