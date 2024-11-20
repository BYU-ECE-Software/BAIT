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

//Function to update name
async function putName(name: string, User_ID: number) {
    const prisma = new PrismaClient();
    try {
        await prisma.user.update({
            where: {
                User_ID: User_ID
            },
            data: {
                Name: name
            }
        });
        return {
            "success": true,
            "message": "Name updated successfully",
            "status": 200
        };
    } catch (e) {
        return {
            "success": false,
            "message": "Error updating name: " + e,
            "status": 500
        };
    } finally {
        await prisma.$disconnect();
    }
}

// Function to update password
async function putPassword(password: string, User_ID: number) {
    const prisma = new PrismaClient();
    try {
        await prisma.user.update({
            where: {
                User_ID: User_ID
            },
            data: {
                Password: password
            }
        });
        return {
            "success": true,
            "message": "Password updated successfully",
            "status": 200
        };
    } catch (e) {
        return {
            "success": false,
            "message": "Error updating Password: " + e,
            "status": 500
        };
    } finally {
        await prisma.$disconnect();
    }
}

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

//Function to update name
export async function dbUpdateName(name: string, User_ID: number) {
    if (!validateName(name)) {
        return {
            "success": false,
            "message": "Invalid name: must be between 2 and 100 characters.",
            "status": 400
        };
    }

    const user = await validateUserID(User_ID);
    if (!user) {
        return {
            "success": false,
            "message": "User does not exist",
            "status": 404
        };
    }

    return putName(name, User_ID);
}

export async function dbUpdatePassword(password: string, User_ID: number) {
    // Validate the password
    if (!validatePassword(password)) {
        return {
            success: false,
            message: "Invalid password: must be at least 8 characters, include a mix of uppercase letters, and contain at least one number.",
            status: 400
        };
    }

    // Validate User_ID
    const user = await validateUserID(User_ID);
    if (!user) {
        return {
            success: false,
            message: "User does not exist",
            status: 404
        };
    }

    // Hash password
    const hash = await encodePassword(password);

    // Update the password in the database
    return putPassword(hash, User_ID);
}