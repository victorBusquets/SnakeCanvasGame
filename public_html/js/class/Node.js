function Node(position, orientation, img, jumperNode){
	var feed;
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
	function setFeed(){
		feed = true;
	};
	function clearFeed(){
		feed = false;
	};
	function isFeed(){
		return feed;
	};
	function setImg(newImg){
		img = assets[newImg + ( isFeed() ? 'Feed' : '' )];
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
	
	function init(){
		setImg( img );
	};
	
	init();
	
	return {
		getOrientation: getOrientation,
		setOrientation: setOrientation,
		isJumperNode: isJumperNode,
		getPosition: getPosition,
		setPosition: setPosition,
		clearFeed: clearFeed,
		setFeed: setFeed,
		isFeed: isFeed,
		setImg: setImg,
		getImg: getImg,
		paint: paint,
		clear: clear
	};
};