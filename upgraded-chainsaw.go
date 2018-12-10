package main

import (
	"bufio"
	"fmt"
	"os"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {

	if len(os.Args) < 2 {
		fmt.Println("Usage: petest pe_file")
		os.Exit(1)
	}

	file, err := os.Open(os.Args[1])
	check(err)

	defer file.Close()

	// stats, statsErr := file.Stat()
	// check(statsErr)

	// var size = stats.Size()
	bytes := make([]byte, 8)

	bufr := bufio.NewReader(file)
	_, err = bufr.Read(bytes)
	check(err)

	fmt.Printf("%02X %02X %02X %02X %02X %02X %02X %02X\n", bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7])
}
