// Get the current authenticated user ID
let authUserId = $context.User().ID;

// Modify the request filter to include the author_id
let requestFilter = $context.Arg('filter', '{}');
let authorFilter = $sprintf('{"author_id": %d}', authUserId);
let combinedFilter = $sprintf('{"$and": [%s, %s]}', requestFilter, authorFilter);

// Update the filter argument with the combined filter
// This will ensure that the user can only see their own posts
let _ = $context.SetArg('filter', combinedFilter);

// Return true to continue the request
true
