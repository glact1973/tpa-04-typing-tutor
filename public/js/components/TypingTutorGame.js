import { fetchRandomQuote } from '../api-client.js';
import TypingTutorView from './TypingTutorView.js';

class TypingTutorGame {
  constructor() {
    this.isRoundInProgress = false;
    this.currentStrokeCount = -1;
    this.targetText = null;
    // 入力文字を格納する
    this.inputText = [];
    this.accurateInputNum = 0;
    this.totalScore = 0;
    // 追加ここまで
  }

  init() {
    this.view = new TypingTutorView();
    this.view.registerStartRoundCallback(this.startRound.bind(this));
    this.view.registerHandleKeystrokeCallback(this.handleKeyStroke.bind(this));
    this.view.initDOMAndListeners();
  }

  startRound() {
    this.isRoundInProgress = true;
    this.currentStrokeCount = -1;
    this.initTargetText();
  }

  handleKeyStroke(key) {
    // テスト用の例文として固有値を設定するための固定値
    // this.targetText = ['a','b','c']
    if (!this.isRoundInProgress) return; 
    this.currentStrokeCount += 1; 
    const targetChar = this.targetText[this.currentStrokeCount]; 
    this.view.renderKeystroke(key, targetChar);
    // 追加ここから
    // 例文と同様に、入力文字を配列に格納する
    this.inputText.push(key);
    // 入力済文字数のindex(currentStrokeCount)が例文(targetText)の文字数と等しい場合、スコア表示を行う
    if (this.currentStrokeCount === this.targetText.length - 1 ) {
      // 1文字ずつ例文と一致しているか判定し、一致していれば一致した文字数を1つ足す
      for (let i = 0; i <= this.currentStrokeCount; i++) {
        if (this.inputText[i] === this.targetText[i]) this.accurateInputNum++;
      }
      // スコアを計算する
      this.totalScore = Math.floor((this.accurateInputNum / (this.currentStrokeCount + 1))*100);
      // スコアを表示する
      console.log(`SCORE: `+ this.totalScore);
    }
    // 追加ここまで
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
