package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
)

func main() {
	file, _ := os.Open("input.txt")
	defer file.Close()
	scanner := bufio.NewScanner(file)

	gameScore := 0
	lineCount := 0
	// read each line
	for scanner.Scan() {
		thisLine := scanner.Text()
		lineCount++

		// split line by colon, part [0] is ID, part [1] is game
		lineParts := strings.Split(thisLine, ":")
		game := lineParts[1]

		// split by pipe[0] to get winningNumbers and pipe[1] to get myNumbers
		numberSet := strings.Split(game, "|")
		winningNumbersSet := strings.TrimSpace(strings.ReplaceAll(numberSet[0], "  ", " "))
		myNumbersSet := strings.TrimSpace(strings.ReplaceAll(numberSet[1], "  ", " "))
		myNumbers := strings.Split(myNumbersSet, " ")
		winningNumbers := strings.Split(winningNumbersSet, " ")

		// check if each number is in winningNumbers
		cardWinCount := 0
		for _, myNumber := range myNumbers {
			for _, winningNumber := range winningNumbers {
				myNumberInt, _ := strconv.Atoi(myNumber)
				winningNumberInt, _ := strconv.Atoi(winningNumber)
				if myNumberInt == winningNumberInt {
					cardWinCount++
				}
			}
		}

		if cardWinCount >= 1 {
			gameScore += int(math.Pow(2, float64(cardWinCount-1)))
		}
	}

	fmt.Println("Game Score:", gameScore)
}
