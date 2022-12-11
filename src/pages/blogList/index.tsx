import BlogCard from "../../components/BlogCard";
import useGetData from "../../utils/useGetData";

const BlogList = () => {
  const { data, isLoading, error } = useGetData("blog");
  console.log(data);

  return (
    <div className="bg-[#F2F8FB]">
      <p className="underline decoration-sky-400 decoration-8 underline-offset-8 text-[#2A3039] text-3xl font-semibold font-mono">
        BROWSE ALL
      </p>
      <div className="max-w-7xl m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-3 py-20">
        {(data || []).map((item) => (
          <BlogCard key={item.sys.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
