import Button from "../../UI/Button";
import Header from "../Header";
import "../Wiki/styles.css";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig.js";
import { useEffect, useState } from "react";

function Blog() {
  const [newestBlog, setNewestBlog] = useState([]);
  useEffect(() => {
    getsetNewestBlog();
  }, []);

  const getsetNewestBlog = async () => {
    try {
      const productsRef = collection(db, "products");
      const q = query(
        productsRef,
        where("category", "==", "z4UCqfP5PmDQVHBOurkv"),
        limit(6)
      );
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setNewestBlog((prev) => {
            if (prev.length > 6) prev.shift();
            return [...prev, { id: doc.id, ...doc.data() }];
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div id="white-wiki">
        <Header />
      </div>
      <h3 className="font-fontItalianno text-5xl text-center text-black pt-10">
        Bài viết
      </h3>
      <div className="mx-[200px] mb-[100px] mt-[30px] grid grid-cols-3 grid-rows-2 gap-5">
        <>
        {newestBlog.map((blog) => (
          <Link to = "/blogreader" key={blog.id}>
            <div className="mx-5 mt-5 flex justify-center">
              <img
                src={blog.imageUrls}
                alt=""
                className="h-[200px] w-[350px] object-cover"
              />
            </div>
              <div className="text-center">
                <strong className=" text-xl">
                  {blog.name}
                </strong>
              </div>
              <div className="text-center">
                <p>
                  Hãy để shop hoa tươi tư vấn các bạn
                  <br /> cách chọn hoa tươi mừng [...]
                </p>
              </div>
          </Link>
        ))}
        </>
        <div></div>
      </div>
      <Footer />
    </main>
  );
}

export default Blog;
