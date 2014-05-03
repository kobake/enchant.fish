// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// カラス
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
Crow = function (scene, x, y) {
	group = scene.groups[5];

	// 参照
	this.group = group;

	// スプライト
	this.sprite = new Sprite(80, 80);
	this.sprite.image = game.assets['img/crow80x80-z5.png'];
	this.sprite.x = x;
	this.sprite.y = y;
	this.sprite.scaleX = 0.5;
	this.sprite.scaleY = 0.5;
	group.addChild(this.sprite);

	// フレーム処理。
	// 戻り値0: 通常
	// 戻り値0以外: オブジェクト削除
	this.frame = function () {
		this.sprite.x -= LOOP_SPEED;
		if (this.sprite.x <= -80) {
			return 1; // 削除
		}
		return 0; // 継続
	};
	var t = this;
	this.f = function () {
		var ret = t.frame();
		if (ret != 0) {
			t.dispose();
			scene.removeEventListener(Event.ENTER_FRAME, t.f);
		}
	};
	scene.addEventListener(Event.ENTER_FRAME, this.f);

	// 削除
	this.dispose = function () {
		if (this.sprite) {
			this.group.removeChild(this.sprite);
			delete this.sprite; // 変数をアンセット
		}
	};

	// 基本的な属性
	// ### プロパティ定義も使ってみたいが。
	this.getX = function () {
		return this.sprite.x;
	}
	// ###このへんは基底クラスを作りたい
	this.getLeft = function () {
		return this.sprite.x + 5;
	};
	this.getRight = function () {
		return this.sprite.x + this.sprite.width - 5;
	};
	this.getTop = function () {
		return this.sprite.y + 5;
	};
	this.getBottom = function () {
		return this.sprite.y + this.sprite.height - 5;
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
	'img/crow80x80-z5.png'
];
