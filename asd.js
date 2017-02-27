<doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="initial-scale=1 maximum-scale=1 user-scalable=0" />
        <title>virtual gamepad v.0.2</title>
        <style>
            body {
                margin: 0px 0px 1px 0px; /* the extra 1px allows the iOS inner/outer check to work */
                background-color:#333;
            }
        </style>
        <script src="phaser.min.js"></script>
    </head>
    <body>
    <script type="text/javascript">
        /*
            virtual gamecontroller with phaser.js
            buttons, sprite(sheet)s (animation) and code of this example by valueerror - mario by nintendo ;-)
        */

        //some global vars 
        var fireballs;
        var fireRate = 300;
        var nextFire = 0;
        var nextJump = 0;
        var player; 
        var left=false;
        var right=false;
        var duck= false;
        var fire=false;
        var jump=false;

        function preload(){
                //spritesheet for animations
                game.load.spritesheet('mario', 'assets/mariospritesheet-small.png',50,50); // key, sourcefile, framesize x, framesize y
                //background, ground, fireball images
                game.load.image('ground', 'assets/2048x48-ground.png');
                game.load.image('clouds', 'assets/512x512-tiling-sky.jpg');
                game.load.image('fireball', 'assets/fireball.png',40,30);
                //gamepad buttons
                game.load.spritesheet('buttonvertical', 'assets/buttons/button-vertical.png',32,64);
                game.load.spritesheet('buttonhorizontal', 'assets/buttons/button-horizontal.png',64,32);
                game.load.spritesheet('buttondiagonal', 'assets/buttons/button-diagonal.png',48,48);
                game.load.spritesheet('buttonfire', 'assets/buttons/button-round-a.png',64,64);
                game.load.spritesheet('buttonjump', 'assets/buttons/button-round-b.png',64,64);
                //autoalign the game stage
                game.scale.pageAlignHorizontally = true;
                game.scale.pageAlignVertically = true;
                game.scale.setScreenSize(true);
            }

        function create() { 
                game.world.setBounds(0, 0, 2000, 400);//(x, y, width, height)
                game.physics.setBoundsToWorld(true, true, false, true, false); //(left, right, top, bottom, setCollisionGroup)
                game.physics.gravity.y=600;  // default gravity in game world
                game.physics.friction =5;   // default friction between ground and player or fireballs

                clouds = game.add.tileSprite(0, 0, 2048, 400, 'clouds'); //add tiling sprite to cover the whole game world
                ground = game.add.sprite(game.world.width/2, game.world.height-24,'ground');
                ground.physicsEnabled = true;  //enable physics so our player will not fall through ground but collide with it
                ground.body.static=true;    // ground should not move

                fireballs = game.add.group();  // add a new group for fireballs
                fireballs.createMultiple(500, 'fireball', 0, false);  // create plenty of them hidden and out of the game world

                //setup our player
                player = game.add.sprite(350, game.world.height - 150, 'mario'); //create and position player
                player.physicsEnabled = true; 
                player.anchor.setTo(0.5, 0.5);
                player.body.setCircle(22);  // collision circle 
                player.body.fixedRotation=true; // do not rotate on collision
                player.body.mass = 4;

                // add some animations 
                player.animations.add('walk', [1,2,3,4], 10, true);  // (key, framesarray, fps,repeat)
                player.animations.add('duck', [11], 0, true);
                player.animations.add('duckwalk', [10,11,12], 3, true);
                game.camera.follow(player); //always center player

                // create our virtual game controller buttons 
                buttonjump = game.add.button(660, 340, 'buttonjump', null, this, 0, 1, 0, 1);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
                buttonjump.anchor.setTo(0.5, 0.5);
                buttonjump.fixedToCamera = true;  //our buttons should stay on the same place  
                buttonjump.events.onInputOver.add(function(){jump=true;});
                buttonjump.events.onInputOut.add(function(){jump=false;});
                buttonjump.events.onInputDown.add(function(){jump=true;});
                buttonjump.events.onInputUp.add(function(){jump=false;});

                buttonfire = game.add.button(750, 340, 'buttonfire', null, this, 0, 1, 0, 1);
                buttonfire.anchor.setTo(0.5, 0.5);
                buttonfire.fixedToCamera = true;
                buttonfire.events.onInputOver.add(function(){fire=true;});
                buttonfire.events.onInputOut.add(function(){fire=false;});
                buttonfire.events.onInputDown.add(function(){fire=true;});
                buttonfire.events.onInputUp.add(function(){fire=false;});        

                buttonleft = game.add.button(40, 312, 'buttonhorizontal', null, this, 0, 1, 0, 1);
                buttonleft.anchor.setTo(0.5, 0.5);
                buttonleft.fixedToCamera = true;
                buttonleft.events.onInputOver.add(function(){left=true;});
                buttonleft.events.onInputOut.add(function(){left=false;});
                buttonleft.events.onInputDown.add(function(){left=true;});
                buttonleft.events.onInputUp.add(function(){left=false;});

                buttonbottomleft = game.add.button(48, 352, 'buttondiagonal', null, this, 6, 4, 6, 4);
                buttonbottomleft.anchor.setTo(0.5, 0.5);
                buttonbottomleft.fixedToCamera = true;
                buttonbottomleft.events.onInputOver.add(function(){left=true;duck=true;});
                buttonbottomleft.events.onInputOut.add(function(){left=false;duck=false;});
                buttonbottomleft.events.onInputDown.add(function(){left=true;duck=true;});
                buttonbottomleft.events.onInputUp.add(function(){left=false;duck=false;});

                buttonright = game.add.button(136, 312, 'buttonhorizontal', null, this, 0, 1, 0, 1);
                buttonright.anchor.setTo(0.5, 0.5);
                buttonright.fixedToCamera = true;
                buttonright.events.onInputOver.add(function(){right=true;});
                buttonright.events.onInputOut.add(function(){right=false;});
                buttonright.events.onInputDown.add(function(){right=true;});
                buttonright.events.onInputUp.add(function(){right=false;});

                buttonbottomright = game.add.button(128, 352, 'buttondiagonal', null, this, 7, 5, 7, 5);
                buttonbottomright.anchor.setTo(0.5, 0.5);
                buttonbottomright.fixedToCamera = true;
                buttonbottomright.events.onInputOver.add(function(){right=true;duck=true;});
                buttonbottomright.events.onInputOut.add(function(){right=false;duck=false;});
                buttonbottomright.events.onInputDown.add(function(){right=true;duck=true;});
                buttonbottomright.events.onInputUp.add(function(){right=false;duck=false;});

                buttondown = game.add.button(88, 360, 'buttonvertical', null, this, 0, 1, 0, 1);
                buttondown.anchor.setTo(0.5, 0.5);
                buttondown.fixedToCamera = true;
                buttondown.events.onInputOver.add(function(){duck=true;});
                buttondown.events.onInputOut.add(function(){duck=false;});
                buttondown.events.onInputDown.add(function(){duck=true;});
                buttondown.events.onInputUp.add(function(){duck=false;});
            }


        function update() {
            clouds.x= game.camera.x*0.8-100; //parallax - this moves the clouds just a little bit slower than the camera - 100 to account for the additional pixels because of scrolling

            // define what should happen when a button is pressed
            if (left && !duck) {
                player.scale.x = -1;
                player.body.moveLeft(500);
                player.animations.play('walk');
            }
            else if (right && !duck) {
                player.scale.x = 1;
                player.body.moveRight(500);
                player.animations.play('walk');
            } 
            else if (duck && !left && !right) {
                player.body.velocity.x=0;
                player.animations.play('duck');
            } 
            else if (duck && right) {
                player.scale.x = 1;
                player.body.moveRight(100);
                player.animations.play('duckwalk');
            }
            else if (duck && left) {
                player.scale.x = -1;
                player.body.moveLeft(100);
                player.animations.play('duckwalk');
            }
            else {
                player.loadTexture('mario', 0);
            }
            if (jump){ jump_now(); player.loadTexture('mario', 5);}  //change to another frame of the spritesheet
            if (fire){fire_now(); player.loadTexture('mario', 8); }
            if (duck){ player.body.setCircle(16,0,6);}else{ player.body.setCircle(22);}  //when ducking create a smaller hitarea - (radius,offsetx,offsety)
            if (game.input.currentPointers == 0 && !game.input.activePointer.isMouse){ fire=false; right=false; left=false; duck=false; jump=false;} //this works around a "bug" where a button gets stuck in pressed state
        }


        function render(){
            game.debug.renderText('jump:' + jump + ' duck:' + duck + ' left:' + left + ' right:' + right + ' fire:' + fire, 20, 20);
            game.debug.renderPhysicsBody(player.body);
        }

        var game = new Phaser.Game(800, 400, Phaser.CANVAS, '', { preload:preload, create: create, update:update, render:render });


        //some useful functions
        function jump_now(){  //jump with small delay
            if (game.time.now > nextJump ){
                player.body.moveUp(300);
                nextJump = game.time.now + 800;
            }
        }
        function fire_now() {
            if (game.time.now > nextFire){
                nextFire = game.time.now + fireRate;
                var fireball = fireballs.getFirstExists(false); // get the first created fireball that no exists atm
                if (fireball){
                    fireball.exists = true;  // come to existance !
                    fireball.lifespan=2500;  // remove the fireball after 2500 milliseconds - back to non-existance
                    if(player.scale.x == -1){  // if player looks to the left - create the fireball on his left side
                        fireball.reset(player.x-20, player.y);
                        fireball.physicsEnabled = true;
                        fireball.body.moveLeft(800);
                        fireball.body.moveDown(180);
                    }else{
                        fireball.reset(player.x+20, player.y);
                        fireball.physicsEnabled = true;
                        fireball.body.moveRight(800);
                        fireball.body.moveDown(180);
                    }
                    fireball.body.setCircle(10);
                }
            }
        }
        </script>
    </body>
</html>
















