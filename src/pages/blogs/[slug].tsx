import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
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
        <img
          src={`https://${node.data.target.fields.file.url}`}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
          alt={node.data.target.fields.description}
        />
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
            {tag.map((tagItem: string, index: number) => (
              <span
                key={`tag_item_${index}_${tagItem}`}
                className="underline md:underline-offset-4 mx-1 decoration-sky-500 italic"
              >{`${tagItem} `}</span>
            ))}
          </span>
          <span className="italic">{`/ Author: ${author}`}</span>
        </div>
        <p className="text-xl">{Title}</p>
        <p className="text-sm text-gray-400 italic">{subTitle}</p>
        <div className="my-20">{documentToReactComponents(content, renderOptions)}</div>
      </div>
    </div>
  );
}
