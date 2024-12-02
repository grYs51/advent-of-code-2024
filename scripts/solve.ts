import { argv } from "bun";
import chalk from "chalk";
import { formatPerformance, withPerformance, isBetween } from "./utils.ts";
import { scaffold } from "./scaffold.ts";
import { performance } from "perf_hooks";

const day = parseInt(argv[2] ?? "");
const year = parseInt(process.env.YEAR ?? new Date().getFullYear());

if (!isBetween(day, [1, 25])) {
  console.log(`🎅 Pick a day between ${chalk.bold(1)} and ${chalk.bold(25)}.`);
  console.log(`🎅 To get started, try: ${chalk.cyan("bun solve 1")}`);
  process.exit(0);
}

await scaffold(day, year);

const name = `${day}`.padStart(2, "0");

const startTime = performance.now();
const { default: input } = await import(`@/${name}/input.txt`);
const { partOne, partTwo, parse } = await import(`@/${name}/${name}.ts`);
const fileReadTime = performance.now();

const [one, onePerformance] = withPerformance(() => partOne?.(parse(input)));
const [two, twoPerformance] = withPerformance(() => partTwo?.(parse(input)));
const endTime = performance.now();

console.log(chalk.green(`Day ${day} — Advent of Code ${year}`));
console.log();
console.log(
  "📂",
  "File Read Time:",
  chalk.blue(`${formatPerformance(fileReadTime - startTime)}`)
);
console.log(
  "🌲",
  "Part One:",
  chalk.grey(`${one ?? "—"}:`),
  one ? chalk.blue(`${formatPerformance(onePerformance)}`) : ""
);
console.log(
  "🎄",
  "Part Two:",
  chalk.grey(`${two ?? "—"}:`),
  two ? chalk.blue(`${formatPerformance(twoPerformance)}`) : ""
);
console.log(
  "⏱️",
  "Total Execution Time:",
  chalk.blue(`${formatPerformance(endTime - startTime)}`)
);
