import Features from "@/landing-page/features";
import Hero from "@/landing-page/hero";

const Home = async () => {
  return (
    <div>
      <section className="max-w-screen-lg">
        <div className="mt-12 p-6 ">
          <Hero />
        </div>
      </section>
      <section className="mt-12 max-w-screen-lg p-6">
        <Features />
      </section>
    </div>
  );
};

export default Home;
