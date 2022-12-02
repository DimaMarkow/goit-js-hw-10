import './css/styles.css';

var _ = require('lodash');
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const getItemTemplateSmall = ({ name, flags }) => {
  const str = `<li class="country-block">
  <div  class="country-strig">
  <img src=${flags.svg} alt="Flag of ${name.common}" width="40"/>
  <div class="country-name">${name.common}</div>
  </div>
  </li>`;
  // console.log(str);
  return str;
};

const getItemTemplateFull = ({
  name,
  flags,
  capital,
  population,
  languages,
}) => {
  const allLaguages = Object.values(languages);

  const str = `<li class="country-block">
  <div  class="country-strig">
  <img src=${flags.svg} alt="Flag of ${name.common}" width="40"/>
  <div class="countryFull-nameCommon">${name.common}</div>  
  </div>
  <div class="countryFull-parametersCommon">
  <span class="countryFull-parametersCommonBold">Capital: </span>${capital}</div>
  <div class="countryFull-parametersCommon">
  <span class="countryFull-parametersCommonBold">Population: </span>${population}</div>
  <div class="countryFull-parametersCommon">
  <span class="countryFull-parametersCommonBold">Languages: </span>${allLaguages.join(
    `, `
  )}</div>
  </li>`;
  return str;
};

const DEBOUNCE_DELAY = 300;
const URL = `https://restcountries.com/v3.1/name/`;

const refs = {
  form: document.querySelector(`#search-box`),
  list: document.querySelector(`.country-list`),
};

let items = [];

refs.form.addEventListener(`input`, _.debounce(onInput, DEBOUNCE_DELAY));

function fetchCountries(name) {
  fetch(name)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else
        Notiflix.Notify.failure('Oops, there is no country with that name');
    })
    .then(countryes => {
      items = countryes;
      render();
    })
    .catch(error => console.log(error));
}

function onInput(event) {
  event.preventDefault();
  const query = event.target.value.trim();
  console.log(query);

  if (!query) {
    refs.list.innerHTML = ``;
    return;
  }

  fetchCountries(`${URL}${query}`);
}

function render() {
  const amountOfCountryes = items.length;
  if (amountOfCountryes > 10) {
    refs.list.innerHTML = ``;
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }
  if (amountOfCountryes > 1 && amountOfCountryes <= 10) {
    const list = items.map(item => getItemTemplateSmall(item)).join(``);
    refs.list.innerHTML = list;
    return;
  }
  if (amountOfCountryes === 1) {
    const list = items.map(item => getItemTemplateFull(item)).join(``);
    refs.list.innerHTML = list;
    return;
  }
}
