// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// リソース準備
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
function PreloadImages(game) {
	game.preload('img/chara1.png'); // preload image
	game.preload('img/title.png'); // タイトル背景
	game.preload('img/game.png'); // ゲーム背景
	game.preload('img/bg-back.gif'); // ゲーム背景（奥）
	game.preload('img/bg-front.gif'); // ゲーム背景（手前）
	game.preload('img/gameloop.png'); // ゲーム背景ループ 320x50
	game.preload('img/start.png'); // START 236x48
	// 背景
	game.preload('img/ground32x32.gif'); // 地面
	game.preload('img/groundb32x32.gif'); // 地面（緑）
	game.preload('img/ground320x32.gif'); // 地面（長い版）
	// 自キャラ
	game.preload('img/fishkun37x24.gif'); // ふぃっしゅくん
	// 敵
	game.preload('img/tichan96x208.gif'); // ちーちゃん（左端）
	game.preload('img/tichan96x208-back.gif');
	game.preload('img/tichan96x208-front.gif');
	// 障害物
	game.preload('img/milk64x80.gif'); // ぎゅうにゅう
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
