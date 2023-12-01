package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func main() {
	file, _ := os.Open("input.txt")
	defer file.Close()

	digitRegexp := regexp.MustCompile(`\d`)
	scanner := bufio.NewScanner(file)
	count := 0
	for scanner.Scan() {
		digits := digitRegexp.FindAllString(scanner.Text(), -1)
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
