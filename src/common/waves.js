import _ from 'lodash';
import chance from 'chance';

class Waves {
  constructor() {
    this.WAVES_ARR = [];
    this.WAVES_MARGIN_SIZE = 60;
    this.WAVES_CENTER_SIZE = 100;
    this.WAVES_PEAK_RANGE = {min: 0, max: 100};
    this.WAVES_PEAK_COUNT = 6;
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

  addInbetweens(n, i) {
    let lastN = this.WAVES_ARR[i-1];
    if (lastN) {
      this.WAVES_ARR.splice(i, 0, this.getRandomInt(n, lastN));
    }
  }

  // TODO: Add margins
  addMargins() {

  }

  addDates(n, i) {
    let d = new Date();
    d.setMinutes(d.getMinutes() + i);
    return {value: n, date: d};
  }

  getWaves() {
    this.WAVES_ARR = [];
    for (var i = 0; i < this.WAVES_PEAK_COUNT; i++) {
      let maxVal = this.WAVES_PEAK_RANGE['max'];
      if (i === 0 || i === this.WAVES_PEAK_COUNT-1) {
        maxVal = maxVal/10;
      }
      this.WAVES_ARR.push(this.getWeightedInt(maxVal));
    }
    while(this.WAVES_ARR.length < this.WAVES_CENTER_SIZE) {
      _.eachRight(this.WAVES_ARR, this.addInbetweens.bind(this));
    }
    this.WAVES_ARR = _.map(this.WAVES_ARR, this.addDates.bind(this));
    return this.WAVES_ARR;
  }
}

let waves = new Waves();

export default waves;