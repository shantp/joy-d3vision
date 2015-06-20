import React from 'react';
import d3 from 'd3';
import Line from './line';

import './lineChart.scss';

export default class LineChart extends React.Component {
  render() {
    let lines = this.props.waves.map((wave, i) => {
      return (
        <Line
          width={this.props.width}
          y={i*11}
          wave={wave}
          key={i} />
      )
    });
    return (
      <svg
        width={this.props.width}
        height={this.props.height}>
        {lines}
      </svg>
    )
  }
}