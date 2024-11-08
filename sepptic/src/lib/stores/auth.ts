import { writable } from 'svelte/store';

export const isAuthenticated = writable(false);
export function signIn() {
    isAuthenticated.set(true);
}
export function signOut() {
    isAuthenticated.set(false);
}
