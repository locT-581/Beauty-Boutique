function ProductCard({ title, price, image, className }) {
  return (
    <div
      className={
        "pb-8 cursor-pointer flex flex-col justify-center items-center " +
        className
      }
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover aspect-square"
      />
      <div className="px-[9%] mt-4 hover:scale-105">
        <h3 className="font-fontItalianno text-3xl ">{title}</h3>
        <p>{`${price} vnđ`}</p>
      </div>
    </div>
  );
}

export default ProductCard;
