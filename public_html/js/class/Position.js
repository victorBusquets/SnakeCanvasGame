function Position( x, y ){
	function getX(){
		return x;
	};
	function setX( newX ){
		x = newX;
	};
	function getY(){
		return y;
	};
	function setY( newY ){
		y = newY;
	};
	function get(){
		return {
			x: getX(),
			y: getY()
		};
	};
	function set(newX, newY){
		setX(newX);
		setY(newY);
	};
	function equalPosition(position){
		return getX() == position.getX() && getY() == position.getY();
	};
	function newPositionInLimits(gameSize){
		var x = getX(),
			y = getY();
			
		setX( x<0 ? gameSize.x-1 : ( x>gameSize.x-1 ? 0 : x ) );
		setY( y<0 ? gameSize.y-1 : ( y>gameSize.y-1 ? 0 : y ) );
	};
	function outOfCanvas(gameSize){
		return getX()<0 || getY()<0 || getX()>gameSize.x-1 || getY()>gameSize.y-1;
	};
	
	return {
		newPositionInLimits: newPositionInLimits,
		equalPosition: equalPosition,
		outOfCanvas: outOfCanvas,
		getX: getX,
		setX: setX,
		getY: getY,
		setY: setY,
		get: get,
		set: set
	};
};