﻿// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// 地面
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
Ground = function (scene, x) {
	// 参照
	this.scene = scene;

	// 位置
	this.x = x;
	this.y = 240 - 32;

	// 高さは 1～5
	this.height = 0 + Math.floor(Math.random() * 3);

	// 高さ分だけスプライトを作る
	this.sprites = [];
	for (var i = 0; i < this.height; i++) {
		var sprite = new Sprite(32, 32);
		sprite.image = game.assets['img/ground32x32-z2.gif'];
		sprite.x = this.x + 100;
		sprite.y = this.y - (i * 32);
		sprite.frame = 0;
		if (i < this.height - 1) sprite.frame = 3;
		// シーンに追加
		scene.groups[2].addChild(sprite);
		// thisに追加
		this.sprites.push(sprite);
	}

	// フレーム処理。
	// 戻り値0: 通常
	// 戻り値0以外: オブジェクト削除
	this.frame = function () {
		this.x -= LOOP_SPEED;
		if (this.x <= -32) {
			return 1; // 削除
		}
		// スプライト更新
		var this_x = this.x;
		_.each(this.sprites, function (sprite) {
			sprite.x = this_x;
		});
		return 0; // 継続
	};

	// 削除
	var scene = this.scene;
	this.dispose = function () {
		_.each(this.sprites, function (sprite) {
			sprite.parentNode.removeChild(sprite);
		});
		this.sprites = [];
	};
};

// 画像リスト
Ground.images = [
	'img/ground32x32-z2.gif' // 地面
];
