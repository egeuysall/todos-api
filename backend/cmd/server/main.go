package main

import (
	"context"
	"log"
	"net/http"
	"time"

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
	dbConn := db.Connect()
	defer dbConn.Close()

	// Assign db connection
	db.Db = dbConn

	// Define the router
	router := api.NewRouter()

	go func() {
		ticker := time.NewTicker(3 * time.Minute)
		defer ticker.Stop()
		for {
			<-ticker.C
			err := db.DeleteDoneTodos(context.Background())
			
			if err != nil {
				log.Printf("Error cleaning up expired payloads: %v\n", err)
			} else {
				log.Println("Expired payloads cleaned up.")
			}
		}
	}()

	// Start the server
	log.Printf("Server starting on https://todosapi.egeuysal.com/")
	err = http.ListenAndServe(":8080", router)

	if err != nil {
		log.Fatal(err)
	}
}