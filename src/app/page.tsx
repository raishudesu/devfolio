import Features from "@/landing-page/features";
import Hero from "@/landing-page/hero";

const Home = async () => {
  return (
    <div>
      <section className="p-4 max-w-screen-lg">
        <div className="mt-12">
          <Hero />
        </div>
      </section>
      <section className="mt-12 p-4 max-w-screen-lg">
        <Features />
      </section>
    </div>
  );
};

export default Home;
