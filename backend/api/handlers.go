package api

import "net/http"

func HandleRoot(w http.ResponseWriter, r *http.Request) {
	response := map[string]string{
		"message": "Welcome to Todos API v1. Available routes: POST /v1/todos, GET /v1/todos/{id}, DELETE /v1/todos/{id}, PATCH /v1/todos/{id}, GET /ping",
	}
	SendJson(w, response, http.StatusOK)
}

func CheckPing(w http.ResponseWriter, r *http.Request) {
	SendJson(w, map[string]string{"status": "pong"}, http.StatusOK)
}

func CreateTodo() {

}

func GetTodo() {

}

func DeleteTodo() {

}

func UpdateTodo() {

}