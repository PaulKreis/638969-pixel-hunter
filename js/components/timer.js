export default class Timer {
  constructor(timeForAnswer, onEnd) {
    this._startTime = timeForAnswer;
    this.time = this._startTime;
    this.flashingState = `black`;
    this.onEnd = onEnd;
  }

  get currentTime() {
    return this.time;
  }

  start() {
    clearInterval(this.clearInterval);
    this.time = this._startTime;
    this.interval = setInterval(() => this.tick(), 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  stopOnEnd() {
    this.stop();
    this.onEnd();
  }

  tick() {
    this.time -= 1;
    const timerElement = document.getElementsByClassName(`game__timer`);
    if (this.time <= 5) {
      if (this.flashingState === `black`) {
        this.flashingState = `red`;
      } else {
        this.flashingState = `black`;
      }
    }
    timerElement[0].innerHTML = this.time;
    timerElement[0].style.color = this.flashingState;
    return this.time > 0 ? this.time : this.stopOnEnd();
  }
}
