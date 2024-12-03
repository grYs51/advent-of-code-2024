
type Input = string;

export function parse(input: string): Input {
  return input;
}

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
const doRegex = /do\(\)/g;
const dontRegex = /don't\(\)/g;

export const partOne = (input: Input): number => {
  const matches = input.match(regex) || [];
  
  return matches.reduce((acc, match) => {
    const [_, a, b] = match.match(/mul\((\d{1,3}),(\d{1,3})\)/) || [];
    return acc + (parseInt(a!) || 0) * (parseInt(b!) || 0);
  }, 0);
}

export const partTwo = (input: Input): number => {
  let enabled = true;
  const instructions = input.split(/(?=mul\(|do\(\)|don't\(\))/);
  
  return instructions.reduce((acc, instruction) => {
    if (instruction.match(doRegex)) {
      enabled = true;
    } else if (instruction.match(dontRegex)) {
      enabled = false;
    } else if (enabled && instruction.match(regex)) {
      const [_, a, b] = instruction.match(/mul\((\d{1,3}),(\d{1,3})\)/) || [];
      acc += (parseInt(a!) || 0) * (parseInt(b!) || 0);
    }
    return acc;
  }, 0);
}