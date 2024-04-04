import Button from "../../UI/Button";
import Header from "../Header";
import "./styles.css";
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


function Wiki() {
  const [newestWiki, setNewestWiki] = useState([]);
  useEffect(() => {
    getsetNewestWiki();
  }, []);

  const getsetNewestWiki = async () => {
    try {
      const productsRef = collection(db, "products");
      const q = query(
        productsRef,
        where("category", "==", "z4UCqfP5PmDQVHBOurkv"),
        limit(2)
      );
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setNewestWiki((prev) => {
            if (prev.length > 2) prev.shift();
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
      <h3 className="font-fontItalianno text-6xl text-center text-black pt-10">
        WikiFlower
      </h3>

      <div className="mx-10 ml-20 mb-5 mt-10 grid grid-cols-3">
        <div className=" mb-[600px] grid grid-rows-2 grid-cols-4 gap-x-6 gap-y-12 max-w-5xl col-start-1 col-end-3 row-start-1 row-end-3">
          {newestWiki.map((wiki) => (
          <div key={wiki.id}>
            <div className="size-auto max-w-[218px] max-h-[349px]">
              <div className="h-[217px] flex justify-center">
                <img
                className=" object-cover w-[216px]"
                  src={wiki.imageUrls}
                  alt=""
                  
                />
              </div>
                    <div className=" drop-shadow-[5px_5px_5px_rgba(0,0,0,0.3)] bg-white h-max-[131px] w-max-[216px]">
                      <p className="font-fontItalianno text-center mx-3 mb-2 text-3xl ">
                      {wiki.name}
                      </p>
                      <div className="full flex flex-col items-center ">
                        <Button className={"px-5 py-2 mb-4"} color="black">
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
            </div>
          </div>
        ))}
        </div>
        <div>
          <h3 className="font-fontItalianno text-4xl text-center text-black">
            Bài viết nổi bật
          </h3>
          <>
        {newestWiki.map((wiki) => (
          <div key={wiki.id}>
            <div className="mx-5 mt-5 flex justify-center">
              <img
                src={wiki.imageUrls}
                alt=""
                className="h-[200px] w-[350px] object-cover"
              />
            </div>
              <div className="text-center">
                <strong className=" text-xl">
                  Hoa tặng khai trương đẹp <br /> sang trọng
                </strong>
              </div>
              <div className="text-center">
                <p>
                  Hãy để shop hoa tươi tư vấn các bạn
                  <br /> cách chọn hoa tươi mừng [...]
                </p>
              </div>
          </div>
        ))}
        </>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default Wiki;
