export default function UnsubscribeError({
  searchParams
}: {
  searchParams: { reason?: string };
}) {
  let message: string;
  switch (searchParams.reason) {
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
