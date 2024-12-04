# Mail

FastSchema provides a simple and flexible API for sending emails. The `fs.Mailer` interface is a contract that defines how to send emails.

Supported mail drivers:
- SMTP

::: warning Help Wanted

The FastSchema mail system is still in its early stages and lacks support for many mail drivers.

If you're using an unsupported mail driver, please consider contributing a driver for it or requesting support via [GitHub issues](https://github.com/fastschema/fastschema/issues)

:::


## Mailer interface

A `fs.Mailer` is an interface that defines how to send emails.

```go
type Mailer interface {
	Send(mail *Mail, froms ...mail.Address) error
	Name() string
	Driver() string
}

type Mail struct {
	Subject string
	Body    string
	To      []string
	CC      []string
	BCC     []string
}
```

## Configuration

```go
type MailConfig struct {
	SenderName        string `json:"sender_name"`
	SenderMail        string `json:"sender_mail"`
	DefaultClientName string `json:"default_client"`
	Clients           []Map  `json:"clients"`
}

// type Map map[string]interface{}
```

- `sender_name`: The name of the sender, if not provided, the application name will be used.
- `sender_mail`: The email of the sender.
- `default_client`: The default client name to use.
- `clients`: A list of mail clients.

For example, the following configuration will create two mail clients, `smtp` and `mailtrap`.

```json
{
  "sender_name": "FastSchema Accounts",
  "sender_mail": "accounts@fastschema.com",
  "default_client": "mailtrapsmtp",
  "clients": [
    {
      "name": "mailtrapsmtp",
      "driver": "smtp",
      "host": "sandbox.smtp.mailtrap.io",
      "port": 2525,
      "username": "username",
      "password": "password"
    }
  ]
}
```

There are two methods for configuring mail:

- Using environment variables:
  - `MAIL`: A string representing a JSON object with mail configurations `fs.MailConfig`.
- Using application configuration:
  - `app.Config.MailConfig`: A `fs.MailConfig` object with mail configurations.

If there is no configuration for the default mail client, the first mail client in the configuration will be used as the default mailer.
