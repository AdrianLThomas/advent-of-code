const file = Bun.file(import.meta.dir + "/input.txt");
const content = await file.text();
const lines = content.split("\n");

const safeReports = lines.filter((line) => {
  const report = line.split(" ");

  let isWithinSafeRange = false;
  const direction: ("D" | "I")[] = [];
  for (let i = 0; i < report.length - 1; i++) {
    const currentNumber = parseInt(report[i], 10);
    const nextNumber = parseInt(report[i + 1], 10);
    isWithinSafeRange = Math.abs(currentNumber - nextNumber) <= 3;

    if (!isWithinSafeRange) {
      break;
    }

    if (currentNumber > nextNumber) {
      direction.push("D");
    } else if (currentNumber < nextNumber) {
      direction.push("I");
    } else {
      isWithinSafeRange = false;
      break;
    }
  }

  const isSameDirection = direction.every((d) => d === direction[0]);
  return isWithinSafeRange && isSameDirection;
}).length;

console.log({ safeReports });
