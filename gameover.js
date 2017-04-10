var gameOver = function(game){}

gameOver.prototype = {
    init: function(score){
		
        scoreText = this.game.add.text(this.game.world.centerX,this.game.world.centerY -140, "Your Score : " + score, {
        fontSize: '30px',
        fill: '#ed3465'
        });
        scoreText.anchor.setTo(0.5, 0);
	},
    
    create: function(score){
     
          over = this.game.add.image(this.game.world.centerX, this.game.world.centerY -95, 'over')
          over.scale.setTo(0.60,0.60);
            over.anchor.setTo(0.5, 0);
          button = this.game.add.button(this.game.world.centerX, this.game.world.centerY +95, 'button', this.restart, this);
          button.scale.setTo(0.80, 0.80);
          button.anchor.setTo(0.5, 0);
    },
    
    restart: function(){

    this.game.state.start('main');

    },
    
    shareScore: function(score) {
        FB.ui({ method: 'feed',
        link: 'http://rotoon.esy.es/',
        picture: 'https://www.feronato.com/facebook/risky-steps/assets/pictures/feedpic.png',
        name: 'My best score on BahtSmart Boy : Collect Coins is " + n + "!!!!"',
        description: 'I scored ' + score +  'points on BahtSmart Boy : Collect Coins. Can you beat my score?',
        actions: [
            { name: 'Name of my site', link: 'http://rotoon.esy.es/' }
        ],
        display: 'popup'
        }, function(response){});
    }
 
}