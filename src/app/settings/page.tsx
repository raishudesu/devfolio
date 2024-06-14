import { Metadata } from "next";
import GeneralForm from "./components/general-form";

export const metadata: Metadata = {
  title: "Settings | Devfolio",
};

const General = () => {
  return <GeneralForm />;
};

export default General;
