import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { DynamicComponent } from "../../components/DynamicComponent";
import { restaurantsStorage } from "../../storage/LocalStorage";
import { RestaurantForm } from "./RestaurantForm";
import { useCallApi } from "../../utils/Api";
import { Endpoints } from "../../Constants";

export const UpdateRestaurant = () => {
  const { merchantId, restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const callApi = useCallApi();

  useEffect(() => {
    callApi({
      ...Endpoints.listRestaurants(),
      options: {
        headers: {
          "x-merchants-slug": merchantId,
        },
      },
    }).then((response) => {
      if (response.success) {
        setRestaurant(response.data.items.find(restaurantId));
      } else {
        throw response;
      }
    });
  });

  const handleFormSubmit = (restaurantDetails) => {
    restaurantsStorage.save(restaurantDetails);
  };

  return (
    <RestaurantForm
      restaurantDetails={restaurant}
      handleFormSubmit={handleFormSubmit}
      ctaText={"Update Restaurant"}
    />
  );
};
