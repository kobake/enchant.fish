PatternManager = function () {
	// オブジェクト管理
	window.g_objectManager.add(this);

	this.patterns = [];

	// グローバルにインスタンスを持っておく
	window.g_patternManager = this;

	// パターンリスト（常に3つは作っておく。2つに減る度に1つ補う）
	// …思ったけど、ステージ開始時に必要なパターンは全部作っておくことにする
	// Patternクラス自体は内部的に画像が必要になりそうなタイミングで画像を生成するので
	// あまり無駄は起きない。はず。
	for (var i = 0; i < 3; i++) {
		var pattern = new Pattern('patterns/pt01.gif', i * 1056, 0, 1056, 256, 3, 1);
		this.patterns.push(pattern);
	}
};
