//var LIMIT_Y = 186;
var LIMIT_Y = 240 - 32 - 64 + 12;

// 初期位置
var FIRST_X = (320 - 64) / 2;
FIRST_X = (320 - 64) / 2 + 100;

// 自動で進む限界位置
var AUTO_X_LIMIT = (320 - 64) / 2 + 50;

// 死ぬ位置
var DEAD_X = 31;

// クラス定義
Fish = function (scene) {
	this.scene = scene;
	this.deadFlag = 0; // 死にフラグ(0:初期 1:死んだ 2:死に演出中)
	group = scene.groups[4];
	this.group = group;
	// this.sprite = new Sprite(37, 24); // 1キャラのサイズ
	// this.sprite.image = game.assets['img/fishkun37x24-z4.gif'];
	// this.sprite.frame = [0, 1, 2, 3, 4, 5];   // select sprite frame
	this.sprite = new Sprite(64, 64); // 1キャラのサイズ
	this.sprite.y = LIMIT_Y;
	this.sprite.image = game.assets['img/fishkun64x64-z4.gif'];
	// this.sprite.frame = [5, 4, 3, 2, 1, 0];   // select sprite frame
	this.sprite.frame = GenerateFrameArray(7, 0, 1);   // select sprite frame
	/*
	this.sprite.tl.moveBy(320 - 64, 0, 90)	// move right
	.scaleTo(-1, 1, 10)			// turn left
	.moveBy(-(320 - 64), 0, 90)	// move left
	.scaleTo(1, 1, 10)			// turn right
	.loop();					// loop it
	*/
	group.addChild(this.sprite);
	this.sprite.my = 0;
	this.sprite.x = FIRST_X;

	// ジャンプ処理
	this.jump = function () {
		// 上方向への速度を設定
		this.sprite.my = -8;
		console.log("jump");
	};

	// this を保存しとく
	var t = this;

	// さかなさんのフレーム処理
	var sprite = this.sprite;
	group.addEventListener(Event.ENTER_FRAME, function (e) {
		// 加速度による速度計算
		sprite.my += 0.9;
		if (sprite.my >= 100) sprite.my = 100;

		// 速度による位置計算
		sprite.y += sprite.my;

		// Y位置制限
		if (sprite.y >= LIMIT_Y) {
			sprite.y = LIMIT_Y;
			sprite.my = 0;
		}

		// ミルクマネージャ
		var man = window.milkManager;
		var milk;

		// 自分のすぐ右のミルクを1個見つける (###シングルトンの相互参照に注意。今のところは大丈夫っぽいけど。。。)
		// 先にX方向の判定補正を行うことで、めりこんだミルクに乗り上げてしまう現象は防げる、はず。
		milk = man.findRightMilk(t);
		var x_hit = false;
		if (milk) {
			// ミルクとの当たり判定
			x_hit |= t.calcPositionByMilk(milk);
			//console.log("milk x = " + milk.getX());
		}

		// 自動進行
		if (!x_hit) {
			if (t.sprite.x < AUTO_X_LIMIT) {
				t.sprite.x += 1;
				if (t.sprite.x > AUTO_X_LIMIT) {
					t.sprite.x = AUTO_X_LIMIT;
				}
			}
		}

		// 足場のミルクを1個見つける
		// （Y軸補正）
		milk = man.findUnderMilk(t);
		if (milk) {
			// ミルクとの足場判定
			t.calcPositionByUnderMilk(milk);
		}

		// 死に判定
		if (t.sprite.x <= DEAD_X) {
			if (t.deadFlag == 0) {
				t.deadFlag = 1;
			}
		}
	});

	// タッチしたらジャンプ
	scene.addEventListener(Event.TOUCH_START, function (e) {
		t.jump();
	});

	// ミルクによる位置修正
	// ※ここで指定されたミルクは魚より右に位置しているのが前提
	// @return {Boolean} 補正されたかどうか
	this.calcPositionByMilk = function (milk) {
		// 高さチェック
		if (this.getBottom() <= milk.getTop()) {
			// ミルクを乗り越えている状態。何もしない。
			return false;
		}

		// X距離チェック
		var dist = milk.getLeft() - this.getRight();
		//console.log("dist = " + dist);
		if (dist < 0) { // 食い込んでいたら
			this.setRight(milk.getLeft());
			return true; // 補正した
		}
		return false;
	};

	// ミルクによる足場修正（Y関係は離れてるかもしれないし重なってるかもしれない)
	this.calcPositionByUnderMilk = function (milk) {
		if (this.getBottom() > milk.getTop()) {
			// 下にめり込んでいる状態。
			// 掘り起こす。
			this.setBottom(milk.getTop());
		}
	};

	// 基本的な属性
	// ###このへんは基底クラスを作りたい
	this.getLeft = function () {
		return this.sprite.x + 8; // 左部8ピクセルの隙間（だいたい）
	};
	this.getRight = function () {
		return this.sprite.x + this.sprite.width - 1; // 右部1ピクセルの隙間
	};
	this.getTop = function () {
		return this.sprite.y; // ここは計算に使うことはないので細かい補整はしない
	}
	this.getBottom = function () {
		return this.sprite.y + this.sprite.height - 11; // 下部11ピクセルの隙間
	}
	// 属性操作
	this.setRight = function (right) {
		this.sprite.x = right - 64 + 1; // 右部1ピクセルの隙間
	};
	this.setBottom = function (bottom) {
		this.sprite.y = bottom - 64 + 11; // 下部11ピクセルの隙間
		this.sprite.my = 0;
	}
	// 当たり判定（相手が getLeft(), getRight() を持っている前提)
	this.intersectsX = function (obj) {
		if (this.getRight() <= obj.getLeft()) return false; // 自分が左側にあるケース
		if (obj.getRight() <= this.getLeft()) return false; // 自分が右側にあるケース
		return true; // それ以外はどこかしら重なってる
	};
	// さかなくん復活
	this.reset = function () {
		this.deadFlag = 0;
		this.sprite.x = FIRST_X;
		window.g_score.reset(); // ### Observerで実装すべき
	};
};

// 画像リスト
Fish.images = [
	'img/fishkun37x24-z4.gif',
	'img/fishkun64x64-z4.gif'
];
