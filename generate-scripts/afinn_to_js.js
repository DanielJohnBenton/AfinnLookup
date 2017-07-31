"use strict";

let __fs = require("fs");

let file = "AFINN-111.txt";

let data = __fs.readFileSync(file, "utf8").split("\n");

let output = "";

for(let i in data)
{
	let pieces = data[i].split("\t");
	
	output +="exports[\"_"+ pieces[0] +"\"] = "+ pieces[1] +";\n";
}

output += "\nexports.Score = function(word)\n"
		+"{\n"
		+"\tword = word.toLowerCase();\n"
		+"\treturn ((typeof(this[\"_\"+ word] != \"undefined\")) ? this[\"_\"+ word] : 0)\n"
		+"}";

__fs.writeFileSync("afinn-lookup.js", output, "utf8");