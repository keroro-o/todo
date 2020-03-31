/* 
【作成するボットの要件定義】
    ● 「ボット名 todo 〇〇する」という発言で、「〇〇する」というタスクを作成。
    ● 「ボット名 done 〇〇する」という発言で、「〇〇する」というタスクを完了状態になる。
    ● 「ボット名 del 〇〇する」という発言で、「〇〇する」というタスクを削除。
    ● 「ボット名 list」という発言で、未完了のタスクの一覧を表示。
    ● 「ボット名 donelist」という発言で、官僚のタスクの一覧を表示。
  これらの要件を考えるときに、要件に抜け漏れがないかをチェックするのが重要。要件漏れが無いかチェックする
  為に”CRUD”という概念に基づいてチェックすること。
*/

/*
【タスクの永続化機能の要件定義】
    ● ファイルを書き込む関数、読み込む関数を追加。
    ● タスクの追加、更新時にファイル更新も行う。
    ● bot の読み込み時にファイルからデータを読み込む。
*/

'use strict';

// key: タスクの文字列 value: 完了して{いるかどうかの真偽値
let tasks = new Map();
const fs = require('fs');
const fileName = './tasks.json';

/**
 * タスクをファイルに保存する関数。
 * まず、tasks という連想配列を Array.from で配列に変換した後、更に、JSON.stringify という関数でJSON の文字列に変換し、
 * 更に同期的にファイルに書き出す。
 */
function saveTasks() {
  fs.writeFileSync(fileName, JSON.stringify(Array.from(tasks)), 'utf8');
}

/**
 * タスクを追加する関数。連想配列に未完了の状態（false)でタスクを追加する。
 * @param {string} task
 */
function todo(task) {
  tasks.set(task, false);
  saveTasks();
}

/**
 * タスクと完了したかどうかが含まれる配列を受け取り、完了したかを返す関数。
 * @param {array} taskAndIsDonePair
 * @return {boolean} 完了したかどうか
 */
function isDone(taskAndIsDonePair) {
  return taskAndIsDonePair[1];
}

/**
* タスクと完了したかどうかが含まれる配列を受け取り、完了していないかを返す
* @param {array} taskAndIsDonePair
* @return {boolean} 完了していないかどうか
*/
function isNotDone(taskAndIsDonePair) {
  return !isDone(taskAndIsDonePair);
}

/**
 * タスクの一覧の配列を取得する関数。
 * @return {array}
 */
function list() {
  return Array.from(tasks)
    .filter(isNotDone)
    .map(t => t[0]);  // 引数tで配列の要素を取得して、選別された値のキーとなっているタスクの文字列を取得し、
}                     //  その文字列だけの値に変換する関数

/**
 * タスクを完了状態にする関数。連想配列にtaskがキーとして登録されているかを確認し、
 * もし存在すれば、完了状態をtrueに変更する。
 * @param {string} task
 */
function done(task) {
  if (tasks.has(task)) {
    tasks.set(task, true);
    saveTasks();
  }
}

/**
 * 完了済みのタスクの一覧の配列を取得する関数。
 * @return {array}
 */
function donelist() {
  return Array.from(tasks)
    .filter(isDone)
    .map(t => t[0]);
}

/**
 * 項目を削除する関数。連想配列からtaskの文字列のキーの情報を除去する。
 * @param {string} task
 */
function del(task) {
  tasks.delete(task);
  saveTasks();
}

module.exports = {
  todo,
  list,
  done,
  donelist,
  del
};  
