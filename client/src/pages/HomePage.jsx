import usePosts from "../hooks/usePosts";
import Post from "../components/Post";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const { posts } = usePosts();

  return (
    <div className="w-1/2 mx-auto">
      <header className="flex justify-between mb-5">
        <span className="text-white font-bold text-sm">
          Posts({posts.length})
        </span>
        <Link
          to={"/new"}
          className="text-white font-bold text-sm hover:underline hover:underline-offset-1"
        >
          New Post
        </Link>
      </header>

      {!posts.length ? (
        <div className="flex flex-col justify-center items-center">
          <VscEmptyWindow className="text-white font-bold text-4xl"></VscEmptyWindow>
          <p className="text-white font-semibold text-lg">
            There are no posts.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 auto-rows-max items-start">
          {posts.map((post) => (
            <Post key={post._id} post={post}></Post>
          ))}
        </div>
      )}
    </div>
  );
};
