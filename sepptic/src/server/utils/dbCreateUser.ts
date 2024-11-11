import { PrismaClient } from '@prisma/client';
import { encodePassword } from './crypto';

// Helper functions to validate email, password, and name. Returns true if input is valid, false otherwise.
async function uniqueEmail(email: string) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
        where: {
            Email: email
        }
    });
    return user === null;
}

async function validateEmail(email: string) {
    const re: RegExp = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
}

function validatePassword(password: string) {
    if (password.length < 8) {
        return false;
    }
    if (password.toLowerCase() === password) {
        return false;
    }
    if (!/\d/.test(password)) {
        return false;
    }
    return true;
}

function validateName(name: string) {
    if (name.length < 2) {
        return false;
    }
    if (name.length > 100) {
        return false;
    }
    return true;
}


// Helper function to write to the database. Returns the userId of the new user.
async function writeToDatabase(email: string, hash: string, name: string) {
    const prisma = new PrismaClient();
    try {
        const user = await prisma.user.create({
            data: {
                Email: email,
                Password: hash,
                Name: name
            }
        });
        const userId = user.User_ID;
        return {
            userId: userId,
            message: 'User created successfully',
            status: 200
        }
    } catch (e) {
        return {
            userId: null,
            message: 'Error creating user: ' + e,
            status: 500
        }
    }
}


// Main function to create a new user in the database. Returns an object with the userId, message, and status.
export default async function dbCreateUser(email: string, password: string, name: string) {
    // Ensure email is unique
    if (!await uniqueEmail(email)) {
        return {
            userId: null,
            message: 'Email already in use',
            status: 400
        }
    }

    // Validate email, password, and name
    if (!validateEmail(email)) {
        return {
            userId: null,
            message: 'Invalid email',
            status: 400
        }
    }

    if (!validatePassword(password)) {
        return {
            userId: null,
            message: 'Invalid password. Passwords must be at least 8 characters long, contain at least one number, and contain at least one uppercase letter.',
            status: 400
        }
    }

    if (!validateName(name)) {
        return {
            userId: null,
            message: 'Invalid name. Name must be between 2 and 100 characters long.',
            status: 400
        }
    }

    // Hash the password
    const hash = await encodePassword(password);

    // Write to the database
    const response = await writeToDatabase(email, hash, name);

    return response;
}