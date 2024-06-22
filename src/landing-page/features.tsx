import React from "react";
import FeatureCard from "./feature-card";
import { textAnimation } from "./hero";

const featureList = [
  {
    title: "Generative AI Integration ✨",
    desc: "Devfolio uses Google's Gemini API to assist aspiring developers to ideate their next project.",
  },
  {
    title: "Project Showcase 🏢",
    desc: "Present your projects in detail, including clear descriptions, screenshots, and links to live demos.",
  },
  {
    title: "Connect with Developers ⚡",
    desc: "Discover other developers' projects, find inspiration, and create connections.",
  },
  {
    title: "Your Portfolio 📖",
    desc: "Devfolio helps you stand out from the crowd with dedicated features to showcase your talent to the right recruiters.",
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
        {featureList.map(({ title, desc }, index) => (
          <FeatureCard title={title} desc={desc} key={index} />
        ))}
      </div>
    </>
  );
};

export default Features;
