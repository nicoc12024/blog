import { useEffect, useState } from "react";

type PostType = {
  id: number;
  title: string;
  desc: string;
  img?: string;
  date: string;
  username: string;
};

export const useDisplayedPosts = (allPosts: PostType[] | null) => {
  const [displayedPosts, setDisplayedPosts] = useState<PostType[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const initializeDisplayedPosts = () => {
      if (allPosts) {
        setDisplayedPosts(allPosts.slice(0, 3));
      }
    };

    initializeDisplayedPosts();
  }, [allPosts]);

  const fetchMoreData = () => {
    if (!allPosts || displayedPosts.length >= allPosts.length) {
      setHasMore(false);
      return;
    }

    // setTimeOut to delay display 3 more posts
    setTimeout(() => {
      const nextPosts = allPosts.slice(displayedPosts.length, displayedPosts.length + 3);
      setDisplayedPosts([...displayedPosts, ...nextPosts]);
    }, 750);
  };

  return { displayedPosts, hasMore, fetchMoreData };
};

export default useDisplayedPosts;
