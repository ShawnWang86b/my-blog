import BlogCard from "../../components/BlogCard";
import useGetData from "../../utils/useGetData";

const BlogList = () => {
  const { data, isLoading, error } = useGetData("blog");
  console.log(data);

  return (
    <div>
      {(data || []).map((item) => (
        <BlogCard key={item.sys.id} item={item} />
      ))}
    </div>
  );
};

export default BlogList;
