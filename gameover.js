// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// ゲームオーバー
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
Gameover = function (scene) {
	// 参照
	this.scene = scene;

	// 半透明板被せ
	this.black = new Sprite(320, 240);
	this.black.backgroundColor = '#000';
	this.black.opacity = 0.5;
	scene.groups[9].addChild(this.black);

	// スプライト
	this.sprite = new Sprite(320, 38);
	this.sprite.image = game.assets['img/gameover320x38-z9.gif'];
	this.sprite.x = 0;
	this.sprite.y = (240 - 38) / 2;
	this.sprite.frame = GenerateFrameArray(0, 1, 8);

	// アニメーション
	this.sprite.x = 320;
	this.sprite.tl.moveBy(-320, 0, 20)	// move right
	//.scaleTo(-1, 1, 10)			// turn left
	//.moveBy(-(320 - 64), 0, 90)	// move left
	//.scaleTo(1, 1, 10)			// turn right
	//.loop();					// loop it
	scene.groups[9].addChild(this.sprite);

	// フレーム処理。
	// 戻り値0: 通常
	// 戻り値0以外: オブジェクト削除
	this.frame = function () {
		return 0; // 継続
	};

	// 削除
	var t = this;
	this.dispose = function () {
		t.sprite.parentNode.removeChild(t.black);
		t.sprite.parentNode.removeChild(t.sprite);
		delete t.black;
		delete t.sprite;
	};

	// ゆっくり削除
	this.disposeSlow = function () {
		t.sprite.tl.clear();
		t.sprite.x = 0;
		t.sprite.tl.moveBy(-320, 0, 5).then(function () {
			t.dispose();
		});
	};
};

// 画像リスト
Gameover.images = [
	'img/gameover320x38-z9.gif'
];

