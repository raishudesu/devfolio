import Features from "@/landing-page/features";
import Hero from "@/landing-page/hero";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Home = async () => {
  const session = await getServerSession(authOptions);

  console.log(session);
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
