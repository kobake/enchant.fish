enchant();
window.onload = function() {
    var game = new Game(320, 320); // 表示領域の大きさを設定
    game.fps = 24;                 // ゲームの進行スピードを設定
    game.onload = function() {     // ゲームの準備が整ったらメインの処理を実行します
        var createTitleScene = function() {
            var scene = new Scene();
            scene.backgroundColor = 'rgba(255, 230, 0, 1)';
            
            var sprite = new Sprite(50, 50);
            sprite.backgroundColor = '#f00';
            scene.addChild(sprite);
            
            var counter = 0;
            scene.addEventListener(Event.TOUCH_START, function(e) { // シーンにタッチイベントを設定
                console.log("touch start");
                if(counter++ == 0){
                    console.log("remove sprite");
                    scene.removeChild(sprite);
                }
            });
            scene.addEventListener(Event.TOUCH_END, function(e) { // シーンにタッチイベントを設定
                console.log("touch end");
            });
            // この関数内で作ったシーンを呼び出し元に返します(return)
            return scene;
        };
        // ゲームの_rootSceneをタイトルシーンに置き換えます
        game.replaceScene(createTitleScene());
    }
    game.start(); // ゲームをスタートさせます
};
