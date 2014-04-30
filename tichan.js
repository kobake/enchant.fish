// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// ちーちゃん
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
var Tichan = function (scene) {
	// 参照
	this.scene = scene;

	// スプライトリスト
	this.sprites = [];

	// スプライト
	var sprite = new Sprite(96, 208);
	sprite.image = game.assets['img/tichan96x208-z2.gif'];
	sprite.x = 0;
	sprite.y = 0;
	sprite.frame = GenerateFrameArray(0, 5, 2);
	scene.groups[2].addChild(sprite);
	this.sprites.push(sprite);

	// スプライト
	sprite = new Sprite(96, 208);
	sprite.image = game.assets['img/tichan96x208-z4.gif'];
	sprite.x = 0;
	sprite.y = 0;
	sprite.frame = GenerateFrameArray(0, 5, 2);
	scene.groups[4].addChild(sprite);
	this.sprites.push(sprite);

	// フレーム処理
	this.frame = function () {
	};

	// 削除
	var scene = this.scene;
	this.dispose = function () {
		_.each(this.sprites, function (sprite) {
			scene.removeChild(sprite);
		});
		this.sprites = [];
	};
};

// 画像リスト
Tichan.images = [
	'img/tichan96x208-z2.gif',
	'img/tichan96x208-z4.gif'
];
