Score = function (scene) {
	group = scene.groups[9];

	// 参照
	this.group = group;
	this.scene = scene;

	// スプライト（数字部分）
	this.sprites = [];
	for (var i = 0; i < 6; i++) {
		var sprite = new Sprite(7, 7);
		sprite.image = game.assets['img/number7x7-z9.gif'];
		sprite.x = 320 - 4 - 7 - 18 * (i + 1) - 7;
		sprite.y = 4;
		sprite.frame = 0;

		// 拡大
		sprite.scaleX = 2;
		sprite.scaleY = 2;
		sprite.originX = 0;
		sprite.originY = 0;

		group.addChild(sprite);
		this.sprites.push(sprite);
	}

	// スプライト（単位部分）
	this.sprite_m = new Sprite(7, 7);
	this.sprite_m.image = game.assets['img/number7x7-z9.gif'];
	this.sprite_m.x = 320 - 4 - 7 - 18 * 0 - 7;
	this.sprite_m.y = 4;
	this.sprite_m.frame = 10;

	// 拡大
	this.sprite_m.scaleX = 2;
	this.sprite_m.scaleY = 2;
	this.sprite_m.originX = 0;
	this.sprite_m.originY = 0;
	group.addChild(this.sprite_m);

	// スコアの素（耐久距離）
	this.score = 0;

	// フレーム処理。
	// 戻り値0: 通常
	// 戻り値0以外: オブジェクト削除
	this.frame = function () {
		// スタート中は何もしない
		if (window.g_start) {
			return;
		}
		// さかなくんが死んでる場合は何もしない
		if (window.g_fish.deadFlag >= 1) {
			return;
		}
		// 距離を進める（ピクセル）
		this.score += LOOP_SPEED;
		// スプライトへの反映
		k = 1;
		for (var i = 0; i < 6; i++) {
			this.sprites[i].frame = Math.floor(this.score / k) % 10;
			k *= 10;
		}
		return 0; // 継続
	};

	// 削除
	var group = this.group;
	this.dispose = function () {
		_.each(this.sprites, function (sprite) {
			group.removeChild(sprite);
		});
		this.sprites = [];
		group.removeChild(this.sprite_m);
		delete this.sprite_m;
	};

};

// 画像リスト
Score.images = [
	'img/number7x7-z9.gif'
];
