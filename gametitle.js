var gameTitle = function(game){}

gameTitle.prototype = {
  	create: function(){
//		var gameTitle = this.game.add.sprite(160,160,"gametitle");
//		gameTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(this.game.world.centerX ,this.game.world.centerY, "play", this.playTheGame, this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
        if (!this.game.device.desktop)		{
            
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.game.scale.startFullScreen(false);

        }		
        
		this.game.state.start("main");
        
	}
}
