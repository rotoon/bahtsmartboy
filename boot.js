var boot = function(game){
	console.log("%cStarting my awesome game", "color:white; background:red");
};
  
boot.prototype = {
	preload: function(){
          this.load.image('loading','assets/preloader-bar.png'); 
	},
  	create: function(){
		//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//this.scale.pageAlignHorizontally = true;
        //this.scale.pageAlignVertically = true;
		//this.scale.setScreenSize(true);
        
        // Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1		
        this.game.input.maxPointers = 1;		
        // Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:		
        this.game.stage.disableVisibilityChange = true;		
        if (this.game.device.desktop)		{
            // If you have any desktop specific settings, they can go in here	
            //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //this.scale.pageAlignHorizontally = true;
        }		
        else		
        {			
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.minWidth = 568;
            this.game.scale.minHeight = 600;
            this.game.scale.maxWidth = 2048;
            this.game.scale.maxHeight = 1536;
            this.game.scale.forceLandscape = true;
            this.game.scale.pageAlignHorizontally = true;
            //this.game.scale.setScreenSize(true);
        }
        
        
		this.game.state.start("Preload");
	}
}