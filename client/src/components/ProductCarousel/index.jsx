import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../ProductCard";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import "./styles.css";
function ProductCarousel({ products = [] }) {
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
      {products.map((product) => (
        <ProductCard
          id={product.id}
          key={product.id}
          className={"w-[200px]"}
          title={product.name}
          price={product.price}
          image={product.avatar || product.imageUrls[0]}
        />
      ))}
    </Slider>
  );
}

export default ProductCarousel;
