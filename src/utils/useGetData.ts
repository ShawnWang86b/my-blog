import { useState, useEffect } from "react";
import { getEntriesByContentType } from "./contentful";
import { Entry } from "contentful";

export default function useGetData(type: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState<Entry<any>[] | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getEntriesByContentType<any>(type)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    isLoading,
    data,
    error,
  };
}
