// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// 背景
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
Background = function (imagefilepath, x, y, width, height, zorder, camera_rate) {
	ObjectManager.initAsObject(this, imagefilepath, x, y, width, height, zorder, camera_rate);
};

// 画像リスト
Background.images = [
	'img/bg-back-z0.gif',	// ゲーム背景（奥）
	'img/bg-front-z1.gif',	// ゲーム背景（手前）
];
