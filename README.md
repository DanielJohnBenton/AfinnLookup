# Afinn Lookup

A useful library for sentiment analysis that scores words using the [AFINN-111](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) word list.

## Usage
You probably want to use the `dist-normal` version for the original AFINN-111 list.

Once you have `afinn-lookup.js` in your project folder, use:

```
let __afinn = require("./afinn-lookup");
```

Once you have this you can score words like this:

```
// normal usage
console.log("'wonderful': "+ __afinn.Score("wonderful")); // 'wonderful': 4

// you can use any case:
console.log("'WONDERful': "+ __afinn.Score("WONDERful")); // 'WONDERful': 4
```

## Delicious raisins d'etre
Another implementation of this exists (handily on NPM) but I rolled my own because:
- I have my own amended version of the wordlist (optional)
- This version performs case sanitisation
- This version returns a score of 0 instead of `undefined` if the given word is not listed
- I made this largely for my own convenience as I like to use it to analyse a lot of different datasets in different ways and copying files and functions around is a pain

## Amended version
This is the current difference in my annotated version (+added -removed):

```
+ criticise
+ criticised
+ criticises
+ criticising
+ dehumanise
+ dehumanised
+ dehumanises
+ dehumanising
+ demoralised
+ disorganised
+ immobilised
+ monopolise
+ monopolised
+ monopolises
+ monopolising
+ terrorise
+ terrorised
+ terrorises
+ victimise
+ victimised
+ victimises
+ victimising
```

## Demo
```
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
```