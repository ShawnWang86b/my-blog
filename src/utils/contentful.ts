import { createClient, Entry } from "contentful";

if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
  throw new Error("NEXT_PUBLIC_CONTENTFUL_SPACE_ID env not set");
}

if (!process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY) {
  throw new Error("NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY env not set");
}

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY || "",
});

export const getEntriesByContentType = async <T>(type: string): Promise<Entry<T>[]> => {
  const entries = await client.getEntries({
    content_type: type,
  });

  return entries.items as Entry<T>[];
};
