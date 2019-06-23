package main

import (
	"flag"
	"fmt"
	log "github.com/dsoprea/go-logging"
	"os"
	".."
)

var (
	filepathArg     = ""
)

// driver for develop
func main() {
	flag.StringVar(&filepathArg, "filepath", "", "File-path of image")
	flag.Parse()

	if filepathArg == "" {
		fmt.Printf("Please provide a file-path for an image.\n")
		os.Exit(1)
	}

	f, err := os.Open(filepathArg)
	log.PanicIf(err)

	exif := phantomtype.ExtractExif(f)

	fmt.Printf("%v", exif)
}

