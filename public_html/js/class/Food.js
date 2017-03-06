function Food( gameSize, canvas ){
	const SPECIAL_FOOD_PROBABILITY = 10;
	const TYPES = [
		{
			score: 100,
			stepLimit: 5,
			img: assets.foodType0
		},
		{
			score: 500,
			stepLimit: 3,
			maxSteps: 35,
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
		return utils.generateRandomInteger( 0, SPECIAL_FOOD_PROBABILITY ) <= 1;
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
	function getMaxSteps(){
		return type.maxSteps;
	};
	function newStep( snakeHeadPosition ){
		stepCounter++;

		if( stepCounter % getStepLimit() == 0){
			clear();
			updatePosition( snakeHeadPosition );
		}
		if(getMaxSteps() == stepCounter){
			clear();
			prepareFood();
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
	function getDifference( snakeHeadPosition ){
		var diff = {
			X: position.getX() - snakeHeadPosition.getX(),
			Y: position.getY() - snakeHeadPosition.getY()
		};
		
		diff.X = Math.abs( diff.X ) > gameSize.x/2 ? reverseValue( diff.X, gameSize.x/2 ) : diff.X ;
		diff.Y = Math.abs( diff.Y ) > gameSize.y/2 ? reverseValue( diff.X, gameSize.x/2 ) : diff.Y ;
		
		return diff;
	};
	function reverseValue( value, compareValue ){
		return (value > 0 ? compareValue - value : compareValue + value);
	};
	function updatePosition( snakeHeadPosition ){
		var diff = getDifference( snakeHeadPosition ),
			coordinate = "X",
			coordinateValue,
			increment = 1,
			direction;
		
		if( Math.abs( diff.X ) > Math.abs( diff.Y ) ){
			coordinate = "Y";
			increment = 0;
		}
		
		coordinateValue = position['get' + coordinate]();
		direction = ( (coordinate ==="X" ? !diff[coordinate] > 0 : diff[coordinate] > 0 ) ? increment+2 : increment );
		position['set' + coordinate]( diff[coordinate] > 0 ?  coordinateValue+1 : coordinateValue-1 );
		
		if( position.outOfCanvas( gameSize ) ){
			position.newPositionInLimits( gameSize );
			jumperNode = true;
		}
		
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
		newStep: newStep,
		clear: clear
	}
};