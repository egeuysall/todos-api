package db

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

func Connect() *pgxpool.Pool {
	connStr := os.Getenv("SUPABASE_URL")

	if connStr == "" {
		log.Fatal("SUPABASE_URL not set in environment")
	}

	config, err := pgxpool.ParseConfig(connStr)
	if err != nil {
		log.Fatal("Failed to parse database URL: ", err)
	}
	
	config.ConnConfig.DefaultQueryExecMode = pgx.QueryExecModeSimpleProtocol
	config.MaxConns = 10
	config.MinConns = 2
	config.MaxConnIdleTime = 30 * time.Minute

	ctx := context.Background()
	pool, err := pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		log.Fatal("Failed to create database pool: ", err)
	}

	err = pool.Ping(ctx)
	if err != nil {
		log.Fatal("Unable to ping database: ", err)
	}

	log.Println("Successfully connected to Supabase database")
	return pool
}