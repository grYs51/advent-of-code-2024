export function parse(input: string): [number[], number[]] {
  const row1: number[] = [];
  const row2: number[] = [];
  input.split("\r\n").forEach((line) => {
    const [a, b] = line.trim().split(/\s+/).map(Number);
    row1.push(a!);
    row2.push(b!);
  });
  return [row1, row2];
}

export function partOne([row1, row2]: [number[], number[]]): number {
  row1.sort((a, b) => a - b);
  row2.sort((a, b) => a - b);
  return row1.reduce((sum, a, index) => sum + Math.abs(a - row2[index]!), 0);
}

export function partTwo([row1, row2]: [number[], number[]]): number {
  const row2Count = row2.reduce(
    (acc, num) => {
      acc[num] = (acc[num] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );
  return row1.reduce((sum, a) => sum + a * (row2Count[a] || 0), 0);
}
