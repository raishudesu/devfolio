import { ReactNode } from "react";
import ConversationList from "./components/conversations-list";

const GenerateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="mt-6 h-screen w-full max-w-screen-2xl px-2 flex justify-center max-h-[90vh] gap-6">
      <ConversationList />
      <div className="w-full max-w-screen-lg">{children}</div>
    </section>
  );
};

export default GenerateLayout;
