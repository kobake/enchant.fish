﻿MilkManager = function (scene) {
	this.scene = scene;
	this.milks = [];
	this.counter = 0;

	// グローバルにインスタンスを持っておく
	window.milkManager = this;

	// 抽選
	this.lottery = function () {
		// デバッグ用フラグ
		if (window.g_debug_nomilk) {
			return;
		}

		// スタート中は何もしない
		if (window.g_start) {
			return;
		}

		// ゲームオーバー中は何もしない
		if (window.g_fish.deadFlag >= 1) {
			return;
		}

		//var hit = CalcLottery(30);
		var hit = false;
		// 8回に1回
		this.counter++;
		hit = (this.counter % 8 == 1);

		if (hit) {
			console.log("new milk");
			var milk = new Milk(scene, 320);
			this.milks.push(milk);
		}
	};

	/**
	* ミルク探し (fish.getRight()より右にある直近のミルクを返す。ただし重なってるものも対象に含める)
	* @return {Milk} 見つかったミルク。見つからなければnull。
	*/
	this.findRightMilk = function (fish) {
		for (var i = 0; i < this.milks.length; i++) {
			var milk = this.milks[i];
			// if (milk.getRight() >= fish.getRight()) { //### ここを >= にするか > にするかは考えどころ
			// 	return milk;
			// }
			// ここのプラス値が小さすぎると乗り上げることがある
			if (milk.getLeft() + 10 >= fish.getRight()) { //### ここを >= にするか > にするかは考えどころ
				return milk;
			}
		}
		return null;
	}

	/**
	* 足場のミルク探し。X位置が重なっているものを1つ見つける
	* @return {Milk} 見つかったミルク。見つからなければnull。
	*/
	this.findUnderMilk = function (fish) {
		for (var i = 0; i < this.milks.length; i++) {
			var milk = this.milks[i];
			if (milk.intersectsX(fish)) {
				return milk;
			}
		}
		return null;
	}
};
