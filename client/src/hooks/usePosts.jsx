import { useContext } from "react";
import PostContext from "../context/PostContext";

const usePosts = () => {
  return useContext(PostContext);
};

export default usePosts;
