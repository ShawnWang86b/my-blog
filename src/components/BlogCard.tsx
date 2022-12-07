import Link from "next/link";
import Image from "next/image";

const BlogCard = ({ item }: any) => {
  const { updateDate, tag, Title, subTitle, author, image, slug } = item.fields;
  return (
    <div className="flex justify-center">
      <div className="flex flex-col mx-20 items-center my-10 p-2 w-1/2">
        <Image
          src={"https:" + image.fields.file.url}
          alt="blogs picture"
          width={image.fields.file.details.image.width}
          height={image.fields.file.details.image.height}
          className="rounded-xl shadow-lg"
        />
        <div className="flex gap-5 my-2 text-sm">
          <span className="italic">{`Date: ${updateDate.split("T")[0]} /`}</span>
          <span>
            {tag.map((tagItem: string) => (
              <span
                key={tag.index}
                className="underline md:underline-offset-4 mx-1 decoration-sky-500 italic"
              >{`${tagItem} `}</span>
            ))}
          </span>
          <span className="italic">{`/ Author: ${author}`}</span>
        </div>
        <p className="text-xl">{Title}</p>
        <p className="text-sm text-gray-400 italic">{subTitle}</p>
        <div>
          <Link href={"/blogs/" + slug}>
            <button className="text-white bg-cyan-500 hover:bg-cyan-600 w-24 p-2 my-5 rounded-xl shadow-lg">
              Read More
            </button>
          </Link>
        </div>
        <span className="w-full py-px bg-gray-200"></span>
      </div>
    </div>
  );
};

export default BlogCard;
