function EventHandler( snake, food ){
	function keyboardHandler(){
		$("body").keydown( function(e){
			keyboardEvent( e.keyCode );
		});
	};
	function keyboardEvent( keyCode ){
		if( keyCode==32 ){
			//	PAUSE
		}else if( keyCode>=37 && keyCode<=40 ){
			snake.setDirection( keyCode==37 ? 3 : keyCode-38 );
		}
	};
	function checkCollision(){
		var himselfCollision = snake.himselfCollision();
		
		if( foodCollision() ){
			snake.setFeedNode();
			food.prepareFood();
			food.clear();
		}
		
		if( himselfCollision ){
			console.log( himselfCollision );
		}

	};
	function foodCollision(){
		return snake.getHead().getPosition().equalPosition( food.getPosition() );
	};
	function init(){
		keyboardHandler();
	};
	
	init();
	
	return {
		checkCollision: checkCollision
	}
};