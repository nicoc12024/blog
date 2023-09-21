import { useState, useEffect } from "react";
import { makeRequest } from "../../axiosBaseUrl";

type Post = {
  id: number;
  title: string;
  desc: string;
  img?: string;
  date: string;
  username: string;
};

export const useFetchPosts = (cat: string) => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await makeRequest.get(`/posts${cat}`);
        const sortedData = [...res.data].sort(
          (a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setPosts(sortedData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return posts;
};
