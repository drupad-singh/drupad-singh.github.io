import { Button } from "antd";
import { useState } from "react";

const usePrimaryButtonWithLoader = (showLoader = false) => {
  const [showButtonLoader, setShowButtonLoader] = useState(showLoader);
  const button = (handleClick) => (
    <Button type="primary" onClick={handleClick} />
  );
  return [showButtonLoader, setShowButtonLoader, button];
};
