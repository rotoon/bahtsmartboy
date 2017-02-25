var game=new Phaser.Game(	640, 480, Phaser.AUTO, '');
var BasicGame = {};
game.state.start('Boot');
BasicGame.Boot=function () {};
BasicGame.Boot.prototype = {	
    preload: function () 	{		 
        //Here we load the assets required for our preloader (in this case a background and a loading bar)		
        game.load.image('preloaderBackground', 'GameFiles/background1.png');		game.load.image('preloaderBar', 'GameFiles/loading2.png');	},	
    create: function () 	{		
        // Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1		
        game.input.maxPointers = 1;		
        // Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:		
        game.stage.disableVisibilityChange = true;		
        if (game.game.device.desktop)		{
            // If you have any desktop specific settings, they can go in here	
            this.scale.pageAlignHorizontally = true;
        }		
        else		
        {			
            // Same goes for mobile settings.
            // In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"			
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;			
            game.scale.minWidth = 480;			
            game.scale.minHeight = 260;			
            game.scale.maxWidth = 1024;			
            game.scale.maxHeight = 768;			
            game.scale.forceLandscape = true;			
            game.scale.pageAlignHorizontally = true;			
            game.scale.setScreenSize(true);		
        }		
        // By this point the preloader assets have loaded to the cache, we've set the game settings		
        // So now let's start the real preloader going		
        game.state.start('GameState');	}};
//then i got all my varsBasicGame.GameState=function(){}
BasicGame.GameState.prototype = {	
    preload: function(){	
        game.background = this.add.sprite(0, 0, 'preloaderBackground');	
        game.preloadBar = this.add.sprite(300, 400, 'preloaderBar');	game.load.setPreloadSprite(game.preloadBar);        //etc}//and so on with other functions
