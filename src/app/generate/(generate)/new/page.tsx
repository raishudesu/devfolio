import { Metadata } from "next";
import Chat from "../components/chat";
import StartingDisplay from "../components/starting-display";

export const metadata: Metadata = {
  title: "Generate | Devfolio",
};

const NewConversationPage = async () => {
  return <Chat />;
};

export default NewConversationPage;
