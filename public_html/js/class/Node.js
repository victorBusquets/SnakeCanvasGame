function Node(position, orientation, img){
	function getOrientation(){
		return orientation;
	};
	function setOrientation(newOrientation){
		orientation = newOrientation;
	};
	function getPosition(){
		return position;
	};
	function setPosition(newPosition){
		position = newPosition;
	};
	function setImg(newImg){
		img = newImg;
	};	
	function paint( canvas ){
		var config = {
			'img':		img,
			'startX': 	position.getX(), 
			'startY': 	position.getY(), 
			'width': 	canvas.getSellSize(), 
			'height': 	canvas.getSellSize(), 
			'rotate': 	orientation 
		};
		
		canvas.drawRotatedImage( config );		
	};
	
	return {
		getOrientation: getOrientation,
		setOrientation: setOrientation,
		getPosition: getPosition,
		setPosition: setPosition,
		setImg: setImg,
		paint: paint
	};
};