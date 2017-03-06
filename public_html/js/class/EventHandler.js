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
		if( snake.getHead().getPosition().equalPosition( food.getPosition() ) ){
			snake.setFeedNode();
			food.prepareFood();
			food.clear();
		}
	};
	function init(){
		keyboardHandler();
	};
	
	init();
	
	return {
		checkCollision: checkCollision
	}
};