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

	const MAX_RED = 12
	const MAX_GREEN = 13
	const MAX_BLUE = 14

	// split input.txt into lines
	possibleGames := []int{}
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		thisLine := scanner.Text()

		// split line by colon, part [0] is ID, part [1] is game
		lineParts := strings.Split(thisLine, ":")
		id, _ := strconv.Atoi(strings.Split(lineParts[0], " ")[1])
		game := lineParts[1]

		// split game by semi colon to get rounds
		rounds := strings.Split(game, ";")

		// loop each round
		roundCount := 0
		for _, round := range rounds {
			// split round by comma to get colours
			colours := strings.Split(round, ", ")

			red := 0
			green := 0
			blue := 0
			for _, colour := range colours {
				// split colours by space to get number and colour
				colourParts := strings.Split(strings.TrimSpace(colour), " ")
				number, _ := strconv.Atoi(colourParts[0])
				colour := colourParts[1]

				switch colour {
				case "red":
					{
						red = number
					}
				case "green":
					{
						green = number
					}
				case "blue":
					{
						blue = number
					}
				}
			}

			if red <= MAX_RED && green <= MAX_GREEN && blue <= MAX_BLUE {
				roundCount++
			}
		}

		if roundCount == len(rounds) {
			possibleGames = append(possibleGames, id)
		}
	}

	// loop and add each id together to get result
	result := 0
	for _, idValue := range possibleGames {
		result += idValue
	}

	fmt.Println(result)
}
