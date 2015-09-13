import React, {PropTypes} from 'react';
import Line from './line';

import './lineChart.scss';

class LineChart extends React.Component {
  componentWillReceiveProps() {

  }

  render() {
    const lines = this.props.waves.map((wave, i) => {
      return (
        <Line
          width={this.props.width}
          y={i * 12}
          wave={wave}
          key={i}
          duration={this.props.duration} />
      );
    });

    console.log(lines);
    return (
      <svg
        width={this.props.width}
        height={this.props.height}>
        {lines}
      </svg>
    );
  }
}

LineChart.propTypes = {
  duration: PropTypes.number,
  height: PropTypes.number,
  waves: PropTypes.array.isRequired,
  width: PropTypes.number,
};

export default LineChart;
