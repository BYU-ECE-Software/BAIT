import type { Handle } from '@sveltejs/kit';
import cookie from 'cookie';
import getUserIdFromToken from "./server/utils/getUserIdFromToken";
import dbGetUser from "./server/utils/dbGetUser";

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');
  const token = cookies.token;
//   console.log("This is the token from the hook: ", token);

  event.locals.user = null; // default

  if (token) {
    try {
      const { userId } = await getUserIdFromToken(token);
      if (userId) {
        const userRes = await dbGetUser(userId);
        // minimal shape exposed internally
        event.locals.user = {
          id: userId,
          role: userRes.user.Role?.toLowerCase() ?? 'user',
          email: userRes.user.email
        };
      }
    } catch {
      // bad token: leave user null
    }
  }

  return resolve(event);
};
