import { useEffect, useState } from "react";
import { makeRequest } from "../axiosBaseUrl";

type Post = {
  id: number;
  title: string;
  desc: string;
  img: string;
};

const useAsidePosts = (cat: string | undefined, currentPostId: number | null) => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await makeRequest.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  // Function to shuffle an array
  const shuffleArray = (array: Post[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Filter and shuffle posts
  const filteredAndShuffledPosts = posts?.filter((post) => post.id !== currentPostId);
  if (filteredAndShuffledPosts) {
    shuffleArray(filteredAndShuffledPosts);
  }

  return filteredAndShuffledPosts;
};

export default useAsidePosts;
