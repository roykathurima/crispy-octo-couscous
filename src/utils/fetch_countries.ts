const REST_CONTRIES_API = 'https://restcountries.com/v3.1/all';

export interface Country {
  countryName: string;
  countryCode: string;
  dialingCode: string;
  emojiFlag: string;
  svgFlag: string;
}

const mapResponseToUsableType = (countries: Array<any>): Array<Country> => {
  return countries.map((country) => {
    const { cca2, flag, idd, name, flags } = country;
    return {
      countryName: name.common,
      countryCode: cca2,
      dialingCode: `${idd.root}${idd.suffixes}`,
      emojiFlag: flag,
      svgFlag: flags.svg,
    };
  });
};

export const getCountries = async (): Promise<Array<Country>> => {
  const response = await fetch(REST_CONTRIES_API);
  const countries = await response.json();
  return mapResponseToUsableType(countries);
};
