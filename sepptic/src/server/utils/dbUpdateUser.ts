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

async function validateUserID(User_ID: number) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
        where: {
            User_ID: User_ID
        }
    });
    prisma.$disconnect();
    return user;
}

// Functions to update Database
async function putEmail(email: string, User_ID: number) {
    const prisma = new PrismaClient();
    try {
        await prisma.user.update({
            where: {
                User_ID: User_ID
            },
            data: {
                Email: email
            }
        });
        return {
            "success": true,
            "message": "Email updated successfully",
            "status": 200
        }
    } catch (e) {
        return {
            "success": false,
            "message": "Error updating email: " + e,
            "status": 500
        }
    }
}





// Helper function to write to the database. Returns the userId of the new user.
// async function writeToDatabase(email: string, hash: string, name: string) {
//     const prisma = new PrismaClient();
//     try {
//         const user = await prisma.user.create({
//             data: {
//                 Email: email,
//                 Password: hash,
//                 Name: name
//             }
//         });
//         const userId = user.User_ID;
//         return {
//             userId: userId,
//             message: 'User created successfully',
//             status: 200
//         }
//     } catch (e) {
//         return {
//             userId: null,
//             message: 'Error creating user: ' + e,
//             status: 500
//         }
//     }
// }


// Function to update email
export async function dbUpdateEmail(email: string, User_ID: number) {
    if (!validateEmail(email)) {
        return {
            "success": false,
            "message": "Invalid email",
            "status": 400
        }
    }

    if (!uniqueEmail(email)) {
        return {
            "success": false,
            "message": "This email is already in use",
            "status": 400
        }
    }

    if (!validateUserID(User_ID)) {
        return {
            "success": false,
            "message": "User does not exist",
            "status": 404
        }
    }

    return putEmail(email, User_ID)
}