import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
const selectEl = document.querySelector('.breed-select');

const loaderEl = selectEl.nextElementSibling
const errorEl = loaderEl.nextElementSibling
const wrapperEl = errorEl.nextElementSibling

loaderEl.textContent = '';
errorEl.classList.add('is-hidden');




fetchBreeds()
  .then(breeds => markupBreeds(breeds))
  .catch(() => {
    loaderEl.classList.add('is-hidden');
    Notiflix.Notify.failure(errorEl.textContent);
  });

const markupBreeds = breeds => {
  selectEl.classList.remove('is-hidden');
  const optionsMarkup = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');
  selectEl.innerHTML = optionsMarkup;
};

const markupCatInfo = arrCats => {
  if (!arrCats) {
    return Notiflix.Notify.warning(`No information about this breed is found. Try other one!`)
  }

  const showInfoAboutCat = arrCats
    .map(({ url, breeds }) => {
      const { name, description, temperament } = breeds[0];

      return `
        <img src="${url}" alt="${name}" width="500" height="500" class="img-settings"/>
      <div class="desc-wrapper">
        <h2>${name}</h2>
        <p class="description">${description}</p>
        <p class="temperament"><b>Temperament: </b>${temperament}</p>
      </div>`;
    })
    .join('');
  wrapperEl.innerHTML = showInfoAboutCat;
};

function onSelectCat(e) {
  loaderEl.classList.remove('is-hidden');
  wrapperEl.classList.add('is-hidden');
  const catId = e.target.value;

  fetchCatByBreed(catId)
    .then(data => {
      setTimeout(() => {
        markupCatInfo(data);
      }, 0);
    })
    .catch(() => {
      Notiflix.Notify.failure(errorEl.textContent);
    });
}

selectEl.addEventListener('change', onSelectCat);
