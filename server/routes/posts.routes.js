import { Router } from "express";
import {
  getPosts,
  getPost,
  savePost,
  updatePost,
  deletePost,
} from "../controllers/posts.controller.js";

const router = Router();

router.get("/posts", getPosts);

router.get("/posts/:id", getPost);

router.post("/posts", savePost);

router.put("/posts/:id", updatePost);

router.delete("/posts/:id", deletePost);

export default router;
