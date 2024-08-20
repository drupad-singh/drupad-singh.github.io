import {
  ImageUpload,
  MultiSelect,
  TextInputField,
} from "../../components/FormComponents";
import { FormGrid } from "../../components/FormGrid";

const cuisines = [
  "American",
  "Italian",
  "French",
  "Mexican",
  "Chinese",
  "Japanese",
  "Indian",
  "Thai",
  "Mediterranean",
  "Spanish",
  "Lebanese",
  "Korean",
  "Vietnamese",
  "Ethiopian",
  "Brazilian",
  "Argentinian",
  "Peruvian",
  "Caribbean",
  "German",
  "Turkish",
  "Polish",
  "Russian",
  "Soul Food",
  "Fusion",
  "Vegetarian/Vegan",
];

export const AppDetails = () => {
  return (
    <FormGrid
      columns={[
        ImageUpload({
          label: "App Logo",
          name: "appMetadata.logo",
          required: true,
        }),
        MultiSelect({
          label: "Cuisine",
          name: "appMetadata.cuisine",
          required: true,
          options: cuisines.map((c) => ({
            label: c,
            value: c,
          })),
          defaultValue: [],
        }),
        ImageUpload({
          label: "Banner Image",
          name: "appMetadata.banner",
        }),
        TextInputField({
          label: "Tagline for Banner",
          name: "appMetadata.bannerText",
        }),
      ]}
    />
  );
};
