var LIMIT_Y = 186;

Fish = function (scene, group) {
	this.group = group;
	this.sprite = new Sprite(37, 24); // 1キャラのサイズ
	this.sprite.y = LIMIT_Y;
	this.sprite.image = game.assets['img/fishkun37x24-z3.gif'];
	this.sprite.frame = [0, 1, 2, 3, 4, 5];   // select sprite frame
	this.sprite.tl.moveBy(288, 0, 90)   // move right
				.scaleTo(-1, 1, 10)      // turn left
				.moveBy(-288, 0, 90)     // move left
				.scaleTo(1, 1, 10)       // turn right
				.loop();                 // loop it
	group.addChild(this.sprite);
	this.sprite.my = 0;

	// ジャンプ処理
	this.jump = function () {
		// 上方向への速度を設定
		this.sprite.my = -8;
		console.log("jump");
	};

	// さかなさんのフレーム処理
	var sprite = this.sprite;
	group.addEventListener(Event.ENTER_FRAME, function (e) {
		// 加速度による速度計算
		sprite.my += 0.9;
		if (sprite.my >= 100) sprite.my = 0;

		// 速度による位置計算
		sprite.y += sprite.my;

		// 位置制限
		if (sprite.y >= LIMIT_Y) sprite.y = LIMIT_Y;
	});

	// タッチしたらジャンプ
	var t = this;
	scene.addEventListener(Event.TOUCH_START, function (e) {
		t.jump();
	});
};
