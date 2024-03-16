import Features from "@/landing-page/features";
import Hero from "@/landing-page/hero";

const Home = () => {
  return (
    <div>
      <section className="p-4">
        <Hero />
      </section>
      <section className="p-4 max-w-screen-lg">
        <Features />
      </section>
    </div>
  );
};

export default Home;
