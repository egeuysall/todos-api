package api

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/egeuysall/todos-api/db"
	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5"
)

func HandleRoot(w http.ResponseWriter, r *http.Request) {
	response := map[string]string{
		"message": "Welcome to Todos API v1. Available routes: POST /v1/todos, GET /v1/todos/{id}, DELETE /v1/todos/{id}, PATCH /v1/todos/{id}, GET /ping",
	}
	SendJson(w, response, http.StatusOK)
}

func CheckPing(w http.ResponseWriter, r *http.Request) {
	response := map[string]string{
		"status": "pong",
	}
	SendJson(w, response, http.StatusOK)
}

func CreateTodo(w http.ResponseWriter, r *http.Request) {
	var todo db.Todo
	err := json.NewDecoder(r.Body).Decode(&todo)

	if err != nil {
		log.Printf("JSON decode error in CreateTodo: %v", err)
		SendError(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}

	err = db.CreateTodo(r.Context(), todo)

	if err != nil {
		log.Printf("Database error in CreateTodo: %v", err)
		SendError(w, "Failed to create todo", http.StatusInternalServerError)
		return
	}

	response := map[string]string{"message": "Todo created successfully"}
	SendJson(w, response, http.StatusCreated)
}

func GetTodo(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	if id == "" {
		SendError(w, "Missing todo ID", http.StatusBadRequest)
		return
	}

	todo, err := db.GetTodo(r.Context(), id)

	if err != nil {
		if err == pgx.ErrNoRows {
			SendError(w, "Todo not found", http.StatusNotFound)
		} else {
			log.Printf("Database error in GetTodo: %v", err)
			SendError(w, "Failed to retrieve todo", http.StatusInternalServerError)
		}
		return
	}

	SendJson(w, todo, http.StatusOK)
}

func DeleteTodo(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	if id == "" {
		SendError(w, "Missing todo ID", http.StatusBadRequest)
		return
	}

	err := db.DeleteTodo(r.Context(), id)

	if err != nil {
		if err == pgx.ErrNoRows {
			SendError(w, "Todo not found", http.StatusNotFound)
		} else {
			log.Printf("Database error in DeleteTodo: %v", err)
			SendError(w, "Failed to delete todo", http.StatusInternalServerError)
		}
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func UpdateTodo(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var updatedTodo db.Todo
	
	if id == "" {
		SendError(w, "Missing todo ID", http.StatusBadRequest)
		return
	}

	err := json.NewDecoder(r.Body).Decode(&updatedTodo)

	if err != nil {
		log.Printf("JSON decode error in UpdateTodo: %v", err)
		SendError(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}

	err = db.UpdateTodo(r.Context(), id, updatedTodo)
	
	if err != nil {
		if err == pgx.ErrNoRows {
			SendError(w, "Todo not found", http.StatusNotFound)
		} else {
			log.Printf("Database error in UpdateTodo: %v", err)
			SendError(w, "Failed to update todo", http.StatusInternalServerError)
		}
		return
	}

	w.WriteHeader(http.StatusNoContent)
}