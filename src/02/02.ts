type Input = Array<number[]>;

export function parse(input: string): Input {
  return input.split("\r\n").map((line) => line.split(/\s+/).map(Number));
}

const isSafe = (input: number[]): boolean => {
  const differences = input.slice(1).map((level, i) => level - input[i]!);
  const allIncreasing = differences.every((diff) => diff >= 1 && diff <= 3);
  const allDecreasing = differences.every((diff) => diff <= -1 && diff >= -3);
  return allIncreasing || allDecreasing;
};

const isSafeWithTolerance = (report: number[]): boolean => {
  if (isSafe(report)) {
    return true;
  }

  for (let i = 0; i < report.length; i++) {
    const newReport = report.slice(0, i).concat(report.slice(i + 1));
    if (isSafe(newReport)) {
      return true;
    }
  }

  return false;
};

export const partOne = (input: Input): number => input.filter(isSafe).length;

export const partTwo = (input: Input): number => {
  return input.filter(isSafeWithTolerance).length;
};
