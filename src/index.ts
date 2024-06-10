import { Country, getCountries, getLocation, greetUser } from '$utils/index';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'Roy Kathurima';
  greetUser(name);
});

interface AnchorAttributes {
  'aria-selected': string;
  'data-element': string;
  'aria-role': string;
  href: string;
  class: string;
  tabIndex: string;
  'aria-label': string;
  title: string;
}

let currentlySelectedCountry: Country;

window.addEventListener('load', async (event) => {
  const userLocation = await getLocation();
  const countries = await getCountries();
  console.log('user location: ', userLocation);
  // Let's append all the countries into the list and then select Kenya once we are done.
  const dropDownNav = document.getElementById('w-dropdown-list-0');
  const theDivContainingTheCountries = dropDownNav?.firstChild;
  if (theDivContainingTheCountries) {
    const contryDetails = {
      country: 'Taiwan',
      countryCode: 'TW',
      dialingCode: '+886',
      emojiFlag: '🇹🇼',
      svgFlag: 'https://flagcdn.com/bw.svg',
    };
    // If this element exists I want to give it children :sweat_smile:
    countries.forEach((country) => {
      const { svgFlag, countryCode, countryName } = country;
      const anchor = document.createElement('a');

      const anchorAttributes: AnchorAttributes = {
        'aria-selected': 'false',
        'data-element': 'item',
        'aria-role': 'option',
        href: '#',
        class: 'prefix-dropdown_item w-inline-block',
        tabIndex: '0',
        'aria-label': countryName,
        title: countryName,
      };

      Object.keys(anchorAttributes).forEach((attributeKey: string) => {
        anchor.setAttribute(attributeKey, (anchorAttributes as any)[attributeKey]);
      });

      // create the image and div elements

      const imgElement = document.createElement('img');
      imgElement.setAttribute('src', svgFlag);
      imgElement.setAttribute('class', 'prefix-dropdown_flag');
      imgElement.setAttribute('data-element', 'flag');
      imgElement.setAttribute('loading', 'lazy');

      const divElement = document.createElement('div');
      divElement.setAttribute('data-element', 'value');
      divElement.innerText = countryCode;

      anchor.appendChild(imgElement);
      anchor.append(divElement);
      theDivContainingTheCountries.appendChild(anchor);

      anchor.addEventListener('click', function (event) {
        attachEventListerForFlagItem(event, country);
      });
    });
  }
});

/**
 * Sunday the 15th TODO:
 * Attach an handler to the anchor that allows us to update currently selected country and closes the nav list
 * Populate all the countries in the drop down nav list
 * Ensure that when you open the nav list, you are navigated to the position of the currently active country
 */

function attachEventListerForFlagItem(event: MouseEvent, country: Country) {
  const { svgFlag, dialingCode } = country;
  const dropDownNav = document.getElementById('w-dropdown-list-0');
  const dropDownDiv = document.getElementById('w-dropdown-toggle-0');
  const imageEl = document.querySelector('#w-dropdown-toggle-0 > img') as HTMLElement | null;
  const divEl = document.querySelector('#w-dropdown-toggle-0 > div') as HTMLElement | null;
  imageEl?.setAttribute('src', svgFlag);
  if (divEl) divEl.innerText = dialingCode;
  dropDownNav?.classList.remove('w--open');
  dropDownDiv?.click();
  currentlySelectedCountry = country;
  // dropDownDiv?.classList.remove('w--open');
  // dropDownDiv?.setAttribute('aria-expanded', 'false');
}

// Add a mutation observer to check when the list changes and we can see what changed and we
