function Game ( gameSize ){
	var canvas 	= new Canvas( "game", gameSize, true ),
		score	= new Score( canvas ),
		food 	= new Food( gameSize, canvas ),
		snake 	= new Snake( gameSize, canvas ),
		stateMachine = new StateMachine( ),
		eventHandler = new EventHandler( snake, food, stateMachine, score ),
		speed 	= 150; 	
		
	function init(){		
		snake.paint( );
		loop();
	};
	
	function loop(){
		if( !stateMachine.checkState('finished') ){
			setTimeout(function(){
				if( !stateMachine.checkState('paused') ){
					score.paint();
					snake.updatePosition();
					eventHandler.checkCollision(),
					food.newStep( snake.getHead().getPosition() );
					eventHandler.checkFoodCollision();
					if( !stateMachine.checkState('finished') ) snake.render( );
				}
				loop();
			}, speed);
		}
	};
	
	init();
};