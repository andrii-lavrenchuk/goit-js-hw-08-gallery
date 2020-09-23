import galleryItems from './gallery-items.js';

const galleryList = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const bigImg = document.querySelector('.lightbox__image');
const modalCloseBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);

const galleryMarkup = createGalleryItems(galleryItems);
galleryList.insertAdjacentHTML('beforeend', galleryMarkup);
galleryList.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);

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

function closeModal(evt) {
  console.log('Закриваю модалку');
  modal.classList.remove('is-open');
  bigImg.src = '';
  bigImg.alt = '';
}
