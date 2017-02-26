function Snake(){
	var nodes = new Array();
	
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
	
	function init(){
		prepareSnake();
	};
	
	init();

	return {
		paint: paint
	}
};