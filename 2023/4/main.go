package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	file, _ := os.Open("input.txt")
	defer file.Close()
	scanner := bufio.NewScanner(file)

	gameScore := 0
	// read each line
	for scanner.Scan() {
		thisLine := scanner.Text()

		// split line by colon, part [0] is ID, part [1] is game
		lineParts := strings.Split(thisLine, ":")
		// id, _ := strconv.Atoi(strings.Split(lineParts[0], " ")[1])
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
		if cardWinCount <= 2 {
			gameScore += cardWinCount
		} else {
			gameScore += cardWinCount * 2
		}
		// otherwise zero.
		fmt.Println((gameScore)) // TODO ... test data ok, full input too low
	}

	fmt.Println("Game Score:", gameScore)
}
