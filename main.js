var mainState = function(game){}

var nextJump = 0;

mainState.prototype = {

  create: function () {

    var score = 0;
      
    //background
    back = this.game.add.image(0, -28, "bg");
    back.scale.set(1);
    back.smoothed = false;  
      
    //cloud
    var cloud1 = this.game.add.sprite(-900 , 0, 'cloud');
    tweenA = this.game.add.tween(cloud1).to( { x: 640 }, 200000, Phaser.Easing.Linear.InOut, true, 0, Number.MAX_VALUE, false).start(); 
    
      
    //Score
    this.score = 0;
    this.scoreText;

    // text(x, y, text, style);
    this.scoreText = this.game.add.text(this.game.world.centerX - 35, 16, 'Score : ' + this.score, {
      fontSize: '20px',
      fill: '#ed3465'
    });
      
    //Life  
    this.life = 5;
    this.lifescoreText;

        // text(x, y, text, style);
    this.lifescoreText = this.game.add.text(this.game.world.centerX + 240, 16, 'Life : ' + this.life, {
      fontSize: '20px',
      fill: '#ed3465'
    });
    

    this.game.stage.backgroundColor = '#a8e8ff';
    
    var phys = this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.myWorld = this.game.add.group();

    this.myWorld.enableBody = true;

    // Group.create(x, y, image);
    var ground = this.myWorld.create(0, this.game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    this.gamepad = this.game.plugins.add(Phaser.Plugin.VirtualGamepad);
        
    // Add a joystick to the game (only one is allowed right now)
    this.joystick = this.gamepad.addJoystick(90, 400, 1.0, 'gamepad');
        
    // Add a button to the game (only one is allowed right now)
    this.jumpButton = this.gamepad.addButton(550, 400, 1.0, 'gamepad');  
      
      
    this.player = this.game.add.sprite(0, 300, 'player');
    this.game.physics.arcade.enable(this.player);
    this.player.body.bounce.y = 0.25;
    this.player.body.gravity.y = 980;
    this.player.body.collideWorldBounds = true;
    this.player.width = 100;
    this.player.height = 100;
    // animations.add(name, frames, frame rate, loop);
    this.player.animations.add('right', [3, 4, 5], 10, true);
    this.player.animations.add('left', [9, 10, 11], 10, true);
    this.player.frame = 6;
    
    this.coins = this.game.add.group();
    this.coins.enableBody = true;
      
    
    // random spawn coins
    //game.time.events.loop(delay, callback, callbackContext, arguments)
    
    this.loopCoin(); 
     
    this.cursors = this.input.keyboard.createCursorKeys();
  },

  update: function () {
    
    //this.game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);
    //this.game.debug.text('Score: ' + this.score, 32, 32);  
    this.game.physics.arcade.collide(this.player, this.myWorld);
    //game.physics.arcade.collide(this.coins, this.myWorld);
    
        
    // // check if player overlap coin
    this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);
    // // check coin overlab floor  
    this.game.physics.arcade.overlap(this.myWorld, this.coins, this.decreaseLife, null, this);
    // reset player velocity
    this.player.body.velocity.x = 0;
    if (this.cursors.right.isDown || this.joystick.properties.right) {
      this.player.body.velocity.x = 400;
      this.player.animations.play('right');
    } else if (this.cursors.left.isDown || this.joystick.properties.left) {
      this.player.body.velocity.x = -400;
      this.player.animations.play('left');
    } else {
      this.player.animations.stop();
      this.player.frame = 6;
    }

    // // Allow player to jump if player touching the ground.
    if ((this.cursors.up.isDown || this.jumpButton.isDown ) && this.player.body.touching.down) {
      this.player.body.velocity.y = -500;
    }
      
     
           
  },
    

  spawnCoins: function() {
      
      for (var i = 0; i < 1; i++) {

          var x = this.rnd.integerInRange(0, this.game.world.width - 40);
          var y = this.rnd.integerInRange(0, this.game.world.height -500);

          this.coins.create(x, y, 'coin');
          this.coins.forEach(function(coin) {
            coin.animations.add('effect', [0, 1, 2, 3], 5, true);
            coin.animations.play('effect');
            //physics.arcade.enable(coin);
            coin.scale.setTo(0.75, 0.75);
            coin.body.gravity.y = 20;
            
          
          
            });

      }
    },

  collectCoin: function(player, coin) {
    coin.destroy();
    this.score += 10;
    this.scoreText.text = 'Score : ' + this.score;
      
    //this.loopCoin(this.score);
          
  },
    
  decreaseLife: function(myWorld , coin) {
      coin.destroy();
      if(this.life>0) {
          this.life -= 1;
          this.lifescoreText.text = 'Life : ' + this.life;
               
      }
      else {
          
            this.player.kill();
          
          this.game.state.start("GameOver",true,false,this.score);
  
      }
   },
    
  
  restart: function(){

    this.game.state.start('main');

    },
    
  goFullscreen: function() {

    if (this.game.scale.isFullScreen)
    {
        
        this.game.scale.stopFullScreen();
    }
    else
    {
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.startFullScreen(false);
    }    
    
   },
    
 loopCoin: function() {
        
        this.game.time.events.loop(800, this.spawnCoins, this); 
        
   },

 increseCoin: function() {
     
     
     
 },
    
    
};
