import { useEffect, useMemo, useState } from "react";
import { makeRequest } from "../axiosBaseUrl";

type Post = {
  id: number;
  title: string;
  desc: string;
  img: string;
};

const useAsidePosts = (cat: string | undefined, currentPostId: number | null) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await makeRequest.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
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
    return array; 
  };

  // Filter out the current post and shuffle the array
  const filteredAndShuffledPosts = useMemo(() => {
    const filtered = posts?.filter((post) => post.id !== currentPostId);
    return shuffleArray([...filtered]).slice(0, 3);
  }, [posts, currentPostId]);

  return { filteredAndShuffledPosts, loading };
};

export default useAsidePosts;
