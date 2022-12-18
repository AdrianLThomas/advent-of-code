import * as fs from 'fs/promises'

const input = await fs.readFile('input.txt', { encoding: 'utf8' });
const allLines = input.split('\n');

const fileSystem = {};
let pwd = ''
for (let i = 0; i < allLines.length; i++) {
    const thisLine = allLines[i].split(' ')
    const commands = {
        cd: (path) => {
            if (path == '..') {
                pwd = `${pwd.slice(0, pwd.lastIndexOf('/', pwd.length - 2))}/`;
                return;
            }

            if (path.startsWith('/')) {
                pwd = path;
            } else {
                pwd += `${path}/`;
            }

            if(!fileSystem[pwd]) {
                fileSystem[pwd] = []
            }
        },
        ls: () => {
            let file;
            do {
                file = allLines[++i].split(' '); // next line
                if (file[0] === '$') {
                    i--;
                    return;
                }

                fileSystem[pwd].push(file)
            } while (i+1 < allLines.length)
            i--;
        }
    }

    // process command
    switch(thisLine[0]) {
        case '$':
            commands[thisLine[1]](thisLine[2]);
            break;
    }
}
// Find all of the directories with a total size of at most 100000.
// What is the sum of the total sizes of those directories?
const fileSystemSizes = {};
for (const [key, value] of Object.entries(fileSystem)) {
    if(!fileSystemSizes[key]) {
        fileSystemSizes[key] = 0; // init
    }

    // sum each file in this dir directly
    value.forEach(x => {
        const num = parseInt(x[0], 10);
        if(Number.isInteger(num)) {
            fileSystemSizes[key] += num
        }
    })
}

// add subdirectories to totals
const allKeys = Object.keys(fileSystem);
for (const key of allKeys) {
    const subDirectories = 
        allKeys.filter(x => x.startsWith(key))
               .slice(1)
    subDirectories.forEach(sub => {
        fileSystemSizes[key] += fileSystemSizes[sub]
    })

}

// calculate puzzle
const sizes = Object.values(fileSystemSizes)
                    .filter(v => v > 0)
                    .filter(v => v <= 100000)
                    .sort(function(a,b){return b - a})
const sum = sizes.reduce((acc, cur) => acc + cur)
console.log({p1Answer: sum})


// part 2
const totalDiskSize = 70000000;
const requiredUnusedSpace = 30000000;
const currentUnusedSpace = totalDiskSize - fileSystemSizes['/'];
const discrepancy = requiredUnusedSpace - currentUnusedSpace;
console.log({currentUnusedSpace, discrepancy})

// Find the smallest directory that, if deleted, would free up 
// enough space on the filesystem to run the update. 
// What is the total size of that directory?
const candidates = Object.values(fileSystemSizes)
                         .filter(dirSize => discrepancy - dirSize < 0)
                         .sort(function(a,b){return a - b})
console.log({p2Answer: candidates[0]})