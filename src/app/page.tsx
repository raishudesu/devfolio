import CtaEnd from "@/components/landing-page/cta-end";
import Features from "@/components/landing-page/features";
import Hero from "@/components/landing-page/hero";

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
      <section className="mt-12 max-w-screen-lg p-6">
        <CtaEnd />
      </section>
    </div>
  );
};

export default Home;
