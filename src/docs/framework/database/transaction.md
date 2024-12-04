# Database Transaction

FastSchema supports performing multiple operations in a single transaction.

To create a transaction, use the `Tx` method of the database client.

**Example:**

```go{2}
ctx := context.Background()
tx, _ := client.Tx(ctx)
tag1, _ := db.Builder[Tag](tx).Create(ctx, fs.Map{
  "name": "Tag 1",
  "desc": "Tag 1 description",
})
tag2, _ := db.Builder[Tag](tx).Create(ctx, fs.Map{
  "name": "Tag 2",
  "desc": "Tag 2 description",
})

blog, err := db.Builder[Blog](tx).Create(ctx, fs.Map{
  "title": "Hello World",
  "body":  "This is a blog post",
  "tags": []*schema.Entity{
    schema.NewEntity(tag1.ID),
    schema.NewEntity(tag2.ID),
  },
})

tx.Commit()
// tx.Rollback()
```

## Commit

```go
func (tx *Tx) Commit() error
```

The `Commit` method is used to commit a transaction. If the transaction is not committed, the changes will not be saved.

`Commit` returns an error if the transaction cannot be committed.

## Rollback

```go
func (tx *Tx) Rollback() error
```

The `Rollback` method is used to roll back a transaction. If the transaction is not rolled back, the changes will be saved.

`Rollback` returns an error if the transaction cannot be rolled back.

## WithTx

```go
func WithTx(client Client, c context.Context, fn func(tx Client) error) (err error)
```

The `WithTx` method is used to execute a function within a transaction. If the `fn` function returns an error, the transaction will be rolled back; otherwise, it will be committed.

`WithTx` returns an error if the transaction fails (e.g., if the transaction cannot be started, committed, rolled back, or if the `fn` function returns an error).

**Example:**

```go
err := db.WithTx(client, context.Background(), func(tx db.Client) error {
  tag1, _ := db.Builder[Tag](tx).Create(ctx, fs.Map{
    "name": "Tag 1",
    "desc": "Tag 1 description",
  })
  tag2, _ := db.Builder[Tag](tx).Create(ctx, fs.Map{
    "name": "Tag 2",
    "desc": "Tag 2 description",
  })

  blog, err := db.Builder[Blog](tx).Create(ctx, fs.Map{
    "title": "Hello World",
    "body":  "This is a blog post",
    "tags": []*schema.Entity{
      schema.NewEntity(tag1.ID),
      schema.NewEntity(tag2.ID),
    },
  })

  return err
})
```
