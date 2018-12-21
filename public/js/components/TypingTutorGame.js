import { fetchRandomQuote } from '../api-client.js';
import TypingTutorView from './TypingTutorView.js';

class TypingTutorGame {
  constructor() {
    this.isRoundInProgress = false;
    this.currentStrokeCount = -1;
    this.targetText = null;
    this.startBtnText = 'Start typing!';
    // 入力文字を格納する
    this.inputText = [];
    this.accurateInputNum = 0;
    this.totalScore = 0;
  }

  init() {
    this.view = new TypingTutorView();
    this.view.registerStartRoundCallback(this.startRound.bind(this));
    this.view.registerHandleKeystrokeCallback(this.handleKeyStroke.bind(this));
    this.view.registerCalculateScoreCallback(this.calculateScore.bind(this));
    this.view.initDOMAndListeners();
  }

  startRound() {
    this.isRoundInProgress = true;
    this.currentStrokeCount = -1;
    this.initTargetText();
  }

  handleKeyStroke(key) {
    // [for test] this.targetText = ['a', 'b', 'c', 'd', 'e'];
    if (!this.isRoundInProgress) return;
    this.currentStrokeCount += 1;
    const targetChar = this.targetText[this.currentStrokeCount];
    // 最終文字まで入力済なら、それ以上入力しても画面に表示させない
    if (this.currentStrokeCount <= this.targetText.length - 1) {
      this.view.renderKeystroke(key, targetChar);
    }
    // 例文同様に入力した文字を配列に格納し、calculateScoreでスコア計算に利用する
    this.inputText.push(key);
  }

  calculateScore() {
    console.log(this.accurateInputNum)
    // スコアを計算して良いか、入力済文字数と例文文字数で比較し、文末まで行ってなければ戻る
    if (this.currentStrokeCount !== this.targetText.length - 1) return;
    // 1文字ずつ例文と一致しているか判定し、一致していれば一致した文字数を1つ足す
    for (let i = 0; i <= this.currentStrokeCount; i += 1) {
      if (this.inputText[i] === this.targetText[i]) this.accurateInputNum += 1;
    }
    // スコアを計算する
    console.log('this.currentStrokeCount')
    console.log(this.currentStrokeCount)
    console.log('this.accurateInputNum')
    console.log(this.accurateInputNum)
    console.log('this.totalScore')
    console.log(this.totalScore)
    this.totalScore = Math.floor((this.accurateInputNum / (this.currentStrokeCount + 1)) * 100);
    console.log(this.totalScore)
    // スコアを表示する
    this.view.renderScore(this.totalScore);
    // スコア表示後、変数を初期化する
    this.initVar();
    // ボタンを初期表示に戻す
    this.view.renderStartBtn(this.startBtnText);
  }

  initVar() {
    this.totalScore = 0;
    this.accurateInputNum = 0;
    this.inputText = []
  }

  initTargetText() {
    fetchRandomQuote()
      .then((quoteText) => {
        this.view.renderTargetText(quoteText);
        this.targetText = quoteText.split('');
      });
  }
}

export default TypingTutorGame;
