// Get the current authenticated user ID
let authUserId = $context.User().ID;

// Context user does not include the credit information
// Query the database to get the user's credit information
let users = $db.Query($context, "SELECT * FROM users WHERE id = ?", authUserId);

// Check if the user has enough credit
users[0].Get("credit") > 10
