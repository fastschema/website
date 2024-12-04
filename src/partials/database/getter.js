// In some cases, the password should be kept as it is
// (e.g. when checking the login credentials).
// In the other cases, remove the password value to avoid exposing it

// If the context value keeppassword is true,
// keep the password as it is,
// otherwise remove the password value.
let keepPassword = $context.Value('keeppassword') == 'true';

// Return $undefined to remove the password value
keepPassword ? $args.Value : $undefined
