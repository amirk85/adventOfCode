const fs = require("fs");
const readline = require("readline")

function powerOfCubes(arr) {
	const colorCubes = { "red": 0, "green": 0, "blue": 0 };
	for (let i = 0; i < arr.length; i++) {
		const [count, color] = arr[i]?.split(" ");

		if (colorCubes[color] < Number(count)) {
			colorCubes[color] = Number(count)
		}
	}
	const cubes = Object.values(colorCubes);
	const sum = cubes.reduce((a, c) => a * c, 1);
	return sum;
}

const games = [];

const fileStream = fs.createReadStream('./input2.txt');

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

	const organizedGames = games.map(x => x.split(",")).map(y => y.map(z => z.trim()));

	for (const game of organizedGames) {

		sum += powerOfCubes(game)
	}

	console.log(sum);
});


