MilkManager = function (scene) {
	this.scene = scene;
	this.milks = [];

	// 抽選
	this.lottery = function () {
		if (CalcLottery(30)) {
			console.log("new milk");
			var milk = new Milk(scene, 320);
			this.milks.push(milk);
		}
	};

	// フレーム処理
	this.frame = function () {
		for (var i = 0; i < this.milks.length; i++) {
			var milk = this.milks[i];
			var ret = milk.frame();
			if (ret != 0) {
				// milk削除
				console.log("delete milk");
				milk.dispose();
				this.milks.splice(i, 1);
				i--;
			}
		}
	};
};
