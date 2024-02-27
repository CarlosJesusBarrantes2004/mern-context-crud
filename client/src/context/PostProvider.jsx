import { useEffect, useState } from "react";
import PostContext from "./PostContext";
import {
  getPostsRequest,
  getPostRequest,
  savePostRequest,
  deletePostRequest,
  updatePostRequest,
} from "../api/posts.api";

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await getPostsRequest();
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const getPost = async (id) => {
    try {
      const res = await getPostRequest(id);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const savePost = async (post) => {
    try {
      const res = await savePostRequest(post);
      setPosts((posts) => [...posts, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const updatePost = async (id, postUpdated) => {
    try {
      const res = await updatePostRequest(id, postUpdated);
      console.log(res.data);
      setPosts((post) =>
        post.map((post) => {
          if (post._id === id)
            return {
              ...post,
              title: postUpdated.title,
              description: postUpdated.description,
            };
          else return post;
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (id) => {
    try {
      await deletePostRequest(id);
      setPosts((posts) => posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PostContext.Provider
      value={{ posts, getPost, savePost, updatePost, deletePost }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
