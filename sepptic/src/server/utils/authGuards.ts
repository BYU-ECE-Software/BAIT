import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export function requireAdmin(event: RequestEvent) {
  if (event.locals.role !== 'admin') {
    throw error(403, 'Admins only');
  }
}



// export function requireLogin(event: RequestEvent) {
//   if (!event.locals.role) throw error(401, 'Not logged in');
// }