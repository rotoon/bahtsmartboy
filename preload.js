var preload = function(game){
this.loadingBar = null ;

}

preload.prototype = {
	preload: function(){ 
          
          this.game.stage.backgroundColor = '#a8e8ff';
          this.loadingBar = this.add.sprite(this.game.world.centerX,this.game.world.centerY,"loading");
          this.loadingBar.anchor.setTo(0.5,0.5);
          this.load.setPreloadSprite(this.loadingBar);

         
            this.game.load.image("ground", "assets/ground1.png");
            this.game.load.image("bg", "assets/bg1.png");
            this.game.load.image("over", "assets/over.png");
            // game.load.spritesheet("name", "path/to/filename", width, height)  optional : frame count.
            this.game.load.spritesheet("player", "assets/warrior_m1.png", 100, 100);
            this.game.load.spritesheet("coin", "assets/coins.png", 40, 44, 4);
            this.game.load.spritesheet("cloud", "assets/cloud.png");  
            this.game.load.spritesheet("button", "assets/button.png");
            this.game.load.image("play", "assets/Playnow.png")
                        
            this.game.load.spritesheet('gamepad', 
            'assets/gamepad_spritesheet.png', 100, 100);

        
        
	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}