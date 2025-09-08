import { Footer, Home } from '../../components';

export default function About() {
  return (
    <div className="page">
      <main className="main">
        <Home></Home>
        <h3>WHY FRIDAY</h3>
        <p className="max-w-[60vw] text-center">
          Ah, Friday... the last barrier between a long week and the freedom of
          the weekend. The perfect day to fire up an album in all it's glory,
          the way it was meant to be heard: start to finish, no skips. Each
          Friday Album is handpicked and includes a mix of every genre and
          decade of music. Enjoy a new track or revisit a classic and make
          Friday Album your new ritual for ditching the week and pressing play
          your weekend.
        </p>
        <div className="cd"></div>
      </main>
      <Footer></Footer>
    </div>
  );
}
