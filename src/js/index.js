import '../css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

import { fetchCountries } from './fetchCountries';
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const exactCountry = document.querySelector('.country-info');
input.addEventListener('input', debounce(searchh, DEBOUNCE_DELAY));
function searchh() {
  const searchvalue = input.value.toLowerCase();
  exactCountry.innerHTML = '';
  list.innerHTML = '';
  if (searchvalue.length > 0) {
    fetchCountries(searchvalue)
      .then(countries => {
        console.log(countries);
        if (countries.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (countries.length >= 2 && countries.length < 10) {
          makeCs(countries);
        } else {
          makeC(countries);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name.');
      });
  }
}
function makeC(countries) {
  const markup = countries
    .map(country => {
      return `
          <p style="font-weight: 700;">Name: ${country.name.official}</p>
          <p style="font-weight: 700;">Capital: ${country.capital}</p>
          <p style="font-weight: 700;">Population: ${country.population}</p>
          <p style="font-weight: 700; margin-bottom: 30px">Languages: ${Object.values(
            country.languages
          )}</p>
          <img src="${country.flags.svg}" alt="flag of ${country.name}" width="200">`;
    })
    .join('');
  return (exactCountry.innerHTML = markup);
}
function makeCs(countries) {
  const markup = countries
    .map(country => {
      return `<li style="display: flex; align-items: center;"><img src="${country.flags.svg}" alt="flag of ${country.name.official}" height="40" width="70"">
        <p style="font-weight: 500;">Name: ${country.name.official}</p></li>`;
    })
    .join('');
  return (list.innerHTML = markup);
}
