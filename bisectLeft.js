
//Returns the position a new number would have if inserted (keeping the array sorted)
const bisectLeft = (list, num) => {
	
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
	
	return bisectLeft(leftBound, rightBound);  //enter recursion and return with final settled index position 

	//depends on closure over leftBound and rightBound to work correctly
	function bisectLeft(left, right){
		
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
			if (list[left] < num && list[right] >= num){
				return left + 1;
			}
			//if its a dupe, new one goes in front
			if (list[left] == num){
				return left;
			}
		}
		
		//spot not found yet, identify new middle for next round of recursing
		let mid = left + (Math.floor((right - left) / 2));
		let midVal = list[mid];

		//check which side to dig down on
		if (num <= midVal){
			rightBound = mid;
		} else if (num > midVal){
			leftBound = mid;
		}
		
		return bisectLeft(leftBound, rightBound);   //recurse with updated boundaries
	}
  
}

export { bisectLeft };

//////////////////////////////////////////////////////////////////////////////////////////////////
//Driver

/* 
console.log("bisectLeft..." );
console.log(bisectLeft([1,2,4,5,6], 3));   // => 2
console.log(bisectLeft([0,1,1,1,1,2], 1)); // => 1 
console.log(bisectLeft([1,2,4,5,6], 7));   // => 5
console.log(bisectLeft([1], 2)); 		   // => 1  
 */