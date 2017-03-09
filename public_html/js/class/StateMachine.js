function StateMachine( canvas ){
	var states = {
		'finished': 0,
		'paused': 1,
		'ready': 2
	},
	state = 2;
	
	function checkState( stateToCheck ){
		return states[stateToCheck] === state;
	};
	function setState( newState ){
		canvas.clearCanvas();
		
		if( validState( newState ) ){
			state = states[newState];
		}
		if( state !== 2){
			canvas.fillText( newState, canvas.getCenterX(), canvas.getCenterY() );
		}
	};
	function validState( stateToCheck ){
		return states[stateToCheck] !== undefined;
	};
	
	return{
		checkState: checkState,
		validState: validState,
		setState: setState
	}
};