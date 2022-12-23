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

const isValidCoords = (head: Vector, tail: Vector): boolean => {
    const diff: Vector = {x: Math.abs(head.x - tail.y), y: Math.abs(head.y - tail.y)};
    const tolerance = 1;
    
    return diff.x <= tolerance && diff.y <= tolerance;
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
    const validCoords = isValidCoords(head, tail); // is tail adjacent (or on top of?)
    // if (!validCoords)
    // tail = moveTail(head, tail, direction, times);    

    tailPositions.push({...tail});
}



console.log({p1: tailPositions.length})