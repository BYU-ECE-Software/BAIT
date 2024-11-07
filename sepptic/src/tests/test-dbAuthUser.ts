import dbAuthUser from '../server/utils/dbAuthUser';

// Test that the function dbAuthUser returns true or false when given valid input.
const email = 'ethanbeere123@gmail.com';
const password = 'GoCougs2024!';
const result = await dbAuthUser(email, password);
console.log(result);

// Run this function with the following command:
// npx ts-node ./src/tests/test-dbCreateUser.ts