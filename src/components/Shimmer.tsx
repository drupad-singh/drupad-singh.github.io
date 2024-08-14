// ShimmerLoader.js
import "./Shimmer.css"; // Import the CSS file

const sizeClasses = {
  big: "shimmer--big",
  medium: "shimmer--medium",
  small: "shimmer--small",
};

const ShimmerLoader = ({ size = "medium" }) => {
  // Apply the appropriate size class
  const sizeClass = sizeClasses[size] || sizeClasses.medium;

  return <div className={`shimmer ${sizeClass}`} />;
};

export default ShimmerLoader;
