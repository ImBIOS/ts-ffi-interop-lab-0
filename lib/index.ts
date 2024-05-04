import { exec } from "child_process";
import path from "path";
import { DataType, define, load, open } from "ffi-rs";

open({
	library: "librust",
	path: path.join(__dirname, "../target/release/libfibonacci.so"),
});
const rsFibonacci = (n: number) =>
	load({
		library: "librust",
		funcName: "fibonacci",
		retType: DataType.I32,
		paramsType: [DataType.I32],
		paramsValue: [n],
	});
// close("librust");

open({
	library: "libc",
	path: path.join(__dirname, "../target/fibonaccic.so"),
});
// const cLib = define({
// 	fibonacci: {
// 		library: "libc",
// 		retType: DataType.I32,
// 		paramsType: [DataType.I32],
// 	},
// });
const cFibonacci = (n: number) =>
	load({
		library: "libc",
		funcName: "fibonacci",
		retType: DataType.I32,
		paramsType: [DataType.I32],
		paramsValue: [n],
	});
// close("libc");

open({
	library: "libgo",
	path: path.join(__dirname, "../target/fibonaccigo.so"),
});
// const goLib = define({
// 	Fibonacci: {
// 		library: "libgo",
// 		retType: DataType.I32,
// 		paramsType: [DataType.I32],
// 	},
// });
const goFibonacci = (n: number) =>
	load({
		library: "libgo",
		funcName: "Fibonacci",
		retType: DataType.I32,
		paramsType: [DataType.I32],
		paramsValue: [n],
	});
// close("libgo");

const phpScriptPath = path.join(__dirname, "../src/fibonacci.php");
const phpFibonacci = (n: number) => {
	exec(`php ${phpScriptPath} ${n}`, (err, phpResponse, stderr) => {
		if (err) console.log(err); /* log error */
		console.log(phpResponse);
	});
};

function jsFibonacci(n: number): number {
	if (n <= 2) {
		return 1;
	}

	return jsFibonacci(n - 1) + jsFibonacci(n - 2);
}

type FibonacciFunctions = {
	[key: string]: (n: number) => number;
};

const fibonacci: FibonacciFunctions = {
	js: jsFibonacci,
	rust: rsFibonacci,
	c: cFibonacci,
	go: goFibonacci,
	php: phpFibonacci,
};

export default {
	fibonacci,
};
