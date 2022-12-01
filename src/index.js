import './css/styles.css';

var _ = require('lodash');
var debounce = require('lodash.debounce');

const getItemTemplateSmall = ({ name, flags }) => {
  // console.log(flags.svg);
  const str = `<li class="country-block">
  <div  class="country-strig">
  <img src=${flags.svg} alt="Flag of ${name.official}" width="40"/>
  <div class="country-name">${name.official}</div>
  </div>
  </li>`;
  console.log(str);
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
  <img src=${flags.svg} alt="Flag of ${name.official}" width="40"/>
  <div class="country-name">${name.official}</div>  
  </div>
  <div class="country-name">Capital: ${capital}</div>
  <div class="country-name">Population: ${population}</div>
  <div class="country-name">Languages: ${allLaguages.join(`, `)}</div>
  </li>`;
  console.log(str);
  return str;
};

// const values = Object.values(book);

const DEBOUNCE_DELAY = 1000;
const URL = `https://restcountries.com/v3.1/name/`;

const refs = {
  form: document.querySelector(`#search-box`),
  list: document.querySelector(`.country-list`),
};

let items = [];

refs.form.addEventListener(`input`, _.debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  event.preventDefault();
  const query = event.target.value.trim();
  console.log(query);

  fetch(`${URL}${query}`)
    .then(response => {
      return response.json();
    })
    .then(countryes => {
      items = countryes;
      console.log(items);

      render();
    });
}

function render() {
  console.log(items.length);
  const amountOfCountryes = items.length;
  if (amountOfCountryes > 10) {
    window.alert(`Too many matches found. Please enter a more specific name.`);
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
