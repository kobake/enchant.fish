// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// リソース準備
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
function PreloadImages(game, classlist) {
	game.preload('img/chara1.png'); // preload image
	game.preload('img/title.png'); // タイトル背景
	game.preload('img/gameloop.png'); // ゲーム背景ループ 320x50
	game.preload('img/start.png'); // START 236x48
	// クラス依存
	_.each(classlist, function (classdef) {
		_.each(classdef.images, function (image) {
			game.preload(image);
		});
	});
}

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// アニメーション用配列の生成
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
function GenerateFrameArray(from, to, framecount) {
	var a = [];
	for (var i = from; i <= to; i++) {
		for (var j = 0; j < framecount; j++) {
			a.push(i);
		}
	}
	return a;
}

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// シーン作成
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
function GenerateScene() {
	var scene = new Scene();

	// 背景用グループ
	var bggroup = new Group(); // 背景用グループ
	scene.addChild(bggroup);
	var bggroup_back = new Group(); // 背景用グループ（奥）
	bggroup.addChild(bggroup_back);
	var bggroup_front = new Group(); // 背景用グループ（手前）
	bggroup.addChild(bggroup_front);

	// キャラ用グループ
	var chgroup = new Group(); // キャラ用グループ
	scene.addChild(chgroup);
	var chgroup_back = new Group();
	chgroup.addChild(chgroup_back);
	var chgroup_front = new Group();
	chgroup.addChild(chgroup_front);

	// グループには名前でアクセスできるようにしておく
	scene.groups = {
		bg: bggroup,
		bgb: bggroup_back,
		bgf: bggroup_front,
		ch: chgroup,
		chb: chgroup_back,
		chf: chgroup_front
	};

	return scene;
}

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// 抽選関数
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
/* @param {Number} percent 確率（パーセント）
* @return {Boolean} 当選したかどうか
*/
function CalcLottery(percent) {
	return percent >= Math.random() * 100;
}