import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function BlogReader() {
  const { blogs } = useSelector((state) => state.blogSlice);
  const { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    const post = blogs.find((post) => post.id === id);
    setPost(post);
  }, [blogs, id]);
  useEffect(() => {
    document.getElementById("content").innerHTML = post.content;
  }, [post]);
  return (
    <>
      <div className="w-7/12 mx-auto my-20 ">
        <div className="text-center text-[30px] ">
          <h1>{post.title}</h1>
        </div>
        <div className="-mx-[13%] border-b-2 opacity-75 my-6" />
        <p id="content" className="text-wrap "></p>
      </div>
    </>
  );
}
export default BlogReader;
