export default function Holiday({ theme }: { theme?: any }) {
  console.log(`[Loading theme: ${theme}]`);

  switch (theme) {
    case 'holiday':
      return (
        <>
          <div id="snow"></div>
          <ul className="lightrope">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </>
      );
    case 'new_year':
      return (
        <>
          <div className="pyro">
            <div className="before"></div>
            <div className="after"></div>
          </div>
        </>
      );
    default:
      return;
  }
}
