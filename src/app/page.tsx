import CtaEnd from "@/components/landing-page/cta-end";
import Features from "@/components/landing-page/features";
import Hero from "@/components/landing-page/hero";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/projects");

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
