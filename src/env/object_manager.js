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
		for (var i = 0; i < this.objects.length; i++) {
			var obj = this.objects[i];

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
			if (obj.onFrame) {
				var ret = obj.onFrame();
				if (typeof ret != 'number') {
					// only in debug mode
					alert("Warning: onFrame return value is not number. Object.name: " + obj.name);
				}
				// フレーム処理が0以外を返したら対象オブジェクトを削除する
				// ※グループを消すときに子要素も消したほうが良いはず
				if (ret != 0) {
					if (obj.dispose) {
						var disposed_count = obj.dispose();
						this.objects.splice(i, disposed_count);
						i -= disposed_count;
					}
				}
			}
		}
	};

	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	// オフセット計算（カメラ計算）適用
	// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
	this.calcRender = function () {
		// 全オブジェクトについてグループの子座標計算を行う
		offsetObjects(this.objects, 0, 0);
		// 全オブジェクトの座標をカメラ値により計算する
		var camera_x = window.g_camera.x;
		_.each(this.objects, function (obj) {
			if (obj.sprite) {
				// 位置
				obj.sprite.x = obj.x + obj.offx - camera_x * obj.camera_rate;
				obj.sprite.y = obj.y + obj.offy;
				// スケール
				if (obj.scaleX) {
					obj.sprite.scaleX = obj.scaleX;
					obj.sprite.originX = obj.originX;
				}
			}
		});
	}
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// オフセット計算（カメラ計算）内部処理
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
function _clearOffsets(objects) {
	for (var i = 0; i < objects.length; i++) {
		var obj = objects[i];
		obj.offx = null;
		obj.offy = null;
	}
}
function _setOffsets(objects, offx, offy) {
	for (var i = 0; i < objects.length; i++) {
		var obj = objects[i];
		if (obj.offx !== null) continue; // 設定済みは飛ばす
		obj.offx = offx;
		obj.offy = offy;
		if (obj.objects) {
			_setOffsets(obj.objects, obj.x + offx, obj.y + offy);
		}
	}
}
function offsetObjects(objects) {
	_clearOffsets(objects);
	_setOffsets(objects, 0, 0);
}


// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// 汎用オブジェクト化
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
ObjectManager.initAsObject = function (obj,
		imagepath, x, y, width, height, zorder, camera_rate) {
	obj.type = 'object';
	obj.name = 'unknown';

	// スプライト
	obj.imagepath = imagepath;
	obj.x = x;
	obj.y = y;
	obj.width = width;
	obj.height = height;
	obj.zorder = zorder;
	obj.camera_rate = camera_rate;

	// その他共通
	ObjectManager._initCommon(obj);
};

ObjectManager.initAsGroup = function (obj,
		x, y, camera_rate) {
	obj.type = 'group';
	obj.x = x;
	obj.y = y;
	obj.camera_rate = camera_rate;

	// その他共通
	ObjectManager._initCommon(obj);
};

ObjectManager._initCommon = function (obj) {
	// オブジェクト管理
	window.g_objectManager.add(obj);
	// 子要素
	obj.objects = [];
	// 削除メソッド (削除されたオブジェクト数を返す)
	obj.dispose = function () {
		var ret = 1;
		// まず自身のスプライトを削除
		if (obj.sprite) {
			obj.sprite.parentNode.removeChild(obj.sprite);
			delete obj.sprite;
		}
		// 子があれば子も削除
		if (obj.objects) {
			for (var i = 0; i < obj.objects.length; i++) {
				ret += obj.objects[i].dispose();
			}
		}
		obj.objects = [];
		return ret;
	};
};

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
// 汎用オブジェクト
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- //
CommonObject = function (imagefilepath, x, y, width, height, zorder, camera_rate) {
	ObjectManager.initAsObject(this, imagefilepath, x, y, width, height, zorder, camera_rate);
};
