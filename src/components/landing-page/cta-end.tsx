import SignInButtons from "../header/sign-in-buttons";
import { textAnimation } from "./hero";

const CtaEnd = () => {
  return (
    <div className="pb-12 flex flex-col items-center">
      <h2
        className={`text-center mt-12 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ${textAnimation}`}
      >
        Ready to share your projects?
      </h2>
      <p className="text-lg leading-normal dark:text-muted-foreground [&:not(:first-child)]:mt-6 text-center light:text-zinc-900">
        Start by creating an account on the platform.
      </p>
      <div className="mt-6">
        <SignInButtons />
      </div>
    </div>
  );
};

export default CtaEnd;
