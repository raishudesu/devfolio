import React from "react";
import FeatureCard from "./feature-card";
import { textAnimation } from "./hero";

const featureList = [
  {
    title: "Generative AI Integration ✨",
    desc: "Devfolio uses Google's Gemini API to assist aspiring developers to ideate their next project.",
    link: "/generate/new",
  },
  {
    title: "Project Showcase ✔️",
    desc: "Present your projects in detail, including clear descriptions, screenshots, and links to live demos.",
    link: "/projects",
  },
  {
    title: "Connect with Devfoliopers ⚡",
    desc: "Discover other top developers' projects, find inspiration, and create connections.",
    link: "/devfoliopers",
  },
  {
    title: "Your Portfolio 📖",
    desc: "Devfolio helps you stand out from the crowd with dedicated features to showcase your talent to the right recruiters.",
    link: "/profile",
  },
];

// DATA ANALYTICS FOR PORTFOLIO VIEWS WOULD BE GOOD

const Features = () => {
  return (
    <>
      <h2
        className={`text-center mt-12 scroll-m-20 pb-2 text-4xl font-semibold tracking-tight transition-colors first:mt-0 ${textAnimation}`}
      >
        What&lsquo;s in devfolio?
      </h2>
      <p className="text-lg leading-normal dark:text-muted-foreground [&:not(:first-child)]:mt-6 text-center light:text-zinc-900">
        Devfolio is platform for developers to share their projects as
        development inspiration to increase their employment probability.
      </p>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        {featureList.map(({ title, desc, link }, index) => (
          <FeatureCard title={title} desc={desc} link={link} key={index} />
        ))}
      </div>
    </>
  );
};

export default Features;
