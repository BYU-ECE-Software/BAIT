import bcrypt from 'bcryptjs';

// Hashes a password
export async function encodePassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

// Validates a password against a hash
export async function validatePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
}