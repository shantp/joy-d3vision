import 'babel-core/polyfill';
import React from 'react';

import WaveStore from './stores/waveStore';
import WaveActions from './actions/waveActions';
import Lines from './views/lines';

import './app.scss';

const DOM_APP_ID = 'app';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = WaveStore.getState();
  }

  componentWillMount() {
    WaveStore.listen(this.onChange.bind(this));
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    WaveStore.unlisten(this.onChange);
    window.removeEventListener('resize', this.updateDimensions);
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

  onMoveClicked() {
    WaveActions.updateWaves();
  }

  render() {
    return (
      <div>
        <button onClick={this.onMoveClicked.bind(this)}>Move</button>
        <Lines
          count = {60}
          width = {this.state.width}
          height = {this.state.height}
          waveHeight = {140}
          waves = {this.state.waves} />
      </div>
    )
  }
}

React.render(<App />, document.getElementById(DOM_APP_ID));