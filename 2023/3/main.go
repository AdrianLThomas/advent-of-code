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
	// printMatrix(matrix)

	missingPart := getPartNumber(matrix)

	fmt.Println("Missing Part: ", missingPart)

}

func getPartNumber(matrix [][]rune) int {
	const SPACE = '.'

	for _, column := range matrix {
		digit := ""
		for _, row := range column {
			valueAsString := string(row)
			_, err := strconv.Atoi(valueAsString)
			if err == nil {
				digit += valueAsString
			} else {
				if digit == "" {
					continue // no point calculating if there's nothing to check
				}

				fmt.Println(digit)

				// value, err := strconv.Atoi(string(matrix[y][x]))
				// fmt.Println(value, err)

				// get index of all characters around digit
				// check surrounding area if symbol
				// if symbol, add digit to count

				digit = "" // reset
			}
		}
	}
	return 1
}

func printMatrix(matrix [][]rune) {
	for _, y := range matrix {
		for _, x := range y {
			fmt.Printf("%c", x)
		}
		fmt.Println()
	}
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
