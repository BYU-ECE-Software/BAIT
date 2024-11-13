
// This file holds the state on whether a user is authenticated.
export const isAuthenticated = $state({
    isAuthenticated: false
})

export function signOut(): void {
    isAuthenticated.isAuthenticated = false;
}

export function signIn(): void{
    isAuthenticated.isAuthenticated = true;
}

