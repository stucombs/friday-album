'use client';

import { useSearchParams } from 'next/navigation';

export default function UnsubscribeError() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');
  let message: string;

  switch (reason) {
    case 'invalid_token':
      message = 'Link or token has expired.';
      break;
    case 'unknown':
    default:
      message =
        'An unknown error occurred. Something went wrong on our side... please try again.';
      break;
  }

  return (
    <div className="p-12">
      <p className="mb-10">Unsubscribe error. {message}</p>
      {/* <p className="mb-10">
        Still having issues? Contact with info about your error.
      </p> */}
      <a href="/">[ BACK TO SITE ]</a>
    </div>
  );
}
