function Score( canvas ){
	var value = 0;
		
	function addScore( increment ){
		value += increment;
		clear();
	};
	
	function clear(){
		canvas.clearCanvas();
	};
	
	function paint(){
		canvas.setAlpha(0.4);
		canvas.fillText( value, canvas.getCenterX(), canvas.getCenterY() );
		canvas.restoreAlpha();
	};
	
	return {
		addScore: addScore,
		paint: paint
	};
};