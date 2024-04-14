import { memo, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Logo from "../Icon/Logo";
import Lottie from "react-lottie";
import here from "../../assets/SVG/hereicon.json";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { storage } from "../../config/firebaseConfig";
import { deleteObject, ref } from "firebase/storage";
import { uploadImage } from "../../utils/storage";

function InputImages({ updateImages }) {
  const { currentProduct } = useSelector((state) => state.productSlice);
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (currentProduct.imageUrls !== undefined) {
      setImages(currentProduct.imageUrls);
    }
  }, [currentProduct]);

  const handleOnChange = (e) => {
    const files = e.target.files;
    if (!files.length) return;
    const imgs = Array.from(files);
    // get time to create unique name
    // 1. upload images to firebase storage
    imgs.forEach(async (img) => {
      await uploadImage(
        "products_image",
        img,
        currentProduct.id,
        new Date().getTime().toString()
      )
        // 2. get download url
        .then((url) => {
          // 3. update images state
          setImages((pre) => {
            // 4. update currentProduct.imageUrls
            updateImages([...pre, url]);
            setActiveIndex([...pre, url].length - 1);
            return [...pre, url];
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  useEffect(() => {
    if (activeIndex === images.length - 1) {
      // Scroll to the end of the list
      const container = document.querySelector(".slick-image");
      container.scroll({
        left: container.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [images, activeIndex]);

  const handleClick = (e, index) => {
    setActiveIndex(index);

    const container = document.querySelector(".slick-image");
    const image = e.target;
    const imageRect = image.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const imageRectLeft = containerRect.left + (imageRect.width + 3) * index;
    const scrollTo =
      imageRectLeft -
      containerRect.left -
      containerRect.width / 2 +
      (imageRect.width / 2) * 2;

    container.scroll({
      left: scrollTo,
      behavior: "smooth",
    });
  };

  const handleRemoveImage = (e, index) => {
    const src = e.target.previousSibling.src;
    setImages((pre) => {
      setActiveIndex(Math.max(index - 1, 0));
      // remove element equal src in images array
      const newImages = pre.filter((image) => {
        return image !== src;
      });
      updateImages(newImages);
      return newImages;
    });
    // remove image in firebase storage
    deleteObject(ref(storage, src))
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log("Uh-oh, an error occurred! ", error);
      });
  };

  return (
    <div>
      <div>
        <span className="w-[90%] text-pink text-sm text-end block -mt-2 mx-auto">
          {`${activeIndex + (images.length > 0 ? 1 : 0)}/${images.length}`}
        </span>
        {images[activeIndex] && images.length ? (
          <img
            src={images[activeIndex]}
            alt="preview"
            className="mx-auto w-[90%] object-cover aspect-square"
          />
        ) : (
          <div className=" relative w-[90%] opacity-80 mx-auto border-2 border-pink rounded-lg object-cover aspect-square">
            <input
              title=" "
              type="file"
              className="absolute inset-0 z-10 opacity-0 w-full"
              multiple
              onChange={handleOnChange}
            />
            <Logo
              width="120"
              className="text-pink opacity-70 absolute top-[10%] left-1/2 transform -translate-x-1/2 "
            />
            <div className="opacity-50 absolute top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: here,
                  speed: 2,
                }}
                width={40}
              />
            </div>
            <span className="text-pink absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Chọn hoặc kéo thả ảnh vào đây
            </span>
          </div>
        )}
      </div>
      <div className="slick-image flex justify-start items-center mb-4 pt-5 overflow-x-hidden ">
        {images.map((image, index) => (
          <div
            key={index}
            className={
              (activeIndex === index
                ? "border-2 border-soft-pink border-solid "
                : "") +
              " relative cursor-pointer rounded-lg w-[50px] h-[50px] mx-1 flex-shrink-0"
            }
          >
            <img
              src={image}
              alt="Xem trước"
              className="w-full object-cover aspect-square rounded-lg"
              onClick={(e) => {
                handleClick(e, index);
              }}
            />
            <CloseIcon
              onClick={(e) => {
                handleRemoveImage(e, index);
              }}
              fontSize="small"
              className="absolute -top-1 -right-1 bg-pink text-white rounded-full p-1 cursor-pointer"
            />
          </div>
        ))}
        <div className="relative border-2 border-pink border-dashed rounded-lg w-[45px] h-[45px] mx-[3px] object-cover aspect-square">
          <input
            title=" "
            type="file"
            className="absolute inset-0 z-10 opacity-0 w-full"
            multiple
            onChange={handleOnChange}
          />
          <AddIcon
            fontSize="small"
            className="text-pink absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </div>
  );
}

export default memo(InputImages);
