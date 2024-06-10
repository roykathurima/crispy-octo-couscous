const FETCH_LOCATION_URL =
  'https://api.ipdata.co?api-key=81067c61caea901a98cabc9a66597b832aa05e917bfc1639ae9090a4';

interface Location {
  countryName: string;
  countryCode: string;
}

export const getLocation = async (): Promise<Location> => {
  const response = await fetch(FETCH_LOCATION_URL);
  const rawCountry = await response.json();
  return mapResponseToLocation(rawCountry);
};

const mapResponseToLocation = (location: any): Location => {
  const { country_name, country_code } = location;
  return {
    countryName: country_name,
    countryCode: country_code,
  };
};
