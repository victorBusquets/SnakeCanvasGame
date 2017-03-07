function EventHandler( snake, food, stateMachine, score ){
	function keyboardHandler(){
		$("body").keydown( function(e){
			keyboardEvent( e.keyCode );
		});
	};
	function keyboardEvent( keyCode ){
		if( keyCode==32 ){
			stateMachine.setState( stateMachine.checkState('paused') ? 'ready' : 'paused' );
		}else if( keyCode>=37 && keyCode<=40 ){
			snake.setDirection( keyCode==37 ? 3 : keyCode-38 );
		}
	};
	function checkCollision(){
		var himselfCollision = snake.himselfCollision();
		
		if( himselfCollision ){
			stateMachine.setState('finished');
			console.log( himselfCollision );
		}

	};
	function checkFoodCollision(){
		if( foodCollision() ){
			score.addScore( food.getScore() );
			snake.setFeedNode();
			food.prepareFood();
			food.clear();
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
		checkCollision: checkCollision,
		checkFoodCollision: checkFoodCollision
	}
};