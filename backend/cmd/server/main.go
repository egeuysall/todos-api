package main

import (
	"log"
	"net/http"

	"github.com/egeuysall/todos-api/api"
	"github.com/egeuysall/todos-api/db"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Connect to the database
	db := db.Connect()
	defer db.Close()

	// Define the router
	router := api.NewRouter()

	// Start the server
	log.Printf("Server starting on http://localhost:8080")
	err = http.ListenAndServe(":8080", router)

	if err != nil {
		log.Fatal(err)
	}
}