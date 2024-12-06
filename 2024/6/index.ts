const file = await Deno.readTextFile(new URL("./input.txt", import.meta.url));
const lines = file.split("\n");

// const directions = ["^", ">", "v", "<"];
enum Direction {
  up = "^",
  right = ">",
  down = "v",
  left = "<",
}
type Guard = {
  X: number;
  Y: number;
  direction: Direction;
};

const map = lines.map((line) => line.split(""));

/* 

    simulate the path taken, record coords each step of the way
    if guard leaves map: FINISHED
    count all recorded steps on the way
*/

const findGuard = (matrix: string[][]): Guard => {
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      const position = matrix[y][x];
      switch (position) {
        case Direction.down:
        case Direction.up:
        case Direction.left:
        case Direction.right:
          return {
            X: x,
            Y: y,
            direction: position as Direction,
          };
      }
    }
  }

  throw new Error("404 guard not found");
};

const simulatePath = (
  map: string[][],
  guardStartingPosition: Guard
): Guard[] => {
  throw new Error("Function not implemented.");
};

const guardStartingPosition = findGuard(map);
const recordedPositions: Guard[] = simulatePath(map, guardStartingPosition!);
const distinctPositions = recordedPositions.filter((o1, index, self) => {
  return index === self.findIndex((o2) => o2.X === o1.X && o2.Y === o1.Y);
});

console.log({
  guardStartingPosition,
  distinctPositions,
});
