import Header from "../Header";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlog } from "../../redux/reducers/blogSlice";

function Blog() {
  const { blogs } = useSelector((state) => state.blogSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlog());
  }, [dispatch]);

  return (
    <main>
      <h3 className="font-fontItalianno text-5xl text-center text-black pt-10">
        Bài viết
      </h3>
      <div className="mx-[200px] mb-[100px] mt-[30px] grid grid-cols-3 grid-rows-2 gap-5">
        {blogs.map((blog) =>
          blog.display !== "public" ? (
            <Link to={`/blog/${blog.id}`}>
              <div className="mx-5 mt-5 flex justify-center">
                <img
                  src={blog.avatar}
                  alt=""
                  className="w-[350px] object-cover aspect-square border"
                />
              </div>
              <div className="text-center mt-4">
                <strong className=" text-lg">{blog.title}</strong>
              </div>
            </Link>
          ) : (
            <></>
          )
        )}

        <div></div>
      </div>
    </main>
  );
}

export default Blog;
