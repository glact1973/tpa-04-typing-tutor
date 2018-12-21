import { removeChildNodes } from '../dom-utils.js';

class TypingTutorView {
  constructor() {
    this.learnerKeystrokesEl = null;
    this.callbacks = {};
  }

  registerStartRoundCallback(callback) {
    this.callbacks.startRound = callback;
  }

  registerHandleKeystrokeCallback(callback) {
    this.callbacks.handleKeystroke = callback;
  }

  registerCalculateScoreCallback(callback) {
    this.callbacks.calculateScore = callback;
  }


  initDOMAndListeners() {
    this.learnerKeystrokesEl = document.querySelector('.learner-keystrokes');

    document
      .querySelector('body')
      .addEventListener('keyup', this.handleDocumentKeyUp.bind(this));

    document
      .querySelector('.btn-start-round')
      .addEventListener('click', this.handleStartRound.bind(this));
  }

  handleStartRound(evt) {
    // prevent the default behavior of button being "pressed"
    // when you type a space
    evt.target.blur();
    this.renderStartBtn('pressed'); // ボタンを"pressed"に変更する
    this.clearKeystrokes();
    this.clearScore(); // 前のスコアが表示されていれば、クリアする
    this.callbacks.startRound();
  }

  renderStartBtn(text) {
    document.querySelector('.btn-start-round').innerHTML = text;
  }

  clearKeystrokes() {
    removeChildNodes(this.learnerKeystrokesEl);
  }

  clearScore() {
    const scoreEl = document.querySelector('#score');
    if (scoreEl !== null) scoreEl.parentNode.removeChild(scoreEl);
  }

  handleDocumentKeyUp(evt) {
    if (evt.key.length !== 1) return;
    this.callbacks.handleKeystroke(evt.key);
    this.callbacks.calculateScore(); // スコアを計算する
  }

  renderTargetText(text) {
    document.querySelector('.target-text').innerText = text;
  }

  renderKeystroke(typedChar, targetChar) {
    const spanEl = document.createElement('SPAN');
    spanEl.innerText = typedChar;
    spanEl.className = (typedChar === targetChar) ? 'key-correct' : 'key-incorrect';
    this.learnerKeystrokesEl.appendChild(spanEl);
  }

  renderScore(score) {
    const scoreDivEl = document.createElement('div');
    scoreDivEl.id = 'score';
    const scoreEl = document.createElement('h1');
    scoreEl.innerHTML = `SCORE: ${score}`;
    document.querySelector('#container').appendChild(scoreDivEl).appendChild(scoreEl);
  }

  stopKeyStroke() {
    document
      .querySelector('body')
      .removeEventListener('keyup', this.handleDocumentKeyUp.bind(this));
  }
}

export default TypingTutorView;
