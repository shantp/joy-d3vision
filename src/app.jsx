import 'babel-core/polyfill';
import React from 'react';

import WaveStore from './stores/waveStore';
import WaveActions from './actions/waveActions';
import LineChart from './views/lineChart';

import './app.scss';

const DOM_APP_ID = 'app';

class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = WaveStore.getState();
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, this.state.duration);
  }

  componentWillMount() {
    WaveStore.listen(this.onChange.bind(this));
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    WaveStore.unlisten(this.onChange);
    window.removeEventListener('resize', this.updateDimensions);
    clearInterval(this.timer);
  }

  tick() {
    // WaveActions.updateWaves();
  }

  onChange() {
    this.setState(WaveStore.getState());
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
        <LineChart
          width = {this.state.width}
          height = {this.state.height}
          waves = {this.state.waves}
          duration = {this.state.duration} />
      </div>
    )
  }
}

React.render(<App />, document.getElementById(DOM_APP_ID));
