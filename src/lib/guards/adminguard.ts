import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const isAdmin = async (request: NextRequest): Promise<boolean> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('fa_admin_token');

  console.log('Middleware running on:', request.nextUrl.pathname);
  console.log('Token found:', token);
  console.log('Token value:', token?.value);
  console.log('API_SECRET:', process.env.API_SECRET);
  console.log('Match:', token?.value === process.env.API_SECRET);

  return token?.value === process.env.API_SECRET;
};
