// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// 溜めジャンプコントローラ（今回は使わないと思う）
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
Fish_Jump = function () {
};

Fish_Jump.initialize = function (fish) {
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
};
