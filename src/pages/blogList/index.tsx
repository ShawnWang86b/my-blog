import BlogCard from "../../components/BlogCard";
import useGetData from "../../utils/useGetData";

const BlogList = () => {
  const { data, isLoading, error } = useGetData("blog");
  console.log(data);

  return (
    <section className="bg-[#F2F8FB] px-8 py-6">
      <h2 className="max-w-4xl m-auto underline decoration-sky-400 decoration-8 underline-offset-8 text-[#2A3039] text-3xl font-semibold font-mono pt-10 pb-20 tracking-widest">
        BROWSE ALL
      </h2>
      <div className="max-w-4xl m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-3 gap-6">
        {(data || []).map((item) => (
          <BlogCard key={item.sys.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default BlogList;
