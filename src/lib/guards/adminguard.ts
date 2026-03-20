import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const isAdmin = async (request: NextRequest): Promise<boolean> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('fa_admin_token');

  return token?.value === process.env.API_SECRET;
};
