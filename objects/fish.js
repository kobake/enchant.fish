// クラス定義
Fish = function () {
	// オブジェクト管理
	window.g_objectManager.add(this);

	// 基本属性
	this.imagepath = 'img/fish64x64-z4.gif';
	this.x = FIRST_X;
	this.y = LIMIT_Y;
	this.width = 64;
	this.height = 64;
	this.zorder = 4;
	this.camera_rate = 1;
	this.animation = GenerateAnimationArray(7, 0, 1);

	// 追加属性
	this.deadFlag = 0; // 死にフラグ(0:初期 1:死んだ 2:死に演出中)
	this.my = 0;

	// 挙動コントローラ
	Fish_Bata.initialize(this);
	//Fish_Jump.initialize(this);

	// デバッグ表示背景
	var labelback = new Sprite(50, 20);
	window.g_scene.groups[9].addChild(labelback);
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
	window.g_label = this.label;
	window.g_scene.groups[9].addChild(this.label);

	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	// フレーム処理用変数（thisが使えないので）
	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	var t = this;
	var fish = this;

	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	// 挙動定義
	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	animations = [];
	animations[0] = GenerateAnimationArray(7, 0, 1);
	animations[1] = GenerateAnimationArray(15, 8, 1);
	animations[2] = GenerateAnimationArray(23, 16, 1);
	animations[3] = GenerateAnimationArray(31, 24, 1);
	animations[4] = GenerateAnimationArray(39, 32, 1);
	animations['running'] = [0, 1, 2, 2, 3, 4, 5, 6, 7]; //GenerateAnimationArray(7, 0, 1);
	animations['batabata'] = GenerateAnimationArray(16, 23, 1);
	animations['falling'] = [4];

	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	// さかなさんのフレーム処理
	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	this.onFrame = function () {
		// フレーム初期化
		self.new_animation = "";

		// 位置計算前の状態
		var old_bottom = t.getBottom();

		// 処理
		this.onControllerFrame();

		// Y方向の処理はコントローラに委譲してみる
		/*
		// 加速度による速度計算
		this.my += 0.9;
		if (this.my >= 100) this.my = 100;

		// 速度による位置計算
		this.y += this.my;

		// Y位置制限
		if (this.y >= LIMIT_Y) {
		this.y = LIMIT_Y;
		this.my = 0;
		// jumpingプロパティがあればそれをチェック
		if (t.jumping) {
		if (t.jumping == 1) t.jumping = 0;
		}
		}
		*/


		/* ### いったん保留
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
		*/
		x_hit = false;

		// 自動進行
		if (!x_hit) {
			if (t.x < AUTO_X_LIMIT) {
				t.x += 0.5;
				if (t.x > AUTO_X_LIMIT) {
					t.x = AUTO_X_LIMIT;
				}
			}
		}

		// 死に判定
		if (t.x <= DEAD_X) {
			if (t.deadFlag == 0) {
				t.deadFlag = 1;
			}
		}

		// さかなくんが死んでたらゲームオーバー表示
		if (fish.deadFlag == 1) {
			fish.deadFlag = 2;

			// 死に演出
			window.g_gameover = new Gameover(scene);

			// タッチしたら死に演出は削除してゲームリトライ
			Retry = function (e) {
				window.g_touch_skip = 1; // ### TOUCH_END が呼ばれないケースの暫定対処

				// さかなくん復活
				fish.reset();

				// 死に演出削除
				window.g_gameover.disposeSlow();
				delete window.g_gameover;

				// コールバック削除
				scene.removeEventListener(Event.TOUCH_START, Retry);
			};
			scene.addEventListener(Event.TOUCH_START, Retry);
		}

		// デバッグ情報
		//t.label.text = "P:" + t.power + " F:" + t.power_frame;
		return 0;
	};

	// 基本的な属性
	// ###このへんは基底クラスを作りたい
	this.getLeft = function () {
		return this.x + 8; // 左部8ピクセルの隙間（だいたい）
	};
	this.getRight = function () {
		return this.x + this.width - 1; // 右部1ピクセルの隙間
	};
	this.getTop = function () {
		return this.y + 5; // 天井当たり判定で使う
	}
	this.getBottom = function () {
		return this.y + this.height - 11; // 下部11ピクセルの隙間
	}
	// 属性操作
	this.setRight = function (right) {
		this.x = right - 64 + 1; // 右部1ピクセルの隙間
	};
	this.setBottom = function (bottom) {
		this.y = bottom - 64 + 11; // 下部11ピクセルの隙間
		this.my = 0;
		this.new_animation = "running";
		// jumpingプロパティがあればそれを使う
		if (!this.jumping) {
			if (this.jumping == 1) this.jumping = 0;
		}
	}
	this.setTop = function (bottom) {
		this.y = -5; // 上部5ピクセルの隙間
		this.my = 0;
		//this.new_animation = "batabata";
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
		this.x = FIRST_X;
		window.g_score.reset(); // ### Observerで実装すべき
	};
};

// 画像リスト
Fish.images = [
	'img/fish64x64-z4.gif'
];
