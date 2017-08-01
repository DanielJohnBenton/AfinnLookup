"use strict";

let __afinn = require("./afinn-lookup");

let words = ["that", "was", "stupid"];

for(let i in words)
{
	console.log(words[i] +": "+ __afinn.Score(words[i]));
}