// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// ちーちゃん
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
var Tichan = function (scene) {
	// 参照
	this.scene = scene;

	// スプライト
	this.sprite = new Sprite(96, 208);
	this.sprite.image = game.assets['img/tichan96x208.gif'];
	this.sprite.x = 0;
	this.sprite.y = 0;
	this.sprite.frame = GenerateFrameArray(0, 5, 2);

	// シーンに追加
	scene.groups['ch'].addChild(this.sprite);

	// フレーム処理
	this.frame = function () {
	};

	// 削除
	this.dispose = function () {
		this.scene.removeChild(this.sprite);
	}
};
