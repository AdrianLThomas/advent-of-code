import * as fs from "fs/promises";

const input = await fs.readFile("input.txt", { encoding: "utf8" });
const grid = input
  .split("\n")
  .map((row) => row.split("").map((tree) => parseInt(tree, 10)));
const edgeTrees = grid.length * 2 + grid[0].length * 2 - 4; // all 4 sides, minus 4 for overlap.
let sum = edgeTrees;

const getVisibility = (y, x, maxX, maxY) => {
  const thisTree = grid[y][x];
  const aboveTrees = [];
  const rightTrees = [];
  const belowTrees = [];
  const leftTrees = [];
  for (let n = 1; y - n >= 0; n++) {
    aboveTrees.push(grid[y - n][x]);
  }
  for (let n = 1; x + n < maxX; n++) {
    rightTrees.push(grid[y][x + n]);
  }
  for (let n = 1; y + n < maxY; n++) {
    belowTrees.push(grid[y + n][x]);
  }
  for (let n = 1; x - n >= 0; n++) {
    leftTrees.push(grid[y][x - n]);
  }

  return (
    aboveTrees.every((tree) => tree < thisTree) ||
    rightTrees.every((tree) => tree < thisTree) ||
    belowTrees.every((tree) => tree < thisTree) ||
    leftTrees.every((tree) => tree < thisTree)
  );
};

const getScenicScore = (y, x, maxX, maxY) => {
  const thisTree = grid[y][x];
  const aboveTrees = [];
  const rightTrees = [];
  const belowTrees = [];
  const leftTrees = [];
  for (let n = 1; y - n >= 0; n++) {
    aboveTrees.push(grid[y - n][x]);
  }
  for (let n = 1; x + n < maxX; n++) {
    rightTrees.push(grid[y][x + n]);
  }
  for (let n = 1; y + n < maxY; n++) {
    belowTrees.push(grid[y + n][x]);
  }
  for (let n = 1; x - n >= 0; n++) {
    leftTrees.push(grid[y][x - n]);
  }

  const allTrees = [aboveTrees, rightTrees, belowTrees, leftTrees];
  const sums = [];
  for (let i = 0; i < allTrees.length; i++) {
    let sum = 0;
    for (let tree of allTrees[i]) {
        if (tree >= thisTree) {
            sum++;
            break; // stop processing as we've found a same/taller tree.
        }
        sum++;
    }
    sums.push(sum);
  }

  return sums[0] * sums[1] * sums[2] * sums[3];
};

let scenicScores = [];
for (let y = 1; y < grid.length - 1; y++) {
  for (let x = 1; x < grid[y].length - 1; x++) {
    const isVisible = getVisibility(y, x, grid.length, grid[y].length);
    if (isVisible) {
      sum++;
    }

    scenicScores.push(getScenicScore(y, x, grid.length, grid[y].length));
  }
}

console.log({
  part1: sum,
  part2: scenicScores.sort(function (a, b) {
    return b - a;
  })[0],
});
