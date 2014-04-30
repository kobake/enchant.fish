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
	scene.groups['ch'].addChild(this.sprite);
	/*
	var images = [
		{group: '', file: 'img/tichan96x208.gif'},
		{group: '', file: 'img/tichan96x208-front.gif' }
	];
	for (var i = 0; i < 2; i++) {
	}
	this.sprite = new Sprite(96, 208);
	this.sprite.image = game.assets['img/tichan96x208.gif'];
	this.sprite.x = 0;
	this.sprite.y = 0;
	this.sprite.frame = GenerateFrameArray(0, 5, 2);
	scene.groups['ch'].addChild(this.sprite);
	*/

	// フレーム処理
	this.frame = function () {
	};

	// 削除
	this.dispose = function () {
		this.scene.removeChild(this.sprite);
	}
};
