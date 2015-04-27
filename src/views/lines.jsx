import React from 'react';
import d3 from 'd3';

import waves from '../common/waves';

import './lines.scss';

export default class Lines extends React.Component {
  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {
    let width = this.props.width;
    let height = this.props.height;

    let x = d3.scale.linear()
      .domain([0, waves.WAVES_X_SCALE])
      .range([0, width]);
    let y = d3.scale.linear()
      .domain([0, waves.WAVES_PEAK_RANGE['max']])
      .range([this.props.waveHeight, 0]);

    let line = d3.svg.line()
      .x((d) => { return x(d.x); })
      .y((d) => { return y(d.y); })
      .interpolate('linear');

    let svg = d3.select('.line-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g');

    svg.selectAll('.line')
      .data(this.props.data)
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('d', line)
      .attr("transform", (d, i) => { return `translate(0,${i*11})`; });
  }

  render() {
    return (
      <div className="line-container" />
    );
  }
}