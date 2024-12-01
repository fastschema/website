# Realtime Updates

FastSchema Realtime API allows you to subscribe to real-time updates for your schema records. You can receive notifications when a record is created, updated, or deleted. This enables you to build real-time applications that respond to changes in your schema data.

FastSchema emits events whenever a schema record is created, updated, or deleted. These events are transmitted via `WebSocket` connections. Each event message contains the operation data, which includes details about the change.

## Authentication

To connect to the FastSchema Realtime API, you need to authenticate using a valid Access Token. Refer to the [Authentication](http://localhost:3001/docs/backend/authentication.html#authentication-1) section for more information on how to obtain an Access Token.

To authenticate your WebSocket connection, you need to include the Access Token in the handshake request.

In case the WebSocket client supports the `Authorization` header, you can include the Access Token in the header as follows:

```http{2}
GET /api/realtime/content HTTP/1.1
Authorization: Bearer <access token>
```

In browsers, the WebSocket API doesn't allow you to set arbitrary headers with the HTTP handshake like `Authorization`.

Luckily, the browser WebSocket API allows you to set the `Sec-WebSocket-Protocol` header, which can be used to pass the Access Token.

FastSchema Realtime API accepts the Access Token in the `Sec-WebSocket-Protocol` header. You can include the Access Token in the `Sec-WebSocket-Protocol` header as follows:

```http{2}
GET /api/realtime/content HTTP/1.1
Sec-WebSocket-Protocol: Authorization, <access token>
```

**Example:**

```javascript
const ws = new WebSocket(
  "wss://fs-tests.com/realtime/content?queryString...",
  ["Authorization", "<jwt token>"]
);
```

## Parameters

### schema (required)

The schema parameter is required to subscribe to real-time updates for a specific schema. You need to include the schema parameter in the WebSocket URL query string.

```http{2}
wss://fs-tests.com/api/realtime/content?schema=blog
```

### event

The `event` parameter allows you to subscribe to specific events. You can include the event parameter in the WebSocket URL query string to filter the events you want to receive.

Supported event values:

- `create`: Subscribe to create events.
- `update`: Subscribe to update events.
- `delete`: Subscribe to delete events.
- `*`: Subscribe to all events.

::: tip
If you don't specify the event parameter, you will receive all events by default.
:::

```http{2}
wss://fs-tests.com/api/realtime/content?schema=blog&event=create
```

### id

The `id` parameter allows you to subscribe to updates for a specific record.

A record specific event will be emitted when the record with the specified id is created, updated, or deleted.

```http{2}
wss://fs-tests.com/api/realtime/content?schema=blog&id=123
```

### select

The `select` parameter allows you to specify the fields you want to receive in the event data.

When you include the `select` parameter, the event data will only include the specified fields.

```http{2}
wss://fs-tests.com/api/realtime/content?schema=blog&select=name,tags
```

### filter

The `filter` parameter allows you to subscribe to events based on a filter condition.

The filter parameter should be a valid JSON object that specifies the filter condition, refer to the [Filter](/docs/backend/list-records.html#filter) section for more information on how to construct filter conditions.

Any updates performed on records that don't match the filter condition will not trigger an event.

```http{2}
wss://fs-tests.com/api/realtime/content?schema=blog&filter={"status":"published"}
```

## Event create

The `create` event is emitted when a new schema record is created. The event message contains the operation data, which includes the newly created record.

```json
{
  "event": "create",
  "data": {
    "id": "123",
    "title": "Hello World",
    "content": "This is a test post",
    "author": "John Doe",
    "created_at": "2021-10-01T12:00:00Z",
    "updated_at": "2021-10-01T12:00:00Z"
  }
}
```

## Event update

The `update` event is emitted when an existing schema record is updated. The event message contains the operation data, which includes the updated records.

```json
{
  "event": "update",
  "data": [
    {
      "id": "123",
      "title": "Hello World",
      "content": "This is an updated post",
      "author": "John Doe",
      "created_at": "2021-10-01T12:00:00Z",
      "updated_at": "2021-10-01T12:05:00Z"
    },
    {
      "id": "124",
      "title": "New Post",
      "content": "This is a new post",
      "author": "Jane Doe",
      "created_at": "2021-10-01T12:00:00Z",
      "updated_at": "2021-10-01T12:00:00Z"
    }
  ]
}
```

## Event delete

The `delete` event is emitted when a schema record is deleted. The event message contains the operation data, which includes the list of deleted records.

```json
{
  "event": "delete",
  "data": [
    {
      "id": "123",
      "title": "Hello World",
      "content": "This is a test post",
      "author": "John Doe",
      "created_at": "2021-10-01T12:00:00Z",
      "updated_at": "2021-10-01T12:00:00Z"
    },
    {
      "id": "124",
      "title": "New Post",
      "content": "This is a new post",
      "author": "Jane Doe",
      "created_at": "2021-10-01T12:00:00Z",
      "updated_at": "2021-10-01T12:00:00Z"
    }
  ]
}
```

## Example

Here’s an example of how to establish a WebSocket connection using vanilla JavaScript:

```javascript
const ws = new WebSocket("wss://fs-tests.com/realtime/content?schema=blog");

ws.onopen = function (event) {
  console.log("Connected to the FastSchema Realtime API");
};

ws.onmessage = function (event) {
  const message = JSON.parse(event.data);
  console.log("Received message:", message);
};

ws.onerror = function (error) {
  console.log("WebSocket Error:", error);
};

ws.onclose = function (event) {
  console.log("WebSocket connection closed:", event);
};
```

## Handling Events

The realtime api emits events with data that represents the following interface:

```typescript
type EventType = 'create' | 'update' | 'delete';
interface EventData<T> {
  event: EventType;
  data: T | T[]
}
```

::: tip
The `data` property of the event message contains the operation data, which includes the record(s) that were created, updated, or deleted.

`T` represents the schema record type.
:::

You can handle events by checking the event property of the received message and performing the appropriate actions based on the event type.

```javascript
ws.onmessage = function (event) {
  const message = JSON.parse(event.data);
};
```

The `event.data` is a JSON string that you have to parse to get the event data.

```javascript
ws.onmessage = function (event) {
  const message = JSON.parse(event.data);

  switch (message.event) {
    case "create":
      handleCreateEvent(message.data);
      break;
    case "update":
      handleUpdateEvent(message.data);
      break;
    case "delete":
      handleDeleteEvent(message.data);
      break;
    default:
      console.log("Unknown event:", message.event);
  }
};

function handleCreateEvent(data) {
  console.log(`New record created:`, data);
  // Add your logic to handle the create event
}

function handleUpdateEvent(data) {
  console.log(`Updated record:`, data);
  // Add your logic to handle the update event
}

function handleDeleteEvent(data) {
  console.log(`Deleted record:`, data);
  // Add your logic to handle the delete event
}
```

## Unsubscribing

To unsubscribe from real-time updates, you can close the WebSocket connection.

```javascript
ws.close();
```

## Using SDK

You can also use the FastSchema SDK to subscribe to real-time updates. The SDK provides a convenient way to connect to the FastSchema Realtime API and handle events.

Refer to the [FastSchema SDK](/docs/sdk/) documentation for more information on how to use the SDK to subscribe to real-time updates.
