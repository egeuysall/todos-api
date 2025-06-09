package db

import (
	"context"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Todo struct {
	Id        string `json:"id"`
	Text      string `json:"text"`
	Completed bool   `json:"completed"`
}

var Db *pgxpool.Pool

func GetTodo(ctx context.Context, id string) (Todo, error) {
	var todo Todo
	query := `SELECT id, text, completed FROM todos WHERE id = $1`

	err := Db.QueryRow(ctx, query, id).Scan(&todo.Id, &todo.Text, &todo.Completed)

	return todo, err
}

func CreateTodo(ctx context.Context, todo Todo) error {
	query := `INSERT INTO todos (text, completed) VALUES ($1, $2)`

	_, err := Db.Exec(ctx, query, todo.Text, todo.Completed)

	return err
}

func DeleteTodo(ctx context.Context, id string) error {
	query := `DELETE FROM todos WHERE id = $1`
	count, err := Db.Exec(ctx, query, id)

	if err != nil {
		return err
	}

	if count.RowsAffected() == 0 {
		return pgx.ErrNoRows
	}

	return nil
}

func UpdateTodo(ctx context.Context, id string, todo Todo) error {
	query := `UPDATE todos SET text = $1, completed = $2 WHERE id = $3`

	count, err := Db.Exec(ctx, query, todo.Text, todo.Completed, id)

	if err != nil {
		return err
	}

	if count.RowsAffected() == 0 {
		return pgx.ErrNoRows
	}

	return nil
}