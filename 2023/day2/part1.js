const fs = require("fs");
const readline = require("readline")


function isValidGame(str = "12 red") {

	const [n, color] = str.split(" ");
	const valid = { "red": 12, "green": 13, "blue": 14 }

	return valid[color] >= Number(n);
}
console.log("isValid:", isValidGame())



const games = [];

const fileStream = fs.createReadStream('./input1.txt');

const rl = readline.createInterface({
	input: fileStream,
	crlfDelay: Infinity // Recognize all newlines (\n, \r\n)
});

rl.on('line', (line) => {

	const [, l] = line.split(":")
	games.push(l.trim().replaceAll(";", ","))

});

rl.on('close', () => {

	let sum = 0;

	let isValid = false;

	const organizedGames = games.map(x => x.split(",")).map(y => y.map(z => z.trim()));

	for (let i = 0; i < organizedGames.length; i++) {
		const game = organizedGames[i];

		for (let j = 0; j < game.length; j++) {

			isValid = isValidGame(game[j]);

			if (!isValid) break;

		}

		if (isValid) {
			sum = sum + (i + 1)
		}
	}
	console.log(sum)
});

