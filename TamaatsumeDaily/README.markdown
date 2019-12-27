# TamaatsumeDaily

## 概要

**Note:** [更新履歴](https://github.com/wifeofvillon/WoVBookmarklets/commits/master/TamaatsumeDaily)

[刀剣乱舞玉集め進捗表](http://deltarium.org/tokenranbu/tamaatsume/) を開いた状態で使うと、その日回収した玉の数を知らせるブックマークレットです。

***DEMO:***

![使用例](https://raw.githubusercontent.com/wifeofvillon/WoVBookmarklets/master/TamaatsumeDaily/demo.png)

## 特徴

- 元アプリのCookieを参照しています
  - 元アプリのCookieの構造が変更されるとデータを取得できなくなります
- このブックマークレット専用のCookieを使ってデータを管理します
  - 仕様上、複数のブラウザにまたがって使用することはできません
- 専用Cookieのデータは毎日AM5:00にリセットされます
  - 正確な数値が知りたい場合はその日の最初のトライの前に一度使用してください

## 使い方

1. ブラウザに新しいブックマークを追加する
2. 続けて`TamaatsumeDaily.min.js`の内容をペーストする
3. [刀剣乱舞玉集め進捗表](http://deltarium.org/tokenranbu/tamaatsume/) のページ上で追加したブックマークをクリックする

![使い方(1)](https://raw.githubusercontent.com/wifeofvillon/WoVBookmarklets/master/TamaatsumeDaily/usage1.png)

![使い方(2)](https://raw.githubusercontent.com/wifeofvillon/WoVBookmarklets/master/TamaatsumeDaily/usage3.png)

***Note:***

- 仕様上、以下のケースでは必ず「0個」と表示されます
  - 登録して初めて使用したとき
  - AM5:00以降最初に使用したとき
- 次の「秘宝の里」開催時には使えなくなります
  - 逐次ソースを更新しますが、自分で直す場合はスクリプトの冒頭にある以下の記述を修正してください

```js
// 数字部分をイベント開催年月に変更(YYYYMM)
const a='token-hihonosato-201711'; // 秘宝の里の場合
const a='token-rentaisen-201712'; // 連隊戦の場合
```

## 依存関係等

- [刀剣乱舞玉集め進捗表](http://deltarium.org/tokenranbu/tamaatsume/)でのみ動作します
- スクリプトのminifyには[JSCompress](https://jscompress.com/)を使用しています

## 作者

[@wifeofvillon](https://twitter.com/wifeofvillon)

## 免責

- 利用と改変は自己責任でお願いします
- 元アプリの製作者さんに迷惑をかけないようにしてください
