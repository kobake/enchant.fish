// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// カラス
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
Crow = function (x, y) {
	ObjectManager.initAsObject(this, 'img/crow80x80-z5.png', x, y, 80, 80, 5, 1);

	// フレーム処理。
	// 戻り値0: 通常
	// 戻り値0以外: オブジェクト削除
	this.onFrame = function () {
		this.x -= SCROLL_SPEED;
		if (this.x <= -80) {
			return 1; // 削除
		}
		return 0; // 継続
	};

	// 基本的な属性
	// ### プロパティ定義も使ってみたいが。
	this.getX = function () {
		return this.x;
	}
	// ###このへんは基底クラスを作りたい (Object.prototype.initAs～でいけそう)
	this.getLeft = function () {
		return this.x + 5;
	};
	this.getRight = function () {
		return this.x + this.width - 5;
	};
	this.getTop = function () {
		return this.y + 5;
	};
	this.getBottom = function () {
		return this.y + this.height - 5;
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
Crow.images = [
	'img/crow40x40-z5.png'
];
