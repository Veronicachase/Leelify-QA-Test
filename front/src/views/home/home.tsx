import "./home.css";
import { Nav } from "../../components/layout/nav";
import { HomeHeader } from "../../components/home/homeHeader";
import { Audiobooks } from "../../components/home/audioBooks.tsx";

export const Home = () => {
  return (
    <main className="home">
      <Nav />
      <section>
        <HomeHeader />
      </section>
      <section>
        <Audiobooks />
      </section>
    </main>
  );
};
