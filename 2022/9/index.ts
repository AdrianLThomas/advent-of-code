const input = await Deno.readTextFile("./2022/9/input.txt");

/* 
tuple: x = 0, y = 0
for each line:
    move head in direction
    is tail adjacent (or on top of?)
        if so, do nothing
        else move ULDR/diag so that it is.
        add tuple to array for sum at end
    
console.log(moves.length)
*/

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

const head: Vector = {x: 0, y: 0};
const tail: Vector = {x: 0, y: 0};

const allLines = input.split('\n');

for (let line of allLines) {
    const [directionString, timesString] = line.split(' ');
    const direction = directionString as Direction;
    const times = +timesString;

    debugger;
}
