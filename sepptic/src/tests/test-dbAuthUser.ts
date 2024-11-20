import dbAuthUser from '../server/utils/dbAuthUser';

// Test that the function dbAuthUser returns true or false when given valid input.
const email = 'JD24@gmail.com';
const password = 'UVU2024!';
const result = await dbAuthUser(email, password);
console.log(result);

// Run this function with the following command:
// npx ts-node ./src/tests/test-dbCreateUser.ts