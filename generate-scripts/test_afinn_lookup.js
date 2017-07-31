"use strict";

let __afinn = require("./afinn-lookup");

let tests = "It was the best of times it was the worst of times it was the age of wisdom it was the age of foolishness it was the epoch of belief it was the epoch of incredulity it was the season of Light it was the season of Darkness it was the spring of hope it was the winter of despair we had everything before us we had nothing before us we were all going direct to Heaven we were all going direct the other way".split(" ");

for(let i in tests)
{
	let score = __afinn.Score(tests[i]);
	
	if(score < 0)
	{
		tests[i] = "<"+ tests[i] +"<";
	}
	else if(score > 0)
	{
		tests[i] = ">"+ tests[i] +">";
	}
}

console.log(tests.join(" "));