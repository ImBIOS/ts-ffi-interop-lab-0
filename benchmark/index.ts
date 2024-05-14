import babar from "babar";
import lib from "../lib";

// Get value from CLI parameter or set default value
const FIB_SEQ = process.argv[2] ? parseInt(process.argv[2]) : 40;
console.log("Fibonacci Sequence:", FIB_SEQ);
const RUNS = process.argv[3] ? parseInt(process.argv[3]) : 100;
console.log("Runs:", RUNS);
console.log("\n");

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

const dataset = new Map<string, number[]>([
	["c", []],
	["rust", []],
	["go", []],
	["js", []],
	["php", []],
]);

// const cData = run("c");
// console.log("c   ", cData);
// const rustData = run("rust");
// console.log("rust", rustData);
// const goData = run("go");
// console.log("go  ", goData);
// const jsData = run("js");
// console.log("js  ", jsData);
// const phpData = run("php");
// console.log("php ", phpData);

for (const [lang, data] of dataset) {
	const time = run(lang);
	console.log(lang, time);
	data.push(time);
}

console.log("\n");

// console.log(
// 	babar([
// 		[0, cData],
// 		[1, rustData],
// 		[2, goData],
// 		[3, jsData],
// 		[4, phpData],
// 	]),
// );

const chartData: [number, number][] = [];
let i = 0;
for (const [_, data] of dataset) {
	chartData.push([i++, data[0]]);
}
console.log(babar(chartData));

console.log("\n");

// console.table([
// 	{ lang: "c", time: cData },
// 	{ lang: "rust", time: rustData },
// 	{ lang: "go", time: goData },
// 	{ lang: "js", time: jsData },
// 	{ lang: "php", time: phpData },
// ]);

const tableData = [];
for (const [lang, data] of dataset) {
	tableData.push({ lang, time: data });
}
console.table(tableData);

console.log("\n");

console.log("lower is better");
