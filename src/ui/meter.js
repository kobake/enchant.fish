Meter = function () {
	// オブジェクト管理
	window.g_objectManager.add(this);

	window.g_meter = this;

	// スプライト作成共通部分
	var newNumObject = function (pos) {
		var obj = new Background('img/number12x16-z9.gif', 0, 0, 12, 16, 9, 0);
		obj.animation = pos;
		return obj;
	};
	var newMeterObject = function (width, pos) {
		var obj = new Background('img/meter4x12-z9.gif', 0, 0, width, 12, 9, 0);
		obj.animation = pos;
		return obj;
	};

	// スプライト（線部分）
	this.line_objects = [];
	this.line_objects[1] = newMeterObject(1, 4); // 奥
	this.line_objects[0] = newMeterObject(4, 0);
	this.line_objects[2] = newMeterObject(4, 2);
	for (var i = 0; i < 3; i++) {
		this.line_objects[i].y = 210;
	}

	// 数字の場所
	var NUM_X = DEAD_X + 3 * 12 - 4;

	// スプライト（数字部分）
	this.num_objects = [];
	for (var i = 0; i < 3; i++) {
		var obj = newNumObject(0);
		obj.x = NUM_X - 12 * (i + 1);
		obj.y = 220;
		this.num_objects.push(obj);
	}

	// スプライト（単位部分）
	this.object_m = newNumObject(10);
	this.object_m.x = NUM_X + 4;
	this.object_m.y = 220;

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
		this.right = window.g_fish.getLeft();
		if (this.right < this.left) this.right = this.left;
		this.meter = Math.max(0, this.right - this.left);
		//console.log(this.left + "," + this.right + "," + this.meter);

		// 線スプライトへの反映
		this.line_objects[0].x = this.left;
		this.line_objects[1].x = this.left;
		this.line_objects[1].scaleX = this.meter;
		this.line_objects[1].originX = 0;
		this.line_objects[2].x = this.right;

		// 数字スプライトへの反映
		k = 1;
		for (var i = 0; i < 3; i++) {
			this.num_objects[i].animation = Math.floor(this.meter / k) % 10;
			k *= 10;
		}

		// 
		return 0; // 継続
	};
};

// 画像リスト
Meter.images = [
	'img/number12x16-z9.gif',
	'img/meter4x12-z9.gif'
];
