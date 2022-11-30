import './css/styles.css';

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

fetch(`https://restcountries.com/v3.1/name/peru`)
  .then(response => {
    return response.json();
  })
  .then(countryes => {
    console.log(countryes);
    countryes.forEach(countrye => {
      console.log(countrye.name.official);
      console.log(countrye.capital);
      console.log(countrye.population);
      console.log(countrye.flags.svg);
      console.log(countrye.languages);
    });
  });

const refs = {
  form: document.querySelector(`#search-box`),
};

refs.form.addEventListener(`input`, onSubmit);

function onSubmit(event) {
  event.preventDefault();
  _.debounce(console.log(event.target.value), 3000);
  //   console.log(event.target.value);
}
