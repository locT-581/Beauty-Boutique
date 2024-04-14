import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { getAllBlog } from "../../../redux/reducers/blogSlice";

const DetailWiki = () => {
  const { blogs } = useSelector((state) => state.blogSlice);

  const { id } = useParams();
  const dispatch = useDispatch();
  const [flower, setFlower] = useState({});
  const [blogsList, setBlogsList] = useState([]);

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "flowers", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setFlower(docSnap.data());
      } else {
        console.log("No such document!");
      }
    })();

    dispatch(getAllBlog());
  }, [id]);

  useEffect(() => {
    console.log(flower);
    setBlogsList(blogs.slice(0, 3));
  }, [flower, blogs]);

  return (
    <div className="w-full pl-[10%] pr-[5%] flex py-20">
      <div className="w-9/12">
        <div className="flex">
          <img src={flower.avatar} alt="" className="w-[250px] aspect-square" />
          <div className="text-5xl font-fontItalianno pl-10 pt-5">
            {flower.name}
          </div>
        </div>
        <div className="mt-20 mr-5">
          <div className="border-[2px] border-t-4 ml-6 px-3 py-2 w-fit border-b-white ">
            Thông tin chi tiết
          </div>
          <div className="border-[2px] py-14 px-10">{flower.description}</div>
        </div>
      </div>
      <div className="w-3/12 ">
        <h3 className="font-fontItalianno text-4xl text-center text-black">
          Bài viết nổi bật
        </h3>
        <>
          {blogsList.map((blog) => (
            <div key={blog.id}>
              <Link to={`/blog/${blog.id}`}>
                <div className="mx-5 mt-5 flex justify-center">
                  <img
                    src={blog.avatar}
                    alt=""
                    className="h-[200px] w-[350px] object-cover border"
                  />
                </div>
                <div className="text-center mt-4">
                  <strong className=" text-lg">{blog.title}</strong>
                </div>
              </Link>
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

export default DetailWiki;
