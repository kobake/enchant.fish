// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// 溜めジャンプコントローラ（今回は使わないと思う）
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
Fish_Jump = function () {
};

Fish_Jump.initialize = function (fish) {
	var scene = fish.scene;

	// 各種パラメータ
	fish.jumping = 0;
	fish.power = 0;
	fish.power_frame = 0;
	fish.charging = 0;

	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	// ジャンプ処理
	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	fish.jumpPrepare = function () {
		// チャージ開始
		if (this.charging == 0) {
			this.charging = 1;
			this.power = 0;
		}
	};
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

	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	// イベント
	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	var t = fish;

	// タッチ開始
	window.g_touch_skip = 2;
	scene.addEventListener(Event.TOUCH_START, function (e) {
		console.log("skip = " + window.g_touch_skip);
		if (window.g_touch_skip > 0) {
			window.g_touch_skip--;
			return;
		}
		console.log("touch start");
		t.jumpPrepare(); // ジャンプ準備
	});

	// フレーム処理
	scene.addEventListener(Event.ENTER_FRAME, function (e) {
		if (t.charging == 1) {
			// スプライト切り替え
			var GetPowerFrame = function (power) {
				f = 0;
				if (power < 2) f = 0;
				else if (power < 6) f = 1;
				else if (power < 10) f = 2;
				else if (power < 15) f = 3;
				else f = 4;
				return f;
			};
			// パワー増強
			//var old_f = GetPowerFrame(t.power);
			t.power += 1;
			var f = GetPowerFrame(t.power);
			if (f != t.power_frame) {
				t.power_frame = f;
				t.sprite.frame = frames[t.power_frame];
			}
			//var new_f = GetPowerFrame(t.power);
			// スプライト切り替え
			//if (old_f != new_f) {
			//	t.frame = frames[new_f];
			//}
		}
		else {
			t.power = 0;
			if (t.power_frame != 0) {
				t.power_frame = 0;
				t.sprite.frame = frames[0];
			}
		}
	});

	// タッチ終了
	scene.addEventListener(Event.TOUCH_END, function (e) {
		console.log("touch end");
		t.jumpGo(); // ジャンプ確定
	});
};
