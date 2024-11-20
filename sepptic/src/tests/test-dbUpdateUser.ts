import { dbUpdateEmail } from '../server/utils/dbUpdateUser';
import { dbUpdateName } from '../server/utils/dbUpdateUser';
import { dbUpdatePassword } from '../server/utils/dbUpdateUser';

// Test that the function dbCreateUser returns the correct userId when given valid input.
const name: string = 'James Davidson';
const email: string = 'test@example.com';
const password: string = 'UVU2024!';
const userId: number = 2;
const result1 = await dbUpdateEmail(email, userId);
const result2 = await dbUpdateName(name, userId);
const result3 = await dbUpdatePassword(password, userId);
console.log(result1);
console.log(result2);
console.log(result3);

// Run this function with the following command:
// npx ts-node ./src/tests/test-dbCreateUser.ts