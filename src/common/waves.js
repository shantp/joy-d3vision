import _ from 'lodash';
import chance from 'chance';

class Waves {
  constructor() {
    this.WAVES_ARR = [];
    this.WAVES_MARGIN_SIZE = 60;
    this.WAVES_CENTER_SIZE = 8;
    this.WAVES_PEAK_RANGE = {min: 0, max: 100};
    this.WAVES_PEAK_COUNT = 6;
    this.WAVES_COUNT = 60;
    this.chance = new Chance();
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getWeightedInt(max) {
    let weighted = _.range(max);
    let reversed = weighted.slice().reverse();
    let num = this.chance.weighted(weighted, reversed);
    return num;
  }

  // TODO: Add margins
  addMargins() {

  }

  addY(y, i) {
    let x = i;
    return {x, y};
  }

  getNewWave() {
    let wave = [];
    for (var i = 0; i < this.WAVES_PEAK_COUNT; i++) {
      let maxVal = this.WAVES_PEAK_RANGE['max'];
      if (i === 0 || i === this.WAVES_PEAK_COUNT-1) {
        maxVal = maxVal/10;
      }
      wave.push(this.getWeightedInt(maxVal));
    }
    for (var k = 0; k < this.WAVES_CENTER_SIZE; k++) {
      _.eachRight(wave, (n, i) => {
        let lastN = wave[i-1];
        if (lastN >= 0) {
          wave.splice(i, 0, this.getRandomInt(n, lastN));
        }
      });
    }
    wave = _.map(wave, this.addY.bind(this));
    return wave;
  }

  getWaves() {
    if (this.WAVES_ARR.length > 0) {
      return this.WAVES_ARR;
    }
    for(let i = 0; i < this.WAVES_COUNT; i++) {
      this.WAVES_ARR.push(this.getNewWave());
    }
    this.WAVES_X_SCALE = _.last(_.last(this.WAVES_ARR)).x;
    return this.WAVES_ARR;
  }
}

let waves = new Waves();

export default waves;