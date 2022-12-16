import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import moment from "moment";

const renderOptions = {
  renderNode: {
    [INLINES.EMBEDDED_ENTRY]: (node: any, children: any) => {
      // target the contentType of the EMBEDDED_ENTRY to display as you need
      if (node.data.target.sys.contentType.sys.id === "blogPost") {
        return (
          <a href={`/blog/${node.data.target.fields.slug}`}> {node.data.target.fields.title}</a>
        );
      }
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node: any, children: any) => {
      // target the contentType of the EMBEDDED_ENTRY to display as you need
      if (node.data.target.sys.contentType.sys.id === "codeBlock") {
        return (
          <pre>
            <code>{node.data.target.fields.code}</code>
          </pre>
        );
      }

      if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
        return (
          <iframe
            src={node.data.target.fields.embedUrl}
            height="100%"
            width="100%"
            frameBorder="0"
            scrolling="no"
            title={node.data.target.fields.title}
            allowFullScreen={true}
          />
        );
      }
    },

    [BLOCKS.EMBEDDED_ASSET]: (node: any, children: any) => {
      // render the EMBEDDED_ASSET as you need
      return (
        <div className="p-[1px] shadow-xl m-2">
          <img
            src={`https://${node.data.target.fields.file.url}`}
            height={node.data.target.fields.file.details.image.height}
            width={node.data.target.fields.file.details.image.width}
            alt={node.data.target.fields.description}
          />
        </div>
      );
    },
  },
};
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

  return { paths, fallback: true };
};

export async function getStaticProps({ params }: any) {
  const { items } = await client.getEntries({
    content_type: "blog",
    "fields.slug": params.slug,
  });

  return {
    props: { blog: items[0] },
    revalidate: 1,
  };
}

export default function BlogDetail({ blog }: any) {
  console.log(blog);
  if (!blog) return <div>loading</div>;
  const { updateDate, tag, category, Title, subTitle, author, image, content } = blog.fields;
  return (
    <div className="grid grid-cols-3 max-w-4xl m-auto">
      <div className="flex flex-col p-2 col-span-2">
        <p className="text-5xl py-20">{Title}</p>
        <div className="relative h-80">
          <Image
            src={"https:" + image.fields.file.url}
            alt="blogs picture"
            layout="fill"
            className="shadow-lg"
          />
        </div>

        <p className="text-xs text-gray-600 italic p-3">{subTitle}</p>
        <div className="my-14">{documentToReactComponents(content, renderOptions)}</div>
      </div>

      {/* 右边*/}
      <div className="col-span-1 flex flex-col px-10 pt-64">
        <div className="flex flex-col py-2">
          <span className="text-xs py-2">PUBLISHED</span>
          <span className="text-xs text-gray-600">
            {moment(updateDate).format("MMMM Do, YYYY")}
          </span>
        </div>
        <div className="flex flex-col py-2">
          <span className="text-xs py-2">AUTHOR</span>
          <span className="text-xs text-sky-600 cursor-pointer hover:underline hover:decoration-sky-500 underline-offset-2">
            {author}
          </span>
        </div>
        <div className="flex flex-col py-2">
          <span className="text-xs py-2">CATEGORY</span>
          <span className="text-xs text-sky-600 cursor-pointer hover:underline hover:decoration-sky-500 underline-offset-2">
            {category}
          </span>
        </div>
        <div>
          <span className="flex flex-col text-xs py-2">TOPICS</span>
          {tag.map((item: string, index: number) => (
            <span
              key={index}
              className="bg-[#F2F8FB] p-1 rounded-full text-xs text-gray-600 hover:border-[1px] hover:border-[#464E5B]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
