const REST_CONTRIES_API = 'https://restcountries.com/v3.1/all';

interface Country {
  countryCode: string;
  dialingCode: string;
  flag: string;
}

const mapResponseToUsableType = (countries: Array<any>): Array<Country> => {
  return countries.map((country) => {
    const { cca2, flag, idd } = country;
    return {
      countryCode: cca2,
      dialingCode: `${idd.root}${idd.suffixes}`,
      flag,
    };
  });
};

export const getCountries = async (): Promise<Array<Country>> => {
  const response = await fetch(REST_CONTRIES_API);
  const countries = await response.json();
  return mapResponseToUsableType(countries);
};
