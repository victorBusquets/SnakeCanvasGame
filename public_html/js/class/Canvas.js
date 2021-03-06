function Canvas(domId, gameSize, fullSize){
	var canvas   = document.getElementById( domId ),
		context  = canvas.getContext("2d"),
		cellSize = 0;
		
	function setColor(color){
		context.fillStyle = color;
	};
	function clearCanvas(){
		context.clearRect(0, 0, canvas.width, canvas.height);
	};
	function clearRect(x, y, sizeX, sizeY){
		context.clearRect( getProportionalSize(x), getProportionalSize(y), sizeX, sizeY );
	};
	function fillRect(startX, startY, sizeX, sizeY, color){
		if(color) setColor(color);
		context.fillRect( startX, startY, sizeX, sizeY );
	};
	function getHeight(){
		return canvas.height;
	};
	function getWidth(){
		return canvas.width;
	};
	function setWidth(width){
		canvas.width = width;
	};
	function setHeight(height){
		canvas.height = height;
	};
	
	function setFullSize(){
		var height = $(window).height()-4,
			width = $(window).width(),
			heightFinal = ( width/2 > height ? height : width/2 ), 
			widthFinal = ( width/2 > height ? height*2 : width );
			
		setHeight( heightFinal );
		setWidth( widthFinal );
		centerCanvas( width-widthFinal, height-heightFinal );
	};
	
	function centerCanvas(widthDiff, heightDiff){
		$("#"+domId).css(
			{
				'position': 'absolute',
				'left': widthDiff/2, 
				'top': heightDiff/2
			}
		);
	};
	function drawImage( img, startX, startY, width, height ){
		context.drawImage( img, startX,	startY, width, height );
	};
	
	function drawRotatedImage( config ){
		var degrees = config.rotate * 90;
			rotateX = getProportionalSize(config.startX) + ( config.width/2 ),
			rotateY = getProportionalSize(config.startY) + ( config.height/2 );
						
		rotateContext(  rotateX, rotateY, degrees );		
		drawImage( config.img, -( config.width/2 ), -( config.height/2 ), config.width, config.height );
		restoreContext();
	};
		
	function translateContext(x, y ){
		context.save();
		context.translate( x, y );
	};
	
	function rotateContext( x, y, degrees ){
	    translateContext( x, y );
		context.rotate( degrees * Math.PI/180 );
	};
	
	function restoreContext(){
		context.restore();
	};	
	
	function getProportionalSize( size ){
		return size * cellSize;
	}
	
	function setCellSize(){
		cellSize = getWidth() / gameSize.x;
	};
	
	function getSellSize(){
		return cellSize;
	};
	
	function getCenterX(){
		return getWidth() / 2;
	};
	
	function getCenterY(){
		return getHeight() / 2;
	};
	
	function fillText( value, x, y, size, color, align){
		context.font = size || "25px Arial"; 
		context.fillStyle = color || "rgba(255, 255, 255, 0.75)";
		context.textAlign = align || "center"; 
		context.fillText( value, x, y ); 
	};
	
	function setAlpha( alpha ){
		context.save();
		context.globalAlpha = alpha;
	};
	
	function restoreAlpha(){	
		context.restore();
	};
	
	function init(){		
		if( fullSize ){ setFullSize() }
		
		setCellSize();
	};
	
	init();
		
		
	return {
		fillRect: fillRect,
		clearCanvas: clearCanvas,
		fillText: fillText,
		clearRect: clearRect,
		drawImage: drawImage,
		getSellSize: getSellSize,
		getCenterX: getCenterX,
		getCenterY: getCenterY,
		setAlpha: setAlpha,
		restoreAlpha: restoreAlpha,
		drawRotatedImage: drawRotatedImage
	}
};