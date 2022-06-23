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
		this.hash = [];
	}
	
	//Step through each key in the table and check if it's matching target pair also exists in the table
	calc2Sum(){
		
		const targets = new Set();   //the target values which form the sum
		
		//10000, 5, 2
		const MIN = -10000;
		const MAX = 10000;
		
		for (let num of this.hash){

			let low = bisectLeft(this.hash, MIN - num);
			let high = bisectRight(this.hash, MAX - num);
			
			//step through the window range, and add the sums (as long as not duplicates)
			for (let i = low; i < high; i++){
				if (this.hash[i] != num){
					targets.add(num + this.hash[i]);
				}
			} 
		
		}
		
		console.log("Final target values size: " + targets.size);
		return targets.size;
	}
	
	//Alternative loader for testing smaller, custom static arrays rather than input files
	loadDummyData(){
		
		const nums = [5,-2,3,-5,1,6,-1,-4,2,-3,4,-6];
		
		for (let num of nums){
			this.hash.push(num);   
		}
	}
	
}

//Take input file and load numbers into hash table
const parseFile = async (file) => {

	const nums = (await util.promisify(fs.readFile)(file)).toString().split('\n');
	const twoSum = new TwoSum();

	//each line is a single number
	nums.map(num => {
		if (!num) { return null; }
		twoSum.hash.push(Number(num)); 
	});
	
	//sort the data to make tracking targets easier
	twoSum.hash.sort((a, b) => a - b);
	
	return twoSum;
}; 


///////////////////////////////////////////////////////////////////////////////////////
//Driver

console.log("Starting up 2-Sum...");

const startTime = performance.now();

//2sum, 2sumNegs
parseFile('./2sum.txt').then((twoSum) => {
	
	twoSum.calc2Sum();
	
	const endTime = performance.now();
	const dur = Math.round((endTime - startTime) * 100) / 100;
	
	console.log(`2sum took ${dur/1000} seconds`);   // ~  1.65 seconds
	
});



