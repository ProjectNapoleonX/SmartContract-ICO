var fs = require("fs");
// Synchronous read
var data = fs.readFileSync('./data/airdrop.csv').toString().split('\n');

var whitelisted = [];
var tokenAmount = [];
var batchSize = 5;
var counter = 0;

for (var i = 0; i < data.length; i++) {
    var fields = data[i].split(',');
	tokenAmount.push(parseInt(fields[4])); 
	whitelisted.push(fields[3]);
	counter = counter + 1;
	if (counter  == batchSize){
		console.log("Handling@Whitelisted@"+whitelisted.length+"@tokenAmount@"+whitelisted.length);
		tokenAmount = [];
		whitelisted = [];
		counter = 0;
	}
}

console.log("Handling@Whitelisted@"+whitelisted.length+"@tokenAmount@"+whitelisted.length);
tokenAmount = [];
whitelisted = [];
counter = 0;




