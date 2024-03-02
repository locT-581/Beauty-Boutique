function Button({
  children,
  color = "black",
  type = "button",
  className,
  ...rest
}) {
  // Check color is black => hover color is pink
  if (color === "black") {
    className = "hover:bg-pink bg-black text-white " + className;
  } else if (color === "white") {
    className =
      "hover:bg-black hover:text-white bg-white text-black " + className;
  }
  return (
    <button className={"cursor-pointer " + className} type={type} {...rest}>
      {children}
    </button>
  );
}

export default Button;
