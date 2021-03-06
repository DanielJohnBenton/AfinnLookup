"use strict";

let __afinn = require("./afinn-lookup");

// normal usage
console.log("'wonderful': "+ __afinn.Score("wonderful")); // 'wonderful': 4

// you can use any case:
console.log("'WONDERful': "+ __afinn.Score("WONDERful")); // 'WONDERful': 4


// =========================================================================================
// you might want to sanitise punctuation away from words so they can be scored properly, for example remove the semicolon so that 'cruel' is recognised:
let words_not_sanitised = "Be wise as thou art cruel; do not press My tongue-tied patience with too much disdain";
let words_sanitised =     "Be wise as thou art cruel do not press My tongue-tied patience with too much disdain";

function MarkWords(text)
{
	let words = text.split(" ");
	
	for(let i = 0, n = words.length; i < n; i++)
	{
		let score = __afinn.Score(words[i]);
		
		if(score < 0)
		{
			words[i] = "<"+ words[i] +"<";
		}
		else if(score > 0)
		{
			words[i] = ">"+ words[i] +">";
		}
	}
	
	return words.join(" ");
}

console.log("NOT SANITISED: "+ MarkWords(words_not_sanitised)); // NOT SANITISED: Be wise as thou art cruel; do not press My tongue-tied patience with too much <disdain<
console.log("---");
console.log("SANITISED: "+ MarkWords(words_sanitised)); // SANITISED: Be wise as thou art <cruel< do not press My tongue-tied patience with too much <disdain<
// =========================================================================================