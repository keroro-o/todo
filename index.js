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

'use strict';

// key: タスクの文字列 value: 完了して{いるかどうかの真偽値
const tasks = new Map();

/**
 * タスクを追加する関数。連想配列に未完了の状態（false)でタスクを追加する。
 * @param {string} task
 */
function todo(task) {
  tasks.set(task, false);
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

module.exports = {
  todo,
  list,
  done,
  donelist
};  
