package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

type KeyValuePair struct {
	Key   string
	Value string
}

func main() {
	file, _ := os.Open("input.txt")
	defer file.Close()

	namedNumbers := []KeyValuePair{
		{"one", "1"},
		{"two", "2"},
		{"three", "3"},
		{"four", "4"},
		{"five", "5"},
		{"six", "6"},
		{"seven", "7"},
		{"eight", "8"},
		{"nine", "9"},
	}

	digitRegexp := regexp.MustCompile(`\d`)
	scanner := bufio.NewScanner(file)
	count := 0
	for scanner.Scan() {
		thisLine := scanner.Text()
		for _, namedNumber := range namedNumbers {
			thisLine = strings.ReplaceAll(thisLine, namedNumber.Key, namedNumber.Key+namedNumber.Value) // concat named number with its value (covers edge case e.g. 'eightwo' is two numbers)
		}
		digits := digitRegexp.FindAllString(thisLine, -1)
		digitLength := len(digits)
		if digitLength > 0 {
			firstDigit := digits[0]
			lastDigit := digits[digitLength-1]
			concatDigits := firstDigit + lastDigit
			digits, _ := strconv.Atoi(concatDigits)
			count += digits
		}
	}

	fmt.Println(count)
}
