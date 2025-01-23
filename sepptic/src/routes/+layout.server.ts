import { signIn, signOut } from "$lib/auth.svelte";
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
    console.log(cookies.getAll()); // Logs all cookies visible to the server
    const sessionToken = cookies.get('token');

    if (!sessionToken) {
        console.log("Session token not found");
        signOut();
        return { isLoggedIn: false };
    }

    // Validate the session with the backend
    const response = await fetch('/api/profile', {
        headers: { 'Authorization': `Bearer ${sessionToken}` }
    });

    if (!response.ok) {
        console.log("Response not okay");
        signOut();
        return { isLoggedIn: false };
    }

    console.log("This should authenticate");

    const user = await response.json();
    signIn();
    return {
        isLoggedIn: true
    };

}

