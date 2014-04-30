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
};

// 画像リスト（ぎゅうにゅう）
Milk.images = [
	'img/milk64x80-z3.gif',		// 小
	'img/milk64x120-z3.gif',	// 中
	'img/milk64x160-z3.gif'		// 大
];
