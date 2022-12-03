import Notiflix from 'notiflix';

export default function fetchCountries(name) {
  return fetch(name).then(response => {
    if (response.ok) {
      return response.json();
    } else Notiflix.Notify.failure('Oops, there is no country with that name');
  });
}
