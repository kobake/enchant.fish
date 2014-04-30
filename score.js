Score = function (scene) {
	group = scene.groups[9];

	// 参照
	this.group = group;
	this.scene = scene;

	// スプライト
	this.sprites = [];
	for (var i = 0; i < 6; i++) {
		var sprite = new Sprite(7, 7);
		sprite.image = game.assets['img/number7x7-z9.gif'];
		sprite.x = 320 - 4 - 7 - 10 * i;
		sprite.y = 4;
		group.addChild(sprite);
		this.sprites.push(sprite);
	}

	// フレーム処理。
	// 戻り値0: 通常
	// 戻り値0以外: オブジェクト削除
	this.frame = function () {
		return 0; // 継続
	};

	// 削除
	var group = this.group;
	this.dispose = function () {
		_.each(this.sprites, function (sprite) {
			group.removeChild(sprite);
		});
		this.sprites = [];
	};

};

// 画像リスト
Score.images = [
	'img/number7x7-z9.gif'
];
