function Food( gameSize, canvas ){
	const SPECIAL_FOOD_PROBABILITY = 10;
	const TYPES = [
		{
			score: 100,
			stepLimit: 3,
			img: assets.foodType0
		},
		{
			score: 500,
			stepLimit: 2,
			img: assets.foodType1
		}
	];
	var position, type, stepCounter, direction;
	
	function prepareFood(){
		position = new Position(
			utils.generateRandomInteger( 0, gameSize.x ),
			utils.generateRandomInteger( 0, gameSize.y )
		);
		setType( TYPES[getTypeIndex() ? 1 : 0] );
		initStepCounter();
		paint();
	};
	function getTypeIndex(){
		return utils.generateRandomInteger( 0, SPECIAL_FOOD_PROBABILITY ) > 1;
	};
	function initStepCounter(){
		stepCounter = 0;
	};
	function setType(newType){
		type = newType;
	};
	function getScore(){
		return type.score;
	};
	function getImg(){
		return type.img;
	};
	function getStepLimit(){
		return type.stepLimit;
	};
	function setDirection( newDirection ){
		direction = newDirection;
	};
	function getDirection(){
		return direction;
	};
	function getPosition(){
		return position;
	};
	function newStep( snakeHeadPosition ){
		if( getStepLimit() > stepCounter ){
			stepCounter++;
		}else{
			initStepCounter();
			clear();
			updatePosition( snakeHeadPosition );
		}
	};
	function paint(){
		var config = {
			'img':		getImg(),
			'startX': 	position.getX(), 
			'startY': 	position.getY(), 
			'width': 	canvas.getSellSize(), 
			'height': 	canvas.getSellSize(), 
			'rotate': 	direction 
		};
		
		canvas.drawRotatedImage( config );	
	};
	function clear(){
		var cellSize = canvas.getSellSize();
		
		canvas.clearRect( position.getX(), position.getY(), cellSize, cellSize );
	};
	function updatePosition( snakeHeadPosition ){
		var diff = {
				X: position.getX() - snakeHeadPosition.getX(),
				Y: position.getY() - snakeHeadPosition.getY()
			},
			coordinate = "X",
			coordinateValue,
			increment = 1,
			direction;
			
		if( Math.abs( diff.X ) > Math.abs( diff.Y ) ){
			coordinate = "Y";
			increment = 0;
		}
		
		coordinateValue = position['get' + coordinate]();
		direction = ( diff[coordinate] < 0 ? increment+2 : increment );
		position['set' + coordinate]( diff[coordinate] > 0 ?  coordinateValue+1 : coordinateValue-1 );
		
		setDirection( direction );
		paint();
	};
	function init(){
		prepareFood();
	};
	
	init();
	
	return {
		prepareFood: prepareFood,
		getPosition: getPosition,
		newStep: newStep
	}
};