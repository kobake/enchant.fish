Meter = function () {
	// オブジェクト管理
	ObjectManager.initAsGroup(this);
	this.x = DEAD_X;
	this.y = 220 - 12;

	window.g_meter = this;

	// スプライト作成共通部分
	var newMeterObject = function (width, pos) {
		var obj = new CommonObject('img/meter4x12-z9.gif', 0, 0, width, 12, 9, 0);
		obj.animation = pos;
		return obj;
	};

	// スプライト（線部分）
	this.objects = [null, null, null];
	this.objects[1] = newMeterObject(1, 4); // 奥
	this.objects[0] = newMeterObject(4, 0);
	this.objects[2] = newMeterObject(4, 2);
	for (var i = 0; i < 3; i++) {
		this.objects[i].y = 18;
	}

	// スプライト（数字）
	var num = new Number(0, 0, 3);
	this.objects.push(num);

	// スプライト（単位）
	var m = new CommonObject('img/number12x16-z9.gif', 0, 0, 12, 16, 9, 0);
	m.animation = 10;
	m.x = num.width;
	m.y = 0;
	this.objects.push(m);

	// 距離値
	this.meter = 0;

	// リセット
	this.reset = function () {
		this.meter = 0;
	};

	// フレーム処理。
	// 戻り値0: 通常
	// 戻り値0以外: オブジェクト削除
	this.onFrame = function () {
		// 距離を測る
		this.left = DEAD_X;
		this.meter = Math.max(0, (window.g_fish.getLeft() - window.g_camera.x - DEAD_X));

		// 線スプライトへの反映
		this.objects[1].scaleX = this.meter;
		this.objects[1].originX = 0;
		this.objects[2].x = this.meter;

		// 数字スプライトへの反映
		num.value = this.meter;

		// 継続
		return 0;
	};
};

// 画像リスト
Meter.images = [
	'img/number12x16-z9.gif',
	'img/meter4x12-z9.gif'
];
