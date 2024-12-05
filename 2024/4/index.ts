const file = await Deno.readTextFile(new URL("./input.txt", import.meta.url));
const lines = file.split("\n");

type ValidLetters = "X" | "M" | "A" | "S";
const matrix = lines.map((line) => line.split("") as ValidLetters[]);

let count = 0;

const findXmas = (line: string): number => {
  let found = 0;

  const ltrFound = line.indexOf("XMAS") >= 0;
  const rtlFound = line.indexOf("SAMX") >= 0;

  if (ltrFound) {
    found++;
  }
  if (rtlFound) {
    found++;
  }

  return found;
};

for (let i = 0; i < matrix.length; i++) {
  const rowText = matrix[i].join("");
  const columnText = matrix.map((column) => column[i]).join("");

  count += findXmas(rowText); // does row have text?
  count += findXmas(columnText); // does column have text?
}

let startIndex = 0;
do {
  let wordRight = "";
  // let wordLeft = "";
  for (let i = startIndex; i < matrix.length + startIndex; i++) {
    const rightX = i - startIndex;
    const rightY = i;

    if (rightY >= matrix[rightX].length) {
      // continue if outside bounds
      continue;
    }
    wordRight += matrix[rightX][rightY];
  }

  console.log({ wordRight });
  count += findXmas(wordRight);
  count += findXmas(wordRight.split("").reverse().join(""));
  startIndex++;
} while (startIndex <= matrix.length + 1);

console.log({ count });
