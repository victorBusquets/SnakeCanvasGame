function Game ( gameSize ){
	var canvas 	= new Canvas( "game", gameSize, true ),
		food 	= new Food( gameSize, canvas ),
		snake 	= new Snake( gameSize ),
		eventHandler = new EventHandler( snake, food ),
		speed 	= 150; 	

	function init(){		
		snake.paint( canvas );
		loop();
	};
	
	function loop(){
		setTimeout(function(){
			snake.loop( canvas );
			food.newStep( snake.getHead().getPosition() );
			eventHandler.checkCollision(),
			loop();
		}, speed);
	};
	
	init();
};