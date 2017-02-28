function EventHandler( snake ){
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
	
	function init(){
		keyboardHandler();
	};
	
	init();
	
	return {}
};