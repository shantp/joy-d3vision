import 'babel-core/polyfill';
import React from 'react';

import waves from './common/waves';
import Line from './views/line';

const DOM_APP_ID = 'app';
const LINE_COUNT = 60;

class App extends React.Component {
  renderLine(i) {
    return (
      <Line key={i}
        data = {waves.getWaves()} />
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