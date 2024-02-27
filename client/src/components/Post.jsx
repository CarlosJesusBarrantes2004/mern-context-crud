import toast from "react-hot-toast";
import usePosts from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const { deletePost } = usePosts();
  const navigate = useNavigate();

  const handleDelete = () => {
    toast((t) => (
      <div>
        <p className="text-xs font-semibold text-center">
          Do you want to delete?
        </p>
        <div className="flex justify-between mt-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-xs font-bold rounded-md px-2 py-1 border border-black"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              await deletePost(post._id);
            }}
            className="bg-red-500 text-white text-xs font-bold rounded-sm px-2 py-1"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div
      className="bg-gray-700 cursor-pointer p-4 hover:bg-gray-800 transition duration-75 ease-in"
      onClick={() => navigate(`/posts/${post._id}`)}
    >
      <h3 className="text-white text-center font-bold text-lg">{post.title}</h3>
      <div className="flex flex-col my-3">
        <p className="text-white text-xs text-balance font-medium">
          {post.description}
        </p>
        {post.image && (
          <div className="mt-2">
            <img
              className="object-cover w-full h-full"
              src={post.image.url}
            ></img>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <button className="bg-white text-blue-950 text-xs font-extrabold px-2 py-1 rounded-sm">
          Update
        </button>
        <button
          className="bg-red-500 text-white text-xs font-extrabold px-2 py-1 rounded-sm"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
