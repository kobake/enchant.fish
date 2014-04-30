MilkManager = function (scene) {
	this.scene = scene;
	this.milks = [];

	this.counter = 0;

	// 抽選
	this.lottery = function () {
		//var hit = CalcLottery(30);
		var hit = false;
		// 8回に1回
		this.counter++;
		hit = (this.counter % 8 == 1);

		if (hit) {
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
