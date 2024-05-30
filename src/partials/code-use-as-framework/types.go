package main

type Tag struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Desc  string  `json:"desc"`
	Blogs []*Blog `json:"blogs" fs.relation:"{'type':'m2m','schema':'blog','field':'tags','owner':true}"`
}

type Blog struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Body  string `json:"body"`
	Vote  int    `json:"vote"`
	Tags  []*Tag `json:"tags" fs.relation:"{'type':'m2m','schema':'tag','field':'blogs'}"`
}

type Payload struct {
	ID      int    `json:"id"`
	Comment string `json:"comment"`
}

type Response struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}
