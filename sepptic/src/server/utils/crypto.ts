import bcrypt from 'bcryptjs';

export async function encodePassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export async function validatePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
}