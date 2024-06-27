import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import SearchProjects from "./components/search-projects";

const SearchPage = ({ params }: { params: { tags: string } }) => {
  return (
    <div className="w-full max-w-screen-2xl min-h-screen px-2">
      <SearchProjects params={params} />
    </div>
  );
};

export default SearchPage;
