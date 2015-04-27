import _ from 'lodash';
import chance from 'chance';

class Waves {
  constructor() {
    this.WAVES_ARR = [];
    this.WAVES_MARGIN_SIZE = 90;
    this.WAVES_QUALITY = 5;
    this.WAVES_PEAK_RANGE = {min: 0, max: 200};
    this.WAVES_PEAK_COUNT = 7;
    this.WAVES_COUNT = 60;
    this.chance = new Chance();
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getWeightedWavePoint(max) {
    let points = _.range(max);
    let weight = [];
    _.each(points, (point, i) => {
      if (i/max < .33) weight.push(20);
      if (i/max >= .33 && i/max < .66) weight.push(2);
      if (i/max >= .66) weight.push(1);
    });
    let num = this.chance.weighted(points, weight);
    return num;
  }

  addMargins(wave) {
    for (let i = 0; i < this.WAVES_MARGIN_SIZE; i++) {
      wave.push(this.chance.weighted([0, 1, -1], [11, 1, 1]));
      wave.unshift(this.chance.weighted([0, 1, -1], [11, 1, 1]));
    }
    return wave;
  }

  addY(y, i) {
    let x = i;
    return {x, y};
  }

  getNewWave() {
    let wave = [];
    for (var i = 0; i < this.WAVES_PEAK_COUNT; i++) {
      let maxVal = this.WAVES_PEAK_RANGE['max'];
      if (i === 0 || i === this.WAVES_PEAK_COUNT-1) maxVal = maxVal/10;
      wave.push(this.getWeightedWavePoint(maxVal));
    }
    for (var k = 0; k < this.WAVES_QUALITY; k++) {
      _.eachRight(wave, (n, i) => {
        let lastN = wave[i-1];
        if (lastN >= 0) {
          wave.splice(i, 0, this.getRandomInt(n, lastN));
        }
      });
    }
    wave = this.addMargins(wave);
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