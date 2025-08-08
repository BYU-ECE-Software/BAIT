// // src/hooks.server.ts
// export const handle = async ({ event, resolve }) => {
//   console.log('origin header:', event.request.headers.get('origin'));
//   console.log('url.origin:', event.url.origin);
//   return resolve(event);
// };
// Used to test for CSRF issues and same-origin mismatches
import type { Handle } from '@sveltejs/kit'
import dbGetUser from './server/utils/dbGetUser';
import getUserIdFromToken from './server/utils/getUserIdFromToken'

export const handle: Handle = async({ event, resolve }) => {
    const token = event.cookies.get("token");
    if (!token) {
        event.locals.role = null;
        return resolve(event);
    }
    const tokenResponse = await getUserIdFromToken(token); 
    if (!tokenResponse.success || tokenResponse.userId) {
        event.locals.role = null
        return resolve(event)
    }
    const userId = tokenResponse.userId;
    const userResponse = await dbGetUser(userId);
    if (userResponse.status !== 200|| !userResponse.user) {
        event.locals.role = null
        return resolve(event)
    }
    event.locals.role = userResponse.user.role;
    console.log(event.locals.role)
    return resolve(event);
}
