// スタート表示
Start = function (scene) {
	ObjectManager.initAsGroup(this, 0, 0, 0);

	window.g_start = this;

	var obj = new CommonObject('img/title-z9.gif', 0, 0, 320, 240, 9, 0);
	this.objects.push(obj);

	// クリックで消える
	this.endflag = 0;
	this.onTouchStart = function () {
		this.endflag = 1;
	};
	this.onFrame = function () {
		if (this.endflag) {
			return 1;
		}
		return 0;
	};
};

// 画像リスト
Start.images = [
];
