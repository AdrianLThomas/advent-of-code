package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	file, _ := os.Open("input.txt")
	defer file.Close()

	matrix := getMatrix(file)

	missingPart := getPartNumber(matrix)

	fmt.Println("Missing Part:", missingPart)

}

func getPartNumber(matrix [][]rune) int {
	partNumber := 0

	for y, column := range matrix {
		digit := ""
		isPart := false
		for x, row := range column {
			valueAsString := string(row)
			_, err := strconv.Atoi(valueAsString)
			if err == nil {
				digit += valueAsString
				isPart = isSymbolNear(matrix, x, y)
			} else {
				if digit == "" {
					continue // no point calculating if there's nothing to check
				}
				// we have the number!
				// fmt.Printf("Digit: %s, Start: %d, End: %d\n", digit, digitStartIndex, digitEndIndex)

				// digit = "" // reset
			}
		}

		if isPart {
			n, _ := strconv.Atoi(digit)
			partNumber += n
		}
	}
	return partNumber
}

func isSymbolNear(matrix [][]rune, runeX int, runeY int) bool {
	const SPACE = '.'

	vectorsToCheck := [][]int{
		{runeX - 1, runeY - 1}, // top left
		{runeX, runeY - 1},     // top
		{runeX + 1, runeY - 1}, // top right
		{runeX + 1, runeY},     // right
		{runeX + 1, runeY + 1}, // bottom right
		{runeX, runeY + 1},     // bottom
		{runeX - 1, runeY + 1}, // bottom left
		{runeX - 1, runeY},     // left
	}

	// check surrounding area if symbol
	for _, vector := range vectorsToCheck {
		x := vector[0]
		y := vector[1]

		// out of range check
		if x < 0 || y < 0 {
			continue
		}
		if x >= len(matrix[0]) || y >= len(matrix) {
			continue
		}

		adjacent := matrix[y][x]

		if adjacent != SPACE {
			adjacentAsInteger := int(adjacent - '0')
			if adjacentAsInteger >= 0 && adjacentAsInteger <= 9 {
				continue
			} else {
				// must be a symbol!
				return true
			}
		}
	}

	return false
}

func getMatrix(file *os.File) [][]rune {
	var matrix [][]rune
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		runes := []rune(line)
		matrix = append(matrix, runes)
	}

	return matrix
}
