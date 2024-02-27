import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PostContext from "../context/PostContext";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const PostFormPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const { savePost, getPost, updatePost } = useContext(PostContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    setSubmitted(true);
    const post = {
      title: data.title,
      description: data.description,
      img: data.img[0],
    };
    !id ? await savePost(post) : updatePost(id, post);
    navigate("/");
  };

  useEffect(() => {
    (async () => {
      if (id) {
        const post = await getPost(id);
        setValue("title", post.title);
        setValue("description", post.description);
      }
    })();
  }, [id]);

  return (
    <div className="h-full flex justify-center items-center">
      <form
        className="flex flex-col bg-gray-700 p-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          {...register("title", { required: true })}
          className="outline-none p-2 text-white text-xs bg-gray-600 rounded-sm font-semibold placeholder:text-white"
          placeholder="Title..."
        />
        {errors.title?.type === "required" && <p>Title cannot be empty</p>}
        <textarea
          cols="30"
          rows="4"
          {...register("description", { required: true })}
          className="outline-none resize-none my-2 p-2 text-white text-xs bg-gray-600 rounded-sm font-semibold placeholder:text-white"
          placeholder="Description..."
        ></textarea>
        <input
          type="file"
          accept="image/*"
          {...register("img")}
          className="text-white text-xs bg-gray-600 rounded-sm font-semibold p-2 cursor-pointer"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-white rounded-sm text-xs font-bold px-3 py-1 mt-2 mx-auto"
        >
          {isSubmitting ? (
            <AiOutlineLoading3Quarters className="animate-spin h-5 w-5"></AiOutlineLoading3Quarters>
          ) : (
            "Save"
          )}
        </button>
      </form>
    </div>
  );
};
