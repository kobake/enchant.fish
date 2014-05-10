// 速度制限
LIMIT_MY = 10;

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// バタ足コントローラ
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
Fish_Bata = function () {
};

Fish_Bata.initialize = function (fish) {
	var scene = fish.scene;

	// 各種パラメータ
	//fish.jumping = 0;
	//fish.charging = 0;
	fish.touching = 0;

	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	// イベント
	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	var t = fish;
	var self = fish; // こっちの変数名のほうがかっこよさげ

	// タッチ開始
	scene.addEventListener(Event.TOUCH_START, function (e) {
		if (window.g_touch_skip > 0) {
			window.g_touch_skip--;
			return;
		}
		console.log("touch start");
		// 普通のジャンプしてみる
		//self.sprite.my = -16;
		self.touching = 1;
	});

	// フレーム処理
	fish.frameHandlers.push(function (_fish) {
		// Y方向加速度
		var ay = 0.9;
		var ay = 0.7;

		// スプライト切り替え
		var new_frame_number = 0;

		// ユーザ操作による加速度調整
		if (self.touching == 1) {
			ay = -0.7;
		}
		else {
		}

		// 加速度による速度計算
		self.sprite.my += ay;
		if (self.sprite.my >= LIMIT_MY) self.sprite.my = LIMIT_MY;

		// 速度による位置計算
		self.sprite.y += self.sprite.my;

		// Y位置制限
		if (self.sprite.y >= LIMIT_Y) {
			self.sprite.y = LIMIT_Y;
			self.sprite.my = 0;
			self.running = 1;
			self.new_animation = "running";
		}

		// アニメーション設定
		if (self.touching == 1) {
			self.new_animation = "batabata"; // バタバタ（押下中）
		}
		else {
			if (self.new_animation != "running") {
				self.new_animation = "falling"; // ピタッ（無操作。落下）
			}
		}
		//self.new_animation = "running"; // 地上走り（無操作。地面）
		if (self.new_animation != self.animation) {
			console.log("animation old:" + self.animation + "new:" + self.new_animation);
			self.animation = self.new_animation;
			self.sprite.frame = frames[self.animation];
		}
	});

	// タッチ終了
	scene.addEventListener(Event.TOUCH_END, function (e) {
		console.log("touch end");
		self.touching = 0;
	});
};
