import alt from '../alt';
import waves from '../common/waves';

class WaveActions {
  updateWaves() {
    let newWaves = waves.moveWaves();
    this.dispatch(newWaves);
  }
}

export default alt.createActions(WaveActions);