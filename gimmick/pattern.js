// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// 地形パターン
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// Usage: pattern = new Pattern(group, 10);
// プロパティ
// ・world_x … 変動することは無い。camera_xにより実際の見た目位置が変動
// ・world_y … 変動することは無い
//
Pattern = function (imagefilepath, x, y, width, height, zorder, camera_rate) {
	// オブジェクト管理
	window.g_objectManager.add(this);

	// 参照
	this.camera_rate = camera_rate;

	// 属性
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.zorder = zorder;
	this.camera_rate = camera_rate;

	// 独自属性
	// ### プロパティ定義も使ってみたいが。
	this.getX = function () {
		return this.x;
	}
	// ###このへんは基底クラスを作りたい
	this.getLeft = function () {
		return this.x;
	};
	this.getRight = function () {
		return this.x + this.width;
	};
	this.getTop = function () {
		return this.y + 4; // 上部4ピクセルの隙間
	};
	this.getBottom = function () {
		return this.y + this.height;
	};
	// 当たり判定（相手が getLeft(), getRight() を持っている前提)
	this.intersectsX = function (obj) {
		if (this.getRight() <= obj.getLeft()) return false; // 自分が左側にあるケース
		if (obj.getRight() <= this.getLeft()) return false; // 自分が右側にあるケース
		return true; // それ以外はどこかしら重なってる
	};
	// 当たり判定（相手が getTop(), getBottom() を持っている前提)
	this.intersectsY = function (obj) {
		if (this.getBottom() <= obj.getTop()) return false; // 自分が上側にあるケース
		if (obj.getBottom() <= this.getTop()) return false; // 自分が下側にあるケース
		return true; // それ以外はどこかしら重なってる
	};
	// 当たり判定（相手が getLeft(), getRight(), getTop(), getBottom() を持っている前提)
	this.intersects = function (obj) {
		return this.intersectsX(obj) && this.intersectsY(obj);
	};
};

// 画像リスト
Pattern.images = [
	'patterns/pt01.gif',
	'patterns/pt02.gif'
];
