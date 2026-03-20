import { cookies } from 'next/headers';

export const isAdmin = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('fa_admin_token');

  return token?.value === process.env.API_SECRET;
};
