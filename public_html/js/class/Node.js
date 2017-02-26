function Node(position, orientation, img){
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
	function getImg(){
		return img;
	};
	function setImg(newImg){
		img = newImg;
	};	
	function paint(){
		//canvas function
	};
	
	return {
		getOrientation: getOrientation,
		setOrientation: setOrientation,
		getPosition: getPosition,
		setPosition: setPosition,
		getImg: getImg,
		setImg: setImg,
		paint: paint
	};
};