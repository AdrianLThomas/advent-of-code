const input = await Deno.readTextFile("./2022/9/input.txt");

type Vector = {
    x: number;
    y: number;
}

enum Direction {
    U = 'U',
    R = 'R',
    D = 'D',
    L = 'L',
}

const ropeTolerance = 1;

const isValidCoords = (head: Vector, tail: Vector): boolean => {
    const diff: Vector = {x: Math.abs(head.x - tail.y), y: Math.abs(head.y - tail.y)};
    
    return diff.x <= ropeTolerance && diff.y <= ropeTolerance;
}

const moveTail = (head: Vector, direction: Direction): Vector => {
    const newTail: Vector = {...head};
    switch (direction) {
        case Direction.U:
            newTail.y -= ropeTolerance;
            break;
        case Direction.R:
            newTail.x -= ropeTolerance;
            break;
        case Direction.D:
            newTail.y += ropeTolerance;
            break;
        case Direction.L:
            newTail.x += ropeTolerance;
            break;
    }

    return newTail;
}

const head: Vector = {x: 0, y: 0};
const tail: Vector = {x: 0, y: 0};

const allLines = input.split('\n');
const tailPositions: Vector[] = [];
for (const line of allLines) {
    const [directionString, timesString] = line.split(' ');
    const direction = directionString as Direction;
    const times = +timesString;

    // move head
    switch (direction) {
        case Direction.U:
            head.y += times;
            break;
        case Direction.R:
            head.x += times;
            break;
        case Direction.D:
            head.y -= times;
            break;
        case Direction.L:
            head.x -= times;
            break;
    }

    // move tail
    const validCoords = isValidCoords(head, tail);
    if (!validCoords) {
        const newPosition = moveTail(head, direction);
        tail.x = newPosition.x;
        tail.y = newPosition.y;
        for (let i = 0; i < times - 1; i++) {
            tailPositions.push(newPosition);
        }
    }
}

console.log({p1: tailPositions.length + 1})
