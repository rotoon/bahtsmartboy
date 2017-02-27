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
            
            this.game.scale.minWidth = 480;
            this.game.scale.minHeight = 260;
            this.game.scale.maxWidth = 1024;
            this.game.scale.maxHeight = 768;
            this.game.scale.forceLandscape = true;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            //this.game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            //this.game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);

        }
  
        
		this.game.state.start("Preload");
	},
    
    enterIncorrectOrientation: function () {

            BasicGame.orientated = false;

            document.getElementById('orientation').style.display = 'block';

        },

        leaveIncorrectOrientation: function () {

            BasicGame.orientated = true;

            document.getElementById('orientation').style.display = 'none';

    },
}