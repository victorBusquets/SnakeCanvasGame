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
		setTimeout(function(){
			snake.loop( canvas );
			loop();
		}, speed);
	};
	
	init();
};