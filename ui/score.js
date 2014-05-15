Score = function () {
	// オブジェクト管理
	window.g_objectManager.add(this);

	window.g_score = this;

	// スプライト（数字部分）
	this.objects = [];
	for (var i = 0; i < 6; i++) {
		var obj = new Background('img/number12x16-z9.gif', 0, 0, 12, 16, 9, 0);
		obj.x = 320 - 4 - 7 - 18 * (i + 1) - 7;
		obj.y = 4;
		obj.animation = 0;
		this.objects.push(obj);
	}

	// スプライト（単位部分）
	this.object_m = new Background('img/number12x16-z9.gif', 0, 0, 12, 16, 9, 0);
	this.object_m.x = 320 - 4 - 7 - 18 * 0 - 7;
	this.object_m.y = 4;
	this.object_m.animation = 10;

	// スコアの素（耐久距離）
	this.score = 0;

	// リセット
	this.reset = function () {
		this.score = 0;
	};

	// フレーム処理。
	// 戻り値0: 通常
	// 戻り値0以外: オブジェクト削除
	this.onFrame = function () {
		// スタート中は何もしない
		if (window.g_start) {
			return;
		}
		// さかなくんが死んでる場合は何もしない
		if (window.g_fish.deadFlag >= 1) {
			return;
		}
		// 距離を進める（ピクセル）
		this.score += SCROLL_SPEED;
		// スプライトへの反映
		k = 1;
		for (var i = 0; i < 6; i++) {
			this.objects[i].animation = Math.floor(this.score / k) % 10;
			k *= 10;
		}
		return 0; // 継続
	};
};

// 画像リスト
Score.images = [
	'img/number7x7-z9.gif'
];
