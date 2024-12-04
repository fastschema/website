// Setter for user.password field
// Check if the field has value
let hasValue = $args.Exist && $args.Value != '';

// If has value, hash it
// If not, set it to undefined to avoid saving empty string
$hasValue ? $hash($args.Value) : $undefined
