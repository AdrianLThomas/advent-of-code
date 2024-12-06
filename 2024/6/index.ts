const file = await Deno.readTextFile(new URL("./input.txt", import.meta.url));
const lines = file.split("\n");

// const directions = ["^", ">", "v", "<"];
enum Direction {
  up = "^",
  right = ">",
  down = "v",
  left = "<",
}

enum SpaceChar {
  empty = ".",
  obstruction = "#",
}

type Coordinate = {
  X: number;
  Y: number;
};
type Guard = {
  position: Coordinate;
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
      const char = matrix[y][x];
      switch (char) {
        case Direction.down:
        case Direction.up:
        case Direction.left:
        case Direction.right:
          return {
            position: {
              X: x,
              Y: y,
            },
            direction: char,
          };
      }
    }
  }

  throw new Error("404 guard not found");
};

const visitedPositions: Guard[] = [];
const simulatePath = (
  map: string[][],
  guardStartingPosition: Guard
): Guard[] => {
  //   const maxX = map[0].length - 1; // assuming it's an equal grid
  //   const maxY = map.length - 1;
  let currentGuardPosition: Guard = structuredClone(guardStartingPosition);
  //   const isGuardWithinBounds =
  //     currentGuardPosition.position.X >= 0 &&
  //     currentGuardPosition.position.X <= maxX &&
  //     currentGuardPosition.position.Y >= 0 &&
  //     currentGuardPosition.position.Y <= maxY;
  let isGuardOffGrid =
    guardStartingPosition.position.X === -1 &&
    guardStartingPosition.position.Y === -1;
  while (!isGuardOffGrid) {
    visitedPositions.push(currentGuardPosition);

    let nextMoveChar = "";
    let nextMoveCoords: Coordinate;

    // determine guard's next move
    switch (currentGuardPosition.direction) {
      case Direction.up:
        nextMoveCoords = {
          X: currentGuardPosition.position.X,
          Y: currentGuardPosition.position.Y - 1,
        };
        break;
      case Direction.right:
        nextMoveCoords = {
          X: currentGuardPosition.position.X + 1,
          Y: currentGuardPosition.position.Y,
        };
        break;
      case Direction.down:
        nextMoveCoords = {
          X: currentGuardPosition.position.X,
          Y: currentGuardPosition.position.Y + 1,
        };
        break;
      case Direction.left:
        nextMoveCoords = {
          X: currentGuardPosition.position.X - 1,
          Y: currentGuardPosition.position.Y,
        };
        break;
    }
    nextMoveChar = map[nextMoveCoords.Y][nextMoveCoords.X];

    // make the guard move
    switch (nextMoveChar) {
      case SpaceChar.empty: {
        // continue ahead
        currentGuardPosition = {
          position: nextMoveCoords,
          direction: currentGuardPosition.direction,
        };
        break;
      }
      case SpaceChar.obstruction: {
        // turn 90 deg right
        let newDirection: Direction;
        switch (currentGuardPosition.direction) {
          case Direction.up: {
            newDirection = Direction.right;
            break;
          }
          case Direction.right: {
            newDirection = Direction.down;
            break;
          }
          case Direction.down: {
            newDirection = Direction.left;
            break;
          }
          case Direction.left: {
            newDirection = Direction.up;
            break;
          }
        }
        currentGuardPosition = {
          position: guardStartingPosition.position,
          direction: newDirection,
        };
        break;
      }
      case undefined:
        isGuardOffGrid = true;
        currentGuardPosition = {
          position: { X: -1, Y: -1 },
          direction: Direction.up, // irrelevant
        };
        break;
    }

    const newMap = structuredClone(map);
    newMap[guardStartingPosition.position.Y][guardStartingPosition.position.X] =
      "."; // space guard was in is now empty

    if (!isGuardOffGrid) {
      newMap[currentGuardPosition.position.Y][currentGuardPosition.position.X] =
        currentGuardPosition.direction; // assign direction at new position
    } else {
      newMap[guardStartingPosition.position.Y][
        guardStartingPosition.position.X
      ] = "."; // guard is off grid so just mark where they were as an empty space
    }

    return simulatePath(newMap, currentGuardPosition);
  }

  return visitedPositions;
};

const guardStartingPosition = findGuard(map);
const recordedPositions: Guard[] = simulatePath(map, guardStartingPosition!);
const distinctPositions = recordedPositions.filter((o1, index, self) => {
  return (
    index ===
    self.findIndex(
      (o2) => o2.position.X === o1.position.X && o2.position.Y === o1.position.Y
    )
  );
});

console.log({
  recordedPositions: recordedPositions.length,
  distinctPositions: distinctPositions.length,
});
