package main

import (
	"fmt"
	"log"

	"github.com/fastschema/fastschema"
	"github.com/fastschema/fastschema/db"
	"github.com/fastschema/fastschema/fs"
)

func main() {
	app, _ := fastschema.New(&fs.Config{
		SystemSchemas: []any{Tag{}, Blog{}},
	})

	app.API().Add(fs.Post("/blogvote", func(c fs.Context, vote *Payload) (*Response, error) {
		_, err := db.Mutation[Blog](app.DB()).
			Where(db.EQ("id", vote.ID)).
			Update(c.Context(), fs.Map{
				"$expr": fs.Map{"vote": "vote + 1"},
			})

		return &Response{
			Success: err == nil,
			Message: fmt.Sprintf("Vote for %d: %v", vote.ID, err),
		}, nil
	}))

	log.Fatal(app.Start())
}
