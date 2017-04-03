var boot = function(game){
	console.log("%cStarting my awesome game", "color:white; background:red");
};
  
boot.prototype = {
    init: function() {
    // Stretch to fit screen
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.compatibility.forceMinimumDocumentHeight = true;
    this.game.scale.windowConstraints = {'right': 'layout', 'bottom': 'layout'};
    },
	preload: function(){
          this.load.image('loading','assets/preloader-bar.png'); 
	},
  	create: function(){
		//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//this.scale.pageAlignHorizontally = true;
        //this.scale.pageAlignVertically = true;
		//this.scale.setScreenSize(true);
        
        // Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1		
        this.game.input.maxPointers = 2;		
        // Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:		
        this.game.stage.disableVisibilityChange = true;		
        
		this.game.state.start("Preload");
	},
}