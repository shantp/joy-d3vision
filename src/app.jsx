import 'babel-core/polyfill';
import React from 'react';

import waves from './common/waves';
import Line from './views/line';

const DOM_APP_ID = 'app';
const LINE_COUNT = 1;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: 200,
      data: waves.getWaves()
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  renderLine(i) {
    return (
      <Line key={i}
        width = {this.state.width}
        height = {this.state.height}
        data = {this.state.data} />
    )
  }

  render() {
    let lines = [];
    for (var i = 0; i < LINE_COUNT; i++) {
      lines.push(this.renderLine(i));
    }
    return (
      <div>{lines}</div>
    )
  }
}

React.render(<App />, document.getElementById(DOM_APP_ID));