import React from 'react';
import d3 from 'd3';

import waves from '../common/waves';

import './lines.scss';

export default class Lines extends React.Component {
  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  d3Line() {
    let x = d3.scale.linear()
      .domain([0, waves.WAVES_X_SCALE])
      .range([0, this.props.width]);
    let y = d3.scale.linear()
      .domain([0, waves.WAVES_PEAK_RANGE['max']])
      .range([this.props.waveHeight, 0]);

    let line = d3.svg.line()
      .x((d) => { return x(d.x); })
      .y((d) => { return y(d.y); })
      .interpolate('linear');
    return line;
  }

  drawChart() {
    let svg = d3.select('.line-container')
      .append('svg')
      .attr('width', this.props.width)
      .attr('height', this.props.height)
      .append('g');

    svg.selectAll('.line')
      .data(this.props.waves)
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('d', this.d3Line())
      .attr("transform", (d, i) => { return `translate(0,${i*11})`; });
  }

  updateChart() {
    let svg = d3.select('.line-container');

    svg.selectAll('.line')
      .data(this.props.waves)
      .attr('d', this.d3Line())
      .transition()
      .ease('linear')
      .duration(600)
  }

  render() {
    return (
      <div className="line-container" />
    );
  }
}