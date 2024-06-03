import React from "react";
import FeatureCard from "./feature-card";

const featureList = [
  {
    title: "Track your portfolio's performance",
    image: "",
    desc: "Gain valuable insights into your portfolio's performance. Devfolio helps you understand how recruiters and other developers are interacting with your work, allowing you to constantly optimize and improve.",
  },
  {
    title: "Showcase Your Projects Beautifully",
    image: "path/to/image2.jpg", // Replace with the actual image path (e.g., project screenshot)
    desc: "Present your projects in detail, including clear descriptions, screenshots, videos (if applicable), and links to live demos. Impress potential employers and collaborators.",
  },
  {
    title: "Connect with Inspiring Developers",
    image: "path/to/image3.jpg", // Replace with the actual image path (e.g., diverse developers)
    desc: "Discover other developers' portfolios, find inspiration, and forge connections through a robust search system and curated recommendations.",
  },
  {
    title: "Get Noticed by Top Employers",
    image: "path/to/image4.jpg", // Replace with the actual image path (e.g., company logo or recruiters)
    desc: "Increase your visibility to potential employers. Devfolio helps you stand out from the crowd with dedicated features to showcase your talent to the right recruiters. (Consider adding a note if Devfolio offers job listings or a talent pool)",
  },
];

// DATA ANALYTICS FOR PORTFOLIO VIEWS WOULD BE GOOD

const Features = () => {
  return (
    <>
      <h2 className="text-center mt-12 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Google&lsquo;s Gemini API Integration ✨
      </h2>
      <p className="leading-normal [&:not(:first-child)]:mt-6 text-center light:text-zinc-900">
        Not just uses Gemini Generative AI for brainstorming project ideas,
        Devfolio is about developers sharing their existing projects as
        development and design inspirations to increase their employment
        probability.
      </p>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        {featureList.map(({ title, image, desc }, index) => (
          <FeatureCard title={title} image={image} desc={desc} key={index} />
        ))}
      </div>
    </>
  );
};

export default Features;
