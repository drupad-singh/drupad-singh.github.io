import { restaurantsStorage } from "../../storage/LocalStorage";
import { RestaurantDetails } from "../../types/RestaurantTypes";
import { v4 as uuidv4 } from "uuid";
import { RestaurantForm } from "./RestaurantForm";

export const CreateRestaurant = () => {
  const handleFormSubmit = (updatedRestaurantDetails: RestaurantDetails) => {
    updatedRestaurantDetails = {
      ...updatedRestaurantDetails,
      id: uuidv4(),
    };
    const savedRestaurantDetails = restaurantsStorage.fetch();
    if (savedRestaurantDetails != null) {
      savedRestaurantDetails.push(updatedRestaurantDetails);
      restaurantsStorage.save(savedRestaurantDetails);
    } else {
      restaurantsStorage.save([updatedRestaurantDetails]);
    }
  };

  return (
    <RestaurantForm
      handleFormSubmit={handleFormSubmit}
      restaurantDetails={{}}
      ctaText={"Add Restaurant"}
    />
  );
};
