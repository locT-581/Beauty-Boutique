import Button from "../../UI/Button";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlog } from "../../redux/reducers/blogSlice.js";
function Wiki() {
  const [wikis, setWikis] = useState([]);
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogSlice);
  const [blogsList, setBlogsList] = useState([]);
  useEffect(() => {
    (async () => {
      const wikisCollection = collection(db, "flowers");
      const wikisSnapshot = await getDocs(wikisCollection);
      const wikisList = wikisSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWikis(wikisList);
    })();
    dispatch(getAllBlog());
  }, []);
  useEffect(() => {
    // just get 4 blogs
    setBlogsList(blogs.slice(0, 3));
  }, [blogs]);
  return (
    <>
      <h3 className="font-fontItalianno text-6xl text-center text-black py-10">
        WikiFlower
      </h3>

      <div className="w-full h-fit flex pl-[10%] pr-[5%] pb-20">
        <div className="w-9/12 flex gap-10 flex-wrap mt-10  ">
          {wikis.map((wiki) => (
            <div key={wiki.name} className="h-fit">
              <div className="h-[217px] flex justify-center">
                <img
                  className=" object-cover w-[216px]"
                  src={wiki.avatar}
                  alt=""
                />
              </div>
              <div className="drop-shadow-[5px_5px_5px_rgba(0,0,0,0.3)] bg-white h-max-[131px] w-max-[216px]">
                <p className="font-fontItalianno text-center mx-3 mb-2 text-3xl pt-4">
                  {wiki.name}
                </p>
                <div className="full flex flex-col items-center ">
                  <Link to={`/wikiFlower/${wiki.id}`}>
                    <Button className={"px-5 py-2 mb-4"} color="black">
                      Xem chi tiết
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
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
    </>
  );
}

export default Wiki;
