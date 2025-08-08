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
    return new Response(JSON.stringify({ message: 'No token provided', status: 400 }), { status: 400 });
  }

  const tokenRes = await getUserIdFromToken(token);
  const userId = tokenRes.userId;
  console.log(userId);

  const userRes = await dbGetUser(userId);
  const role = userRes.user.Role;
  console.log(role);

  if (role !== 'admin') {
    return new Response(JSON.stringify({message: "Admin required", status: 403}), {status: 403});
  }
}