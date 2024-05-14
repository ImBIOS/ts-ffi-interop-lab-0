import babar from "babar";
import lib from "../lib";

const RUNS = 100;
const FIB_SEQ = 35;

// returns the nanoseconds needed for the run
function run(lang: string) {
	let i = RUNS;
	let timeTaken = 0;
	let startTime: [number, number];
	let diff: [number, number];

	for (; i !== 0; i--) {
		startTime = process.hrtime();
		lib.fibonacci[lang](FIB_SEQ);
		diff = process.hrtime(startTime);

		timeTaken = timeTaken + diff[0] * 1e9 + diff[1];
	}

	return timeTaken;
}

const cData = run("c");
console.log("c   ", cData);
const rustData = run("rust");
console.log("rust", rustData);
const goData = run("go");
console.log("go  ", goData);
const jsData = run("js");
console.log("js  ", jsData);
const phpData = run("php");
console.log("php ", phpData);

console.log("\n");

console.log(
	babar([
		[0, cData],
		[1, rustData],
		[2, goData],
		[3, jsData],
		[4, phpData],
	]),
);

console.log("\n");

console.table([
	{ lang: "c", time: cData },
	{ lang: "rust", time: rustData },
	{ lang: "go", time: goData },
	{ lang: "js", time: jsData },
	{ lang: "php", time: phpData },
]);

console.log("\n");

console.log("lower is better");
