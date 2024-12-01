const file = Bun.file(import.meta.dir + '/input.txt')
const content = await file.text()
const lines = content.split('\n')

// create lists
const leftList: number[] = []
const rightList: number[] = []

lines.forEach(line => {
    const [left, right] = line.split('   ')
    if (left && right) {
        leftList.push(parseInt(left, 10))
        rightList.push(parseInt(right, 10))
    } 
})

// pair up smallest numbers
leftList.sort()
rightList.sort()

let totalDistance = 0
for (let i = 0; i < leftList.length; i++) {
    totalDistance += Math.abs(leftList[i] - rightList[i])
}

console.log({answer: totalDistance})