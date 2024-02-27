import Post from "../models/Post.js";
import { deleteImage, uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const getPost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    post ? res.json(post) : res.status(404).send("Post not found.");
  } catch (err) {
    next(err);
  }
};

export const savePost = async (req, res, next) => {
  const { title, description } = req.body;
  let image = null;
  try {
    if (req.files?.img) {
      const infoImg = await uploadImage(req.files.img.tempFilePath);
      await fs.remove(req.files.img.tempFilePath);
      image = {
        url: infoImg.secure_url,
        public_id: infoImg.public_id,
      };
    }
    const newPost = new Post({
      title,
      description,
      image,
    });
    await newPost.save();
    return res.json(newPost);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const postUpdated = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    postUpdated
      ? res.json(postUpdated)
      : res.status(404).send("Post not found.");
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const postDeleted = await Post.findByIdAndDelete(id);
    if (!postDeleted) return res.status.send("Post not found.");
    if (postDeleted.image.public_id)
      await deleteImage(postDeleted.image.public_id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
