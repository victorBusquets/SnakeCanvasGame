function Score( canvas ){
	var value = 0,
		centerX = canvas.getWidth() / 2,
		centerY = canvas.getHeight() / 2;
		
	function addScore( increment ){
		value += increment;
		clear();
	};
	
	function clear(){
		canvas.clearCanvas();
	};
	
	function paint(){
		canvas.setAlpha(0.4);
		canvas.fillText( value, centerX, centerY );
		canvas.restoreAlpha();
	};
	
	return {
		addScore: addScore,
		paint: paint
	};
};