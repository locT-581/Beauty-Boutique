import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProductByIdAsync } from "../../redux/reducers/productSlice";

function ProductCard({ title, price, image, className, id, ...rest }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const dispatch = useDispatch();
  const handleOnLoad = () => {
    setImgLoaded(true);
  };

  const handleOnclick = () => {
    dispatch(getProductByIdAsync(id));
  };

  return (
    <Link onClick={handleOnclick} to={"/chi-tiet-san-pham/" + id}>
      <div
        className={
          "pb-8 cursor-pointer flex flex-col justify-center items-center " +
          className
        }
      >
        {!imgLoaded && (
          <Skeleton
            variant="rectangular"
            width={200}
            height={200}
            className="absolute"
          />
        )}
        <img
          onLoad={handleOnLoad}
          src={image}
          alt={title}
          className="w-full h-full object-cover aspect-square"
        />

        <div className="px-[9%] mt-4 hover:scale-105 flex flex-col items-stretch">
          <h3 className="text-center text-lg ">{title}</h3>
          <p className="text-center text-pink">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(price)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
