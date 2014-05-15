// 速度制限
LIMIT_MY = 10;

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// バタ足コントローラ
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
Fish_Bata = function(){
};
Fish_Bata.initialize = function (fish) {
	// 各種パラメータ
	fish.touching = 0;

	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	// イベント
	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	var t = fish;
	var self = fish; // こっちの変数名のほうがかっこよさげ

	// タッチ開始
	var fTouchStart = fish.onTouchStart;
	fish.onTouchStart = function(){
		if(fTouchStart)fTouchStart.call(fish);

		if (window.g_touch_skip > 0) {
			window.g_touch_skip--;
			return;
		}
		console.log("touch start " + self.anm + "," + self.new_anm);
		// 地上からは普通のジャンプしてみる
		if (self.anm == "running") {
			self.my = -10;
		}
		else {
			self.touching = 1;
		}
	};

	// フレーム処理
	fish.onControllerFrame = function () {
		// デバッグ情報
		window.g_label.text = "t = " + self.touching;

		// Y方向加速度
		var ay = 0.9;
		var ay = 0.7;

		// スプライト切り替え
		var new_frame_number = 0;

		// ユーザ操作による加速度調整
		if (self.touching == 1) {
			ay = -0.5;
		}
		else {
		}

		// 加速度による速度計算
		self.my += ay;
		if (self.my >= LIMIT_MY) self.my = LIMIT_MY;

		// 速度による位置計算
		self.y += self.my;

		// Y位置制限
		if (self.y >= LIMIT_Y) {
			self.y = LIMIT_Y;
			self.my = 0;
			self.new_anm = "running";
		}
		else if (self.getTop() < 0) {
			self.setTop(0);
		}

		// アニメーション設定
		if (self.touching == 1) {
			self.new_anm = "batabata"; // バタバタ（押下中）
		}
		else {
			if (self.new_anm != "running") {
				self.new_anm = "falling"; // ピタッ（無操作。落下）
			}
		}
		//self.new_anm = "running"; // 地上走り（無操作。地面）
		if (self.new_anm != self.anm) {
			console.log("anm old:" + self.anm + "new:" + self.new_anm);
			self.anm = self.new_anm;
			self.animation = animations[self.anm];
		}
	};

	// タッチ終了
	var fTouchEnd = fish.onTouchEnd;
	fish.onTouchEnd = function(){
		if(fTouchEnd)fTouchEnd.call(fish);

		console.log("touch end");
		self.touching = 0;
		self.new_anm = "falling";
	};
};
