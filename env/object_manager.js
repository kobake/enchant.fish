ObjectManager = function (scene) {
	window.g_objectManager = this;
	this.objects = [];
	this.add = function (obj) {
		this.objects.push(obj);
	}
	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	// イベント
	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	this.invokeTouchStart = function () {
		_.each(this.objects, function (obj) {
			if (obj.onTouchStart) obj.onTouchStart();
		});
	};
	this.invokeTouchEnd = function () {
		_.each(this.objects, function (obj) {
			if (obj.onTouchEnd) obj.onTouchEnd();
		});
	};
	this.invokeFrame = function () {
		_.each(this.objects, function (obj) {
			// オブジェクトのスプライトを生成する
			if (!obj.sprite && !!obj.imagepath) {
				console.log("adding sprite " + obj.imagepath);
				// ここはオブジェクト1個につき一度だけ実行される
				obj.sprite = new Sprite(obj.width, obj.height);
				if (obj.imagepath[0] === '#') {
					obj.sprite.backgroundColor = obj.imagepath;
				}
				else {
					obj.sprite.image = game.assets[obj.imagepath];
				}
				obj.sprite.x = obj.x;
				obj.sprite.y = obj.y;
				if (typeof obj.animation != 'undefined') {
					obj.sprite.frame = obj.animation;
				}
				if (typeof obj.opacity != 'undefined') {
					obj.sprite.opacity = obj.opacity;
				}
				// グループへの追加
				scene.groups[obj.zorder].addChild(obj.sprite);
			}
			// オブジェクトのハンドラを呼ぶ
			if (obj.onFrame) obj.onFrame();
		});
	};
	this.calcRender = function () {
		// 全オブジェクトの座標をカメラ値により計算する
		_.each(this.objects, function (obj) {
			if (obj.sprite) {
				// 位置
				obj.sprite.x = obj.x;
				obj.sprite.y = obj.y;
				// スケール
				if (obj.scaleX) {
					obj.sprite.scaleX = obj.scaleX;
					obj.sprite.originX = obj.originX;
				}
			}
		});
	}
};

ObjectManager.initAsObject =
	function(obj, imagepath, x, y, width, height, zorder, camera_rate) {
		// スプライト
		obj.imagepath = imagepath;
		obj.x = x;
		obj.y = y;
		obj.width = width;
		obj.height = height;
		obj.zorder = zorder;
		obj.camera_rate = camera_rate;

		// オブジェクト管理
		window.g_objectManager.add(obj);
	};

CommonObject = function (imagefilepath, x, y, width, height, zorder, camera_rate) {
	ObjectManager.initAsObject(this, imagefilepath, x, y, width, height, zorder, camera_rate);
};
