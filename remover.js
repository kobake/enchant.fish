Remover = function (scene) {
	window.g_remover = this;

	this.removes = [];
	this.prepareRemove = function (sprite) {
		this.removes.push(sprite);
	};

	var t = this;
	scene.addEventListener(Event.ENTER_FRAME, function (e) {
		// 削除予約されたスプライトをここで全部消す
		for (var i = 0; i < t.removes.length; i++) {
			var sprite = t.removes[i];
			sprite.parentNode.removeChild(sprite);
		}
		// 予約リストクリア
		t.removes = [];
	});
};
