package api

import (
	"time"

	appmid "github.com/egeuysall/todos-api/middleware"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/httprate"
)

func NewRouter() *chi.Mux {
	// Create chi router
	r := chi.NewRouter()

	// Define middleware
	r.Use(
		middleware.Recoverer,
		middleware.RealIP,
		middleware.Timeout(10 * time.Second),
		middleware.NoCache,
		middleware.Compress(5),
		httprate.LimitByIP(3, 3*time.Second),
		appmid.SetContentType(),
		appmid.Cors(),
	)

	// Define routes
	r.Get("/", HandleRoot)
	r.Get("/ping", CheckPing)

	r.Route("/v1", func(r chi.Router) {
		r.Post("/todos", CreateTodo)
		r.Group(func(r chi.Router) {
			r.Use(appmid.Auth())
			r.Get("/todos/{id}", GetTodo)
			r.Delete("/todos/{id}", DeleteTodo)
			r.Patch("/todos/{id}", UpdateTodo)
		})
	})

	return r
} 