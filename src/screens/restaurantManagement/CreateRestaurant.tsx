import { restaurantsStorage } from "../../storage/LocalStorage";
import { RestaurantDetails } from "../../types/RestaurantTypes";
import { v4 as uuidv4 } from "uuid";
import { RestaurantForm } from "./RestaurantForm";
import { ScreenWrapper } from "../../components/ScreenWrapper";
import { useCallApi } from "../../utils/Api";
import { Endpoints } from "../../Constants";
import { useState } from "react";
import { notification } from "antd";

export const CreateRestaurant = () => {
  const [restaurant, setRestaurant] = useState({});
  const callApi = useCallApi();
  const handleFormSubmit = (updatedRestaurantDetails: RestaurantDetails) => {
    restaurantsStorage.save(updatedRestaurantDetails);
    callApi({
      ...Endpoints.createRestaurant(),
      options: {
        headers: {
          "x-merchant-slug": "meghana-foods",
        },
        body: updatedRestaurantDetails,
      },
    }).then((response) => {
      if (response.success) {
        setRestaurant(response.data);
        notification.open({
          placement: "bottomRight",
          message: "Restaurant added successfully",
          type: "success",
        });
      } else {
        throw response;
      }
    });
  };

  return (
    <ScreenWrapper>
      <RestaurantForm
        handleFormSubmit={handleFormSubmit}
        restaurantDetails={restaurant}
        ctaText={"Add Restaurant"}
      />
    </ScreenWrapper>
  );
};
