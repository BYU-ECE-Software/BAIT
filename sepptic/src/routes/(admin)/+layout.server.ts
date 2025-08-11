import { redirect, error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const user = locals.user;

  if (!user) {
    throw redirect(303, `/main`);
  }

  if (user.role !== 'admin') {
    throw redirect(303, '/main');
  }

  // Expose minimal safe data to client
  return { user: { id: user.id, role: user.role, email: user.email } };
};

// This is an admin guard for each file inside the admin group under routes. A user must have the 'admin' role in the DB to access these pages