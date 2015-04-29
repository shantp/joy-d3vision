import alt from '../alt';
import waves from '../common/waves';
import WaveActions from '../actions/waveActions';

class WaveStore {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.waves = waves.getWaves();

    this.bindListeners({
      handleUpdateWaves: WaveActions.UPDATE_WAVES
    });
  }

  handleUpdateWaves(waves) {
    this.waves = waves;
  }
}

export default alt.createStore(WaveStore, 'WaveStore');