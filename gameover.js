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
    
    shareScore :function(n){
     FB.ui({
          method: "feed",
          link: "https://apps.facebook.com/risky-steps/",
          caption: "Play Risky Steps now!!",
          name: "My best score on Risky steps is " + n + "!!!!",
          description: "I scored " + n + " points on Risky Steps. Can you beat my score?",
          picture: "https://www.feronato.com/facebook/risky-steps/assets/pictures/feedpic.png"
     }, function(response){});
    }
      
}