import { dbUpdateEmail } from '../server/utils/dbUpdateUser';

// Test that the function dbCreateUser returns the correct userId when given valid input.
const name: string = 'Ethan Beere';
const email: string = 'ethanbeere123@gmail.com';
const password: string = 'BYU2024!';
const userId: number = 1;
const result = await dbUpdateEmail(email, userId);
console.log(result);

// Run this function with the following command:
// npx ts-node ./src/tests/test-dbCreateUser.ts