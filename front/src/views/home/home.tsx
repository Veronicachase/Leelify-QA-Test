import "./home.css";
import { Nav } from "../../components/layout/nav";
import { HomeAudioBook } from "../../components/homeAudioBook/homeAudioBook";

export const Home = () => {
  return (
    <main className="home">
      <Nav />
      <section>
        <HomeAudioBook />
      </section>
      <section></section>
    </main>
  );
};
