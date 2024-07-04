import { ReactNode } from "react";
import ConversationList from "./components/conversations-list";
import ConversationListSheet from "./components/conversation-list-sheet";

const GenerateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="mt-6 h-screen w-full max-w-screen-xl px-2 pb-12 flex flex-col md:flex-row justify-center max-h-[90vh] gap-2 md:gap-6">
      <div className="mt-6 md:hidden">
        <ConversationListSheet />
      </div>
      <div className="w-full max-w-60 hidden md:block">
        <ConversationList />
      </div>
      <div className="h-full w-full max-w-screen-lg">{children}</div>
    </section>
  );
};

export default GenerateLayout;
