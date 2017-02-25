var mainState = {
  preload: function () {
    // game.load.image('name', 'path/to/filename');
    game.load.image('devahoy', 'assets/logo.png');
    game.load.image('ground', 'assets/ground.png');
    game.load.image('bg', 'assets/bg.png');
    game.load.image('over', 'assets/over.png');
    // game.load.spritesheet('name', 'path/to/filename', width, height)  optional : frame count.
    game.load.spritesheet('player', 'assets/warrior_m1.png', 100, 100);
    game.load.spritesheet('coin', 'assets/coins.png', 40, 44, 4);
    game.load.spritesheet('cloud', 'assets/cloud.png');  
    game.load.spritesheet('button', 'assets/button.png');
    
  },

  create: function () {
    //background
    back = game.add.image(0, -28, 'bg');
    back.scale.set(1);
    back.smoothed = false;  
      
    //cloud
    var cloud1 = game.add.sprite(-900 , 0, 'cloud');
    tweenA = game.add.tween(cloud1).to( { x: 640 }, 200000, Phaser.Easing.Linear.InOut, true, 0, Number.MAX_VALUE, false).start(); 
    
    
    
      
    //Score
    this.score = 0;
    this.scoreText;

        // text(x, y, text, style);
    this.scoreText = game.add.text(16, 16, 'Score : ' + this.score, {
      fontSize: '20px',
      fill: '#ed3465'
    });
      
    //Life  
    this.life = 5;
    this.lifescoreText;

        // text(x, y, text, style);
    this.lifescoreText = game.add.text(350, 16, 'Life : ' + this.life, {
      fontSize: '20px',
      fill: '#ed3465'
    });
    

    game.stage.backgroundColor = '#a8e8ff';
    //game.add.sprite(0, 0, 'devahoy').anchor.setTo(0.5, 0.5);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.myWorld = game.add.group();

    this.myWorld.enableBody = true;

    // Group.create(x, y, image);
    var ground = this.myWorld.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    
    this.player = game.add.sprite(0, 300, 'player');
    game.physics.arcade.enable(this.player);
    this.player.body.bounce.y = 0.25;
    this.player.body.gravity.y = 980;
    this.player.body.collideWorldBounds = true;
    this.player.width = 100;
    this.player.height = 100;
    // animations.add(name, frames, frame rate, loop);
    this.player.animations.add('right', [3, 4, 5], 10, true);
    this.player.animations.add('left', [9, 10, 11], 10, true);
    this.player.frame = 6;
    
    this.coins = game.add.group();
    this.coins.enableBody = true;
    
    
      
      
    // random spawn coins
    //game.time.events.loop(delay, callback, callbackContext, arguments)
    var myloop = game.time.events.loop(550, this.spawnCoins, this); 
    this.myloop 
     
    var x = 1;          
    
    this.cursors = this.input.keyboard.createCursorKeys();
  },

  update: function () {

    game.physics.arcade.collide(this.player, this.myWorld);
    //game.physics.arcade.collide(this.coins, this.myWorld);
    
        
    // // check if player overlap coin
    game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);
    // // check coin overlab floor  
    game.physics.arcade.overlap(this.myWorld, this.coins, this.decreaseLife, null, this);
    // reset player velocity
    this.player.body.velocity.x = 0;
    if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 400;
      this.player.animations.play('right');
    } else if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -400;
      this.player.animations.play('left');
    } else {
      this.player.animations.stop();
      this.player.frame = 6;
    }

    // // Allow player to jump if player touching the ground.
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.body.velocity.y = -500;
    }
      
      
  },
    

  spawnCoins: function() {
    
      for (var i = 0; i < 1; i++) {

          var x = this.rnd.integerInRange(0, game.world.width - 40);
          var y = this.rnd.integerInRange(0, game.world.height -500);

          this.coins.create(x, y, 'coin');
          this.coins.forEach(function(coin) {
            coin.animations.add('effect', [0, 1, 2, 3], 5, true);
            coin.animations.play('effect');
            game.physics.arcade.enable(coin);
            coin.scale.setTo(0.75, 0.75);
            coin.body.gravity.y = 20;
            
          
          
            });

      }
    },

  collectCoin: function(player, coin) {
    coin.destroy();
    this.score += 10;
    this.scoreText.text = 'Score : ' + this.score;
  },
    
  decreaseLife: function(myWorld , coin) {
      coin.destroy();
      if(this.life>0) {
          this.life -= 1;
          this.lifescoreText.text = 'Life : ' + this.life;
               
      }
      else {
          //this.game.time.events.remove(this.myloop); 
          this.player.kill();
         
          back = game.add.image(150, 30, 'over')
          button = game.add.button(game.world.centerX, game.world.centerY +95, 'button', this.restart, this);
          button.scale.setTo(0.80, 0.80)
          button.anchor.setTo(0.5, 0);
         
          
      }
   },
    
  
  restart: function(){

    game.state.start('main');

    },
    
      
   
};

// Phaser.Game(width, height, renderer, HTML Element);
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game');

game.state.add('main', mainState);
game.state.start('main');

