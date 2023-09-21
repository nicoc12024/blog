import React from "react";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFetchPosts } from "./useFetchPosts";
import IndividualPost from "./IndividualPost";
import { useDisplayedPosts } from "./useDisplayedPosts";
import { useCategory } from "./useCategory";

type PostType = {
  id: number;
  title: string;
  desc: string;
  img?: string;
  date: string;
  username: string;
};

const Home: React.FC = () => {
  const cat = useLocation().search;
  const allPosts: PostType[] | null = useFetchPosts(cat);
  const { displayedPosts, hasMore, fetchMoreData } = useDisplayedPosts(allPosts);
  const category = useCategory(cat);

  return (
    <div className="home">
      <div className="posts">
        <h1>Latest Posts {cat && <span>{category}</span>}</h1>
        <InfiniteScroll
          dataLength={displayedPosts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {displayedPosts.map((post: PostType) => (
            <IndividualPost key={post.id} post={post} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
