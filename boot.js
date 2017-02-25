var boot = function(game){
	console.log("%cStarting my awesome game", "color:white; background:red");
};
  
boot.prototype = {
	preload: function(){
          this.game.load.image("loading","assets/loading.png"); 
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
            // Same goes for mobile settings.
            // In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"			
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;			
            this.scale.minWidth = 480;			
            this.scale.minHeight = 260;			
            this.scale.maxWidth = 1024;			
            this.scale.maxHeight = 768;			
            this.scale.forceLandscape = true;			
            this.scale.pageAlignHorizontally = true;			
            this.scale.setScreenSize(true);		
        }
        
        
		this.game.state.start("Preload");
	}
}