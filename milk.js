// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// 牛乳パック
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// Usage: milk = new Milk(group, 10);
Milk = function (group, x) {
	// 参照
	this.group = group;

	// スプライト
	this.sprite = new Sprite(64, 80);
	this.sprite.image = game.assets['img/milk64x80.gif'];
	this.sprite.x = x;
	this.sprite.y = 240 - 32 - 80;
	group.addChild(this.sprite);

	// フレーム処理。
	// 戻り値0: 通常
	// 戻り値0以外: オブジェクト削除
	this.frame = function () {
		var LOOP_SPEED = 4;
		this.sprite.x -= LOOP_SPEED;
		if (this.sprite.x <= -32) {
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