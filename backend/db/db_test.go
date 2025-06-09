package db

import (
	"context"
	"testing"

	"github.com/joho/godotenv"
)

func TestConnect(t *testing.T) {
	godotenv.Load("../.env")
	pool := Connect()
	if pool == nil {
		t.Fatal("Failed to connect to database: pool is nil")
	}

	// Ping the DB to verify connection
	err := pool.Ping(context.Background())
	if err != nil {
		t.Fatalf("Failed to ping database: %v", err)
	}
}