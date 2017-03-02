function Node(position, orientation, img, jumperNode){
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
	function getImg(){
		return img;
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
	function clear( canvas ){
		var cellSize = canvas.getSellSize();
		
		canvas.clearRect( position.getX(), position.getY(), cellSize, cellSize );
	};
	
	function isJumperNode(){
		return jumperNode || false;
	};
	
	return {
		getOrientation: getOrientation,
		setOrientation: setOrientation,
		getPosition: getPosition,
		setPosition: setPosition,
		isJumperNode: isJumperNode,
		setImg: setImg,
		getImg: getImg,
		paint: paint,
		clear: clear
	};
};