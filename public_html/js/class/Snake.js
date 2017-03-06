function Snake( gameSize ){
	var nodes = new Array(),
		direction = 0;
	
	function prepareSnake(){
		nodes[0] = new Node( new Position( 0, 0 ), 0, 'snakeTop' );
		nodes[1] = new Node( new Position( 0, 1 ), 0, 'snakeMid' );		
		nodes[2] = new Node( new Position( 0, 2 ), 0, 'snakeCor' );
		nodes[3] = new Node( new Position( 1, 2 ), 3, 'snakeMid' );
		nodes[4] = new Node( new Position( 2, 2 ), 3, 'snakeBot' );
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
	
	function himselfCollision(){
		var headPosition = nodes[0].getPosition(),
			collision = false;
		
		for( var i=1; i<nodes.length && !collision; i++ ){
			collision = headPosition.equalPosition( nodes[i].getPosition() );
		}

		return collision ? i-1 : false;
	};
	
	function getHead(){
		return nodes[0];
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
	};
		
	function createNewNode(){
		var nodeToClone  = nodes[0],
			jumperNode = false,
			updateValues = getUpdateDirectionValues();
			position 	 = new Position( nodeToClone.getPosition().getX() + updateValues.x, nodeToClone.getPosition().getY() + updateValues.y );
		
			if( position.outOfCanvas( gameSize ) ){
				position.newPositionInLimits( gameSize );
				jumperNode = true;
			}
		
		return new Node( position, direction, 'snakeTop', jumperNode);
	};
	
	function updateStartNode( newNode ){
		var firstNode = nodes[0],
			secondNode = nodes[1],
			changeOrientation = ( firstNode.getOrientation() !== newNode.getOrientation() ),
			newImage = ( changeOrientation ? 'snakeCor' : 'snakeMid' );
			
		if( changeOrientation ){
			var cornerOrientation = getCornerOrientation(
				newNode.getPosition().get(),
				firstNode.getPosition().get(),
				secondNode.getPosition().get(),
				newNode.isJumperNode(),
				firstNode.isJumperNode()
			);
			firstNode.setOrientation( cornerOrientation );
		}
		firstNode.setImg( newImage );
	};
	
	function getCornerOrientation( position1, position2, position3, jumperNode1, jumperNode2 ){
		var orientation = 1,
			firstDirection = getDirectionBeetwenPosition( position1, position2, jumperNode1 ),
			secondDirection = getDirectionBeetwenPosition( position2, position3, jumperNode2 );
		
		switch( firstDirection+secondDirection ){
			case 'RD': // Right-Down
			case 'UL': // Up-Left
				orientation = 2;
			break;
			case 'RU': // Right-Up
			case 'DL': // Down-left
				orientation = 3;
			break;
			case 'DR': // Down-Right
			case 'LU': // Left-Up
				orientation = 0;
			break;
		}

		return orientation;
	};	
	
	function getDirectionBeetwenPosition( position1, position2, jumperNode){
		var direction,
			condition = position1.x < position2.x ,
			values = 'RL';
		
		if( position1.x === position2.x ){
			condition = position1.y < position2.y;
			values = 'DU';
		}
		
		condition = jumperNode ? !condition : condition;
		
		return ( condition ? values[0] : values[1] );
	};
	
	function updateEndNode(){
		nodes[nodes.length-1].setImg( 'snakeBot' );
		if( endIsNotCorner() )nodes[nodes.length-1].setOrientation( nodes[nodes.length-2].getOrientation( ) );
	};
	
	function endIsNotCorner(){
		return nodes[nodes.length-2].getImg() !== assets.snakeCor;
	};
	
	function update(){
		var node = createNewNode();
			lastNode = nodes[nodes.length-1];
			
		if( lastNode.isFeed() ){
			lastNode.clearFeed();
		}else{
			nodes.pop();	//REMOVING LAST NODE	
		}
		updateStartNode(node);
		updateEndNode();
		nodes.unshift( node ); //ADDING NEW NODE
		return true;
	};
	
	function setFeedNode(){
		getHead().setFeed();
	};
	
	function loop(canvas){
		clear( canvas );
		$.when( update() ).done(function(){
			paint( canvas );
		});
	};
	
	function init(){
		prepareSnake();
	};
	
	init();

	return {
		himselfCollision: himselfCollision,
		setDirection: setDirection,
		setFeedNode: setFeedNode,
		getHead: getHead,
		paint: paint,
		loop: loop,
		clear: clear
	}
};