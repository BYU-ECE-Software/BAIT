import dbCreateSession from '$lib/logic/dbCreateSession';

// Test that the function dbCreateSession returns the session ID and token when given valid input.
const userId: number = 5;
const result = await dbCreateSession(userId);
console.log(result);

// Run this function with the following command:
// npx tsx ./src/tests/test-dbCreateSession.ts