// Helper functions to validate email, password, and name. Returns true if input is valid, false otherwise.
function validateEmail(email: string) {
    const re = /^[\w-+\.]+@([\w-]+\.)+[\w-]{2,4}$/;
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
    if (name.length > 75) {
        return false;
    }
    return true;
}


// Main function to create a new user in the database. Returns an object with the userId, message, and status.
export default function dbCreateUser(email: string, password: string, name: string) {
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
            message: 'Invalid name. Name must be between 2 and 75 characters long.',
            status: 400
        }
    }



}