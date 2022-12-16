import Link from "next/link";

const BlogBar = ({ item }: any) => {
  const { category, Title, tag, slug } = item.fields;
  // console.log("item", item);
  return (
    <Link href={"/blogs/" + slug}>
      <div className="flex justify-between items-center pl-4 pr-4 bg-white hover:border-blue-500/50 hover:shadow-md transition duration-700 h-20 border-[1px] mb-2 border-gray-200 cursor-pointer ">
        <div>
          <span className="text-sky-500 text-xs font-medium">{category}</span>
          <p className=" ">{Title}</p>
        </div>
        <div className="px-2 py-2 text-sm gap-2 border-[1px] border-gray-200 hover:border-[1px] hover:border-black">
          {tag}
        </div>
      </div>
    </Link>
  );
};

export default BlogBar;
