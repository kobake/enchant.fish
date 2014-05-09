// スタート表示
Start = function (scene) {
	window.g_start = this;
	this.sprite = new Sprite(320, 240);
	this.sprite.image = game.assets['img/title-z9.gif'];
	this.sprite.x = 0;
	this.sprite.y = 0;
	scene.groups[9].addChild(this.sprite);

	// クリックで消える
	var t = this;
	scene.addEventListener(Event.TOUCH_START, function (e) {
		if (typeof t.sprite != 'undefined') {
			window.g_touch_skip = 2; // ### TOUCH_END が呼ばれないケースの暫定対処
			t.sprite.parentNode.removeChild(t.sprite); // ### 何故かこれを実行すると TOUCH_END が呼ばれない
			delete t.sprite;
			delete window.g_start;
		}
	});
};

// 画像リスト
Start.images = [
];
