function Game ( gameSize ){
	var canvas 	= new Canvas( "game", gameSize, true ),
		food 	= new Food( gameSize, canvas ),
		snake 	= new Snake( gameSize, canvas ),
		eventHandler = new EventHandler( snake, food ),
		speed 	= 150; 	

	function init(){		
		snake.paint( );
		loop();
	};
	
	function loop(){
		setTimeout(function(){
			snake.updatePosition();
			eventHandler.checkCollision(),
			food.newStep( snake.getHead().getPosition() );
			snake.render( );
			loop();
		}, speed);
	};
	
	init();
};