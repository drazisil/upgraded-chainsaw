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

func dumpHeader(offset int, bytes []byte) {

	// Global header for an ar file
	offset += 0

	fmt.Println("File identifier")
	fmt.Printf("%02X %02X %02X %02X %02X %02X %02X %02X %02X %02X %02X %02X %02X %02X %02X %02X\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset], bytes[6+offset], bytes[7+offset], bytes[8+offset], bytes[9+offset], bytes[10+offset], bytes[11+offset], bytes[12+offset], bytes[13+offset], bytes[14+offset], bytes[15+offset])
	fmt.Printf("%c %c %c %c %c %c %c %c %c %c %c %c %c %c %c %c\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset], bytes[6+offset], bytes[7+offset], bytes[8+offset], bytes[9+offset], bytes[10+offset], bytes[11+offset], bytes[12+offset], bytes[13+offset], bytes[14+offset], bytes[15+offset])

	// File modification timestamp
	offset += 16

	fmt.Println("File modification timestamp")
	fmt.Printf("%02X %02X %02X %02X %02X %02X %02X %02X %02X %02X %02X %02X\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset], bytes[6+offset], bytes[7+offset], bytes[8+offset], bytes[9+offset], bytes[10+offset], bytes[11+offset])
	fmt.Printf("%c %c %c %c %c %c %c %c %c %c %c %c\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset], bytes[6+offset], bytes[7+offset], bytes[8+offset], bytes[9+offset], bytes[10+offset], bytes[11+offset])

	// Owner ID
	offset += 12

	fmt.Println("Owner ID")
	fmt.Printf("%02X %02X %02X %02X %02X %02X\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset])
	fmt.Printf("%c %c %c %c %c %c\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset])

	// Group ID
	offset += 6

	fmt.Println("Group ID")
	fmt.Printf("%02X %02X %02X %02X %02X %02X\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset])
	fmt.Printf("%c %c %c %c %c %c\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset])

	// File mode
	offset += 6

	fmt.Println("File mode")
	fmt.Printf("%02X %02X %02X %02X %02X %02X %02X %02X\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset], bytes[6+offset], bytes[8+offset])
	fmt.Printf("%c %c %c %c %c %c %c %c\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset], bytes[6+offset], bytes[8+offset])

	// File modification timestamp
	offset += 8

	fmt.Println("File size in bytes")
	fmt.Printf("%02X %02X %02X %02X %02X %02X %02X %02X %02X %02X\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset], bytes[6+offset], bytes[7+offset], bytes[8+offset], bytes[9+offset])
	fmt.Printf("%c %c %c %c %c %c %c %c %c %c\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset], bytes[6+offset], bytes[7+offset], bytes[8+offset], bytes[9+offset])

	// Ending characters
	offset += 10

	fmt.Println("Ending characters")
	fmt.Printf("%02X %02X\n", bytes[0+offset], bytes[1+offset])

	fmt.Println(offset + 2)

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
	bytes := make([]byte, 512)

	bufr := bufio.NewReader(file)
	_, err = bufr.Read(bytes)
	check(err)

	// File Signature
	offset := 8

	dumpHeader(offset, bytes)

	offset = 72
	dumpHeader(offset, bytes)

	// fmt.Printf("%02X %02X %02X %02X %02X %02X %02X %02X\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset], bytes[6+offset], bytes[7+offset])
	// fmt.Printf("%c %c %c %c %c %c %c %c\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset], bytes[6+offset], bytes[7+offset])

	// // Globa' header for an ar file
	// offset = 8 + 0

	// fmt.Println("File identifier")
	// fmt.Printf("%02X %02X %02X %02X %02X %02X %02X %02X %02X %02X %02X %02X %02X %02X %02X %02X\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset], bytes[6+offset], bytes[7+offset], bytes[8+offset], bytes[9+offset], bytes[10+offset], bytes[11+offset], bytes[12+offset], bytes[13+offset], bytes[14+offset], bytes[15+offset])
	// fmt.Printf("%c %c %c %c %c %c %c %c %c %c %c %c %c %c %c %c\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset], bytes[6+offset], bytes[7+offset], bytes[8+offset], bytes[9+offset], bytes[10+offset], bytes[11+offset], bytes[12+offset], bytes[13+offset], bytes[14+offset], bytes[15+offset])

	// // File modification timestamp
	// offset = 8 + 16

	// fmt.Println("File modification timestamp")
	// fmt.Printf("%02X %02X %02X %02X %02X %02X %02X %02X %02X %02X %02X %02X\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset], bytes[6+offset], bytes[7+offset], bytes[8+offset], bytes[9+offset], bytes[10+offset], bytes[11+offset])
	// fmt.Printf("%c %c %c %c %c %c %c %c %c %c %c %c\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset], bytes[6+offset], bytes[7+offset], bytes[8+offset], bytes[9+offset], bytes[10+offset], bytes[11+offset])

	// // Owner ID
	// offset = 8 + 28

	// fmt.Println("Owner ID")
	// fmt.Printf("%02X %02X %02X %02X %02X %02X\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset])
	// fmt.Printf("%c %c %c %c %c %c\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset])

	// // Group ID
	// offset = 8 + 34

	// fmt.Println("Group ID")
	// fmt.Printf("%02X %02X %02X %02X %02X %02X\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset])
	// fmt.Printf("%c %c %c %c %c %c\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset])

	// // File mode
	// offset = 8 + 40

	// fmt.Println("File mode")
	// fmt.Printf("%02X %02X %02X %02X %02X %02X %02X %02X\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset], bytes[6+offset], bytes[8+offset])
	// fmt.Printf("%c %c %c %c %c %c %c %c\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset], bytes[6+offset], bytes[8+offset])

	// // File modification timestamp
	// offset = 8 + 48

	// fmt.Println("File size in bytes")
	// fmt.Printf("%02X %02X %02X %02X %02X %02X %02X %02X %02X %02X\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset], bytes[6+offset], bytes[7+offset], bytes[8+offset], bytes[9+offset])
	// fmt.Printf("%c %c %c %c %c %c %c %c %c %c\n", bytes[0+offset], bytes[1+offset], bytes[2+offset], bytes[3+offset], bytes[4+offset], bytes[5+offset], bytes[6+offset], bytes[7+offset], bytes[8+offset], bytes[9+offset])

	// // Ending characters
	// offset = 8 + 58

	// fmt.Println("Ending characters")
	// fmt.Printf("%02X %02X\n", bytes[0+offset], bytes[1+offset])

}
