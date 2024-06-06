import { Metadata } from "next";
import Chat from "./components/chat";
import StartingDisplay from "./components/starting-display";

export const metadata: Metadata = {
  title: "Generate | Devfolio",
};

const GeneratePage = async () => {
  return (
    <section className="h-screen w-full max-w-screen-lg px-2 flex max-h-[90vh] flex-col">
      {/* <div className="mt-6">
        
      </div> */}

      <Chat />
    </section>
  );
};

export default GeneratePage;
