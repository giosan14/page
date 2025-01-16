// utils/postalCodeService.ts
import axios from "axios";
import { simplifyCityName } from "../../utils/normalizeCityName";

export const fetchPostalCode = async (
  selectedCountry: { value: string },
  selectedState: { value: string },
  selectedCity: { value: string },
): Promise<string> => {
  if (!selectedCity.value || !selectedState.value || !selectedCountry.value) return "No disponible";

  const normalizedCity = simplifyCityName(selectedCity.value);
  try {
    const response = await axios.get(
      `https://api.zippopotam.us/${selectedCountry.value}/${selectedState.value}/${normalizedCity}`
    );
    const postalCodes = response.data.places.map(
      (place: { "post code": string }) => place["post code"]
    );
    return postalCodes[0] || "No disponible";
  } catch (error) {
    console.error("Error fetching postal code:", error);
    return "No disponible";
  }
};
