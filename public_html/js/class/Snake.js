function Snake(){
	var nodes = new Array();
	
	function prepareSnake(){
		nodes[0] = new Node(new Position( 0, 1 ), 0, "img aqui!!!");
		nodes[1] = new Node(new Position( 1, 1 ), 0, "img aqui!!!");
		nodes[2] = new Node(new Position( 2, 1 ), 0, "img aqui!!!");
		nodes[3] = new Node(new Position( 3, 1 ), 0, "img aqui!!!");		
	};
	
	function init(){
		prepareSnake();
	};
	
	init();
};