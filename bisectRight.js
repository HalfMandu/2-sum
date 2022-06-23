
//Returns the position a new number would have if inserted (keeping the array sorted)
const bisectRight = (list, num) => {

	//empty array
	if (!list.length){ 
		return 0;
	}
	
	//only one item...just need to compare it to the new item
	if (list.length == 1){
		return num > list[0] ? 1 : 0;
	}
	
	//set the boundary markers, working inwards from front and back
	let leftBound = 0;
	let rightBound = list.length - 1;
	
	return bisectRight(leftBound, rightBound);  //enter recursion and return with final settled index position 

	//depends on closure over leftBound and rightBound to work correctly
	function bisectRight(left, right){
		
		//item is greater than current highest...position is at the beginning
		if (list[left] > num){
			return 0;
		}

		//item is lesser than current lowest...position is at the end
		if (list[right] < num){
			return list.length;
		}

		//right and left bounds are now neighbors
		if (right - left == 1){
			//new num belongs in between left and right
			if (list[left] <= num && list[right] > num){
				return left + 1;
			}
			//if its a dupe, new one goes at the last spot
			if (list[right] == num){
				return right+1;
			}
		}
		
		//identify new middle for next round of recursing
		let mid = left + (Math.floor((right - left) / 2));
		let midVal = list[mid];
		
		if (num >= midVal){
			leftBound = mid;
		}
		else if (num < midVal){
			rightBound = mid;
		} 
		
		return bisectRight(leftBound, rightBound);   //recurse with updated boundaries
	}
  
}

export { bisectRight };

/* console.log("bisectRight..." ); 
console.log("FINAL POSITION: " + bisectRight([1,2,4,5,6], 3)); 			// => 2
console.log("FINAL POSITION: " + bisectRight([0,1,1,1,1,2], 1)); 		// => 5
console.log("FINAL POSITION: " + bisectRight([0,1,1,1,1,2,3,4], 4)); 	// => 8
console.log("FINAL POSITION: " + bisectRight([0,1,2], 1)); 				// => 2
console.log("FINAL POSITION: " + bisectRight([0,1,2,2], 2)); 			// => 4  */















