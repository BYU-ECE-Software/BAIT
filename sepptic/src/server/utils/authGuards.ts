import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import getUserIdFromToken from './getUserIdFromToken';
import cookie from 'cookie';
import dbGetUser from './dbGetUser';

export async function requireAdmin(event: RequestEvent) {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');
  console.log(cookies);
  const token = cookies.token;
  console.log(token);
  if (!token) {
    throw error(401, 'No session token');
  }

  const tokenRes = await getUserIdFromToken(token);
  const userId = tokenRes.userId;
  console.log(userId);

  const userRes = await dbGetUser(userId);
  const role = userRes.user.Role;
  console.log(role);

  if (role !== 'admin') {
    throw error(403, 'admins only');
  }
}