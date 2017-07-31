"use strict";

let __fs = require("fs");

let original = __fs.readFileSync("AFINN-111.txt", "utf8").split("\n");
let amended = __fs.readFileSync("AFINN-111-DJB-amended.txt", "utf8").split("\n");

let originalLookup = [];
let amendedLookup = [];

for(let i in original)
{
	original[i] = original[i].split("\t");
	
	originalLookup["_"+ original[i][0]] = true;
}

for(let i in amended)
{
	amended[i] = amended[i].split("\t");
	
	amendedLookup["_"+ amended[i][0]] = true;
}

let output = "";

for(let i in original)
{
	if(typeof(amendedLookup["_"+ original[i][0]]) == "undefined")
	{
		output +="- "+ original[i][0] +"\n";
	}
}

for(let i in amended)
{
	if(typeof(originalLookup["_"+ amended[i][0]]) == "undefined")
	{
		output +="+ "+ amended[i][0] +"\n";
	}
}

__fs.writeFileSync("difference.txt", output.trim(), "utf8");

console.log(output);