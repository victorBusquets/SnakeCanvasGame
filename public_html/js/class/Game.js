function Game ( gameSize ){
	var canvas 	= new Canvas( "game", gameSize, true ),
		snake 	= new Snake( gameSize ),
		eventHandler = new EventHandler( snake ),
		speed 	= 300; 	

	function init(){		
		snake.paint( canvas );
		loop();
	};
	
	function loop(){
		setInterval(function(){
			snake.loop( canvas );
		}, speed);
	};
	
	init();
};