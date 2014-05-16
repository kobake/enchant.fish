// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// ちーちゃん
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
var Tichan = function () {
	ObjectManager.initAsGroup(this, 0, 0, 1);
	this.name = "Tichan";

	// スプライト
	var obj = new CommonObject('img/tichan96x208-z2.gif', 0, 0, 96, 208, 2, 1);
	obj.animation = GenerateAnimationArray(0, 5, 2);
	this.objects.push(obj);

	// スプライト
	obj = new CommonObject('img/tichan96x208-z4.gif', 0, 0, 96, 208, 4, 1);
	obj.animation = GenerateAnimationArray(0, 5, 2);
	this.objects.push(obj);

	// フレーム処理
	var self = this;
	self.y = 16;
	this.onFrame = function () {
		self.x += SCROLL_SPEED;
		return 0;
	};
};

// 画像リスト
Tichan.images = [
	'img/tichan96x208-z2.gif',
	'img/tichan96x208-z4.gif'
];
