Camera = function (scene) {
	// オブジェクト管理
	window.g_objectManager.add(this);

	// グローバルにインスタンスを持っておく
	window.g_camera = this;

	// カメラ座標
	this.x = 0;
	this.y = 0;
	this.width = 320;
	this.height = 240;

	// フレーム処理
	this.onFrame = function () {
		// 自動的に進む
		this.x += SCROLL_SPEED;
		return 0;
	};
};
