import { useState, useEffect } from "react";
import { makeRequest } from "../../axiosBaseUrl";

type Post = {
  id: number;
  title: string;
  desc: string;
  img?: string;
  username: string;
  date: string;
  userImg?: string;
  cat?: string | undefined;
};

export const useFetchPost = (postId: string) => {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await makeRequest.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  return post;
};
