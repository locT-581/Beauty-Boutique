import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Logo from "../Icon/Logo";
import Lottie from "react-lottie";
import here from "../../assets/SVG/hereicon.json";
import CloseIcon from "@mui/icons-material/Close";

function InputImages({ updateImages }) {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnChange = (e) => {
    const files = e.target.files;
    const imgs = Array.from(files);
    setActiveIndex(() => {
      setImages((pre) => [...pre, ...imgs]);
      return images.length + imgs.length - 1;
    });
  };

  useEffect(() => {
    updateImages(images);
    if (activeIndex === images.length - 1) {
      // Scroll to the end of the list
      const container = document.querySelector(".slick-image");
      container.scroll({
        left: container.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [images.length, activeIndex, updateImages]);

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

  const handleRemoveImage = (index) => {
    setImages((pre) => {
      setActiveIndex(Math.max(index - 1, 0));
      return pre.filter((_, i) => i !== index);
    });
  };

  return (
    <div>
      <div>
        <span className="w-[90%] text-pink text-sm text-end block -mt-2 mx-auto">
          {images.length}
        </span>
        {images[activeIndex] && images.length ? (
          <img
            src={URL.createObjectURL(images[activeIndex])}
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
              src={URL.createObjectURL(image)}
              alt="Xem trước"
              className="w-full object-cover aspect-square rounded-lg"
              onClick={(e) => {
                handleClick(e, index);
              }}
            />
            <CloseIcon
              onClick={() => {
                handleRemoveImage(index);
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

export default InputImages;
