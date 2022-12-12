import Link from "next/link";
import Image from "next/image";
import moment from "moment";

const BlogCard = ({ item }: any) => {
  const { updateDate, category, Title, author, image, slug } = item.fields;
  return (
    <Link href={"/blogs/" + slug}>
      <div className="relative bg-white hover:scale-105 hover:shadow-2xl transition duration-700 h-80 pb-10 cursor-pointer">
        <div className="relative h-40">
          <Image
            src={"https:" + image.fields.file.url}
            alt="blog image"
            layout="fill"
            className="rounded-sm shadow-sm"
          />
        </div>
        {/* <div className="flex flex-col justify-between"> */}
        <div className="px-5 pt-4 relative h-24">
          <span className="text-sky-500 text-xs font-medium">{category}</span>
          <p className=" ">{Title}</p>
        </div>
        <div className="px-5 pt-6">
          <span className="text-xs text-gray-600">
            {moment(updateDate).format("MMMM Do, YYYY")}
          </span>
          <span className="px-2 text-gray-300 text-sm">|</span>
          <span className="text-xs text-gray-600">{author}</span>
        </div>
      </div>
      {/* </div> */}
    </Link>
  );
};

export default BlogCard;
