package db

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

func Connect() *pgxpool.Pool {
	connStr := os.Getenv("SUPABASE_URL")

	if connStr == "" {
		log.Fatal("SUPABASE_URL not set in environment")
	}

	ctx := context.Background()
	pool, err := pgxpool.New(ctx, connStr)

	if err != nil {
		log.Fatalf("Unable to connect to database: %s", err)
	}

	return pool
}
