
// This file holds the state on whether a user is authenticated.
export const isAuthenticated = $state({
    isAuthenticated: false
})

export function signOut(): void {
    console.log("Signing out. . .");
    isAuthenticated.isAuthenticated = false;
}

export function signIn(): void{
    console.log("Signing in. . .");
    isAuthenticated.isAuthenticated = true;
}

