Meter = function (scene) {
	window.g_meter = this;
	group = scene.groups[9];

	// 参照
	this.group = group;
	this.scene = scene;

	// スプライト作成共通部分
	var newNumSprite = function (pos) {
		var sprite = new Sprite(12, 16);
		sprite.image = game.assets['img/number12x16-z9.gif'];
		sprite.frame = pos;
		group.addChild(sprite);
		return sprite;
	};
	var newMeterSprite = function (width, pos) {
		var sprite = new Sprite(width, 12);
		sprite.image = game.assets['img/meter4x12-z9.gif'];
		sprite.frame = pos;
		group.addChild(sprite);
		return sprite;
	};

	// スプライト（線部分）
	this.line_sprites = [];
	this.line_sprites[1] = newMeterSprite(1, 4); // 奥
	this.line_sprites[0] = newMeterSprite(4, 0);
	this.line_sprites[2] = newMeterSprite(4, 2);
	for (var i = 0; i < 3; i++) {
		this.line_sprites[i].y = 210;
	}

	// 数字の場所
	var NUM_X = DEAD_X + 3 * 12 - 4;

	// スプライト（数字部分）
	this.num_sprites = [];
	for (var i = 0; i < 3; i++) {
		var sprite = newNumSprite(0);
		sprite.x = NUM_X - 12 * (i + 1);
		sprite.y = 220;
		this.num_sprites.push(sprite);
	}

	// スプライト（単位部分）
	this.sprite_m = newNumSprite(10);
	this.sprite_m.x = NUM_X + 4;
	this.sprite_m.y = 220;

	// 距離値
	this.meter = 0;

	// リセット
	this.reset = function () {
		this.meter = 0;
	};

	// フレーム処理。
	// 戻り値0: 通常
	// 戻り値0以外: オブジェクト削除
	this.frame = function () {
		// 距離を測る
		this.left = DEAD_X;
		this.right = window.g_fish.getLeft();
		if (this.right < this.left) this.right = this.left;
		this.meter = Math.max(0, this.right - this.left);
		//console.log(this.left + "," + this.right + "," + this.meter);

		// 線スプライトへの反映
		this.line_sprites[0].x = this.left;
		this.line_sprites[1].x = this.left;
		this.line_sprites[1].scaleX = this.meter;
		this.line_sprites[1].originX = 0;
		this.line_sprites[2].x = this.right;

		// 数字スプライトへの反映
		k = 1;
		for (var i = 0; i < 3; i++) {
			this.num_sprites[i].frame = Math.floor(this.meter / k) % 10;
			k *= 10;
		}

		// 
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
Meter.images = [
	'img/number12x16-z9.gif',
	'img/meter4x12-z9.gif'
];
