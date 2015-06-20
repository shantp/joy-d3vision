import React from 'react';
import d3 from 'd3';

export default class Line extends React.Component {
  render() {
    const x = d3.scale.linear()
      .domain([0, d3.max(this.props.wave, (d) => d.x)])
      .range([0, this.props.width]);

    const y = d3.scale.linear()
      .domain([0, d3.max(this.props.wave, (d) => d.y)])
      .range([140, 0]);

    const line = d3.svg.line()
      .interpolate('linear')
      .x((d) => x(d.x))
      .y((d) => y(d.y));

    return (
      <path d={line(this.props.wave)} transform={`translate(0 ${this.props.y})`} className="line" />
    )
  }
}

