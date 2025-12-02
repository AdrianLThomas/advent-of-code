package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	p1()
	p2()
}

func p1() {
	const (
		max       = 99
		max_turns = max + 1
		min       = 0
		min_turns = min + 1
		start     = 50
	)
	current := start
	score := 0

	file, _ := os.Open("./2025/1/input.txt")
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		thisLine := scanner.Text()

		direction := thisLine[:1]
		amount, _ := strconv.Atoi(thisLine[1:])

		if direction == "L" {
			current = current - amount
			for current < min {
				current = max_turns + current
			}
		} else { // R
			current = current + amount
			for current > max {
				current = current - max_turns
			}
		}

		if current == 0 {
			score = score + 1
		}
	}

	fmt.Printf("Score - P1: %v \n", score)
}

func p2() {
	const (
		max       = 99
		max_turns = max + 1
		min       = 0
		min_turns = min + 1
		start     = 50
	)
	current := start
	score := 0

	file, _ := os.Open("./2025/1/input.txt")
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		thisLine := scanner.Text()

		direction := thisLine[:1]
		amount, _ := strconv.Atoi(thisLine[1:])

		if direction == "L" {
			current = current - amount
			for current < min {
				current = max_turns + current
				score = score + 1
			}
		} else { // R
			current = current + amount
			for current > max {
				current = current - max_turns
				score = score + 1
			}
		}
	}

	fmt.Printf("Score - P2: %v \n", score)
	// 5829 too high
}
