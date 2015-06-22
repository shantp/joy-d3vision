import React from 'react';
import d3 from 'd3';
import _ from 'lodash';

export default class Line extends React.Component {
  componentWillMount() {
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

    let path = line(this.props.wave);
    this.setState({path});
  }

  componentWillReceiveProps(nextProps) {
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

    if (!_.isEqual(nextProps.wave, this.props.wave)) {
      let path = d3.select(React.findDOMNode(this))
        .transition()
        .duration(this.props.duration)
        .attr('d', line(this.props.wave))
        .transition()
        .duration(this.props.duration)
        .attr('d', line(nextProps.wave))

      this.setState({
        lastWave: this.props.wave,
        path
      });
    }
  }

  render() {
    return (
      <path d={this.state.path} transform={`translate(0 ${this.props.y})`} className="line" />
    )
  }
}

