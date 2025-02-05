import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, fetch }) => {// Logs all cookies visible to the server
    const sessionToken = cookies.get('token');

    if (!sessionToken) {
        console.log("Session token not found");
        return { isLoggedIn: false };
    }

    // Validate the session with the backend
    const response = await fetch('/api/profile', {
        headers: { 'Authorization': `Bearer ${sessionToken}` }
    });

    if (!response.ok) {
        return { isLoggedIn: false };
    }

    const userData = await response.json();

    return {
        isLoggedIn: true,
        email: userData.email ?? null
    };
}
