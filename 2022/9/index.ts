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
    const diff: Vector = {x: Math.abs(head.x - tail.x), y: Math.abs(head.y - tail.y)};
    
    return diff.x <= ropeTolerance && diff.y <= ropeTolerance;
}

// const moveTail = (head: Vector, direction: Direction): Vector => {
//     const newTail: Vector = {...head};
//     switch (direction) {
//         case Direction.U:
//             newTail.y -= ropeTolerance;
//             break;
//         case Direction.R:
//             newTail.x -= ropeTolerance;
//             break;
//         case Direction.D:
//             newTail.y += ropeTolerance;
//             break;
//         case Direction.L:
//             newTail.x += ropeTolerance;
//             break;
//     }

//     return newTail;
// }

const moveHead = (head: Vector, direction: Direction): Vector => {
    switch (direction) {
        case Direction.U:
            return {...head, y: head.y + 1}
        case Direction.R:
            return {...head, x: head.x + 1}
        case Direction.D:
            return {...head, y: head.y - 1}
        case Direction.L:
            return {...head, x: head.x - 1}
    }
}

const moveTail = (head: Vector, tail: Vector): Vector => {
    const diff: Vector = {x: Math.abs(head.x - tail.x), y: Math.abs(head.y - tail.y)};
    const xDiff = diff.x > 1;
    const yDiff = diff.y > 1;
    return {x: head.x - (tail.x + (xDiff ? ropeTolerance : 0)), y: head.y - (tail.y + (yDiff ? ropeTolerance : 0))};
    // return {x: head.x / 2, y: head.y / 2};
    // x diff, then +tolerance
    // y diff, then +tolerance
    
    // head: x: 2, y: 0
    // tail: x: 0, y, 0
    // tail: x: 1, y, 0

    // x: x - ropeTolerance
    // y: y - ropeTolerance
}

let head: Vector = {x: 0, y: 0};
let tail: Vector = {x: 0, y: 0};

const allLines = input.split('\n');
let tailPositions = 1;
for (const line of allLines) {
    const [directionString, timesString] = line.split(' ');
    const direction = directionString as Direction;
    const moves = +timesString;

    // move head
    for (let i = 0; i < moves; i++) {
        head = moveHead(head, direction);

        // move tail
        const validCoords = isValidCoords(head, tail);
        if (!validCoords) {
            do {
                tail = moveTail(head, tail);
                tailPositions++;
            } while (!isValidCoords(head, tail));
        }
    }


}

console.log({p1: tailPositions})
