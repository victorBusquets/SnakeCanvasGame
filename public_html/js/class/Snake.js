function Snake( gameSize ){
	var nodes = new Array(),
		direction = 0;
	
	function prepareSnake(){
		nodes[0] = new Node( new Position( 0, 0 ), 0, assets.snakeTop );
		nodes[1] = new Node( new Position( 0, 1 ), 0, assets.snakeMid );		
		nodes[2] = new Node( new Position( 0, 2 ), 0, assets.snakeCor );
		nodes[3] = new Node( new Position( 1, 2 ), 3, assets.snakeMid );
		nodes[4] = new Node( new Position( 2, 2 ), 3, assets.snakeCor );
		nodes[5] = new Node( new Position( 2, 1 ), 2, assets.snakeMid );
		nodes[6] = new Node( new Position( 2, 0 ), 2, assets.snakeCor );
		nodes[7] = new Node( new Position( 1, 0 ), 1, assets.snakeCor );
		nodes[8] = new Node( new Position( 1, 1 ), 0, assets.snakeBot );
	};
	
	function paint( canvas ){
		for( var i=0; i<nodes.length; i++ ){
			nodes[i].paint(canvas);
		}
	};
	
	function clear( canvas ){
		for( var i=0; i<nodes.length; i++ ){
			nodes[i].clear(canvas);
		}
	};
	
	function getUpdateDirectionValues(){
		var values;
		
		switch(direction) {
			case 0:
				values = { x: 0, y: -1 };
				break;
			case 1:
				values = { x: 1, y: 0 };
				break;
			case 2:
				values = { x: 0, y: 1 };
				break;
			default:
				values = { x: -1, y: 0 };
		}
		
		return values;
	};
	
	function setDirection( newDirection ){
		direction = Math.abs( newDirection - direction )==2 ? direction : newDirection ;
	}
	
	function newLimitPosition(position){
		var x = position.getX(),
			y = position.getY();
			
		position.setX( x<0 ? gameSize.x-1 : ( x>gameSize.x ? 0 : x ) );
		position.setY( y<0 ? gameSize.y-1 : ( y>gameSize.y ? 0 : y ) );
		
		return position;
	};
	
	function outOfCanvas(position){
		return position.getX()<0 || position.getY()<0 || position.getX()>gameSize.x-1 || position.getX()>gameSize.y-1;
	};
	
	function createNewNode(){
		var nodeToClone  = nodes[0],
			updateValues = getUpdateDirectionValues();
			position 	 = new Position( nodeToClone.getPosition().getX() + updateValues.x, nodeToClone.getPosition().getY() + updateValues.y );
		
		position = ( outOfCanvas( position ) ? newLimitPosition(position) : position );
		
		return new Node( position, direction, assets.snakeTop );
	};
	
	function updateStartNode( newNode ){
		var firstNode = nodes[0],
			newOrientation = newNode.getOrientation(),
			lastOrientation = nodes[1].getOrientation(),
			changeOrientation = ( firstNode.getOrientation() !== newOrientation ),
			newImage = ( changeOrientation ? assets.snakeCor : assets.snakeMid );
			
		if( changeOrientation ) firstNode.setOrientation( getCornerOrientation(newOrientation, lastOrientation) );
		firstNode.setImg( newImage );
	};
	
	function getCornerOrientation(newOrientation, lastOrientation){
		var orientation = 0;

		if( clockWiseRotation( newOrientation, lastOrientation ) ){
			orientation = lastOrientation + 1 ;
		}else{
			orientation = newOrientation - 1;
		}
		
		return orientation;
	};
	
	function clockWiseRotation( newOrientation, lastOrientation ){
		return ( (newOrientation > lastOrientation) || (lastOrientation==3 && newOrientation==0) )&& !(lastOrientation==0 && newOrientation==3);
	};
	
	function updateEndNode(){
		nodes[nodes.length-1].setImg( assets.snakeBot );
		if( endIsNotCorner() )nodes[nodes.length-1].setOrientation( nodes[nodes.length-2].getOrientation( ) );
	};
	
	function endIsNotCorner(){
		return nodes[nodes.length-2].getImg() !== assets.snakeCor;
	};
	
	function update(){
		var node = createNewNode();
	
		nodes.pop();	//REMOVING LAST NODE	
		updateStartNode(node);
		updateEndNode();
		nodes.unshift( node ); //ADDING NEW NODE
	};
	
	function loop(canvas){
		clear( canvas );
		update();
		paint( canvas );
	};
	
	function init(){
		prepareSnake();
	};
	
	init();

	return {
		setDirection: setDirection,
		paint: paint,
		loop: loop,
		clear: clear
	}
};