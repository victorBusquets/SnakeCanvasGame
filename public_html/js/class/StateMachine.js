function StateMachine(){
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
		if( validState( newState ) ){
			state = states[newState];
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