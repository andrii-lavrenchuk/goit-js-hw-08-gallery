import galleryItems from './gallery-items.js';

// querySelectors
const refs = {
  galleryList: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  bigImg: document.querySelector('.lightbox__image'),
  modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
  //   modalCloseEscBtn: document.querySelector('body'),
  backDropEl: document.querySelector('.lightbox__overlay'),
};

// insertAdjacentHTML
refs.galleryList.insertAdjacentHTML(
  'beforeend',
  createGalleryItems(galleryItems),
);

// EventListeners
refs.galleryList.addEventListener('click', openModal);
refs.modalCloseBtn.addEventListener('click', OnCloseModalBtnClick);
refs.backDropEl.addEventListener('click', onBackdropClick);

// Functions
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
  const IMG_NODE_NAME = 'IMG';
  const isImg = evt.target.nodeName !== IMG_NODE_NAME;
  if (isImg) {
    return;
  }
  refs.modal.classList.add('is-open');
  window.addEventListener('keydown', onEscBtnClick);

  window.addEventListener('keydown', onArrowRightButtonClick);
  window.addEventListener('keydown', onArrowLeftButtonClick);
  refs.bigImg.src = evt.target.dataset.source;
  refs.bigImg.alt = evt.target.alt;
}

function OnCloseModalBtnClick() {
  //   console.log('Закриваю модалку');
  refs.modal.classList.remove('is-open');
  window.removeEventListener('keydown', onArrowLeftButtonClick);
  window.removeEventListener('keydown', onArrowRightButtonClick);
  window.addEventListener('keydown', onEscBtnClick);

  refs.bigImg.src = '';
  refs.bigImg.alt = '';
}

function onEscBtnClick(evt) {
  const ESC_BTN_CODE = 'Escape';
  const isEscBtn = evt.code === ESC_BTN_CODE;
  if (isEscBtn) {
    console.log('Закриваю модалку');
    refs.modal.classList.remove('is-open');
    window.addEventListener('keydown', onEscBtnClick);

    window.removeEventListener('keydown', onArrowLeftButtonClick);
    window.removeEventListener('keydown', onArrowRightButtonClick);
    window.removeEventListener('keydown', onEscBtnClick);

    refs.bigImg.src = '';
    refs.bigImg.alt = '';
  }
}
function onBackdropClick() {
  refs.modal.classList.remove('is-open');
  window.removeEventListener('keydown', onArrowLeftButtonClick);
  window.removeEventListener('keydown', onArrowRightButtonClick);
  window.addEventListener('keydown', onEscBtnClick);

  refs.bigImg.src = '';
  refs.bigImg.alt = '';
  console.log('Клік в бекдроп');
}

function onArrowRightButtonClick(evt) {
  const ARROW_RIGHT_BTN_CODE = 'ArrowRight';
  const isArrowRightBtn = evt.code !== ARROW_RIGHT_BTN_CODE;
  if (isArrowRightBtn) {
    return;
  }
  const arrOfImg = galleryItems.map(({ original }) => original);
  let currentImgIndex = arrOfImg.indexOf(refs.bigImg.src);

  if (currentImgIndex + 1 > arrOfImg.length - 1) {
    currentImgIndex = -1;
  }

  refs.bigImg.src = arrOfImg[currentImgIndex + 1];
}

function onArrowLeftButtonClick(evt) {
  const ARROW_LEFT_BTN_CODE = 'ArrowLeft';
  const isArrowLeftBtn = evt.code !== ARROW_LEFT_BTN_CODE;
  if (isArrowLeftBtn) {
    return;
  }
  const arrOfImg = galleryItems.map(({ original }) => original);
  let currentImgIndex = arrOfImg.indexOf(refs.bigImg.src);
  if (currentImgIndex === 0) {
    currentImgIndex = arrOfImg.length;
  }
  refs.bigImg.src = arrOfImg[currentImgIndex - 1];
}
