import Link from "next/link";
import Image from "next/image";
import moment from "moment";

const BlogCard = ({ item }: any) => {
  const { updateDate, tag, Title, subTitle, author, image, slug } = item.fields;
  return (
    <Link href={"/blogs/" + slug}>
      <div className="bg-white hover:scale-105 hover:shadow-lg transition duration-500 w-80 h-80 ">
        <div className="relative w-80 h-40">
          <Image
            src={"https:" + image.fields.file.url}
            alt="blog image"
            layout="fill"
            className="rounded-sm shadow-sm"
          />
        </div>
        <div className="px-5 py-3">
          <div className="flex gap-5 my-2 text-sm">
            <span>
              {tag.map((tagItem: string, index: number) => (
                <span key={`tag_item_${index}_${tagItem}`} className="">{`${tagItem} `}</span>
              ))}
            </span>
          </div>
          <p className="text-xl">{Title}</p>
          <p className="text-sm text-gray-400 italic">{subTitle}</p>
          {/* Card Bottom */}
          <div>
            <span className="">{moment().format("MMMM Do, YYYY")}</span>
            <span className="">${author}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
