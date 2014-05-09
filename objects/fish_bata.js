// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// バタ足コントローラ
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
Fish_Bata = function () {
};

Fish_Bata.initialize = function (fish) {
	var scene = fish.scene;

	// 各種パラメータ
	//fish.jumping = 0;
	//fish.power = 0;
	//fish.power_frame = 0;
	//fish.charging = 0;
	fish.touching = 0;

	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	// ジャンプ処理
	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	/*
	fish.jumpPrepare = function () {
	// チャージ開始
	if (this.charging == 0) {
	this.charging = 1;
	this.power = 0;
	}
	};
	*/
	/*
	fish.jumpGo = function () {
	// ジャンプ
	if (this.jumping == 0) {
	this.jumping = 1;
	this.sprite.my = -16;
	this.sprite.my = -8 - Math.pow(this.power, 0.6) * 2;
	}

	// チャージ終了
	this.charging = 0;
	this.power = 0;
	};
	*/

	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	// イベント
	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	var t = fish;
	var self = fish; // こっちの変数名のほうがかっこよさげ

	// タッチ開始
	scene.addEventListener(Event.TOUCH_START, function (e) {
		console.log("touch start");
		// 普通のジャンプしてみる
		self.sprite.my = -16;
	});

	// フレーム処理
	scene.addEventListener(Event.ENTER_FRAME, function (e) {
		if (t.touching == 1) {
			// 上方向の加速度を付ける
		}
		else {
		}
	});

	// タッチ終了
	scene.addEventListener(Event.TOUCH_END, function (e) {
		console.log("touch end");
		t.touching = 0;
	});
};
