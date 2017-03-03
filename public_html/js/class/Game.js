function Game ( gameSize ){
	var canvas 	= new Canvas( "game", gameSize, true ),
		snake 	= new Snake( gameSize ),
		food 	= new Food( gameSize, canvas ),
		eventHandler = new EventHandler( snake ),
		speed 	= 300; 	

	function init(){		
		snake.paint( canvas );
		loop();
	};
	
	function loop(){
		setTimeout(function(){
			snake.loop( canvas );
			food.newStep( snake.getHead().getPosition() );
			loop();
		}, speed);
	};
	
	init();
};