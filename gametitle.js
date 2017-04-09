var gameTitle = function(game){}

gameTitle.prototype = {
  	create: function(){
//		var gameTitle = this.game.add.sprite(160,160,"gametitle");
//		gameTitle.anchor.setTo(0.5,0.5);
        var gameInstraction = this.game.add.image(this.game.world.centerX, this.game.world.centerY, "instruction");
        gameInstraction.scale.set(0.70);
        gameInstraction.anchor.setTo(0.5,0.5);
        
		var playButton = this.game.add.button(this.game.world.centerX ,this.game.world.centerY +198, "play", this.playTheGame, this);
        playButton.scale.set(0.25);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){

		this.game.state.start("main");
        
	}
}
