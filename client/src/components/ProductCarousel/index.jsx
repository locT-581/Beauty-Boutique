import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../ProductCard";

import "./styles.css";
function ProductCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Slider {...settings}>
      <ProductCard
        className={"w-[200px]"}
        title={"Đại Phú Quý"}
        price={"4,460,000"}
        image={
          "https://8384f55340.vws.vegacdn.vn/image/cache/catalog/products/August%202023/hoa-khai-truong-dai-phu-quy.jpg.webp"
        }
      />

      <ProductCard
        className={"w-[200px]"}
        title={"Đại Phú Quý"}
        price={"4,460,000"}
        image={
          "https://8384f55340.vws.vegacdn.vn/image/cache/catalog/products/August%202023/hoa-khai-truong-dai-phu-quy.jpg.webp"
        }
      />

      <ProductCard
        className={"w-[200px]"}
        title={"Đại Phú Quý"}
        price={"4,460,000"}
        image={
          "https://8384f55340.vws.vegacdn.vn/image/cache/catalog/products/August%202023/hoa-khai-truong-dai-phu-quy.jpg.webp"
        }
      />

      <ProductCard
        className={"w-[200px]"}
        title={"Thượng Phú Quý"}
        price={"4,460,000"}
        image={
          "https://8384f55340.vws.vegacdn.vn/image/cache/catalog/products/August%202023/hoa-khai-truong-dai-phu-quy.jpg.webp"
        }
      />

      <ProductCard
        className={"w-[200px]"}
        title={"Trung Phú Quý"}
        price={"4,460,000"}
        image={
          "https://8384f55340.vws.vegacdn.vn/image/cache/catalog/products/August%202023/hoa-khai-truong-dai-phu-quy.jpg.webp"
        }
      />

      <ProductCard
        className={"w-[200px]"}
        title={"Tiểu Phú Quý"}
        price={"4,460,000"}
        image={
          "https://8384f55340.vws.vegacdn.vn/image/cache/catalog/products/August%202023/hoa-khai-truong-dai-phu-quy.jpg.webp"
        }
      />
    </Slider>
  );
}

export default ProductCarousel;
