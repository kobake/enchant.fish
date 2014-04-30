// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// 背景
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
Background = function (group, imagefilepath, width, height, speed) {
	// 参照
	this.group = group;

	// 属性
	this.width = width;
	this.height = height;
	this.speed = speed;

	// 必要な数だけスプライトを作る
	this.image_count = Math.floor(640 / width) + 1;
	this.sprites = [];
	for (var i = 0; i < this.image_count; i++) {
		var sprite = new Sprite(width, height);
		sprite.image = game.assets[imagefilepath];
		sprite.x = width * i;
		sprite.y = 0;
		group.addChild(sprite);
		this.sprites.push(sprite);
	}

	// フレーム処理
	var this_width = this.width;
	var this_speed = this.speed;
	this.frame = function () {
		_.each(this.sprites, function (sprite) {
			sprite.x -= this_speed;
			if (sprite.x <= -this_width) {
				sprite.x = 320; // 一番右端に移動
			}
		});
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
