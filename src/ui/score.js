Score = function () {
	// オブジェクト管理
	ObjectManager.initAsGroup(this, 320 - 12 * 7 - 8, 4, 0);

	window.g_score = this;

	// スプライト（数字）
	this.num = new Number(0, 0, 6);
	this.objects = [];
	this.objects.push(this.num);

	// スプライト（単位部分）
	var m = new CommonObject('img/number12x16-z9.gif', this.num.width, 0, 12, 16, 9, 0);
	m.animation = 10;
	this.objects.push(m);

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
		this.num.value = this.score;
		return 0; // 継続
	};
};

// 画像リスト
Score.images = [
	'img/number7x7-z9.gif'
];
