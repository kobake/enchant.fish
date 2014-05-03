//var LIMIT_Y = 186;
var LIMIT_Y = 240 - 32 - 64 + 12;

// 初期位置
var FIRST_X = (320 - 64) / 2;
FIRST_X = (320 - 64) / 2 + 100;

// 自動で進む限界位置
var AUTO_X_LIMIT = (320 - 64) / 2 + 50;

// 死ぬ位置
var DEAD_X = 31;
//DEAD_X = 200; // ゲームオーバー確認用

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
	this.sprite.image = game.assets['img/fish64x64-z4.gif'];
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

	// 各種パラメータ
	this.power = 0;
	this.jumping = 0;

	// デバッグ表示背景
	var labelback = new Sprite(50, 20);
	scene.groups[9].addChild(labelback);
	labelback.backgroundColor = "#000";
	labelback.x = 320 - labelback.width;
	labelback.y = 240 - labelback.height;

	// デバッグ表示
	this.label = new Label();
	this.label.text = "hoge";
	this.label.x = 320 - labelback.width + 2;
	this.label.y = 240 - labelback.height + 2;
	this.label.color = "#fff";
	this.label.font = "12px 'ＭＳ ゴシック'";
	this.label.opacity = 1;
	scene.groups[9].addChild(this.label);

	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	// フレーム処理用変数（thisが使えないので）
	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	var t = this;
	var fish = this;
	var sprite = this.sprite;

	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	// ジャンプ処理
	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	this.jumpPrepare = function () {
		// 二段ジャンプの禁止（停止状態じゃないとダメ）
		if (this.jumping != 0) return;
		// 上方向への速度を設定
		//this.sprite.my = -8;
		this.jumping = 1;
		this.power = 0;
	};
	this.jumpGo = function () {
		// 準備状態じゃなければ何もしない
		if (this.jumping != 1) return;
		// ジャンプ
		this.jumping = 2;
		// 上方向への速度を設定
		//this.sprite.my = -8;
		this.sprite.my = -16;
	};
	group.addEventListener(Event.ENTER_FRAME, function (e) {
		if (t.jumping == 1) {
			t.power += 1;
		}
		else {
			t.power = 0;
		}
	});

	// タッチ開始
	window.g_touch_skip = 0;
	scene.addEventListener(Event.TOUCH_START, function (e) {
		if (window.g_touch_skip == 1) {
			window.g_touch_skip = 0;
			return;
		}
		console.log("touch start");
		t.jumpPrepare(); // ジャンプ準備
	});

	// タッチ終了
	scene.addEventListener(Event.TOUCH_END, function (e) {
		console.log("touch end");
		t.jumpGo(); // ジャンプ確定
	});

	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	// さかなさんのフレーム処理
	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	group.addEventListener(Event.ENTER_FRAME, function (e) {
		// 位置計算前の状態
		var old_bottom = t.getBottom();

		// 加速度による速度計算
		sprite.my += 0.9;
		if (sprite.my >= 100) sprite.my = 100;

		// 速度による位置計算
		sprite.y += sprite.my;

		// Y位置制限
		if (sprite.y >= LIMIT_Y) {
			sprite.y = LIMIT_Y;
			sprite.my = 0;
			if (t.jumping == 2) t.jumping = 0;
		}

		// ミルクマネージャ
		var man = window.milkManager;
		var milk;

		// 当たり判定対象
		var milks = [];
		milk = man.findRightMilk(t);
		if (milk) {
			milks.push(milk);
		}
		milk = man.findUnderMilk(t);
		if (milk) {
			milks.push(milk);
		}

		// 当たり判定の実施
		var x_hit = false;
		for (var i = 0; i < milks.length; i++) {
			milk = milks[i];
			if (milk.intersects(fish)) {
				// -- -- 高さチェック -- -- //
				// ミルクを乗り越えている状態。または微妙～～に下にめり込んだ状態。
				// ※「8」はめり込み具合の許容範囲。（重力加速度により下にめり込む場合がある）
				if (old_bottom <= milk.getTop()) {
					if (fish.getBottom() > milk.getTop()) {
						// 下にめり込んでいる状態。
						// 掘り起こす。
						fish.setBottom(milk.getTop());
					}
				}
				// ミルクより下にいる状態
				else {
					// X距離チェック
					var dist = milk.getLeft() - fish.getRight();
					if (dist < 0) { // 食い込んでいたら
						fish.setRight(milk.getLeft()); // 補正する
						x_hit = true;
					}
				}
			}
		}

		// 自動進行
		if (!x_hit) {
			if (t.sprite.x < AUTO_X_LIMIT) {
				t.sprite.x += 0.5;
				if (t.sprite.x > AUTO_X_LIMIT) {
					t.sprite.x = AUTO_X_LIMIT;
				}
			}
		}

		// 死に判定
		if (t.sprite.x <= DEAD_X) {
			if (t.deadFlag == 0) {
				t.deadFlag = 1;
			}
		}

		// デバッグ情報
		t.label.text = "P:" + t.power;
	});

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
		if (this.jumping == 2) this.jumping = 0;
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
	'img/fish64x64-z4.gif'
];
