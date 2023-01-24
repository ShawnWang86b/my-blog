import BlogCard from "../../components/BlogCard";
import BlogBar from "../../components/BlogBar";
import useGetData from "../../utils/useGetData";
import Squares from "../../assets/squares.svg";
import Bars from "../../assets/bars.svg";
import { useCallback, useState } from "react";

enum DisplayTypes {
  GRID = "GRID",
  LIST = "LIST",
}

const BlogList = () => {
  const { data, isLoading, error } = useGetData("blog");
  console.log(data);

  const [cardDisplayType, setCardDisplayType] = useState(
    typeof window !== "undefined" && localStorage.getItem("blog-display-type")
      ? localStorage.getItem("blog-display-type")
      : DisplayTypes.GRID
  );

  const handleTypeUpdate = useCallback((type: DisplayTypes) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("blog-display-type", type);
    setCardDisplayType(type);
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <section className="bg-[#F2F8FB] px-8 py-6 ">
      <div className="max-w-4xl m-auto pt-10 pb-20 flex justify-between">
        <h2 className=" underline decoration-sky-400 decoration-8 underline-offset-8 text-[#2A3039] text-3xl font-semibold font-mono tracking-widest">
          BROWSE ALL
        </h2>
        <div className="flex gap-2 ">
          <Squares
            className={`cursor-pointer hover:border-[1px] m-1 ${
              cardDisplayType === DisplayTypes.GRID ? "opacity-10" : ""
            }`}
            onClick={() => handleTypeUpdate(DisplayTypes.GRID)}
          />
          <Bars
            className={`cursor-pointer hover:border-[1px] m-1 ${
              cardDisplayType === DisplayTypes.LIST ? "opacity-10" : ""
            }`}
            onClick={() => handleTypeUpdate(DisplayTypes.LIST)}
          />
        </div>
      </div>
      <div>
        {cardDisplayType === DisplayTypes.GRID && (
          <div className="max-w-4xl m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-3 gap-6 ">
            {(data || []).map((item) => (
              <BlogCard key={item.sys.id} item={item} />
            ))}
          </div>
        )}
        {cardDisplayType === DisplayTypes.LIST && (
          <div className="max-w-4xl m-auto">
            {(data || []).map((item) => (
              <BlogBar key={item.sys.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;
