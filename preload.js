var preload = function(game){}

preload.prototype = {
	preload: function(){ 
          var loadingBar = this.add.sprite(700,700,"loading");
          loadingBar.anchor.setTo(0.5,0.5);
          this.load.setPreloadSprite(loadingBar);

         
            this.game.load.image("ground", "assets/ground.png");
            this.game.load.image("bg", "assets/bg.png");
            this.game.load.image("over", "assets/over.png");
            // game.load.spritesheet("name", "path/to/filename", width, height)  optional : frame count.
            this.game.load.spritesheet("player", "assets/warrior_m1.png", 100, 100);
            this.game.load.spritesheet("coin", "assets/coins.png", 40, 44, 4);
            this.game.load.spritesheet("cloud", "assets/cloud.png");  
            this.game.load.spritesheet("button", "assets/button.png");
        

        
        
	},
  	create: function(){
		this.game.state.start("main");
	}
}