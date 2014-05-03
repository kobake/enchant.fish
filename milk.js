// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// 牛乳パック
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// Usage: milk = new Milk(group, 10);
Milk = function (scene, x) {
	group = scene.groups[3];

	// 参照
	this.group = group;

	// スプライト
	this.sprite = new Sprite(64, 120);
	this.sprite.image = game.assets['img/milk64x120-z3.gif'];
	this.sprite.x = x;
	this.sprite.y = 240 - 32 - 120;
	group.addChild(this.sprite);

	// フレーム処理。
	// 戻り値0: 通常
	// 戻り値0以外: オブジェクト削除
	this.frame = function () {
		this.sprite.x -= LOOP_SPEED;
		if (this.sprite.x <= -64) {
			return 1; // 削除
		}
		return 0; // 継続
	};

	// 削除
	this.dispose = function () {
		this.group.removeChild(this.sprite);
		delete this.sprite; // 変数をアンセット
	};

	// 基本的な属性
	// ### プロパティ定義も使ってみたいが。
	this.getX = function () {
		return this.sprite.x;
	}
	// ###このへんは基底クラスを作りたい
	this.getLeft = function () {
		return this.sprite.x;
	};
	this.getRight = function () {
		return this.sprite.x + this.sprite.width;
	};
	this.getTop = function () {
		return this.sprite.y + 4; // 上部4ピクセルの隙間
	};
	this.getBottom = function () {
		return this.sprite.y + this.sprite.height;
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

// 画像リスト（ぎゅうにゅう）
Milk.images = [
	'img/milk64x80-z3.gif',		// 小
	'img/milk64x120-z3.gif',	// 中
	'img/milk64x160-z3.gif'		// 大
];
