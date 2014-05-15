// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// ゲームオーバー
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
Gameover = function (scene) {
	// オブジェクト管理
	window.g_objectManager.add(this);

	// 参照
	this.scene = scene;

	this.objects = [];

	// 半透明板被せ
	this.black = new Background('#000', 0, 0, 320, 240, 9, 0);
	this.black.backgroundColor = '#';
	this.black.opacity = 0.5;
	this.objects.push(this.black);

	// スプライト
	//this.sprite = new Sprite(320, 38);
	//this.sprite.image = game.assets['img/gameover320x38-z9.gif'];
	this.board = new Background('img/gover256x96-z8.gif', 0, 256, 96, 8, 0);
	this.board.x = 0;
	this.board.y = (240 - this.sprite.height) / 2;
	this.board.animation = 0; // GenerateAnimationArray(0, 1, 8);
	this.objects.push(this.board);

	// アニメーション
	this.board.x = 320 + (320 - 256) / 2;
	this.board.x = (320 - 256) / 2; // ### 一旦アニメーションはやめとく
	//this.tl.moveBy(-320, 0, 10); // 右から左へ。

	//.scaleTo(-1, 1, 10)			// turn left
	//.moveBy(-(320 - 64), 0, 90)	// move left
	//.scaleTo(1, 1, 10)			// turn right
	//.loop();					// loop it

	// ゆっくり削除
	/*
	this.disposeSlow = function () {
		t.sprite.tl.clear();
		t.sprite.x = 0;
		t.sprite.tl.moveBy(-320, 0, 5).then(function () {
			t.dispose();
		});
	};
	*/
};

// 画像リスト
Gameover.images = [
	'img/gameover320x38-z9.gif',
	'img/gover256x96-z8.gif',
	'img/scnum8x8-z9.gif'
];

