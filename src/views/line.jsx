import React from 'react';
import d3 from 'd3';

import waves from '../common/waves';

import './line.scss';

export default class Line extends React.Component {
  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {
    let width = this.props.width;
    let height = this.props.height;

    let x = d3.time.scale().range([0, width]);
    let y = d3.scale.linear().range([height, 0]);
    let xAxis = d3.svg.axis().scale(x).orient("bottom");
    let yAxis = d3.svg.axis().scale(y).orient("left");

    let line = d3.svg.line()
      .x((d) => { return x(d.date); })
      .y((d) => { return y(d.value); });

    let svg = d3.select('.line-container').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g');

    x.domain(d3.extent(this.props.data, (d) => { return d.date; }));
    y.domain([0, waves.WAVES_PEAK_RANGE['max']]);

    svg.append('path')
      .datum(this.props.data)
      .attr('class', 'line')
      .attr('d', line);
  }

  render() {
    return (
      <div className="line-container" />
    );
  }
}