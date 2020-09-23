import galleryItems from './gallery-items.js';
// querySelectors

const galleryList = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const bigImg = document.querySelector('.lightbox__image');
const modalCloseBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const modalCloseEscBtn = document.querySelector('body');
// EventListeners

galleryList.insertAdjacentHTML('beforeend', createGalleryItems(galleryItems));
galleryList.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', OnCloseModalBtnClick);
modalCloseEscBtn.addEventListener('keydown', onEscBtnClick);

function createGalleryItems(galleryItems) {
  const markup = galleryItems
    .map(({ original, description, preview }) => {
      return `<li class="gallery__item">
        <a
            class="gallery__link"
            href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </li>`;
    })
    .join('');
  return markup;
}

function openModal(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  modal.classList.add('is-open');
  bigImg.src = evt.target.dataset.source;
  bigImg.alt = evt.target.alt;
}

function OnCloseModalBtnClick() {
  console.log('Закриваю модалку');
  modal.classList.remove('is-open');
  bigImg.src = '';
  bigImg.alt = '';
}

function onEscBtnClick(evt) {
  if (evt.code === 'Escape') {
    modal.classList.remove('is-open');
  }
}
