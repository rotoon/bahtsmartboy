var gameOver = function(game){}

gameOver.prototype = {
    init: function(score){
		
        scoreText = this.game.add.text(this.game.world.centerX,this.game.world.centerY -200, "Your Score : " + score, {
        fontSize: '30px',
        fill: '#ffffff'
        });
        scoreText.anchor.setTo(0.5, 0);
	},
    
    create: function(score){
     
        over = this.game.add.image(this.game.world.centerX, this.game.world.centerY -150, 'over')
        over.scale.setTo(0.65);
        over.anchor.setTo(0.5, 0);
        
        button = this.game.add.button(this.game.world.centerX - 80, this.game.world.centerY +130, 'button', this.restart, this);
        button.scale.setTo(0.5, 0.5);
        button.anchor.setTo(0.5, 0);
        
        share = this.game.add.button(this.game.world.centerX + 100, this.game.world.centerY +130, 'share', this.shareScore, this)
        
        share.scale.setTo(0.5, 0.5);
        share.anchor.setTo(0.5, 0);
        
        
    },
    
    restart: function(){

    this.game.state.start('main');

    },
    
    shareScore: function(score) {
        FB.ui({ method: 'feed',
        link: 'http://rotoon.esy.es/',
        picture: 'https://sdl-stickershop.line.naver.jp/stickershop/v1/product/1119129/LINEStorePC/main@2x.png',
        name: 'My best score on BahtSmart Boy : Collect Coins is " + n + "!!!!"',
        description: 'I scored ' + score +  'points on BahtSmart Boy : Collect Coins. Can you beat my score?',
        actions: [
            { name: 'Name of my site', link: 'http://rotoon.esy.es/' }
        ],
        display: 'popup'
        }, function(response){});
    }
 
}