function Button({
  children,
  color = "black",
  type = "button",
  disabled = false,
  className,
  ...rest
}) {
  // Check color is black => hover color is pink
  if (color === "black") {
    className = "hover:bg-pink bg-black text-white " + className;
  } else if (color === "white") {
    className =
      "hover:bg-black hover:text-white bg-white text-black " + className;
  } else if (color === "pink") {
    className = "hover:bg-yellow bg-pink text-white " + className;
  }
  return (
    <button className={"cursor-pointer " + className} type={type} {...rest}>
      {children}
    </button>
  );
}

export default Button;
