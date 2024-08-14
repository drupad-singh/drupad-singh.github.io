import { Spin } from "antd";
import {
  PropsWithChildren,
  PropsWithoutRef,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import ShimmerLoader from "./Shimmer";

type renderProps<data> = {
  apiData: data;
};

type props<data, additionalProps = object> = {
  apiCall: () => Promise<data>;
  render: (
    data: data
  ) => React.ReactElement<renderProps<data> & additionalProps>;
};
export const DynamicComponent = <data,>({
  apiCall,
  render,
}: PropsWithoutRef<props<data>>): ReactElement => {
  const [showLoader, setShowLoader] = useState(true);
  const [innerDom, setInnerDom] = useState(null);
  useEffect(() => {
    apiCall()
      .then((data) => {
        setInnerDom(render(data));
        setShowLoader(false);
      })
      .catch((err) => {
        console.log("api failed ", err);
      });
  }, []);
  return showLoader ? <ShimmerLoader size="big" /> : innerDom;
};
