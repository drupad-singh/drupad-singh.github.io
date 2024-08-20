import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { DynamicComponent } from "../../components/DynamicComponent";
import { restaurantsStorage } from "../../storage/LocalStorage";
import { RestaurantForm } from "./RestaurantForm";

export const UpdateRestaurant = () => {
  const { merchantId, restaurantId } = useParams();

  const handleFormSubmit = (restaurantDetails) => {
    const savedRestaurantDetails = restaurantsStorage.fetch();
    if (savedRestaurantDetails != null) {
      const updatedRestaurantDetails = savedRestaurantDetails.filter(
        (r) => r.id != restaurantId
      );
      updatedRestaurantDetails.push(restaurantDetails);
      restaurantsStorage.save(updatedRestaurantDetails);
    } else {
      restaurantsStorage.save([restaurantDetails]);
    }
  };

  const dom = useMemo(
    () => (
      <DynamicComponent
        apiCall={async () => {
          const restaurants = restaurantsStorage.fetch();
          const restaurant = restaurants.find(
            (r) => r.merchantId == merchantId && r.id == restaurantId
          );
          return restaurant
            ? Promise.resolve(restaurant)
            : Promise.reject("Restaurant Not Found");
        }}
        render={(restaurant) => (
          <RestaurantForm
            restaurantDetails={restaurant}
            handleFormSubmit={handleFormSubmit}
            ctaText={"Update Restaurant"}
          />
        )}
      />
    ),
    [merchantId, restaurantId]
  );
  return dom;
};
