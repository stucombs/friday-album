import { NextRequest } from 'next/server';

export const isAuthorized = (req: NextRequest): boolean => {
  return (
    req.headers.get('authorization') === `Bearer ${process.env.CRON_SECRET}`
  );
};
