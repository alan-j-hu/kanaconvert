// ==UserScript==
// @name     KanaConvert
// @version  1
// @grant    none
// ==/UserScript==

'use strict';

const hiragana = {
  'あ': 'a',
  'い': 'i',
  'う': 'u',
  'え': 'e',
  'お': 'o',

  'か': 'ka',
  'き': 'ki',
  'く': 'ku',
  'け': 'ke',
  'こ': 'ko',

  'が': 'ga',
  'ぎ': 'gi',
  'ぐ': 'gu',
  'げ': 'ge',
  'ご': 'go',

  'さ': 'sa',
  'し': 'shi',
  'す': 'su',
  'せ': 'se',
  'そ': 'so',

  'ざ': 'za',
  'じ': 'zi',
  'ず': 'zu',
  'ぜ': 'ze',
  'ぞ': 'zo',

  'た': 'ta',
  'ち': 'chi',
  'つ': 'tsu',
  'て': 'te',
  'と': 'to',

  'だ': 'da',
  'ぢ': 'ji',
  'づ': 'zu',
  'で': 'de',
  'ど': 'do',

  'な': 'na',
  'に': 'ni',
  'ぬ': 'nu',
  'ね': 'ne',
  'の': 'no',

  'は': 'ha',
  'ひ': 'hi',
  'ふ': 'fu',
  'へ': 'he',
  'ほ': 'ho',

  'ば': 'ba',
  'び': 'bi',
  'ぶ': 'bu',
  'べ': 'be',
  'ぼ': 'bo',

  'ぱ': 'pa',
  'ぴ': 'pi',
  'ぷ': 'pu',
  'ぺ': 'pe',
  'ぽ': 'po',

  'ま': 'ma',
  'み': 'mi',
  'む': 'mu',
  'め': 'me',
  'も': 'mo',

  'や': 'ya',
  'ゆ': 'yu',
  'よ': 'yo',

  'ら': 'ra',
  'り': 'ri',
  'る': 'ru',
  'れ': 're',
  'ろ': 'ro',

  'わ': 'wa',
  'を': 'wo',

  'ん': 'n'
};

const hiragana_ys = {
  'ゃ': 'ya',
  'ゅ': 'yu',
  'ょ': 'yo'
};

const katakana = {
  'ア': 'a',
  'イ': 'i',
  'ウ': 'u',
  'エ': 'i',
  'オ': 'o',

  'カ': 'ka',
  'キ': 'ki',
  'ク': 'ku',
  'ケ': 'ke',
  'コ': 'ko',

  'ガ': 'ga',
  'ギ': 'gi',
  'グ': 'gu',
  'ゲ': 'ge',
  'ゴ': 'go',

  'サ': 'sa',
  'シ': 'shi',
  'ス': 'su',
  'セ': 'se',
  'ソ': 'so',

  'ザ': 'zi',
  'ジ': 'ji',
  'ズ': 'zu',
  'ゼ': 'ze',
  'ゾ': 'zo',

  'タ': 'ta',
  'チ': 'chi',
  'ツ': 'tsu',
  'テ': 'te',
  'ト': 'to',

  'ダ': 'da',
  'ヂ': 'ji',
  'ヅ': 'zu',
  'デ': 'de',
  'ド': 'do',

  'ナ': 'na',
  'ニ': 'ni',
  'ヌ': 'nu',
  'ネ': 'ne',
  'ノ': 'no',

  'ハ': 'ha',
  'ヒ': 'hi',
  'フ': 'fu',
  'ヘ': 'he',
  'ホ': 'ho',

  'バ': 'ba',
  'ビ': 'bi',
  'ブ': 'bu',
  'ベ': 'be',
  'ボ': 'bo',

  'パ': 'pa',
  'ピ': 'pi',
  'プ': 'pu',
  'ペ': 'pe',
  'ポ': 'po',

  'マ': 'ma',
  'ミ': 'mi',
  'ム': 'mu',
  'メ': 'me',
  'モ': 'mo',

  'ヤ': 'ya',
  'ユ': 'yu',
  'ヨ': 'yo',

  'ラ': 'ra',
  'リ': 'ri',
  'ル': 'ru',
  'レ': 're',
  'ロ': 'ro',

  'ワ': 'wa',
  'ヲ': 'wo',

  'ン': 'n'
};

const katakana_ys = {
  'ャ': 'ya',
  'ュ': 'yu',
  'ョ': 'yo'
};

const kana = {...hiragana, ...katakana};
const ys = {...hiragana_ys, ...katakana_ys};

const convert = s => {
  let ret = '';
  let it = s[Symbol.iterator]();
  let ch = it.next();

  while(!ch.done) {
    const c = ch.value;
    let t = kana[c];

    let peek = it.next();
    if(t === void 0) {
      t = c;
    } else {
  	  if(!peek.done) {
      	const y = ys[peek.value];
     		if(y !== void 0) {
        	t = t.charAt(0) + y;
          peek = it.next();
      	}
    	}
    }

    ret += t;
    ch = peek;
  }

  return ret;
};

(() => {
const div = document.createElement('div');
div.style.cssText = "position: fixed; background-color: red;";

document.addEventListener('selectionchange', event => {
 	const sel = window.getSelection().toString();
  div.textContent = convert(sel);
  document.body.appendChild(div);
})

document.addEventListener('mousedown', event => {
  const x = event.clientX + 'px';
  const y = (event.clientY + 20) + 'px';
  div.style.top = y;
  div.style.left = x;
  if(div.parentNode !== null) {
    div.parentNode.removeChild(div);
  }
});
})();
