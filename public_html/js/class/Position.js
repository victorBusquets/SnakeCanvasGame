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
	
	return {
		getX: getX,
		setX: setX,
		getY: getY,
		setY: setY,
		get: get,
		set: set
	};
};