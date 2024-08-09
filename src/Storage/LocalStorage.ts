import { Merchant } from "../types/Client";

// type Serializable<Data> = {
//   serialize: (data: Data) => string,
//   deserialize: (data: string) => Data
// }

type Storage<Data> = {
  fetch: () => Data | null;
  save: (data: Data) => undefined;
};

export function createStore<Data>(key: string): Storage<Data> {
  return {
    fetch: () => {
      const data = localStorage.getItem(key);
      try {
        if (data != null) {
          const parsedData: Data = JSON.parse(data);
          return parsedData;
        }
      } catch (e) {
        console.error("error parsing localStorage ", key, data);
      }
      return null;
    },
    save: (data: Data) => {
      localStorage.setItem(key, JSON.stringify(data));
    },
  };
}

export const ClientDetailsStorage: Storage<[Merchant]> = createStore("clientDetails")
