# Directory structure

At the first run, FastSchema will create the following directory structure:

```shell
. // The root directory
└── data
    ├── .env
    ├── fastschema.db
    ├── logs
    │   └── app.log
    ├── migrations
    │   ├── 20240524115604_changes.down.sql
    │   ├── 20240524115604_changes.up.sql
    │   └── atlas.sum
    ├── public
    └── schema
```

- `.env`: The environment file contains the application configuration.
- `fastschema.db`: The SQLite database file.
- `logs`: The directory contains log files.
- `migrations`: Used to store database migration files.
    - `*.up.sql`: The SQL file to upgrade the database schema.
    - `*.down.sql`: The SQL file to downgrade the database schema.
- `public`: Used to store application uploads.
- `schema`: Used to store schema JSON files.
