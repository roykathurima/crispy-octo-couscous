const FETCH_LOCATION_URL = 'http://ip-api.com/json';

interface Location {
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  lat: number;
  lon: number;
  timezone: string;
}

export const getLocation = async (): Promise<Location> => {
  const response = await fetch(FETCH_LOCATION_URL);
  return response.json();
};
