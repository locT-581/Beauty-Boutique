const lottieConfig = (animationData) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    renderer: "svg",
    scale: 0.5,
  };

  return defaultOptions;
};

export default lottieConfig;
