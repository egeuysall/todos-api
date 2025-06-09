package api

import (
	"encoding/json"
	"log"
	"net/http"
)

func SendJson(w http.ResponseWriter, data interface{}, statusCode int) {
	w.WriteHeader(statusCode)
	
	err := json.NewEncoder(w).Encode(data)
	if err != nil {
		log.Printf("Failed to encode JSON response: %v", err)
	}
}

func SendError(w http.ResponseWriter, message string, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	
	errorResponse := map[string]string{"error": message}
	err := json.NewEncoder(w).Encode(errorResponse)
	if err != nil {
		log.Printf("Failed to encode error response: %v", err)
	}
}