Number = function (x, y, keta) {
	ObjectManager.initAsGroup(this, x, y, 0);

	var NUM_W = 12;
	this.keta = keta;
	this.width = this.keta * NUM_W;

	// スプライト作成共通部分
	var newNumObject = function (pos) {
		var obj = new CommonObject('img/number12x16-z9.gif', 0, 0, NUM_W, 16, 9, 0);
		obj.animation = pos;
		return obj;
	};

	// スプライト（数字部分）（右から順に並べる）
	this.objects = [];
	for (var i = 0; i < this.keta; i++) {
		var obj = newNumObject(0);
		obj.x = this.width - NUM_W * (i + 1);
		obj.y = 0;
		this.objects.push(obj);
	}

	// 値
	this.value = 0;

	// フレーム処理。
	// 戻り値0: 通常
	// 戻り値0以外: オブジェクト削除
	this.onFrame = function () {
		// 数字スプライトへの反映
		k = 1;
		for (var i = 0; i < this.keta; i++) {
			this.objects[i].animation = Math.floor(this.value / k) % 10;
			k *= 10;
		}
		// 継続
		return 0;
	};
};

// 画像リスト
Number.images = [
	'img/number12x16-z9.gif'
];
