/* 
	2-Sum algorithm
	Stephen Rinkus	
*/

import { bisectLeft } from "./bisectLeft.js";
import { bisectRight } from "./bisectRight.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { performance } = require('perf_hooks');
const util = require('util');
const fs = require('fs');


class TwoSum{

	constructor(){
		this.numbers = [];
	}
	
	calc2Sum(){
		
		const targetsFound = new Set();   //the targeted sums identified
		const MIN = -2;
		const MAX = 2;
		
		//step through each number and check if it's matching target value also exists in the array
		for (const num of this.numbers){
			
			//establishing the window of valid sums
			const low = bisectLeft(this.numbers, MIN - num);
			const high = bisectRight(this.numbers, MAX - num);
			
			//cover the range and identify target sums (as long as not handling duplicates)
			for (let i = low; i < high; i++){
				if (this.numbers[i] != num){
					targetsFound.add(num + this.numbers[i]);
				}
			}
		
		}
		
		console.log("Final target values size: " + targetsFound.size);
		return targetsFound.size;
	}
	
	//Alternative loader for testing smaller, custom static arrays rather than input files
	loadDummyData(){
		
		const nums = [5,-2,3,-5,1,6,-1,-4,2,-3,4,-6];
		
		for (const num of nums){
			this.numbers.push(num);   
		}
	}
	
}

//Take input file and load numbers into array
const parseFile = async (file) => {

	const nums = (await util.promisify(fs.readFile)(file)).toString().split('\n');
	const twoSum = new TwoSum();

	//each line is a single number
	nums.map(num => {
		if (!num) { return null; }
		twoSum.numbers.push(Number(num)); 
	});
	
	//sort the data to make tracking targets easier
	twoSum.numbers.sort((a, b) => a - b);
	
	return twoSum;
}; 


///////////////////////////////////////////////////////////////////////////////////////
//Driver

console.log("Starting up 2-Sum...");

const startTime = performance.now();

parseFile('./2sum.txt').then((twoSum) => {
	
	twoSum.calc2Sum();
	
	const endTime = performance.now();
	const dur = Math.round((endTime - startTime) * 100) / 100;
	
	console.log(`2sum took ${dur/1000} seconds`);   // ~ 1.65 seconds
	
});



