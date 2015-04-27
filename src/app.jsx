import 'babel-core/polyfill';
import React from 'react';

import waves from './common/waves';
import Lines from './views/lines';

import './app.scss';

const DOM_APP_ID = 'app';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
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
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  render() {
    return (
      <div>
        <Lines
          count = {60}
          width = {this.state.width}
          height = {this.state.height}
          waveHeight = {140}
          data = {this.state.data} />
      </div>
    )
  }
}

React.render(<App />, document.getElementById(DOM_APP_ID));