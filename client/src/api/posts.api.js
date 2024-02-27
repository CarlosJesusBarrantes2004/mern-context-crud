import axios from "axios";

const URL = "http://localhost:3000/api/posts";

export const getPostsRequest = async () => await axios.get(URL);

export const getPostRequest = async (id) => await axios.get(URL + "/" + id);

export const savePostRequest = async (post) => {
  const form = new FormData();

  for (let key in post) {
    form.append(key, post[key]);
  }

  return await axios.post(URL, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updatePostRequest = async (id, post) =>
  await axios.put(URL + "/" + id, post);

export const deletePostRequest = async (id) =>
  await axios.delete(URL + "/" + id);
