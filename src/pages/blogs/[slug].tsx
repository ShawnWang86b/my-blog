import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY || "",
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "blog",
  });

  const paths = res.items.map((item: any) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return { paths, fallback: false };
};

export async function getStaticProps({ params }: any) {
  const { items } = await client.getEntries({
    content_type: "blog",
    "fields.slug": params.slug,
  });

  return {
    props: { blog: items[0] },
  };
}

export default function BlogDetail({ blog }: any) {
  console.log(blog);
  const { updateDate, tag, Title, subTitle, author, image, content } = blog.fields;
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
              <span className="underline md:underline-offset-4 mx-1 decoration-sky-500 italic">{`${tagItem} `}</span>
            ))}
          </span>
          <span className="italic">{`/ Author: ${author}`}</span>
        </div>
        <p className="text-xl">{Title}</p>
        <p className="text-sm text-gray-400 italic">{subTitle}</p>
        <div className="my-20">{documentToReactComponents(content)}</div>
      </div>
    </div>
  );
}
