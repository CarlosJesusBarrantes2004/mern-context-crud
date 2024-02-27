import { PostFormPage, HomePage, NotFoundPage } from "./pages/index";
import { Routes, Route } from "react-router-dom";
import PostProvider from "./context/PostProvider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <PostProvider>
        <div className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/new" element={<PostFormPage></PostFormPage>}></Route>
            <Route
              path="/posts/:id"
              element={<PostFormPage></PostFormPage>}
            ></Route>
            <Route path="/*" element={<NotFoundPage></NotFoundPage>}></Route>
          </Routes>
          <Toaster></Toaster>
        </div>
      </PostProvider>
    </div>
  );
}

export default App;
