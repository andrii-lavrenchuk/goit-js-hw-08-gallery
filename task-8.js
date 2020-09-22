import galleryItems from './gallery-items.js';

const galleryList = document.querySelector('.js-gallery');
const galleryMarkup = createGalleryItems(galleryItems);
galleryList.insertAdjacentHTML('beforeend', galleryMarkup);

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
